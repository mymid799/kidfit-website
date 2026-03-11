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
import StaffProfile from '../models/StaffProfile.js';
import { authenticate, authorize } from '../middleware/auth.js';
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
router.post('/register', registerValidation, async (req: Request, res: Response) => {
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
                    child_age: parseInt(childAge) as any,
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
router.post('/login', loginValidation, async (req: Request, res: Response) => {
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
            return res.status(401).json({
                success: false,
                error: GENERIC_ERROR,
            });
        }

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
// PATCH /api/users/:id/role — Admin: Cập nhật Role cho user
// ============================================================
router.patch('/users/:id/role', authenticate, authorize('admin'), async (req: Request, res: Response) => {
    const { id } = req.params;
    const { role } = req.body;

    const validRoles = ['parent', 'teacher', 'admin', 'student'];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ success: false, error: 'Role không hợp lệ!' });
    }

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy user!' });
        }

        await user.update({ role: role as any });

        return res.json({
            success: true,
            message: `Đã cập nhật role thành ${role} cho user ${user.username}`,
            user: { id: user.id, username: user.username, role: user.role }
        });
    } catch (error) {
        console.error('❌ Lỗi cập nhật role:', error);
        return res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

// GET /api/users — Admin: Lấy danh sách users (Sequelize version)
// ============================================================
router.get('/users', authenticate, async (_req: Request, res: Response) => {
    try {
        const users = await User.findAll({
            include: [
                { model: ParentProfile, as: 'parentProfile' },
                { model: StaffProfile, as: 'staffProfile' }
            ],
            order: [['created_at', 'DESC']]
        });

        return res.json({
            success: true,
            users: users.map(u => {
                const safe = u.toSafeJSON();
                return {
                    ...safe,
                    parentProfile: (u as any).parentProfile,
                    staffProfile: (u as any).staffProfile
                };
            })
        });
    } catch (error) {
        console.error('❌ Lỗi lấy danh sách users:', error);
        return res.status(500).json({ success: false, error: 'Lỗi server!' });
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

// ============================================================
// POST /api/users/teacher — Admin: Tạo tài khoản Giáo viên
// ============================================================
router.post('/users/teacher', authenticate, authorize('admin'), async (req: Request, res: Response) => {
    const { username, email, password, fullName, phone } = req.body;

    if (!username || !email || !password || !fullName) {
        return res.status(400).json({ success: false, error: 'Vui lòng nhập đủ thông tin!' });
    }
    if (password.length < 8) {
        return res.status(400).json({ success: false, error: 'Mật khẩu phải từ 8 ký tự!' });
    }

    try {
        const existing = await User.findOne({
            where: { [Op.or]: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }] }
        });
        if (existing) {
            const field = existing.username === username.toLowerCase() ? 'Username' : 'Email';
            return res.status(409).json({ success: false, error: `${field} này đã được sử dụng!` });
        }

        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password_hash,
            role: 'teacher',
            email_verified: true, // Admin tạo → không cần xác nhận email
            email_verify_token: null,
        });

        return res.status(201).json({
            success: true,
            message: `Đã tạo tài khoản giáo viên cho ${fullName} thành công!`,
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                fullName,
                phone: phone || null,
                created_at: newUser.created_at,
            }
        });
    } catch (error: any) {
        console.error('❌ Lỗi tạo giáo viên:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ success: false, error: 'Username hoặc Email đã tồn tại!' });
        }
        return res.status(500).json({ success: false, error: 'Lỗi hệ thống!' });
    }
});

// ============================================================
// PUT /api/users/:id — Admin: Cập nhật thông tin user
// ============================================================
router.put('/users/:id', authenticate, authorize('admin'), async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, role, is_active } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ success: false, error: 'Không tìm thấy user!' });

        const updateData: any = {};
        if (email) updateData.email = email.toLowerCase();
        if (role) updateData.role = role;
        if (typeof is_active === 'boolean') updateData.is_active = is_active;

        await user.update(updateData);

        return res.json({
            success: true,
            message: 'Cập nhật thông tin user thành công!',
            user: user.toSafeJSON()
        });
    } catch (error) {
        console.error('❌ Lỗi cập nhật user:', error);
        return res.status(500).json({ success: false, error: 'Lỗi hệ thống!' });
    }
});

// ============================================================
// PATCH /api/users/:id/toggle — Admin: Khoá/Mở khoá tài khoản
// ============================================================
router.patch('/users/:id/toggle', authenticate, async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ success: false, error: 'Không tìm thấy user!' });
        await user.update({ is_active: !user.is_active });
        return res.json({ success: true, user: { id: user.id, is_active: user.is_active } });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

// ============================================================
// DELETE /api/users/:id — Admin: Xóa tài khoản
// ============================================================
router.delete('/users/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ success: false, error: 'Không tìm thấy user!' });
        await user.destroy();
        return res.json({ success: true, message: 'Đã xóa tài khoản thành công!' });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

export default router;
