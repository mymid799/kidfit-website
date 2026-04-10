/**
 * VISION AGENT 👁️ (v3 - Gemini + Groq Dual Engine)
 * ─────────────────────────────────────────────────────────────────────
 * Thử Gemini trước (Key Rotation pool), nếu tất cả bị quota
 * thì tự động chuyển sang Groq AI (backup miễn phí không giới hạn).
 */
import axios from 'axios';
import { GeminiKeyRotator } from './geminiKeyRotator.js';
import { groqAnalyzeImage } from './groqFallback.js';

export interface VisionOutput {
    category: string;
    objects: string[];
    colors: string[];
    mood: string;
    artPrompt: string;
}

const GEMINI_URL = (key: string) =>
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;

const VISION_PROMPT = `Bạn là chuyên gia phân tích tranh vẽ trẻ em. Hãy phân tích bức vẽ này và trả về JSON với các trường:
- "category": nhóm chủ đề (Động vật / Thiên nhiên / Phương tiện / Con người / Đồ vật / Khác)
- "objects": mảng các đối tượng/nhân vật chính nhận diện được (tiếng Việt)
- "colors": mảng các màu sắc chủ đạo trong tranh (tiếng Việt)
- "mood": cảm xúc/bầu không khí của tranh (1-3 từ tiếng Việt)
- "artPrompt": mô tả chi tiết bằng tiếng Anh để AI vẽ lại theo phong cách 3D Pixar Cinematic, giữ nguyên nhân vật của bé.
Chỉ trả về JSON thuần túy, không có markdown.`;

export const VisionAgent = async (imageBuffer: Buffer, mimeType: string): Promise<VisionOutput> => {
    console.log("🔭 [Vision Agent] Bắt đầu phân tích ảnh vẽ...");

    const payload = {
        contents: [{
            parts: [
                { text: VISION_PROMPT },
                { inlineData: { mimeType, data: imageBuffer.toString("base64") } }
            ]
        }]
    };

    // ── Thử tất cả Gemini keys ──────────────────────────────────────
    const poolSize = GeminiKeyRotator.poolSize;
    let allQuotaExceeded = true;

    for (let attempt = 1; attempt <= poolSize; attempt++) {
        const currentKey = GeminiKeyRotator.getNextKey();

        try {
            const response = await axios.post(GEMINI_URL(currentKey), payload, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 30_000
            });

            const raw = response.data.candidates[0].content.parts[0].text;
            const result: VisionOutput = JSON.parse(
                raw.replace(/```json/g, '').replace(/```/g, '').trim()
            );

            console.log(`✅ [Vision Agent/Gemini] Phân loại: "${result.category}"`);
            return result;

        } catch (error: any) {
            const status = error.response?.status;
            const errBody = error.response?.data?.error?.message || error.message;

            if (status === 429) {
                if (errBody.toLowerCase().includes('quota')) {
                    GeminiKeyRotator.markQuotaExceeded(currentKey);
                    console.warn(`⚠️ [Vision Agent] Key-${attempt} hết quota ngày → thử key tiếp...`);
                } else {
                    GeminiKeyRotator.markRateLimited(currentKey);
                    allQuotaExceeded = false; // Chỉ rate limit, không phải hết quota
                    console.warn(`⚠️ [Vision Agent] Key-${attempt} rate limit → thử key tiếp...`);
                }
            } else {
                // Lỗi khác (400, 500...) → không cần thử key khác
                allQuotaExceeded = false;
                console.error(`❌ [Vision Agent] Lỗi không phải 429: ${errBody}`);
                break;
            }
        }
    }

    // ── Gemini đã thất bại → chuyển sang Groq ───────────────────────
    console.warn("🔄 [Vision Agent] Tất cả Gemini keys đều thất bại → Chuyển sang Groq AI...");

    try {
        return await groqAnalyzeImage(imageBuffer, mimeType);
    } catch (groqError: any) {
        throw new Error(`Vision Agent thất bại hoàn toàn. Gemini: hết quota. Groq: ${groqError.message}`);
    }
};
