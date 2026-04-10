/**
 * Storyboard Service (v4.0 — Multi-Agent Bridge)
 * Gọi API cũ nhưng giờ đây API trả về story_id từ Orchestrator.
 */
import { API_BASE_URL } from '@/shared/services/api';

export interface MagicPipelineResult {
    story_id: number;
    drawingUrl: string;
}

export const storyboardService = {
    async processDrawing(file: File): Promise<MagicPipelineResult> {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('drawing', file);

        const response = await fetch(`${API_BASE_URL}/api/storyboard`, {
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
