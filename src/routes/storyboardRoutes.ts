/**
 * AI Magic Story — Backend Routes
 * ================================
 * Interactive 3-Act "Director" Experience.
 * 
 * Endpoints:
 *   POST /api/story/start  — Upload drawing → AI identifies character → Scene 1 + challenge
 *   POST /api/story/act2   — Child's challenge answer → Scene 2 + NPC encounter + empathy question
 *   POST /api/story/act3   — Child's empathy choice → Scene 3 (resolution + lesson + sticker)
 *   POST /api/storyboard   — Legacy endpoint (kept for backward compat)
 * 
 * KEY DESIGN DECISIONS:
 *   - All world data (biomes, guardians, blueprints) imported from worldBible.ts (DRY)
 *   - Each choice has a unique CONSEQUENCE that creates a genuinely different scene
 *   - Act 3 generates a lessonConclusion tied to the educational pillar
 *   - NPC is rendered as FOREGROUND FOCUS in Act 2 visuals
 *   - Character appearance is strictly preserved across all 3 scenes
 */

import express, { Request, Response } from 'express';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { InferenceClient } from '@huggingface/inference';
import path from 'path';
import fs from 'fs';

// ─── SINGLE SOURCE OF TRUTH (DRY — no duplicate data) ─────────────────────────
import {
    BIOMES, GUARDIANS, BLUEPRINTS,
    VISUAL_STYLE_SHELL, VISUAL_NEGATIVE,
    getBiome, getGuardian,
} from '../features/storyboard/data/worldBible';

const router = express.Router();
const hf = new InferenceClient(process.env.HUGGINGFACE_TOKEN);

// ─── CONFIG MULTER ──────────────────────────────────────────────────────────
const uploadDir = 'uploads/storyboard';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'drawing-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        if (allowedTypes.test(file.mimetype) && allowedTypes.test(path.extname(file.originalname).toLowerCase())) {
            return cb(null, true);
        }
        cb(new Error('Chỉ chấp nhận file ảnh (jpg, png, webp)!'));
    }
});

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const pickRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/** Build the visual prompt for FLUX image generation */
function buildVisualPrompt(foreground: string, biomeVisual: string): string {
    return `${VISUAL_STYLE_SHELL}, ${biomeVisual}, ${foreground}, --no ${VISUAL_NEGATIVE}`;
}

/** System prompt for Gemini — enforces safety, tone, education, and JSON output */
function buildSystemPrompt(biomeName: string, biomeVisual: string, actNumber: number, educationalGoal?: string): string {
    return `You are a gentle, enthusiastic storyteller for 5-year-old Vietnamese kindergarteners.
You are writing Act ${actNumber} of a 3-act interactive educational story.

MANDATORY RULES:
1. Setting is EXACTLY: "${biomeName}" — ${biomeVisual}.
2. Write in simple Vietnamese that a 5-year-old understands. Keep individual sentences under 15 words, but write 5-6 sentences total to tell a complete mini-story for this act.
3. NEVER critique the child's drawing or choice. Accept EVERYTHING enthusiastically.
4. NO weapons, monsters, scary themes, blood, darkness, or sadness lasting more than 1 sentence.
5. Tone: warm, encouraging, magical — like a loving preschool teacher reading a bedtime story.
6. Use Vietnamese onomatopoeia (lon ton, rón rén, tùng tùng, xào xạc, leng keng).
7. The narration MUST flow logically from the child's specific choice or drawing — reference it directly by name.
8. Return PURE JSON only. NO markdown, NO backticks, NO extra text.
${educationalGoal ? `9. EDUCATIONAL FOCUS: Every narration must subtly reinforce this lesson: "${educationalGoal}"` : ''}

JSON format:
{
  "narration": "Vietnamese narration (5-6 short sentences, educational, connected to child choice)",
  "narration_en": "English adaptation (5-6 short sentences)",
  "emotion": "happy|curious|brave|calm|excited|magical",
  "kenBurns": "zoom-in|zoom-out|pan-left|pan-right|pan-up|pan-down",
  "sceneDescription": "Brief Vietnamese description (max 10 words)",
  "visualPrompt": "English description of the scene for image generation. MUST include the EXACT character appearance description. Include specific actions and environment details. DO NOT include style keywords."
}`;
}

// ─── IMAGE GENERATION (Hugging Face FLUX + Pollinations fallback) ─────────────

interface ImageProvider {
    name: string;
    generate: (prompt: string, seed: number) => Promise<Buffer>;
}

const imageProviders: ImageProvider[] = [
    {
        name: 'Hugging Face (Flux Schnell)',
        generate: async (prompt, seed) => {
            const response = await hf.textToImage({
                model: 'black-forest-labs/FLUX.1-schnell',
                inputs: prompt,
                parameters: { seed, width: 1024, height: 576 },
            });
            const arrayBuffer = await (response as any).arrayBuffer();
            return Buffer.from(arrayBuffer);
        },
    },
    {
        name: 'Pollinations (Flux)',
        generate: async (prompt, seed) => {
            const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1280&height=720&model=flux&seed=${seed}&nologo=true`;
            const res = await fetch(url, { signal: AbortSignal.timeout(90000) });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return Buffer.from(await res.arrayBuffer());
        },
    },
];

async function generateImage(visualPrompt: string, biomeVisual: string, seed: number, sceneLabel: string): Promise<string> {
    const fullPrompt = buildVisualPrompt(visualPrompt, biomeVisual);

    for (const provider of imageProviders) {
        try {
            console.log(`🎨 ${sceneLabel}: Trying ${provider.name}...`);
            const buffer = await provider.generate(fullPrompt, seed);
            if (buffer.length < 1024) throw new Error('Response too small');

            const filename = `scene-${seed}-${sceneLabel.replace(/\s/g, '')}.png`;
            const filepath = path.join(uploadDir, filename);
            fs.writeFileSync(filepath, buffer);

            console.log(`✅ ${sceneLabel}: OK via ${provider.name} (${(buffer.length / 1024).toFixed(0)} KB)`);
            return `/${uploadDir}/${filename}`;
        } catch (error: any) {
            console.warn(`⚠️ ${provider.name} failed (${sceneLabel}): ${error.message}`);
        }
    }

    console.error(`❌ All providers failed for ${sceneLabel}`);
    return '';
}

// ─── GEMINI HELPER (with model fallback for rate limits) ──────────────────────

const GEMINI_MODELS = [
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite-preview-02-05',
    'gemini-1.5-flash',
    'gemini-1.5-flash-8b',
    'gemini-1.5-pro'
];

async function callGemini(systemPrompt: string, userPrompt: string, imageData?: { data: string; mimeType: string }): Promise<any> {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    let lastError: any;

    for (const modelName of GEMINI_MODELS) {
        try {
            console.log(`🤖 Trying Gemini model: ${modelName}`);
            const model = genAI.getGenerativeModel({
                model: modelName,
                systemInstruction: systemPrompt,
            });

            const parts: any[] = [userPrompt];
            if (imageData) {
                parts.push({ inlineData: imageData });
            }

            const result = await model.generateContent(parts);
            const rawText = result.response.text();
            let jsonText = rawText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

            if (jsonText.startsWith('{')) {
                return JSON.parse(jsonText);
            }
            throw new Error('AI did not return valid JSON');

        } catch (error: any) {
            lastError = error;
            if (error.status === 429 || error.status >= 500) {
                console.warn(`⚠️ ${modelName} unavailable (Status: ${error.status}), trying next model...`);
                continue;
            }
            throw error;
        }
    }

    throw lastError;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROUTE: POST /api/story/start
// Upload drawing → AI identifies character → rolls blueprint → returns Scene 1
// ═══════════════════════════════════════════════════════════════════════════════

router.post('/story/start', upload.single('drawing'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'Vui lòng tải lên bức vẽ của bé!' });
        }

        console.log('🎬 [Act 1] Starting interactive story...');
        const seed = Math.floor(Math.random() * 999999);

        // Pick random blueprint & biome
        const blueprint = pickRandom(BLUEPRINTS);
        const biome = getBiome(blueprint.preferredBiome);
        const guardian = getGuardian(blueprint.guardianId);

        console.log(`📋 Blueprint: ${blueprint.name} | Biome: ${biome.name} | NPC: ${guardian.name}`);
        console.log(`📚 Education: ${blueprint.educationalGoal_en}`);

        // Ask Gemini to identify the character and generate Scene 1
        const imageData = {
            data: fs.readFileSync(req.file.path).toString('base64'),
            mimeType: req.file.mimetype,
        };

        const scene1Data = await callGemini(
            buildSystemPrompt(biome.name, biome.visualPrompt, 1, blueprint.educationalGoal_en),
            `Look at this child's drawing. Identify what they drew (accept EVERYTHING enthusiastically — even abstract shapes are "magnificent creatures").

Generate Act 1 (THE ARRIVAL): The character arrives in "${biome.name}" for the first time.
Show genuine wonder and excitement. Describe what they see, hear, and feel.
The character is small and curious, exploring this magical place.

The educational theme of this story is: "${blueprint.educationalGoal_en}".
Subtly introduce this theme in the scene — plant the seed of the lesson.

IMPORTANT for the visualPrompt: Describe the character's appearance based on the drawing VERY precisely. This exact description will be reused in ALL future scenes for consistency. Include colors, size, distinctive features.

Also include in your JSON:
- "characterName": a cute Vietnamese name for what the child drew (2-3 syllables)
- "characterDesign": a VERY detailed English description of the character's appearance based on the drawing (minimum 20 words — include all colors, shapes, sizes, distinctive features, clothing if any)
- "title": a magical Vietnamese story title that hints at the educational theme`,
            imageData,
        );

        // Generate Scene 1 image
        const scene1Image = await generateImage(
            scene1Data.visualPrompt || `${scene1Data.characterDesign || 'cute character'} arriving in a magical world, looking around with wonder and big sparkling eyes`,
            biome.visualPrompt,
            seed,
            'act1',
        );

        console.log('✅ [Act 1] Complete!');

        res.json({
            success: true,
            seed,
            blueprint: {
                id: blueprint.id,
                name: blueprint.name,
                pillar: blueprint.pillar,
                interactionType: blueprint.interactionType,
                challengePrompt: blueprint.challengePrompt,
                challengePrompt_en: blueprint.challengePrompt_en,
                choices: blueprint.choices || null,
                drawInstruction: blueprint.drawInstruction || null,
                drawInstruction_en: blueprint.drawInstruction_en || null,
                empathyChoices: blueprint.empathyChoices,
                educationalGoal: blueprint.educationalGoal,
                educationalGoal_en: blueprint.educationalGoal_en,
                rewardSticker: blueprint.rewardSticker,
                rewardSticker_en: blueprint.rewardSticker_en,
            },
            biome: { id: biome.id, name: biome.name },
            guardian: { id: guardian.id, name: guardian.name, icon: guardian.icon },
            title: scene1Data.title || 'Câu Chuyện Kỳ Diệu',
            characterName: scene1Data.characterName || 'Bạn Nhỏ',
            characterDesign: scene1Data.characterDesign || '',
            scene: {
                narration: scene1Data.narration,
                narration_en: scene1Data.narration_en,
                imageUrl: scene1Image,
                emotion: scene1Data.emotion || 'happy',
                kenBurns: scene1Data.kenBurns || 'zoom-in',
                sceneDescription: scene1Data.sceneDescription || 'Nhân vật bước vào thế giới kỳ diệu',
            },
            drawingUrl: `/${req.file.path.replace(/\\/g, '/')}`,
        });
    } catch (error: any) {
        console.error('❌ [Act 1] Error:', error);
        res.status(500).json({ success: false, error: 'Lỗi khi bắt đầu câu chuyện. Vui lòng thử lại!', details: error.message });
    }
});

// ═══════════════════════════════════════════════════════════════════════════════
// ROUTE: POST /api/story/act2
// Child's challenge answer → Scene 2 showing UNIQUE CONSEQUENCE + NPC as FOREGROUND FOCUS
// ═══════════════════════════════════════════════════════════════════════════════

router.post('/story/act2', upload.single('challengeDrawing'), async (req: Request, res: Response) => {
    try {
        const { seed, biomeId, characterDesign, characterName, challengeChoice, blueprintId } = req.body;
        const biome = getBiome(biomeId);
        const blueprint = BLUEPRINTS.find(b => b.id === blueprintId) || BLUEPRINTS[0];
        const guardian = getGuardian(blueprint.guardianId);

        console.log(`🎬 [Act 2] Challenge response: ${challengeChoice || 'drawing'}`);

        let userPrompt: string;
        let imageData: { data: string; mimeType: string } | undefined;

        if (req.file) {
            // Child drew a solution
            imageData = {
                data: fs.readFileSync(req.file.path).toString('base64'),
                mimeType: req.file.mimetype,
            };
            userPrompt = `The child drew a solution to the challenge: "${blueprint.challengePrompt_en}".
Look at their drawing and accept it enthusiastically! Describe what they drew specifically.

The character "${characterName}" (EXACT appearance: ${characterDesign}) used this drawn item to solve the problem.

Generate Act 2: 
1. Show the character USING the drawn solution in detail — what happens? How does it work? (2-3 sentences)
2. Then introduce "${guardian.name}" — ${guardian.personality}. 
   ${guardian.name} APPEARS as the main focus of the scene. They are impressed by the character's creativity.
3. ${guardian.name} and the character interact warmly. ${guardian.name} needs help with something related to the educational theme.

CRITICAL for visualPrompt: 
- "${guardian.name}" (${guardian.visualPrompt}) must be the PRIMARY FOREGROUND SUBJECT — large, centered, expressive.
- "${characterName}" (${characterDesign}) stands beside ${guardian.name} — both visible but ${guardian.name} is the FOCUS.
- Include the specific solution the child drew in the scene.`;
        } else {
            // Child tapped a choice → use its unique CONSEQUENCE for branching
            const selectedChoice = blueprint.choices?.find(c => c.id === challengeChoice);
            const choiceLabel = selectedChoice?.label || challengeChoice;
            const choiceConsequence = selectedChoice?.consequence || `The character acts on their choice of "${choiceLabel}".`;

            userPrompt = `The child chose: "${choiceLabel}" to respond to the challenge: "${blueprint.challengePrompt_en}".

WHAT HAPPENS BECAUSE OF THIS CHOICE (you MUST follow this consequence):
${choiceConsequence}

The character "${characterName}" (EXACT appearance: ${characterDesign}) made this specific choice.

Generate Act 2:
1. Show EXACTLY what the consequence says — make it vivid and detailed. (2-3 sentences describing the unique outcome)
2. Then introduce "${guardian.name}" — ${guardian.personality}.
   ${guardian.name} APPEARS as the main focus. They witnessed what happened and react specifically to this choice.
3. ${guardian.name} and the character interact warmly. The interaction must reference the specific choice the child made.

CRITICAL for visualPrompt:
- "${guardian.name}" (${guardian.visualPrompt}) must be the PRIMARY FOREGROUND SUBJECT — large, centered, expressive.
- "${characterName}" (${characterDesign}) stands beside ${guardian.name} — both clearly visible.
- Show the specific consequence of the child's choice in the background/environment.`;
        }

        const scene2Data = await callGemini(
            buildSystemPrompt(biome.name, biome.visualPrompt, 2, blueprint.educationalGoal_en),
            userPrompt,
            imageData,
        );

        const scene2Image = await generateImage(
            scene2Data.visualPrompt || `${guardian.visualPrompt} in the foreground center, large and expressive, ${characterDesign} standing beside, friendly interaction, both looking at each other`,
            biome.visualPrompt,
            parseInt(seed) || Math.floor(Math.random() * 999999),
            'act2',
        );

        console.log('✅ [Act 2] Complete!');

        res.json({
            success: true,
            scene: {
                narration: scene2Data.narration,
                narration_en: scene2Data.narration_en,
                imageUrl: scene2Image,
                emotion: scene2Data.emotion || 'curious',
                kenBurns: scene2Data.kenBurns || 'pan-right',
                sceneDescription: scene2Data.sceneDescription || `${characterName} gặp ${guardian.name}`,
            },
            empathy: {
                prompt: `${guardian.name} cần sự giúp đỡ! Con muốn làm gì?`,
                prompt_en: `${guardian.name} needs help! What do you want to do?`,
                choices: blueprint.empathyChoices,
            },
        });
    } catch (error: any) {
        console.error('❌ [Act 2] Error:', error);
        res.status(500).json({ success: false, error: 'Lỗi khi tạo cảnh 2. Vui lòng thử lại!', details: error.message });
    }
});

// ═══════════════════════════════════════════════════════════════════════════════
// ROUTE: POST /api/story/act3
// Child's empathy choice → Scene 3 (resolution + educational conclusion + sticker)
// ═══════════════════════════════════════════════════════════════════════════════

router.post('/story/act3', express.json(), async (req: Request, res: Response) => {
    try {
        const {
            seed, biomeId, characterDesign, characterName,
            empathyChoice, empathyConsequence, historySummary,
            guardianId, rewardSticker, rewardSticker_en,
            blueprintId, educationalGoal, educationalGoal_en,
        } = req.body;
        const biome = getBiome(biomeId);
        const guardian = getGuardian(guardianId);
        const blueprint = BLUEPRINTS.find(b => b.id === blueprintId);
        const pillar = blueprint?.pillar || 'eq';

        console.log(`🎬 [Act 3] Empathy choice: ${empathyChoice}`);

        const scene3Data = await callGemini(
            buildSystemPrompt(biome.name, biome.visualPrompt, 3, educationalGoal_en || ''),
            `The child chose to: "${empathyChoice}" with ${guardian.name}.
${empathyConsequence ? `The meaning of this choice: ${empathyConsequence}` : ''}

HERE IS THE FULL STORY HISTORY:
${historySummary}

The character "${characterName}" (EXACT appearance: ${characterDesign}) and ${guardian.name} (${guardian.personality}) now share this moment.

Generate Act 3 (THE ENDING — make it BEAUTIFUL and EDUCATIONAL):
1. Show the direct result of the child's empathy choice in detail. What happens because they chose THIS specific action? (2-3 sentences)
2. ${guardian.name} gives the character "${rewardSticker || 'a magical gift'}" as a thank-you. Describe the magical moment the gift appears. (1-2 sentences)
3. End with a warm, cozy closing. The world feels peaceful. (1-2 sentences)
4. The very last sentence MUST be: "Hẹn gặp lại nhé, bạn đạo diễn tài ba!" (See you again, brilliant director!)

IMPORTANT — Add these extra fields to your JSON. The Lesson Feedback is CRITICAL. You must include a detailed, personalized teacher-like evaluation ("Nhận xét") based on the FULL STORY HISTORY provided above.
- "lessonFeedback": A highly detailed Vietnamese feedback (3-4 sentences). Praise SPECIFICALLY what they chose in BOTH the challenge and the empathy stage. Mention the biome they traveled through ("${biome.name}") and the friend they met ("${guardian.name}"). E.g. "Bé đã rất dũng cảm khi khám phá Kỷ Ura và gặp bạn Khủng Long! Khi đối mặt thử thách, con đã chọn... và cuối cùng con lại quyết định... Điều đó cho thấy con là một em bé rất tuyệt vời vì..."
- "lessonFeedback_en": English version of the feedback
- "lessonSummary": Vietnamese summary of what was learned (1 sentence, educational). E.g. "Bài học hôm nay: Khi ta chia sẻ, hạnh phúc nhân đôi!"
- "lessonSummary_en": English version

CRITICAL for visualPrompt:
- Show "${characterName}" (${characterDesign}) and "${guardian.name}" (${guardian.visualPrompt}) together in a warm, happy moment.
- Both characters must be clearly visible and expressive.
- The scene should feel like a golden, magical ending — warm light, sparkles, happiness.`,
        );

        const scene3Image = await generateImage(
            scene3Data.visualPrompt || `${characterDesign} and ${guardian.visualPrompt} together in a warm happy moment, golden magical light, sparkles, both smiling, beautiful ending scene`,
            biome.visualPrompt,
            parseInt(seed) || Math.floor(Math.random() * 999999),
            'act3',
        );

        console.log('✅ [Act 3] Story complete!');

        res.json({
            success: true,
            scene: {
                narration: scene3Data.narration,
                narration_en: scene3Data.narration_en,
                imageUrl: scene3Image,
                emotion: scene3Data.emotion || 'happy',
                kenBurns: scene3Data.kenBurns || 'zoom-out',
                sceneDescription: scene3Data.sceneDescription || 'Kết thúc vui vẻ',
            },
            reward: {
                sticker: rewardSticker || 'Ngôi Sao Kỳ Diệu',
                sticker_en: rewardSticker_en || 'Magic Star',
            },
            lessonConclusion: {
                feedback: scene3Data.lessonFeedback || 'Bé đã làm rất tốt! Con biết cách yêu thương và giúp đỡ bạn bè!',
                feedback_en: scene3Data.lessonFeedback_en || 'You did great! You know how to love and help your friends!',
                lesson: scene3Data.lessonSummary || 'Bài học hôm nay: Yêu thương và sẻ chia!',
                lesson_en: scene3Data.lessonSummary_en || 'Today\'s lesson: Love and sharing!',
                pillar,
            },
        });
    } catch (error: any) {
        console.error('❌ [Act 3] Error:', error);
        res.status(500).json({ success: false, error: 'Lỗi khi tạo kết thúc. Vui lòng thử lại!', details: error.message });
    }
});

// ═══════════════════════════════════════════════════════════════════════════════
// LEGACY: POST /api/storyboard (kept for backward compatibility)
// ═══════════════════════════════════════════════════════════════════════════════

router.post('/storyboard', upload.single('drawing'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'Vui lòng tải lên bức vẽ của bé!' });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const imageBuffer = fs.readFileSync(req.file.path);

        const LEGACY_PROMPT = `You are a children's storyteller. Analyze this drawing and create a 3-scene adventure.
Return PURE JSON only: { "title": "Vietnamese title", "characterDesign": "English desc", "scenes": [{ "narration": "Vietnamese", "narration_en": "English", "visualPrompt": "English image prompt", "sceneDescription": "short Vietnamese", "emotion": "happy", "kenBurns": "zoom-in" }] }`;

        const result = await model.generateContent([LEGACY_PROMPT, { inlineData: { data: imageBuffer.toString('base64'), mimeType: req.file.mimetype } }]);
        const rawText = result.response.text();
        const jsonText = rawText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
        const storyData = JSON.parse(jsonText);

        if (!storyData.title || !Array.isArray(storyData.scenes)) {
            return res.status(500).json({ success: false, error: 'AI trả về dữ liệu không hợp lệ.' });
        }

        const seed = Math.floor(Math.random() * 999999);
        const biome = pickRandom(BIOMES);
        const sceneImages: string[] = [];
        for (let i = 0; i < storyData.scenes.length; i++) {
            const scene = storyData.scenes[i];
            const img = await generateImage(scene.visualPrompt || scene.sceneDescription, biome.visualPrompt, seed, `legacy-${i}`);
            sceneImages.push(img);
        }

        res.json({
            success: true,
            title: storyData.title,
            characterDesign: storyData.characterDesign || '',
            scenes: storyData.scenes.map((s: any, i: number) => ({ ...s, imageUrl: sceneImages[i] || '' })),
            drawingUrl: `/${req.file.path.replace(/\\/g, '/')}`,
        });
    } catch (error: any) {
        console.error('❌ Legacy Storyboard Error:', error);
        res.status(500).json({ success: false, error: 'Lỗi khi xử lý. Vui lòng thử lại!', details: error.message });
    }
});

export default router;
