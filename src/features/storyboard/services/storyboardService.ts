/**
 * Storyboard Service (v4.0 — Bridge to Multi-Agent Pipeline)
 */
import { API_BASE_URL } from '@/config/api';

const API_URL = `${API_BASE_URL}/api/storyboard`;

export interface MagicPipelineResult {
    story_id: number;
    drawingUrl: string;
}

export const storyboardService = {
    async processDrawing(file: File): Promise<MagicPipelineResult> {
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
        if (!data.success) throw new Error(data.error || 'Không thể xử lý bức vẽ');

        return {
            story_id: data.story_id,
            drawingUrl: data.drawingUrl
        };
    }
};
