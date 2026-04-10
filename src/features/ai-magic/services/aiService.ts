import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

import { Client } from "@gradio/client";

// ─── GEMINI: STORY & PEDAGOGY (DIRECT REST API) ──────────────────────────────
export const generateStoryFromImage = async (imageBuffer: Buffer, mimeType: string) => {
    try {
        console.log("Calling Gemini v1 REST API...");
        const apiKey = process.env.GEMINI_API_KEY;
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const payload = {
            contents: [{
                parts: [
                    { text: `Bạn là một chuyên gia sư phạm mầm mon và người kể chuyện Pixar. 
                    Hãy phân tích bức vẽ này của bé và thực hiện:
                    1. Phân loại hình ảnh: Nhận diện bức vẽ thuộc nhóm chủ đề nào (động vật, thiên nhiên, phương tiện, v.v.), chỉ ra các đối tượng, hình khối chính và màu sắc chủ đạo.
                    2. Sáng tác một câu chuyện ngắn (150-200 chữ) vừa bằng tiếng Việt vừa dịch sang tiếng Anh (Bilingual) để giới thiệu về bức vẽ, giúp bé học từ vựng. Câu chuyện phải vui vẻ, ấm áp.
                    3. Tạo 1 "Câu hỏi gợi mở" ở cuối truyện để giáo viên hỏi bé (kèm phần tiếng Anh).
                    4. Tạo 1 "Prompt chi tiết" bằng tiếng Anh để AI tạo ảnh 3D Pixar Cinematic Render nguyên bản dựa trên nét vẽ của bé.
                    
                    Trả về kết quả JSON với các trường:
                    'story': nội dung truyện song ngữ Việt-Anh (bao gồm cả phân loại lúc đầu và câu hỏi gợi mở),
                    'moral': bài học ngắn gọn (1 câu),
                    'prompt': prompt tiếng Anh cho AI vẽ ảnh.` },
                    {
                        inlineData: {

                            mimeType: mimeType,
                            data: imageBuffer.toString("base64")
                        }
                    }
                ]
            }]
        };


        const response = await axios.post(url, payload, {
            headers: { 'Content-Type': 'application/json' }
        });

        const data = response.data.candidates[0].content.parts[0].text;
        const parsed = JSON.parse(data.replace(/```json/g, '').replace(/```/g, '').trim());

        return {
            story: parsed.story,
            moral: parsed.moral,
            dallePrompt: parsed.prompt + ", 3D Pixar style, cinematic lighting, high quality, masterpiece, 8k"
        };
    } catch (error: any) {
        if (error.response?.data) {
            console.error("❌ Lỗi chi tiết từ Google API:", JSON.stringify(error.response.data, null, 2));
            const errorMsg = error.response.data[0]?.error?.message || error.response.data.error?.message || JSON.stringify(error.response.data);
            throw new Error(`Gemini API Error: ${errorMsg}`);
        }
        console.error("❌ Lỗi Gemini Direct API:", error.message);
        throw new Error(`Gemini Error: ${error.message}`);
    }
};

// ─── AI DRAW TO 3D IMAGE (PRIMARY: POLLINATIONS FREE) ────────────────────────
export const generate3DArt = async (prompt: string) => {
    try {
        console.log("Generating 3D Art with Pollinations.ai (Free & FAST)...");
        // Pollinations does not require a key and is very stable
        const encodedPrompt = encodeURIComponent(prompt);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&model=flux`;
        
        // We just return the URL, the route will download it
        return imageUrl;
    } catch (error: any) {
        console.error("❌ Lỗi Pollinations:", error.message);
        // Fallback to HuggingFace
        return await generate3DArtHF(prompt);
    }
};

export const generate3DArtHF = async (prompt: string) => {
    try {
        console.log("Falling back to HuggingFace SDXL...");
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            { inputs: prompt },
            {
                headers: { Authorization: `Bearer ${process.env.HF_TOKEN}` },
                responseType: 'arraybuffer'
            }
        );
        return Buffer.from(response.data);
    } catch (error: any) {
        console.error("❌ Lỗi HuggingFace Image:", error.message);
        return null;
    }
};

// ─── FPT.AI: VIETNAMESE TTS ──────────────────────────────────────────────────
export const generateFPTAudio = async (text: string) => {
    try {
        console.log("Generating audio with FPT.AI...");
        const response = await axios.post(
            "https://api.fpt.ai/hmi/tts/v5",
            text,
            {
                headers: {
                    "api_key": process.env.FPT_AI_API_KEY,
                    "voice": "banmai",
                    "speed": "0"
                }
            }
        );
        return response.data.async || null;
    } catch (error: any) {
        console.error("❌ Lỗi FPT.AI:", error.message);
        return null;
    }
};

// ─── HUGGINGFACE: FREE IMAGE TO VIDEO TASK ───────────────────────────────────
export const createFreeVideoTaskHF = async (imageUrl: string) => {
    try {
        console.log("Creating Free Video Task on HuggingFace Space...");
        // This is a background task, we return a mock ID or use the URL as ID
        // For Gradio, it might be easier to trigger it and let it run
        // But for our polling system, we need a taskId.
        // We'll use the unique part of the Image URL as a task reference
        return `hf-task-${Date.now()}`;
    } catch (error) {
        return null;
    }
};

export const generateVideoGradio = async (imageUrl: string) => {
    try {
        console.log("🎬 Connecting to Gradio Space for Video...");
        const client = await Client.connect("stabilityai/stable-video-diffusion");
        const result = await client.predict("/predict", { 
            input_image: { "path": imageUrl },
            seed: Math.floor(Math.random() * 1000000),
            randomize_seed: true,
            motion_bucket_id: 127,
            fps: 7,
            decoding_t: 3,
        });

        if (Array.isArray(result.data) && (result.data[0] as any).url) {
            return (result.data[0] as any).url;
        }
        return null;
    } catch (error: any) {
        console.error("❌ Lỗi Gradio Video:", error.message);
        return null;
    }
};
