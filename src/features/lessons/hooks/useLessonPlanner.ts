import { useState } from 'react';
import { lessonService } from '../services/lessonService';

export const useLessonPlanner = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const generateLesson = async (params: {
        topic: string;
        ageGroup: string;
        duration: string;
        activityCount: number;
        document?: File;
    }) => {
        setIsGenerating(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('topic', params.topic);
            formData.append('ageGroup', params.ageGroup);
            formData.append('duration', params.duration);
            formData.append('activityCount', params.activityCount.toString());
            if (params.document) {
                formData.append('document', params.document);
            }

            const data = await lessonService.generateLesson(formData);
            setResult(data);
            return { success: true, data };
        } catch (err: any) {
            const msg = err.message || 'Error generating lesson';
            setError(msg);
            return { success: false, error: msg };
        } finally {
            setIsGenerating(false);
        }
    };

    const reset = () => {
        setResult(null);
        setError(null);
    };

    return {
        isGenerating,
        result,
        error,
        generateLesson,
        reset
    };
};
