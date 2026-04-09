import React, { useState } from 'react';
import { notificationService } from '@/shared/services/notificationService';

const NotificationsManageView = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState<'emergency' | 'event' | 'general'>('general');
    const [notifications, setNotifications] = useState(notificationService.getNotifications());

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) return;

        notificationService.addNotification({
            title,
            content,
            type,
            sender: 'Ms. Linh Nguyễn'
        });

        alert('Gửi thông báo thành công!');
        setTitle('');
        setContent('');
        setNotifications(notificationService.getNotifications());
    };

    return (
        <div className="max-w-7xl mx-auto pb-12 animate-in fade-in duration-500">
            {/* Header Section */}
            <section className="mb-10">
                <h2 className="text-4xl font-black text-slate-800 tracking-tight">Tạo Thông Báo Mới</h2>
                <p className="text-slate-500 mt-2 font-bold text-lg">Gửi tin nhắn tức thì hoặc đặt lịch đến phụ huynh học sinh.</p>
            </section>

            {/* Section 1: Quick Templates */}
            <section className="mb-12">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Mẫu Thông Báo Nhanh</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <button onClick={() => { setTitle('Nhắc học phí tháng 10/2023'); setType('general'); }} className="group p-8 bg-white hover:bg-blue-50/50 rounded-3xl text-left transition-all duration-300 border-l-[6px] border-blue-500 shadow-sm border border-slate-100/50 active:scale-95">
                        <span className="material-symbols-outlined text-blue-500 mb-3 block text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                        <h4 className="font-black text-slate-800 mb-1 text-lg">Nhắc học phí</h4>
                        <p className="text-xs font-bold text-slate-400 group-hover:text-slate-600 tracking-tight">Mẫu nhắc đóng học phí tháng hiện tại cho phụ huynh.</p>
                    </button>
                    <button onClick={() => { setTitle('Thông báo nghỉ học'); setType('emergency'); }} className="group p-8 bg-white hover:bg-red-50/50 rounded-3xl text-left transition-all duration-300 border-l-[6px] border-red-500 shadow-sm border border-slate-100/50 active:scale-95">
                        <span className="material-symbols-outlined text-red-500 mb-3 block text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>event_busy</span>
                        <h4 className="font-black text-slate-800 mb-1 text-lg">Nghỉ học</h4>
                        <p className="text-xs font-bold text-slate-400 group-hover:text-slate-600 tracking-tight">Thông báo nghỉ lễ hoặc nghỉ đột xuất của lớp học.</p>
                    </button>
                    <button onClick={() => { setTitle('Mời họp phụ huynh'); setType('event'); }} className="group p-8 bg-white hover:bg-amber-50/50 rounded-3xl text-left transition-all duration-300 border-l-[6px] border-amber-500 shadow-sm border border-slate-100/50 active:scale-95">
                        <span className="material-symbols-outlined text-amber-500 mb-3 block text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
                        <h4 className="font-black text-slate-800 mb-1 text-lg">Họp phụ huynh</h4>
                        <p className="text-xs font-bold text-slate-400 group-hover:text-slate-600 tracking-tight">Thư mời họp phụ huynh định kỳ cuối học kỳ.</p>
                    </button>
                </div>
            </section>

            {/* Main Interactive Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Compose Form */}
                <div className="lg:col-span-7">
                    <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                        <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-slate-800">
                            <span className="material-symbols-outlined text-primary text-3xl">edit_note</span>
                            Soạn thảo thông báo
                        </h3>
                        <form className="space-y-6" onSubmit={handleSend}>
                            <div>
                                <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest">Tiêu đề thông báo</label>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-800"
                                    placeholder="VD: Thông báo đóng học phí tháng 10"
                                    type="text"
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <label className="col-span-3 block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">Mức độ ưu tiên</label>
                                <button
                                    type="button"
                                    onClick={() => setType('emergency')}
                                    className={`py-3 px-4 rounded-full border text-xs font-black flex items-center justify-center gap-2 transition-all ${type === 'emergency' ? 'bg-red-500 text-white border-red-500 shadow-md shadow-red-500/20' : 'bg-white text-red-500 border-red-100 hover:bg-red-50'}`}
                                >
                                    <span className={`w-2 h-2 rounded-full ${type === 'emergency' ? 'bg-white' : 'bg-red-500'}`}></span> Khẩn cấp
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setType('event')}
                                    className={`py-3 px-4 rounded-full border text-xs font-black flex items-center justify-center gap-2 transition-all ${type === 'event' ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20' : 'bg-white text-amber-500 border-amber-100 hover:bg-amber-50'}`}
                                >
                                    Sự kiện
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setType('general')}
                                    className={`py-3 px-4 rounded-full border text-xs font-black flex items-center justify-center gap-2 transition-all ${type === 'general' ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-500/20' : 'bg-white text-blue-500 border-blue-100 hover:bg-blue-50'}`}
                                >
                                    Thường
                                </button>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest">Nội dung chi tiết</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-600 min-h-[150px]"
                                    placeholder="Nhập nội dung gửi đến phụ huynh..."
                                    rows={5}
                                ></textarea>

                                {/* AI Suggestion */}
                                <div className="mt-4 p-5 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 flex items-start gap-4">
                                    <div className="bg-white p-2.5 rounded-xl shadow-sm">
                                        <span className="material-symbols-outlined text-indigo-500 text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">AI Gợi ý tóm tắt</p>
                                        <p className="text-sm font-medium text-slate-600 leading-relaxed mt-1 italic">"Thông báo nhắc nhở đóng học phí tháng 10 hạn chót ngày 05/10 để đảm bảo quyền lợi học tập của bé."</p>
                                        <button onClick={() => setContent("Thông báo nhắc nhở đóng học phí tháng 10 hạn chót ngày 05/10 để đảm bảo quyền lợi học tập của bé.")} className="mt-2 text-xs font-black text-indigo-600 hover:text-indigo-800 transition-colors" type="button">Sử dụng tóm tắt này</button>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full bg-primary text-white py-5 rounded-full font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 text-lg mt-4">
                                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                                Gửi thông báo ngay
                            </button>
                        </form>
                    </div>
                </div>

                {/* Recipient Selection & Preview */}
                <div className="lg:col-span-5 space-y-8">
                    {/* Recipients Selection */}
                    <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-6 px-2">
                            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                                <span className="material-symbols-outlined text-amber-500">group_add</span>
                                Người Nhận
                            </h3>
                            <button className="text-[10px] font-black text-primary px-3 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 tracking-widest uppercase">Chọn tất cả</button>
                        </div>
                        <div className="relative mb-6">
                            <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                                <span className="material-symbols-outlined text-sm">search</span>
                            </span>
                            <input className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400" placeholder="Tìm tên học sinh..." type="text" />
                        </div>
                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border-2 border-transparent hover:border-primary/20 hover:bg-white transition-all group cursor-pointer shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <img alt="Student" className="w-10 h-10 rounded-full object-cover ring-2 ring-white" src={`https://i.pravatar.cc/150?u=${i}`} />
                                        <div>
                                            <p className="text-sm font-black text-slate-800">Học sinh {i}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Lớp STEAM A{i}</p>
                                        </div>
                                    </div>
                                    <input defaultChecked className="w-5 h-5 rounded-md border-slate-200 text-primary focus:ring-primary/20" type="checkbox" />
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-xs font-black text-slate-400">Đã chọn: <span className="text-primary">12/25 học sinh</span></span>
                            <button className="text-xs font-black text-red-500 flex items-center gap-1 hover:bg-red-50 px-3 py-1.5 rounded-xl transition-colors">
                                <span className="material-symbols-outlined text-sm">filter_list_off</span>
                                Bỏ lọc
                            </button>
                        </div>
                    </div>

                    {/* Preview Widget */}
                    <div className="bg-slate-900 rounded-[40px] p-8 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-800 rounded-b-2xl z-20"></div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 text-center">Xem trước tin nhắn</h3>
                        
                        <div className="bg-[#f0f2f5] rounded-3xl p-5 min-h-[220px] shadow-inner relative z-10">
                            <div className="bg-white rounded-2xl p-5 shadow-md space-y-3 animate-pulse-subtle">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">KidsFit STEAM</p>
                                        <p className="text-[8px] text-slate-400 font-bold">Vừa xong</p>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <h5 className="font-black text-sm text-slate-800 leading-tight">{title || "Nhắc học phí tháng 10"}</h5>
                                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed truncate-3-lines">{content || "Chào phụ huynh, nhà trường xin nhắc lịch đóng học phí tháng 10 của bé..."}</p>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-400 text-lg">description</span>
                                    <p className="text-[9px] font-bold text-slate-500 truncate">bieu_phi_steam.pdf</p>
                                </div>
                                <button className="w-full bg-primary text-white py-2.5 rounded-xl text-[10px] font-black shadow-lg shadow-primary/20">Xác nhận đã đọc</button>
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
                    </div>
                </div>
            </div>

            {/* History Table */}
            <section className="mt-16 space-y-8">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                        <span className="material-symbols-outlined text-slate-400">history</span>
                        Lịch sử Thông báo
                    </h3>
                    <button className="text-xs font-black text-primary flex items-center gap-1 hover:bg-green-50 px-4 py-2 rounded-2xl transition-all">
                        Xem tất cả lịch sử
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                </div>
                <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-400 uppercase text-[10px] tracking-widest font-black">
                                    <th className="px-8 py-5">Ngày gửi</th>
                                    <th className="px-8 py-5">Tiêu đề</th>
                                    <th className="px-8 py-5">Loại</th>
                                    <th className="px-8 py-5">Trạng thái</th>
                                    <th className="px-8 py-5">Người nhận</th>
                                    <th className="px-8 py-5 text-right">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {notifications.map(n => (
                                    <tr key={n.id} className="hover:bg-slate-50/30 transition-colors">
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-black text-slate-800">{n.date.split(' ')[1]}</p>
                                            <p className="text-[10px] font-bold text-slate-400 mt-0.5">{n.date.split(' ')[0]}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-bold text-slate-700 truncate max-w-xs">{n.title}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter ${n.type === 'emergency' ? 'bg-red-50 text-red-500' : n.type === 'event' ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-500'}`}>
                                                {n.type === 'emergency' ? 'Khẩn cấp' : n.type === 'event' ? 'Sự kiện' : 'Thường'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                                                <p className="text-xs font-black text-primary">Đã gửi (22/25)</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Lớp STEAM A1</td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="w-10 h-10 flex items-center justify-center hover:bg-primary/10 rounded-xl text-primary transition-all border border-transparent hover:border-primary/20" title="Gửi lại">
                                                    <span className="material-symbols-outlined text-xl">replay</span>
                                                </button>
                                                <button className="w-10 h-10 flex items-center justify-center hover:bg-red-50 rounded-xl text-red-500 transition-all border border-transparent hover:border-red-100" title="Xóa">
                                                    <span className="material-symbols-outlined text-xl">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NotificationsManageView;
