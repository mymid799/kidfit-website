import { useState } from 'react';
import { StoryboardData } from '../types';
import { storyboardService } from '../services/storyboardService';

export const useStoryboard = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<StoryboardData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const processDrawing = async (file: File) => {
        setIsProcessing(true);
        setError(null);
        try {
            const data = await storyboardService.processDrawing(file);
            setResult(data);
            return { success: true, data };
        } catch (err: any) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsProcessing(false);
        }
    };

    const reset = () => {
        setResult(null);
        setError(null);
    };

    const speakStory = () => {
        if (!result?.story) return;
        const utterance = new SpeechSynthesisUtterance(result.story);
        utterance.lang = 'vi-VN';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    return {
        isProcessing,
        result,
        error,
        processDrawing,
        reset,
        speakStory
    };
};
