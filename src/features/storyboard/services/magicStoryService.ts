/**
 * AI Magic Story — Frontend API Service
 * Handles communication with the 3 interactive story endpoints.
 */

import { API_BASE_URL } from '@/config/api';
import type { MagicSceneData } from '../types';

const API = `${API_BASE_URL}/api/story`;

/** Helper to get auth token */
const getToken = () => localStorage.getItem('token');

/** Helper to build auth headers */
const authHeaders = (): Record<string, string> => {
    const token = getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// ─── Response types from the API ─────────────────────────────────────────────

export interface StartStoryResponse {
    success: boolean;
    seed: number;
    blueprint: {
        id: string;
        name: string;
        pillar: string;
        interactionType: 'draw' | 'choice';
        challengePrompt: string;
        challengePrompt_en: string;
        choices: { id: string; icon?: string; label: string; label_en?: string; consequence?: string; consequence_en?: string }[] | null;
        drawInstruction: string | null;
        drawInstruction_en: string | null;
        empathyChoices: { id: string; icon: string; label: string; label_en?: string; consequence?: string }[];
        educationalGoal: string;
        educationalGoal_en: string;
        rewardSticker: string;
        rewardSticker_en: string;
    };
    biome: { id: string; name: string };
    guardian: { id: string; name: string; icon: string };
    title: string;
    characterName: string;
    characterDesign: string;
    scene: MagicSceneData;
    drawingUrl: string;
    error?: string;
}

export interface Act2Response {
    success: boolean;
    scene: MagicSceneData;
    empathy: {
        prompt: string;
        prompt_en: string;
        choices: { id: string; icon: string; label: string; label_en: string }[];
    };
    error?: string;
}

export interface Act3Response {
    success: boolean;
    scene: MagicSceneData;
    reward: {
        sticker: string;
        sticker_en: string;
    };
    lessonConclusion: {
        feedback: string;
        feedback_en: string;
        lesson: string;
        lesson_en: string;
        pillar: string;
    };
    error?: string;
}

// ─── Magic Story API Service ─────────────────────────────────────────────────

export const magicStoryService = {
    /**
     * Act 1: Upload drawing → AI identifies character → Scene 1 + blueprint
     */
    async startStory(drawingFile: File): Promise<StartStoryResponse> {
        const formData = new FormData();
        formData.append('drawing', drawingFile);

        const response = await fetch(`${API}/start`, {
            method: 'POST',
            headers: authHeaders(),
            body: formData,
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.error || 'Failed to start story');
        return data;
    },

    /**
     * Act 2: Submit challenge answer (choice or drawing) → Scene 2 + empathy question
     */
    async submitAct2(params: {
        seed: number;
        biomeId: string;
        characterDesign: string;
        characterName: string;
        blueprintId: string;
        challengeChoice?: string;
        challengeDrawing?: File;
    }): Promise<Act2Response> {
        const formData = new FormData();
        formData.append('seed', String(params.seed));
        formData.append('biomeId', params.biomeId);
        formData.append('characterDesign', params.characterDesign);
        formData.append('characterName', params.characterName);
        formData.append('blueprintId', params.blueprintId);

        if (params.challengeChoice) {
            formData.append('challengeChoice', params.challengeChoice);
        }
        if (params.challengeDrawing) {
            formData.append('challengeDrawing', params.challengeDrawing);
        }

        const response = await fetch(`${API}/act2`, {
            method: 'POST',
            headers: authHeaders(),
            body: formData,
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.error || 'Failed to generate Act 2');
        return data;
    },

    /**
     * Act 3: Submit empathy choice → Scene 3 (resolution + reward sticker)
     */
    async submitAct3(params: {
        seed: number;
        biomeId: string;
        characterDesign: string;
        characterName: string;
        empathyChoice: string;
        empathyConsequence: string;
        historySummary: string;
        guardianId: string;
        rewardSticker: string;
        rewardSticker_en: string;
        blueprintId: string;
        educationalGoal: string;
        educationalGoal_en: string;
    }): Promise<Act3Response> {
        const response = await fetch(`${API}/act3`, {
            method: 'POST',
            headers: {
                ...authHeaders(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.error || 'Failed to generate Act 3');
        return data;
    },
};
