/**
 * Storyboard Routes — AI Magic Story (3-Act System)
 * ====================================================
 * POST /api/story/start  — Act 1: Vision analysis + Scene 1 generation
 * POST /api/story/act2   — Act 2: Challenge response + Scene 2 generation
 * POST /api/story/act3   — Act 3: Empathy response + Scene 3 + lesson
 *
 * Legacy endpoint preserved for backward compat:
 * POST /api/storyboard   — Old single-call endpoint (deprecated)
 *
 * Narration philosophy:
 *  - Max 3 sentences per scene, max 12 words per sentence
 *  - Act 1 ends with a VAGUE "something appeared!" cliffhanger (no challenge specifics)
 *  - Act 2 ends with a VAGUE "someone needs help!" hook (no empathy specifics)
 *  - Act 3 is the warm resolution referencing both choices
 *  - The challenge and empathy choice CARDS themselves reveal specifics — not the narration
 */

import express, { Request, Response } from 'express';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { authenticate } from '../../core/middleware/auth.js';

// Story routes use soft auth: validates token if present, never blocks unauthenticated users.
// AI storytelling is a child-facing feature — no sensitive data, no hard auth gate needed.
const optionalAuth = (req: Request, res: Response, next: any) => {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
        try {
            const secret = process.env.JWT_SECRET;
            if (secret) (req as any).user = jwt.verify(authHeader.split(' ')[1], secret);
        } catch { /* token invalid — still allow through */ }
    }
    next();
};

import { generateImage } from '../../shared/services/imageService.js';
import {
    BLUEPRINTS, BIOMES, GUARDIANS,
    getRandomBlueprint, getBiome, getGuardian,
    VISUAL_STYLE_SHELL, VISUAL_NEGATIVE,
} from '../../../src/features/storyboard/data/worldBible.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// ─── Multer config ──────────────────────────────────────────────────────────

const uploadDir = 'uploads/storyboard';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'drawing-' + unique + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        const ok = /jpeg|jpg|png|webp/.test(file.mimetype) &&
            /jpeg|jpg|png|webp/.test(path.extname(file.originalname).toLowerCase());
        ok ? cb(null, true) : cb(new Error('Chỉ chấp nhận ảnh jpg/png/webp!'));
    },
});

// ─── Gemini client + fallback chain ─────────────────────────────────────────

// Models tried in order — cheapest/fastest first, most capable last.
const GEMINI_MODELS = [
    'gemini-2.5-flash',
    'gemini-2.0-flash-lite-preview-02-05',
    'gemini-2.5-flash-lite',
    'gemini-2.0-flash-lite',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-flash-8b',
    'gemini-1.5-pro',
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash-8b',
    'gemini-1.5-pro-latest',
];

/**
 * Calls Gemini with automatic model and key fallback.
 * On 429, it silently tries the same model with the next API key.
 * On 404 (model not found), it skips all keys for that model and tries the next model.
 */
const callGeminiWithFallback = async (parts: any[]): Promise<string> => {
    let lastError: any;
    
    // Load all available keys from .env
    const keys = [
        process.env.GEMINI_API_KEY_1,
        process.env.GEMINI_API_KEY_2,
        process.env.GEMINI_API_KEY_3,
        process.env.GEMINI_API_KEY_4,
        process.env.GEMINI_API_KEY_5,
        process.env.GEMINI_API_KEY // Legacy fallback
    ].filter(Boolean) as string[];

    if (keys.length === 0) {
        throw new Error("❌ No GEMINI_API_KEY found in environment variables.");
    }

    for (const modelName of GEMINI_MODELS) {
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            try {
                console.log(`🤖 Trying Gemini model: ${modelName} (Key #${i + 1}/${keys.length})`);
                const genAI = new GoogleGenerativeAI(key);
                const model = genAI.getGenerativeModel({
                    model: modelName,
                    generationConfig: { responseMimeType: "application/json" }
                });
                
                const result = await model.generateContent(parts);
                const text = result.response.text();
                console.log(`✅ ${modelName} (Key #${i + 1}) responded OK`);
                return text;
            } catch (err: any) {
                const status = err?.status || err?.httpStatus || 0;
                const msg = err?.message || String(err);
                lastError = err;

                // 404 means the model is invalid/removed. Don't waste other keys on it.
                if (status === 404 || msg.includes('not found')) {
                    console.warn(`⚠️  ${modelName} not found (404), skipping to next model...`);
                    break; 
                }

                const isRetryable = status === 429 || status === 503 || msg.includes('quota') || msg.includes('overloaded') || msg.includes('unavailable');
                
                if (isRetryable) {
                    console.warn(`⚠️  ${modelName} (Key #${i + 1}) failed (${status || msg.slice(0, 60)}), trying next key...`);
                    if (status === 429) await new Promise(r => setTimeout(r, 1000)); // 1s cooldown
                    continue; // Try next key
                } else {
                    // Non-retryable error (e.g. bad prompt format), throw immediately
                    console.error(`❌  ${modelName} (Key #${i + 1}) fatal error:`, msg);
                    throw err;
                }
            }
        }
    }
    throw lastError;
};

// ─── Narration system prompt ─────────────────────────────────────────────────

const NARRATION_RULES = `
MANDATORY RULES FOR NARRATION:
1. Write EXACTLY 3 sentences. No more, no less.
2. Each sentence must be 12 words or fewer.
3. Use simple Vietnamese vocabulary for 4–6 year olds.
4. Use onomatopoeia words (tùng tùng, rón rén, ào ào, leng keng, rào rào, bộp bộp).
5. Keep the tone warm, enthusiastic, like a gentle kindergarten teacher.
6. Do NOT mention what the child should do next. The challenge card will do that.
7. Do NOT use complex metaphors or subordinate clauses.
8. Format response as JSON with exactly these fields:
   { "narration": "...", "narration_en": "...", "sceneDescription": "..." }
   sceneDescription is a short 4–6 word Vietnamese scene title.
`;

// ─── ROUTE: POST /api/story/start ────────────────────────────────────────────
// Act 1: Analyse drawing → pick blueprint → generate Scene 1
router.post('/story/start', optionalAuth, upload.single('drawing'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'Vui lòng tải lên bức vẽ!' });
        }

        const imageData = fs.readFileSync(req.file.path);
        const imagePart = {
            inlineData: { data: imageData.toString('base64'), mimeType: req.file.mimetype },
        };

        // Step 1: Identify the character from the drawing
        const visionPrompt = `
You are analysing a drawing made by a 4–6 year old child.
Identify the main subject (e.g. "a small blue cat", "a round yellow duck").
Respond in JSON: { "characterName": "...", "characterDesign": "..." }
characterName: a short cute Vietnamese name for the character (1–2 words, e.g. "Mèo Xanh").
characterDesign: 1 English sentence describing the character for image generation (e.g. "a small blue cat with big round eyes").
If the drawing is unclear, invent a friendly character that fits the shapes you see.
`;
        const visionTextRaw = await callGeminiWithFallback([visionPrompt, imagePart]);
        const visionText = visionTextRaw.replace(/```json|```/g, '').trim();
        const { characterName, characterDesign } = JSON.parse(visionText);

        // Step 2: Pick a random blueprint + its biome + guardian
        const pillarFilter = req.body.pillarFilter;
        const bp = getRandomBlueprint(pillarFilter);
        const biome = getBiome(bp.preferredBiome);
        const guardian = getGuardian(bp.guardianId);
        const seed = Date.now();

        // Step 3: Generate Act 1 narration
        // IMPORTANT: Act 1 ends with a vague "something appeared" cliffhanger.
        // Do NOT mention the specific challenge — the challenge card will reveal it.
        const act1Prompt = `
You are writing Act 1 of a children's story for a 4–6 year old.
Character: ${characterName} (${characterDesign})
World: ${biome.name} — ${biome.visualPrompt}

${NARRATION_RULES}

ADDITIONAL RULES FOR ACT 1:
- Sentence 1: ${characterName} arrives in the world. Set the scene with wonder and energy.
- Sentence 2: Something fun or magical happens — an exploration, discovery, or small joy.
- Sentence 3 (the cliffhanger): End with something unexpected appearing! Use surprise words
  (Bỗng nhiên, Ôi chà, A kìa, Đùng một cái). Be VAGUE — do NOT say what the problem is.
  Examples: "Bỗng nhiên, có gì đó bất ngờ xuất hiện phía trước!" or
            "Ôi chà! Đùng một cái, một điều kỳ lạ xảy ra rồi!"
`;
        const act1TextRaw = await callGeminiWithFallback([act1Prompt]);
        const act1Text = act1TextRaw.replace(/```json|```/g, '').trim();
        const act1Scene = JSON.parse(act1Text);

        // Step 4: Generate Act 1 image
        const imagePrompt = `${VISUAL_STYLE_SHELL}, ${biome.visualPrompt}, ${characterDesign} exploring ${biome.name}, --no ${VISUAL_NEGATIVE}`;
        const imageUrl = await generateImage(imagePrompt, 'scene1') || '/assets/story-ai/placeholder.png';

        // Step 5: Draw URL (for history)
        const drawingUrl = `/${req.file.path.replace(/\\/g, '/')}`;

        return res.json({
            success: true,
            seed,
            blueprint: {
                id: bp.id,
                name: bp.name,
                pillar: bp.pillar,
                interactionType: bp.interactionType,
                challengePrompt: bp.challengePrompt,
                challengePrompt_en: bp.challengePrompt_en,
                choices: bp.choices,
                drawInstruction: bp.drawInstruction,
                drawInstruction_en: bp.drawInstruction_en,
                empathyChoices: bp.empathyChoices,
                educationalGoal: bp.educationalGoal,
                educationalGoal_en: bp.educationalGoal_en,
                rewardSticker: bp.rewardSticker,
                rewardSticker_en: bp.rewardSticker_en,
            },
            biome: { id: biome.id, name: biome.name },
            guardian: { id: guardian.id, name: guardian.name, icon: guardian.icon },
            title: `${characterName} Và ${biome.name}`,
            characterName,
            characterDesign,
            drawingUrl,
            scene: {
                narration: act1Scene.narration,
                narration_en: act1Scene.narration_en,
                imageUrl,
                emotion: 'happy',
                kenBurns: 'zoom-in',
                sceneDescription: act1Scene.sceneDescription,
            },
        });

    } catch (err: any) {
        console.error('❌ /story/start error:', err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

// ─── ROUTE: POST /api/story/act2 ─────────────────────────────────────────────
// Act 2: Kid's challenge response → Scene 2 + empathy prompt
router.post('/story/act2', optionalAuth, upload.single('challengeDrawing'), async (req: Request, res: Response) => {
    try {
        const { seed, biomeId, characterDesign, characterName, blueprintId, challengeChoice } = req.body;

        const bp = BLUEPRINTS.find(b => b.id === blueprintId);
        const biome = getBiome(biomeId);
        const guardian = bp ? getGuardian(bp.guardianId) : null;
        if (!bp) return res.status(400).json({ success: false, error: 'Blueprint not found' });

        // Model is instantiated via fallback helper

        // Build the response context (choice text OR "child drew something creative")
        let responseContext = `The child made a spontaneous choice.`;
        let drawnObjectInsight = '';
        let drawnObjectLiteral = '';

        if (req.file) {
            // Vision Analysis for Drawings
            const imageData = fs.readFileSync(req.file.path);
            const imagePart = {
                inlineData: { data: imageData.toString('base64'), mimeType: req.file.mimetype },
            };
            const visionPrompt = `
You are a child psychologist evaluating a drawing made by a 4-6 year old.
The child was presented with this challenge: "${bp.challengePrompt_en}"
Look at the drawing. Identify what the child drew to solve this problem.
Provide a 1-sentence behavioral insight explaining what this reveals about their problem-solving style or personality.
Respond in JSON: { "drawnObject": "bridge", "behavioralInsight": "The child drew a bridge, demonstrating structural logic and a direct problem-solving approach." }
If the drawing is unclear, invent a creative, positive interpretation.
`;
            const visionTextRaw = await callGeminiWithFallback([visionPrompt, imagePart]);
            const visionText = visionTextRaw.replace(/```json|```/g, '').trim();
            const { drawnObject, behavioralInsight } = JSON.parse(visionText);

            drawnObjectLiteral = drawnObject;
            drawnObjectInsight = behavioralInsight;
            responseContext = `The child drew a: ${drawnObject}. Behavioral insight: ${behavioralInsight}`;
        } else if (challengeChoice) {
            const choiceObj = bp.choices?.find(c => c.id === challengeChoice);
            if (choiceObj) {
                responseContext = `The child chose: "${choiceObj.label_en}" (${choiceObj.consequence_en || choiceObj.consequence})`;
            }
        }

        // Act 2 narration: responds to the choice, then ends with a VAGUE "someone needs help"
        // Do NOT specify what the empathy choices are — the cards will do that.
        const act2Prompt = `
You are writing Act 2 of a children's story for a 4–6 year old.
Character: ${characterName} (${characterDesign})
World: ${biome.name}
The child just responded to a challenge: ${responseContext}
The character will meet: ${guardian?.name || 'a friendly creature'} (${guardian?.personality || 'friendly and magical'}) who needs help.

${NARRATION_RULES}

ADDITIONAL RULES FOR ACT 2:
- Sentence 1: Celebrate what ${characterName} just did (the response context above). Be enthusiastic!
- Sentence 2: ${characterName} and/or the world changes because of it. Something wonderful starts happening.
- Sentence 3 (the hook): Set up the next situation naturally. The situation is: ${bp.empathyPrompt}
`;
        const act2TextRaw = await callGeminiWithFallback([act2Prompt]);
        const act2Text = act2TextRaw.replace(/```json|```/g, '').trim();
        const act2Scene = JSON.parse(act2Text);

        // Image: if child drew something, feature it as the MAIN focus; still include character + guardian
        const drawnObjectContext = req.file && drawnObjectLiteral
            ? `a creative hand-drawn invention made by a child: ${drawnObjectLiteral}, prominently in the foreground center, large and detailed`
            : null;

        const imagePrompt = drawnObjectContext
            ? `${VISUAL_STYLE_SHELL}, ${biome.visualPrompt}, ${drawnObjectContext}, with ${characterDesign} and ${guardian?.visualPrompt || 'a friendly animal'} in the background reacting with joy and amazement, --no ${VISUAL_NEGATIVE}`
            : `${VISUAL_STYLE_SHELL}, ${biome.visualPrompt}, ${characterDesign} meeting ${guardian?.visualPrompt || 'a friendly animal'}, --no ${VISUAL_NEGATIVE}`;

        const imageUrl = await generateImage(imagePrompt, 'scene2') || '/assets/story-ai/placeholder.png';


        return res.json({
            success: true,
            scene: {
                narration: act2Scene.narration,
                narration_en: act2Scene.narration_en,
                imageUrl,
                emotion: 'curious',
                kenBurns: 'pan-right',
                sceneDescription: act2Scene.sceneDescription,
            },
            empathy: {
                prompt: bp.empathyPrompt,
                prompt_en: bp.empathyPrompt_en,
                choices: bp.empathyChoices,
            },
            drawnInsight: drawnObjectInsight || undefined,
        });

    } catch (err: any) {
        console.error('❌ /story/act2 error:', err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

// ─── ROUTE: POST /api/story/act3 ─────────────────────────────────────────────
// Act 3: Empathy choice → Scene 3 + lesson conclusion
router.post('/story/act3', optionalAuth, async (req: Request, res: Response) => {
    try {
        const {
            biomeId, characterDesign, characterName,
            empathyChoice, empathyConsequence, historySummary,
            guardianId, rewardSticker, rewardSticker_en,
            blueprintId, educationalGoal, educationalGoal_en,
        } = req.body;

        const biome = getBiome(biomeId);
        const guardian = getGuardian(guardianId);
        const bp = BLUEPRINTS.find(b => b.id === blueprintId);
        // Model instantiated via fallback helper

        // Act 3 narration: warm resolution referencing the actual choice made
        const act3Prompt = `
You are writing Act 3 (the finale) of a children's story for a 4–6 year old.
Character: ${characterName} (${characterDesign})
World: ${biome.name}
Guardian NPC: ${guardian.name}
The child's empathy choice: "${empathyChoice}" (${empathyConsequence})
Story so far: ${historySummary}

${NARRATION_RULES}

ADDITIONAL RULES FOR ACT 3:
- Sentence 1: ${characterName}'s kind choice works! Something wonderful happens immediately.
- Sentence 2: ${guardian.name} is happy and grateful. The world feels brighter because of ${characterName}.
- Sentence 3: A warm, feel-good ending. ${characterName} feels proud. The adventure is complete.
- Sentence 4: The final sentence in your 'narration' JSON field MUST be: "Hẹn gặp lại nhé, bạn đạo diễn tài ba!" (And the 'narration_en' field MUST end with: "See you again, brilliant director!"). Do NOT write any text outside the JSON block.
`;
        const act3TextRaw = await callGeminiWithFallback([act3Prompt]);
        const act3Text = act3TextRaw.replace(/```json|```/g, '').trim();
        const act3Scene = JSON.parse(act3Text);

        // Lesson conclusion — personalised by the actual choices made
        const lessonPrompt = `
You are an expert preschool teacher and child psychologist.
Write a highly detailed educational feedback for the parent/teacher.
The child just completed a story in the world of ${biome.name} meeting ${guardian.name}.
- Educational goal: ${educationalGoal}
- They made these choices:
  Challenge Phase Action: ${historySummary}
  Final Empathy Choice: "${empathyChoice}" (${empathyConsequence})

Respond in JSON:
{
  "feedback": "...",   (A highly detailed Vietnamese evaluation, 3-4 sentences. You MUST explicitly praise what they chose/drew in the Challenge Phase and how they handled the Empathy Choice. Combine these two actions to explain their psychological profile and character strengths. E.g. "Bé đã thể hiện tư duy cấu trúc khi vẽ một cây cầu để giải quyết vấn đề. Thêm vào đó, việc con chọn chia sẻ chiếc khăn ấm cho thấy con là một em bé có sự đồng cảm sâu sắc...")
  "feedback_en": "...", (English translation of the feedback)
  "lesson": "...",      (1 sentence Vietnamese takeaway, start with "Bài học hôm nay:")
  "lesson_en": "..."    (same in English, start with "Today's lesson:")
}
`;
        const lessonTextRaw = await callGeminiWithFallback([lessonPrompt]);
        const lessonText = lessonTextRaw.replace(/```json|```/g, '').trim();
        const lesson = JSON.parse(lessonText);

        // Image: joyful resolution scene with character + guardian
        const imagePrompt = `${VISUAL_STYLE_SHELL}, ${biome.visualPrompt}, ${characterDesign} and ${guardian.visualPrompt} celebrating together joyfully, --no ${VISUAL_NEGATIVE}`;
        const imageUrl = await generateImage(imagePrompt, 'scene3') || '/assets/story-ai/placeholder.png';

        return res.json({
            success: true,
            scene: {
                narration: act3Scene.narration,
                narration_en: act3Scene.narration_en,
                imageUrl,
                emotion: 'happy',
                kenBurns: 'zoom-out',
                sceneDescription: act3Scene.sceneDescription,
            },
            reward: { sticker: rewardSticker, sticker_en: rewardSticker_en },
            lessonConclusion: {
                ...lesson,
                pillar: bp?.pillar || 'eq',
            },
        });

    } catch (err: any) {
        console.error('❌ /story/act3 error:', err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

// ─── ROUTE: POST /api/storyboard (LEGACY) ────────────────────────────────────
router.post('/storyboard', optionalAuth, upload.single('drawing'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'Vui lòng tải lên bức vẽ của bé!' });
        }
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const imageData = fs.readFileSync(req.file.path);
        const imagePart = { inlineData: { data: imageData.toString('base64'), mimeType: req.file.mimetype } };
        const prompt = 'Đây là bức tranh vẽ tay của trẻ 3-6 tuổi. Hãy sáng tác một câu chuyện ngắn (3 câu) bằng tiếng Việt, mang tính tích cực, ấm áp.';
        const result = await model.generateContent([prompt, imagePart]);
        res.json({
            success: true,
            story: result.response.text(),
            drawingUrl: `/${req.file.path.replace(/\\/g, '/')}`,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, error: err.message });
    }
});

export default router;
