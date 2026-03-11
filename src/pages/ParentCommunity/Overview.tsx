import React from 'react';

const Overview = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Summary Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border-b-4 border-green-400 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-sm font-bold">Điểm danh</span>
                        <div className="p-2 bg-green-50 rounded-xl">
                            <span className="material-symbols-outlined text-green-600">check_circle</span>
                        </div>
                    </div>
                    <p className="text-2xl font-black text-slate-800">Có mặt</p>
                    <p className="text-xs text-slate-400 font-bold italic underline decoration-green-200">Đến đúng giờ</p>
                </div>
                
                <div className="bg-white p-6 rounded-3xl shadow-sm border-b-4 border-blue-400 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-sm font-bold">Giờ đến/về</span>
                        <div className="p-2 bg-blue-50 rounded-xl">
                            <span className="material-symbols-outlined text-blue-600">schedule</span>
                        </div>
                    </div>
                    <p className="text-2xl font-black text-slate-800">07:30 - 16:30</p>
                    <p className="text-xs text-slate-400 font-bold">Lịch trình hôm nay</p>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border-b-4 border-orange-400 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-sm font-bold">Hoạt động chính</span>
                        <div className="p-2 bg-orange-50 rounded-xl">
                            <span className="material-symbols-outlined text-orange-600">palette</span>
                        </div>
                    </div>
                    <p className="text-2xl font-black text-slate-800">Vẽ tranh</p>
                    <p className="text-xs text-slate-400 font-bold">Nghệ thuật & Sáng tạo</p>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border-b-4 border-purple-400 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-sm font-bold">Ngủ trưa</span>
                        <div className="p-2 bg-purple-50 rounded-xl">
                            <span className="material-symbols-outlined text-purple-600">bedtime</span>
                        </div>
                    </div>
                    <p className="text-2xl font-black text-slate-800">12:30 - 14:30</p>
                    <p className="text-xs text-slate-400 font-bold">Ngủ 2 tiếng</p>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Timeline & Menu */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Daily Timeline */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black flex items-center gap-2 text-slate-800">
                                <span className="material-symbols-outlined text-[#4cae4f]">event_note</span> 
                                Nhật ký hàng ngày
                            </h3>
                            <span className="text-xs text-slate-400 font-black uppercase tracking-widest">Hôm nay, 24 Th10</span>
                        </div>
                        
                        <div className="space-y-0 relative">
                            {/* Vertical Line Overlay */}
                            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-slate-100 hidden sm:block"></div>

                            {[
                                { icon: 'login', color: 'bg-blue-50 text-blue-500', title: 'Đón bé', time: '07:30 • Mẹ đưa bé đến trường' },
                                { icon: 'draw', color: 'bg-yellow-50 text-yellow-600', title: 'Lớp vẽ tư duy', time: '09:00 • Chủ đề: Gia đình của bé' },
                                { icon: 'restaurant', color: 'bg-pink-50 text-pink-500', title: 'Giờ ăn trưa', time: '11:30 • Ăn hết 90% suất ăn' },
                                { icon: 'hotel', color: 'bg-purple-50 text-purple-600', title: 'Giờ ngủ trưa', time: '12:30 • Ngủ sâu trong 2 tiếng' },
                                { icon: 'park', color: 'bg-green-50 text-green-600', title: 'Hoạt động ngoài trời', time: '15:30 • Chơi lâu đài cát', isLast: true },
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-6 relative group">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-10 h-10 rounded-2xl ${item.color} flex items-center justify-center z-10 shadow-sm border-2 border-white transition-transform group-hover:scale-110`}>
                                            <span className="material-symbols-outlined text-lg">{item.icon}</span>
                                        </div>
                                        {!item.isLast && <div className="w-0.5 h-16 bg-slate-50 sm:hidden"></div>}
                                    </div>
                                    <div className="pb-10">
                                        <p className="font-black text-slate-800 group-hover:text-[#4cae4f] transition-colors">{item.title}</p>
                                        <p className="text-sm text-slate-400 font-medium">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Today's Menu */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50">
                        <h3 className="text-xl font-black flex items-center gap-2 mb-8 text-slate-800">
                            <span className="material-symbols-outlined text-[#4cae4f]">fastfood</span> 
                            Thực đơn dinh dưỡng
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { name: 'Cháo thịt bằm', extras: 'Cà rốt, thịt bằm, gừng', label: 'Bữa sáng', icon: 'wb_sunny', bg: 'bg-blue-50 text-blue-700' },
                                { name: 'Cơm, Canh rau, Cá kho', extras: 'Bữa ăn cân bằng', label: 'Bữa trưa', icon: 'lunch_dining', bg: 'bg-yellow-50 text-yellow-700' },
                                { name: 'Sữa tươi, bánh quy', extras: 'Bánh quy dinh dưỡng', label: 'Bữa xế', icon: 'cookie', bg: 'bg-pink-50 text-pink-700' },
                            ].map(menu => (
                                <div key={menu.label} className={`${menu.bg.split(' ')[0]} p-6 rounded-3xl border border-white shadow-sm flex flex-col gap-1 hover:shadow-md transition-shadow`}>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className={`material-symbols-outlined text-sm ${menu.bg.split(' ')[1]}`}>{menu.icon}</span>
                                        <p className="font-black text-[10px] uppercase tracking-widest">{menu.label}</p>
                                    </div>
                                    <p className="text-slate-800 font-black text-sm">{menu.name}</p>
                                    <p className="text-[10px] text-slate-400 font-bold">{menu.extras}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Charts & Announcements */}
                <div className="space-y-8">
                    {/* Development Stats */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50">
                        <h3 className="text-lg font-black text-slate-800 mb-6">Phát triển của bé</h3>
                        <div className="space-y-6">
                            {[
                                { label: 'Cân nặng', value: '15.5 kg', up: true, bar: '75%', color: 'bg-[#4cae4f]' },
                                { label: 'Chiều cao', value: '98 cm', up: true, bar: '65%', color: 'bg-blue-400' },
                            ].map(stat => (
                                <div key={stat.label}>
                                    <div className="flex justify-between text-xs font-black text-slate-400 mb-2 uppercase tracking-tighter">
                                        <span>{stat.label}</span>
                                        <span className="text-slate-800">{stat.value} <span className="text-green-500">↑</span></span>
                                    </div>
                                    <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-100">
                                        <div className={`h-full ${stat.color} rounded-full transition-all duration-1000 shadow-sm`} style={{ width: stat.bar }}></div>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-4 text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Chuyên cần theo tháng</p>
                                <div className="flex items-end justify-between gap-1.5 h-24 px-2">
                                    {[60, 85, 70, 95, 100].map((h, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                            <div className={`w-full ${i === 4 ? 'bg-[#4cae4f]' : 'bg-[#e8f5e9]'} rounded-t-lg transition-all group-hover:bg-[#4cae4f] border-x border-t border-white shadow-sm`} style={{ height: `${h}%` }}></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between text-[10px] font-black text-slate-400 mt-3 px-1 tracking-tighter">
                                    <span>Th06</span><span>Th07</span><span>Th08</span><span>Th09</span><span>Th10</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* News */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-black text-slate-800">Tin tức lớp học</h3>
                            <span className="material-symbols-outlined text-slate-300">campaign</span>
                        </div>
                        <div className="space-y-4">
                            <div className="p-5 bg-blue-50/50 rounded-3xl border-l-4 border-blue-400 shadow-sm">
                                <p className="text-[10px] font-black text-blue-600 mb-1 uppercase tracking-widest">Sự kiện sắp tới</p>
                                <p className="text-sm font-black text-slate-800 leading-tight">Lễ hội hóa trang Halloween - 31/10</p>
                                <p className="text-[10px] text-slate-500 font-bold mt-2">Phụ huynh chuẩn bị trang phục cho bé nhé!</p>
                            </div>
                            <div className="p-5 bg-slate-50 rounded-3xl border-l-4 border-slate-300">
                                <p className="text-[10px] font-black text-slate-500 mb-1 uppercase tracking-widest">Thông báo</p>
                                <p className="text-sm font-black text-slate-800 leading-tight">Phòng chống bệnh Tay Chân Miệng</p>
                                <p className="text-[10px] text-slate-500 font-bold mt-2">Giữ đôi tay bé luôn sạch sẽ mỗi ngày.</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Messaging */}
                    <div className="bg-[#4cae4f]/5 p-6 rounded-[2.5rem] border-2 border-dashed border-[#4cae4f]/20 group transition-colors hover:bg-[#4cae4f]/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-white p-1 overflow-hidden shadow-sm border border-[#4cae4f]/20">
                                <img 
                                    className="w-full h-full object-cover rounded-xl" 
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher_hong" 
                                    alt="Cô Hồng"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-800">Cô Hồng</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Giáo viên chủ nhiệm</p>
                            </div>
                        </div>
                        <div className="relative">
                            <input 
                                className="w-full text-xs py-3.5 pl-5 pr-12 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#4cae4f]/20 focus:border-[#4cae4f] focus:outline-none font-bold" 
                                placeholder="Nhắn tin cho Cô Hồng..." 
                                type="text"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#4cae4f] text-white p-2 rounded-xl shadow-md shadow-[#4cae4f]/20 hover:bg-[#3d913f] transition-colors">
                                <span className="material-symbols-outlined text-sm">send</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Gallery */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black flex items-center gap-2 text-slate-800">
                        <span className="material-symbols-outlined text-[#4cae4f]">auto_awesome_motion</span> 
                        Khoảnh khắc hôm nay
                    </h3>
                    <button className="text-xs font-black text-[#4cae4f] hover:underline uppercase tracking-widest">Xem tất cả (24)</button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="aspect-square rounded-3xl overflow-hidden group relative cursor-pointer shadow-sm border-4 border-white">
                            <img 
                                className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                                src={`https://api.dicebear.com/7.x/shapes/svg?seed=${i + i*2}`} 
                                alt="Khoảnh khắc bé"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-3xl">zoom_in</span>
                            </div>
                        </div>
                    ))}
                    <div className="aspect-square rounded-3xl overflow-hidden group relative cursor-pointer shadow-sm border-4 border-white bg-slate-900">
                        <div className="absolute inset-0 bg-[#4cae4f]/90 flex flex-col items-center justify-center text-white text-center p-4 z-10">
                            <span className="text-3xl font-black">+20</span>
                            <span className="text-[10px] font-black uppercase tracking-widest mt-1">Ảnh khác</span>
                        </div>
                         <img 
                            className="w-full h-full object-cover opacity-40 blur-sm" 
                            src="https://api.dicebear.com/7.x/shapes/svg?seed=extra" 
                            alt="Thêm ảnh"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Overview;
