import { ReadingData } from '../types';
import { API_BASE_URL } from '@/config/api';

const API_URL = `${API_BASE_URL}/api/reading`;

export const readingService = {
    async processBookPage(file: File): Promise<ReadingData> {
        const formData = new FormData();
        formData.append('bookPage', file);

        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.error || 'Failed to process book page');

        return {
            ...data.data,
            imageUrl: data.imageUrl,
        };
    }
};
