export type StaffStatus = 'active' | 'on_leave' | 'suspended';

export interface Staff {
    id: number;
    user_id: number;
    employee_id: string;
    full_name: string;
    avatar_url?: string;
    class_group?: string;
    position: string;
    qualification?: string;
    status: StaffStatus;
    phone?: string;
    created_at: string;
    user: {
        username: string;
        email: string;
        is_active: boolean;
        email_verified: boolean;
        role: string;
    };
}

export interface CreateStaffData {
    username: string;
    email: string;
    password?: string;
    role: 'teacher' | 'admin';
    employee_id: string;
    full_name: string;
    class_group?: string;
    position: string;
    qualification?: string;
    status: StaffStatus;
    phone?: string;
}

export interface UpdateStaffData extends Partial<CreateStaffData> {
    id: number;
    is_active?: boolean;
}
