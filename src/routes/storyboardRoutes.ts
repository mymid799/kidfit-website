/**
 * STORYBOARD ROUTES (v4.0 — Bridge to Multi-Agent Pipeline)
 * ─────────────────────────────────────────────────────────────────────
 * Route cũ giờ chỉ là cầu nối: nhận ảnh → giao cho Orchestrator → trả story_id.
 * Frontend sẽ tự redirect sang trang kết quả mới.
 */
import express, { Request, Response } from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/auth.js';
import path from 'path';
import fs from 'fs';
import { runMagicPipeline } from '../features/ai-magic/agents/orchestrator.js';

const router = express.Router();

// ─── CONFIG MULTER ──────────────────────────────────────────────────────────
const uploadDir = 'uploads/storyboard';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'drawing-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        if (allowedTypes.test(file.mimetype) && allowedTypes.test(path.extname(file.originalname).toLowerCase())) {
            return cb(null, true);
        }
        cb(new Error('Chỉ chấp nhận file ảnh (jpg, png, webp)!'));
    }
});

// ─── ROUTE: POST /api/storyboard ─────────────────────────────────────────────
// Giờ đây kích hoạt TOÀN BỘ pipeline: Vision → Story → Art → Audio → Video
router.post('/storyboard', authenticate, upload.single('drawing'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'Vui lòng tải lên bức vẽ của bé!' });
        }

        const user = (req as any).user;
        const imageBuffer = fs.readFileSync(req.file.path);
        const originalImagePath = req.file.path.replace(/\\/g, '/');

        // Giao cho Orchestrator chạy toàn bộ pipeline ngầm
        const storyId = await runMagicPipeline({
            imageBuffer,
            mimeType: req.file.mimetype,
            originalImagePath,
            userId: user.user_id,
            studentId: req.body.student_id,
            journalId: req.body.journal_id,
        });

        res.json({
            success: true,
            message: 'Cỗ Máy Ma Thuật đã khởi động! 🚀',
            story_id: storyId,
            drawingUrl: `/${originalImagePath}`,
        });

    } catch (error: any) {
        console.error('❌ Storyboard Error:', error);
        res.status(500).json({
            success: false,
            error: 'Lỗi khi xử lý phép màu AI. ' + error.message,
            details: error.message
        });
    }
});

export default router;
