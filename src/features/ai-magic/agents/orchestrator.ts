/**
 * ORCHESTRATOR AGENT 🎼
 * ─────────────────────────────────────────────────────────────────────
 * "Nhạc trưởng" điều phối toàn bộ pipeline Agent theo thứ tự:
 * Vision → Story → Art → Audio → (Video nền)
 *
 * Đặc điểm:
 * - Cập nhật trạng thái pipeline vào DB tại mỗi bước
 * - Nếu một bước thất bại, chỉ bước đó lỗi, không dừng toàn bộ
 * - Video Agent chạy ngầm (non-blocking) sau khi user nhận kết quả
 */
import MagicStory from '../models/MagicStory.js';
import Journal from '../../../models/Journal.js';
import Student from '../../../models/Student.js';
import { VisionAgent } from './visionAgent.js';
import { StoryAgent } from './storyAgent.js';
import { ArtAgent } from './artAgent.js';
import { AudioAgent } from './audioAgent.js';
import { VideoAgent } from './videoAgent.js';

type PipelineStep = 'queued' | 'vision' | 'story' | 'art' | 'audio' | 'saving' | 'done' | 'failed';

// Cập nhật trạng thái pipeline vào DB
const updateStep = async (storyId: number, step: PipelineStep) => {
    await MagicStory.update({ pipelineStep: step }, { where: { id: storyId } });
    console.log(`⚙️ [Orchestrator] Pipeline Step: ${step.toUpperCase()}`);
};

export interface OrchestratorInput {
    imageBuffer: Buffer;
    mimeType: string;
    originalImagePath: string;
    userId: number;
    studentId?: string;
    journalId?: string;
}

export const runMagicPipeline = async (input: OrchestratorInput): Promise<number> => {
    const { imageBuffer, mimeType, originalImagePath, userId, studentId, journalId } = input;

    // Tạo record sơ bộ trong DB với trạng thái khởi đầu
    const magicStory = await MagicStory.create({
        userId,
        studentId: studentId || null,
        journalId: journalId || null,
        originalImageUrl: `/${originalImagePath}`,
        pipelineStep: 'queued',
        videoStatus: 'none',
        title: 'Đang tạo câu chuyện diệu kỳ...'
    });

    const storyId = magicStory.id;
    console.log(`🚀 [Orchestrator] Bắt đầu Magic Pipeline cho Story #${storyId}`);

    // Chạy pipeline ngầm, route sẽ trả về storyId ngay lập tức
    (async () => {
        try {
            // ── STEP 1: VISION ──────────────────────────────────────
            await updateStep(storyId, 'vision');
            const visionResult = await VisionAgent(imageBuffer, mimeType);

            // ── STEP 2: STORY ──────────────────────────────────────
            await updateStep(storyId, 'story');
            const storyResult = await StoryAgent(visionResult);

            // ── STEP 3: ART ────────────────────────────────────────
            await updateStep(storyId, 'art');
            const artResult = await ArtAgent(visionResult.artPrompt, storyId);

            // ── STEP 4: AUDIO (không block nếu lỗi) ───────────────
            await updateStep(storyId, 'audio');
            const audioResult = await AudioAgent(storyResult.storyVi);

            // ── STEP 5: LƯU VÀO DB ─────────────────────────────────
            await updateStep(storyId, 'saving');

            // Tạo nội dung truyện full từ kết quả song ngữ
            const fullStory = `📚 ${storyResult.titleVi} (${storyResult.titleEn})\n\n` +
                `🇻🇳 ${storyResult.storyVi}\n\n` +
                `🇬🇧 ${storyResult.storyEn}\n\n` +
                `📝 Câu hỏi: ${storyResult.questionVi}\n` +
                `   Question: ${storyResult.questionEn}`;

            await magicStory.update({
                title: storyResult.titleVi,
                aiStoryText: fullStory,
                aiImageUrl: artResult.publicPath,
                audioUrl: audioResult.audioUrl,
                videoStatus: 'processing',
                pipelineStep: 'done',
                storyMeta: {
                    vocabulary: storyResult.vocabulary,
                    moral: storyResult.moral,
                    category: visionResult.category,
                },
            });

            console.log(`✅ [Orchestrator] Story #${storyId} hoàn thành! Bắt đầu tạo Video ngầm...`);

            // ── STEP 6: VIDEO (non-blocking, chạy hoàn toàn ngầm) ──
            VideoAgent(artResult.sourceUrl, storyId).then(async (videoResult) => {
                if (videoResult.status === 'completed') {
                    await magicStory.update({
                        videoUrl: videoResult.videoPublicUrl,
                        videoStatus: 'completed',
                    });
                } else {
                    await magicStory.update({ videoStatus: 'failed' });
                }
            });

            // ── TẠO NHẬT KÝ HỌC TẬP ───────────────────────────────
            if (studentId) {
                const student = await Student.findByPk(studentId);
                const studentName = student ? student.fullName : "Bé";
                const vocabSummary = storyResult.vocabulary.slice(0, 4)
                    .map(v => `${v.emoji} ${v.vi} = ${v.en}`)
                    .join(' | ');

                await Journal.create({
                    student_id: parseInt(studentId, 10),
                    teacher_id: userId,
                    content: `🎨 [Cỗ Máy Ma Thuật 4.0 - Tác Nhân AI]\n${studentName} vẽ về: ${visionResult.category}.\n📖 Truyện: "${storyResult.titleVi}"\n🔤 Từ vựng học được: ${vocabSummary}\n💡 Bài học: ${storyResult.moral}`,
                    images: [`/${originalImagePath}`, artResult.publicPath],
                    mood: 'hào hứng' as const,
                    date: new Date(),
                    tenant_id: 'default'
                });
            }

        } catch (pipelineError: any) {
            console.error(`❌ [Orchestrator] Pipeline thất bại cho Story #${storyId}:`, pipelineError.message);
            await MagicStory.update({
                pipelineStep: 'failed',
                errorMessage: pipelineError.message,
            }, { where: { id: storyId } });
        }
    })();

    return storyId;
};
