import React from 'react';

const MenuView = () => {
    return (
        <div className="w-full max-w-[1400px] mx-auto animate-fade-in fade-in pt-4">
            {/* Header Section */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-2">Thực đơn dinh dưỡng của Bé Minh Khôi</h1>
                    <p className="text-sky-600 font-medium flex items-center gap-2 mt-3 md:mt-0">
                        <span className="material-symbols-outlined text-sm">school</span> Mầm 1 • Thứ Tư, 24 Tháng 5
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <div className="bg-slate-100 px-4 py-2 rounded-full flex items-center gap-3 text-sm font-medium text-slate-700 shadow-sm border border-slate-200">
                        <span className="material-symbols-outlined text-slate-500">calendar_month</span>
                        Tuần 4 - Tháng 5
                        <span className="material-symbols-outlined text-slate-400 leading-none">keyboard_arrow_down</span>
                    </div>
                    <button className="bg-white border border-slate-200 text-slate-700 px-5 py-2 rounded-full flex items-center gap-2 text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">print</span> In thực đơn
                    </button>
                    <button className="bg-[#4cae4f] text-white px-5 py-2 rounded-full flex items-center gap-2 text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">chat</span> Góp ý
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Meals Grid */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Breakfast Card */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm relative group border border-slate-100">
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-sky-500"></div>
                        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                            <div className="relative w-full md:w-48 h-48 flex-shrink-0">
                                <img alt="Cháo yến mạch" className="w-full h-full object-cover rounded-xl shadow-inner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd3t-jxRx9rAMcQyyr2fBxkUKgdp9LLquP3ojfkMurqVrceRee94FBtHM1Xpv5rV6xXNb3iQ9zwVFrCR7nMj3dYFC7lFKbD3i0kpkiIVhcbviIjvGTKp0HCMg90U9U4QWOP_nJQzEspZ-w6Xtbzihq9ug4ZYdqI8571z7vkm299oIh3fW1oO9igKtUvvpZAAcEBeC0pucNJfN4RBD2TMGoh_1aSw5oGE1bOQUXID0NJLlT-JSdZ9sX2X9KoeqcHyxpjHKjpHtWHms" />
                                <div className="absolute -top-3 -right-3 bg-sky-100 text-sky-700 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-sky-200 shadow-sm">Bữa sáng</div>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Cháo yến mạch & Chuối</h2>
                                        <span className="bg-emerald-50 text-emerald-600 text-[11px] px-3 py-1 rounded-full font-bold flex items-center w-fit gap-1 border border-emerald-100">
                                            <span className="material-symbols-outlined text-sm">check_circle</span> Phù hợp với bé
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[11px] font-bold text-slate-500 block bg-slate-50 px-2 py-1 rounded-md border border-slate-100">08:00 AM</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-3 md:gap-4 mb-6">
                                    <div className="text-center py-2 px-1 rounded-xl bg-slate-50 border border-slate-100">
                                        <p className="text-[11px] text-slate-500 mb-0.5 font-medium">Cals</p>
                                        <p className="font-bold text-slate-800">320</p>
                                    </div>
                                    <div className="text-center py-2 px-1 rounded-xl bg-slate-50 border border-slate-100">
                                        <p className="text-[11px] text-slate-500 mb-0.5 font-medium">Protein</p>
                                        <p className="font-bold text-slate-800">12g</p>
                                    </div>
                                    <div className="text-center py-2 px-1 rounded-xl bg-slate-50 border border-slate-100">
                                        <p className="text-[11px] text-slate-500 mb-0.5 font-medium">Carb</p>
                                        <p className="font-bold text-slate-800">45g</p>
                                    </div>
                                    <div className="text-center py-2 px-1 rounded-xl bg-slate-50 border border-slate-100">
                                        <p className="text-[11px] text-slate-500 mb-0.5 font-medium">Fat</p>
                                        <p className="font-bold text-slate-800">8g</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">Yến mạch nguyên cám nấu cùng sữa tươi ít đường, bổ sung chuối chín cắt lát và hạt chia giàu Omega-3 giúp bé khởi đầu ngày mới đầy năng lượng.</p>
                            </div>
                        </div>
                    </div>

                    {/* Lunch Card */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm relative group border border-slate-100">
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-emerald-500"></div>
                        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                            <div className="relative w-full md:w-48 h-48 flex-shrink-0">
                                <img alt="Cơm cá kho" className="w-full h-full object-cover rounded-xl shadow-inner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh2qIeQDnxiQnzkO7UduMdsVXDLfLssSm4zgF9dsDfhviZ_esFMAT1dsZ_Gk32gJxYE91WNi5DjgH8iXRffVYXrcx8GvKXiiYRkldIZzLByD3dJIH-UGZRMmnIxoKtlE8GM5ZwHiePWWWNmLV2pB_e-dIhIbSAfaOAAch2KpCZWhM45i8evUjOEsKFRDFNfL5zVMUSra-2ttzNLpxaq2sh1E_U8jrfqG84tNaiKPGbmHdsS0OKhkZLPHQl2U-LXca8ym-70xBTqGg"/>
                                <div className="absolute -top-3 -right-3 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-emerald-200 shadow-sm">Bữa trưa</div>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Cơm cá kho tộ & Canh cải</h2>
                                        <span className="bg-rose-50 text-rose-600 text-[11px] px-3 py-1 rounded-full font-bold flex items-center w-fit gap-1 border border-rose-100">
                                            <span className="material-symbols-outlined text-sm">warning</span> ⚠️ Chú ý: Đậu nành
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[11px] font-bold text-slate-500 block bg-slate-50 px-2 py-1 rounded-md border border-slate-100">11:30 AM</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-3 md:gap-4 mb-6">
                                    <div className="text-center py-2 px-1 rounded-xl bg-slate-50 border border-slate-100">
                                        <p className="text-[11px] text-slate-500 mb-0.5 font-medium">Cals</p>
                                        <p className="font-bold text-slate-800">450</p>
                                    </div>
                                    <div className="text-center py-2 px-1 rounded-xl bg-slate-50 border border-slate-100">
                                        <p className="text-[11px] text-slate-500 mb-0.5 font-medium">Protein</p>
                                        <p className="font-bold text-slate-800">22g</p>
                                    </div>
                                    <div className="text-center py-2 px-1 rounded-xl bg-slate-50 border border-slate-100">
                                        <p className="text-[11px] text-slate-500 mb-0.5 font-medium">Carb</p>
                                        <p className="font-bold text-slate-800">60g</p>
                                    </div>
                                    <div className="text-center py-2 px-1 rounded-xl bg-slate-50 border border-slate-100">
                                        <p className="text-[11px] text-slate-500 mb-0.5 font-medium">Fat</p>
                                        <p className="font-bold text-slate-800">14g</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">Cá lóc đồng kho tộ đậm đà, dùng kèm cơm trắng dẻo và canh cải bẹ xanh thịt băm. <span className="text-rose-500 font-medium whitespace-nowrap">Lưu ý nước màu có chút đậu nành.</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Afternoon Snack Card */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm relative group border border-slate-100">
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-amber-500"></div>
                        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                            <div className="relative w-full md:w-48 h-48 flex-shrink-0">
                                <img alt="Sữa tươi & Bánh" className="w-full h-full object-cover rounded-xl shadow-inner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEbZpR-4pqoBs5-6CeclC5R8iAFOzfHON_W31KkF3bhJyikqkUvhBtsuPX8BWDQ4hCJxaUFFCMu7LgI_mGO8CA1oGV_yikQ_1CWN1UwKS7M8NVORjjVc-QAdrIBw2KVfffehxn3ALPkqnmuxcDh9xYbq0gQIHMIZorBbBsP6FnCmWuYNtxARG4AX9ZuctHzEzIMDqwUkHQPrbr4wePYHheK0Z5QwHDMmHFWKl_ET1gdB8IV9o-1oMcbEhS5M1g0PMz0ZrEHUFDr7A"/>
                                <div className="absolute -top-3 -right-3 bg-amber-100 text-amber-800 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-amber-200 shadow-sm">Xế chiều</div>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Sữa tươi & Bánh quy lạt</h2>
                                        <span className="bg-emerald-50 text-emerald-600 text-[11px] px-3 py-1 rounded-full font-bold flex items-center w-fit gap-1 border border-emerald-100">
                                            <span className="material-symbols-outlined text-sm">check_circle</span> Phù hợp với bé
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[11px] font-bold text-slate-500 block bg-slate-50 px-2 py-1 rounded-md border border-slate-100">03:30 PM</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-3 md:gap-4 mb-6">
                                    <div className="text-center py-2 px-1 rounded-xl bg-slate-50 border border-slate-100">
                                        <p className="text-[11px] text-slate-500 mb-0.5 font-medium">Cals</p>
                                        <p className="font-bold text-slate-800">180</p>
                                    </div>
                                    <div className="text-center py-2 px-1 rounded-xl bg-slate-50 border border-slate-100">
                                        <p className="text-[11px] text-slate-500 mb-0.5 font-medium">Protein</p>
                                        <p className="font-bold text-slate-800">6g</p>
                                    </div>
                                    <div className="text-center py-2 px-1 rounded-xl bg-slate-50 border border-slate-100">
                                        <p className="text-[11px] text-slate-500 mb-0.5 font-medium">Carb</p>
                                        <p className="font-bold text-slate-800">24g</p>
                                    </div>
                                    <div className="text-center py-2 px-1 rounded-xl bg-slate-50 border border-slate-100">
                                        <p className="text-[11px] text-slate-500 mb-0.5 font-medium">Fat</p>
                                        <p className="font-bold text-slate-800">5g</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">Bữa phụ nhẹ nhàng cung cấp Canxi và vitamin D giúp xương chắc khỏe trước khi bé ra sân chơi vận động chiều.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Sidebar Analysis */}
                <div className="lg:col-span-4 space-y-6">
                    {/* AI Analysis Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-blue-500 bg-blue-50 p-2 rounded-xl">analytics</span>
                            <h3 className="text-lg font-bold text-slate-800 tracking-tight">AI Phân tích dinh dưỡng</h3>
                        </div>
                        <div className="relative w-full aspect-square flex items-center justify-center mb-6 max-h-[300px]">
                            <svg className="w-full h-full transform -rotate-18 max-w-[200px]" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" fill="none" r="40" stroke="#f1f5f9" strokeWidth="1" />
                                <circle cx="50" cy="50" fill="none" r="30" stroke="#f1f5f9" strokeWidth="1" />
                                <circle cx="50" cy="50" fill="none" r="20" stroke="#f1f5f9" strokeWidth="1" />
                                <line stroke="#f1f5f9" strokeWidth="1" x1="50" x2="50" y1="10" y2="90" />
                                <line stroke="#f1f5f9" strokeWidth="1" x1="10" x2="90" y1="50" y2="50" />
                                <polygon fill="rgba(16, 185, 129, 0.2)" points="50,20 80,50 50,85 25,50" stroke="#10b981" strokeWidth="2" strokeLinejoin="round" />
                                <circle cx="50" cy="20" fill="#10b981" r="2" />
                                <circle cx="80" cy="50" fill="#10b981" r="2" />
                                <circle cx="50" cy="85" fill="#10b981" r="2" />
                                <circle cx="25" cy="50" fill="#10b981" r="2" />
                            </svg>
                            <div className="absolute top-[5%] left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-400 bg-white/80 px-1 rounded">ĐẠM</div>
                            <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-400 bg-white/80 px-1 rounded">BÉO</div>
                            <div className="absolute left-[5%] top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-400 bg-white/80 px-1 rounded">VITAMIN</div>
                            <div className="absolute right-[5%] top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-400 bg-white/80 px-1 rounded">CARB</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <p className="text-sm text-slate-600 leading-relaxed text-center">"Hôm nay cơ cấu dinh dưỡng của bé rất cân đối, tập trung nhiều vào đạm và tinh bột phức."</p>
                        </div>
                    </div>

                    {/* AI Dinner Suggestions */}
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-sm border border-indigo-100 relative">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-indigo-600 bg-white p-2 border border-indigo-100 rounded-xl shadow-sm">auto_awesome</span>
                            <h3 className="text-lg font-bold text-indigo-900 tracking-tight">Gợi ý bữa tối tại nhà</h3>
                        </div>
                        <div className="bg-white/90 p-5 rounded-xl text-[13px] text-indigo-900 leading-relaxed mb-4 border border-white shadow-sm">
                            "Chào mẹ, hôm nay bé ăn khá nhiều đạm từ cá và yến mạch. Tối nay mẹ nên cho bé ăn <strong>rau muống luộc</strong> và tráng miệng bằng <strong>cam tươi</strong> để bổ sung chất xơ và Vitamin C nhé! 🥦🍊"
                        </div>
                        <div className="flex gap-2">
                            <span className="bg-white text-emerald-600 border border-emerald-100 text-[10px] px-2.5 py-1 rounded-md font-bold shadow-sm">NHIỀU XƠ</span>
                            <span className="bg-white text-amber-600 border border-amber-100 text-[10px] px-2.5 py-1 rounded-md font-bold shadow-sm">VITAMIN C</span>
                        </div>
                    </div>

                    {/* Feedback Area */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-base font-bold text-slate-800 mb-5 text-center">Đánh giá thực đơn hôm nay</h3>
                        <div className="flex items-center justify-center gap-6">
                            <button className="flex flex-col items-center gap-2 group w-24">
                                <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 group-hover:border-emerald-200 transition-all shadow-sm">
                                    <span className="material-symbols-outlined text-3xl transition-transform group-hover:scale-110">sentiment_very_satisfied</span>
                                </div>
                                <span className="text-[11px] font-semibold text-slate-500 group-hover:text-emerald-600">Bé thích</span>
                            </button>
                            <button className="flex flex-col items-center gap-2 group w-24">
                                <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-rose-50 group-hover:text-rose-500 group-hover:border-rose-200 transition-all shadow-sm">
                                    <span className="material-symbols-outlined text-3xl transition-transform group-hover:scale-110">sentiment_dissatisfied</span>
                                </div>
                                <span className="text-[11px] font-semibold text-slate-500 group-hover:text-rose-600">Không thích</span>
                            </button>
                        </div>
                        <div className="mt-6">
                            <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-[13px] focus:ring-2 focus:ring-[#4cae4f]/20 focus:border-[#4cae4f] transition-all resize-none h-20 placeholder:text-slate-400 outline-none" placeholder="Chia sẻ thêm cảm nhận của bé..."></textarea>
                        </div>
                        <button className="w-full mt-4 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-bold text-sm shadow-md active:scale-[0.98] transition-all relative overflow-hidden group">
                            <span className="relative z-10">Gửi đánh giá</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform hidden md:block"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuView;
