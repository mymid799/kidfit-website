export interface Certificate {
    id?: string;
    name: string;
    issue_date: string;
    file_url?: string;
}

export interface Profile {
    id: number;
    user_id: number;
    employee_id: string;
    full_name: string;
    avatar_url?: string;
    position: string;
    phone?: string;
    bio?: string;
    teaching_classes?: string[];
    certificates?: Certificate[];
}

export interface UserInfo {
    id: number;
    username: string;
    email: string;
    role: string;
}

export interface ProfileData {
    user: UserInfo;
    profile: Profile;
}
