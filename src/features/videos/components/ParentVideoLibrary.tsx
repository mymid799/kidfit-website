import React, { useState } from 'react';
import { useVideos } from '../hooks/useVideos';
import { VideoCard } from './VideoCard';

export const ParentVideoLibrary: React.FC = () => {
    const { videos, isLoading } = useVideos();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredVideos = videos.filter(vid =>
        vid.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto space-y-10">
            <section className="mb-12">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <div>
                        <h3 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary text-4xl">video_library</span>
                            Kho Học Liệu Của Bé
                        </h3>
                        <p className="text-slate-500 font-medium">Những bài giảng video thú vị dành riêng cho lớp của bé.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
                        <span className="material-symbols-outlined text-slate-400">search</span>
                        <input
                            type="text"
                            placeholder="Tìm bài học..."
                            className="bg-transparent border-none focus:outline-none text-sm w-40 md:w-60"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                        <p className="text-slate-400 font-bold animate-pulse">Đang chuẩn bị bài học...</p>
                    </div>
                ) : filteredVideos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                        <span className="material-symbols-outlined text-7xl text-slate-200 mb-4">movie_filter</span>
                        <p className="text-slate-500 font-bold text-lg">
                            {searchTerm ? 'Không tìm thấy video nào!' : 'Chưa có video học liệu nào cho lớp của bé.'}
                        </p>
                        <p className="text-slate-400 text-sm">Ba mẹ vui lòng quay lại sau nhé!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredVideos.map((vid) => (
                            <VideoCard key={vid.id} video={vid} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};
