import { ProfileData } from '../types';
import { authenticatedFetch } from '../../auth/services/authService';
import { API_BASE_URL } from '@/shared/services/api';

const API = `${API_BASE_URL}/api`;

export const profileService = {
    getProfile: async (): Promise<ProfileData> => {
        const res = await authenticatedFetch(`${API}/profile`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch profile');
        return data;
    },

    updateProfile: async (data: any): Promise<any> => {
        const res = await authenticatedFetch(`${API}/profile`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || 'Failed to update profile');
        return result;
    }
};
