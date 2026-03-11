import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authenticate, authorize } from '../middleware/auth.js';
import Video from '../models/Video.js';
import ParentProfile from '../models/ParentProfile.js';
import User from '../models/User.js';

const router = express.Router();

// ─── CONFIG MULTER ──────────────────────────────────────────────────────────
const videoDir = 'uploads/videos';
if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, videoDir);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'video-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
    fileFilter: (_req, file, cb) => {
        const allowedTypes = /mp4|mkv|mov|avi/;
        const mimetype = allowedTypes.test(file.mimetype);
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Chỉ chấp nhận file video (mp4, mkv, mov, avi)!'));
    }
});

// ─── ROUTES ──────────────────────────────────────────────────────────────────

/**
 * POST /api/videos/upload
 * Giáo viên upload video bài giảng
 */
router.post('/videos/upload', authenticate, authorize('teacher', 'admin'), upload.single('video'), async (req: any, res) => {
    try {
        const { title, description, target_class } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, error: 'Vui lòng chọn file video!' });
        }

        if (!title || !target_class) {
            // Xoá file nếu thiếu thông tin
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ success: false, error: 'Tiêu đề và lớp học là bắt buộc!' });
        }

        const video = await Video.create({
            title,
            description,
            target_class,
            file_path: `/${req.file.path.replace(/\\/g, '/')}`,
            teacher_id: req.user.user_id,
        });

        res.status(201).json({
            success: true,
            message: 'Tải lên video thành công!',
            video
        });
    } catch (error: any) {
        console.error('❌ Upload Video Error:', error);
        // Xoá file vật lý nếu data không lưu được vào DB
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ success: false, error: 'Lỗi server khi tải lên video!', details: error.message });
    }
});

/**
 * GET /api/videos
 * Lấy danh sách video (Teacher: tất cả của mình, Parent: theo lớp của con)
 */
router.get('/videos', authenticate, async (req: any, res) => {
    try {
        const { role, user_id } = req.user;
        let whereClause: any = {};

        if (role === 'teacher') {
            whereClause.teacher_id = user_id;
        } else if (role === 'parent') {
            const profile = await ParentProfile.findOne({ where: { user_id: user_id } });
            if (!profile || !profile.class_name) {
                return res.json({ success: true, videos: [], message: 'Chưa gán lớp cho phụ huynh.' });
            }
            whereClause.target_class = profile.class_name;
        }

        const videos = await Video.findAll({
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

        res.json({ success: true, videos });
    } catch (error: any) {
        console.error('❌ Fetch Videos Error:', error);
        res.status(500).json({ success: false, error: 'Lỗi server khi lấy danh sách video!' });
    }
});

/**
 * DELETE /api/videos/:id
 */
router.delete('/videos/:id', authenticate, authorize('teacher', 'admin'), async (req: any, res) => {
    try {
        const video = await Video.findByPk(req.params.id);
        if (!video) return res.status(404).json({ success: false, error: 'Không tìm thấy video!' });

        // Kiểm tra quyền (chỉ giáo viên upload hoặc admin mới được xoá)
        if (req.user.role !== 'admin' && video.teacher_id !== req.user.user_id) {
            return res.status(403).json({ success: false, error: 'Bạn không có quyền xoá video này!' });
        }

        // Xoá file vật lý
        const fullPath = path.join(process.cwd(), video.file_path);
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
        }

        await video.destroy();
        res.json({ success: true, message: 'Đã xoá video thành công!' });
    } catch (error) {
        console.error('❌ Delete Video Error:', error);
        res.status(500).json({ success: false, error: 'Lỗi server khi xoá video!' });
    }
});

export default router;
