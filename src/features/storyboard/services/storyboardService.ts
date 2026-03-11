import { StoryboardData } from '../types';

const API_URL = '/api/storyboard';

export const storyboardService = {
    async processDrawing(file: File): Promise<StoryboardData> {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('drawing', file);

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.error || 'Failed to process storyboard');

        return {
            story: data.story,
            drawingUrl: data.drawingUrl
        };
    }
};
