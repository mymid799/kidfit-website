import express, { Request, Response } from 'express';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// ─── CONFIG MULTER ──────────────────────────────────────────────────────────
const uploadDir = 'uploads/reading';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'book-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const mimetype = allowedTypes.test(file.mimetype);
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) return cb(null, true);
        cb(new Error('Chỉ chấp nhận file ảnh (jpg, png, webp)!'));
    }
});

// ─── CONFIG GEMINI ──────────────────────────────────────────────────────────
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// ─── PROMPT TEMPLATE ────────────────────────────────────────────────────────
const READING_PROMPT = `Bạn là "BéĐọc AI" — trợ lý đọc sách thông minh cho trẻ em Việt Nam 3-12 tuổi.

Phân tích bức ảnh chụp trang sách này và trả về JSON theo đúng format sau (KHÔNG markdown, KHÔNG code block, CHỈ JSON thuần):

{
  "extractedText": "Toàn bộ text tiếng Việt nhận diện được từ trang sách (giữ nguyên dấu). Nếu không có text, để chuỗi rỗng.",
  "bookType": "Loại sách: truyện cổ tích | sách khoa học | sách giáo khoa | thơ | truyện tranh | other",
  "readingLevel": "Mức đọc phù hợp: 3-4 tuổi | 4-5 tuổi | 5-7 tuổi | 7-9 tuổi | 9-12 tuổi",
  "illustrations": "Mô tả chi tiết hình minh họa trong trang (bằng tiếng Việt)",
  "summary": "Tóm tắt nội dung trang sách bằng ngôn ngữ đơn giản, dễ hiểu cho trẻ (2-3 câu, tiếng Việt)",
  "funFact": "1 điều thú vị liên quan đến nội dung trang sách, dành cho trẻ em (tiếng Việt)",
  "vocabulary": [
    {"word": "từ vựng 1", "meaning": "giải nghĩa đơn giản", "english": "bản dịch tiếng Anh"},
    {"word": "từ vựng 2", "meaning": "giải nghĩa đơn giản", "english": "bản dịch tiếng Anh"},
    {"word": "từ vựng 3", "meaning": "giải nghĩa đơn giản", "english": "bản dịch tiếng Anh"}
  ],
  "quiz": [
    {"question": "Câu hỏi 1 về nội dung (tiếng Việt)", "options": ["A", "B", "C"], "correct": 0, "level": "ghi nhớ"},
    {"question": "Câu hỏi 2 đọc hiểu sâu hơn", "options": ["A", "B", "C"], "correct": 1, "level": "hiểu"},
    {"question": "Câu hỏi 3 suy luận/sáng tạo", "options": ["A", "B", "C"], "correct": 2, "level": "phân tích"}
  ],
  "narration": "Đoạn văn kể lại nội dung trang sách bằng giọng kể chuyện sinh động, ấm áp, phù hợp cho AI đọc to cho bé nghe (tiếng Việt, 4-6 câu)",
  "narration_en": "English version of the narration for bilingual learning (4-6 sentences, storytelling tone)"
}

QUY TẮC:
- Nếu ảnh KHÔNG phải trang sách, vẫn cố gắng tạo bài học từ nội dung nhìn thấy.
- Vocabulary phải có ít nhất 3 từ, tối đa 6 từ.
- Quiz phải có đúng 3 câu hỏi với 3 cấp độ Bloom: ghi nhớ → hiểu → phân tích.
- Narration phải sinh động, kể chuyện, KHÔNG đọc máy móc.
- CHỈ trả về JSON thuần, không có ký tự nào khác bao quanh.`;

// ─── ROUTE: POST /api/reading ─────────────────────────────────────────────
// Public — không cần đăng nhập để ai cũng dùng được
router.post('/reading', upload.single('bookPage'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'Vui lòng chụp hoặc tải lên ảnh trang sách!' });
        }

        console.log('📖 BéĐọc AI: Processing book page...', req.file.filename);

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const imageData = fs.readFileSync(req.file.path);

        const imagePart = {
            inlineData: {
                data: imageData.toString('base64'),
                mimeType: req.file.mimetype
            }
        };

        const result = await model.generateContent([READING_PROMPT, imagePart]);
        const responseText = result.response.text();

        // Parse JSON response from Gemini
        let parsed;
        try {
            // Strip markdown code blocks if Gemini wraps the JSON
            const cleanJson = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            parsed = JSON.parse(cleanJson);
        } catch {
            console.error('❌ BéĐọc: Failed to parse Gemini JSON response:', responseText.substring(0, 300));
            return res.status(500).json({
                success: false,
                error: 'AI trả về dữ liệu không đúng format. Vui lòng thử lại!',
            });
        }

        console.log('✅ BéĐọc AI: Success!', parsed.bookType, parsed.readingLevel);

        res.json({
            success: true,
            message: 'Trang sách đã được phân tích thành công!',
            data: parsed,
            imageUrl: `/${req.file.path.replace(/\\/g, '/')}`,
        });

    } catch (error: any) {
        console.error('❌ BéĐọc Error:', error);
        res.status(500).json({
            success: false,
            error: 'Lỗi khi phân tích trang sách. Vui lòng thử lại!',
            details: error.message
        });
    }
});

export default router;
