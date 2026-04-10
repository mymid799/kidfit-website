import express, { Request, Response } from 'express';
import multer from 'multer';
import { authenticate } from '../../../middleware/auth.js';
import path from 'path';
import fs from 'fs';
import { generateStoryFromImage, generate3DArt, generateAudioFromText } from '../services/aiService.js';
import MagicStory from '../models/MagicStory.js';
import Journal from '../../../models/Journal.js';
import Student from '../../../models/Student.js';

const router = express.Router();

// ─── CONFIG MULTER ──────────────────────────────────────────────────────────
const uploadDir = 'uploads/magic';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'magic-original-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (_req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const mimetype = allowedTypes.test(file.mimetype);
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Chỉ chấp nhận file ảnh (jpg, png, webp)!'));
    }
});

// Helper to download DALL-E image
const downloadImage = async (url: string, filepath: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filepath, buffer);
};

// ─── ROUTE: POST /api/magic/generate ─────────────────────────────────────────────
router.post('/magic/generate', authenticate, upload.single('drawing'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'Vui lòng tải lên bức vẽ của bé!' });
        }

        const user = (req as any).user;
        const student_id = req.body.student_id; // Added student_id support
        const journal_id = req.body.journal_id; // Added journal_id support
        const originalImagePath = req.file.path.replace(/\\/g, '/');

        // 1. Phân tích ảnh với Gemini
        const imageBuffer = fs.readFileSync(req.file.path);
        const geminiResult = await generateStoryFromImage(imageBuffer, req.file.mimetype);

        // 2. Tạo ảnh 3D với DALL-E
        const dalleImageUrl = await generate3DArt(geminiResult.dallePrompt);

        // 3. Tải ảnh DALL-E về server lưu cục bộ
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const localAiImageName = `magic-ai-${uniqueSuffix}.png`;
        const localAiImagePath = path.join(uploadDir, localAiImageName);
        
        await downloadImage(dalleImageUrl, localAiImagePath);
        const aiImagePathUrl = localAiImagePath.replace(/\\/g, '/');

        // 3b. Tạo Audio từ truyện (OpenAI TTS)
        const audioBuffer = await generateAudioFromText(geminiResult.story);
        const localAudioName = `magic-audio-${uniqueSuffix}.mp3`;
        const localAudioPath = path.join(uploadDir, localAudioName);
        fs.writeFileSync(localAudioPath, audioBuffer);
        const audioPathUrl = localAudioPath.replace(/\\/g, '/');

        // 4. Lưu vào Database
        const magicStory = await MagicStory.create({
            userId: user.id,
            studentId: student_id || null,
            journalId: journal_id || null,
            originalImageUrl: `/${originalImagePath}`,
            aiImageUrl: `/${aiImagePathUrl}`,
            audioUrl: `/${audioPathUrl}`,
            aiStoryText: geminiResult.story,
            title: "Câu chuyện diệu kỳ của bé"
        });

        // 5. Nếu có học sinh, tự động tạo một dòng nhật ký (Journal) tóm tắt
        if (student_id) {
            const student = await Student.findByPk(student_id);
            const studentName = student ? student.fullName : "Bé";

            await Journal.create({
                student_id: student_id,
                teacher_id: user.id,
                content: `🎨 Một phép màu đã dành riêng cho ${studentName}! Bé vừa có một tác phẩm nghệ thuật 3D và video kể chuyện AI tuyệt đẹp từ bức tranh vẽ trong tiết học.`,
                images: [`/${originalImagePath}`, `/${aiImagePathUrl}`],
                mood: 'hào hứng',
                date: new Date(),
                tenant_id: 'default'
            });
        }

        res.json({
            success: true,
            story_id: magicStory.id,
            message: 'Phép màu đã hoàn tất!'
        });

    } catch (error: any) {
        console.error('❌ Magic Story Pipeline Error:', error);
        res.status(500).json({
            success: false,
            error: 'Đã có lỗi xảy ra trong cỗ máy ma thuật!',
            details: error.message
        });
    }
});

// ─── ROUTE: GET /api/magic/:id ─────────────────────────────────────────────
router.get('/magic/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const magicStory = await MagicStory.findByPk(id);

        if (!magicStory) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy câu chuyện ma thuật này!' });
        }

        res.json({
            success: true,
            data: magicStory
        });
    } catch (error: any) {
        console.error('❌ Magic Story Fetch Error:', error);
        res.status(500).json({
            success: false,
            error: 'Không thể lấy thông tin câu chuyện!'
        });
    }
});

// ─── ROUTE: GET /api/magic ─────────────────────────────────────────────
router.get('/magic', authenticate, async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const magicStories = await MagicStory.findAll({
            where: { userId: user.id },
            order: [['createdAt', 'DESC']]
        });

        res.json({
            success: true,
            data: magicStories
        });
    } catch (error: any) {
        console.error('❌ Magic Story List Error:', error);
        res.status(500).json({
            success: false,
            error: 'Không thể lấy danh sách câu chuyện!'
        });
    }
});

export default router;
