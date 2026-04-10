/**
 * AI MAGIC ROUTES (v4.0 - Agent System)
 * ─────────────────────────────────────────────────────────────────────
 * Routes đơn giản hóa - chỉ nhận input và chuyển cho Orchestrator.
 * Toàn bộ logic nghiệp vụ AI đã được đẩy vào agents/.
 */
import express, { Request, Response } from 'express';
import multer from 'multer';
import { authenticate } from '../../../middleware/auth.js';
import path from 'path';
import fs from 'fs';
import MagicStory from '../models/MagicStory.js';
import { runMagicPipeline } from '../agents/orchestrator.js';
import { GeminiKeyRotator } from '../agents/geminiKeyRotator.js';

const router = express.Router();

// ─── CONFIG MULTER ──────────────────────────────────────────────────────────
const uploadDir = 'uploads/magic';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'magic-original-' + uniqueSuffix + path.extname(file.originalname));
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

// ─── POST /api/magic/generate ────────────────────────────────────────────────
// Nhận ảnh, giao cho Orchestrator, trả storyId ngay lập tức (non-blocking)
router.post('/magic/generate', authenticate, upload.single('drawing'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'Vui lòng tải lên bức vẽ của bé!' });
        }

        const user = (req as any).user;
        const imageBuffer = fs.readFileSync(req.file.path);
        const originalImagePath = req.file.path.replace(/\\/g, '/');

        // Giao toàn bộ xử lý cho Orchestrator, nhận storyId ngay
        const storyId = await runMagicPipeline({
            imageBuffer,
            mimeType: req.file.mimetype,
            originalImagePath,
            userId: user.user_id,
            studentId: req.body.student_id,
            journalId: req.body.journal_id,
        });

        // Trả về ngay lập tức, pipeline chạy ngầm
        res.json({
            success: true,
            story_id: storyId,
            message: 'Cỗ máy ma thuật đã được khởi động! 🚀'
        });

    } catch (error: any) {
        console.error('❌ Magic Route Error:', error.message);
        res.status(500).json({ success: false, error: 'Không thể khởi động cỗ máy ma thuật!', details: error.message });
    }
});

// ─── GET /api/magic/:id/status ───────────────────────────────────────────────
// Polling endpoint: Frontend gọi mỗi 3 giây để kiểm tra tiến trình
router.get('/magic/:id/status', authenticate, async (req: Request, res: Response) => {
    try {
        const story = await MagicStory.findByPk(req.params.id);
        if (!story) return res.status(404).json({ success: false, error: 'Không tìm thấy!' });

        const stepMessages: Record<string, string> = {
            'queued':  '🔍 Đang chuẩn bị...',
            'vision':  '👁️ AI đang phân tích bức vẽ của bé...',
            'story':   '📖 AI đang sáng tác câu chuyện song ngữ...',
            'art':     '🎨 AI đang vẽ ảnh 3D Pixar...',
            'audio':   '🎙️ AI đang tổng hợp giọng đọc...',
            'saving':  '💾 Đang lưu kết quả...',
            'done':    '✨ Hoàn thành! Video đang được tạo ngầm...',
            'failed':  '❌ Đã có lỗi xảy ra.',
        };

        res.json({
            success: true,
            pipelineStep: story.pipelineStep,
            stepMessage: stepMessages[story.pipelineStep] || '⚙️ Đang xử lý...',
            videoStatus: story.videoStatus,
            videoUrl: story.videoUrl,
            isDone: story.pipelineStep === 'done' || story.pipelineStep === 'failed',
            errorMessage: story.errorMessage,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Lỗi server' });
    }
});

// ─── GET /api/magic/:id ──────────────────────────────────────────────────────
// Lấy toàn bộ kết quả khi Pipeline hoàn tất
router.get('/magic/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const story = await MagicStory.findByPk(req.params.id);
        if (!story) return res.status(404).json({ success: false, error: 'Không tìm thấy câu chuyện!' });

        res.json({ success: true, data: story });
    } catch (error: any) {
        res.status(500).json({ success: false, error: 'Không thể lấy thông tin câu chuyện!' });
    }
});

// ─── GET /api/magic ──────────────────────────────────────────────────────────
router.get('/magic', authenticate, async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const stories = await MagicStory.findAll({
            where: { userId: user.id },
            order: [['createdAt', 'DESC']]
        });
        res.json({ success: true, data: stories });
    } catch (error: any) {
        res.status(500).json({ success: false, error: 'Không thể lấy danh sách câu chuyện!' });
    }
});

// ─── GET /api/magic/keys-status ──────────────────────────────────────────────
// Endpoint giám sát pool key (chỉ Admin)
router.get('/magic/keys-status', authenticate, (_req: Request, res: Response) => {
    const status = GeminiKeyRotator.getStatus();
    res.json({
        success: true,
        totalKeys: GeminiKeyRotator.poolSize,
        keys: status,
    });
});

export default router;
