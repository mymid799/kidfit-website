import React from 'react';

const Overview = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Stats Row */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-[24px] shadow-sm border-b-[5px] border-[#4cae4f] flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-[13px] font-bold">Điểm danh</span>
                        <div className="w-8 h-8 bg-[#e8f5e9] rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#4cae4f] text-[18px]">check_circle</span>
                        </div>
                    </div>
                    <p className="text-[26px] font-black text-slate-800 tracking-tight leading-none mt-2">Có mặt</p>
                    <p className="text-[12px] text-slate-400 font-medium italic mt-1">Đến đúng giờ</p>
                </div>
                
                <div className="bg-white p-6 rounded-[24px] shadow-sm border-b-[5px] border-blue-500 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-[13px] font-bold">Giờ đến/về</span>
                        <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-blue-500 text-[18px] fill-[1]">schedule</span>
                        </div>
                    </div>
                    <p className="text-[26px] font-black text-slate-800 tracking-tight leading-none mt-2">07:30 - 16:30</p>
                    <p className="text-[12px] text-slate-400 font-medium mt-1">Lịch trình hôm nay</p>
                </div>

                <div className="bg-white p-6 rounded-[24px] shadow-sm border-b-[5px] border-orange-400 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-[13px] font-bold">Hoạt động chính</span>
                        <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-orange-500 text-[18px] fill-[1]">palette</span>
                        </div>
                    </div>
                    <p className="text-[26px] font-black text-slate-800 tracking-tight leading-none mt-2">Vẽ tranh</p>
                    <p className="text-[12px] text-slate-400 font-medium mt-1">Nghệ thuật & Sáng tạo</p>
                </div>

                <div className="bg-white p-6 rounded-[24px] shadow-sm border-b-[5px] border-purple-400 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-[13px] font-bold">Ngủ trưa</span>
                        <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-purple-500 text-[18px] fill-[1]">dark_mode</span>
                        </div>
                    </div>
                    <p className="text-[26px] font-black text-slate-800 tracking-tight leading-none mt-2">12:30 - 14:30</p>
                    <p className="text-[12px] text-slate-400 font-medium mt-1">Ngủ 2 tiếng</p>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                    {/* Daily Timeline */}
                    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-50">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-[20px] font-black flex items-center gap-3 text-slate-800 tracking-tight">
                                <span className="material-symbols-outlined text-[#4cae4f]">calendar_today</span> 
                                Nhật ký hàng ngày
                            </h3>
                            <span className="text-[13px] text-slate-500 font-bold">Hôm nay, 24 Th10</span>
                        </div>
                        
                        <div className="space-y-0 relative pl-[18px]">
                            {/* Vertical Line Overlay */}
                            <div className="absolute left-[37.5px] top-6 bottom-6 w-px bg-slate-200 pointer-events-none"></div>

                            {[
                                { icon: 'login', color: 'bg-blue-50 text-blue-500', title: 'Đón bé', time: '07:30 • Mẹ đưa bé đến trường' },
                                { icon: 'palette', color: 'bg-yellow-50 text-yellow-500', title: 'Lớp vẽ tư duy', time: '09:00 • Chủ đề: Gia đình của bé' },
                                { icon: 'restaurant', color: 'bg-pink-50 text-pink-500', title: 'Giờ ăn trưa', time: '11:30 • Ăn hết 90% suất ăn' },
                                { icon: 'bed', color: 'bg-purple-50 text-purple-500', title: 'Giờ ngủ trưa', time: '12:30 • Ngủ sâu trong 2 tiếng' },
                                { icon: 'park', color: 'bg-green-50 text-green-500', title: 'Hoạt động ngoài trời', time: '15:30 • Chơi lâu đài cát ở sân trường', isLast: true },
                            ].map((item, idx) => (
                                <div key={idx} className={`flex gap-6 relative group ${item.isLast ? '' : 'mb-8'}`}>
                                    <div className="flex flex-col items-center">
                                        <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center z-10 ring-8 ring-white`}>
                                            <span className="material-symbols-outlined text-[20px] fill-[1]">{item.icon}</span>
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                        <p className="font-bold text-[16px] text-slate-800">{item.title}</p>
                                        <p className="text-[13px] text-slate-500 font-medium mt-1">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Today's Menu */}
                    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-50">
                        <h3 className="text-[20px] font-black flex items-center gap-3 mb-8 text-slate-800 tracking-tight">
                            <span className="material-symbols-outlined text-[#4cae4f]">restaurant_menu</span> 
                            Thực đơn dinh dưỡng hôm nay
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: 'BỮA SÁNG', icon: 'wb_sunny', bg: 'border-blue-100 bg-blue-50/20 text-blue-600' },
                                { label: 'BỮA TRƯA', icon: 'lunch_dining', bg: 'border-yellow-100 bg-yellow-50/20 text-yellow-600' },
                                { label: 'BỮA XẾ', icon: 'local_cafe', bg: 'border-pink-100 bg-pink-50/20 text-pink-600' },
                            ].map(menu => (
                                <div key={menu.label} className={`p-5 rounded-[24px] border ${menu.bg} flex flex-col gap-2 items-center justify-center`}>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">{menu.icon}</span>
                                        <p className="font-black text-[11px] uppercase tracking-widest">{menu.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Charts & Announcements */}
                <div className="space-y-8">
                    {/* Development Stats */}
                    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-50">
                        <h3 className="text-[18px] font-black text-slate-800 mb-8 tracking-tight">Phát triển của bé</h3>
                        <div className="space-y-6">
                            {[
                                { label: 'Cân nặng', value: '15.5 kg', bar: '75%', color: 'bg-[#4cae4f]' },
                                { label: 'Chiều cao', value: '98 cm', bar: '65%', color: 'bg-blue-400' },
                            ].map(stat => (
                                <div key={stat.label}>
                                    <div className="flex justify-between items-center text-[12px] font-bold text-slate-500 mb-2">
                                        <span>{stat.label}</span>
                                        <span className="text-slate-800 font-bold">{stat.value} <span className="text-[#4cae4f] ml-1">↑</span></span>
                                    </div>
                                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${stat.color} rounded-full`} style={{ width: stat.bar }}></div>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-8">
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-6 text-center">CHUYÊN CẦN THEO THÁNG</p>
                                <div className="flex items-end justify-between gap-2 h-[100px] px-2">
                                    {[
                                        { label: 'Th6', height: '40%', color: 'bg-[#e8f5e9]' },
                                        { label: 'Th7', height: '55%', color: 'bg-[#c8e6c9]' },
                                        { label: 'Th8', height: '50%', color: 'bg-[#a5d6a7]' },
                                        { label: 'Th9', height: '65%', color: 'bg-[#81c784]' },
                                        { label: 'Th10', height: '100%', color: 'bg-[#4cae4f]' },
                                    ].map((col, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-3 relative h-full">
                                            <div className={`w-full rounded-t-[12px] ${col.color} absolute bottom-0`} style={{ height: col.height }}></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 mt-3 px-3">
                                    <span>Th6</span>
                                    <span>Th7</span>
                                    <span>Th8</span>
                                    <span>Th9</span>
                                    <span>Th10</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* News */}
                    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-50">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-[18px] font-black text-slate-800 tracking-tight">Tin tức lớp học</h3>
                            <span className="material-symbols-outlined text-slate-400">campaign</span>
                        </div>
                        <div className="space-y-4">
                            <div className="p-5 pl-6 bg-blue-50/50 rounded-2xl border-l-4 border-blue-500">
                                <p className="text-[11px] font-black text-blue-600 mb-2">Sự kiện sắp tới</p>
                                <p className="text-[14px] font-bold text-slate-800 leading-snug mb-2">Lễ hội hóa trang Halloween - 31/10</p>
                                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Phụ huynh vui lòng chuẩn bị trang phục đơn giản cho bé!</p>
                            </div>
                            <div className="p-5 pl-6 bg-slate-50/80 rounded-2xl">
                                <p className="text-[11px] font-black text-slate-500 mb-2">Thông báo sức khỏe</p>
                                <p className="text-[14px] font-bold text-slate-800 leading-snug mb-2">Phòng chống bệnh Tay Chân Miệng</p>
                                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Giữ đôi tay bé luôn sạch sẽ mỗi ngày.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
