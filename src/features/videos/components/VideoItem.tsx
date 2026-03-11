import React from 'react';
import { Video } from '../types';

interface VideoItemProps {
    video: Video;
    onDelete: (id: number) => void;
}

export const VideoItem: React.FC<VideoItemProps> = ({ video, onDelete }) => {
    return (
        <tr className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary">movie</span>
                    </div>
                    <div>
                        <p className="font-bold text-slate-700">{video.title}</p>
                        <p className="text-[10px] text-primary font-bold uppercase">{video.target_class}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 text-sm font-medium text-slate-500">
                {new Date(video.created_at).toLocaleDateString('vi-VN')}
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                    <a
                        href={video.file_path}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-primary"
                    >
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </a>
                    <button
                        onClick={() => onDelete(video.id)}
                        className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                </div>
            </td>
        </tr>
    );
};
