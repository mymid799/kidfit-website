/**
 * useStoryboard Hook (v4.0 — Multi-Agent Redirect)
 * Sau khi upload thành công, tự động chuyển hướng sang
 * trang kết quả mới có thanh tiến trình realtime.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storyboardService } from '../services/storyboardService';

export const useStoryboard = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const processDrawing = async (file: File) => {
        setIsProcessing(true);
        setError(null);
        try {
            const result = await storyboardService.processDrawing(file);
            navigate(`/magic-story/${result.story_id}`);
            return { success: true };
        } catch (err: any) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsProcessing(false);
        }
    };

    const reset = () => {
        setError(null);
    };

    return {
        isProcessing,
        error,
        processDrawing,
        reset,
    };
};
