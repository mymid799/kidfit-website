/**
 * useMagicStory — State machine hook for the interactive 3-Act story flow.
 * 
 * Phases: idle → uploading → scene1 → challenge → processing2 → scene2
 *         → empathy → processing3 → scene3 → complete
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import type { MagicStoryPhase, MagicSceneData, LessonConclusion } from '../types';
import { magicStoryService } from '../services/magicStoryService';
import { BIOMES, BLUEPRINTS, GUARDIANS, getRandomBlueprint, getBiome, getGuardian } from '../data/worldBible';

export const useMagicStory = () => {
    // ─── Core State ──────────────────────────────────────────────────────────
    const [phase, setPhase] = useState<MagicStoryPhase>('idle');
    const [error, setError] = useState<string | null>(null);

    // Story context
    const [seed, setSeed] = useState(0);
    const [title, setTitle] = useState<string | null>(null);
    const [characterName, setCharacterName] = useState<string | null>(null);
    const [characterDesign, setCharacterDesign] = useState<string | null>(null);
    const [drawingPreview, setDrawingPreview] = useState<string | null>(null);

    // Blueprint & World
    const [blueprintId, setBlueprintId] = useState<string | null>(null);
    const [pillar, setPillar] = useState<string | null>(null);
    const [biomeId, setBiomeId] = useState<string | null>(null);
    const [guardianId, setGuardianId] = useState<string | null>(null);
    const [challengePrompt, setChallengePrompt] = useState<string | null>(null);
    const [challengePrompt_en, setChallengePrompt_en] = useState<string | null>(null);
    const [interactionType, setInteractionType] = useState<'draw' | 'choice'>('choice');
    const [choices, setChoices] = useState<{ id: string; icon?: string; label: string; label_en?: string; consequence?: string; consequence_en?: string }[]>([]);
    const [drawInstruction, setDrawInstruction] = useState<string | null>(null);
    const [drawInstruction_en, setDrawInstruction_en] = useState<string | null>(null);
    const [rewardSticker, setRewardSticker] = useState<string | null>(null);
    const [rewardSticker_en, setRewardSticker_en] = useState<string | null>(null);
    const [educationalGoal, setEducationalGoal] = useState<string | null>(null);
    const [educationalGoal_en, setEducationalGoal_en] = useState<string | null>(null);

    // Empathy question (from blueprint, set after Act 1)
    const [empathyPrompt, setEmpathyPrompt] = useState<string | null>(null);
    const [empathyPrompt_en, setEmpathyPrompt_en] = useState<string | null>(null);
    const [empathyChoices, setEmpathyChoices] = useState<{ id: string; icon: string; label: string; label_en?: string; consequence?: string }[]>([]);

    // User's specific choices to feed to the final summary
    const [selectedChallengeChoice, setSelectedChallengeChoice] = useState<{ label: string; label_en?: string; consequence?: string; consequence_en?: string } | null>(null);
    const [selectedEmpathyChoice, setSelectedEmpathyChoice] = useState<{ label: string; label_en?: string; consequence?: string; consequence_en?: string } | null>(null);

    // The 3 generated scenes
    const [scenes, setScenes] = useState<MagicSceneData[]>([]);

    // Earned sticker
    const [earnedSticker, setEarnedSticker] = useState<string | null>(null);
    const [earnedSticker_en, setEarnedSticker_en] = useState<string | null>(null);

    // Lesson conclusion (from Act 3)
    const [lessonConclusion, setLessonConclusion] = useState<LessonConclusion | null>(null);

    // ─── TTS ─────────────────────────────────────────────────────────────────
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [narratorLang, setNarratorLang] = useState<'vi' | 'en'>('en');
    const [hasVietnameseVoice, setHasVietnameseVoice] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(true);
    // Ref keeps speakText stable across audioEnabled/narratorLang changes
    const audioEnabledRef = useRef(true);
    const narratorLangRef = useRef<'vi' | 'en'>('en');
    // Tracks the current scene narration so we can replay when audio is re-enabled
    const currentNarrationRef = useRef<{ vi: string; en: string } | null>(null);

    const getVietnameseVoice = useCallback((): SpeechSynthesisVoice | null => {
        const voices = window.speechSynthesis.getVoices();
        return voices.find(v => v.lang.includes('vi') && v.name.includes('HoaiMy'))
            || voices.find(v => v.lang.includes('vi') && v.name.includes('NamMinh'))
            || voices.find(v => v.lang.includes('vi') && v.name.includes('Natural'))
            || voices.find(v => v.lang.includes('vi') && v.name.includes('Google'))
            || voices.find(v => v.lang.includes('vi'))
            || null;
    }, []);

    const getEnglishVoice = useCallback((): SpeechSynthesisVoice | null => {
        const voices = window.speechSynthesis.getVoices();
        return voices.find(v => v.lang.startsWith('en') && v.name.includes('Samantha'))
            || voices.find(v => v.lang.startsWith('en') && v.name.includes('Google US English'))
            || voices.find(v => v.lang.startsWith('en') && v.name.includes('Aria'))
            || voices.find(v => v.lang.startsWith('en'))
            || null;
    }, []);

    useEffect(() => {
        const detect = () => setHasVietnameseVoice(!!getVietnameseVoice());
        if (window.speechSynthesis.getVoices().length > 0) detect();
        else window.speechSynthesis.onvoiceschanged = () => { detect(); window.speechSynthesis.onvoiceschanged = null; };
    }, [getVietnameseVoice]);

    const speakText = useCallback((vi: string, en: string, onEnd?: () => void) => {
        currentNarrationRef.current = { vi, en };
        window.speechSynthesis.cancel();
        if (!audioEnabledRef.current) {
            onEnd?.();
            return;
        }

        const viVoice = getVietnameseVoice();
        const enVoice = getEnglishVoice();
        const useVi = narratorLangRef.current === 'vi' && !!viVoice;

        const utterance = new SpeechSynthesisUtterance(useVi ? vi : en);
        utterance.voice = useVi ? viVoice : enVoice;
        utterance.lang = useVi ? 'vi-VN' : 'en-US';
        utterance.rate = useVi ? 1.0 : 0.8;
        utterance.pitch = 1.2;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => { setIsSpeaking(false); onEnd?.(); };
        window.speechSynthesis.speak(utterance);
    }, [getVietnameseVoice, getEnglishVoice]); // stable — reads refs, not state

    const stopSpeaking = useCallback(() => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    }, []);

    const toggleAudio = useCallback(() => {
        setAudioEnabled(prev => {
            const next = !prev;
            audioEnabledRef.current = next;
            if (!next) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
            } else if (currentNarrationRef.current) {
                // Re-trigger narration for the current scene
                const { vi, en } = currentNarrationRef.current;
                const viVoice = getVietnameseVoice();
                const enVoice = getEnglishVoice();
                const useVi = narratorLangRef.current === 'vi' && !!viVoice;
                const utterance = new SpeechSynthesisUtterance(useVi ? vi : en);
                utterance.voice = useVi ? viVoice : enVoice;
                utterance.lang = useVi ? 'vi-VN' : 'en-US';
                utterance.rate = useVi ? 1.0 : 0.8;
                utterance.pitch = 1.2;
                utterance.onstart = () => setIsSpeaking(true);
                utterance.onend = () => setIsSpeaking(false);
                window.speechSynthesis.speak(utterance);
            }
            return next;
        });
    }, [getVietnameseVoice, getEnglishVoice]);

    // Keep refs in sync with state
    useEffect(() => { audioEnabledRef.current = audioEnabled; }, [audioEnabled]);
    useEffect(() => { narratorLangRef.current = narratorLang; }, [narratorLang]);

    // Auto-play TTS on scene changes
    useEffect(() => {
        if (phase === 'scene1' && scenes[0]) {
            speakText(scenes[0].narration, scenes[0].narration_en);
        } else if (phase === 'scene2' && scenes[1]) {
            speakText(scenes[1].narration, scenes[1].narration_en);
        } else if (phase === 'scene3' && scenes[2]) {
            speakText(scenes[2].narration, scenes[2].narration_en);
        }
    }, [phase, scenes, speakText]);

    // ─── Background Music ────────────────────────────────────────────────────
    const musicRef = useRef<HTMLAudioElement | null>(null);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const MUSIC_TRACKS = [
        '/assets/music/Happy_Clappy.mp3',
        '/assets/music/Hug_Convoy.mp3',
        '/assets/music/West_in_Africa.mp3',
        '/assets/music/the-arkansas-traveler-bamboo-flute.mp3',
    ];

    const startMusic = useCallback(() => {
        if (musicRef.current) { musicRef.current.play().catch(() => { }); setIsMusicPlaying(true); return; }
        const track = MUSIC_TRACKS[Math.floor(Math.random() * MUSIC_TRACKS.length)];
        const audio = new Audio(track);
        audio.loop = true;
        audio.volume = 0.05;
        audio.play().then(() => { musicRef.current = audio; setIsMusicPlaying(true); }).catch(() => { });
    }, []);

    const stopMusic = useCallback(() => { musicRef.current?.pause(); setIsMusicPlaying(false); }, []);
    const toggleMusic = useCallback(() => isMusicPlaying ? stopMusic() : startMusic(), [isMusicPlaying, startMusic, stopMusic]);

    // ─── Cleanup ─────────────────────────────────────────────────────────────
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
            musicRef.current?.pause();
            musicRef.current = null;
        };
    }, []);

    // ─── ACT 1: Start Story ──────────────────────────────────────────────────
    const startStory = useCallback(async (file: File) => {
        setPhase('uploading');
        setError(null);
        setDrawingPreview(URL.createObjectURL(file));

        try {
            const data = await magicStoryService.startStory(file);
            setSeed(data.seed);
            setTitle(data.title);
            setCharacterName(data.characterName);
            setCharacterDesign(data.characterDesign);
            setBlueprintId(data.blueprint.id);
            setPillar(data.blueprint.pillar);
            setBiomeId(data.biome.id);
            setGuardianId(data.guardian.id);
            setInteractionType(data.blueprint.interactionType);
            setChallengePrompt(data.blueprint.challengePrompt);
            setChallengePrompt_en(data.blueprint.challengePrompt_en);
            setChoices(data.blueprint.choices || []);
            setDrawInstruction(data.blueprint.drawInstruction);
            setDrawInstruction_en(data.blueprint.drawInstruction_en);
            setRewardSticker(data.blueprint.rewardSticker);
            setRewardSticker_en(data.blueprint.rewardSticker_en);
            setEducationalGoal(data.blueprint.educationalGoal);
            setEducationalGoal_en(data.blueprint.educationalGoal_en);
            // Store empathy choices from the blueprint (not generic!)
            setEmpathyChoices(data.blueprint.empathyChoices || []);
            setScenes([data.scene]);
            setPhase('scene1');
            startMusic();
        } catch (err: any) {
            setError(err.message);
            setPhase('idle');
        }
    }, [startMusic]);

    // ─── Advance from Scene 1 to Challenge ───────────────────────────────────
    const advanceToChallenge = useCallback(() => {
        setPhase('challenge');
    }, []);

    // ─── ACT 2: Submit Challenge ─────────────────────────────────────────────
    const submitChallenge = useCallback(async (choiceId?: string, drawingFile?: File) => {
        setPhase('processing2');
        setError(null);

        // Track the chosen label and full consequence
        const chosenObj = choiceId ? choices.find(c => c.id === choiceId) : undefined;
        const chosenLabel = chosenObj ? chosenObj.label : (drawingFile ? 'Bức vẽ của bé' : 'Ngẫu nhiên');

        setSelectedChallengeChoice({
            label: chosenLabel,
            label_en: chosenObj ? chosenObj.label_en : (drawingFile ? "Child's Drawing" : "Random"),
            consequence: chosenObj?.consequence,
            consequence_en: chosenObj?.consequence_en
        });

        try {
            const data = await magicStoryService.submitAct2({
                seed,
                biomeId: biomeId || 'whispering_forest',
                characterDesign: characterDesign || '',
                characterName: characterName || 'Bạn Nhỏ',
                blueprintId: blueprintId || '',
                challengeChoice: choiceId,
                challengeDrawing: drawingFile,
            });
            setScenes(prev => [...prev, data.scene]);
            setEmpathyPrompt(data.empathy.prompt);
            setEmpathyPrompt_en(data.empathy.prompt_en);
            // Empathy choices come from the blueprint (already set), but backend may override
            if (data.empathy.choices && data.empathy.choices.length > 0) {
                setEmpathyChoices(data.empathy.choices);
            }
            setPhase('scene2');
        } catch (err: any) {
            setError(err.message);
            setPhase('challenge');
        }
    }, [seed, biomeId, characterDesign, characterName, blueprintId]);

    // ─── Advance from Scene 2 to Empathy ─────────────────────────────────────
    const advanceToEmpathy = useCallback(() => {
        setPhase('empathy');
    }, []);

    // ─── ACT 3: Submit Empathy ───────────────────────────────────────────────
    const submitEmpathy = useCallback(async (choiceId: string) => {
        setPhase('processing3');
        setError(null);

        try {
            const selectedChoice = empathyChoices.find(c => c.id === choiceId);
            const choiceLabel = selectedChoice?.label || choiceId;
            const choiceConsequence = selectedChoice?.consequence || '';
            setSelectedEmpathyChoice({
                label: choiceLabel,
                label_en: selectedChoice?.label_en,
                consequence: choiceConsequence,
                consequence_en: 'Feedback will be generated' // Backend doesn't reliably supply english consequence yet, UI fallback later
            });

            const guardianObj = getGuardian(guardianId || '');
            const biomeObj = getBiome(biomeId || '');

            const historySummary = `
                Landmark visited: ${biomeObj.name} (${biomeObj.visualPrompt})
                NPC met: ${guardianObj.name} (${guardianObj.personality})
                First challenge choice made: ${selectedChallengeChoice?.label}
                Second empathy choice made: ${choiceLabel}
            `;

            const data = await magicStoryService.submitAct3({
                seed,
                biomeId: biomeId || 'whispering_forest',
                characterDesign: characterDesign || '',
                characterName: characterName || 'Bạn Nhỏ',
                empathyChoice: choiceLabel,
                empathyConsequence: choiceConsequence,
                historySummary,
                guardianId: guardianId || 'tiny_rabbit',
                rewardSticker: rewardSticker || 'Ngôi Sao',
                rewardSticker_en: rewardSticker_en || 'Star',
                blueprintId: blueprintId || '',
                educationalGoal: educationalGoal || '',
                educationalGoal_en: educationalGoal_en || '',
            });
            setScenes(prev => [...prev, data.scene]);
            setEarnedSticker(data.reward.sticker);
            setEarnedSticker_en(data.reward.sticker_en);
            setLessonConclusion(data.lessonConclusion);
            setPhase('scene3');
        } catch (err: any) {
            setError(err.message);
            setPhase('empathy');
        }
    }, [seed, biomeId, characterDesign, characterName, guardianId, rewardSticker, rewardSticker_en, empathyChoices, blueprintId, educationalGoal, educationalGoal_en]);

    // ─── Advance from Scene 3 to Complete ────────────────────────────────────
    const advanceToComplete = useCallback(() => {
        setPhase('complete');
    }, []);

    // ─── Go Back (from choice screens to the previous scene) ─────────────────
    const goBack = useCallback(() => {
        if (phase === 'challenge') setPhase('scene1');
        else if (phase === 'empathy') setPhase('scene2');
    }, [phase]);

    // ─── Reset ───────────────────────────────────────────────────────────────
    const reset = useCallback(() => {
        setPhase('idle');
        setError(null);
        setSeed(0);
        setTitle(null);
        setCharacterName(null);
        setCharacterDesign(null);
        setDrawingPreview(null);
        setBlueprintId(null);
        setPillar(null);
        setBiomeId(null);
        setGuardianId(null);
        setChallengePrompt(null);
        setChallengePrompt_en(null);
        setInteractionType('choice');
        setChoices([]);
        setDrawInstruction(null);
        setDrawInstruction_en(null);
        setRewardSticker(null);
        setRewardSticker_en(null);
        setEducationalGoal(null);
        setEducationalGoal_en(null);
        setEmpathyPrompt(null);
        setEmpathyPrompt_en(null);
        setEmpathyChoices([]);
        setSelectedChallengeChoice(null);
        setSelectedEmpathyChoice(null);
        setScenes([]);
        setEarnedSticker(null);
        setEarnedSticker_en(null);
        setLessonConclusion(null);
        stopSpeaking();
        stopMusic();
        musicRef.current = null;
    }, [stopSpeaking, stopMusic]);

    // ─── Demo Mode ───────────────────────────────────────────────────────────
    const loadDemo = useCallback(() => {
        const bp = getRandomBlueprint();
        const biome = getBiome(bp.preferredBiome);
        const guardian = getGuardian(bp.guardianId);

        setSeed(123456);
        setTitle('Thỏ Con Và Khu Rừng Kì Cục');
        setCharacterName('Thỏ Con');
        setCharacterDesign('A cute fluffy white rabbit with long ears');
        setDrawingPreview('/assets/story-ai/demo/scene-1.png');
        setBlueprintId(bp.id);
        setPillar(bp.pillar);
        setBiomeId(biome.id);
        setGuardianId(guardian.id);
        setInteractionType(bp.interactionType);
        setChallengePrompt(bp.challengePrompt);
        setChallengePrompt_en(bp.challengePrompt_en);
        setChoices(bp.choices || []);
        setDrawInstruction(bp.drawInstruction || null);
        setDrawInstruction_en(bp.drawInstruction_en || null);
        setRewardSticker(bp.rewardSticker);
        setRewardSticker_en(bp.rewardSticker_en);
        setEducationalGoal(bp.educationalGoal);
        setEducationalGoal_en(bp.educationalGoal_en);
        setEmpathyChoices(bp.empathyChoices);
        setScenes([{
            narration: 'Thỏ Con vểnh đôi tai dài, tự tin bước vào Khu Rừng Kì Cục. Trời quang mây tạnh, những cái cây cao vút đong đưa trong gió lồng lộng. Đi được vài bước, Thỏ Con chớp chớp mắt vì bất ngờ nhìn thấy một chiếc đài phun nước lớn lấp lánh giữa bãi cỏ xanh mướt.',
            narration_en: 'Little Rabbit wiggles his long ears and confidently steps into the Quirky Forest. The sky is clear, and the tall trees sway in the wind. After a few steps, Little Rabbit unblinking eyes are surprised to see a giant sparkling fountain right in the middle of the green grass.',
            imageUrl: '/assets/story-ai/demo/scene-1.png',
            emotion: 'happy',
            kenBurns: 'zoom-in',
            sceneDescription: 'Thỏ Con bước vào Khu Rừng',
        }]);
        setEmpathyPrompt(null);
        setPhase('scene1');
        startMusic();
    }, [startMusic]);

    /** Demo: simulate Act 2 response */
    const demoSubmitChallenge = useCallback((choiceId?: string, drawingFile?: File) => {
        setPhase('processing2');
        // If a drawing was submitted, update the preview to show the actual drawing
        if (drawingFile) {
            setDrawingPreview(URL.createObjectURL(drawingFile));
        }
        const chosenObj = choiceId ? choices.find(c => c.id === choiceId) : undefined;
        const chosenLabel = chosenObj ? chosenObj.label : 'Tôi đã chọn!';

        setSelectedChallengeChoice({
            label: chosenLabel,
            label_en: chosenObj ? chosenObj.label_en : 'My choice!',
            consequence: chosenObj?.consequence || 'Tuyệt vời, bé đã có một lựa chọn thật thú vị!',
            consequence_en: chosenObj?.consequence_en || 'Great job! You made a very interesting choice!'
        });
        setScenes(prev => [...prev, {
            narration: 'Thỏ Con đã có một cách tuyệt vời để giải quyết! Bỗng nhiên, từ đài phun nước kì lạ, một bác Rùa Hiền Hòa từ từ bò ra. "Ồ, chào cháu!" — Bác Rùa vẫy tay gọi. Bác ấy kể rằng đài phun nước bị kẹt nên nước không chảy nữa, và những người bạn cá nhỏ rùa nhỏ đang rất khát.',
            narration_en: 'Little Rabbit found a brilliant way to solve it! Suddenly, a Gentle Turtle slowly crawls out from the strange fountain. "Oh, hello there!" — the Turtle waves. They say the fountain is stuck, so water cannot flow, and all the little turtle and fish friends are very thirsty.',
            imageUrl: '/assets/story-ai/demo/scene-2.png',
            emotion: 'curious',
            kenBurns: 'pan-right',
            sceneDescription: 'Thỏ Con gặp Bác Rùa',
        }]);
        setEmpathyPrompt(`Bác Rùa và các bạn nhỏ cần sự giúp đỡ! Con muốn làm gì?`);
        setEmpathyPrompt_en(`The Turtle and friends need help! What do you want to do?`);
        setPhase('scene2');
    }, [choices]);

    /** Demo: simulate Act 3 response */
    const demoSubmitEmpathy = useCallback((choiceId: string) => {
        setPhase('processing3');
        const selected = empathyChoices.find(c => c.id === choiceId);

        setSelectedEmpathyChoice({
            label: selected ? selected.label : 'Bạn tự chọn',
            label_en: selected?.label_en,
            consequence: selected?.consequence || 'Một lựa chọn rất tốt bụng!',
            consequence_en: 'A very kind choice!'
        });
        setScenes(prev => [...prev, {
            narration: `Thỏ Con đã chọn "${selected?.label || 'giúp đỡ'}". Bác Rùa vô cùng vui mừng! Nhờ sự giúp đỡ của cậu, cuối cùng nước từ đài phun đã tuôn trào mát rượi trở lại. Cả bầy đàn thú nhỏ thỏa sức vẫy vùng thật vui sướng. Thỏ Con của chúng ta thật tử tế và đáng quý!`,
            narration_en: `Little Rabbit chose to "${selected?.label_en || 'help'}". Gentle Turtle is overjoyed! Thanks to his help, finally cool water bursts from the fountain once again. The little animals splash around happily. Our Little Rabbit is so kind and precious!`,
            imageUrl: '/assets/story-ai/demo/scene-3.png',
            emotion: 'happy',
            kenBurns: 'zoom-out',
            sceneDescription: 'Đài phun nước hoạt động trở lại',
        }]);
        setEarnedSticker(rewardSticker || 'Cà Rốt Vàng');
        setEarnedSticker_en(rewardSticker_en || 'Golden Carrot');
        setLessonConclusion({
            feedback: `Bé đã chọn "${selected?.label}". Lựa chọn này rất ý nghĩa vì nó cho thấy bé biết quan tâm và giúp đỡ người khác bằng chính khả năng của mình!`,
            feedback_en: `You chose "${selected?.label_en}". This is meaningful because it shows you care about others and use your own abilities to help!`,
            lesson: educationalGoal || 'Bài học hôm nay: Khi ta giúp đỡ bạn, thế giới trở nên tốt đẹp hơn!',
            lesson_en: educationalGoal_en || 'Today\'s lesson: When we help friends, the world becomes a better place!',
            pillar: pillar || 'eq',
        });
        setPhase('scene3');
    }, [rewardSticker, rewardSticker_en, empathyChoices, educationalGoal, educationalGoal_en, pillar]);

    // ─── Computed ────────────────────────────────────────────────────────────
    const currentScene = scenes.length > 0 ? scenes[scenes.length - 1] : null;
    const currentBiome = biomeId ? BIOMES.find(b => b.id === biomeId) : null;
    const currentGuardian = guardianId ? GUARDIANS.find(g => g.id === guardianId) : null;
    const currentBlueprint = blueprintId ? BLUEPRINTS.find(b => b.id === blueprintId) : null;
    const isProcessing = phase === 'uploading' || phase === 'processing2' || phase === 'processing3';

    return {
        // State
        phase, error, isProcessing,
        seed, title, characterName, characterDesign, drawingPreview,
        currentScene, scenes,
        currentBiome, currentGuardian, currentBlueprint,
        pillar,

        // Challenge
        challengePrompt, challengePrompt_en,
        interactionType, choices, drawInstruction, drawInstruction_en,

        // Empathy
        empathyPrompt, empathyPrompt_en, empathyChoices,
        selectedChallengeChoice, selectedEmpathyChoice,

        // Reward & Education
        earnedSticker, earnedSticker_en,
        rewardSticker, rewardSticker_en,
        educationalGoal, educationalGoal_en,
        lessonConclusion,

        // Actions
        startStory, advanceToChallenge,
        submitChallenge, advanceToEmpathy,
        submitEmpathy, advanceToComplete,
        reset, goBack,

        // Demo
        loadDemo, demoSubmitChallenge, demoSubmitEmpathy,

        // TTS
        isSpeaking, speakText, stopSpeaking,
        narratorLang, setNarratorLang, hasVietnameseVoice,
        audioEnabled, setAudioEnabled, toggleAudio,

        // Music
        isMusicPlaying, toggleMusic, startMusic, stopMusic,
    };
};
