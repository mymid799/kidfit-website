import { useState, useCallback, useEffect } from 'react';
import { Staff, CreateStaffData, UpdateStaffData } from '../types';
import { staffService } from '../services/staffService';

export const useStaff = () => {
    const [staffList, setStaffList] = useState<Staff[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchStaff = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await staffService.getStaff();
            setStaffList(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStaff();
    }, [fetchStaff]);

    const addStaff = async (data: CreateStaffData) => {
        try {
            const newStaff = await staffService.createStaff(data);
            setStaffList(prev => [newStaff, ...prev]);
            return { success: true, data: newStaff };
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    };

    const updateStaff = async (data: UpdateStaffData) => {
        try {
            const updatedStaff = await staffService.updateStaff(data);
            setStaffList(prev => prev.map(s => s.id === data.id ? updatedStaff : s));
            return { success: true, data: updatedStaff };
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    };

    const deleteStaff = async (id: number) => {
        try {
            await staffService.deleteStaff(id);
            setStaffList(prev => prev.filter(s => s.id !== id));
            return { success: true };
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    };

    return {
        staffList,
        isLoading,
        error,
        refreshStaff: fetchStaff,
        addStaff,
        updateStaff,
        deleteStaff,
    };
};
