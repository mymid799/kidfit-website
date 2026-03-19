import { API_BASE_URL } from '@/config/api';

export interface GalleryItem {
    id: number;
    title: string;
    description: string | null;
    file_path: string;
    module: string | null;
    lesson: string | null;
    target_class: string;
    date: Date | null;
    teacher_id: number;
    has_video: boolean;
    created_at?: Date;
    updated_at?: Date;
}

const API_URL = `${API_BASE_URL}/api/gallery`;

export const galleryService = {
    async getItems(): Promise<GalleryItem[]> {
        const token = localStorage.getItem('token');
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.error || 'Failed to fetch gallery items');
        return data.items;
    },

    async uploadImage(formData: FormData): Promise<GalleryItem> {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.error || 'Failed to upload image');
        return data.gallery;
    },

    async deleteImage(id: number): Promise<void> {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.error || 'Failed to delete image');
    }
};
