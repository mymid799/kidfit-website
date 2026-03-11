import { Staff, CreateStaffData, UpdateStaffData } from '../types';

const API_URL = '/api/staff';

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
});

export const staffService = {
    async getStaff(): Promise<Staff[]> {
        const res = await fetch(API_URL, { headers: getHeaders() });
        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Failed to fetch staff');
        return data.staff;
    },

    async createStaff(staffData: CreateStaffData): Promise<Staff> {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(staffData),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Failed to create staff');
        return data.staff;
    },

    async updateStaff(staffData: UpdateStaffData): Promise<Staff> {
        const res = await fetch(`${API_URL}/${staffData.id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(staffData),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Failed to update staff');
        return data.staff;
    },

    async deleteStaff(id: number): Promise<void> {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Failed to delete staff');
    },
};
