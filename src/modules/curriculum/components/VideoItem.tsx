import React from 'react';
import { Video } from '../types';

interface VideoItemProps {
    video: Video;
    onDelete: (id: number) => void;
}

export const VideoItem: React.FC<VideoItemProps> = ({ video, onDelete }) => {
    return (
        <tr className="hover:bg-slate-50:bg-slate-800 transition-colors group">
            <td className="px-8 py-5">
                <div className="flex items-center gap-4">
                    <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                        <span className="material-symbols-outlined text-3xl">movie</span>
                    </div>
                    <div>
                        <p className="font-black text-lg text-slate-700">{video.title}</p>
                        <p className="text-xs text-primary font-black uppercase tracking-widest mt-0.5">{video.target_class}</p>
                    </div>
                </div>
            </td>
            <td className="px-8 py-5 text-base font-bold text-slate-500">
                {new Date(video.created_at).toLocaleDateString('vi-VN')}
            </td>
            <td className="px-8 py-5 text-right">
                <div className="flex justify-end gap-3">
                    <a
                        href={video.file_path}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 bg-slate-100 hover:bg-primary/10 rounded-xl transition-all text-slate-400 hover:text-primary"
                    >
                        <span className="material-symbols-outlined text-2xl">visibility</span>
                    </a>
                    <button
                        onClick={() => onDelete(video.id)}
                        className="p-3 bg-slate-100 hover:bg-red-50 rounded-xl transition-all text-slate-400 hover:text-red-500"
                    >
                        <span className="material-symbols-outlined text-2xl">delete</span>
                    </button>
                </div>
            </td>
        </tr>
    );
};
