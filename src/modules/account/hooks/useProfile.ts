import { useState, useCallback, useEffect } from 'react';
import { ProfileData } from '../types';
import { profileService } from '../services/profileService';

export const useProfile = () => {
    const [data, setData] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const profileData = await profileService.getProfile();
            setData(profileData);
        } catch (err: any) {
            setError(err.message || 'Error fetching profile');
            console.error('fetchProfile error', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateProfile = async (updateData: any) => {
        setIsLoading(true);
        setError(null);
        try {
            await profileService.updateProfile(updateData);
            await fetchProfile(); // Refresh after update
            return { success: true };
        } catch (err: any) {
            const msg = err.message || 'Error updating profile';
            setError(msg);
            console.error('updateProfile error', err);
            return { success: false, error: msg };
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return {
        data,
        isLoading,
        error,
        updateProfile,
        refreshProfile: fetchProfile
    };
};
