/**
 * ART AGENT 🎨
 * ─────────────────────────────────────────────────────────────────────
 * Nhiệm vụ DUY NHẤT: Tạo ảnh 3D Pixar từ prompt, lưu về cục bộ.
 * Dùng Pollinations AI (Free, không cần key) làm nguồn chính.
 * Dùng HuggingFace SDXL làm nguồn dự phòng.
 */
import axios from 'axios';
import fs from 'fs';
import path from 'path';

export interface ArtOutput {
    localPath: string;     // Đường dẫn file cục bộ
    publicPath: string;    // URL công khai relative (dùng cho video)
    sourceUrl: string;     // URL nguồn từ Pollinations
}

const uploadDir = 'uploads/magic';

export const ArtAgent = async (prompt: string, storyId: number): Promise<ArtOutput> => {
    console.log("🎨 [Art Agent] Đang tạo ảnh 3D Pixar với Pollinations.AI...");

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `magic-art-${storyId}-${Date.now()}.png`;
    const localPath = path.join(uploadDir, fileName);
    const publicPath = `/${localPath.replace(/\\/g, '/')}`;

    // Pollinations AI - Dùng model "turbo" để sinh ảnh siêu tốc (< 3s)
    const encodedPrompt = encodeURIComponent(prompt);
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=800&nologo=true&model=turbo&seed=${storyId}`;

    try {
        console.log("🖼️ [Art Agent] Đang tải ảnh từ Pollinations.AI...");
        const response = await axios.get(pollinationsUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' }, // Tránh lỗi 410 (Bị chặn request từ bot Node.js)
            responseType: 'arraybuffer',
            timeout: 10000 // Ép timeout 10 giây để chuyển sang phương án sau nếu cần
        });

        fs.writeFileSync(localPath, Buffer.from(response.data));
        console.log(`✅ [Art Agent] Ảnh 3D lưu tại: ${localPath}`);

        return {
            localPath,
            publicPath,
            sourceUrl: pollinationsUrl // Keep Pollinations URL as public source for video
        };

    } catch (pollinationsError: any) {
        console.error("⚠️ [Art Agent] Pollinations thất bại, thử HuggingFace...");

        // Fallback: HuggingFace SDXL
        try {
            const hfResponse = await axios.post(
                "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
                { inputs: prompt },
                {
                    headers: { Authorization: `Bearer ${process.env.HF_TOKEN}` },
                    responseType: 'arraybuffer',
                    timeout: 90000
                }
            );

            fs.writeFileSync(localPath, Buffer.from(hfResponse.data));
            console.log(`✅ [Art Agent] Ảnh 3D (HF Fallback) lưu tại: ${localPath}`);

            return { localPath, publicPath, sourceUrl: pollinationsUrl };

        } catch (hfError: any) {
            console.error("❌ [Art Agent] Cả Pollinations và HuggingFace đều thất bại.");
            throw new Error(`Art Agent thất bại: ${hfError.message}`);
        }
    }
};
