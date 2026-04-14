import express, { Request, Response } from 'express';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenAI } from '@google/genai';
import { authenticate } from '../middleware/auth.js';
import { InferenceClient } from '@huggingface/inference';
import path from 'path';
import fs from 'fs';

const router = express.Router();
// Khởi tạo client với token từ .env
const hf = new InferenceClient(process.env.HUGGINGFACE_TOKEN);
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

// ─── STRUCTURED STORY PROMPT ────────────────────────────────────────────────
const STORY_PROMPT = `You are a master bilingual children's storyteller and early childhood educator.
Task: Analyze the child's drawing and create a 5-scene cinematic adventure that feels like a warm bedtime story.

IMPORTANT: Return PURE JSON only. NO markdown, NO backticks, NO extra text.

Required JSON structure:
{
  "title": "Tên câu chuyện (Ví dụ: Bạn Thỏ Bông Và Bài Ca Của Gió)",
  "characterName": "Tên nhân vật (Tiếng Việt, ngắn gọn, đáng yêu)",
  "characterDesign": "Detailed character appearance in ENGLISH for image generation. Focus on cute features from the drawing. Example: 'A friendly yellow bull with tiny red horns and big determined eyes'.",
  "moralLesson": "Một bài học nhỏ bằng tiếng Việt (Ví dụ: Giúp đỡ bạn bè là niềm vui nhất!)",
  "scenes": [
    {
      "narration": "Lời kể Tiếng Việt (3-4 câu ngắn). Bắt đầu bằng thán từ (Ôi!, Lạ chưa kìa!). Dùng từ láy mầm non (lon ton, khịt khịt). Xưng hô 'Con/Bạn nhỏ'.",
      "narration_en": "Natural, vivid English adaptation for kids. Start with (Wow!, Look!). Match the gentle energy of the Vietnamese.",
      "visualPrompt": "ENGLISH prompt for AI image generation: [Adorable, stylized 3D Pixar style - NOT hyper-realistic] + [Shot Type: Wide shot/Medium shot] + [Character Interaction with secondary character/environment] + [Detailed background setting] + [Cinematic but safe, soft lighting, 8k]",
      "sceneDescription": "Tóm tắt cảnh (max 8 từ)",
      "emotion": "happy",
      "kenBurns": "zoom-in"
    }
  ]
}

Story Flow & Narrative Rules (CRITICAL):
- Scene 1: Wake up from drawing. Wide shot, showing the character (e.g. your bull) stepping from paper into a magical, adorable world. Greet the child.
- Scene 2: Discovery. Panning out to show the secondary character (e.g. a flower/bird) and the environment. Interaction is soft.
- Scene 3: Adventure. Focused on interaction and joy. Full body of both characters.
- Scene 4: The Challenge (MUST BE VISIBLE). Choose ONE: A magical wind with colorful leaves, a non-scary dark-ish forest with glowing friendly plants, or a friendly-looking large shadow. The character (e.g. the bull) MUST have a brave, determined expression, and the challenge element MUST be large in the frame. Panning out (Wide Shot).
- Scene 5: Warm Resolution. The character interacting happily with the friends they helped. Close-up/Medium close-up to show direct, warm eye contact. MUST include direct thanks to the child: "Cảm ơn con đã vẽ ra tớ!". No dark or creepy elements. Total safety and warmth.

Cinematic Visual Rules (STRICT):
1. Panning Out: Use "Wide shot," "Full body," and "Establishing shot" to show the complete, stylized world.
2. Expressive Interaction: Scene 4 is about BRAVERY, not fear. Scene 5 is about SAFETY and HUGS. Describe facial expressions like "determined eyes," "warm smile," "sparkly eyes," "friendly gaze."
3. Expressive Lighting: S4 can use dynamic lighting, but never scary. S5 must be warm sunset or golden glow.
4. "Cartoonish Pixar" Style: Use keywords: "adorable proportions," "soft rounded shapes," "stylized textures," "non-realistic." Forbid "hyper-realistic," "too realistic," "intense."
5. Content Restriction: Forbid "scary," "dark," "creepy," "nightmarish," "dangerous," or any intense negative elements. The world must feel totally safe and loving.
6. Consistency: The characterDesign must be identical across all 5 scenes.

Options:
- emotion: [happy, curious, brave, calm, excited, magical]
- kenBurns: [zoom-in, zoom-out, pan-left, pan-right, pan-up, pan-down]`;

// ─── MULTI-PROVIDER IMAGE GENERATION WITH FALLBACK ──────────────────────────
// Provider 1: Gemini Flash Image (uses your existing API key — fast, high quality)
// Provider 2: Pollinations.ai Flux (free, no key — different website)
// Provider 3: Pollinations.ai Turbo (free, no key — different model)
// Scenes are generated SEQUENTIALLY to avoid rate-limit 429 errors.

const genaiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface ImageProvider {
    name: string;
    generate: (prompt: string, seed: number) => Promise<Buffer>;
}

const imageProviders: ImageProvider[] = [
    // {
    //     // Primary: Gemini Flash Image — uses your Google AI API key (free tier: 500 img/day)
    //     name: 'Gemini (Nano Banana 2)',
    //     generate: async (prompt, _seed) => {
    //         const response = await genaiClient.models.generateContent({
    //             model: 'gemini-3.1-flash-image-preview',
    //             contents: [{ role: 'user', parts: [{ text: prompt }] }],
    //             config: {
    //                 responseModalities: ['IMAGE'],
    //             },
    //         });

    //         const parts = response.candidates?.[0]?.content?.parts ?? [];
    //         const imagePart = parts.find((p: any) => p.inlineData?.mimeType?.startsWith('image/'));
    //         const imageBytes = imagePart?.inlineData?.data;
    //         if (!imageBytes) throw new Error('No image data in Gemini response');
    //         return Buffer.from(imageBytes, 'base64');
    //     },
    // },
    {
        name: 'Hugging Face (Flux Schnell)',
        generate: async (prompt, seed) => {
            try {
                // Cách dùng hàm bên dưới vẫn giữ nguyên
                const response = await hf.textToImage({
                    model: 'black-forest-labs/FLUX.1-schnell',
                    inputs: prompt,
                    parameters: {
                        seed: seed,
                        width: 1024,
                        height: 576,
                    },
                });

                const arrayBuffer = await (response as any).arrayBuffer();
                return Buffer.from(arrayBuffer);
            } catch (error: any) {
                throw new Error(`HF Client Error: ${error.message}`);
            }
        },
    },
    {
        // Fallback 1: Pollinations.ai — Flux model (completely free, no API key)
        name: 'Pollinations (Flux)',
        generate: async (prompt, seed) => {
            const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1280&height=720&model=flux&seed=${seed}&nologo=true`;
            const res = await fetch(url, { signal: AbortSignal.timeout(90000) });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return Buffer.from(await res.arrayBuffer());
        },
    },
    // {
    //     // Fallback 2: Pollinations.ai — Turbo model (faster, different pipeline)
    //     name: 'Pollinations (Turbo)',
    //     generate: async (prompt, seed) => {
    //         const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1280&height=720&model=turbo&seed=${seed}&nologo=true`;
    //         const res = await fetch(url, { signal: AbortSignal.timeout(90000) });
    //         if (!res.ok) throw new Error(`HTTP ${res.status}`);
    //         return Buffer.from(await res.arrayBuffer());
    //     },
    // },
];

async function generateSceneImage(
    visualPrompt: string,
    sceneIndex: number,
    storySeed: number
): Promise<string> {
    for (const provider of imageProviders) {
        try {
            console.log(`🎨 Scene ${sceneIndex + 1}: Trying ${provider.name}...`);
            const buffer = await provider.generate(visualPrompt, storySeed);

            // Guard: if response is too small it's likely an error page, not an image
            if (buffer.length < 1024) {
                throw new Error('Response too small — likely not a valid image');
            }

            const filename = `scene-${storySeed}-${sceneIndex}.png`;
            const filepath = path.join(uploadDir, filename);
            fs.writeFileSync(filepath, buffer);

            console.log(`✅ Scene ${sceneIndex + 1}: OK via ${provider.name} (${(buffer.length / 1024).toFixed(0)} KB)`);
            return `/${uploadDir}/${filename}`;
        } catch (error: any) {
            console.warn(`⚠️ ${provider.name} failed (Scene ${sceneIndex + 1}): ${error.message}`);
        }
    }

    console.error(`❌ All providers failed for Scene ${sceneIndex + 1}`);
    return '';
}

// ─── ROUTE: POST /api/storyboard ─────────────────────────────────────────────
router.post('/storyboard', authenticate, upload.single('drawing'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'Vui lòng tải lên bức vẽ của bé!' });
        }

        console.log('🎨 Step 1/3: Phân tích tranh bằng Gemini...');

        // ─── STEP 1: Gemini analyzes drawing → structured story ──────────
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
        const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });
        const imageData = fs.readFileSync(req.file.path);

        const imagePart = {
            inlineData: {
                data: imageData.toString('base64'),
                mimeType: req.file.mimetype
            }
        };

        const result = await model.generateContent([STORY_PROMPT, imagePart]);
        const rawText = result.response.text();

        // Parse JSON from Gemini response
        let storyData;
        try {
            const jsonText = rawText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
            storyData = JSON.parse(jsonText);
        } catch (parseError) {
            console.error('❌ Failed to parse Gemini JSON:', rawText);
            return res.status(500).json({
                success: false,
                error: 'AI trả về dữ liệu không hợp lệ. Vui lòng thử lại!',
            });
        }

        // Validate structure
        if (!storyData.title || !Array.isArray(storyData.scenes) || storyData.scenes.length === 0) {
            return res.status(500).json({
                success: false,
                error: 'Câu chuyện được tạo không đúng cấu trúc. Vui lòng thử lại!',
            });
        }

        // ─── STEP 2: Generate images SEQUENTIALLY (avoids rate limits) ──
        const storySeed = Math.floor(Math.random() * 999999);
        console.log(`📖 Step 2/3: Tạo ${storyData.scenes.length} hình ảnh (Seed: ${storySeed})...`);

        const sceneImages: string[] = [];
        for (let i = 0; i < storyData.scenes.length; i++) {
            const scene = storyData.scenes[i];
            const prompt = scene.visualPrompt || `3D Pixar style, ${scene.sceneDescription}, warm lighting, 8k`;
            const imageUrl = await generateSceneImage(prompt, i, storySeed);
            sceneImages.push(imageUrl);
        }

        // Attach imageUrl to each scene
        const scenesWithImages = storyData.scenes.map((scene: any, i: number) => ({
            ...scene,
            imageUrl: sceneImages[i] || '', // Empty = frontend uses drawing as fallback
        }));

        console.log('✅ Step 3/3: Hoàn thành! Gửi kết quả...');

        res.json({
            success: true,
            message: 'Phép màu đã được tạo thành công!',
            title: storyData.title,
            characterDesign: storyData.characterDesign || '',
            scenes: scenesWithImages,
            drawingUrl: `/${req.file.path.replace(/\\/g, '/')}`,
        });

    } catch (error: any) {
        console.error('❌ Storyboard Error:', error);
        res.status(500).json({
            success: false,
            error: 'Lỗi khi xử lý phép màu AI. Vui lòng thử lại!',
            details: error.message
        });
    }
});

export default router;
