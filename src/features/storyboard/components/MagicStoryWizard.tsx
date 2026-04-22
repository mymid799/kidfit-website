/**
 * MagicStoryWizard — The main interactive "Director" experience.
 * 
 * Key design decisions:
 *   - Challenge/Empathy choices are overlaid ON TOP of the scene image (video-game style)
 *   - Drawing challenges use the StoryboardUpload component (camera + file upload)
 *   - Final scene includes full-view image with download + educational nhận xét
 *   - Matches existing KidFit Pro aesthetic (emerald/slate, rounded-3xl, Material icons)
 */

import * as React from 'react';
import { useRef, useState, useCallback, useEffect, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useMagicStory } from '../hooks/useMagicStory';
import { StoryChoiceCards } from './StoryChoiceCards';
import { StorySceneDisplay } from './StorySceneDisplay';
import { StoryboardUpload } from './StoryboardUpload';

// Pillar color theming
const PILLAR_COLORS: Record<string, { bg: string; border: string; text: string; label: string }> = {
    stem: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', label: '🔬 STEM' },
    eq: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700', label: '💖 EQ' },
    arts: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', label: '🎨 Nghệ thuật' },
    vocabulary: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', label: '📚 Từ vựng' },
};

/** Drawing capture overlay with preview/confirm step */
const CompactDrawOverlay = ({ onSelect, instruction, instructionEn }: { onSelect: (file: File) => void, instruction?: string, instructionEn?: string }) => {
    const fileRef  = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [isCameraActive, setIsCameraActive] = useState(false);
    const [stream, setStream]         = useState<MediaStream | null>(null);
    const [pendingFile, setPendingFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl]   = useState<string | null>(null);

    const startCamera = async () => {
        try {
            const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            setStream(s);
            setIsCameraActive(true);
        } catch {
            alert('Không thể mở máy ảnh. Vui lòng tải ảnh lên từ thiết bị thay thế.');
        }
    };

    useEffect(() => {
        if (isCameraActive && stream && videoRef.current) videoRef.current.srcObject = stream;
    }, [isCameraActive, stream]);

    const stopCamera = useCallback(() => {
        stream?.getTracks().forEach(t => t.stop());
        setStream(null);
        setIsCameraActive(false);
    }, [stream]);

    useEffect(() => () => { stream?.getTracks().forEach(t => t.stop()); }, [stream]);

    // Stage the file for preview instead of immediately submitting
    const stageFile = (file: File) => {
        stopCamera();
        setPendingFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const confirmDrawing = () => {
        if (pendingFile) onSelect(pendingFile);
    };

    const retryDrawing = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPendingFile(null);
        setPreviewUrl(null);
    };

    const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const v = videoRef.current, c = canvasRef.current;
        c.width = v.videoWidth; c.height = v.videoHeight;
        c.getContext('2d')?.drawImage(v, 0, 0, c.width, c.height);
        c.toBlob(blob => {
            if (blob) stageFile(new File([blob], `drawing-${Date.now()}.jpg`, { type: 'image/jpeg' }));
        }, 'image/jpeg', 0.9);
    };

    // ── Preview / Confirm step ─────────────────────────────────────────────────
    if (pendingFile && previewUrl) {
        return (
            <div className="flex flex-col items-center gap-4 mt-6 bg-slate-800 p-6 rounded-3xl border border-indigo-500 shadow-[0_0_24px_rgba(99,102,241,0.3)]">
                <p className="text-white font-black text-sm text-center">
                    📸 Bức vẽ của bé trông thế này nhé!
                </p>
                <div className="w-full max-w-xs rounded-2xl overflow-hidden border-2 border-indigo-400 shadow-lg">
                    <img src={previewUrl} alt="Bức vẽ của bé" className="w-full h-auto object-contain max-h-52" />
                </div>
                <p className="text-slate-400 text-xs text-center italic">
                    Bé có hài lòng không? Hoặc muốn thử lại?
                </p>
                <div className="flex gap-3 w-full">
                    <button onClick={retryDrawing}
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-2xl font-black text-sm border border-slate-500 transition-all active:scale-95">
                        <span className="material-symbols-outlined text-[18px]">refresh</span>
                        Thử lại!
                    </button>
                    <button onClick={confirmDrawing}
                        className="flex-[2] flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white py-3 rounded-2xl font-black text-sm shadow-lg shadow-indigo-500/30 border border-indigo-400 transition-all active:scale-95">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        Dùng ảnh này! ✨
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-5 mt-6 bg-slate-800 p-6 rounded-3xl border border-slate-700 relative overflow-hidden transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-6xl text-white">draw</span>
            </div>

            {!isCameraActive ? (
                <>
                    <div className="relative z-10 text-center space-y-2">
                        <p className="text-white font-black text-sm drop-shadow-md">
                            ✏️ {instruction || 'Bé vẽ thứ gì đó nhé!'}
                        </p>
                        <p className="text-slate-400 text-[11px] font-bold italic">{instructionEn}</p>
                    </div>
                    <input type="file" accept="image/*" className="hidden" ref={fileRef}
                        onChange={e => { if (e.target.files?.[0]) stageFile(e.target.files[0]); }} />
                    <div className="flex flex-col sm:flex-row justify-center gap-3 w-full relative z-10">
                        <button onClick={startCamera} className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white w-full sm:w-48 py-3 rounded-2xl font-black text-sm tracking-wide shadow-lg hover:shadow-indigo-500/50 transition-all active:scale-95 border border-indigo-400 focus:outline-none">
                            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                            Bật máy ảnh!
                        </button>
                        <button onClick={() => fileRef.current?.click()} className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white w-full sm:w-48 py-3 rounded-2xl font-black text-sm tracking-wide shadow-lg border border-slate-500 transition-all active:scale-95 focus:outline-none">
                            <span className="material-symbols-outlined text-[18px]">image</span>
                            Chọn từ thư viện
                        </button>
                    </div>
                </>
            ) : (
                <div className="w-full flex flex-col items-center gap-4 relative z-10 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-full max-w-sm relative aspect-[4/3] bg-black rounded-2xl overflow-hidden border-2 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
                        <canvas ref={canvasRef} className="hidden" />
                    </div>
                    <div className="flex gap-3 w-full max-w-sm justify-center mx-auto">
                        <button onClick={stopCamera} className="shrink-0 flex items-center justify-center size-14 rounded-full bg-slate-700 hover:bg-slate-600 text-white font-black shadow-lg transition-all active:scale-95 border border-slate-500" title="Hủy">
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>
                        <button onClick={capturePhoto} className="flex-1 flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-full font-black text-sm tracking-wide shadow-[0_4px_15px_rgba(99,102,241,0.5)] transition-all active:scale-95 border border-indigo-400">
                            <div className="size-6 rounded-full border-2 border-white flex items-center justify-center">
                                <div className="size-4 rounded-full bg-white opacity-80" />
                            </div>
                            Chụp ảnh!
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const MagicStoryWizard = () => {
    const story = useMagicStory();
    const navigate = useNavigate();
    const [fullViewImage, setFullViewImage]   = useState<string | null>(null);
    const [isFullscreen, setIsFullscreen]     = useState(false);
    const [showHistory, setShowHistory]       = useState(false);
    const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);
    const [pillarFilter, setPillarFilter]     = useState<string>('');  // '' = random
    const wizardRef = useRef<HTMLDivElement>(null);

    const toggleFullscreen = () => setIsFullscreen(f => !f);

    // Lock body scroll when fullscreen is active
    useEffect(() => {
        document.body.style.overflow = isFullscreen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isFullscreen]);

    // Auto-exit fullscreen when interactive choice phases trigger
    // Also silence music when hitting complete phase
    useEffect(() => {
        if (story.phase === 'challenge' || story.phase === 'empathy') {
            setIsFullscreen(false);
            story.stopSpeaking();
        }
        if (story.phase === 'complete') {
            story.stopMusic();
            story.stopSpeaking();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [story.phase]);

    // Demo mode handlers
    const isDemoMode = story.seed === 123456;

    const handleSubmitChallenge = useCallback((choiceId?: string, file?: File) => {
        if (isDemoMode) {
            story.demoSubmitChallenge(choiceId, file);
        } else {
            story.submitChallenge(choiceId, file);
        }
    }, [isDemoMode, story]);

    const handleSubmitEmpathy = useCallback((choiceId: string) => {
        if (isDemoMode) {
            story.demoSubmitEmpathy(choiceId);
        } else {
            story.submitEmpathy(choiceId);
        }
    }, [isDemoMode, story]);

    /** Download an image */
    const downloadImage = useCallback((url: string, filename: string) => {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
    }, []);

    const pillarTheme = PILLAR_COLORS[story.pillar || 'eq'] || PILLAR_COLORS.eq;

    const NavBtn = ({ onClick, icon, label, active, title: t, className: cx }: { onClick: () => void, icon: string, label?: string, active?: boolean, title?: string, className?: string }) => (
        <button onClick={onClick} title={t}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all active:scale-95 
                ${active ? 'bg-primary/15 text-primary' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'} ${cx || ''}`}>
            <span className="material-symbols-outlined text-[16px]">{icon}</span>
            {label && <span className="hidden sm:inline">{label}</span>}
        </button>
    );

    // Non-fullscreen extra controls: fullscreen enter button alongside eye icon
    const NormalExtraControls = (
        <button onClick={toggleFullscreen} title="Toàn màn hình"
            className="p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white/80 hover:text-white transition-all border border-white/10">
            <span className="material-symbols-outlined text-lg block">fullscreen</span>
        </button>
    );

    // Fullscreen extra controls: exit-fullscreen button alongside eye icon
    const FullscreenExtraControls = (
        <button onClick={toggleFullscreen} title="Thu nhỏ"
            className="p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white/80 hover:text-white transition-all border border-white/10">
            <span className="material-symbols-outlined text-lg block">fullscreen_exit</span>
        </button>
    );


    // Determine if portal should be rendered
    const shouldRenderPortal = isFullscreen &&
        story.currentScene &&
        !['idle', 'complete', 'uploading', 'processing2', 'processing3', 'challenge', 'empathy'].includes(story.phase);

    const portalContent = shouldRenderPortal ? createPortal(
        <div className="fixed inset-0 z-[9999] bg-slate-900 flex flex-col">
            {/* Floating controls top-left */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                <button onClick={story.toggleAudio} title={story.audioEnabled ? 'Tắt đọc' : 'Bật đọc'}
                    className={`px-3 py-2 rounded-xl backdrop-blur-md transition-all border flex items-center justify-center gap-2 text-[12px] font-bold shadow-lg ${story.audioEnabled ? 'bg-white/20 border-white/30 text-white hover:bg-white/30' : 'bg-black/40 border-white/10 text-white/50 hover:bg-black/50'}`}>
                    <span className="material-symbols-outlined text-[18px]">{story.audioEnabled ? 'volume_up' : 'volume_off'}</span>
                    <span>{story.audioEnabled ? 'Đọc: Bật' : 'Đọc: Tắt'}</span>
                </button>
                <button onClick={story.toggleMusic} title={story.isMusicPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
                    className={`px-3 py-2 rounded-xl backdrop-blur-md transition-all border flex items-center justify-center gap-2 text-[12px] font-bold shadow-lg ${story.isMusicPlaying ? 'bg-white/20 border-white/30 text-white hover:bg-white/30' : 'bg-black/40 border-white/10 text-white/50 hover:bg-black/50'}`}>
                    <span className="material-symbols-outlined text-[18px]">{story.isMusicPlaying ? 'music_note' : 'music_off'}</span>
                    <span>{story.isMusicPlaying ? 'Nhạc: Bật' : 'Nhạc: Tắt'}</span>
                </button>
                <button onClick={() => story.setNarratorLang(story.narratorLang === 'vi' ? 'en' : 'vi')}
                    title="Đổi ngôn ngữ"
                    className="px-3 py-2 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 text-white/90 transition-all flex items-center justify-center gap-2 text-[12px] font-bold shadow-lg">
                    <span className="material-symbols-outlined text-[18px]">translate</span>
                    <span>{story.narratorLang === 'vi' ? '🇻🇳 TViệt' : '🇬🇧 T.Anh'}</span>
                </button>
            </div>

            {!story.hasVietnameseVoice && story.narratorLang === 'vi' && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/90 text-white rounded-full text-[10px] font-bold shadow-lg backdrop-blur-md border border-rose-400">
                    <span className="material-symbols-outlined text-[14px]">warning</span>
                    Trình duyệt chưa hỗ trợ giọng TV.
                </div>
            )}

            {/* Scene fills entire portal */}
            <div className="flex-1 min-h-0">
                <StorySceneDisplay
                    scene={story.currentScene}
                    sceneNumber={story.phase === 'scene1' ? 1 : story.phase === 'scene2' ? 2 : 3}
                    totalScenes={3}
                    fallbackImage={story.drawingPreview || undefined}
                    narratorLang={story.narratorLang}
                    isSpeaking={story.isSpeaking}
                    onSpeak={story.speakText}
                    onContinue={
                        story.phase === 'scene1' ? story.advanceToChallenge :
                            story.phase === 'scene2' ? story.advanceToEmpathy :
                                story.phase === 'scene3' ? story.advanceToComplete :
                                    undefined
                    }
                    continueLabel={
                        story.phase === 'scene1' ? 'Khám Phá Tiếp! 🌟' :
                            story.phase === 'scene2' ? `Gặp ${story.currentGuardian?.name || 'bạn mới'}! ${story.currentGuardian?.icon || '🌟'}` :
                                'Xem Kết Quả! 🎉'
                    }
                    extraControls={
                        <button onClick={toggleFullscreen} title="Thu nhỏ"
                            className="p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white/80 hover:text-white transition-all border border-white/10">
                            <span className="material-symbols-outlined text-lg block">fullscreen_exit</span>
                        </button>
                    }
                    isFullscreen={true}
                />
            </div>
        </div>,
        document.body
    ) : null;

    // The main wrapper is always normal flow
    return (
        <Fragment>
            <div ref={wizardRef} className="relative mx-auto max-w-5xl space-y-4">


                {/* ─── Story History Modal ────────────────────────────────────── */}
                <AnimatePresence>
                    {showHistory && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                            onClick={() => setShowHistory(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.95, y: 20 }}
                                className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden"
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-indigo-50">
                                    <h3 className="text-xl font-black text-indigo-900 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-indigo-500">menu_book</span>
                                        Hành Trình Của Bé
                                    </h3>
                                    <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-indigo-200 rounded-full text-indigo-500 transition-colors">
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                                <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-100/50">
                                    {story.scenes.length === 0 ? (
                                        <p className="text-center text-slate-400 italic">Câu chuyện chưa bắt đầu...</p>
                                    ) : (
                                        story.scenes.map((s, i) => (
                                            <div key={i} className="space-y-2">
                                                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row gap-4 group hover:shadow-md transition-shadow">
                                                    {s.imageUrl && (
                                                        <div className="w-full md:w-1/3 aspect-video shrink-0 relative">
                                                            <img src={s.imageUrl} alt={`Cảnh ${i + 1}`} className="w-full h-full object-cover" />
                                                            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-black border border-white/20">
                                                                Cảnh {i + 1}
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="p-5 flex-1 flex flex-col justify-center space-y-3">
                                                        <p className="font-bold text-slate-800 leading-relaxed text-sm md:text-base">{s.narration}</p>
                                                        <div className="w-8 h-0.5 bg-slate-100 rounded-full" />
                                                        <p className="text-slate-400 text-xs italic leading-relaxed">{s.narration_en}</p>
                                                    </div>
                                                </div>
                                                {i === 0 && story.selectedChallengeChoice && (
                                                    <div className="mt-2 ml-4 relative">
                                                        <div className="absolute left-[-16px] top-1/2 w-4 border-t-2 border-dashed border-amber-300" />
                                                        <div className="bg-gradient-to-r from-amber-50 to-white shadow-sm border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3">
                                                            <span className="material-symbols-outlined text-amber-500 bg-amber-100 p-1.5 rounded-lg text-sm">explore</span>
                                                            <div>
                                                                <span className="text-[10px] font-black tracking-wider text-amber-500 uppercase block mb-0.5">Bé đã chọn</span>
                                                                <span className="text-sm font-bold text-slate-800">{story.selectedChallengeChoice.label}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {i === 1 && story.selectedEmpathyChoice && (
                                                    <div className="mt-2 ml-4 relative">
                                                        <div className="absolute left-[-16px] top-1/2 w-4 border-t-2 border-dashed border-pink-300" />
                                                        <div className="bg-gradient-to-r from-pink-50 to-white shadow-sm border border-pink-200 rounded-xl px-4 py-3 flex items-start gap-3">
                                                            <span className="material-symbols-outlined text-pink-500 bg-pink-100 p-1.5 rounded-lg text-sm">favorite</span>
                                                            <div>
                                                                <span className="text-[10px] font-black tracking-wider text-pink-500 uppercase block mb-0.5">Bé đã chọn</span>
                                                                <span className="text-sm font-bold text-slate-800">{story.selectedEmpathyChoice.label}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ─── Full-View Image Modal ──────────────────────────────────── */}
                <AnimatePresence>
                    {fullViewImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-pointer"
                            onClick={() => setFullViewImage(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.9 }}
                                className="relative flex items-center justify-center w-full max-w-4xl max-h-[85vh] outline-none"
                                onClick={e => e.stopPropagation()}
                            >
                                <img src={fullViewImage} alt="Story scene" className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl" />
                            </motion.div>

                            {/* Top-Right Screen Controls */}
                            <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-3" onClick={e => e.stopPropagation()}>
                                <button
                                    onClick={() => downloadImage(fullViewImage, `kidfit-story-${Date.now()}.png`)}
                                    className="flex items-center justify-center size-11 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all active:scale-95 backdrop-blur-md border border-white/20 shadow-lg"
                                    title="Tải ảnh"
                                >
                                    <span className="material-symbols-outlined text-[20px]">download</span>
                                </button>
                                <button
                                    onClick={() => setFullViewImage(null)}
                                    className="flex items-center justify-center size-11 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all active:scale-95 backdrop-blur-md border border-white/20 shadow-lg"
                                    title="Đóng"
                                >
                                    <span className="material-symbols-outlined text-[20px]">close</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ─── Header ────────────────────────────────────────────────────── */}
                {(!isFullscreen || story.phase === 'idle' || story.phase === 'complete') && (
                    <header className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 py-4">
                        <div className="flex items-start gap-4 text-center md:text-left">
                            {/* Back button: hidden on idle (use browser back or nav), shown during active story */}
                            {story.phase !== 'idle' && story.phase !== 'complete' && (
                                <button
                                    onClick={() => setIsQuitModalOpen(true)}
                                    className="flex-shrink-0 flex items-center justify-center size-10 md:size-12 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-500 transition-all active:scale-95 shadow-sm border border-slate-200 mt-1 md:mt-0"
                                    title="Thoát khỏi câu chuyện"
                                >
                                    <span className="material-symbols-outlined text-xl md:text-2xl">arrow_back</span>
                                </button>
                            )}
                            <div className="space-y-1">
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 justify-center md:justify-start">
                                    <span className="material-symbols-outlined text-primary text-3xl md:text-4xl">auto_fix_high</span>
                                    {story.title || 'Cỗ Máy Kể Chuyện AI'}
                                </h2>
                                {story.phase === 'idle' && (
                                    <p className="text-slate-500 font-medium max-w-lg italic text-sm text-center md:text-left">
                                        "Bé là đạo diễn — AI sẽ biến nét vẽ của bé thành câu chuyện kỳ diệu!"
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Context badges */}
                        {story.currentBiome && (
                            <div className="flex items-center gap-2 flex-wrap justify-center">
                                <span className={`${pillarTheme.bg} ${pillarTheme.border} ${pillarTheme.text} border text-xs font-bold px-3 py-1.5 rounded-full`}>
                                    {pillarTheme.label}
                                </span>
                                <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full">
                                    {story.currentBiome.icon} {story.currentBiome.name}
                                </span>
                                {story.characterName && (
                                    <span className="bg-primary/10 border border-primary/20 text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                                        🎨 {story.characterName}
                                    </span>
                                )}
                            </div>
                        )}
                    </header>
                )}

                {/* ─── Progress indicator (hidden in fullscreen) ──────────────── */}
                {story.phase !== 'idle' && story.phase !== 'complete' && !isFullscreen && (
                    <div className="flex items-center gap-2">
                        {['scene1', 'challenge', 'scene2', 'empathy', 'scene3'].map((step, i) => {
                            const phases = ['scene1', 'challenge', 'scene2', 'empathy', 'scene3'];
                            const currentIdx = phases.indexOf(
                                story.phase === 'uploading' ? 'scene1' :
                                    story.phase === 'processing2' ? 'scene2' :
                                        story.phase === 'processing3' ? 'scene3' :
                                            story.phase
                            );
                            const isActive = i === currentIdx;
                            const isDone = i < currentIdx;
                            const labels = ['Khám phá', 'Thử thách', 'Kết quả', 'Cùng bạn', 'Kết thúc'];
                            const icons = ['explore', 'help', 'bolt', 'favorite', 'celebration'];

                            return (
                                <Fragment key={step}>
                                    <div className={`flex items-center gap-1.5 transition-all ${isActive ? 'text-primary scale-105' : isDone ? 'text-primary/50' : 'text-slate-300'
                                        }`}>
                                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${isActive ? 'bg-primary text-white ring-4 ring-primary/20' :
                                            isDone ? 'bg-primary/20 text-primary' : 'bg-slate-100 text-slate-400'
                                            }`}>
                                            {isDone ? (
                                                <span className="material-symbols-outlined text-sm">check</span>
                                            ) : (
                                                <span className="material-symbols-outlined text-sm">{icons[i]}</span>
                                            )}
                                        </span>
                                        <span className="text-[11px] font-bold hidden md:inline">{labels[i]}</span>
                                    </div>
                                    {i < 4 && (
                                        <div className={`h-1 w-4 md:w-8 rounded-full ${isDone ? 'bg-primary/30' : 'bg-slate-100'}`} />
                                    )}
                                </Fragment>
                            );
                        })}
                    </div>
                )}

                {/* ─── Phase: IDLE (Upload) ──────────────────────────────────────── */}
                <AnimatePresence mode="wait">
                    {story.phase === 'idle' && (
                        <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            {/* Pillar selector for parent/teacher */}
                            <div className="mb-5 bg-slate-50 border border-slate-200 rounded-2xl p-4">
                                <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">🎯 Phụ huynh / Giáo viên — Chọn trụ cột học tập:</p>
                                <div className="flex flex-wrap gap-2">
                                    {[['', '🎲 Ngẫu nhiên'], ['stem', '🔬 STEM'], ['eq', '💖 EQ'], ['arts', '🎨 Nghệ thuật'], ['vocabulary', '📚 Từ vựng']].map(([val, lbl]) => (
                                        <button key={val} onClick={() => setPillarFilter(val)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-black border transition-all active:scale-95 ${
                                                pillarFilter === val
                                                    ? 'bg-primary text-white border-primary shadow-md shadow-primary/30'
                                                    : 'bg-white text-slate-600 border-slate-200 hover:border-primary/40 hover:text-primary'
                                            }`}>
                                            {lbl}
                                        </button>
                                    ))}
                                </div>
                                {pillarFilter && (
                                    <p className="text-[11px] text-slate-400 italic mt-2">
                                        Câu chuyện sẽ tập trung vào trụ cột {PILLAR_COLORS[pillarFilter]?.label}.
                                    </p>
                                )}
                            </div>

                            <StoryboardUpload onProcess={story.startStory} isProcessing={false} />
                            {story.error && <p className="text-red-500 text-sm font-bold mt-4 text-center">❌ {story.error}</p>}
                            <div className="text-center mt-4">
                                <button onClick={() => story.loadDemo(pillarFilter as any || undefined)}
                                    className="text-sm font-bold text-slate-400 hover:text-primary transition-colors flex items-center gap-1.5 mx-auto">
                                    <span className="material-symbols-outlined text-base">play_circle</span>
                                    Xem Demo (không cần API)
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* ─── Phase: UPLOADING ───────────────────────────────────────── */}
                    {story.phase === 'uploading' && (
                        <motion.div key="uploading" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                            className="bg-white rounded-3xl p-12 shadow-xl border border-slate-100 flex flex-col items-center gap-6 text-center">
                            <div className="relative">
                                <div className="size-24 rounded-full border-8 border-primary/20 border-t-primary animate-spin"></div>
                                <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-primary animate-pulse">auto_fix_high</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900">AI đang đọc bức vẽ của bé...</h3>
                                <p className="text-slate-500 font-medium text-sm mt-1">Đang tạo thế giới kỳ diệu từ nét vẽ ✨</p>
                            </div>
                        </motion.div>
                    )}

                    {/* ─── Phase: SCENE 1 (Arrival) ──────────────────────────────── */}
                    {story.phase === 'scene1' && story.currentScene && (
                        <motion.div key="scene1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                            className={isFullscreen ? 'invisible pointer-events-none' : ''}>
                            <StorySceneDisplay
                                scene={story.currentScene}
                                sceneNumber={1}
                                totalScenes={3}
                                fallbackImage={story.drawingPreview || undefined}
                                narratorLang={story.narratorLang}
                                isSpeaking={story.isSpeaking}
                                onSpeak={isFullscreen ? undefined : story.speakText}
                                onContinue={story.advanceToChallenge}
                                continueLabel="Khám Phá Tiếp! 🌟"
                                extraControls={NormalExtraControls}
                                isFullscreen={false}
                            />
                        </motion.div>
                    )}

                    {/* ─── Phase: CHALLENGE (Video-Game Overlay on Scene Image) ─── */}
                    {story.phase === 'challenge' && (
                        <motion.div key="challenge" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                            className="space-y-6">
                            {/* Scene image stays visible with overlay */}
                            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-900">
                                {/* Background image — compact thumbnail */}
                                {story.scenes[0]?.imageUrl && (
                                    <div className="relative h-40 md:h-52 overflow-hidden">
                                        <img
                                            src={story.scenes[0].imageUrl}
                                            alt="Story scene"
                                            className="w-full h-full object-cover brightness-50"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
                                    </div>
                                )}
                                {/* Challenge content below image */}
                                <div className="bg-slate-900 p-6 md:p-8">
                                    <div className="space-y-5 max-w-3xl mx-auto w-full text-center">
                                        <div className="inline-flex items-center gap-2 bg-amber-400 text-black px-4 py-1.5 rounded-full text-xs font-black mx-auto">
                                            <span className="material-symbols-outlined text-sm">help</span>
                                            Thử thách — Bé quyết định!
                                        </div>

                                        <h3 className="text-lg md:text-2xl font-black text-white leading-relaxed drop-shadow-lg">
                                            {story.challengePrompt}
                                        </h3>
                                        <p className="text-white/50 text-sm font-medium italic">
                                            {story.challengePrompt_en}
                                        </p>

                                        {/* Choice interaction — overlay */}
                                        {story.interactionType === 'choice' && story.choices.length > 0 && (
                                            <StoryChoiceCards
                                                options={story.choices}
                                                onSelect={(id) => handleSubmitChallenge(id)}
                                            />
                                        )}

                                        {/* Draw interaction overlay directly inside the space */}
                                        {story.interactionType === 'draw' && (
                                            <CompactDrawOverlay
                                                onSelect={(file) => handleSubmitChallenge(undefined, file)}
                                                instruction={story.drawInstruction}
                                                instructionEn={story.drawInstruction_en}
                                            />
                                        )}

                                        {/* Go back */}
                                        <button onClick={story.goBack}
                                            className="mt-6 flex items-center gap-1 mx-auto px-4 py-1.5 rounded-full text-white/60 hover:text-white text-xs font-bold transition-all">
                                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                                            Xem lại cảnh trước
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {story.error && <p className="text-red-500 text-sm font-bold text-center">❌ {story.error}</p>}
                        </motion.div>
                    )}

                    {/* ─── Phase: PROCESSING 2 ───────────────────────────────────── */}
                    {story.phase === 'processing2' && (
                        <motion.div key="processing2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="bg-white rounded-3xl p-12 shadow-xl border border-slate-100 flex flex-col items-center gap-6 text-center">
                            <div className="relative">
                                <div className="size-24 rounded-full border-8 border-secondary/20 border-t-secondary animate-spin"></div>
                                <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-secondary animate-pulse">bolt</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900">AI đang xử lý lựa chọn của bé...</h3>
                                <p className="text-slate-500 font-medium text-sm mt-1">Câu chuyện đang rẽ nhánh theo hướng của bé ✨</p>
                            </div>
                        </motion.div>
                    )}

                    {/* ─── Phase: SCENE 2 (Consequence + NPC) ────────────────────── */}
                    {story.phase === 'scene2' && story.scenes[1] && (
                        <motion.div key="scene2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                            className={isFullscreen ? 'invisible pointer-events-none' : ''}>
                            <StorySceneDisplay
                                scene={story.scenes[1]}
                                sceneNumber={2}
                                totalScenes={3}
                                fallbackImage={story.drawingPreview || undefined}
                                narratorLang={story.narratorLang}
                                isSpeaking={story.isSpeaking}
                                onSpeak={isFullscreen ? undefined : story.speakText}
                                onContinue={story.advanceToEmpathy}
                                continueLabel={`Gặp ${story.currentGuardian?.name || 'bạn mới'}! ${story.currentGuardian?.icon || '🌟'}`}
                                extraControls={NormalExtraControls}
                                isFullscreen={false}
                            />
                        </motion.div>
                    )}

                    {/* ─── Phase: EMPATHY (Video-Game Overlay on Scene 2 Image) ── */}
                    {story.phase === 'empathy' && (
                        <motion.div key="empathy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-900">
                                {/* Background image — compact thumbnail */}
                                {story.scenes[1]?.imageUrl && (
                                    <div className="relative h-40 md:h-52 overflow-hidden">
                                        <img
                                            src={story.scenes[1].imageUrl}
                                            alt="Story scene"
                                            className="w-full h-full object-cover brightness-50"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
                                    </div>
                                )}
                                {/* Empathy content below image */}
                                <div className="bg-slate-900 p-6 md:p-8">
                                    <div className="space-y-6 max-w-3xl mx-auto w-full text-center">
                                        <div className="inline-flex items-center gap-2 bg-pink-500 text-white px-4 py-1.5 rounded-full text-xs font-black mx-auto">
                                            <span className="material-symbols-outlined text-sm">favorite</span>
                                            Bài học yêu thương
                                        </div>

                                        {/* Guardian intro */}
                                        {story.currentGuardian && (
                                            <div className="flex items-center justify-center gap-3">
                                                <span className="text-4xl drop-shadow-lg">{story.currentGuardian.icon}</span>
                                                <span className="text-lg font-black text-white drop-shadow-lg">{story.currentGuardian.name}</span>
                                            </div>
                                        )}

                                        <h3 className="text-lg md:text-2xl font-black text-white leading-relaxed drop-shadow-lg">
                                            {story.empathyPrompt}
                                        </h3>
                                        <p className="text-white/50 text-sm font-medium italic">
                                            {story.empathyPrompt_en}
                                        </p>

                                        <StoryChoiceCards
                                            options={story.empathyChoices}
                                            onSelect={handleSubmitEmpathy}
                                        />

                                        {/* Go back */}
                                        <button onClick={story.goBack}
                                            className="mt-2 flex items-center gap-1 mx-auto px-4 py-1.5 rounded-full text-white/60 hover:text-white text-xs font-bold transition-all">
                                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                                            Xem lại cảnh trước
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {story.error && <p className="text-red-500 text-sm font-bold text-center mt-4">❌ {story.error}</p>}
                        </motion.div>
                    )}

                    {/* ─── Phase: PROCESSING 3 ───────────────────────────────────── */}
                    {story.phase === 'processing3' && (
                        <motion.div key="processing3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="bg-white rounded-3xl p-12 shadow-xl border border-slate-100 flex flex-col items-center gap-6 text-center">
                            <div className="relative">
                                <div className="size-24 rounded-full border-8 border-amber-200 border-t-amber-500 animate-spin"></div>
                                <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-amber-500 animate-pulse">celebration</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900">Đang tạo kết thúc vui vẻ...</h3>
                                <p className="text-slate-500 font-medium text-sm mt-1">Phần thưởng đang chờ bé! 🎁</p>
                            </div>
                        </motion.div>
                    )}

                    {/* ─── Phase: SCENE 3 (Resolution) ───────────────────────────── */}
                    {story.phase === 'scene3' && story.scenes[2] && (
                        <motion.div key="scene3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                            className={isFullscreen ? 'invisible pointer-events-none' : ''}>
                            <StorySceneDisplay
                                scene={story.scenes[2]}
                                sceneNumber={3}
                                totalScenes={3}
                                fallbackImage={story.drawingPreview || undefined}
                                narratorLang={story.narratorLang}
                                isSpeaking={story.isSpeaking}
                                onSpeak={isFullscreen ? undefined : story.speakText}
                                onContinue={story.advanceToComplete}
                                continueLabel="Xem Phần Thưởng! 🏆"
                                extraControls={NormalExtraControls}
                                isFullscreen={false}
                            />
                        </motion.div>
                    )}

                    {/* ─── Phase: COMPLETE (History Timeline + Reward) ────────────── */}
                    {story.phase === 'complete' && (
                        <motion.div key="complete" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                            className="space-y-6">

                            {/* ─── Timeline Header & Sticker ─── */}
                            <div className="bg-gradient-to-br from-amber-50 via-white to-pink-50 rounded-3xl p-8 md:p-12 shadow-xl border border-amber-200 text-center space-y-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
                                >
                                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 mx-auto flex items-center justify-center shadow-2xl shadow-amber-300/50">
                                        <span className="text-5xl">🏆</span>
                                    </div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                                    <h3 className="text-2xl font-black text-slate-900">Tuyệt vời! Bé giỏi lắm! 🎉</h3>
                                    <p className="text-slate-600 font-medium mt-2">
                                        Bé đã hoàn thành câu chuyện <span className="font-black text-primary">"{story.title}"</span>
                                    </p>
                                </motion.div>

                                {/* Sticker */}
                                {story.earnedSticker && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.9, type: 'spring' }}
                                        className="inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-4 shadow-lg border border-amber-200"
                                    >
                                        <span className="text-3xl">⭐</span>
                                        <div className="text-left">
                                            <p className="font-black text-slate-800">{story.earnedSticker}</p>
                                            {story.earnedSticker_en && (
                                                <p className="text-xs text-slate-400 font-medium">{story.earnedSticker_en}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* ─── Embedded Story Timeline (Replaces Scene Gallery) ─── */}
                            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                                <div className="bg-emerald-600 p-6 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-emerald-200 text-3xl">history_edu</span>
                                    <h3 className="text-xl font-black text-white">Hành trình của bé</h3>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 relative">
                                    {/* Vertical connecting line */}
                                    <div className="absolute top-8 bottom-8 left-[39px] md:left-[51px] w-1 bg-slate-100 rounded-full z-0" />

                                    {/* Act 1 */}
                                    {story.scenes[0] && (
                                        <div className="relative z-10 flex gap-4 md:gap-6">
                                            <div className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 bg-white rounded-full border-4 border-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs shadow-sm">1</div>
                                            <div className="flex-1 space-y-3">
                                                <div className="relative h-32 md:h-48 rounded-xl overflow-hidden border border-slate-200 shadow-inner group">
                                                    <img src={story.scenes[0].imageUrl} alt="Scene 1" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                                        <button onClick={() => setFullViewImage(story.scenes[0].imageUrl!)} className="bg-white font-bold text-slate-800 px-3 py-1.5 rounded-full text-[11px] flex items-center gap-1 hover:scale-105 transition-all shadow-md">
                                                            <span className="material-symbols-outlined text-[14px]">fullscreen</span> Xem đầy đủ
                                                        </button>
                                                        <a href={story.scenes[0].imageUrl} download="canh-1.png" className="bg-primary font-bold text-white px-3 py-1.5 rounded-full text-[11px] flex items-center gap-1 hover:scale-105 transition-all shadow-md">
                                                            <span className="material-symbols-outlined text-[14px]">download</span> Tải về
                                                        </a>
                                                    </div>
                                                </div>
                                                <p className="text-sm font-medium text-slate-700 leading-relaxed"><span className="font-bold text-slate-900">Mở đầu:</span> {story.scenes[0].sceneDescription}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Choice 1: Challenge */}
                                    {story.selectedChallengeChoice && (
                                        <div className="relative z-10 flex gap-4 md:gap-6">
                                            <div className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 bg-white rounded-full border-4 border-indigo-100 flex items-center justify-center text-indigo-500 shadow-sm">
                                                <span className="material-symbols-outlined text-sm md:text-base">explore</span>
                                            </div>
                                            <div className="flex-1 bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="bg-indigo-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">Lựa chọn 1</span>
                                                </div>
                                                <p className="text-indigo-900 font-black text-sm md:text-base">
                                                    {story.interactionType === 'draw' ? 'Bé đã vẽ' : story.selectedChallengeChoice.label}
                                                </p>

                                                {/* If it was a draw interaction, show the child's actual drawing */}
                                                {story.interactionType === 'draw' && story.drawingPreview && (
                                                    <div className="mt-3 relative h-32 md:h-40 rounded-xl overflow-hidden border-2 border-indigo-200 shadow-inner group cursor-pointer"
                                                        onClick={() => setFullViewImage(story.drawingPreview!)}>
                                                        <img src={story.drawingPreview} alt="Bức vẽ của bé" className="w-full h-full object-contain bg-white" />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <span className="bg-white text-slate-800 font-bold px-3 py-1.5 rounded-full text-[11px] flex items-center gap-1 shadow-md">
                                                                <span className="material-symbols-outlined text-[14px]">fullscreen</span> Xem bức vẽ
                                                            </span>
                                                        </div>
                                                        <div className="absolute top-2 left-2 bg-indigo-500/90 text-white text-[9px] font-black px-2 py-0.5 rounded-full backdrop-blur-sm">✏️ Bức vẽ của bé</div>
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    )}

                                    {/* Act 2 */}
                                    {story.scenes[1] && (
                                        <div className="relative z-10 flex gap-4 md:gap-6">
                                            <div className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 bg-white rounded-full border-4 border-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs shadow-sm">2</div>
                                            <div className="flex-1 space-y-3">
                                                <div className="relative h-32 md:h-48 rounded-xl overflow-hidden border border-slate-200 shadow-inner group">
                                                    <img src={story.scenes[1].imageUrl} alt="Scene 2" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                                        <button onClick={() => setFullViewImage(story.scenes[1].imageUrl!)} className="bg-white font-bold text-slate-800 px-3 py-1.5 rounded-full text-[11px] flex items-center gap-1 hover:scale-105 transition-all shadow-md">
                                                            <span className="material-symbols-outlined text-[14px]">fullscreen</span> Xem đầy đủ
                                                        </button>
                                                        <a href={story.scenes[1].imageUrl} download="canh-2.png" className="bg-primary font-bold text-white px-3 py-1.5 rounded-full text-[11px] flex items-center gap-1 hover:scale-105 transition-all shadow-md">
                                                            <span className="material-symbols-outlined text-[14px]">download</span> Tải về
                                                        </a>
                                                    </div>
                                                </div>
                                                <p className="text-sm font-medium text-slate-700 leading-relaxed"><span className="font-bold text-slate-900">Diễn biến:</span> {story.scenes[1].sceneDescription}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Choice 2: Empathy */}
                                    {story.selectedEmpathyChoice && (
                                        <div className="relative z-10 flex gap-4 md:gap-6">
                                            <div className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 bg-white rounded-full border-4 border-pink-100 flex items-center justify-center text-pink-500 shadow-sm">
                                                <span className="material-symbols-outlined text-sm md:text-base">favorite</span>
                                            </div>
                                            <div className="flex-1 bg-pink-50 rounded-2xl p-5 border border-pink-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="bg-pink-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">Lựa chọn 2</span>
                                                </div>
                                                <p className="text-pink-900 font-black text-sm md:text-base">{story.selectedEmpathyChoice.label}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Act 3 */}
                                    {story.scenes[2] && (
                                        <div className="relative z-10 flex gap-4 md:gap-6">
                                            <div className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 bg-white rounded-full border-4 border-amber-100 flex items-center justify-center text-amber-500 shadow-sm">
                                                <span className="material-symbols-outlined text-sm md:text-base">star</span>
                                            </div>
                                            <div className="flex-1 bg-amber-50/50 rounded-2xl p-4 border border-amber-100 space-y-3">
                                                <div className="relative h-32 md:h-48 rounded-xl overflow-hidden border border-amber-200 shadow-inner group">
                                                    <img src={story.scenes[2].imageUrl} alt="Scene 3" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                                        <button onClick={() => setFullViewImage(story.scenes[2].imageUrl!)} className="bg-white font-bold text-slate-800 px-3 py-1.5 rounded-full text-[11px] flex items-center gap-1 hover:scale-105 transition-all shadow-md">
                                                            <span className="material-symbols-outlined text-[14px]">fullscreen</span> Xem đầy đủ
                                                        </button>
                                                        <a href={story.scenes[2].imageUrl} download="canh-3.png" className="bg-primary font-bold text-white px-3 py-1.5 rounded-full text-[11px] flex items-center gap-1 hover:scale-105 transition-all shadow-md">
                                                            <span className="material-symbols-outlined text-[14px]">download</span> Tải về
                                                        </a>
                                                    </div>
                                                </div>
                                                <p className="text-sm font-medium text-slate-800 leading-relaxed"><span className="font-bold text-slate-900">Kết thúc:</span> {story.scenes[2].sceneDescription}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Lesson Conclusion (Nhận Xét Giáo Dục) */}
                                    {story.lessonConclusion && (
                                        <div className="relative z-10 flex gap-4 md:gap-6 mt-8">
                                            <div className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 bg-white rounded-full border-4 border-sky-100 flex items-center justify-center text-sky-500 shadow-sm">
                                                <span className="material-symbols-outlined text-sm md:text-base">school</span>
                                            </div>
                                            <div className={`flex-1 ${pillarTheme.bg} rounded-2xl p-6 shadow-xl ${pillarTheme.border} border space-y-4`}>
                                                <div className="flex items-center gap-2">
                                                    <h4 className={`font-black ${pillarTheme.text} text-lg`}>Tổng kết bài học</h4>
                                                    <span className={`${pillarTheme.bg} ${pillarTheme.border} ${pillarTheme.text} border text-[10px] font-bold px-2 py-0.5 rounded-full ml-auto`}>
                                                        {pillarTheme.label}
                                                    </span>
                                                </div>
                                                <div className="bg-white/80 rounded-xl p-4">
                                                    <p className="font-bold text-slate-800 text-sm leading-relaxed">
                                                        💬 {story.lessonConclusion.feedback}
                                                    </p>
                                                </div>
                                                <div className="bg-white/60 rounded-xl p-4 border border-dashed border-slate-200">
                                                    <p className="font-black text-slate-900 text-sm flex items-center gap-2">
                                                        <span className="text-lg">🌟</span>
                                                        {story.lessonConclusion.lesson}
                                                    </p>
                                                </div>
                                                <p className="text-slate-400 text-[10px] italic">Dành cho phụ huynh: Nhận xét này được AI tạo dựa trên lựa chọn của bé trong câu chuyện.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button onClick={() => setIsQuitModalOpen(true)}
                                    className="flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white font-black rounded-full shadow-lg shadow-primary/30 hover:bg-primary/90 active:scale-95 transition-all">
                                    <span className="material-symbols-outlined">replay</span>
                                    Chơi lại với bức vẽ mới
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ─── Static Nav Bar Below Scene (Non-fullscreen only) ───────── */}
                {!isFullscreen && story.phase !== 'idle' && story.phase !== 'complete' && (
                    <div className="relative z-10 flex flex-col gap-1">
                        <div className="flex items-center justify-between bg-white rounded-xl border border-slate-200 px-3 py-1.5 shadow-sm">
                            <div className="flex items-center gap-0.5">
                                <NavBtn onClick={story.toggleAudio} icon={story.audioEnabled ? 'volume_up' : 'volume_off'}
                                    label={story.audioEnabled ? 'Đọc' : 'Tắt'} active={story.audioEnabled} title="Bật/tắt đọc thoại"
                                    className={story.audioEnabled ? 'bg-amber-50 text-amber-600 hover:!bg-amber-100' : 'bg-slate-100 text-slate-400'} />
                                <NavBtn onClick={story.toggleMusic} icon={story.isMusicPlaying ? 'music_note' : 'music_off'}
                                    label="Nhạc" active={story.isMusicPlaying} title="Bật/tắt nhạc nền"
                                    className={story.isMusicPlaying ? 'bg-sky-50 text-sky-600 hover:!bg-sky-100' : ''} />
                                <NavBtn onClick={() => story.setNarratorLang(story.narratorLang === 'vi' ? 'en' : 'vi')}
                                    icon="translate"
                                    label={story.narratorLang === 'vi' ? '🇻🇳 Tiếng Việt' : '🇬🇧 English'}
                                    title="Đổi ngôn ngữ đọc"
                                    className="bg-indigo-50 text-indigo-600 hover:!bg-indigo-100" />
                            </div>
                            <div className="flex items-center gap-0.5">
                                <NavBtn onClick={() => setShowHistory(true)} icon="history_edu" label="Lịch sử" title="Xem lại các cảnh"
                                    className="bg-violet-50 text-violet-600 hover:!bg-violet-100" />
                                {/* Restart — always warns */}
                                <NavBtn onClick={() => setIsQuitModalOpen(true)} icon="restart_alt" label="Bắt đầu lại" title="Bắt đầu lại câu chuyện"
                                    className="bg-rose-50 text-rose-500 hover:!bg-rose-100" />
                            </div>
                        </div>
                        {/* TTS warning — always visible below nav, not a tooltip */}
                        {story.narratorLang === 'vi' && !story.hasVietnameseVoice && (
                            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-medium rounded-lg px-3 py-1.5">
                                <span className="material-symbols-outlined text-amber-500 text-sm">warning</span>
                                Giọng Tiếng Việt chưa được cài trên trình duyệt này. Người kể chuyện có thể phát bằng giọng khác hoặc không phát được.
                            </div>
                        )}
                    </div>
                )}

                {/* ─── Fullscreen Controls — Top-left separated buttons ──────── */}
                {isFullscreen && story.phase !== 'idle' && story.phase !== 'complete' && (
                    <div className="fixed top-3 left-3 z-50 flex flex-col gap-1.5">
                        <button onClick={story.toggleAudio} title={story.audioEnabled ? 'Tắt đọc' : 'Bật đọc'}
                            className={`p-2 rounded-lg backdrop-blur-md transition-all border text-[11px] font-bold flex items-center gap-1 ${story.audioEnabled ? 'bg-white/15 border-white/20 text-white/90' : 'bg-black/30 border-white/10 text-white/40'}`}>
                            <span className="material-symbols-outlined text-[16px]">{story.audioEnabled ? 'volume_up' : 'volume_off'}</span>
                        </button>
                        <button onClick={story.toggleMusic} title={story.isMusicPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
                            className={`p-2 rounded-lg backdrop-blur-md transition-all border text-[11px] font-bold flex items-center gap-1 ${story.isMusicPlaying ? 'bg-white/15 border-white/20 text-white/90' : 'bg-black/30 border-white/10 text-white/40'}`}>
                            <span className="material-symbols-outlined text-[16px]">{story.isMusicPlaying ? 'music_note' : 'music_off'}</span>
                        </button>
                        <button onClick={() => story.setNarratorLang(story.narratorLang === 'vi' ? 'en' : 'vi')}
                            className="p-2 rounded-lg bg-black/30 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-all text-[11px] font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">translate</span>
                            <span>{story.narratorLang === 'vi' ? '🇻🇳' : '🇬🇧'}</span>
                        </button>
                        <button onClick={() => setShowHistory(true)}
                            className="p-2 rounded-lg bg-black/30 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-all">
                            <span className="material-symbols-outlined text-[16px]">history_edu</span>
                        </button>
                    </div>
                )}

                {/* ─── Privacy Footer (hidden in fullscreen) ─────────────────── */}
                {!isFullscreen && (
                    <footer className="text-center bg-slate-50/50 p-5 rounded-3xl border border-slate-100 space-y-2">
                        <div className="flex items-center justify-center gap-2 text-primary">
                            <span className="material-symbols-outlined text-lg">verified_user</span>
                            <span className="font-bold text-xs">Bảo mật trí tuệ trẻ thơ</span>
                        </div>
                        <p className="text-slate-400 text-[11px] max-w-xl mx-auto leading-relaxed">
                            AI chỉ phân tích nét vẽ kỹ thuật và sáng tạo để tạo cốt truyện tích cực. Tranh của bé được xóa sau 24h.
                        </p>
                    </footer>
                )}
            </div>

            {/* ─── Fullscreen Portal ─────────────────────────────────────────────
            Rendered at document.body to escape any parent overflow/transform.
            Only active during scene phases. ──────────────────────────────── */}
            {portalContent}
            {/* ─── Quit Confirmation Modal ─────────────────────────────────── */}
            <AnimatePresence>
                {isQuitModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4 cursor-pointer"
                        onClick={() => setIsQuitModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl cursor-default text-center border overflow-hidden relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rose-400 to-rose-500" />
                            <div className="mx-auto size-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-3xl">exit_to_app</span>
                            </div>
                            <h3 className="text-xl font-black text-slate-800 mb-2">Bắt đầu lại?</h3>
                            <p className="text-slate-500 font-medium text-sm mb-6 leading-relaxed">
                                {story.phase === 'complete'
                                    ? 'Bé có muốn chơi một câu chuyện mới không? Câu chuyện hiện tại sẽ bị xóa.'
                                    : 'Câu chuyện đang dang dở! Bé có chắc chắn muốn thoát không? Tiến trình sẽ bị mất đấy.'}
                            </p>

                            <div className="flex gap-3 w-full border-t border-slate-100 pt-6">
                                <button
                                    onClick={() => { story.reset(); setIsQuitModalOpen(false); }}
                                    className="flex-1 px-4 py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 font-black rounded-2xl transition-all active:scale-95"
                                >
                                    {story.phase === 'complete' ? 'Chơi lại!' : 'Thoát'}
                                </button>
                                <button
                                    onClick={() => setIsQuitModalOpen(false)}
                                    className="flex-[2] px-4 py-3 bg-slate-800 hover:bg-slate-900 text-white font-black rounded-2xl shadow-lg transition-all active:scale-95"
                                >
                                    {story.phase === 'complete' ? 'Ở lại xem kết quả' : 'Ở lại chơi tiếp'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Fragment>
    );
};

export default MagicStoryWizard;
