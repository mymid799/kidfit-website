import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import User from '../models/User.js';
import StaffProfile from '../models/StaffProfile.js';
import sequelize from '../config/sequelize.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

/**
 * GET /api/staff - Lấy danh sách nhân sự
 */
router.get('/staff', authenticate, authorize('admin'), async (req, res) => {
    try {
        const staff = await StaffProfile.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['username', 'email', 'is_active', 'email_verified', 'role'],
                },
            ],
            order: [['created_at', 'DESC']],
        });
        res.json({ success: true, staff });
    } catch (error) {
        console.error('Error fetching staff:', error);
        res.status(500).json({ success: false, error: 'Lỗi server khi lấy danh sách nhân sự!' });
    }
});

/**
 * POST /api/staff - Thêm mới nhân sự (Tạo User + StaffProfile)
 */
router.post('/staff', authenticate, authorize('admin'), async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const {
            username, email, password, role,
            employee_id, full_name, class_group, position, qualification, status, phone
        } = req.body;

        // 1. Create User
        const password_hash = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password_hash,
            role: role || 'teacher',
            email_verified: true, // Thường admin tạo thì mark verified luôn
            is_active: true
        }, { transaction: t });

        // 2. Create StaffProfile
        const staffProfile = await StaffProfile.create({
            user_id: user.id,
            employee_id,
            full_name,
            class_group,
            position,
            qualification,
            status: status || 'active',
            phone
        }, { transaction: t });

        await t.commit();
        res.status(201).json({ success: true, staff: { ...staffProfile.toJSON(), user: user.toSafeJSON() } });
    } catch (error: any) {
        await t.rollback();
        console.error('Error creating staff:', error);
        res.status(400).json({
            success: false,
            error: error.name === 'SequelizeUniqueConstraintError'
                ? 'Mã nhân viên, Username hoặc Email đã tồn tại!'
                : 'Lỗi khi tạo nhân sự!'
        });
    }
});

/**
 * PUT /api/staff/:id - Cập nhật thông tin nhân sự
 */
router.put('/staff/:id', authenticate, authorize('admin'), async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const {
            email, is_active,
            full_name, class_group, position, qualification, status, phone
        } = req.body;

        const staffProfile = await StaffProfile.findByPk(id);
        if (!staffProfile) {
            await t.rollback();
            return res.status(404).json({ success: false, error: 'Không tìm thấy thông tin nhân sự!' });
        }

        // Update StaffProfile
        await staffProfile.update({
            full_name, class_group, position, qualification, status, phone
        }, { transaction: t });

        // Update User
        const user = await User.findByPk(staffProfile.user_id);
        if (user) {
            await user.update({ email, is_active }, { transaction: t });
        }

        await t.commit();
        res.json({ success: true, staff: { ...staffProfile.toJSON(), user: user?.toSafeJSON() } });
    } catch (error) {
        await t.rollback();
        console.error('Error updating staff:', error);
        res.status(500).json({ success: false, error: 'Lỗi khi cập nhật nhân sự!' });
    }
});

/**
 * DELETE /api/staff/:id - Xoá nhân sự
 */
router.delete('/staff/:id', authenticate, authorize('admin'), async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const staffProfile = await StaffProfile.findByPk(id);
        if (!staffProfile) {
            await t.rollback();
            return res.status(404).json({ success: false, error: 'Không tìm thấy nhân sự!' });
        }

        // Xoá User (sẽ cascade xoá StaffProfile nhờ foreign key constraint ON DELETE CASCADE)
        await User.destroy({ where: { id: staffProfile.user_id }, transaction: t });

        await t.commit();
        res.json({ success: true, message: 'Đã xoá nhân sự thành công!' });
    } catch (error) {
        await t.rollback();
        console.error('Error deleting staff:', error);
        res.status(500).json({ success: false, error: 'Lỗi khi xoá nhân sự!' });
    }
});

export default router;
