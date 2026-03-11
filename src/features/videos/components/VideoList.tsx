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
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="font-bold text-lg text-slate-800">Video đã tải lên</h3>
            </div>
            <div className="overflow-x-auto">
                {isLoading ? (
                    <div className="p-12 text-center text-slate-400">Đang tải dữ liệu...</div>
                ) : videos.length === 0 ? (
                    <div className="p-12 text-center text-slate-400">Chưa có video nào được tải lên.</div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold">Tiêu đề / Lớp</th>
                                <th className="px-6 py-4 font-bold">Ngày đăng</th>
                                <th className="px-6 py-4 font-bold text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {videos.map((vid) => (
                                <VideoItem key={vid.id} video={vid} onDelete={onDelete} />
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};
