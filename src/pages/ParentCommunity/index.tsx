import React, { useState } from 'react';
import JournalView from './JournalView';
import AchievementsView from './AchievementsView';
import GalleryView from './GalleryView';
import Overview from './Overview';
import { ParentVideoLibrary } from '@/features/videos';
import { EditParentProfile, useProfile } from '@/features/profile';

const ParentCommunity = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const { data: profileData, refreshProfile } = useProfile();
    const profile = profileData?.profile;

    const navItems = [
        { id: 'overview', icon: 'dashboard', label: 'Tổng quan' },
        { id: 'journal', icon: 'history_edu', label: 'Nhật ký hoạt động' },
        { id: 'gallery', icon: 'photo_library', label: 'Ảnh/Video' },
        { id: 'attendance', icon: 'how_to_reg', label: 'Điểm danh' },
        { id: 'menu', icon: 'restaurant_menu', label: 'Thực đơn' },
        { id: 'health', icon: 'monitor_heart', label: 'Sức khỏe' },
        { id: 'fees', icon: 'account_balance_wallet', label: 'Học phí' },
        { id: 'messages', icon: 'forum', label: 'Tin nhắn' },
        { id: 'notifications', icon: 'notifications', label: 'Thông báo' },
        { id: 'library', icon: 'video_library', label: 'Kho học liệu' },
        { id: 'achievements', icon: 'military_tech', label: 'Thành tích' },
    ];

    return (
        <div className="min-h-screen bg-[#f6f7f6] flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-100 flex flex-col shrink-0 shadow-sm">
                <div className="p-6 border-b border-slate-100 flex flex-col gap-2">
                    <img src="/assets/logo/mainlogo.png" alt="Logo" className="h-10 w-auto object-contain" />
                    <span className="text-[10px] bg-[#e8f5e9] text-[#4cae4f] px-3 py-1 rounded-full font-black uppercase tracking-widest w-fit">
                        Góc Phụ Huynh
                    </span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-left ${activeTab === item.id
                                    ? 'bg-[#4cae4f] text-white shadow-lg shadow-[#4cae4f]/20'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                                }`}
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span className="text-sm font-bold">{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* User info */}
                <div className="p-4 border-t border-slate-100 space-y-3">
                    <div 
                        onClick={() => setActiveTab('profile')}
                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl cursor-pointer hover:bg-[#4cae4f]/5 transition-all group"
                    >
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=parent_flora"
                            className="w-10 h-10 rounded-full border-2 border-[#4cae4f]/20 group-hover:border-[#4cae4f]/40"
                            alt="avatar"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-black text-slate-800 truncate">{profile?.parent_name || 'Phụ huynh'}</p>
                            <p className="text-[10px] text-[#4cae4f] font-bold uppercase tracking-wide">{profile?.class_name || 'Lớp của bé'}</p>
                        </div>
                    </div>
                    <a
                        href="/"
                        className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-xl text-sm font-bold transition-all"
                    >
                        <span className="material-symbols-outlined text-lg">logout</span>
                        Về trang chủ
                    </a>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
                    <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined text-2xl ${activeTab === 'library' ? 'text-[#4cae4f]' : 'text-primary'}`}>
                            {navItems.find(n => n.id === activeTab)?.icon}
                        </span>
                        <div>
                            <h1 className="text-xl font-black text-slate-800">
                                {navItems.find(n => n.id === activeTab)?.label}
                            </h1>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                {activeTab === 'overview' && 'Tổng quan tình hình học tập & sinh hoạt của bé'}
                                {activeTab === 'library' && 'Bài giảng video dành riêng cho bé'}
                                {activeTab === 'journal' && 'Những khoảnh khắc đáng yêu của bé tại lớp'}
                                {activeTab === 'achievements' && 'Ghi nhận từng bước tiến nhỏ của con'}
                                {activeTab === 'gallery' && 'Những hình ảnh đẹp được ghi lại tại trường'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors relative">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <button 
                            onClick={() => setActiveTab('profile')}
                            className="w-10 h-10 rounded-full border-2 border-[#4cae4f]/20 hover:scale-105 transition-transform overflow-hidden"
                        >
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=parent_flora"
                                className="w-full h-full object-cover"
                                alt="avatar"
                            />
                        </button>
                    </div>
                </header>

                {/* Tab Content */}
                <div className="p-8">
                    {activeTab === 'overview' && <Overview />}
                    {activeTab === 'library' && <ParentVideoLibrary />}
                    {activeTab === 'journal' && <JournalView />}
                    {activeTab === 'achievements' && <AchievementsView />}
                    {activeTab === 'gallery' && <GalleryView />}
                    {activeTab === 'profile' && <EditParentProfile onSaveSuccess={refreshProfile} />}
                </div>
            </main>
        </div>
    );
};

export default ParentCommunity;
