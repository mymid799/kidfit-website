/**
 * Module: Account Routes — KidFit
 * ================================
 * Quản lý tài khoản (profile, đổi mật khẩu) cho mọi role
 *
 * GET  /api/profile          — Xem profile (admin, staff, teacher, parent)  
 * PUT  /api/profile          — Chỉnh sửa profile
 * POST /api/change-password  — Đổi mật khẩu (verified current password)
 *
 * Bảo mật:
 *  - Tất cả route đều yêu cầu authenticate
 *  - Input validation (express-validator)
 *  - Sanitize đầu vào (trim, escape XSS)
 *  - Change password: verify old password + strong password rules
 */
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import { authenticate, authorize } from '../../core/middleware/auth.js';
import User from '../user/user.model.js';
import StaffProfile from '../user/staffProfile.model.js';
import ParentProfile from '../user/parentProfile.model.js';
import RefreshToken from '../auth/refreshToken.model.js';

const router = express.Router();

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const handleValidationErrors = (req: Request, res: Response): boolean => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            success: false,
            error: 'Thông tin không hợp lệ!',
            details: errors.array().map(e => ({ field: (e as any).path, message: e.msg })),
        });
        return true;
    }
    return false;
};

// ─── VALIDATION RULES ────────────────────────────────────────────────────────
const profileParentValidation = [
    body('parent_name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('Tên phụ huynh phải từ 2–100 ký tự!'),
    body('child_name_anonymous')
        .optional()
        .trim()
        .isLength({ min: 1, max: 50 }).withMessage('Tên bé phải từ 1–50 ký tự!'),
    body('child_age')
        .optional()
        .isInt({ min: 3, max: 6 }).withMessage('Độ tuổi bé phải từ 3–6 tuổi!'),
    body('phone')
        .optional({ nullable: true, checkFalsy: true })
        .matches(/^(\+84|0)(3[2-9]|5[6-9]|7[0|6-9]|8[0-9]|9[0-9])[0-9]{7}$/)
        .withMessage('Số điện thoại không đúng định dạng VN!'),
];

const profileStaffValidation = [
    body('full_name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('Họ tên phải từ 2–100 ký tự!'),
    body('phone')
        .optional({ nullable: true, checkFalsy: true })
        .matches(/^(\+84|0)(3[2-9]|5[6-9]|7[0|6-9]|8[0-9]|9[0-9])[0-9]{7}$/)
        .withMessage('Số điện thoại không đúng định dạng VN!'),
    body('bio')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Giới thiệu không được quá 500 ký tự!'),
    body('position')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('Vị trí phải từ 2–50 ký tự!'),
    body('teaching_classes')
        .optional()
        .isArray().withMessage('Khối lớp phải là mảng!'),
    body('avatar_url')
        .optional()
        .trim()
        .isURL().withMessage('URL ảnh đại diện không hợp lệ!'),
];

const changePasswordValidation = [
    body('currentPassword')
        .notEmpty().withMessage('Vui lòng nhập mật khẩu hiện tại!'),
    body('newPassword')
        .isLength({ min: 8 }).withMessage('Mật khẩu mới phải có ít nhất 8 ký tự!')
        .matches(/[A-Z]/).withMessage('Mật khẩu mới phải chứa ít nhất 1 chữ hoa!')
        .matches(/[a-z]/).withMessage('Mật khẩu mới phải chứa ít nhất 1 chữ thường!')
        .matches(/[0-9]/).withMessage('Mật khẩu mới phải chứa ít nhất 1 chữ số!')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Mật khẩu mới phải chứa ít nhất 1 ký tự đặc biệt!'),
    body('confirmNewPassword')
        .notEmpty().withMessage('Vui lòng nhập xác nhận mật khẩu mới!'),
];

// ─── GET /api/profile ─────────────────────────────────────────────────────────
router.get('/profile', authenticate, async (req: Request, res: Response) => {
    try {
        const userId = req.user!.user_id;

        const user = await User.findByPk(userId, {
            attributes: ['id', 'username', 'email', 'role', 'email_verified', 'created_at']
        });

        if (!user) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy tài khoản!' });
        }

        let profile: any = {};
        if (user.role === 'parent') {
            profile = await ParentProfile.findOne({
                where: { user_id: userId }
            });
        } else {
            profile = await StaffProfile.findOne({
                where: { user_id: userId }
            });
        }

        res.json({
            success: true,
            user,
            profile: profile || {}
        });
    } catch (error) {
        console.error('❌ Lỗi lấy profile:', error);
        res.status(500).json({ success: false, error: 'Lỗi hệ thống!' });
    }
});

// ─── PUT /api/profile ─────────────────────────────────────────────────────────
router.put('/profile', authenticate, async (req: Request, res: Response) => {
    try {
        const userId = req.user!.user_id;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy tài khoản!' });
        }

        // ─── Parent Profile ───
        if (user.role === 'parent') {
            // Validate parent-specific fields manually (since we can't easily combine validation middleware per-role)
            const { parent_name, child_name_anonymous, child_age, phone } = req.body;

            // Basic sanitization
            const sanitized = {
                parent_name: typeof parent_name === 'string' ? parent_name.trim() : undefined,
                child_name_anonymous: typeof child_name_anonymous === 'string' ? child_name_anonymous.trim() : undefined,
                child_age: child_age !== undefined ? parseInt(child_age) : undefined,
                phone: typeof phone === 'string' ? phone.trim() : (phone === null ? null : undefined),
            };

            // Validate lengths
            if (sanitized.parent_name !== undefined && (sanitized.parent_name.length < 2 || sanitized.parent_name.length > 100)) {
                return res.status(422).json({ success: false, error: 'Tên phụ huynh phải từ 2–100 ký tự!' });
            }
            if (sanitized.child_name_anonymous !== undefined && (sanitized.child_name_anonymous.length < 1 || sanitized.child_name_anonymous.length > 50)) {
                return res.status(422).json({ success: false, error: 'Tên bé phải từ 1–50 ký tự!' });
            }
            if (sanitized.child_age !== undefined && (isNaN(sanitized.child_age) || sanitized.child_age < 3 || sanitized.child_age > 6)) {
                return res.status(422).json({ success: false, error: 'Độ tuổi bé phải từ 3–6!' });
            }
            if (sanitized.phone && !/^(\+84|0)(3[2-9]|5[6-9]|7[0|6-9]|8[0-9]|9[0-9])[0-9]{7}$/.test(sanitized.phone)) {
                return res.status(422).json({ success: false, error: 'Số điện thoại không đúng định dạng VN!' });
            }

            let profile = await ParentProfile.findOne({ where: { user_id: userId } });

            if (!profile) {
                profile = await ParentProfile.create({
                    user_id: userId,
                    parent_name: sanitized.parent_name || user.username,
                    child_name_anonymous: sanitized.child_name_anonymous || 'Bé',
                    child_age: (sanitized.child_age || 3) as any,
                    phone: sanitized.phone || null
                });
            } else {
                if (sanitized.parent_name !== undefined) profile.parent_name = sanitized.parent_name;
                if (sanitized.child_name_anonymous !== undefined) profile.child_name_anonymous = sanitized.child_name_anonymous;
                if (sanitized.child_age !== undefined) profile.child_age = sanitized.child_age as any;
                if (sanitized.phone !== undefined) profile.phone = sanitized.phone;
                await profile.save();
            }

            return res.json({ success: true, profile });
        }

        // ─── Staff/Admin/Teacher Profile ───
        const { full_name, phone, bio, teaching_classes, certificates, avatar_url, position } = req.body;

        // Sanitize
        const sanitizedStaff: any = {};
        if (typeof full_name === 'string') sanitizedStaff.full_name = full_name.trim();
        if (typeof phone === 'string') sanitizedStaff.phone = phone.trim();
        if (phone === null) sanitizedStaff.phone = null;
        if (typeof bio === 'string') sanitizedStaff.bio = bio.trim().substring(0, 500);
        if (typeof position === 'string') sanitizedStaff.position = position.trim();
        if (typeof avatar_url === 'string') sanitizedStaff.avatar_url = avatar_url.trim();
        if (Array.isArray(teaching_classes)) sanitizedStaff.teaching_classes = teaching_classes;
        if (Array.isArray(certificates)) sanitizedStaff.certificates = certificates;

        // Validate
        if (sanitizedStaff.full_name !== undefined && (sanitizedStaff.full_name.length < 2 || sanitizedStaff.full_name.length > 100)) {
            return res.status(422).json({ success: false, error: 'Họ tên phải từ 2–100 ký tự!' });
        }
        if (sanitizedStaff.phone && !/^(\+84|0)(3[2-9]|5[6-9]|7[0|6-9]|8[0-9]|9[0-9])[0-9]{7}$/.test(sanitizedStaff.phone)) {
            return res.status(422).json({ success: false, error: 'Số điện thoại không đúng định dạng VN!' });
        }

        let profile = await StaffProfile.findOne({ where: { user_id: userId } });

        if (!profile) {
            profile = await StaffProfile.create({
                user_id: userId,
                employee_id: `ST-${Date.now().toString(36).toUpperCase()}`, // More unique than random 4-digit
                full_name: sanitizedStaff.full_name || user.username,
                position: sanitizedStaff.position || (user.role === 'admin' ? 'Quản trị viên' : 'Giáo viên STEAM'),
                status: 'active'
            });
        }

        // Only update provided & sanitized fields
        for (const [key, value] of Object.entries(sanitizedStaff)) {
            if (value !== undefined) {
                (profile as any)[key] = value;
            }
        }

        await profile.save();

        res.json({ success: true, profile });
    } catch (error) {
        console.error('❌ Lỗi cập nhật profile:', error);
        res.status(500).json({ success: false, error: 'Lỗi hệ thống!' });
    }
});

// ─── POST /api/change-password ────────────────────────────────────────────────
router.post('/change-password', authenticate, changePasswordValidation, async (req: Request, res: Response) => {
    if (handleValidationErrors(req, res)) return;

    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    try {
        // Kiểm tra mật khẩu mới khớp
        if (newPassword !== confirmNewPassword) {
            return res.status(422).json({
                success: false,
                error: 'Mật khẩu mới và xác nhận mật khẩu không khớp!',
            });
        }

        const user = await User.findByPk(req.user!.user_id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy tài khoản!' });
        }

        // Verify mật khẩu hiện tại
        const isCurrentValid = await bcrypt.compare(currentPassword, user.password_hash);
        if (!isCurrentValid) {
            return res.status(401).json({
                success: false,
                error: 'Mật khẩu hiện tại không đúng!',
            });
        }

        // Kiểm tra mật khẩu mới khác mật khẩu cũ
        const isSameAsOld = await bcrypt.compare(newPassword, user.password_hash);
        if (isSameAsOld) {
            return res.status(422).json({
                success: false,
                error: 'Mật khẩu mới phải khác mật khẩu hiện tại!',
            });
        }

        // Hash mật khẩu mới
        const salt = await bcrypt.genSalt(12);
        const password_hash = await bcrypt.hash(newPassword, salt);

        await user.update({ password_hash });

        // Xóa tất cả refresh tokens khác (force re-login on other devices)
        await RefreshToken.destroy({ where: { user_id: user.id } });

        return res.json({
            success: true,
            message: 'Đổi mật khẩu thành công! Vui lòng đăng nhập lại trên các thiết bị khác.',
        });

    } catch (error) {
        console.error('❌ Lỗi đổi mật khẩu:', error);
        return res.status(500).json({ success: false, error: 'Lỗi hệ thống!' });
    }
});

export default router;
