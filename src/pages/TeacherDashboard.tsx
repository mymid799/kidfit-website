import React, { useState } from 'react';
import AIStoryboardTab from '../components/AIStoryboardTab';
import { EditProfile, useProfile } from '../features/profile';

import { VideoList, VideoUploadForm, useVideos } from '@/features/videos';

const VideoManagement = () => {
    const { videos, isLoading, refreshVideos, deleteVideo } = useVideos();

    const handleDelete = async (id: number) => {
        if (!confirm('Bạn có chắc chắn muốn xoá video này?')) return;
        const result = await deleteVideo(id);
        if (!result.success) {
            alert(result.error || 'Lỗi khi xoá video!');
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12">
            <div className="mb-8 flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight mb-2 text-slate-900">Quản Lý Video</h2>
                    <p className="text-slate-500">Tải lên, tổ chức và quản lý nội dung bài giảng của bạn một cách chuyên nghiệp.</p>
                </div>
            </div>

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

export default function TeacherDashboard() {
    const [activeTab, setActiveTab] = useState('classes'); // Default to lessons for immediately viewing new changes
    const { data: profileData, refreshProfile } = useProfile();

    const staff = profileData?.profile;

    return (
        <div className="flex h-screen bg-background-light text-slate-900 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-20 md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-300 z-20">
                <div className="flex flex-col h-full">
                    <div className="h-20 flex flex-col items-center justify-center md:items-start md:px-6 border-b border-slate-100 gap-1">
                        <img src="/assets/logo/mainlogo.png" alt="Vẽ Tư Duy STEAM" className="h-8 w-auto object-contain" />
                        <span className="hidden md:block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 font-sans">Giáo viên</span>
                    </div>

                    <nav className="flex-1 py-6 px-3 flex flex-col gap-2 overflow-y-auto hide-scrollbar">
                        <button
                            onClick={() => setActiveTab('classes')}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'classes' ? 'bg-secondary/10 text-secondary font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
                        >
                            <span className="material-symbols-outlined text-2xl">groups</span>
                            <span className="hidden md:block">Lớp Học</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('lessons')}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'lessons' ? 'bg-primary/10 text-primary font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
                        >
                            <span className="material-symbols-outlined text-2xl">video_settings</span>
                            <span className="hidden md:block">Quản Lý Video</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('submissions')}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'submissions' ? 'bg-accent/10 text-accent font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
                        >
                            <span className="material-symbols-outlined text-2xl">assignment_turned_in</span>
                            <span className="hidden md:block">Chấm Bài</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('reports')}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'reports' ? 'bg-secondary/10 text-secondary font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
                        >
                            <span className="material-symbols-outlined text-2xl">analytics</span>
                            <span className="hidden md:block">Báo Cáo</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('storyboard')}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'storyboard' ? 'bg-primary/10 text-primary font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
                        >
                            <span className="material-symbols-outlined text-2xl">auto_fix_high</span>
                            <span className="hidden md:block">AI Storyboard</span>
                        </button>
                    </nav>

                    <div className="p-4 border-t border-slate-100 flex flex-col gap-2">
                        <a href="/" className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-red-500 font-medium transition-all">
                            <span className="material-symbols-outlined text-xl">logout</span>
                            <span className="hidden md:block text-sm">Về Landing Page</span>
                        </a>
                        <div
                            onClick={() => setActiveTab('profile')}
                            className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-colors ${activeTab === 'profile' ? 'bg-primary/10 border border-primary/20' : 'hover:bg-slate-50 border border-transparent'}`}
                        >
                            <img src={staff?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"} alt="Avatar" className="size-10 rounded-full bg-slate-200 border-2 border-white shadow-sm shrink-0 object-cover" />
                            <div className="hidden md:block overflow-hidden">
                                <p className="text-sm font-bold text-slate-900 truncate">{staff?.full_name || 'Đang tải...'}</p>
                                <p className="text-xs text-slate-500 truncate">{staff?.position || 'Giáo viên STEAM'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 md:px-10 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-black text-slate-900">
                            {activeTab === 'classes' && 'Tổng Quan Lớp Học'}
                            {activeTab === 'lessons' && 'Nội Dung Đào Tạo'}
                            {activeTab === 'submissions' && 'Chấm Bài'}
                            {activeTab === 'reports' && 'Báo Cáo'}
                            {activeTab === 'storyboard' && 'AI Storyboard: Phép màu từ nét vẽ'}
                            {activeTab === 'profile' && 'Cập nhật tài khoản'}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-full font-bold shadow-md shadow-secondary/20 hover:bg-secondary/90 transition-colors">
                            <span className="material-symbols-outlined text-xl">add</span>
                            <span>Tạo Lớp Mới</span>
                        </button>
                        <button className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors relative">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-slate-100"></span>
                        </button>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 hide-scrollbar">
                    {activeTab === 'classes' && (
                        <div className="max-w-6xl mx-auto space-y-10">

                            {/* Stats Overview */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                                    <div className="size-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-3xl">groups</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-500 mb-1">Tổng Học Sinh</p>
                                        <p className="text-3xl font-black text-slate-900">124</p>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                                    <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-3xl">assignment_turned_in</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-500 mb-1">Bài Tập Cần Chấm</p>
                                        <p className="text-3xl font-black text-slate-900">32</p>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                                    <div className="size-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-3xl">trending_up</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-500 mb-1">Tỷ Lệ Hoàn Thành</p>
                                        <p className="text-3xl font-black text-slate-900">85%</p>
                                    </div>
                                </div>
                            </div>

                            {/* Class List */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-black text-slate-900">Danh Sách Lớp</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                                            <input type="text" placeholder="Tìm lớp..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary w-48 transition-all" />
                                        </div>
                                        <button className="p-2 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 transition-colors">
                                            <span className="material-symbols-outlined text-xl">filter_list</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Class Card 1 */}
                                    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-md uppercase">Lớp Mầm</span>
                                                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-md">Sáng T3, T5</span>
                                                </div>
                                                <h4 className="text-xl font-bold text-slate-900">Lớp Mầm Sáng Tạo A1</h4>
                                            </div>
                                            <button className="text-slate-400 hover:text-secondary transition-colors">
                                                <span className="material-symbols-outlined">more_vert</span>
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-6 mb-6">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <span className="material-symbols-outlined text-lg text-slate-400">group</span>
                                                <span className="text-sm font-medium">24 Học sinh</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <span className="material-symbols-outlined text-lg text-slate-400">menu_book</span>
                                                <span className="text-sm font-medium">Bài 5/12</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="font-medium text-slate-600">Tiến độ lớp học</span>
                                                <span className="font-bold text-secondary">45%</span>
                                            </div>
                                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-secondary rounded-full" style={{ width: '45%' }}></div>
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-6 border-t border-slate-100 flex gap-3">
                                            <button className="flex-1 py-2 bg-secondary/10 text-secondary font-bold rounded-xl hover:bg-secondary/20 transition-colors">Vào Lớp</button>
                                            <button className="flex-1 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">Chấm Bài (12)</button>
                                        </div>
                                    </div>

                                    {/* Class Card 2 */}
                                    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-bold rounded-md uppercase">Lớp Chồi</span>
                                                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-md">Chiều T7, CN</span>
                                                </div>
                                                <h4 className="text-xl font-bold text-slate-900">Lớp Chồi Khám Phá B2</h4>
                                            </div>
                                            <button className="text-slate-400 hover:text-secondary transition-colors">
                                                <span className="material-symbols-outlined">more_vert</span>
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-6 mb-6">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <span className="material-symbols-outlined text-lg text-slate-400">group</span>
                                                <span className="text-sm font-medium">18 Học sinh</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <span className="material-symbols-outlined text-lg text-slate-400">menu_book</span>
                                                <span className="text-sm font-medium">Bài 8/12</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="font-medium text-slate-600">Tiến độ lớp học</span>
                                                <span className="font-bold text-secondary">70%</span>
                                            </div>
                                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-secondary rounded-full" style={{ width: '70%' }}></div>
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-6 border-t border-slate-100 flex gap-3">
                                            <button className="flex-1 py-2 bg-secondary/10 text-secondary font-bold rounded-xl hover:bg-secondary/20 transition-colors">Vào Lớp</button>
                                            <button className="flex-1 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">Chấm Bài (5)</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Submissions to Grade */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-black text-slate-900">Bài Tập Mới Nộp</h3>
                                    <button className="text-secondary font-bold text-sm hover:underline flex items-center gap-1">
                                        Xem tất cả <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                </div>
                                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm">
                                                    <th className="p-4 font-medium">Học Sinh</th>
                                                    <th className="p-4 font-medium">Bài Tập</th>
                                                    <th className="p-4 font-medium">Lớp</th>
                                                    <th className="p-4 font-medium">Thời Gian Nộp</th>
                                                    <th className="p-4 font-medium text-center">Hành Động</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">
                                                <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="size-8 rounded-full bg-slate-200" />
                                                            <span className="font-bold text-slate-900">Nguyễn Văn A</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 font-medium text-slate-700">Vẽ Con Vật Từ Hình Tròn</td>
                                                    <td className="p-4 text-slate-500">Mầm A1</td>
                                                    <td className="p-4 text-slate-500">10 phút trước</td>
                                                    <td className="p-4 text-center">
                                                        <button className="px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-colors">Chấm Điểm</button>
                                                    </td>
                                                </tr>
                                                <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mia" className="size-8 rounded-full bg-slate-200" />
                                                            <span className="font-bold text-slate-900">Trần Thị B</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 font-medium text-slate-700">Sơ Đồ Tư Duy Gia Đình</td>
                                                    <td className="p-4 text-slate-500">Lá C1</td>
                                                    <td className="p-4 text-slate-500">1 giờ trước</td>
                                                    <td className="p-4 text-center">
                                                        <button className="px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-colors">Chấm Điểm</button>
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-slate-50 transition-colors">
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Leo" className="size-8 rounded-full bg-slate-200" />
                                                            <span className="font-bold text-slate-900">Lê Văn C</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 font-medium text-slate-700">Thế Giới Dưới Đại Dương</td>
                                                    <td className="p-4 text-slate-500">Chồi B2</td>
                                                    <td className="p-4 text-slate-500">Hôm qua</td>
                                                    <td className="p-4 text-center">
                                                        <button className="px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-colors">Chấm Điểm</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                    {activeTab === 'lessons' && <VideoManagement />}

                    {activeTab === 'storyboard' && <AIStoryboardTab />}

                    {activeTab === 'profile' && <EditProfile onSaveSuccess={refreshProfile} />}

                    {activeTab !== 'classes' && activeTab !== 'lessons' && activeTab !== 'storyboard' && activeTab !== 'profile' && (
                        <div className="flex h-64 items-center justify-center text-slate-400 font-medium bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                            <div className="text-center">
                                <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">construction</span>
                                <p className="text-lg">Tính năng đang được phát triển</p>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}
