import { Video } from '../types';

const API_URL = '/api/videos';

export const videoService = {
    async getVideos(): Promise<Video[]> {
        const token = localStorage.getItem('token');
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.error || 'Failed to fetch videos');
        return data.videos;
    },

    async uploadVideo(videoData: FormData): Promise<Video> {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: videoData
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.error || 'Failed to upload video');
        return data.video;
    },

    async deleteVideo(id: number): Promise<void> {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.error || 'Failed to delete video');
    }
};
