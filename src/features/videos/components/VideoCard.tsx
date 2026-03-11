import React from 'react';
import { Video } from '../types';

interface VideoCardProps {
    video: Video;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    return (
        <div className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                    {/* Mock Thumbnail / Video Icon if no thumbnail_path */}
                    <span className="material-symbols-outlined text-6xl text-white/20">play_circle</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a
                        href={video.file_path}
                        target="_blank"
                        rel="noreferrer"
                        className="size-16 bg-primary text-white rounded-full flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-all duration-300"
                    >
                        <span className="material-symbols-outlined text-4xl">play_arrow</span>
                    </a>
                </div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-primary uppercase border border-primary/10 tracking-widest">
                    {video.target_class}
                </div>
            </div>
            <div className="p-7">
                <div className="flex items-center gap-2 mb-3">
                    <span className="size-2 bg-primary rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bài giảng mới</span>
                </div>
                <h4 className="font-bold text-xl text-slate-800 mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {video.title}
                </h4>
                <p className="text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed">
                    {video.description || 'Khám phá bài học thú vị cùng giáo viên.'}
                </p>

                <div className="pt-5 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <span className="material-symbols-outlined text-xl">person</span>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Giảng viên</p>
                            <p className="text-xs font-bold text-slate-700">{video.teacher?.username || 'Giáo viên'}</p>
                        </div>
                    </div>
                    <button className="text-primary font-black text-[10px] uppercase tracking-widest hover:underline">
                        Chi tiết
                    </button>
                </div>
            </div>
        </div>
    );
};
