import { useState, useRef, useCallback, useEffect } from 'react';
import { StoryboardData } from '../types';
import { storyboardService } from '../services/storyboardService';

export const useStoryboard = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<StoryboardData | null>(null);
    const [error, setError] = useState<string | null>(null);

    // ─── Player State ────────────────────────────────────────────────────────
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    // Narrator language: defaults to 'en'. User can switch to 'vi' if their device has a Vietnamese voice.
    const [narratorLang, setNarratorLang] = useState<'vi' | 'en'>('en');
    const [hasVietnameseVoice, setHasVietnameseVoice] = useState(false);

    const musicRef = useRef<HTMLAudioElement | null>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const autoAdvanceRef = useRef(true); // tracks if auto-advance is allowed

    // ─── Process Drawing ─────────────────────────────────────────────────────
    const processDrawing = async (file: File) => {
        setIsProcessing(true);
        setError(null);
        try {
            const data = await storyboardService.processDrawing(file);
            setResult(data);
            setCurrentSceneIndex(0);
            return { success: true, data };
        } catch (err: any) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsProcessing(false);
        }
    };

    // ─── Demo Mode (for testing without API) ─────────────────────────────────
    const loadDemoData = useCallback(() => {
        const demoData: StoryboardData = {
            title: 'Thỏ Hồng Nhỏ Và Khu Vườn Cầu Vồng',
            characterName: 'Thỏ Hồng',
            characterDesign: 'A soft pink rabbit, 3D Pixar style, friendly face, big eyes',
            moralLesson: 'Khi con biết giúp đỡ bạn bè, thế giới sẽ luôn tràn ngập nụ cười.',
            drawingUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
            scenes: [
                {
                    narration: 'Ôi! Thỏ Hồng khẽ rung rinh đôi tai rồi bước ra từ trang giấy. Bạn nhỏ lon ton nhìn quanh khu vườn xanh mướt. Thỏ Hồng mỉm cười vẫy tay chào con đấy!',
                    narration_en: 'Wow! Pinky the bunny wiggles her ears and hops right off the paper. She looks around the lush green garden with wide, happy eyes. She\'s waving hello just for you!',
                    visualPrompt: '3D Pixar style, a soft pink rabbit, hopping happily in a sunny meadow, greeting the child, warm atmosphere, 8k render',
                    sceneDescription: 'Thỏ Hồng bước ra từ tranh của bé',
                    emotion: 'happy' as const,
                    kenBurns: 'zoom-in' as const,
                    imageUrl: '/assets/story-ai/demo/scene-1.png',
                },
                {
                    narration: 'Lạ chưa kìa! Một chú chim sẻ nhỏ đang đậu trên cành hoa. Thỏ Hồng khịt khịt cái mũi xinh xắn, rồi nhẹ nhàng tiến lại gần. Hai bạn làm quen với nhau thật vui vẻ',
                    narration_en: 'Look! A tiny little sparrow is perched on a flower. Pinky twitches her cute nose and hops over slowly. The two friends are starting a brand new friendship!',
                    visualPrompt: '3D Pixar style, pink rabbit talking to a sparrow in a colorful garden, soft focus, 8k',
                    sceneDescription: 'Thỏ Hồng gặp bạn Chim Sẻ',
                    emotion: 'curious' as const,
                    kenBurns: 'pan-right' as const,
                    imageUrl: '/assets/story-ai/demo/scene-2.png',
                },
                {
                    narration: 'Cả hai cùng tung tăng chạy nhảy khắp khu vườn. Thỏ Hồng nhảy chân sáo thật điêu luyện. Niềm vui lan tỏa khắp nơi, cỏ cây cũng khẽ đung đưa theo nhịp.',
                    narration_en: 'They are hopping and playing happily all through the garden. Pinky bunny jumps so gracefully! Joy is everywhere, and even the flowers sway along with them.',
                    visualPrompt: '3D Pixar style, pink rabbit and sparrow hopping and playing happily in a colorful garden, soft focus, 8k',
                    sceneDescription: 'Thỏ Hồng và Chim Sẻ tung tăng chạy nhảy khắp khu vườn',
                    emotion: 'magical' as const,
                    kenBurns: 'pan-left' as const,
                    imageUrl: '/assets/story-ai/demo/scene-3.png',
                },
                {
                    narration: 'Ôi không, cơn gió mạnh làm rơi mất tổ của bạn chim! Thỏ Hồng đứng thẳng, đôi mắt quyết tâm vô cùng. Bạn ấy dang rộng đôi tay bé xíu để che chở cho bạn nhỏ',
                    narration_en: 'Oh no, a strong wind has knocked the bird\'s nest! Pinky stands tall with a brave, determined look. She reaches out her little paws to protect her friend from the breeze.',
                    visualPrompt: '3D Pixar style, brave rabbit',
                    sceneDescription: 'Thỏ Hồng dũng cảm cứu bạn Chim Sẻ',
                    emotion: 'brave' as const,
                    kenBurns: 'zoom-out' as const,
                    imageUrl: '/assets/story-ai/demo/scene-4.png',
                },
                {
                    narration: 'Mọi chuyện đã ổn rồi! Thỏ Hồng mỉm cười hạnh phúc bên bạn chim. Cảm ơn con đã về ra tớ để tớ có một ngày tuyệt vời như thế này nhé!',
                    narration_en: 'Everything is safe now! Pinky smiles warmly at her little bird friend. Thank you so much for drawing me so I could have such a wonderful day!',
                    visualPrompt: '3D Pixar style, pink rabbit and sparrow waving with a warm smile, happy bird in the background, warm sunset glow, 8k',
                    sceneDescription: 'Thỏ Hồng và Chim Sẻ vui vẻ bên nhau',
                    emotion: 'happy' as const,
                    kenBurns: 'pan-up' as const,
                    imageUrl: '/assets/story-ai/demo/scene-5.png',
                },
            ],
        };
        setResult(demoData);
        setCurrentSceneIndex(0);
        setError(null);
    }, []);


    // ─── Scene Navigation ────────────────────────────────────────────────────
    const goToScene = useCallback((index: number) => {
        if (!result) return;
        const clamped = Math.max(0, Math.min(index, result.scenes.length - 1));
        // Block any pending auto-advance from the old scene's speech callback
        autoAdvanceRef.current = false;
        // Stop current speech
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setCurrentSceneIndex(clamped);
    }, [result]);

    const nextScene = useCallback(() => {
        if (!result) return;
        if (currentSceneIndex < result.scenes.length - 1) {
            goToScene(currentSceneIndex + 1);
        } else {
            // End of story — stop playing
            setIsPlaying(false);
        }
    }, [result, currentSceneIndex, goToScene]);

    const prevScene = useCallback(() => {
        goToScene(currentSceneIndex - 1);
    }, [currentSceneIndex, goToScene]);

    // ─── TTS (Text-to-Speech) ────────────────────────────────────────────────
    // Thêm hàm tìm giọng Tiếng Anh vào Hook của bạn
    const getEnglishVoice = useCallback((): SpeechSynthesisVoice | null => {
        const voices = window.speechSynthesis.getVoices();
        // Ưu tiên các giọng nữ, nhẹ nhàng phổ biến trên các nền tảng
        return voices.find(v => v.lang.startsWith('en') && v.name.includes('Samantha')) // Mac/iOS siêu mượt
            || voices.find(v => v.lang.startsWith('en') && v.name.includes('Google US English')) // Chrome/Android
            || voices.find(v => v.lang.startsWith('en') && v.name.includes('Aria')) // Windows Natural
            || voices.find(v => v.lang.startsWith('en') && v.name.includes('Female'))
            || voices.find(v => v.lang.startsWith('en'))
            || null;
    }, []);

    const getVietnameseVoice = useCallback((): SpeechSynthesisVoice | null => {
        const voices = window.speechSynthesis.getVoices();
        // Quan trọng: Phải tìm đúng vi-VN, nếu không nó sẽ đọc bằng giọng Anh
        return voices.find(v => v.lang === 'vi-VN' && (v.name.includes('Google') || v.name.includes('Natural')))
            || voices.find(v => v.lang === 'vi-VN' && v.name.includes('An')) // Giọng nữ Việt Nam phổ biến
            || voices.find(v => v.lang === 'vi-VN')
            || null;
    }, []);

    // Detect available voices to enable/disable the Vietnamese narrator toggle.
    // Default always stays English — user switches manually.
    useEffect(() => {
        const detect = () => {
            const viVoice = getVietnameseVoice();
            setHasVietnameseVoice(!!viVoice);
            // Do NOT auto-switch language; keep 'en' as default
        };
        if (window.speechSynthesis.getVoices().length > 0) {
            detect();
        } else {
            window.speechSynthesis.onvoiceschanged = () => {
                window.speechSynthesis.onvoiceschanged = null;
                detect();
            };
        }
    }, [getVietnameseVoice]);

    // speakScene accepts both VI and EN text, reads based on current narratorLang
    const speakScene = useCallback((narration_vi: string, narration_en: string, onEnd?: () => void) => {
        window.speechSynthesis.cancel();

        const speak = () => {
            const viVoice = getVietnameseVoice();
            const enVoice = getEnglishVoice();
            const useVietnamese = narratorLang === 'vi' && !!viVoice;

            const text = useVietnamese ? narration_vi : narration_en;
            const utterance = new SpeechSynthesisUtterance(text);

            if (useVietnamese) {
                utterance.voice = viVoice;
                utterance.lang = 'vi-VN';
                utterance.rate = 0.8;  // Đọc chậm, truyền cảm
                utterance.pitch = 1.2; // Giọng cao hơn một chút cho đáng yêu
            } else {
                utterance.voice = enVoice;
                utterance.lang = 'en-US';
                utterance.rate = 0.8; // Tiếng Anh đọc chậm giúp bé học từ
                utterance.pitch = 1.2; // Giọng Samantha hoặc Google US English ở pitch này nghe rất "kể chuyện"
            }

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => { setIsSpeaking(false); onEnd?.(); };

            window.speechSynthesis.speak(utterance);
        };

        // Đợi giọng đọc tải xong (vì voices đôi khi load async)
        if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.onvoiceschanged = speak;
        } else {
            speak();
        }
    }, [getVietnameseVoice, getEnglishVoice, narratorLang]);

    const stopSpeaking = useCallback(() => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    }, []);

    // ─── Background Music ────────────────────────────────────────────────────
    const MUSIC_TRACKS = [
        '/assets/music/Happy_Clappy.mp3',
        '/assets/music/Hug_Convoy.mp3',
        '/assets/music/West_in_Africa.mp3',
        '/assets/music/the-arkansas-traveler-bamboo-flute.mp3',
    ];

    const startMusic = useCallback(() => {
        if (musicRef.current) {
            musicRef.current.play().catch(() => { /* no interaction or file */ });
            setIsMusicPlaying(true);
            return;
        }

        // Try loading a random track
        const track = MUSIC_TRACKS[Math.floor(Math.random() * MUSIC_TRACKS.length)];
        const audio = new Audio(track);
        audio.loop = true;
        audio.volume = 0.1; // Volume
        audio.play().then(() => {
            musicRef.current = audio;
            setIsMusicPlaying(true);
        }).catch(() => {
            console.log('🎵 No background music file found or interaction blocked.');
            setIsMusicPlaying(false);
        });
    }, []);

    const stopMusic = useCallback(() => {
        if (musicRef.current) {
            musicRef.current.pause();
            setIsMusicPlaying(false);
        }
    }, []);

    const toggleMusic = useCallback(() => {
        if (isMusicPlaying) {
            stopMusic();
        } else {
            startMusic();
        }
    }, [isMusicPlaying, startMusic, stopMusic]);

    // ─── Play/Pause Orchestration ────────────────────────────────────────────
    const play = useCallback(() => {
        setIsPlaying(true);
        startMusic(); // Music always resumes/starts with video
    }, [startMusic]);

    const pause = useCallback(() => {
        setIsPlaying(false);
        stopSpeaking();
        stopMusic(); // Music pauses together with the video
    }, [stopSpeaking, stopMusic]);

    const togglePlay = useCallback(() => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }, [isPlaying, pause, play]);

    // ─── Reset ───────────────────────────────────────────────────────────────
    const reset = useCallback(() => {
        setResult(null);
        setError(null);
        setCurrentSceneIndex(0);
        setIsPlaying(false);
        stopSpeaking();
        stopMusic();
        musicRef.current = null;
    }, [stopSpeaking, stopMusic]);

    // ─── Cleanup on unmount ──────────────────────────────────────────────────
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
            if (musicRef.current) {
                musicRef.current.pause();
                musicRef.current = null;
            }
        };
    }, []);

    // ─── Auto-initialization ─────────────────────────────────────────────────
    // Automatically start playing when a result is loaded
    useEffect(() => {
        if (result && !isProcessing && !error && !isPlaying && currentSceneIndex === 0) {
            // Tiny delay to ensure components are mounted and browser is ready
            const timer = setTimeout(() => {
                play();
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [result, isProcessing, error]);

    return {
        // Processing
        isProcessing,
        result,
        error,
        processDrawing,
        loadDemoData,
        reset,

        // Player controls
        currentSceneIndex,
        currentScene: result?.scenes[currentSceneIndex] ?? null,
        totalScenes: result?.scenes.length ?? 0,
        isPlaying,
        isSpeaking,
        isMusicPlaying,

        // Navigation
        goToScene,
        nextScene,
        prevScene,

        // Audio
        speakScene,
        stopSpeaking,
        toggleMusic,
        togglePlay,
        play,
        pause,

        // Bilingual narrator
        narratorLang,
        setNarratorLang,
        hasVietnameseVoice,
    };
};
