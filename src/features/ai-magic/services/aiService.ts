import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateStoryFromImage = async (imageBuffer: Buffer, mimeType: string) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = "Đây là bức tranh trẻ mầm non vẽ. Trong tranh có gì? Dựa vào đó hãy sáng tác 1 truyện ngắn khoảng 150 chữ bằng tiếng Việt để khen ngợi bé và kể một câu chuyện vui vẻ ấm áp về sự xuất hiện của các nhân vật/vật thể trong tranh. Trả về kết quả dưới định dạng JSON nguyên bản (chỉ chứa JSON, không chứa markdown, không dùng ```json) với 2 trường: 'story' (nội dung truyện bằng tiếng Việt) và 'prompt' (đoạn text miêu tả chi tiết bằng tiếng Anh để dùng làm prompt cho DALL-E tạo ra hình ảnh không gian 3D Pixar, vui nhộn mầm non).";

        const imagePart = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType
            },
        };

        const result = await model.generateContent([prompt, imagePart]);
        const responseText = result.response.text();
        
        let cleanText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(cleanText);
        
        return {
            story: data.story,
            dallePrompt: data.prompt + ", 3D Pixar style, bright colorful, super cute, high quality, for kids"
        };
    } catch (error) {
        console.error("Lỗi khi gọi Gemini:", error);
        throw new Error("Không thể phân tích ảnh bằng Gemini");
    }
};

export const generate3DArt = async (prompt: string) => {
    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024"
        });
        
        return response.data[0].url;
    } catch (error) {
        console.error("Lỗi khi gọi DALL-E 3:", error);
        throw new Error("Không thể tạo ảnh bằng DALL-E 3");
    }
};

export const generateAudioFromText = async (text: string) => {
    try {
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: "nova", // Nova is friendly and warm for kids
            input: text,
        });
        
        const buffer = Buffer.from(await mp3.arrayBuffer());
        return buffer;
    } catch (error) {
        console.error("Lỗi khi tạo Audio:", error);
        throw new Error("Không thể tạo audio từ OpenAI TTS");
    }
};
