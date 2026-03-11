import React, { useState } from 'react';
import { useUploadVideo } from '../hooks/useUploadVideo';

interface VideoUploadFormProps {
    onUploadSuccess: () => void;
}

export const VideoUploadForm: React.FC<VideoUploadFormProps> = ({ onUploadSuccess }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [targetClass, setTargetClass] = useState('Mầm A1');
    const [file, setFile] = useState<File | null>(null);

    const { uploadVideo, isUploading } = useUploadVideo(() => {
        alert('Tải lên thành công!');
        setTitle('');
        setDescription('');
        setFile(null);
        onUploadSuccess();
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !title) {
            alert('Vui lòng nhập tiêu đề và chọn file video!');
            return;
        }

        const formData = new FormData();
        formData.append('video', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('target_class', targetClass);

        const result = await uploadVideo(formData);
        if (!result.success) {
            alert(result.error || 'Lỗi khi tải lên!');
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
                <span className="material-symbols-outlined text-primary">upload_file</span>
                Tải lên Video mới
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1.5 text-slate-700">Tiêu đề bài giảng</label>
                    <input
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all focus:outline-none"
                        placeholder="Nhập tên bài giảng..."
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1.5 text-slate-700">Lớp học mục tiêu</label>
                    <select
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all focus:outline-none"
                        value={targetClass}
                        onChange={(e) => setTargetClass(e.target.value)}
                    >
                        <option value="Mầm A1">Lớp Mầm Sáng Tạo A1</option>
                        <option value="Chồi B2">Lớp Chồi Khám Phá B2</option>
                        <option value="Lá C1">Lớp Lá Tài Năng C1</option>
                        <option value="Mầm">Tất cả Lớp Mầm</option>
                        <option value="Chồi">Tất cả Lớp Chồi</option>
                        <option value="Lá">Tất cả Lớp Lá</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1.5 text-slate-700">Mô tả nội dung</label>
                    <textarea
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none focus:outline-none"
                        placeholder="Nhập nội dung tóm tắt..."
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1.5 text-slate-700">File Video</label>
                    <div className="border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center hover:bg-primary/5 transition-all cursor-pointer group bg-slate-50 relative overflow-hidden">
                        <span className="material-symbols-outlined text-4xl text-primary/50 group-hover:scale-110 transition-transform mb-2">cloud_upload</span>
                        <p className="text-sm font-medium text-slate-700">{file ? file.name : 'Kéo thả file vào đây'}</p>
                        <p className="text-xs text-slate-400 mt-1">Hỗ trợ MP4, MKV (Tối đa 500MB)</p>
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="video/*"
                            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isUploading}
                    className={`w-full py-3 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all mt-2 flex items-center justify-center gap-2 ${isUploading ? 'opacity-70' : ''}`}
                >
                    {isUploading ? <div className="size-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : 'Bắt đầu tải lên'}
                </button>
            </form>
        </div>
    );
};
