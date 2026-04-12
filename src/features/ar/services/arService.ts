import { ARAnalyzeResponse, ARMultiResult, ARModelItem, ARFeedback } from '../types';
import { API_BASE_URL } from '@/config/api';

const API_URL = `${API_BASE_URL}/api/ar`;

// ─── API SERVICE ─────────────────────────────────────────────────────────────
export const arService = {
    /**
     * Send a base64 image + optional label to the backend for Gemini analysis.
     * Returns ARMultiResult with 1-4 identified models + shared feedback.
     * Always resolves to a valid result (graceful degradation built-in).
     */
    async analyzeImage(imageDataUrl: string, label?: string): Promise<ARMultiResult> {
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

        if (!data.success) {
            throw new Error(data.error || 'Không thể phân tích hình ảnh');
        }

        // ── New multi-object format ──────────────────────────────────────────
        if (data.results && Array.isArray(data.results) && data.results.length > 0) {
            return {
                items: data.results as ARModelItem[],
                feedback: data.feedback as ARFeedback,
            };
        }

        // ── Legacy single-object fallback (backward compat) ──────────────────
        if (data.data) {
            const d = data.data;
            const item: ARModelItem = {
                identified: d.identified,
                identifiedVi: d.identifiedVi,
                emoji: d.emoji,
                accuracy: d.accuracy,
                modelType: d.modelType,
                modelUrl: d.modelUrl,
                primaryColor: d.primaryColor,
                accentColor: d.accentColor,
                isInLibrary: d.isInLibrary,
            };
            const feedback: ARFeedback = {
                praise: d.praise,
                tip: d.tip,
                description: d.description,
                imagination: d.imagination,
                suggestions: d.suggestions ?? [],
            };
            return { items: [item], feedback };
        }

        throw new Error(data.error || 'Không thể phân tích hình ảnh');
    },
};
