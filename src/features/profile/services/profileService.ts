import { ProfileData } from '../types';

const API = 'http://localhost:3001/api';

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
});

export const profileService = {
    getProfile: async (): Promise<ProfileData> => {
        const res = await fetch(`${API}/profile`, { headers: getHeaders() });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch profile');
        return data;
    },

    updateProfile: async (data: any): Promise<any> => {
        const res = await fetch(`${API}/profile`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || 'Failed to update profile');
        return result;
    }
};
