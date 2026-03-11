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

// ============================================================
// TEACHER DASHBOARD
// ============================================================
export default function TeacherDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const { data: profileData, refreshProfile } = useProfile();
    const staff = profileData?.profile;

    const navItems = [
        { id: 'overview', label: 'Tổng quan lớp học', icon: 'dashboard' },
        { id: 'attendance', label: 'Điểm danh', icon: 'how_to_reg' },
        { id: 'students', label: 'Quản lý trẻ', icon: 'group' },
        { id: 'lessons-plan', label: 'Kế hoạch bài giảng', icon: 'menu_book' },
        { id: 'lessons', label: 'Thư viện tài liệu', icon: 'folder_open' },
        { id: 'journal', label: 'Nhật ký hoạt động', icon: 'history_edu' },
        { id: 'gallery', label: 'Ảnh & Video', icon: 'photo_library' },
        { id: 'notifications', label: 'Thông báo phụ huynh', icon: 'notifications_active', section: 'Giao tiếp' },
        { id: 'messages', label: 'Tin nhắn', icon: 'chat' },
        { id: 'reports', label: 'Báo cáo lớp', icon: 'bar_chart', section: 'Hệ thống' },
        { id: 'storyboard', label: 'AI Storyboard', icon: 'auto_fix_high' },
        { id: 'settings', label: 'Cài đặt', icon: 'settings' },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100" style={{ fontFamily: "'Lexend', sans-serif" }}>
            {/* Sidebar */}
            <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-20 overflow-y-auto shrink-0 transition-all">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-primary p-2 rounded-xl text-white">
                        <span className="material-symbols-outlined text-3xl">child_care</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-extrabold text-primary leading-none">KidsFit</h1>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[2px]">STEAM Academy</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item, idx) => (
                        <React.Fragment key={item.id}>
                            {item.section && (
                                <div className="pt-6 pb-2 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.section}</div>
                            )}
                            <button
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${activeTab === item.id
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                <span className="font-semibold text-sm">{item.label}</span>
                            </button>
                        </React.Fragment>
                    ))}
                </nav>

                <div className="p-6 mt-auto border-t border-slate-100 dark:border-slate-800">
                    <div className="bg-primary/10 rounded-3xl p-5 border border-primary/20">
                        <p className="text-sm font-black text-primary">Nâng cấp Pro</p>
                        <p className="text-[11px] text-slate-500 font-medium mt-1">Sử dụng đầy đủ các tính năng STEAM cao cấp.</p>
                    </div>
                    <a href="/" className="mt-4 flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-red-500 font-bold text-xs uppercase tracking-widest transition-colors">
                        <span className="material-symbols-outlined text-xl">logout</span>
                        Về Trang Chủ
                    </a>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Topbar */}
                <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-black text-slate-800 dark:text-white">
                            {activeTab === 'overview' ? (staff?.class_group || 'Lớp Lá 1') : navItems.find(i => i.id === activeTab)?.label}
                        </h2>
                        <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">Học kỳ I - 2024</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative hidden lg:block w-72">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl py-2.5 pl-11 pr-4 focus:ring-4 focus:ring-primary/20 text-sm font-medium transition-all" placeholder="Tìm kiếm học sinh, tài liệu..." type="text" />
                        </div>
                        <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                        </button>
                        <div className="flex items-center gap-4 pl-6 border-l border-slate-200 dark:border-slate-800 h-10">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black leading-none text-slate-800 dark:text-white">{staff?.full_name || 'Cô Minh Thư'}</p>
                                <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-wide">{staff?.position || 'Giáo viên chủ nhiệm'}</p>
                            </div>
                            <div onClick={() => setActiveTab('profile')} className="size-11 rounded-2xl bg-primary/20 overflow-hidden border-2 border-primary/30 cursor-pointer hover:scale-105 transition-transform">
                                <img alt="Avatar" className="w-full h-full object-cover" src={staff?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher"} />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 space-y-10 hide-scrollbar" style={{ scrollbarWidth: 'thin' }}>
                    {activeTab === 'overview' && (
                        <div className="space-y-10 animate-in fade-in duration-500">
                            {/* Summary Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                {[
                                    { label: 'Tổng số trẻ', value: '25', icon: 'groups', color: 'bg-blue-100 text-blue-600' },
                                    { label: 'Có mặt', value: '22', icon: 'person_check', color: 'bg-green-100 text-primary', sub: 'text-primary' },
                                    { label: 'Nghỉ', value: '03', icon: 'person_off', color: 'bg-red-100 text-red-500', sub: 'text-red-500' },
                                    { label: 'Hoạt động', value: 'Vẽ tư duy', icon: 'palette', color: 'bg-yellow-100 text-yellow-600', large: true },
                                    { label: 'Sự kiện', value: 'Halloween', icon: 'celebration', color: 'bg-purple-100 text-purple-600', large: true },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all">
                                        <div className={`${stat.color.split(' ')[0]} dark:bg-opacity-10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                                            <span className={`material-symbols-outlined ${stat.color.split(' ')[1]}`}>{stat.icon}</span>
                                        </div>
                                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wide">{stat.label}</p>
                                        <h3 className={`font-black mt-2 truncate ${stat.large ? 'text-lg' : 'text-3xl'} ${stat.sub || 'text-slate-800 dark:text-white'}`}>{stat.value}</h3>
                                    </div>
                                ))}
                            </div>

                            {/* Main Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Left Column */}
                                <div className="lg:col-span-2 space-y-8">
                                    {/* Attendance Table */}
                                    <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                                        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50">
                                            <h4 className="font-black text-lg flex items-center gap-3 text-slate-800 dark:text-white">
                                                <span className="material-symbols-outlined text-primary">assignment_ind</span>
                                                Điểm danh sáng nay
                                            </h4>
                                            <button onClick={() => setActiveTab('attendance')} className="text-primary text-sm font-black hover:underline px-4 py-2 hover:bg-primary/10 rounded-xl transition-all">Xem tất cả</button>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="text-slate-400 text-[10px] font-black uppercase tracking-[2px] bg-slate-50/80 dark:bg-slate-800/50">
                                                        <th className="px-8 py-4">Trẻ em</th>
                                                        <th className="px-8 py-4 text-center">Trạng thái</th>
                                                        <th className="px-8 py-4 text-center">Check-in</th>
                                                        <th className="px-8 py-4 text-right">Thao tác</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                                                    {[
                                                        { name: 'Nguyễn Gia Bảo', status: 'Có mặt', time: '07:15 AM', color: 'bg-green-100 text-green-700', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
                                                        { name: 'Trần Minh Anh', status: 'Nghỉ học', time: '--:--', color: 'bg-red-100 text-red-700', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mia' },
                                                        { name: 'Lê Bảo Ngọc', status: 'Có mặt', time: '07:30 AM', color: 'bg-green-100 text-green-700', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lily' },
                                                    ].map((kid, i) => (
                                                        <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-slate-800 transition-all group">
                                                            <td className="px-8 py-5 flex items-center gap-4">
                                                                <img alt="Kid" className="size-11 rounded-2xl bg-pastel-blue border-2 border-white shadow-sm" src={kid.avatar} />
                                                                <span className="font-black text-slate-700 dark:text-slate-300">{kid.name}</span>
                                                            </td>
                                                            <td className="px-8 py-5 text-center">
                                                                <span className={`${kid.color} dark:bg-opacity-10 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tight`}>{kid.status}</span>
                                                            </td>
                                                            <td className="px-8 py-5 text-center text-sm font-bold text-slate-500">{kid.time}</td>
                                                            <td className="px-8 py-5 text-right">
                                                                <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:text-primary hover:scale-110 transition-all"><span className="material-symbols-outlined text-xl">edit</span></button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Attendance Chart */}
                                    <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 p-8">
                                        <div className="flex items-center justify-between mb-8">
                                            <h4 className="font-black text-lg text-slate-800 dark:text-white">Chuyên cần tuần này</h4>
                                            <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-xs font-bold py-2 px-3 outline-none focus:ring-2 focus:ring-primary/20">
                                                <option>Tuần này</option>
                                                <option>Tuần trước</option>
                                            </select>
                                        </div>
                                        <div className="h-64 flex items-end justify-between gap-4 px-4">
                                            {[
                                                { day: 'T2', h: '85%', active: false },
                                                { day: 'T3', h: '95%', active: true },
                                                { day: 'T4', h: '90%', active: false },
                                                { day: 'T5', h: '80%', active: false },
                                                { day: 'T6', h: '92%', active: false },
                                                { day: 'T7', h: '0%', active: false },
                                            ].map((bar, i) => (
                                                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                                    <div className={`w-full rounded-2xl transition-all duration-500 ${bar.active ? 'bg-primary shadow-lg shadow-primary/20 scale-y-105' : 'bg-primary/20 group-hover:bg-primary/40'}`} style={{ height: bar.h }}></div>
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${bar.active ? 'text-primary' : 'text-slate-400'}`}>{bar.day}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-8">
                                    {/* Timeline */}
                                    <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 p-8">
                                        <h4 className="font-black text-lg mb-8 flex items-center gap-3 text-slate-800 dark:text-white">
                                            <span className="material-symbols-outlined text-yellow-500">schedule</span>
                                            Lịch trình hôm nay
                                        </h4>
                                        <div className="space-y-8 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-1 before:bg-slate-100 dark:before:bg-slate-800">
                                            {[
                                                { time: '07:30', title: 'Đón trẻ', desc: 'Kiểm tra sức khỏe đầu giờ', color: 'bg-green-500', active: false },
                                                { time: '09:00', title: 'Vẽ tư duy STEAM', desc: 'Phòng học nghệ thuật số 2', color: 'bg-primary', active: true },
                                                { time: '10:30', title: 'Chơi ngoài trời', desc: 'Sân chơi phía Tây', color: 'bg-slate-300', active: false, opacity: 'opacity-50' },
                                                { time: '11:30', title: 'Ăn trưa', desc: 'Thực đơn: Cháo tôm, Rau củ', color: 'bg-slate-300', active: false, opacity: 'opacity-50' },
                                                { time: '12:30', title: 'Ngủ trưa', desc: 'Nhạc không lời du dương', color: 'bg-slate-300', active: false, opacity: 'opacity-50' },
                                            ].map((item, i) => (
                                                <div key={i} className={`relative pl-12 ${item.opacity || ''}`}>
                                                    <div className={`absolute left-0 top-1 size-9 ${item.color} border-4 border-white dark:border-slate-900 rounded-full z-10 ${item.active ? 'shadow-lg shadow-primary/40' : ''}`}></div>
                                                    <p className={`text-[10px] font-black uppercase tracking-wider ${item.active ? 'text-primary' : 'text-slate-400'}`}>{item.time} {item.active && '• HIỆN TẠI'}</p>
                                                    <h5 className="font-black text-sm text-slate-800 dark:text-white mt-1">{item.title}</h5>
                                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Lesson Plan Card */}
                                    <div className="bg-gradient-to-br from-primary via-green-600 to-green-700 rounded-[40px] shadow-2xl p-8 text-white relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
                                            <span className="material-symbols-outlined text-[120px]">lightbulb</span>
                                        </div>
                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                                                    <span className="material-symbols-outlined text-3xl">lightbulb</span>
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-[3px] bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">Chủ đề tuần</span>
                                            </div>
                                            <h4 className="text-3xl font-black mb-3">Thế giới nước</h4>
                                            <p className="text-white/80 text-sm font-medium leading-relaxed mb-8">Khám phá vòng tuần hoàn của nước và các sinh vật biển thông qua mô hình 3D sinh động.</p>
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="flex -space-x-3">
                                                    {[1, 2, 3].map(i => (
                                                        <div key={i} className="size-10 rounded-2xl border-[3px] border-primary-dark bg-white/20 backdrop-blur-md flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-sm">attach_file</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <span className="text-xs font-black uppercase tracking-widest">+ 5 tài liệu</span>
                                            </div>
                                            <button onClick={() => setActiveTab('lessons-plan')} className="w-full bg-white text-primary font-black py-4 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-[2px]">
                                                <span className="material-symbols-outlined">add_circle</span>
                                                Tạo bài giảng mới
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Library Section */}
                            <div>
                                <div className="flex items-center justify-between mb-8">
                                    <h4 className="text-2xl font-black text-slate-800 dark:text-white">Thư viện học liệu</h4>
                                    <button onClick={() => setActiveTab('lessons')} className="flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest hover:underline">
                                        Tất cả tài liệu
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {[
                                        { title: 'Flashcards Động vật', desc: '24 thẻ • Định dạng PDF', icon: 'style', color: 'bg-pastel-blue text-blue-500' },
                                        { title: 'Yoga cho bé buổi sáng', desc: 'Video HD • 10 phút', icon: 'play_circle', color: 'bg-pastel-yellow text-yellow-500' },
                                        { title: 'Bài tập Tô màu sáng tạo', desc: 'Trang in • 15 mẫu', icon: 'description', color: 'bg-pastel-pink text-pink-500' },
                                        { title: 'Thí nghiệm "Núi lửa nhỏ"', desc: 'Dự án STEAM • Hướng dẫn', icon: 'experiment', color: 'bg-pastel-green text-primary' },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white dark:bg-slate-900 rounded-[32px] p-5 shadow-sm border border-slate-100 dark:border-slate-800 group cursor-pointer hover:shadow-2xl transition-all">
                                            <div className={`aspect-[4/3] rounded-[24px] ${item.color.split(' ')[0]} mb-5 overflow-hidden relative flex items-center justify-center`}>
                                                <span className={`material-symbols-outlined text-[64px] group-hover:scale-110 transition-transform ${item.color.split(' ')[1]}`}>{item.icon}</span>
                                            </div>
                                            <h5 className="font-black text-slate-800 dark:text-white text-sm">{item.title}</h5>
                                            <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase tracking-tight">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'lessons' && <VideoManagement />}
                    {activeTab === 'storyboard' && <AIStoryboardTab />}
                    {activeTab === 'profile' && <EditProfile onSaveSuccess={refreshProfile} />}

                    {!['overview', 'lessons', 'storyboard', 'profile'].includes(activeTab) && (
                        <div className="flex h-96 items-center justify-center text-slate-400 font-black bg-white dark:bg-slate-900 rounded-[40px] border-4 border-dashed border-slate-100 dark:border-slate-800">
                            <div className="text-center">
                                <span className="material-symbols-outlined text-8xl text-slate-200 dark:text-slate-800 mb-6 block">construction</span>
                                <p className="text-2xl uppercase tracking-[4px]">Tính năng đang phát triển</p>
                                <p className="text-sm font-bold mt-2 text-slate-400">"{navItems.find(i => i.id === activeTab)?.label}" sẽ sớm ra mắt!</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
