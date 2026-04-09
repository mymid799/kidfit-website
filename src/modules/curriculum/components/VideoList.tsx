import React from 'react';
import { Video } from '../types';
import { VideoItem } from './VideoItem';

interface VideoListProps {
    videos: Video[];
    isLoading: boolean;
    onDelete: (id: number) => void;
}

export const VideoList: React.FC<VideoListProps> = ({ videos, isLoading, onDelete }) => {
    return (
        <div className="bg-transparent rounded-3xl overflow-hidden mt-6">
            <div className="flex items-center justify-between mb-8 px-2">
                <h3 className="font-bold text-xl text-slate-800">Thư viện Video đã tải lên ({videos.length})</h3>
                <div className="flex gap-2">
                    <button className="p-2 border border-slate-200 text-slate-400 hover:text-slate-800 flex items-center justify-center transition-colors rounded-xl bg-white"><span className="material-symbols-outlined text-xl">grid_view</span></button>
                    <button className="p-2 border border-slate-200 text-slate-400 hover:text-slate-800 flex items-center justify-center transition-colors rounded-xl bg-white"><span className="material-symbols-outlined text-xl">filter_list</span></button>
                </div>
            </div>
            
            <div className="overflow-x-visible">
                {isLoading ? (
                    <div className="p-16 text-center text-slate-400 font-bold text-lg bg-white rounded-[32px] border border-slate-100 shadow-sm">Đang tải dữ liệu...</div>
                ) : videos.length === 0 ? (
                    <div className="p-16 text-center text-slate-400 font-bold text-lg bg-white rounded-[32px] border border-slate-100 shadow-sm">Chưa có video nào được tải lên.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
                        {videos.map((vid) => (
                            <div key={vid.id} className="bg-white rounded-[32px] p-5 shadow-sm hover:-translate-y-1 transition-all duration-300 border border-slate-100 group flex flex-col hover:shadow-xl">
                                <div className="aspect-video bg-slate-900 rounded-[24px] mb-5 overflow-hidden relative cursor-pointer" onClick={() => window.open(vid.file_path, '_blank')}>
                                    <video className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" src={vid.file_path} />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white ring-2 ring-white/50 group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                                        </div>
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-xl text-xs font-black text-white uppercase tracking-widest">{vid.target_class}</span>
                                    </div>
                                </div>
                                <div className="flex-1 px-1">
                                    <h4 className="font-black text-slate-800 truncate mb-2 text-[17px]">{vid.title}</h4>
                                    <p className="text-[13px] text-slate-500 font-medium line-clamp-2 h-10">{vid.description || "Không có mô tả cho video bài giảng này."}</p>
                                </div>
                                <div className="mt-5 pt-4 border-t border-slate-100/80 flex items-center justify-between px-1">
                                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[15px]">event</span>
                                        {new Date(vid.created_at).toLocaleDateString('vi-VN')}
                                    </p>
                                    <div className="flex gap-2">
                                        <button onClick={() => window.open(vid.file_path, '_blank')} className="p-2.5 bg-slate-50 text-slate-400 hover:text-primary transition-colors rounded-xl font-bold flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                                        <button onClick={() => onDelete(vid.id)} className="p-2.5 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors rounded-xl font-bold flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
