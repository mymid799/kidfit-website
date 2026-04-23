/**
 * Image Generation Service — Waterfall Chain
 * ============================================
 * Priority order:
 *  1. Pollinations.ai   — Free, no key required, URL-based
 *  2. HuggingFace #1–4  — Bearer token, FLUX.1-schnell model (COMMENTED OUT FOR DEV)
 *  3. null              — All failed; frontend shows no image
 */


import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { InferenceClient } from '@huggingface/inference';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POLLINATIONS_BASE = 'https://image.pollinations.ai/prompt';
const OUTPUT_DIR = 'uploads/story-scenes';
const TIMEOUT_MS = 90_000; // Increased to 90s to prevent Pollinations from aborting during queue

const ensureOutputDir = () => {
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
};

const saveImage = (buffer: Buffer, label: string): string => {
    ensureOutputDir();
    const filename = `${label}-${Date.now()}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(filepath, buffer);
    return `/${filepath.replace(/\\/g, '/')}`;
};

const fetchWithTimeout = async (url: string, options: any = {}) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
        return await fetch(url, { ...options, signal: controller.signal });
    } finally {
        clearTimeout(id);
    }
};

// ─── Provider 1: Pollinations.ai ────────────────────────────────────────────

const tryPollinations = async (prompt: string, label: string): Promise<string | null> => {
    try {
        const encoded = encodeURIComponent(prompt);
        const url = `${POLLINATIONS_BASE}/${encoded}?width=1280&height=720&nologo=true&model=flux`;
        console.log('🎨 [Image] Trying Pollinations.ai...');
        const res = await fetchWithTimeout(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buffer = Buffer.from(await res.arrayBuffer());
        const publicPath = saveImage(buffer, label);
        console.log(`✅ [Image] Pollinations OK → ${publicPath}`);
        return publicPath;
    } catch (err: any) {
        console.warn(`⚠️  [Image] Pollinations failed: ${err.message}`);
        return null;
    }
};

// ─── Provider 2–5: HuggingFace (COMMENTED OUT — dev mode uses Pollinations only)

const tryHuggingFace = async (token: string, idx: number, prompt: string, label: string): Promise<string | null> => {
    try {
        console.log(`🎨 [Image] Trying HuggingFace token #${idx}...`);
        const hf = new InferenceClient(token);
        
        // Use the official SDK which handles the new Serverless Inference provider routing
        const blob = await hf.textToImage({
            model: 'black-forest-labs/FLUX.1-schnell',
            inputs: prompt,
        });

        const arrayBuffer = await (blob as any).arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const publicPath = saveImage(buffer, label);
        
        console.log(`✅ [Image] HuggingFace #${idx} OK → ${publicPath}`);
        return publicPath;
    } catch (err: any) {
        console.warn(`⚠️  [Image] HF #${idx} failed: ${err.message}`);
        return null;
    }
};

// ─── Public API ─────────────────────────────────────────────────────────────

export const generateImage = async (prompt: string, label: string): Promise<string | null> => {
    // 1–4. HuggingFace (primary)
    const hfTokens = [
        process.env.HUGGINGFACE_TOKEN_1,
        process.env.HUGGINGFACE_TOKEN_2,
        process.env.HUGGINGFACE_TOKEN_3,
        process.env.HUGGINGFACE_TOKEN_4,
        process.env.HUGGINGFACE_TOKEN_5,
    ].filter(Boolean) as string[];

    for (let i = 0; i < hfTokens.length; i++) {
        const result = await tryHuggingFace(hfTokens[i], i + 1, prompt, label);
        if (result) return result;
    }

    // 5. Pollinations (final fallback)
    const pollinationsResult = await tryPollinations(prompt, label);
    if (pollinationsResult) return pollinationsResult;

    console.error('❌ [Image] All providers failed — returning null.');
    return null;
};
