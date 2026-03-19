import React, { useState, useEffect } from 'react';
import { notificationService, Notification } from '@/services/notificationService';

const NotificationsView = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        setNotifications(notificationService.getNotifications());
    }, []);

    const handleConfirm = (id: string) => {
        notificationService.confirmNotification(id);
        notificationService.markAsRead(id);
        setNotifications(notificationService.getNotifications());
        alert('Đã xác nhận nhận thông báo!');
    };

    const stats = {
        unread: notifications.filter(n => !n.read).length,
        emergency: notifications.filter(n => n.type === 'emergency').length,
        events: notifications.filter(n => n.type === 'event').length,
        confirmed: notifications.filter(n => n.confirmed).length,
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-500 pb-20">
            {/* Quick Stats Bento Grid */}
            <section className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-[32px] flex flex-col gap-3 group hover:translate-y-[-6px] transition-all duration-300 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-500/5">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>mark_email_unread</span>
                            </div>
                            <span className="text-[10px] font-black text-blue-600 bg-blue-100 px-3 py-1.5 rounded-xl uppercase tracking-widest">Mới</span>
                        </div>
                        <p className="text-4xl font-black text-slate-800 mt-2">{stats.unread < 10 ? `0${stats.unread}` : stats.unread}</p>
                        <h3 className="text-slate-400 font-bold text-sm uppercase tracking-widest">Thông báo mới</h3>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-red-50/50 p-8 rounded-[32px] flex flex-col gap-3 group hover:translate-y-[-6px] transition-all duration-300 shadow-sm border border-red-100 hover:shadow-xl hover:shadow-red-500/5">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                            </div>
                        </div>
                        <p className="text-4xl font-black text-red-600 mt-2">{stats.emergency < 10 ? `0${stats.emergency}` : stats.emergency}</p>
                        <h3 className="text-red-400/80 font-bold text-sm uppercase tracking-widest">Cảnh báo khẩn</h3>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-amber-50/50 p-8 rounded-[32px] flex flex-col gap-3 group hover:translate-y-[-6px] transition-all duration-300 shadow-sm border border-amber-100 hover:shadow-xl hover:shadow-amber-500/5">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>event</span>
                            </div>
                        </div>
                        <p className="text-4xl font-black text-slate-800 mt-2">{stats.events < 10 ? `0${stats.events}` : stats.events}</p>
                        <h3 className="text-amber-600/60 font-bold text-sm uppercase tracking-widest">Sự kiện lớp</h3>
                    </div>
                    {/* Card 4 */}
                    <div className="bg-green-50/50 p-8 rounded-[32px] flex flex-col gap-3 group hover:translate-y-[-6px] transition-all duration-300 shadow-sm border border-green-100 hover:shadow-xl hover:shadow-green-500/5">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            </div>
                        </div>
                        <p className="text-4xl font-black text-slate-800 mt-2">{stats.confirmed < 10 ? `0${stats.confirmed}` : stats.confirmed}</p>
                        <h3 className="text-green-700/60 font-bold text-sm uppercase tracking-widest">Đã xác nhận</h3>
                    </div>
                </div>
            </section>

            {/* Main Feed */}
            <section className="max-w-4xl mx-auto w-full space-y-8">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                        <span className="material-symbols-outlined text-slate-400">campaign</span>
                        Thông báo mới nhất
                    </h2>
                    <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
                        <button className="bg-primary text-white px-5 py-2 rounded-xl text-xs font-black shadow-lg shadow-primary/20">Tất cả</button>
                        <button className="text-slate-400 px-5 py-2 rounded-xl text-xs font-black hover:text-primary transition-colors">Chưa đọc</button>
                    </div>
                </div>
                
                <div className="space-y-8 relative">
                    <div className="absolute left-1/2 -ml-[1px] top-0 bottom-0 w-[2px] bg-slate-100 hidden lg:block"></div>
                    
                    {notifications.map((n, idx) => (
                        <div key={n.id} className={`relative lg:flex ${idx % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'} group`}>
                            {/* Timeline Decor */}
                            <div className="absolute left-1/2 -ml-3.5 top-8 w-7 h-7 bg-white rounded-full border-4 border-slate-100 hidden lg:flex items-center justify-center z-10 group-hover:border-primary/30 transition-colors">
                                <div className={`w-2 h-2 rounded-full ${n.type === 'emergency' ? 'bg-red-500' : n.type === 'event' ? 'bg-amber-500' : 'bg-primary'}`}></div>
                            </div>

                            <div className={`w-full lg:w-[46%] bg-white rounded-[40px] overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-500 relative ${n.confirmed ? 'opacity-90' : ''}`}>
                                <div className={`absolute left-0 top-0 bottom-0 w-2 ${n.type === 'emergency' ? 'bg-red-500' : n.type === 'event' ? 'bg-amber-500' : 'bg-primary'}`}></div>
                                <div className="p-8 md:p-10 space-y-5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest ${
                                                n.type === 'emergency' ? 'bg-red-50 text-red-500' : 
                                                n.type === 'event' ? 'bg-amber-50 text-amber-500' : 
                                                'bg-green-50 text-green-700'
                                            }`}>
                                                {n.type === 'emergency' ? 'Khẩn cấp' : n.type === 'event' ? 'Sự kiện' : 'Chung'}
                                            </span>
                                            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">schedule</span>
                                                {n.date}
                                            </span>
                                        </div>
                                        {!n.read && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>}
                                    </div>
                                    
                                    <h3 className="text-[22px] font-black text-slate-800 leading-tight group-hover:text-primary transition-colors">{n.title}</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed text-[15px]">{n.content}</p>
                                    
                                    {/* AI Summary */}
                                    <div className={`p-5 rounded-2xl border-l-4 italic text-[13px] font-bold ${
                                        n.type === 'emergency' ? 'bg-red-50 border-red-300 text-red-800' : 
                                        n.type === 'event' ? 'bg-amber-50 border-amber-300 text-amber-800' : 
                                        'bg-green-50 border-green-300 text-green-800'
                                    }`}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                                            Tóm tắt AI
                                        </div>
                                        {n.content.length > 100 ? n.content.substring(0, 100) + '...' : n.content}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 pt-4">
                                        {n.type === 'emergency' && !n.confirmed && (
                                            <button 
                                                onClick={() => handleConfirm(n.id)}
                                                className="bg-red-500 text-white px-8 py-3.5 rounded-2xl text-[13px] font-black shadow-xl shadow-red-500/20 flex items-center gap-2 hover:scale-[1.05] active:scale-95 transition-all"
                                            >
                                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                                Xác nhận ngay
                                            </button>
                                        )}
                                        {n.confirmed ? (
                                            <div className="bg-green-50 text-green-700 px-6 py-3 rounded-2xl text-[13px] font-black flex items-center gap-2 border border-green-100">
                                                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                                Đã xác nhận
                                            </div>
                                        ) : (
                                            <button onClick={() => { notificationService.markAsRead(n.id); setNotifications(notificationService.getNotifications()); }} className="bg-slate-100 text-slate-600 px-8 py-3.5 rounded-2xl text-[13px] font-black hover:bg-slate-200 transition-all">
                                                Đánh dấu đã đọc
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default NotificationsView;
