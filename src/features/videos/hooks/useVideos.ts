import { useState, useEffect, useCallback } from 'react';
import { Video } from '../types';
import { videoService } from '../services/videoService';

export const useVideos = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchVideos = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await videoService.getVideos();
            setVideos(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteVideo = async (id: number) => {
        try {
            await videoService.deleteVideo(id);
            setVideos(prev => prev.filter(v => v.id !== id));
            return { success: true };
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    };

    useEffect(() => {
        fetchVideos();
    }, [fetchVideos]);

    return {
        videos,
        isLoading,
        error,
        refreshVideos: fetchVideos,
        deleteVideo
    };
};
