import React, { useState } from 'react';
import JournalView from './JournalView';
import AchievementsView from './AchievementsView';
import GalleryView from './GalleryView';
import Overview from './Overview';
import AttendanceView from './AttendanceView';
import MenuView from './MenuView';
import HealthView from './HealthView';
import FeesView from './FeesView';
import NotificationsView from './NotificationsView';
import MessagesView from './MessagesView';
import { ParentVideoLibrary } from '@/features/videos';
import { EditParentProfile, useProfile } from '@/features/profile';
import InteractiveCommunity from './InteractiveCommunity';

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
        { id: 'community', icon: 'diversity_3', label: 'Cộng đồng' },
    ];

    return (
        <div className="min-h-screen bg-[#fafbfa] flex font-sans text-slate-800">
            {/* Sidebar */}
            <aside className="w-[280px] bg-white border-r border-slate-200 flex flex-col shrink-0 shadow-sm z-20">
                <div className="p-6 flex items-center gap-3 border-b border-transparent">
                    <div className="bg-[#e8f5e9] text-[#4cae4f] p-2.5 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">child_care</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-[17px] font-black text-slate-800 leading-none tracking-tight">WonderKids</h1>
                        <p className="text-[10px] font-bold text-slate-500 mt-1.5 uppercase tracking-widest">Cổng thông tin phụ huynh</p>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 space-y-1 hide-scrollbar">
                    {navItems.map(item => (
                        <div key={item.id} className="px-4">
                            <button
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-4 px-6 py-[12px] rounded-full transition-all text-left outline-none ${activeTab === item.id
                                        ? 'bg-[#4cae4f] text-white font-bold shadow-md'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-[#4cae4f] font-medium'
                                    }`}
                            >
                                <span className={`material-symbols-outlined text-[20px] ${activeTab === item.id ? 'fill-[1]' : ''}`}>{item.icon}</span>
                                <span className="text-[15px]">{item.label}</span>
                            </button>
                        </div>
                    ))}
                </nav>

                {/* User info */}
                <div className="p-4 border-t border-transparent mb-4">
                    <div 
                        onClick={() => setActiveTab('profile')}
                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-full cursor-pointer hover:bg-slate-100 transition-all border border-slate-100"
                    >
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=parent_flora"
                            className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover bg-orange-50"
                            alt="avatar"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <p className="text-[13px] font-bold text-slate-800 truncate">{profile?.parent_name || 'Mẹ Khang'}</p>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5">Mã phụ huynh: #5492</p>
                        </div>
                        <span className="material-symbols-outlined text-slate-400 text-lg mr-2">settings</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-[#fafbfa]/95 backdrop-blur-sm px-8 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img 
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=kid_boy&backgroundColor=b6e3f4" 
                            className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover"
                            alt="Bé"
                        />
                        <div className="flex flex-col justify-center">
                            <h2 className="text-[22px] font-bold text-slate-800 leading-none">Phạm Vũ Khang</h2>
                            <div className="flex items-center gap-2 mt-1.5">
                                <span className="bg-blue-100 text-blue-600 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest">MẦM 1</span>
                                <span className="text-[12px] text-slate-500 font-medium">Lớp Cô Hồng</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className="relative hidden md:block w-72">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input className="w-full bg-white border border-slate-200 rounded-full py-2.5 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-[#4cae4f]/20 text-sm font-medium shadow-sm placeholder:text-slate-400" placeholder="Tìm kiếm báo cáo..." type="text" />
                        </div>
                        <button className="relative bg-white p-2.5 text-slate-500 rounded-full shadow-sm hover:scale-105 transition-transform border border-slate-100">
                            <span className="material-symbols-outlined text-[22px]">notifications</span>
                            <span className="absolute top-2 right-2 w-[9px] h-[9px] bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Tab Content */}
                <div className="px-8 pb-10">
                    {activeTab === 'overview' && <Overview />}
                    {activeTab === 'library' && <ParentVideoLibrary />}
                    {activeTab === 'journal' && <JournalView />}
                    {activeTab === 'achievements' && <AchievementsView />}
                    {activeTab === 'gallery' && <GalleryView />}
                    {activeTab === 'attendance' && <AttendanceView />}
                    {activeTab === 'menu' && <MenuView />}
                    {activeTab === 'health' && <HealthView />}
                    {activeTab === 'fees' && <FeesView />}
                    {activeTab === 'notifications' && <NotificationsView />}
                    {activeTab === 'messages' && <MessagesView />}
                    {activeTab === 'profile' && <EditParentProfile onSaveSuccess={refreshProfile} />}
                    {activeTab === 'community' && <InteractiveCommunity />}
                </div>
            </main>
        </div>
    );
};

export default ParentCommunity;
