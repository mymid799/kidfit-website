/**
 * GROQ FALLBACK CLIENT 🚀
 * ─────────────────────────────────────────────────────────────────────
 * Groq AI - Hoàn toàn MIỄN PHÍ, tốc độ cực nhanh (~1-2s).
 * Hỗ trợ Vision (phân tích ảnh) với model llama-3.2-11b-vision-preview.
 * Hỗ trợ Text (sáng tác truyện) với model llama-3.3-70b-versatile.
 *
 * Lấy API Key miễn phí tại: https://console.groq.com/
 * Rate limit: 30 req/phút, 14,400 req/ngày (đủ cho hàng nghìn ảnh/ngày)
 */
import axios from 'axios';
import { VisionOutput } from './visionAgent.js';
import { StoryOutput } from './storyAgent.js';

const GROQ_BASE_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_VISION_MODEL = 'meta-llama/llama-4-scout-17b-16e-instruct'; // Hỗ trợ ảnh
const GROQ_TEXT_MODEL = 'llama-3.3-70b-versatile';      // Tốt nhất cho text/tiếng Việt

const getGroqHeaders = () => {
    const key = process.env.GROQ_API_KEY;
    if (!key) throw new Error("GROQ_API_KEY chưa được cấu hình trong .env");
    return { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' };
};

// ─── VISION FALLBACK: Phân tích ảnh bằng Groq ───────────────────────────────
export const groqAnalyzeImage = async (imageBuffer: Buffer, mimeType: string): Promise<VisionOutput> => {
    console.log("🔄 [Groq Fallback] Phân tích ảnh bằng Groq Vision (Llama 4 Scout)...");

    const base64Image = imageBuffer.toString('base64');
    const prompt = `Bạn là chuyên gia phân tích tranh vẽ trẻ em. Hãy phân tích bức vẽ này và trả về JSON với các trường:
- "category": nhóm chủ đề (Động vật / Thiên nhiên / Phương tiện / Con người / Đồ vật / Khác)
- "objects": mảng các đối tượng/nhân vật chính nhận diện được (tiếng Việt, tối đa 5)
- "colors": mảng các màu sắc chủ đạo trong tranh (tiếng Việt, tối đa 4)
- "mood": cảm xúc/bầu không khí của tranh (1-3 từ tiếng Việt)
- "artPrompt": mô tả chi tiết bằng tiếng Anh ngắn gọn để AI vẽ lại theo phong cách 3D Pixar Cinematic.

Chỉ trả về JSON thuần túy, không có markdown hay giải thích thêm.`;

    const response = await axios.post(GROQ_BASE_URL, {
        model: GROQ_VISION_MODEL,
        messages: [{
            role: 'user',
            content: [
                { type: 'text', text: prompt },
                { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64Image}` } }
            ]
        }],
        max_tokens: 512,
        temperature: 0.3
    }, { headers: getGroqHeaders(), timeout: 30_000 });

    const raw = response.data.choices[0].message.content;
    const result: VisionOutput = JSON.parse(
        raw.replace(/```json/g, '').replace(/```/g, '').trim()
    );

    console.log(`✅ [Groq Fallback] Vision OK: "${result.category}" | ${result.objects.join(', ')}`);
    return result;
};

// ─── STORY FALLBACK: Sáng tác truyện bằng Groq ──────────────────────────────
export const groqWriteStory = async (vision: VisionOutput): Promise<StoryOutput> => {
    console.log(`🔄 [Groq Fallback] Sáng tác truyện bằng Groq Text (Llama 3.3 70B)...`);

    const prompt = `Bạn là chuyên gia giáo dục mầm non và người kể chuyện chuyên nghiệp, thông thạo cả tiếng Việt và tiếng Anh.

Dựa vào kết quả phân tích tranh vẽ:
- Nhóm chủ đề: "${vision.category}"
- Nhân vật/Đối tượng: ${vision.objects.join(', ')}
- Màu sắc: ${vision.colors.join(', ')}
- Bầu không khí: ${vision.mood}

Hãy tạo ra nội dung JSON thuần túy với cấu trúc:
{
  "titleVi": "tên câu chuyện tiếng Việt",
  "titleEn": "story title in English",
  "storyVi": "câu chuyện cổ tích 3-5 câu tiếng Việt, vui tươi, phù hợp bé 3-6 tuổi, lồng STEAM",
  "storyEn": "English translation of the story (3-5 sentences)",
  "vocabulary": [
    {"vi": "từ tiếng việt", "en": "english word", "emoji": "emoji phù hợp"}
  ],
  "questionVi": "câu hỏi gợi mở sáng tạo cho giáo viên hỏi bé",
  "questionEn": "English version of the open-ended question",
  "moral": "bài học sư phạm ngắn gọn 1 câu"
}

Yêu cầu: 5-7 từ vựng song ngữ. Chỉ trả về JSON thuần, không markdown.`;

    const response = await axios.post(GROQ_BASE_URL, {
        model: GROQ_TEXT_MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1024,
        temperature: 0.7
    }, { headers: getGroqHeaders(), timeout: 30_000 });

    const raw = response.data.choices[0].message.content;
    const result: StoryOutput = JSON.parse(
        raw.replace(/```json/g, '').replace(/```/g, '').trim()
    );

    console.log(`✅ [Groq Fallback] Story OK: "${result.titleVi}"`);
    return result;
};
