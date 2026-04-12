import React, { useState } from 'react';
import AIStoryboardTab from '../components/AIStoryboardTab';
import AIARExplorerTab from '../components/AIARExplorerTab';
import AILessonPlannerTab from '../components/AILessonPlannerTab';
import { EditProfile, useProfile } from '../features/profile';
import AttendanceView from './TeacherDashboard/AttendanceView';
import DocumentRepositoryView from './TeacherDashboard/DocumentRepositoryView';
import StudentManagementView from './TeacherDashboard/StudentManagementView';
import ClassJournalView from './TeacherDashboard/ClassJournalView';
import MediaLibraryView from './TeacherDashboard/MediaLibraryView';
import MessagesView from './TeacherDashboard/MessagesView';
import NotificationsManageView from './TeacherDashboard/NotificationsManageView';

export default function TeacherDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleNavClick = (id: string) => {
        setActiveTab(id);
        setSidebarOpen(false);
    };
    const { data: profileData, refreshProfile } = useProfile();
    const staff = profileData?.profile;

    const navItems = [
        { id: 'overview', label: 'Tổng quan lớp học', icon: 'dashboard' },
        { id: 'attendance', label: 'Điểm danh', icon: 'person_check' },
        { id: 'students', label: 'Quản lý trẻ', icon: 'groups' },
        { id: 'lessons-plan', label: 'Kế hoạch bài giảng', icon: 'menu_book' },
        { id: 'document-repository', label: 'Giáo án', icon: 'menu_book' },
        { id: 'media', label: 'Thư viện Media', icon: 'perm_media' },
        { id: 'journal', label: 'Nhật ký hoạt động', icon: 'history_edu' },
        { id: 'notifications', label: 'Thông báo phụ huynh', icon: 'notifications', section: 'GIAO TIẾP' },
        { id: 'messages', label: 'Tin nhắn', icon: 'chat', section: '' },
        { id: 'ai-storyboard', label: 'Cỗ máy kể chuyện AI', icon: 'auto_fix_high', section: 'CÔNG CỤ AI' },
        { id: 'ar-explorer', label: 'Drawing Explorer 3D', icon: 'view_in_ar', section: '' },
        { id: 'reports', label: 'Báo cáo lớp', icon: 'bar_chart', section: 'HỆ THỐNG' },
        { id: 'settings', label: 'Cài đặt', icon: 'settings', section: '' },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-[#f6f7f6] font-display text-slate-800">
            {/* Mobile overlay backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-[280px] bg-white border-r border-slate-200 flex flex-col shrink-0 shadow-lg
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:relative md:translate-x-0 md:shadow-none md:z-20
            `}>
                <div className="p-6 flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 flex items-center justify-center">
                        <img src="/assets/logo/mainlogo.png" alt="KidsFit Logo" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold text-primary leading-none tracking-tight">KidsFit</h1>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">STEAM Academy</p>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="ml-auto md:hidden p-1 text-slate-400 hover:text-slate-600"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-2 hide-scrollbar">
                    <div className="space-y-1">
                        {navItems.map((item, idx) => (
                            <React.Fragment key={item.id}>
                                {item.section && (
                                    <div className="pt-6 pb-2 px-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">{item.section}</div>
                                )}
                                <div className="pr-4">
                                    <button
                                        onClick={() => handleNavClick(item.id)}
                                        className={`w-full flex items-center gap-4 px-8 py-3.5 transition-all outline-none ${activeTab === item.id
                                                ? 'bg-primary text-white rounded-r-full font-bold shadow-md'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-primary font-medium'
                                            }`}
                                    >
                                        <span className={`material-symbols-outlined text-[20px] ${activeTab === item.id ? 'fill-[1]' : ''}`}>{item.icon}</span>
                                        <span className="text-[15px]">{item.label}</span>
                                    </button>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </nav>

                <div className="p-6 space-y-4">
                    <div className="bg-green-50 rounded-2xl p-5 border border-green-100/50">
                        <h4 className="text-sm font-bold text-primary mb-1">Nâng cấp Pro</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">Sử dụng đầy đủ các tính năng STEAM cao cấp.</p>
                    </div>
                    <button
                        onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            window.location.href = '/';
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-slate-500 hover:bg-red-50 hover:text-red-500 font-semibold text-sm transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                        Đăng xuất
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative w-full">
                {/* Header */}
                <header className="sticky top-0 z-20 bg-[#f6f7f6]/95 backdrop-blur-sm px-4 md:px-8 py-4 md:py-6 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 md:gap-6 min-w-0">
                        {/* Hamburger button - mobile only */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full shrink-0"
                        >
                            <span className="material-symbols-outlined text-[24px]">menu</span>
                        </button>
                        <h2 className="text-[20px] md:text-[26px] font-bold text-slate-800 tracking-tight truncate">Lớp Lá 1</h2>
                        <span className="bg-green-100/50 text-green-700 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest shrink-0 hidden sm:inline">Học kỳ I - 2024</span>
                    </div>

                    <div className="flex items-center gap-3 md:gap-6 shrink-0">
                        <div className="relative hidden md:block w-80">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input className="w-full bg-slate-100/50 border-none rounded-full py-2.5 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 text-sm font-medium shadow-sm placeholder:text-slate-400" placeholder="Tìm kiếm học sinh, tài liệu..." type="text" />
                        </div>

                        <button className="relative p-2 text-slate-500 hover:bg-white rounded-full transition-all">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#f6f7f6]"></span>
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-[15px] font-bold text-slate-800 leading-none">{staff?.full_name || 'Cô Minh Thư'}</p>
                                <p className="text-[12px] text-slate-500 font-medium mt-1">Giáo viên chủ nhiệm</p>
                            </div>
                            <div onClick={() => setActiveTab('profile')} className="w-10 h-10 rounded-full overflow-hidden cursor-pointer shadow-sm border-2 border-white">
                                <img alt="Avatar" className="w-full h-full object-cover" src={staff?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher"} />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="px-4 md:px-8 pb-10 space-y-8">
                    {/* Stats Row */}
                    {activeTab === 'overview' && (
                        <>
                            <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
                                {[
                                    { label: 'Tổng số trẻ', value: '25', icon: 'groups', iconBg: 'bg-blue-50 text-blue-500', valueClass: 'text-slate-800' },
                                    { label: 'Có mặt', value: '22', icon: 'person_check', iconBg: 'bg-green-50 text-green-500', valueClass: 'text-green-500' },
                                    { label: 'Nghỉ', value: '03', icon: 'person_off', iconBg: 'bg-red-50 text-red-500', valueClass: 'text-red-500' },
                                    { label: 'Hoạt động', value: 'Vẽ tư duy', icon: 'palette', iconBg: 'bg-amber-50 text-amber-500', valueClass: 'text-slate-800' },
                                    { label: 'Sự kiện', value: 'Lễ hội Hall...', icon: 'celebration', iconBg: 'bg-purple-50 text-purple-500', valueClass: 'text-slate-800' },
                                ].map((stat, i) => (
                                    <div key={i} className="min-w-[200px] flex-1 bg-white p-6 rounded-3xl shadow-sm flex flex-col gap-5 border border-slate-100">
                                        <div className={`w-12 h-12 rounded-[14px] ${stat.iconBg} flex items-center justify-center`}>
                                            <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-[13px] font-medium mb-1">{stat.label}</p>
                                            <h3 className={`font-bold text-[28px] truncate ${stat.valueClass}`}>{stat.value}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Main Columns */}
                            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    {/* Attendance Table */}
                                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                                            <h4 className="font-bold text-[16px] flex items-center gap-3 text-slate-800">
                                                <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-xl">assignment_ind</span>
                                                </div>
                                                Điểm danh nhanh sáng nay
                                            </h4>
                                            <button onClick={() => setActiveTab('attendance')} className="text-primary text-[13px] font-bold hover:underline">Xem tất cả</button>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="text-slate-400 text-[11px] font-bold uppercase tracking-widest border-b border-slate-100">
                                                        <th className="px-6 py-4 font-bold">TRẺ EM</th>
                                                        <th className="px-6 py-4 font-bold text-center">TRẠNG THÁI</th>
                                                        <th className="px-6 py-4 font-bold text-center">CHECK-IN</th>
                                                        <th className="px-6 py-4 font-bold text-right">THAO TÁC</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-50/80">
                                                    {[
                                                        { name: 'Nguyễn Gia Bảo', status: 'Có mặt', time: '07:15 AM', statusColor: 'bg-green-100/50 text-green-600', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bao', active: true },
                                                        { name: 'Trần Minh Anh', status: 'Nghỉ học', time: '--:--', statusColor: 'bg-red-100/50 text-red-500', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anh', active: false },
                                                        { name: 'Lê Bảo Ngọc', status: 'Có mặt', time: '07:30 AM', statusColor: 'bg-green-100/50 text-green-600', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ngoc', active: true },
                                                    ].map((kid, i) => (
                                                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                                            <td className="px-6 py-3 flex items-center gap-4">
                                                                <img alt="Kid" className="w-9 h-9 rounded-full bg-slate-100 object-cover" src={kid.avatar} />
                                                                <span className="font-bold text-[14px] text-slate-700">{kid.name}</span>
                                                            </td>
                                                            <td className="px-6 py-3 text-center">
                                                                <span className={`${kid.statusColor} px-3 py-1 rounded-md text-[11px] font-bold`}>{kid.status}</span>
                                                            </td>
                                                            <td className="px-6 py-3 text-center text-[13px] font-medium text-slate-500">{kid.time}</td>
                                                            <td className="px-6 py-3 text-right">
                                                                <button className="text-slate-800 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px] fill-[1]">edit</span></button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Chart */}
                                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
                                        <h4 className="font-bold text-[16px] text-slate-800 mb-8">Chuyên cần tuần này</h4>
                                        <div className="h-44 flex items-end justify-between gap-4 px-2">
                                            {[
                                                { day: 'T2', h: '85%', active: false },
                                                { day: 'T3', h: '95%', active: true },
                                                { day: 'T4', h: '0%', active: false },
                                                { day: 'T5', h: '0%', active: false },
                                                { day: 'T6', h: '0%', active: false },
                                                { day: 'T7', h: '0%', active: false },
                                            ].map((bar, i) => (
                                                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                                                    <div className={`w-10 rounded-t-xl transition-all ${bar.active ? 'bg-primary' : 'bg-slate-100'} ${bar.h === '0%' ? 'h-1.5' : ''}`} style={{ height: bar.h === '0%' ? '6px' : bar.h }}></div>
                                                    <span className={`text-[12px] font-bold ${bar.active ? 'text-primary' : 'text-slate-400'}`}>{bar.day}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    {/* Schedule */}
                                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
                                        <h4 className="font-bold text-[16px] text-slate-800 flex items-center gap-2 mb-6">
                                            <span className="material-symbols-outlined text-amber-500">schedule</span>
                                            Lịch trình hôm nay
                                        </h4>
                                        <div className="space-y-6 relative pl-3 overflow-hidden">
                                            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
                                            {[
                                                { time: '07:30', title: 'Đón trẻ', desc: 'Kiểm tra sức khỏe đầu giờ', active: false, passed: true },
                                                { time: '09:00 - Hiện tại', title: 'Vẽ tư duy STEAM', desc: 'Phòng học nghệ thuật số 2', active: true, passed: false },
                                                { time: '10:30', title: 'Chơi ngoài trời', desc: 'Sân chơi phía Tây', active: false, passed: false },
                                                { time: '11:30', title: 'Ăn trưa', desc: 'Thực đơn: Cháo tôm, Rau củ', active: false, passed: false },
                                                { time: '12:30', title: 'Ngủ trưa', desc: 'Nhạc không lời du dương', active: false, passed: false },
                                            ].map((item, i) => (
                                                <div key={i} className={`relative pl-8 ${item.active ? '' : item.passed ? 'opacity-100' : 'opacity-40'}`}>
                                                    <div className={`absolute left-[-5px] top-1.5 w-3.5 h-3.5 rounded-full ${item.active ? 'bg-primary shadow-[0_0_0_8px_rgba(76,174,79,0.1)] ring-4 ring-white' : item.passed ? 'bg-primary' : 'bg-slate-200'}`}></div>
                                                    <p className={`text-[11px] font-bold mb-0.5 ${item.active ? 'text-primary' : 'text-green-600'}`}>{item.time}</p>
                                                    <h5 className="font-bold text-[13px] text-slate-800 mb-0.5 leading-tight">{item.title}</h5>
                                                    <p className="text-[11px] text-slate-500 leading-tight">{item.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Theme Card */}
                                    <div className="bg-[#4cae4f] rounded-3xl shadow-sm p-6 text-white relative overflow-hidden h-44 flex flex-col justify-between">
                                        <div className="absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">CHỦ ĐỀ TUẦN</div>
                                        <span className="material-symbols-outlined text-2xl mb-1 text-white">lightbulb</span>
                                        <div>
                                            <h4 className="text-[19px] font-bold mb-1">Thế giới nước</h4>
                                            <p className="text-[11px] text-white/90 leading-tight pr-4">Khám phá vòng tuần hoàn của nước và các sinh vật biển thông qua mô hình 3D.</p>
                                        </div>
                                        <div className="flex items-center gap-3 mt-3">
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className="w-6 h-6 rounded-full bg-white/30 border border-white/50 backdrop-blur-sm"></div>
                                                ))}
                                            </div>
                                            <span className="text-[10px] font-bold">+ 5 tài liệu</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'document-repository' && <DocumentRepositoryView />}
                    {activeTab === 'attendance' && <AttendanceView />}
                    {activeTab === 'students' && <StudentManagementView />}
                    {activeTab === 'journal' && <ClassJournalView />}
                    {activeTab === 'media' && <MediaLibraryView />}
                    {activeTab === 'messages' && <MessagesView />}
                    {activeTab === 'notifications' && <NotificationsManageView />}
                    {activeTab === 'lessons-plan' && <AILessonPlannerTab />}
                    {activeTab === 'storyboard' && <AIStoryboardTab />}
                    {activeTab === 'ai-storyboard' && <AIStoryboardTab />}
                    {activeTab === 'ar-explorer' && <AIARExplorerTab />}
                    {activeTab === 'profile' && <EditProfile onSaveSuccess={refreshProfile} />}

                    {!['overview', 'document-repository', 'attendance', 'students', 'journal', 'media', 'messages', 'lessons-plan', 'storyboard', 'ai-storyboard', 'ar-explorer', 'profile'].includes(activeTab) && (
                        <div className="flex h-96 items-center justify-center text-slate-400 font-black bg-white rounded-[32px] border border-slate-100 shadow-sm">
                            <div className="text-center">
                                <span className="material-symbols-outlined text-6xl text-slate-200 mb-4 block">construction</span>
                                <p className="text-xl uppercase tracking-widest">Tính năng đang cập nhật</p>
                                <p className="text-sm font-bold mt-2 text-slate-400">{navItems.find(i => i.id === activeTab)?.label} sẽ sớm ra mắt!</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
