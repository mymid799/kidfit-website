import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authenticate, authorize } from '../middleware/auth.js';
import Gallery from '../models/Gallery.js';
import ParentProfile from '../models/ParentProfile.js';
import User from '../models/User.js';

const router = express.Router();

// ─── CONFIG MULTER ──────────────────────────────────────────────────────────
const galleryDir = 'uploads/gallery';
if (!fs.existsSync(galleryDir)) {
    fs.mkdirSync(galleryDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, galleryDir);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'img-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (_req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const mimetype = allowedTypes.test(file.mimetype);
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Chỉ chấp nhận file ảnh (jpg, png, gif, webp)!'));
    }
});

// ─── ROUTES ──────────────────────────────────────────────────────────────────

/**
 * POST /api/gallery/upload
 * Giáo viên upload ảnh bài giảng
 */
router.post('/gallery/upload', authenticate, authorize('teacher', 'admin', 'staff'), upload.single('image'), async (req: any, res) => {
    try {
        const { title, description, target_class, module: lessonModule, lesson, date } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, error: 'Vui lòng chọn file ảnh!' });
        }

        if (!title || !target_class) {
            // Xoá file nếu thiếu thông tin
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ success: false, error: 'Tiêu đề và lớp học là bắt buộc!' });
        }

        const gallery = await Gallery.create({
            title,
            description,
            target_class,
            module: lessonModule || null,
            lesson: lesson || null,
            date: date ? new Date(date) : null,
            file_path: `/${req.file.path.replace(/\\/g, '/')}`,
            teacher_id: req.user.user_id,
            has_video: false, // Default to false
        });

        res.status(201).json({
            success: true,
            message: 'Tải lên ảnh thành công!',
            gallery
        });
    } catch (error: any) {
        console.error('❌ Upload Gallery Error:', error);
        // Xoá file vật lý nếu data không lưu được vào DB
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ success: false, error: 'Lỗi server khi tải lên ảnh!', details: error.message });
    }
});

/**
 * GET /api/gallery
 * Lấy danh sách ảnh (Teacher: tất cả của mình, Parent: theo lớp của con)
 */
router.get('/gallery', authenticate, async (req: any, res) => {
    try {
        const { role, user_id } = req.user;
        let whereClause: any = {};

        if (role === 'teacher') {
            whereClause.teacher_id = user_id;
        } else if (role === 'parent') {
            const profile = await ParentProfile.findOne({ where: { user_id: user_id } });
            if (!profile || !profile.class_name) {
                return res.json({ success: true, items: [], message: 'Chưa gán lớp cho phụ huynh.' });
            }
            whereClause.target_class = profile.class_name;
        }

        const items = await Gallery.findAll({
            where: whereClause,
            include: [
                {
                    model: User,
                    as: 'teacher',
                    attributes: ['username']
                }
            ],
            order: [['created_at', 'DESC']]
        });

        res.json({ success: true, items });
    } catch (error: any) {
        console.error('❌ Fetch Gallery Error:', error);
        res.status(500).json({ success: false, error: 'Lỗi server khi lấy danh sách ảnh!' });
    }
});

/**
 * DELETE /api/gallery/:id
 */
router.delete('/gallery/:id', authenticate, authorize('teacher', 'admin', 'staff'), async (req: any, res) => {
    try {
        const gallery = await Gallery.findByPk(req.params.id);
        if (!gallery) return res.status(404).json({ success: false, error: 'Không tìm thấy ảnh!' });

        // Kiểm tra quyền (chỉ giáo viên upload hoặc admin mới được xoá)
        if (req.user.role !== 'admin' && gallery.teacher_id !== req.user.user_id) {
            return res.status(403).json({ success: false, error: 'Bạn không có quyền xoá ảnh này!' });
        }

        // Xoá file vật lý
        const fullPath = path.join(process.cwd(), gallery.file_path);
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
        }

        await gallery.destroy();
        res.json({ success: true, message: 'Đã xoá ảnh thành công!' });
    } catch (error) {
        console.error('❌ Delete Gallery Error:', error);
        res.status(500).json({ success: false, error: 'Lỗi server khi xoá ảnh!' });
    }
});

export default router;
