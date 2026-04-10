/**
 * STORY AGENT 📖 (v3 - Gemini + Groq Dual Engine)
 * ─────────────────────────────────────────────────────────────────────
 * Thử Gemini trước, nếu tất cả quota hết thì dùng Groq.
 */
import axios from 'axios';
import { VisionOutput } from './visionAgent.js';
import { GeminiKeyRotator } from './geminiKeyRotator.js';
import { groqWriteStory } from './groqFallback.js';

export interface StoryOutput {
    titleVi: string;
    titleEn: string;
    storyVi: string;
    storyEn: string;
    vocabulary: VocabItem[];
    questionVi: string;
    questionEn: string;
    moral: string;
}

export interface VocabItem {
    vi: string;
    en: string;
    emoji: string;
}

const GEMINI_URL = (key: string) =>
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;

export const StoryAgent = async (vision: VisionOutput): Promise<StoryOutput> => {
    console.log(`📖 [Story Agent] Sáng tác truyện song ngữ chủ đề: "${vision.category}"...`);

    const prompt = `Bạn là chuyên gia giáo dục mầm non và người kể chuyện chuyên nghiệp.
    
Dựa vào kết quả phân tích tranh vẽ của bé:
- Nhóm chủ đề: "${vision.category}"
- Nhân vật/Đối tượng chính: ${vision.objects.join(', ')}
- Màu sắc: ${vision.colors.join(', ')}
- Bầu không khí: ${vision.mood}

Yêu cầu:
1. Câu chuyện thân thiện, vui vẻ, ấm áp, phù hợp trẻ 3-6 tuổi (120-150 từ mỗi phiên bản).
2. Lồng ghép bài học tư duy STEAM tinh tế.
3. 5-7 từ vựng chủ chốt song ngữ từ câu chuyện.
4. Câu hỏi gợi mở kích thích tư duy sáng tạo (song ngữ).

Trả về JSON thuần với cấu trúc:
{
  "titleVi": "...", "titleEn": "...",
  "storyVi": "...", "storyEn": "...",
  "vocabulary": [{"vi": "...", "en": "...", "emoji": "..."}],
  "questionVi": "...", "questionEn": "...", "moral": "..."
}
Chỉ trả về JSON thuần túy, không có markdown.`;

    const payload = { contents: [{ parts: [{ text: prompt }] }] };
    const poolSize = GeminiKeyRotator.poolSize;

    // ── Thử tất cả Gemini keys ──────────────────────────────────────
    for (let attempt = 1; attempt <= poolSize; attempt++) {
        const currentKey = GeminiKeyRotator.getNextKey();

        try {
            const response = await axios.post(GEMINI_URL(currentKey), payload, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 30_000
            });

            const raw = response.data.candidates[0].content.parts[0].text;
            const result: StoryOutput = JSON.parse(
                raw.replace(/```json/g, '').replace(/```/g, '').trim()
            );

            console.log(`✅ [Story Agent/Gemini] Tiêu đề: "${result.titleVi}"`);
            return result;

        } catch (error: any) {
            const status = error.response?.status;
            const errBody = error.response?.data?.error?.message || error.message;

            if (status === 429) {
                if (errBody.toLowerCase().includes('quota')) {
                    GeminiKeyRotator.markQuotaExceeded(currentKey);
                    console.warn(`⚠️ [Story Agent] Key-${attempt} hết quota → thử key tiếp...`);
                } else {
                    GeminiKeyRotator.markRateLimited(currentKey);
                    console.warn(`⚠️ [Story Agent] Key-${attempt} rate limit → thử key tiếp...`);
                }
            } else {
                console.error(`❌ [Story Agent] Lỗi: ${errBody}`);
                break;
            }
        }
    }

    // ── Gemini thất bại → Groq ──────────────────────────────────────
    console.warn("🔄 [Story Agent] Tất cả Gemini keys thất bại → Chuyển sang Groq AI...");

    try {
        return await groqWriteStory(vision);
    } catch (groqError: any) {
        throw new Error(`Story Agent thất bại hoàn toàn. Groq: ${groqError.message}`);
    }
};
