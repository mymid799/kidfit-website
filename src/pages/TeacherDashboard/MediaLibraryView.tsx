import React, { useState } from 'react';
import GalleryManagement from '../../features/gallery/components/GalleryManagement';
import { VideoList, VideoUploadForm, useVideos } from '../../features/videos';

const VideoManagementInternal = () => {
    const { videos, isLoading, refreshVideos, deleteVideo } = useVideos();

    const handleDelete = async (id: number) => {
        if (!confirm('Bạn có chắc chắn muốn xoá video này?')) return;
        const result = await deleteVideo(id);
        if (!result.success) {
            alert(result.error || 'Lỗi khi xoá video!');
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <section className="lg:col-span-1 space-y-6">
                    <VideoUploadForm onUploadSuccess={refreshVideos} />
                </section>
                <section className="lg:col-span-2 space-y-8">
                    <VideoList
                        videos={videos}
                        isLoading={isLoading}
                        onDelete={handleDelete}
                    />
                </section>
            </div>
        </div>
    );
};

export default function MediaLibraryView() {
    const [subTab, setSubTab] = useState<'photos' | 'videos'>('photos');

    return (
        <div className="max-w-7xl mx-auto pb-12">
            <div className="mb-8 flex flex-col md:flex-row justify-between md:items-end gap-6">
                <div>
                    <h2 className="text-3xl font-black tracking-tight mb-2 text-slate-800">Thư viện Media</h2>
                    <p className="text-slate-500 font-bold">Quản lý toàn bộ hình ảnh và video bài giảng tại một nơi duy nhất.</p>
                </div>
                <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
                    <button
                        onClick={() => setSubTab('photos')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
                            subTab === 'photos'
                                ? 'bg-primary text-white shadow-md'
                                : 'text-slate-500 hover:text-primary hover:bg-slate-50'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>photo_library</span>
                        Ảnh & Album
                    </button>
                    <button
                        onClick={() => setSubTab('videos')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
                            subTab === 'videos'
                                ? 'bg-primary text-white shadow-md'
                                : 'text-slate-500 hover:text-primary hover:bg-slate-50'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>movie</span>
                        Video Bài giảng
                    </button>
                </div>
            </div>

            <div className="w-full">
                {subTab === 'photos' && <GalleryManagement isEmbedded={true} />}
                {subTab === 'videos' && <VideoManagementInternal />}
            </div>
        </div>
    );
}
