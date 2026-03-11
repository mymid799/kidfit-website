export interface Video {
    id: number;
    title: string;
    description: string | null;
    file_path: string;
    thumbnail_path: string | null;
    target_class: string;
    teacher_id: number;
    created_at: string;
    updated_at: string;
    teacher?: {
        username: string;
    };
}

export interface UploadVideoData {
    title: string;
    description: string;
    target_class: string;
    file: File;
}
