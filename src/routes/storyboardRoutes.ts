import express, { Request, Response } from 'express';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { authenticate } from '../middleware/auth.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// ─── CONFIG MULTER ──────────────────────────────────────────────────────────
const uploadDir = 'uploads/storyboard';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'drawing-' + uniqueSuffix + path.extname(file.originalname));
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

// ─── CONFIG GEMINI ──────────────────────────────────────────────────────────
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// ─── ROUTE: POST /api/storyboard ─────────────────────────────────────────────
router.post('/storyboard', authenticate, upload.single('drawing'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'Vui lòng tải lên bức vẽ của bé!' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const imageData = fs.readFileSync(req.file.path);
        
        const imagePart = {
            inlineData: {
                data: imageData.toString('base64'),
                mimeType: req.file.mimetype
            }
        };

        const prompt = "Đây là bức tranh vẽ tay của trẻ 3-6 tuổi. Hãy phân tích chi tiết đối tượng, hình khối chính, màu sắc, bố cục và cảm xúc của bức tranh. Sau đó, dựa trên những gì thấy được, hãy sáng tác một câu chuyện ngắn (3-5 câu) bằng tiếng Việt, mang tính tích cực, ấm áp, phù hợp cho trẻ mầm non. Câu chuyện nên bắt đầu bằng phong cách kể chuyện cổ tích cho bé.";

        const result = await model.generateContent([prompt, imagePart]);
        const analysisResult = result.response.text();

        res.json({
            success: true,
            message: 'Phép màu đã được tạo thành công!',
            story: analysisResult,
            drawingUrl: `/${req.file.path.replace(/\\/g, '/')}`,
        });

    } catch (error: any) {
        console.error('❌ Storyboard Error (Gemini):', error);
        res.status(500).json({
            success: false,
            error: 'Lỗi khi xử lý phép màu AI bằng Gemini. Vui lòng kiểm tra API Key!',
            details: error.message
        });
    }
});

export default router;
