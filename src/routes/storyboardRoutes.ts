import express, { Request, Response } from 'express';
import multer from 'multer';
import { OpenAI } from 'openai';
import { authenticate } from '../middleware/auth.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// ─── CONFIG MULTER ──────────────────────────────────────────────────────────
// Lưu ảnh tạm thời trong thư mục uploads/temp
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

// ─── CONFIG OPENAI ──────────────────────────────────────────────────────────
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// ─── ROUTE: POST /api/storyboard ─────────────────────────────────────────────
router.post('/storyboard', authenticate, upload.single('drawing'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'Vui lòng tải lên bức vẽ của bé!' });
        }

        const imagePath = req.file.path;
        const base64Image = fs.readFileSync(imagePath, { encoding: 'base64' });

        // 1. Phân tích tranh bằng GPT-4o-mini (Vision)
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Đây là bức tranh vẽ tay của trẻ 3-6 tuổi. Hãy phân tích chi tiết đối tượng, hình khối chính, màu sắc, bố cục và cảm xúc của bức tranh. Sau đó, dựa trên những gì thấy được, hãy sáng tác một câu chuyện ngắn (3-5 câu) bằng tiếng Việt, mang tính tích cực, ấm áp, phù hợp cho trẻ mầm non. Câu chuyện nên bắt đầu bằng phong cách kể chuyện cổ tích cho bé." },
                        {
                            type: "image_url",
                            image_url: {
                                "url": `data:image/jpeg;base64,${base64Image}`,
                            },
                        },
                    ],
                },
            ],
            max_tokens: 500,
        });

        const analysisResult = response.choices[0].message.content;

        // Tách câu chuyện từ kết quả phân tích (GPT thường trả về cả 2 nếu không ép JSON)
        // Trong thực tế, chúng ta nên dùng JSON mode hoặc 2 bước.
        // Ở đây ta giả định GPT trả về text và ta sẽ làm sạch nó.

        // Mock TTS - ElevenLabs hoặc Google Cloud TTS
        // Vì ElevenLabs cần API Key và trả phí, ta sẽ trả về text story để frontend dùng Web Speech API 
        // hoặc gọi ElevenLabs ở bước sau.

        // Mock Animation URL
        // Animation từ nét vẽ cần AI chuyên dụng (Runway/Pika), ta sẽ giả lập bằng cách trả về path ảnh gốc
        // và frontend sẽ dùng GSAP hoặc CSS để làm nó chuyển động.

        // Xoá file sau khi xử lý (hoặc giữ lại để hiển thị trong 24h rồi cron job xoá)
        // Ở đây ta giữ lại để frontend hiển thị URL ảnh.

        res.json({
            success: true,
            message: 'Phép màu đã được tạo thành công!',
            story: analysisResult,
            drawingUrl: `/${req.file.path.replace(/\\/g, '/')}`,
            // audioUrl: '...', // Sẽ bổ sung sau khi có credentials TTS
            // animationUrl: '...' // Sẽ bổ sung sau
        });

    } catch (error: any) {
        console.error('❌ Storyboard Error:', error);
        res.status(500).json({
            success: false,
            error: 'Lỗi khi xử lý phép màu AI. Vui lòng kiểm tra API Key OpenAI!',
            details: error.message
        });
    }
});

export default router;
