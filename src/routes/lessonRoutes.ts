import express, { Request, Response } from 'express';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { authenticate, authorize } from '../middleware/auth.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// ─── CONFIG MULTER ──────────────────────────────────────────────────────────
const uploadDir = 'uploads/lessons';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'lesson-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (_req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp|pdf/;
        const mimetype = allowedTypes.test(file.mimetype);
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype || extname) {
            return cb(null, true);
        }
        cb(new Error('Chỉ chấp nhận file ảnh (jpg, png, webp) hoặc PDF!'));
    }
});

// ─── CONFIG GEMINI ──────────────────────────────────────────────────────────
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// ─── ROUTE: POST /api/lessons/generate ───────────────────────────────────────
router.post('/lessons/generate', authenticate, authorize('teacher', 'admin'), upload.single('document'), async (req: Request, res: Response) => {
    try {
        const { topic, ageGroup, duration, activityCount } = req.body;

        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            generationConfig: { responseMimeType: "application/json" }
        });

        let prompt = `Bạn là một chuyên gia giáo dục STEAM mầm non. Hãy thiết kế một giáo trình bài giảng chi tiết dựa trên các thông số sau:
- Chủ đề: ${topic || 'Tự chọn'}
- Độ tuổi: ${ageGroup || '5-6 tuổi'}
- Thời lượng: ${duration || '45 phút'}
- Số lượng hoạt động chính: ${activityCount || 4}

Yêu cầu kết quả trả về dưới dạng JSON có cấu trúc sau:
{
  "title": "Tiêu đề bài giảng hấp dẫn",
  "topic_tag": "STEAM - [Lĩnh vực]",
  "objectives": {
    "knowledge": "Mục tiêu kiến thức",
    "skills": "Mục tiêu kỹ năng",
    "attitude": "Mục tiêu thái độ"
  },
  "activities": [
    { "step": 1, "title": "Tên hoạt động", "desc": "Mô tả chi tiết hoạt động" }
  ],
  "story": "Một câu chuyện ngắn dẫn dắt bài giảng",
  "questions": [
    "Câu hỏi tương tác 1",
    "Câu hỏi tương tác 2"
  ]
}

Lưu ý: Nội dung phải mang tính giáo dục cao, an toàn, thú vị và dễ hiểu cho trẻ mầm non. Trả về DUY NHẤT mã JSON.`;

        let result;
        if (req.file && ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(req.file.originalname).toLowerCase())) {
            const imageData = fs.readFileSync(req.file.path);
            const imagePart = {
                inlineData: {
                    data: imageData.toString('base64'),
                    mimeType: req.file.mimetype
                }
            };
            const response = await model.generateContent([prompt, imagePart]);
            result = JSON.parse(response.response.text());
        } else {
            const response = await model.generateContent(prompt);
            result = JSON.parse(response.response.text());
        }

        res.json({
            success: true,
            data: result
        });

    } catch (error: any) {
        console.error('❌ Lesson Generation Error (Gemini):');
        console.error('Status:', error.status);
        console.error('Message:', error.message);
        if (error.response) {
            console.error('Response Data:', JSON.stringify(error.response, null, 2));
        }
        res.status(500).json({
            success: false,
            error: 'Lỗi khi tạo giáo trình bằng Gemini AI. Vui lòng kiểm tra lại!',
            details: error.message
        });
    }
});

export default router;
