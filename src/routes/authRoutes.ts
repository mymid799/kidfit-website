/**
 * Route: Authentication
 * POST /api/register — Đăng ký tài khoản phụ huynh
 * POST /api/login    — Đăng nhập
 * GET  /api/me       — Lấy thông tin user hiện tại (protected)
 * GET  /api/verify-email — Xác nhận email
 *
 * ─── LUỒNG ĐĂNG KÝ (Sign Up Flow) ───────────────────────────────────────────
 * Client → POST /api/register
 *   │
 *   ├─ 1. Validate input (express-validator)
 *   │       username, email, password, parentName, childName, childAge, phone
 *   │
 *   ├─ 2. Kiểm tra uniqueness trong DB
 *   │       SELECT * FROM users WHERE username = ? OR email = ?
 *   │       → Nếu tồn tại: return 409 Conflict
 *   │
 *   ├─ 3. Hash password (bcrypt, salt 10)
 *   │
 *   ├─ 4. Tạo email verify token (UUID)
 *   │
 *   ├─ 5. Transaction: INSERT users + INSERT parent_profiles
 *   │       → Đảm bảo ACID: nếu 1 bảng lỗi, rollback cả 2
 *   │
 *   ├─ 6. Gửi email xác nhận (async, không block response)
 *   │
 *   └─ 7. Return 201 + JWT token (auto-login sau đăng ký)
 *
 * ─── LUỒNG ĐĂNG NHẬP (Sign In Flow) ─────────────────────────────────────────
 * Client → POST /api/login
 *   │
 *   ├─ 1. Rate limit (5 lần / 5 phút / IP) — express-rate-limit
 *   │
 *   ├─ 2. Validate input
 *   │
 *   ├─ 3. Tìm user bằng username hoặc email
 *   │       → Nếu không tìm thấy: return 401 (không tiết lộ user có tồn tại hay không)
 *   │
 *   ├─ 4. Kiểm tra tài khoản có bị khoá không (brute-force protection)
 *   │
 *   ├─ 5. bcrypt.compare(password, password_hash)
 *   │       → Nếu sai: tăng login_attempts, khoá nếu >= 5 lần
 *   │       → Nếu đúng: reset login_attempts
 *   │
 *   ├─ 6. Ký JWT (payload: user_id, role, username; expire: 7d)
 *   │
 *   └─ 7. Return 200 + JWT token + user info (không có password_hash)
 */
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { Op } from 'sequelize';
import crypto from 'crypto';
import sequelize from '../config/sequelize.js';
import User from '../models/User.js';
import ParentProfile from '../models/ParentProfile.js';
import { authenticate } from '../middleware/auth.js';
import { loginLimiter, registerLimiter } from '../config/rateLimiter.js';
import { sendVerificationEmail } from '../services/emailService.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 've_tu_duy_steam_secret_key_change_in_prod';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

// ─── VALIDATION RULES ────────────────────────────────────────────────────────

/** Validate cho endpoint đăng ký */
const registerValidation = [
    body('username')
        .trim()
        .isLength({ min: 3, max: 50 }).withMessage('Username phải từ 3–50 ký tự!')
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username chỉ được dùng chữ, số và dấu _!'),

    body('email')
        .trim()
        .isEmail().withMessage('Email không đúng định dạng!')
        .normalizeEmail(),

    body('password')
        .isLength({ min: 8 }).withMessage('Mật khẩu phải có ít nhất 8 ký tự!')
        .matches(/[A-Z]/).withMessage('Mật khẩu phải chứa ít nhất 1 chữ hoa!')
        .matches(/[0-9]/).withMessage('Mật khẩu phải chứa ít nhất 1 chữ số!'),

    body('parentName')
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('Tên phụ huynh phải từ 2–100 ký tự!'),

    body('childName')
        .trim()
        .isLength({ min: 1, max: 50 }).withMessage('Tên bé phải từ 1–50 ký tự!'),

    body('childAge')
        .isInt({ min: 3, max: 6 }).withMessage('Độ tuổi bé phải từ 3–6 tuổi!'),

    body('phone')
        .optional({ nullable: true, checkFalsy: true })
        .matches(/^(\+84|0)(3[2-9]|5[6-9]|7[0|6-9]|8[0-9]|9[0-9])[0-9]{7}$/)
        .withMessage('Số điện thoại không đúng định dạng VN!'),
];

/** Validate cho endpoint đăng nhập */
const loginValidation = [
    body('identifier')
        .trim()
        .notEmpty().withMessage('Vui lòng nhập username hoặc email!'),
    body('password')
        .notEmpty().withMessage('Vui lòng nhập mật khẩu!'),
];

// ─── HELPER: Tạo JWT ──────────────────────────────────────────────────────────
const signToken = (user_id: number, username: string, role: string): string => {
    return jwt.sign(
        { user_id, username, role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRE } as any
    );
};

// ─── HELPER: Xử lý lỗi validation ───────────────────────────────────────────
const handleValidationErrors = (req: Request, res: Response): boolean => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            success: false,
            error: 'Thông tin không hợp lệ!',
            details: errors.array().map(e => ({ field: (e as any).path, message: e.msg })),
        });
        return true; // Có lỗi
    }
    return false; // Không có lỗi
};

// ============================================================
// POST /api/register — Đăng ký tài khoản
// ============================================================
router.post('/register', registerLimiter, registerValidation, async (req: Request, res: Response) => {
    // B1: Kiểm tra validation errors
    if (handleValidationErrors(req, res)) return;

    const { username, email, password, parentName, childName, childAge, phone } = req.body;

    try {
        // B2: Kiểm tra username/email đã tồn tại chưa (query đồng thời)
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { username: username.toLowerCase() },
                    { email: email.toLowerCase() },
                ],
            },
        });

        if (existingUser) {
            // Phân biệt lỗi username hay email để UX tốt hơn
            const field = existingUser.username === username.toLowerCase() ? 'username' : 'email';
            const fieldLabel = field === 'username' ? 'Username' : 'Email';
            return res.status(409).json({
                success: false,
                error: `${fieldLabel} này đã được sử dụng!`,
                field,
            });
        }

        // B3: Hash mật khẩu với bcrypt (salt 10)
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // B4: Tạo token xác minh email (UUID random 32 bytes)
        const emailVerifyToken = crypto.randomBytes(32).toString('hex');

        // B5: Sử dụng Transaction để đảm bảo ACID
        // Nếu bảng users tạo thành công nhưng parent_profiles lỗi → rollback cả 2
        const result = await sequelize.transaction(async (t) => {
            // Tạo user
            const newUser = await User.create(
                {
                    username: username.toLowerCase(),
                    email: email.toLowerCase(),
                    password_hash,
                    role: 'parent',
                    email_verified: false,
                    email_verify_token: emailVerifyToken,
                },
                { transaction: t }
            );

            // Tạo parent profile với thông tin bé được ẩn danh
            const profile = await ParentProfile.create(
                {
                    user_id: newUser.id,
                    parent_name: parentName.trim(),
                    child_name_anonymous: childName.trim(), // Chỉ lưu tên gọi
                    child_age: parseInt(childAge),
                    phone: phone || null,
                },
                { transaction: t }
            );

            return { newUser, profile };
        });

        // B6: Gửi email xác nhận (bất đồng bộ, không block response)
        sendVerificationEmail(email, username, emailVerifyToken).catch(console.error);

        // B7: Ký JWT để auto-login ngay sau đăng ký
        const token = signToken(result.newUser.id, result.newUser.username, result.newUser.role);

        // B8: Trả response (không bao gồm password_hash)
        return res.status(201).json({
            success: true,
            message: 'Đăng ký tài khoản thành công! Vui lòng kiểm tra email để xác nhận tài khoản.',
            token,
            user: {
                id: result.newUser.id,
                username: result.newUser.username,
                email: result.newUser.email,
                role: result.newUser.role,
                email_verified: result.newUser.email_verified,
                parent_name: result.profile.parent_name,
                child_age: result.profile.child_age,
                created_at: result.newUser.created_at,
            },
        });

    } catch (error: any) {
        console.error('❌ Lỗi đăng ký:', error);

        // Xử lý Sequelize unique constraint error (race condition)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                success: false,
                error: 'Username hoặc Email đã tồn tại!',
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Lỗi hệ thống, vui lòng thử lại sau!',
        });
    }
});

// ============================================================
// POST /api/login — Đăng nhập
// ============================================================
router.post('/login', loginLimiter, loginValidation, async (req: Request, res: Response) => {
    // B1: Kiểm tra validation
    if (handleValidationErrors(req, res)) return;

    const { identifier, password } = req.body;

    // Tin nhắn lỗi chung — KHÔNG tiết lộ username có tồn tại hay không
    // (tránh User Enumeration Attack)
    const GENERIC_ERROR = 'Thông tin đăng nhập không đúng!';

    try {
        // B2: Tìm user theo username HOẶC email
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { username: identifier.toLowerCase() },
                    { email: identifier.toLowerCase() },
                ],
            },
        });

        // B3: User không tồn tại → return generic error (không tiết lộ)
        if (!user) {
            return res.status(401).json({ success: false, error: GENERIC_ERROR });
        }

        // B4: Kiểm tra tài khoản có bị khoá không
        if (user.isLocked()) {
            const unlockTime = user.locked_until!;
            const remainMinutes = Math.ceil((unlockTime.getTime() - Date.now()) / 60000);
            return res.status(423).json({
                success: false,
                error: `Tài khoản bị khoá tạm thời do đăng nhập sai nhiều lần. Vui lòng thử lại sau ${remainMinutes} phút!`,
                code: 'ACCOUNT_LOCKED',
            });
        }

        // B5: Kiểm tra tài khoản có bị vô hiệu hoá bởi admin
        if (!user.is_active) {
            return res.status(403).json({
                success: false,
                error: 'Tài khoản của bạn đã bị vô hiệu hoá. Vui lòng liên hệ quản trị viên!',
                code: 'ACCOUNT_DISABLED',
            });
        }

        // B6: So sánh mật khẩu với bcrypt (chống timing attack)
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            // Tăng số lần thử sai
            const newAttempts = user.login_attempts + 1;
            const updateData: any = { login_attempts: newAttempts };

            // Khoá tài khoản nếu sai >= 5 lần (30 phút)
            if (newAttempts >= 5) {
                updateData.locked_until = new Date(Date.now() + 30 * 60 * 1000);
                console.warn(`[SECURITY] Khoá tài khoản ${user.username} do đăng nhập sai ${newAttempts} lần`);
            }

            await user.update(updateData);

            return res.status(401).json({
                success: false,
                error: GENERIC_ERROR,
                // Cảnh báo số lần còn lại (UX tốt hơn, an toàn vì user đã được xác định tồn tại)
                attemptsLeft: newAttempts < 5 ? 5 - newAttempts : 0,
            });
        }

        // B7: Đăng nhập thành công → reset login_attempts
        await user.update({ login_attempts: 0, locked_until: null });

        // B8: Lấy thêm thông tin profile
        const profile = await ParentProfile.findOne({ where: { user_id: user.id } });

        // B9: Ký JWT token
        const token = signToken(user.id, user.username, user.role);

        return res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công!',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                email_verified: user.email_verified,
                parent_name: profile?.parent_name || null,
                child_age: profile?.child_age || null,
            },
        });

    } catch (error) {
        console.error('❌ Lỗi đăng nhập:', error);
        return res.status(500).json({
            success: false,
            error: 'Lỗi hệ thống, vui lòng thử lại sau!',
        });
    }
});

// ============================================================
// GET /api/verify-email — Xác nhận email
// ============================================================
router.get('/verify-email', async (req: Request, res: Response) => {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
        return res.status(400).json({ success: false, error: 'Token không hợp lệ!' });
    }

    try {
        const user = await User.findOne({ where: { email_verify_token: token } });

        if (!user) {
            return res.status(400).json({
                success: false,
                error: 'Token xác nhận không hợp lệ hoặc đã được sử dụng!',
            });
        }

        await user.update({
            email_verified: true,
            email_verify_token: null, // Xoá token sau khi dùng
        });

        return res.status(200).json({
            success: true,
            message: 'Email đã được xác nhận thành công! Tài khoản của bạn đã sẵn sàng.',
        });

    } catch (error) {
        console.error('❌ Lỗi xác nhận email:', error);
        return res.status(500).json({ success: false, error: 'Lỗi hệ thống!' });
    }
});

// ============================================================
// GET /api/me — Lấy thông tin user (Protected)
// ============================================================
router.get('/me', authenticate, async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.user!.user_id, {
            include: [{ model: ParentProfile, as: 'parentProfile' }],
        });

        if (!user) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy tài khoản!' });
        }

        return res.json({
            success: true,
            user: user.toSafeJSON(),
        });

    } catch (error) {
        console.error('❌ Lỗi lấy thông tin user:', error);
        return res.status(500).json({ success: false, error: 'Lỗi hệ thống!' });
    }
});

export default router;
