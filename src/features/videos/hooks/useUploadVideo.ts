import { useState } from 'react';
import { videoService } from '../services/videoService';

export const useUploadVideo = (onSuccess?: () => void) => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadVideo = async (formData: FormData) => {
        setIsUploading(true);
        setError(null);
        try {
            await videoService.uploadVideo(formData);
            if (onSuccess) onSuccess();
            return { success: true };
        } catch (err: any) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsUploading(false);
        }
    };

    return {
        uploadVideo,
        isUploading,
        error
    };
};
