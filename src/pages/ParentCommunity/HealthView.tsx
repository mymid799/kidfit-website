import React from 'react';

const HealthView = () => {
    return (
        <div className="max-w-7xl mx-auto py-8 space-y-10 text-slate-800">
            {/* Summary Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {/* Temperature */}
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-8 border-green-700 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 opacity-5 text-green-700">
                        <span className="material-symbols-outlined text-8xl">device_thermostat</span>
                    </div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Nhiệt độ</p>
                    <h3 className="text-3xl font-extrabold text-green-700">36.5°C</h3>
                    <p className="text-xs font-semibold text-green-700/80 mt-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">check_circle</span> Ổn định
                    </p>
                </div>
                {/* Status */}
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-8 border-blue-700 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 opacity-5 text-blue-700">
                        <span className="material-symbols-outlined text-8xl">mood</span>
                    </div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Trạng thái</p>
                    <h3 className="text-2xl font-extrabold text-blue-700">Bình thường</h3>
                    <p className="text-xs font-semibold text-blue-700/80 mt-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">sentiment_satisfied</span> Bé vui vẻ
                    </p>
                </div>
                {/* Eating */}
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-8 border-green-700 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 opacity-5 text-green-700">
                        <span className="material-symbols-outlined text-8xl">restaurant</span>
                    </div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Ăn uống</p>
                    <h3 className="text-3xl font-extrabold text-green-700">Tốt</h3>
                    <p className="text-xs font-semibold text-green-700/80 mt-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">add_task</span> Hết suất ăn
                    </p>
                </div>
                {/* Sleep */}
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-8 border-blue-700 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 opacity-5 text-blue-700">
                        <span className="material-symbols-outlined text-8xl">bedtime</span>
                    </div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Ngủ nghỉ</p>
                    <h3 className="text-3xl font-extrabold text-blue-700">1h30</h3>
                    <p className="text-xs font-semibold text-blue-700/80 mt-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">schedule</span> Sâu giấc
                    </p>
                </div>
            </section>

            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Timeline & Growth */}
                <div className="lg:col-span-8 space-y-10">
                    {/* Timeline Section */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold tracking-tight">Nhật ký trong ngày</h2>
                            <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Hôm nay, 12/10</span>
                        </div>
                        <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
                            {/* Entry 1 */}
                            <div className="flex gap-6 relative">
                                <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center z-10 shadow-sm ring-4 ring-white">
                                    <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>login</span>
                                </div>
                                <div className="flex-1 bg-white p-5 rounded-lg border border-slate-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-lg">Đến lớp</h4>
                                        <span className="text-sm font-medium text-slate-400">08:30</span>
                                    </div>
                                    <p className="text-base text-slate-600">Nhiệt độ đo tại cổng: <span className="text-green-700 font-bold">36.2°C</span>. Bé chào cô và ba mẹ vui vẻ.</p>
                                </div>
                            </div>
                            {/* Entry 2 */}
                            <div className="flex gap-6 relative">
                                <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center z-10 shadow-sm ring-4 ring-white">
                                    <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
                                </div>
                                <div className="flex-1 bg-white p-5 rounded-lg border border-slate-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-lg">Ăn trưa</h4>
                                        <span className="text-sm font-medium text-slate-400">11:30</span>
                                    </div>
                                    <p className="text-base text-slate-600">Thực đơn: Cơm, canh rau củ, thịt kho trứng. Bé ăn hết <span className="text-blue-700 font-bold">1 bát cơm đầy</span>.</p>
                                </div>
                            </div>
                            {/* Entry 3 */}
                            <div className="flex gap-6 relative">
                                <div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center z-10 shadow-sm ring-4 ring-white">
                                    <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bedtime</span>
                                </div>
                                <div className="flex-1 bg-white p-5 rounded-lg border border-slate-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-lg">Ngủ trưa</h4>
                                        <span className="text-sm font-medium text-slate-400">12:30</span>
                                    </div>
                                    <p className="text-base text-slate-600">Giờ ngủ: <span className="font-bold">12:30 - 14:00</span>. Bé ngủ ngon, không quấy khóc.</p>
                                </div>
                            </div>
                            {/* Entry 4 */}
                            <div className="flex gap-6 relative">
                                <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center z-10 shadow-sm ring-4 ring-white">
                                    <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>sports_kabaddi</span>
                                </div>
                                <div className="flex-1 bg-white p-5 rounded-lg border border-slate-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-lg">Hoạt động</h4>
                                        <span className="text-sm font-medium text-slate-400">15:30</span>
                                    </div>
                                    <p className="text-base text-slate-600">Lớp STEAM Âm nhạc: Nhảy múa theo nhạc sôi động. Bé rất hăng hái tham gia.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Growth Chart */}
                    <section className="bg-white p-8 rounded-xl shadow-sm border-l-8 border-blue-400">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">Biểu đồ tăng trưởng</h2>
                                <p className="text-sm text-slate-500">6 tháng gần nhất so với chuẩn WHO</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-700"></div>
                                    <span className="text-xs font-semibold">Cân nặng (kg)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-700"></div>
                                    <span className="text-xs font-semibold">Chiều cao (cm)</span>
                                </div>
                            </div>
                        </div>
                        {/* Visual representation of a chart */}
                        <div className="h-64 flex items-end justify-between px-4 pb-8 relative">
                            {/* Grid lines */}
                            <div className="absolute inset-x-0 bottom-8 h-px bg-slate-100"></div>
                            <div className="absolute inset-x-0 bottom-24 h-px bg-slate-100"></div>
                            <div className="absolute inset-x-0 bottom-40 h-px bg-slate-100"></div>
                            {/* Months & Data points (Visual mockup) */}
                            <div className="flex flex-col items-center gap-3 w-1/6">
                                <div className="relative w-full h-40 flex justify-center">
                                    <div className="absolute bottom-0 w-2 bg-blue-700/20 h-[50%] rounded-t-full"></div>
                                    <div className="absolute bottom-0 w-2 bg-green-700/20 h-[70%] rounded-t-full ml-4"></div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400">THÁNG 5</span>
                            </div>
                            <div className="flex flex-col items-center gap-3 w-1/6">
                                <div className="relative w-full h-40 flex justify-center">
                                    <div className="absolute bottom-0 w-2 bg-blue-700/30 h-[55%] rounded-t-full"></div>
                                    <div className="absolute bottom-0 w-2 bg-green-700/30 h-[72%] rounded-t-full ml-4"></div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400">THÁNG 6</span>
                            </div>
                            <div className="flex flex-col items-center gap-3 w-1/6">
                                <div className="relative w-full h-40 flex justify-center">
                                    <div className="absolute bottom-0 w-2 bg-blue-700/40 h-[60%] rounded-t-full"></div>
                                    <div className="absolute bottom-0 w-2 bg-green-700/40 h-[75%] rounded-t-full ml-4"></div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400">THÁNG 7</span>
                            </div>
                            <div className="flex flex-col items-center gap-3 w-1/6">
                                <div className="relative w-full h-40 flex justify-center">
                                    <div className="absolute bottom-0 w-2 bg-blue-700/60 h-[65%] rounded-t-full"></div>
                                    <div className="absolute bottom-0 w-2 bg-green-700/60 h-[78%] rounded-t-full ml-4"></div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400">THÁNG 8</span>
                            </div>
                            <div className="flex flex-col items-center gap-3 w-1/6">
                                <div className="relative w-full h-40 flex justify-center">
                                    <div className="absolute bottom-0 w-2 bg-blue-700/80 h-[70%] rounded-t-full"></div>
                                    <div className="absolute bottom-0 w-2 bg-green-700/80 h-[82%] rounded-t-full ml-4"></div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400">THÁNG 9</span>
                            </div>
                            <div className="flex flex-col items-center gap-3 w-1/6">
                                <div className="relative w-full h-40 flex justify-center">
                                    <div className="absolute bottom-0 w-3 bg-blue-700 h-[75%] rounded-t-full shadow-lg shadow-blue-700/20"></div>
                                    <div className="absolute bottom-0 w-3 bg-green-700 h-[85%] rounded-t-full ml-5 shadow-lg shadow-green-700/20"></div>
                                </div>
                                <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">THÁNG 10</span>
                            </div>
                        </div>
                    </section>
                </div>
                {/* Side Panels */}
                <div className="lg:col-span-4 space-y-8">
                    {/* AI Insight Card */}
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg shadow-md border border-white relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                            </div>
                            <h3 className="font-bold text-lg text-green-900">AI Smart Insights</h3>
                        </div>
                        <p className="text-base text-green-800 leading-relaxed">
                            Bé Minh Quân đang phát triển chiều cao vượt mức trung bình <span className="font-bold underline">5%</span> ✨.
                        </p>
                        <div className="mt-4 p-3 bg-white/60 rounded-lg border border-green-700/10">
                            <p className="text-sm text-green-700 italic">
                                <span className="font-bold block not-italic mb-1">Gợi ý:</span>
                                Ba mẹ nên bổ sung thêm canxi từ hải sản vào thực đơn cuối tuần nhé!
                            </p>
                        </div>
                    </div>
                    {/* Teacher Comments */}
                    <section className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-700">
                        <div className="flex items-center gap-3 mb-4">
                            <img alt="Cô giáo Mai" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB49KtbFXvnQto2M0l9oSm_sk8rRKYSRC_EUR537yQAT1VzFKzaXYGePxCK09a45Z3iYu5SKCuRCgiU7tSJtwWGFDkX6AcwMP3vfIu3uRZRUtddCIJBPPZXIUGzJjKgFL5glItnRA9i0ohVqSqu5__Dau5dsr9SPuDP-5lngXWse1Ssho_7XSn8Jtg8fkiwQVe4LfiVYkROWbCESMbi7U290kE3dL6TdaPJAx8J5a6uJVAoIGlEdPo0mvnWqBSsn1ezWVtWETim_ec" />
                            <div>
                                <h4 className="font-bold">Nhận xét của cô giáo</h4>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cô Mai • Lớp Chồi 1</p>
                            </div>
                        </div>
                        <p className="text-base text-slate-700 italic leading-relaxed">
                            "Hôm nay bé Minh Quân ăn rất ngoan, tham gia hoạt động hăng hái. Buổi chiều bé có ra mồ hôi nhiều khi chơi, cô đã thay áo cho bé."
                        </p>
                    </section>
                    {/* Vaccination Notification */}
                    <div className="bg-red-100/40 p-6 rounded-lg border-2 border-red-600/5 relative group">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="material-symbols-outlined text-red-600" style={{ fontVariationSettings: "'FILL' 1" }}>vaccines</span>
                            <h4 className="font-bold text-red-900">Nhắc lịch tiêm chủng</h4>
                        </div>
                        <p className="text-base text-red-900/80 font-medium">
                            Nhắc lịch tiêm chủng Cúm vào ngày <span className="font-black">15/10/2023</span> tại Trạm y tế gần trường.
                        </p>
                        <button className="mt-4 w-full py-2 bg-red-600 text-white font-bold rounded-full text-sm shadow-lg shadow-red-600/20 active:scale-95 transition-transform">
                            Xác nhận đã xem
                        </button>
                    </div>
                    {/* History Quick Access */}
                    <div className="bg-slate-100 p-6 rounded-lg">
                        <h4 className="font-bold mb-4 flex items-center justify-between">
                            Lịch sử sức khỏe
                            <span className="material-symbols-outlined text-slate-400">history</span>
                        </h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center bg-white p-3 rounded-lg text-sm shadow-sm">
                                <div>
                                    <p className="font-bold">Cân nặng: 18kg</p>
                                    <p className="text-[10px] text-slate-400">Cập nhật: 10/10/2023</p>
                                </div>
                                <span className="material-symbols-outlined text-green-700 text-sm">trending_up</span>
                            </div>
                            <div className="flex justify-between items-center bg-white p-3 rounded-lg text-sm shadow-sm">
                                <div>
                                    <p className="font-bold">Chiều cao: 110cm</p>
                                    <p className="text-[10px] text-slate-400">Cập nhật: 10/10/2023</p>
                                </div>
                                <span className="material-symbols-outlined text-green-700 text-sm">trending_up</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthView;
