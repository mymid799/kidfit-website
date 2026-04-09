/**
 * Module: User Management Routes (Admin-facing)
 * GET    /api/users           — Danh sách users
 * POST   /api/users           — Tạo tài khoản (tất cả vai trò)
 * POST   /api/users/teacher   — Tạo tài khoản giáo viên
 * PUT    /api/users/:id       — Cập nhật thông tin user
 * PATCH  /api/users/:id/role  — Cập nhật role
 * PATCH  /api/users/:id/toggle — Khoá/Mở khoá
 * DELETE /api/users/:id       — Xoá user
 */
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import sequelize from '../../core/config/database.js';
import User from './user.model.js';
import ParentProfile from './parentProfile.model.js';
import StaffProfile from './staffProfile.model.js';
import { Role, Permission, RolePermission } from './rolePermission.model.js';
import { authenticate, authorize } from '../../core/middleware/auth.js';

const router = express.Router();

// ─── GET /api/users ───────────────────────────────────────────────────────────
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

// ─── PATCH /api/users/:id/role ────────────────────────────────────────────────
router.patch('/users/:id/role', authenticate, authorize('admin', 'it_admin', 'principal'), async (req: Request, res: Response) => {
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

// ─── POST /api/users/teacher ──────────────────────────────────────────────────
router.post('/users/teacher', authenticate, authorize('admin', 'it_admin', 'principal'), async (req: Request, res: Response) => {
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

        const result = await sequelize.transaction(async (t) => {
            const newUser = await User.create({
                username: username.toLowerCase(),
                email: email.toLowerCase(),
                password_hash,
                role: 'teacher',
                email_verified: true,
                email_verify_token: null,
            }, { transaction: t });

            const profile = await StaffProfile.create({
                user_id: newUser.id,
                employee_id: `ST-${Math.floor(1000 + Math.random() * 9000)}`,
                full_name: fullName,
                position: 'Giáo viên STEAM',
                phone: phone || null,
                status: 'active'
            }, { transaction: t });

            return { newUser, profile };
        });

        return res.status(201).json({
            success: true,
            message: `Đã tạo tài khoản giáo viên cho ${fullName} thành công!`,
            user: {
                id: result.newUser.id,
                username: result.newUser.username,
                email: result.newUser.email,
                role: result.newUser.role,
                fullName: result.profile.full_name,
                phone: result.profile.phone,
                employee_id: result.profile.employee_id,
                created_at: result.newUser.created_at,
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

// ─── POST /api/users ──────────────────────────────────────────────────────────
router.post('/users', authenticate, authorize('admin', 'it_admin', 'principal'), async (req: Request, res: Response) => {
    const { username, fullName, email, password, phone, role, grade_block } = req.body;

    if (!username || !fullName || !email || !password || !role) {
        return res.status(400).json({ success: false, error: 'Vui lòng nhập đủ thông tin bắt buộc!' });
    }
    if (password.length < 8) {
        return res.status(400).json({ success: false, error: 'Mật khẩu phải từ 8 ký tự!' });
    }

    const validRoles = ['admin', 'teacher', 'parent', 'student', 'it_admin', 'principal', 'specialist', 'class_teacher'];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ success: false, error: 'Vai trò không hợp lệ!' });
    }

    try {
        const existing = await User.findOne({
            where: { [Op.or]: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }] }
        });
        if (existing) {
            const fieldError = existing.username === username.toLowerCase() ? 'Username' : 'Email';
            return res.status(409).json({ success: false, error: `${fieldError} này đã được sử dụng!` });
        }

        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        const result = await sequelize.transaction(async (t) => {
            const newUser = await User.create({
                username: username.toLowerCase(),
                email: email.toLowerCase(),
                password_hash,
                role: role as any,
                email_verified: true,
                email_verify_token: null,
            }, { transaction: t });

            if (['it_admin', 'principal', 'specialist', 'class_teacher', 'admin', 'teacher'].includes(role)) {
                let position = 'Nhân sự';
                if (role === 'it_admin') position = 'Quản trị hệ thống (IT)';
                else if (role === 'principal') position = 'Ban Giám Hiệu';
                else if (role === 'specialist') position = 'Tổ trưởng Chuyên môn';
                else if (role === 'class_teacher') position = 'Giáo viên Chủ nhiệm';
                else if (role === 'admin') position = 'Quản trị viên';
                else if (role === 'teacher') position = 'Giáo viên STEAM';

                await StaffProfile.create({
                    user_id: newUser.id,
                    employee_id: `${role.substring(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
                    full_name: fullName,
                    position,
                    grade_block: grade_block || 'ALL',
                    phone: phone || null,
                    status: 'active'
                }, { transaction: t });
            } else if (role === 'parent') {
                await ParentProfile.create({
                    user_id: newUser.id,
                    parent_name: fullName,
                    child_name_anonymous: 'Bé ' + fullName,
                    child_age: 5,
                    phone: phone || null,
                }, { transaction: t });
            }

            return newUser;
        });

        return res.status(201).json({
            success: true,
            message: `Tài khoản ${fullName} đã được tạo thành công!`,
            user: {
                id: result.id,
                email: result.email,
                role: result.role,
            }
        });
    } catch (error: any) {
        console.error('❌ Lỗi tạo user:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ success: false, error: 'Username hoặc Email đã tồn tại!' });
        }
        return res.status(500).json({ success: false, error: 'Lỗi hệ thống!' });
    }
});

// ─── PUT /api/users/:id ───────────────────────────────────────────────────────
router.put('/users/:id', authenticate, authorize('admin', 'it_admin', 'principal'), async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, role, is_active, password, fullName, phone, grade_block } = req.body;

    try {
        const user = await User.findByPk(id, {
            include: [
                { model: StaffProfile, as: 'staffProfile' },
                { model: ParentProfile, as: 'parentProfile' }
            ]
        });
        if (!user) return res.status(404).json({ success: false, error: 'Không tìm thấy user!' });

        const updateData: any = {};
        if (email) updateData.email = email.toLowerCase();
        if (role) updateData.role = role;
        if (typeof is_active === 'boolean') updateData.is_active = is_active;
        if (password && password.length >= 8) {
            const salt = await bcrypt.genSalt(10);
            updateData.password_hash = await bcrypt.hash(password, salt);
        }

        await sequelize.transaction(async (t) => {
            await user.update(updateData, { transaction: t });
            
            if (fullName || phone || grade_block) {
                if (['it_admin', 'principal', 'specialist', 'class_teacher', 'admin', 'teacher'].includes(user.role)) {
                    const [staff] = await StaffProfile.findOrCreate({ 
                        where: { user_id: user.id }, 
                        defaults: { full_name: fullName || user.username, employee_id: `ST-${Date.now()}`, position: 'Nhân sự' }, 
                        transaction: t 
                    });
                    if (fullName) staff.full_name = fullName;
                    if (phone !== undefined) staff.phone = phone || null;
                    if (grade_block) staff.grade_block = grade_block;
                    await staff.save({ transaction: t });
                } else if (user.role === 'parent') {
                    const [parent] = await ParentProfile.findOrCreate({ 
                        where: { user_id: user.id }, 
                        defaults: { parent_name: fullName || user.username, child_name_anonymous: 'Bé', child_age: 5 }, 
                        transaction: t 
                    });
                    if (fullName) parent.parent_name = fullName;
                    if (phone !== undefined) parent.phone = phone || null;
                    await parent.save({ transaction: t });
                }
            }
        });

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

// ─── PATCH /api/users/:id/toggle ──────────────────────────────────────────────
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

// ─── DELETE /api/users/:id ────────────────────────────────────────────────────
router.delete('/users/:id', authenticate, authorize('admin', 'it_admin', 'principal'), async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ success: false, error: 'Không tìm thấy user!' });
        await user.destroy();
        return res.json({ success: true, message: 'Đã xóa tài khoản thành công!' });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

// ─── ROLES & PERMISSIONS MANAGEMENT ──────────────────────────────────────────
router.get('/roles', authenticate, authorize('admin', 'it_admin'), async (_req, res) => {
    try {
        const roles = await Role.findAll({
            include: [{ model: Permission, as: 'permissions' }]
        });
        return res.json({ success: true, roles });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

router.post('/roles', authenticate, authorize('admin', 'it_admin'), async (req, res) => {
    try {
        const { name, display_name, description, permissionIds } = req.body;
        const role = await Role.create({ name, display_name, description });
        if (permissionIds && permissionIds.length > 0) {
            await (role as any).setPermissions(permissionIds);
        }
        return res.status(201).json({ success: true, role });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

router.put('/roles/:id/permissions', authenticate, authorize('admin', 'it_admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const { permissionIds } = req.body;
        const role = await Role.findByPk(id);
        if (!role) return res.status(404).json({ success: false, error: 'Không tìm thấy vai trò!' });

        await (role as any).setPermissions(permissionIds);
        return res.json({ success: true, message: 'Cập nhật phân quyền thành công!' });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

router.get('/permissions', authenticate, authorize('admin', 'it_admin'), async (_req, res) => {
    try {
        const permissions = await Permission.findAll();
        return res.json({ success: true, permissions });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

export default router;
