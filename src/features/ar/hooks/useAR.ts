import { useState, useCallback, useEffect } from 'react';
import { ARState, ARAnalysisResult } from '../types';
import { arService } from '../services/arService';

interface UseARReturn {
    state: ARState;
    setLabel: (label: string) => void;
    setImagePreview: (preview: string | null) => void;
    analyzeImage: (imageDataUrl: string) => Promise<void>;
    loadDemo: () => void;
    reset: () => void;
}

const INITIAL_STATE: ARState = {
    status: 'idle',
    result: null,
    error: null,
    imagePreview: null,
    label: '',
};

const DEMO_RESULT: ARAnalysisResult = {
    identified: 'cat',
    identifiedVi: 'Mèo',
    emoji: '🐱',
    accuracy: 78,
    praise: 'Ôi, bạn vẽ đôi mắt tròn xoe dễ thương quá! Cái đuôi cong cong trông rất giống mèo thật đấy!',
    tip: 'Thử vẽ thêm 3 sợi râu mỗi bên mũi nhé — mèo dùng râu để đo xem có chui vừa khe hẹp không đấy!',
    description: 'Mèo có thể xoay tai 180 độ như cái ra-đa! Chúng ngủ tới 16 tiếng mỗi ngày — nhiều hơn cả bạn nữa đấy! Mèo luôn tiếp đất bằng 4 chân khi rơi xuống!',
    imagination: 'Thử tưởng tượng nếu chú mèo này biết bay thì sao nhỉ? Bạn thử vẽ cho mèo đôi cánh bướm xem nào — một chú mèo bướm siêu đáng yêu!',
    modelType: 'glb',
    modelUrl: '/assets/ar-models/cc-by/Cat.glb',
    primaryColor: '#FF8C69',
    accentColor: '#FFD1BA',
    isInLibrary: true,
    suggestions: [],
};

export function useAR(): UseARReturn {
    const [state, setState] = useState<ARState>(INITIAL_STATE);

    // Warn the browser before tab close / navigation when a result is active
    useEffect(() => {
        if (state.status !== 'result') return;
        const onBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = '';
        };
        window.addEventListener('beforeunload', onBeforeUnload);
        return () => window.removeEventListener('beforeunload', onBeforeUnload);
    }, [state.status]);

    const setLabel = useCallback((label: string) => {
        setState(prev => ({ ...prev, label }));
    }, []);

    const setImagePreview = useCallback((preview: string | null) => {
        setState(prev => ({ ...prev, imagePreview: preview, error: null }));
    }, []);

    const analyzeImage = useCallback(async (imageDataUrl: string) => {
        setState(prev => ({ ...prev, status: 'analyzing', error: null }));

        try {
            const result: ARAnalysisResult = await arService.analyzeImage(
                imageDataUrl,
                state.label || undefined,
            );

            setState(prev => ({
                ...prev,
                status: 'result',
                result,
                error: null,
            }));
        } catch (err: any) {
            setState(prev => ({
                ...prev,
                status: 'error',
                error: err.message || 'Lỗi khi phân tích. Vui lòng thử lại!',
            }));
        }
    }, [state.label]);

    const loadDemo = useCallback(() => {
        setState({
            status: 'result',
            result: DEMO_RESULT,
            error: null,
            imagePreview: null,
            label: 'con mèo',
        });
    }, []);

    const reset = useCallback(() => {
        setState(INITIAL_STATE);
    }, []);

    return { state, setLabel, setImagePreview, analyzeImage, loadDemo, reset };
}
