import { ARAnalyzeResponse, ARAnalysisResult } from '../types';
import { API_BASE_URL } from '@/config/api';

const API_URL = `${API_BASE_URL}/api/ar`;

// ─── API SERVICE ─────────────────────────────────────────────────────────────
export const arService = {
    /**
     * Send a base64 image + optional label to the backend for Gemini analysis.
     * Returns full analysis: identification, accuracy, feedback, 3D model, description.
     */
    async analyzeImage(imageDataUrl: string, label?: string): Promise<ARAnalysisResult> {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/analyze`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageData: imageDataUrl, label: label || '' }),
        });

        const data: ARAnalyzeResponse = await response.json();

        if (!data.success || !data.data) {
            throw new Error(data.error || 'Không thể phân tích hình ảnh');
        }

        return data.data;
    },
};
