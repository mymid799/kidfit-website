import { StoryboardData } from '../types';
import { API_BASE_URL } from '@/config/api';

const API_URL = `${API_BASE_URL}/api/storyboard`;

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
            title: data.title,
            characterDesign: data.characterDesign || '',
            scenes: data.scenes,
            drawingUrl: data.drawingUrl
        };
    }
};
