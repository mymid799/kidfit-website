/**
 * StorySceneDisplay — Displays a single story scene with Ken Burns animation,
 * bilingual subtitles, and emotion-based overlay.
 * 
 * Extracted as a reusable component to keep DRY (used for Scene 1, 2, and 3).
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { MagicSceneData } from '../types';

// Very subtle non-distorting pans/zooms
const kenBurnsStyles: Record<string, React.CSSProperties> = {
    'zoom-in': { transform: 'scale(1.05)', transformOrigin: 'center center' },
    'zoom-out': { transform: 'scale(1)', transformOrigin: 'center center' },
    'pan-left': { transform: 'scale(1.05) translateX(-2%)', transformOrigin: 'left center' },
    'pan-right': { transform: 'scale(1.05) translateX(2%)', transformOrigin: 'right center' },
    'pan-up': { transform: 'scale(1.05) translateY(-2%)', transformOrigin: 'center top' },
    'pan-down': { transform: 'scale(1.05) translateY(2%)', transformOrigin: 'center bottom' },
};

const kenBurnsInitial: Record<string, React.CSSProperties> = {
    'zoom-in': { transform: 'scale(1)', transformOrigin: 'center center' },
    'zoom-out': { transform: 'scale(1.05)', transformOrigin: 'center center' },
    'pan-left': { transform: 'scale(1.05) translateX(2%)', transformOrigin: 'left center' },
    'pan-right': { transform: 'scale(1.05) translateX(-2%)', transformOrigin: 'right center' },
    'pan-up': { transform: 'scale(1.05) translateY(2%)', transformOrigin: 'center top' },
    'pan-down': { transform: 'scale(1.05) translateY(-2%)', transformOrigin: 'center bottom' },
};

const emotionGradients: Record<string, string> = {
    happy: 'from-amber-900/60 via-amber-900/20 to-transparent',
    curious: 'from-indigo-900/60 via-indigo-900/20 to-transparent',
    brave: 'from-red-900/60 via-red-900/20 to-transparent',
    calm: 'from-sky-900/60 via-sky-900/20 to-transparent',
    excited: 'from-orange-900/60 via-orange-900/20 to-transparent',
    magical: 'from-violet-900/60 via-violet-900/20 to-transparent',
};

const emotionIcons: Record<string, string> = {
    happy: '😊', curious: '🤔', brave: '💪', calm: '😌', excited: '🤩', magical: '✨',
};

const SCENE_DURATION = 8000;

interface StorySceneDisplayProps {
    scene: MagicSceneData;
    sceneNumber: number;
    totalScenes: number;
    fallbackImage?: string;
    narratorLang: 'vi' | 'en';
    isSpeaking: boolean;
    /** Called when the scene animation finishes and it's time to advance */
    onFinished?: () => void;
    /** Called when the user clicks the "Continue" button */
    onContinue?: () => void;
    continueLabel?: string;
    continueLabel_en?: string;
    /** Auto-play TTS for this scene */
    onSpeak?: (vi: string, en: string, onEnd?: () => void) => void;
    /** Extra controls rendered in top-right alongside the eye toggle (for fullscreen nav) */
    extraControls?: React.ReactNode;
    /** Whether the parent is in fullscreen mode */
    isFullscreen?: boolean;
}

const getSceneCache = () => {
    if (typeof window === 'undefined') return {};
    if (!(window as any).__storySceneCache) {
        (window as any).__storySceneCache = {};
    }
    return (window as any).__storySceneCache;
};

export const StorySceneDisplay: React.FC<StorySceneDisplayProps> = ({
    scene,
    sceneNumber,
    totalScenes,
    fallbackImage,
    narratorLang,
    isSpeaking,
    onFinished,
    onContinue,
    continueLabel = 'Tiếp tục',
    continueLabel_en,
    onSpeak,
    extraControls,
    isFullscreen: fs,
}) => {
    const cacheKey = `${sceneNumber}-${scene.narration?.substring(0, 10)}`;
    
    // Evaluate cached delays synchronously so it doesn't trigger fade-in animations repeatedly
    const [showText, setShowText] = useState(() => {
        const time = getSceneCache()[cacheKey];
        return time && (Date.now() - time) >= 500 ? true : false;
    });
    
    const [showContinue, setShowContinue] = useState(() => {
        const time = getSceneCache()[cacheKey];
        return time && (Date.now() - time) >= SCENE_DURATION ? true : false;
    });
    
    const [isTextHidden, setIsTextHidden] = useState(false);

    // Reveal text after a short delay, then speak
    useEffect(() => {
        const cache = getSceneCache();
        const now = Date.now();
        
        if (!cache[cacheKey]) {
            cache[cacheKey] = now;
            setShowText(false);
            setShowContinue(false);
        }

        const elapsed = now - cache[cacheKey];
        const textDelay = Math.max(0, 500 - elapsed);
        const continueDelay = Math.max(0, SCENE_DURATION - elapsed);

        const textTimer = setTimeout(() => setShowText(true), textDelay);
        const fallbackTimer = setTimeout(() => setShowContinue(true), continueDelay);

        return () => {
            clearTimeout(textTimer);
            clearTimeout(fallbackTimer);
        };
    }, [scene, sceneNumber, cacheKey]);

    const imageUrl = scene.imageUrl || fallbackImage || '';

    return (
        <div className={`relative overflow-hidden shadow-2xl bg-black group ${fs ? 'w-full h-full rounded-none border-0' : 'rounded-3xl border border-slate-100 aspect-[4/3] md:aspect-video'
            }`}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 z-0"
            >
                {/* Dual-Layer Cinema Display: Blurred Background + Animated Contain Foreground */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`scene-${sceneNumber}`}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2 }}
                    >
                        {imageUrl && (
                            <>
                                {/* Blurred Background Layer (Fills black space) */}
                                <img
                                    src={imageUrl}
                                    alt="background blur"
                                    className="absolute inset-0 w-full h-full object-cover scale-110 opacity-70"
                                    style={{ filter: 'blur(30px) brightness(0.6)' }}
                                />
                                
                                {/* Sharp Animated Foreground Layer (No Cropping) */}
                                <div
                                    className="absolute inset-0 w-full h-full transition-transform ease-out"
                                    style={{
                                        ...kenBurnsInitial[scene.kenBurns],
                                        animation: `kenburns-${scene.kenBurns} ${SCENE_DURATION}ms ease-out forwards`,
                                    }}
                                >
                                    <img
                                        src={imageUrl}
                                        alt={scene.sceneDescription}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            {/* Top-right controls: eye toggle + any extra controls */}
            <div className="absolute top-3 right-3 z-40 flex items-center gap-1.5">
                {extraControls}
                <button
                    onClick={() => setIsTextHidden(!isTextHidden)}
                    className="p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white/80 hover:text-white transition-all border border-white/10"
                    title={isTextHidden ? "Hiện chữ" : "Ẩn chữ"}
                >
                    <span className="material-symbols-outlined text-lg block">
                        {isTextHidden ? 'visibility_off' : 'visibility'}
                    </span>
                </button>
            </div>

            {/* Bilingual subtitle panel (Visual Novel Overlay) */}
            <AnimatePresence>
                {!isTextHidden && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.4 }}
                        className="absolute bottom-0 left-0 right-0 z-30 p-6 md:p-8 pt-16 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col justify-end min-h-[40%]"
                    >
                        <AnimatePresence mode="wait">
                            {showText && (
                                <motion.div
                                    key={`text-${sceneNumber}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.6 }}
                                    className="space-y-4 max-w-4xl mx-auto w-full"
                                >
                                    {/* Vietnamese subtitle */}
                                    <p className={`text-lg md:text-xl leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,1)] transition-all duration-300 ${narratorLang === 'vi' ? 'font-black text-white' : 'font-semibold text-white'
                                        }`}>
                                        <span className={`inline-flex text-[10px] items-center justify-center h-4 px-1.5 rounded mr-3 align-middle font-black transition-colors ${narratorLang === 'vi' ? 'bg-amber-400 text-black border border-amber-400 scale-110' : 'bg-black/50 text-white border border-white/30'
                                            }`}>VN</span>
                                        {scene.narration}
                                    </p>
                                    {/* English subtitle */}
                                    <p className={`text-lg md:text-xl leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,1)] transition-all duration-300 ${narratorLang === 'en' ? 'font-black text-white' : 'font-semibold text-white'
                                        }`}>
                                        <span className={`inline-flex text-[10px] items-center justify-center h-4 px-1.5 rounded mr-3 align-middle font-black transition-colors ${narratorLang === 'en' ? 'bg-sky-500 text-white border border-sky-500 scale-110' : 'bg-black/50 text-white border border-white/30'
                                            }`}>EN</span>
                                        {scene.narration_en}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Continue button */}
                        {showContinue && onContinue && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="flex justify-end mt-6 mr-2"
                            >
                                <button
                                    onClick={onContinue}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-amber-400 text-black 
                                            font-black rounded-full shadow-[0_0_20px_rgba(251,191,36,0.4)]
                                            hover:bg-amber-300 hover:-translate-y-1 active:scale-95 transition-all text-sm md:text-base pointer-events-auto"
                                >
                                    <span>{continueLabel}</span>
                                    <span className="material-symbols-outlined font-black">play_arrow</span>
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
