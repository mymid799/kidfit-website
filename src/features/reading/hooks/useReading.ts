import { useState, useCallback } from 'react';
import { ReadingData } from '../types';
import { readingService } from '../services/readingService';

export const useReading = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<ReadingData | null>(null);
    const [error, setError] = useState<string | null>(null);

    // ─── Process Book Page ──────────────────────────────────────────────────
    const processBookPage = useCallback(async (file: File) => {
        setIsProcessing(true);
        setError(null);
        setResult(null);
        try {
            const data = await readingService.processBookPage(file);
            setResult(data);
            return { success: true, data };
        } catch (err: any) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsProcessing(false);
        }
    }, []);

    // ─── Reset ──────────────────────────────────────────────────────────────
    const reset = useCallback(() => {
        setResult(null);
        setError(null);
    }, []);

    // ─── TTS (Text-to-Speech) ───────────────────────────────────────────────
    const [isSpeaking, setIsSpeaking] = useState(false);

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

    const speak = useCallback((text: string, lang: 'vi' | 'en' = 'vi') => {
        window.speechSynthesis.cancel();

        const doSpeak = () => {
            const utterance = new SpeechSynthesisUtterance(text);

            if (lang === 'vi') {
                const viVoice = getVietnameseVoice();
                if (viVoice) utterance.voice = viVoice;
                utterance.lang = 'vi-VN';
                utterance.rate = 0.95;
                utterance.pitch = 1.15;
            } else {
                const enVoice = getEnglishVoice();
                if (enVoice) utterance.voice = enVoice;
                utterance.lang = 'en-US';
                utterance.rate = 0.85;
                utterance.pitch = 1.15;
            }

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            window.speechSynthesis.speak(utterance);
        };

        if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.onvoiceschanged = doSpeak;
        } else {
            doSpeak();
        }
    }, [getVietnameseVoice, getEnglishVoice]);

    const stopSpeaking = useCallback(() => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    }, []);

    return {
        // Processing
        isProcessing,
        result,
        error,
        processBookPage,
        reset,

        // TTS
        isSpeaking,
        speak,
        stopSpeaking,
    };
};
