import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StoryboardData, StoryScene } from '../types';

// ─── Ken Burns CSS keyframe mappings ─────────────────────────────────────────
const kenBurnsStyles: Record<string, React.CSSProperties> = {
    'zoom-in': { transform: 'scale(1.3)', transformOrigin: 'center center' },
    'zoom-out': { transform: 'scale(1)', transformOrigin: 'center center' },
    'pan-left': { transform: 'scale(1.2) translateX(-8%)', transformOrigin: 'left center' },
    'pan-right': { transform: 'scale(1.2) translateX(8%)', transformOrigin: 'right center' },
    'pan-up': { transform: 'scale(1.2) translateY(-8%)', transformOrigin: 'center top' },
    'pan-down': { transform: 'scale(1.2) translateY(8%)', transformOrigin: 'center bottom' },
};

const kenBurnsInitial: Record<string, React.CSSProperties> = {
    'zoom-in': { transform: 'scale(1)', transformOrigin: 'center center' },
    'zoom-out': { transform: 'scale(1.3)', transformOrigin: 'center center' },
    'pan-left': { transform: 'scale(1.2) translateX(8%)', transformOrigin: 'left center' },
    'pan-right': { transform: 'scale(1.2) translateX(-8%)', transformOrigin: 'right center' },
    'pan-up': { transform: 'scale(1.2) translateY(8%)', transformOrigin: 'center top' },
    'pan-down': { transform: 'scale(1.2) translateY(-8%)', transformOrigin: 'center bottom' },
};

// ─── Emotion-based overlay colors ────────────────────────────────────────────
const emotionGradients: Record<string, string> = {
    happy: 'from-amber-900/60 via-amber-900/20 to-transparent',
    curious: 'from-indigo-900/60 via-indigo-900/20 to-transparent',
    brave: 'from-red-900/60 via-red-900/20 to-transparent',
    calm: 'from-sky-900/60 via-sky-900/20 to-transparent',
    excited: 'from-orange-900/60 via-orange-900/20 to-transparent',
    magical: 'from-violet-900/60 via-violet-900/20 to-transparent',
};

const emotionIcons: Record<string, string> = {
    happy: '😊',
    curious: '🤔',
    brave: '💪',
    calm: '😌',
    excited: '🤩',
    magical: '✨',
};

// ─── Scene duration (ms) ────────────────────────────────────────────────────
const SCENE_DURATION = 8000; // 8 seconds per scene
const TEXT_REVEAL_DELAY = 500; // Delay before text starts appearing

interface StoryboardPlayerProps {
    result: StoryboardData;
    onReset: () => void;
    currentSceneIndex: number;
    isPlaying: boolean;
    isSpeaking: boolean;
    isMusicPlaying: boolean;
    narratorLang: 'vi' | 'en';
    hasVietnameseVoice: boolean;
    onSetNarratorLang: (lang: 'vi' | 'en') => void;
    onGoToScene: (index: number) => void;
    onNextScene: () => void;
    onPrevScene: () => void;
    onTogglePlay: () => void;
    onToggleMusic: () => void;
    onSpeakScene: (narration_vi: string, narration_en: string, onEnd?: () => void) => void;
    onStopSpeaking: () => void;
}

export const StoryboardPlayer: React.FC<StoryboardPlayerProps> = ({
    result,
    onReset,
    currentSceneIndex,
    isPlaying,
    isSpeaking,
    isMusicPlaying,
    narratorLang,
    hasVietnameseVoice,
    onSetNarratorLang,
    onGoToScene,
    onNextScene,
    onPrevScene,
    onTogglePlay,
    onToggleMusic,
    onSpeakScene,
    onStopSpeaking,
}) => {
    const scene = result.scenes[currentSceneIndex];
    const totalScenes = result.scenes.length;
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [showText, setShowText] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showExitConfirm, setShowExitConfirm] = useState(false);
    const [showGallery, setShowGallery] = useState(false);
    const [fullViewIndex, setFullViewIndex] = useState<number | null>(null);
    const playerRef = useRef<HTMLDivElement>(null);
    const [showFullscreenControls, setShowFullscreenControls] = useState(false);
    const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // ─── Auto-advance logic ──────────────────────────────────────────────────
    const sceneIdRef = useRef(0); // increments on every scene change to invalidate stale callbacks

    useEffect(() => {
        // Increment scene ID so any old callbacks become stale
        const thisSceneId = ++sceneIdRef.current;

        if (!isPlaying) {
            if (timerRef.current) clearTimeout(timerRef.current);
            return;
        }

        // Start narration for current scene
        setShowText(false);
        const textTimer = setTimeout(() => setShowText(true), TEXT_REVEAL_DELAY);

        // Speak the narration (both VI and EN passed; hook decides which to use)
        // onSpeakScene depends on narratorLang, so this re-triggers immediately on toggle
        onSpeakScene(scene.narration, scene.narration_en || scene.narration, () => {
            // Only auto-advance if this callback is still for the current scene
            if (sceneIdRef.current !== thisSceneId) return;

            timerRef.current = setTimeout(() => {
                // Double-check we're still on the same scene
                if (sceneIdRef.current !== thisSceneId) return;

                if (currentSceneIndex < totalScenes - 1) {
                    onNextScene();
                } else {
                    onTogglePlay(); // Stop at the end
                }
            }, 1500);
        });

        return () => {
            clearTimeout(textTimer);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isPlaying, currentSceneIndex, onSpeakScene, narratorLang]);

    // ─── Show text when scene changes (non-playing mode) ─────────────────────
    useEffect(() => {
        if (!isPlaying) {
            setShowText(false);
            const t = setTimeout(() => setShowText(true), 300);
            return () => clearTimeout(t);
        }
    }, [currentSceneIndex, isPlaying]);

    // ─── Fullscreen toggle ───────────────────────────────────────────────────
    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement && playerRef.current) {
            playerRef.current.requestFullscreen?.();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen?.();
            setIsFullscreen(false);
        }
    }, []);

    useEffect(() => {
        const handler = () => {
            const isFS = !!document.fullscreenElement;
            setIsFullscreen(isFS);
            if (isFS) setShowFullscreenControls(true);
        };
        document.addEventListener('fullscreenchange', handler);
        return () => document.removeEventListener('fullscreenchange', handler);
    }, []);

    // ─── Manual speak button ─────────────────────────────────────────────────
    const handleSpeak = () => {
        if (isSpeaking) {
            onStopSpeaking();
        } else {
            onSpeakScene(scene.narration, scene.narration_en || scene.narration);
        }
    };

    // ─── Download helper ──────────────────────────────────────────────────
    const downloadImage = useCallback(async (url: string, filename: string) => {
        try {
            const res = await fetch(url);
            const blob = await res.blob();
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);
        } catch {
            window.open(url, '_blank');
        }
    }, []);

    const downloadAllImages = useCallback(async () => {
        for (let i = 0; i < result.scenes.length; i++) {
            const s = result.scenes[i];
            const url = s.imageUrl || result.drawingUrl;
            if (url) {
                await downloadImage(url, `${result.title}-scene-${i + 1}.png`);
            }
        }
    }, [result, downloadImage]);

    const progress = ((currentSceneIndex + 1) / totalScenes) * 100;

    return (
        <motion.div
            ref={playerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={isFullscreen
                ? 'flex flex-col bg-black'
                : 'space-y-6 relative'
            }
        >
            <div className={`flex items-center justify-between ${
                isFullscreen
                    ? 'shrink-0 px-6 py-2 bg-black/80 backdrop-blur-xl border-b border-white/10 z-[100]'
                    : ''
            }`}>
                {/* Left: Back + Title */}
                <div className="flex items-center gap-3">
                    {!isFullscreen && (
                        <button
                            onClick={() => setShowExitConfirm(true)}
                            className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center group"
                            title="Quay lại"
                        >
                            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
                        </button>
                    )}
                    <div className="flex items-center gap-2">
                        <span className={`material-symbols-outlined text-2xl ${ isFullscreen ? 'text-white/70' : 'text-secondary'}`}>auto_stories</span>
                        <h3 className={`font-black truncate max-w-[200px] md:max-w-xs ${ isFullscreen ? 'text-white text-lg' : 'text-slate-800 text-2xl'}`}>{result.title}</h3>
                    </div>
                </div>

                {/* Center: Inline playback controls (fullscreen only) */}
                {isFullscreen && (
                    <div className="flex items-center gap-2">
                        {/* Navigation */}
                        <div className="flex items-center gap-1 pr-2 border-r border-white/15">
                            <button onClick={onPrevScene} disabled={currentSceneIndex === 0}
                                className="p-1.5 rounded-lg hover:bg-white/10 text-white disabled:opacity-20 transition-all">
                                <span className="material-symbols-outlined text-lg">skip_previous</span>
                            </button>
                            <button onClick={onTogglePlay}
                                className="w-9 h-9 rounded-xl bg-white text-black hover:bg-white/90 flex items-center justify-center shadow-md transition-all">
                                <span className="material-symbols-outlined text-xl fill-[1]">{isPlaying ? 'pause' : 'play_arrow'}</span>
                            </button>
                            <button onClick={onNextScene} disabled={currentSceneIndex === totalScenes - 1}
                                className="p-1.5 rounded-lg hover:bg-white/10 text-white disabled:opacity-20 transition-all">
                                <span className="material-symbols-outlined text-lg">skip_next</span>
                            </button>
                        </div>
                        {/* Language toggle */}
                        <div className="flex bg-white/10 rounded-lg p-0.5 border-r border-white/15 mr-1">
                            <button onClick={() => onSetNarratorLang('vi')} disabled={!hasVietnameseVoice}
                                className={`px-2 py-1 text-[10px] font-black rounded-md transition-all ${ narratorLang === 'vi' ? 'bg-red-500 text-white shadow' : 'text-white/50 hover:text-white'} disabled:opacity-10`}>
                                VN
                            </button>
                            <button onClick={() => onSetNarratorLang('en')}
                                className={`px-2 py-1 text-[10px] font-black rounded-md transition-all ${ narratorLang === 'en' ? 'bg-sky-500 text-white shadow' : 'text-white/50 hover:text-white'}`}>
                                EN
                            </button>
                        </div>
                        {/* Utilities */}
                        <button onClick={handleSpeak}
                            className={`p-1.5 rounded-lg transition-all ${ isSpeaking ? 'text-secondary animate-pulse' : 'text-white/50 hover:text-white'}`}
                            title="Đọc lại">                            
                            <span className="material-symbols-outlined text-lg">{isSpeaking ? 'stop_circle' : 'record_voice_over'}</span>
                        </button>
                        <button onClick={onToggleMusic}
                            className={`p-1.5 rounded-lg transition-all ${ isMusicPlaying ? 'text-amber-400' : 'text-white/50 hover:text-white'}`}
                            title="Nhạc nền">
                            <span className="material-symbols-outlined text-lg">{isMusicPlaying ? 'music_note' : 'music_off'}</span>
                        </button>
                        <button onClick={toggleFullscreen}
                            className="p-1.5 rounded-lg text-white/50 hover:text-white transition-all"
                            title="Thoát toàn màn hình">
                            <span className="material-symbols-outlined text-lg">fullscreen_exit</span>
                        </button>
                    </div>
                )}

                {/* Right: Gallery + scene counter */}
                <div className="flex items-center gap-2">
                    {!isFullscreen && (
                        <button onClick={() => setShowGallery(true)}
                            className="hidden md:flex text-slate-400 hover:text-primary text-sm font-bold items-center gap-1.5 transition-colors">
                            <span className="material-symbols-outlined text-sm">photo_library</span> Xem ảnh
                        </button>
                    )}
                    {isFullscreen && (
                        <span className="text-white/40 text-xs font-bold">
                            {currentSceneIndex + 1}/{totalScenes}
                        </span>
                    )}
                </div>
            </div>

            {/* ─── Main Player ─────────────────────────────────────────────── */}
            <div className={`relative overflow-hidden bg-black ${
                isFullscreen
                    ? 'flex-1 min-h-0'
                    : 'rounded-3xl shadow-2xl border border-slate-100 aspect-video'
            }`}>
                {/* Scene image (DALL-E generated) or Drawing with Ken Burns */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSceneIndex}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2 }}
                    >
                        <div
                            className="absolute inset-0 transition-transform ease-out"
                            style={{
                                ...kenBurnsInitial[scene.kenBurns],
                                animation: `kenburns-${scene.kenBurns} ${SCENE_DURATION}ms ease-out forwards`,
                            }}
                        >
                            <img
                                src={scene.imageUrl || result.drawingUrl}
                                alt={scene.sceneDescription || 'Bức vẽ của bé'}
                                className="w-full h-full object-cover"
                                style={{ filter: scene.imageUrl ? 'brightness(0.95)' : 'brightness(0.9) saturate(1.1)' }}
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Emotion-based gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${emotionGradients[scene.emotion] || emotionGradients.happy}`} />

                {/* Scene number badge */}
                <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-bold border border-white/10">
                        {emotionIcons[scene.emotion]} Cảnh {currentSceneIndex + 1}/{totalScenes}
                    </span>
                </div>

                {/* ─── Bilingual Subtitle Overlay ───────────────────── */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <AnimatePresence mode="wait">
                        {showText && (
                            <motion.div
                                key={`text-${currentSceneIndex}`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6 }}
                                className="space-y-4 max-w-5xl mx-auto"
                            >
                                {/* Vietnamese subtitle */}
                                <p className={`text-white text-lg md:text-2xl font-black leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] transition-all ${
                                    narratorLang === 'vi' && isSpeaking ? 'opacity-100 scale-[1.02]' : 'opacity-80'
                                }`}>
                                    <span className="bg-yellow-400 text-black text-[10px] px-1.5 py-0.5 rounded mr-2 align-middle font-black">VN</span>
                                    {scene.narration}
                                </p>
                                {/* English subtitle - Wider and more prominent */}
                                <p className={`text-sky-100 text-base md:text-xl font-bold leading-relaxed tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] transition-all ${
                                    narratorLang === 'en' && isSpeaking ? 'opacity-100 text-white scale-[1.01]' : 'opacity-60'
                                }`}>
                                    <span className="bg-sky-500 text-white text-[10px] px-1.5 py-0.5 rounded mr-2 align-middle font-black">EN</span>
                                    {scene.narration_en || scene.narration}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Center play button (when paused) */}
                {!isPlaying && (
                    <button
                        onClick={onTogglePlay}
                        className="absolute inset-0 z-30 flex items-center justify-center group cursor-pointer"
                    >
                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/30 group-hover:bg-white/30 group-hover:scale-110 transition-all shadow-2xl">
                            <span className="material-symbols-outlined text-white text-4xl fill-[1] ml-1">play_arrow</span>
                        </div>
                    </button>
                )}

                {/* Click to pause when playing */}
                {isPlaying && (
                    <button
                        onClick={onTogglePlay}
                        className="absolute inset-0 z-25 cursor-pointer"
                        aria-label="Pause"
                    />
                )}
            </div>

            {/* ─── Progress Bar (hidden in fullscreen) ───────────────────────── */}
            {!isFullscreen && <div className="relative">
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
                {/* Scene dots */}
                <div className="flex justify-between mt-3">
                    {result.scenes.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => onGoToScene(i)}
                            className={`flex items-center gap-1.5 text-xs font-bold transition-all ${
                                i === currentSceneIndex
                                    ? 'text-primary scale-110'
                                    : i < currentSceneIndex
                                    ? 'text-primary/50'
                                    : 'text-slate-300'
                            }`}
                        >
                            <span className={`w-2.5 h-2.5 rounded-full transition-all ${
                                i === currentSceneIndex
                                    ? 'bg-primary ring-4 ring-primary/20'
                                    : i < currentSceneIndex
                                    ? 'bg-primary/50'
                                    : 'bg-slate-200'
                            }`} />
                            <span className="hidden md:inline">{i + 1}</span>
                        </button>
                    ))}
                </div>
            </div>}

            {/* ─── Controls Bar (hidden in fullscreen) ──────────────────────── */}
            {!isFullscreen && <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4 flex items-center justify-between gap-4">
                {/* Left: Navigation */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={onPrevScene}
                        disabled={currentSceneIndex === 0}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <span className="material-symbols-outlined text-xl">skip_previous</span>
                    </button>
                    <button
                        onClick={onTogglePlay}
                        className="p-3 rounded-xl bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined text-2xl fill-[1]">
                            {isPlaying ? 'pause' : 'play_arrow'}
                        </span>
                    </button>
                    <button
                        onClick={onNextScene}
                        disabled={currentSceneIndex === totalScenes - 1}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <span className="material-symbols-outlined text-xl">skip_next</span>
                    </button>
                </div>

                {/* Center: Scene info */}
                <div className="hidden md:flex flex-col items-center gap-0.5 flex-1 min-w-0">
                    <p className="text-sm font-black text-slate-700 truncate max-w-xs">
                        {emotionIcons[scene.emotion]} Cảnh {currentSceneIndex + 1}: {scene.sceneDescription}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium">
                        {currentSceneIndex + 1} / {totalScenes} cảnh
                    </p>
                </div>

                {/* Right: Audio controls */}
                <div className="flex items-center gap-2">
                    {/* Language toggle */}
                    <div className="flex items-center rounded-xl overflow-hidden border border-slate-200 text-xs font-bold">
                        <button
                            onClick={() => onSetNarratorLang('vi')}
                            disabled={!hasVietnameseVoice}
                            title={hasVietnameseVoice ? 'Đọc tiếng Việt' : 'Máy bạn chưa cài giọng Tiếng Việt'}
                            className={`px-2.5 py-2 transition-all flex items-center gap-1 ${
                                narratorLang === 'vi'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                            } disabled:opacity-30 disabled:cursor-not-allowed`}
                        >
                            🇻🇳 VI
                        </button>
                        <button
                            onClick={() => onSetNarratorLang('en')}
                            title="Read in English"
                            className={`px-2.5 py-2 transition-all flex items-center gap-1 ${
                                narratorLang === 'en'
                                    ? 'bg-sky-500 text-white'
                                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                            }`}
                        >
                            🇬🇧 EN
                        </button>
                    </div>
                    <button
                        onClick={handleSpeak}
                        className={`p-2.5 rounded-xl transition-all ${
                            isSpeaking
                                ? 'bg-secondary/10 text-secondary animate-pulse'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                        }`}
                        title={isSpeaking ? 'Dừng đọc' : 'Đọc cảnh này'}
                    >
                        <span className="material-symbols-outlined text-xl">
                            {isSpeaking ? 'stop_circle' : 'record_voice_over'}
                        </span>
                    </button>
                    <button
                        onClick={onToggleMusic}
                        className={`p-2.5 rounded-xl transition-all ${
                            isMusicPlaying
                                ? 'bg-amber-50 text-amber-600'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                        }`}
                        title={isMusicPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
                    >
                        <span className="material-symbols-outlined text-xl">
                            {isMusicPlaying ? 'music_note' : 'music_off'}
                        </span>
                    </button>
                    <button
                        onClick={() => setShowGallery(true)}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-all"
                        title="Xem tất cả ảnh"
                    >
                        <span className="material-symbols-outlined text-xl">photo_library</span>
                    </button>
                    <button
                        onClick={toggleFullscreen}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-all"
                        title="Toàn màn hình"
                    >
                        <span className="material-symbols-outlined text-xl">
                            {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                        </span>
                    </button>
                </div>
            </div>}

            {/* ─── Scene Script List (hidden in fullscreen) ─────────────────── */}
            {!isFullscreen && <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">list_alt</span>
                    <h4 className="font-bold text-slate-700">Kịch bản câu chuyện</h4>
                </div>
                <div className="divide-y divide-slate-50">
                    {result.scenes.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => onGoToScene(i)}
                            className={`w-full text-left px-6 py-4 flex items-start gap-4 transition-all hover:bg-slate-50 ${
                                i === currentSceneIndex ? 'bg-primary/5 border-l-4 border-primary' : ''
                            }`}
                        >
                            {/* Scene thumbnail */}
                            <div className="shrink-0 w-16 h-10 rounded-lg overflow-hidden bg-slate-100 relative">
                                <img
                                    src={s.imageUrl || result.drawingUrl}
                                    alt={s.sceneDescription}
                                    className="w-full h-full object-cover"
                                />
                                <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-black text-white bg-black/40 ${
                                    i === currentSceneIndex ? 'bg-primary/60' : ''
                                }`}>
                                    {i + 1}
                                </span>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className={`text-sm font-bold ${
                                    i === currentSceneIndex ? 'text-primary' : 'text-slate-700'
                                }`}>
                                    {emotionIcons[s.emotion]} {s.sceneDescription}
                                </p>
                                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                                    {s.narration}
                                </p>
                            </div>
                            {i === currentSceneIndex && isSpeaking && (
                                <span className="material-symbols-outlined text-secondary text-lg animate-pulse shrink-0">
                                    graphic_eq
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>}

            {/* ─── Exit Confirmation Overlay ────────────────────────────────── */}
            <AnimatePresence>
                {showExitConfirm && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                            onClick={() => setShowExitConfirm(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl text-center space-y-6 border border-slate-100"
                        >
                            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto">
                                <span className="material-symbols-outlined text-amber-500 text-4xl">warning</span>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-black text-slate-900">Quay lại màn hình chính?</h3>
                                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                                    Toàn bộ câu chuyện, hình ảnh và lời kể sẽ <span className="text-red-500 font-black">bị mất vĩnh viễn</span> nếu bạn thoát. Hãy tải ảnh về trước nếu muốn giữ lại nhé!
                                </p>
                            </div>
                            <button
                                onClick={() => { setShowExitConfirm(false); setShowGallery(true); }}
                                className="w-full py-3 rounded-2xl bg-primary/10 text-primary font-bold hover:bg-primary/20 transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-lg">photo_library</span>
                                Tải ảnh về trước
                            </button>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => { setShowExitConfirm(false); onReset(); }}
                                    className="w-full py-3.5 rounded-2xl bg-red-500 text-white font-black hover:bg-red-600 transition-all shadow-lg shadow-red-200"
                                >
                                    Thoát và quay lại
                                </button>
                                <button
                                    onClick={() => setShowExitConfirm(false)}
                                    className="w-full py-3.5 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all"
                                >
                                    Tiếp tục xem
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ─── Image Gallery Overlay ────────────────────────────────────── */}
            <AnimatePresence>
                {showGallery && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
                            onClick={() => setShowGallery(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white rounded-[2rem] max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col"
                        >
                            {/* Gallery header */}
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">photo_library</span>
                                    <h3 className="font-black text-slate-800">Bộ sưu tập hình ảnh</h3>
                                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">{totalScenes} ảnh</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={downloadAllImages}
                                        className="flex items-center gap-1.5 text-sm font-bold text-primary hover:bg-primary/10 px-3 py-2 rounded-xl transition-all"
                                    >
                                        <span className="material-symbols-outlined text-base">download</span>
                                        Tải tất cả
                                    </button>
                                    <button
                                        onClick={() => setShowGallery(false)}
                                        className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-all"
                                    >
                                        <span className="material-symbols-outlined text-lg">close</span>
                                    </button>
                                </div>
                            </div>

                            {/* Gallery grid */}
                            <div className="p-6 overflow-y-auto flex-1">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {result.scenes.map((s, i) => {
                                        const imgUrl = s.imageUrl || result.drawingUrl;
                                        return (
                                            <div key={i} className="group relative rounded-2xl overflow-hidden bg-slate-100 aspect-video shadow-sm border border-slate-200 hover:shadow-lg hover:border-primary/30 transition-all">
                                                <img
                                                    src={imgUrl}
                                                    alt={s.sceneDescription}
                                                    className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500"
                                                    onClick={() => setFullViewIndex(i)}
                                                />
                                                {/* Overlay on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-3">
                                                    <p className="text-white text-xs font-black">{emotionIcons[s.emotion]} Cảnh {i + 1}: {s.sceneDescription}</p>
                                                </div>
                                                {/* Action buttons */}
                                                <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setFullViewIndex(i); }}
                                                        className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 flex items-center justify-center shadow transition-all"
                                                        title="Xem lớn"
                                                    >
                                                        <span className="material-symbols-outlined text-base">fullscreen</span>
                                                    </button>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); downloadImage(imgUrl, `${result.title}-scene-${i + 1}.png`); }}
                                                        className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 flex items-center justify-center shadow transition-all"
                                                        title="Tải về"
                                                    >
                                                        <span className="material-symbols-outlined text-base">download</span>
                                                    </button>
                                                </div>
                                                {/* Scene number badge */}
                                                <span className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                                                    {i + 1}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ─── Full Image Viewer ───────────────────────────────────────── */}
            <AnimatePresence>
                {fullViewIndex !== null && (
                    <div className="fixed inset-0 z-[120] flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90"
                            onClick={() => setFullViewIndex(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center gap-4"
                        >
                            {/* Image */}
                            <img
                                src={result.scenes[fullViewIndex].imageUrl || result.drawingUrl}
                                alt={result.scenes[fullViewIndex].sceneDescription}
                                className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
                            />

                            {/* Caption */}
                            <p className="text-white/80 text-sm font-bold text-center">
                                {emotionIcons[result.scenes[fullViewIndex].emotion]} Cảnh {fullViewIndex + 1}: {result.scenes[fullViewIndex].sceneDescription}
                            </p>

                            {/* Controls bar */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setFullViewIndex(Math.max(0, fullViewIndex - 1))}
                                    disabled={fullViewIndex === 0}
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-20 flex items-center justify-center transition-all"
                                >
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button
                                    onClick={() => downloadImage(
                                        result.scenes[fullViewIndex].imageUrl || result.drawingUrl,
                                        `${result.title}-scene-${fullViewIndex + 1}.png`
                                    )}
                                    className="px-5 py-2.5 rounded-xl bg-white text-slate-800 font-bold text-sm hover:bg-white/90 flex items-center gap-2 shadow-lg transition-all"
                                >
                                    <span className="material-symbols-outlined text-base">download</span>
                                    Tải ảnh này
                                </button>
                                <button
                                    onClick={() => setFullViewIndex(Math.min(totalScenes - 1, fullViewIndex + 1))}
                                    disabled={fullViewIndex === totalScenes - 1}
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-20 flex items-center justify-center transition-all"
                                >
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>

                            {/* Close button */}
                            <button
                                onClick={() => setFullViewIndex(null)}
                                className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
