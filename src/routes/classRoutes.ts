import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import Class from '../models/Class.js';
import StaffProfile from '../models/StaffProfile.js';

const router = express.Router();

/**
 * GET /api/classes - Lấy danh sách lớp học
 */
router.get('/classes', authenticate, async (req, res) => {
    try {
        const classes = await Class.findAll({
            include: [
                {
                    model: StaffProfile,
                    as: 'teacher',
                    attributes: ['id', 'full_name', 'avatar_url', 'position'],
                }
            ],
            order: [['created_at', 'DESC']]
        });
        res.json({ success: true, classes });
    } catch (error) {
        console.error('Error fetching classes:', error);
        res.status(500).json({ success: false, error: 'Lỗi server khi lấy danh sách lớp học!' });
    }
});

/**
 * POST /api/classes - Thêm mới lớp học
 */
router.post('/classes', authenticate, authorize('admin'), async (req, res) => {
    try {
        const { name, code, room, teacher_id, capacity, status, icon, color, grad } = req.body;
        const newClass = await Class.create({
            name, code, room, teacher_id, capacity, status, icon, color, grad
        });
        res.status(201).json({ success: true, class: newClass });
    } catch (error: any) {
        console.error('Error creating class:', error);
        res.status(400).json({
            success: false,
            error: error.name === 'SequelizeUniqueConstraintError'
                ? 'Mã lớp học đã tồn tại!'
                : 'Lỗi khi tạo lớp học!'
        });
    }
});

/**
 * PUT /api/classes/:id - Cập nhật lớp học
 */
router.put('/classes/:id', authenticate, authorize('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const classItem = await Class.findByPk(id);
        if (!classItem) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy lớp học!' });
        }
        await classItem.update(req.body);
        res.json({ success: true, class: classItem });
    } catch (error) {
        console.error('Error updating class:', error);
        res.status(500).json({ success: false, error: 'Lỗi khi cập nhật lớp học!' });
    }
});

/**
 * DELETE /api/classes/:id - Xoá lớp học
 */
router.delete('/classes/:id', authenticate, authorize('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Class.destroy({ where: { id } });
        if (result === 0) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy lớp học!' });
        }
        res.json({ success: true, message: 'Đã xoá lớp học thành công!' });
    } catch (error) {
        console.error('Error deleting class:', error);
        res.status(500).json({ success: false, error: 'Lỗi khi xoá lớp học!' });
    }
});

export default router;
