/**
 * AUDIO AGENT 🎙️
 * ─────────────────────────────────────────────────────────────────────
 * Nhiệm vụ DUY NHẤT: Chuyển văn bản tiếng Việt thành giọng đọc
 * bằng FPT.AI TTS với giọng "banmai" thân thiện với trẻ em.
 */
import axios from 'axios';

export interface AudioOutput {
    audioUrl: string | null;  // Link MP3 của FPT.AI (async link)
}

export const AudioAgent = async (storyText: string): Promise<AudioOutput> => {
    console.log("🎙️ [Audio Agent] Đang tạo giọng đọc với FPT.AI (Ban Mai)...");

    try {
        // Giới hạn 4000 ký tự để không vượt quota FPT.AI
        const truncatedText = storyText.substring(0, 4000);

        const response = await axios.post(
            "https://api.fpt.ai/hmi/tts/v5",
            truncatedText,
            {
                headers: {
                    "api_key": process.env.FPT_AI_API_KEY,
                    "voice": "banmai",
                    "speed": "-1",           // Chậm hơn 1 chút, phù hợp trẻ em
                    "Content-Type": "application/json"
                },
                timeout: 15000
            }
        );

        const audioUrl = response.data?.async || null;
        if (audioUrl) {
            console.log(`✅ [Audio Agent] Link âm thanh: ${audioUrl}`);
        } else {
            console.warn("⚠️ [Audio Agent] FPT.AI không trả về link audio.");
        }

        return { audioUrl };

    } catch (error: any) {
        console.error("⚠️ [Audio Agent] Lỗi (không dừng pipeline):", error.message);
        return { audioUrl: null }; // Không ném lỗi, pipeline vẫn tiếp tục
    }
};
