import React from 'react';

const MessagesView = () => {
    return (
        <div className="flex bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-[750px] max-h-[80vh]">
            {/* Message List Sidebar */}
            <div className="w-80 border-r border-slate-100 flex flex-col shrink-0 bg-white">
                <div className="p-4 bg-slate-50/50">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-sm">search</span>
                        <input className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-700/20" placeholder="Tìm giáo viên hoặc phòng ban..." type="text"/>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {/* Contact Item Active */}
                    <div className="p-4 bg-green-50 border-l-4 border-green-700 flex gap-3 cursor-pointer">
                        <div className="relative shrink-0">
                            <img alt="Giáo viên Minh Thu" className="w-12 h-12 rounded-2xl object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIuDkLC_a79YWqwP4_1tq2Hc0bA22nMdsb5yQrovFFYo1h-CaA-3Syd3lj7Tc7Yzz2yHM8PsOpBHA2A84EtxwLJyesrt87yY8TG5SmUn1mPOnmfE2YBpEN-Zw1e8YagzG1zcSSfsjuhCoA29B6xliz0YfWfF3OfBh5a1j6uBI7gxUUuJLbGtWGWrR6RytM0nK_2X6-3OcH7VkiLzBdaEg930RJ1PYZUfLwYOxDg9QAghLjnewJEGceaFhnXEEjkEouy6qKx654Mzg" />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <p className="text-sm font-bold truncate">Cô Minh Thu</p>
                                <span className="text-[10px] text-slate-500">08:45 AM</span>
                            </div>
                            <p className="text-xs text-green-700 font-medium truncate">Dạ chào chị, em đã nhận được...</p>
                        </div>
                    </div>
                    {/* Contact Item */}
                    <div className="p-4 border-b border-slate-50 flex gap-3 cursor-pointer hover:bg-slate-50 transition-colors">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <p className="text-sm font-bold truncate">Phòng Kế Toán</p>
                                <span className="text-[10px] text-slate-500">Hôm qua</span>
                            </div>
                            <p className="text-xs text-slate-500 truncate">Hóa đơn tháng 10 đã được xuất.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat View */}
            <div className="flex-1 flex flex-col bg-slate-50/50 relative">
                {/* Chat Header */}
                <div className="px-6 py-4 bg-white flex justify-between items-center shadow-sm z-10">
                    <div className="flex items-center gap-3">
                        <img alt="Minh Thu" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIuDkLC_a79YWqwP4_1tq2Hc0bA22nMdsb5yQrovFFYo1h-CaA-3Syd3lj7Tc7Yzz2yHM8PsOpBHA2A84EtxwLJyesrt87yY8TG5SmUn1mPOnmfE2YBpEN-Zw1e8YagzG1zcSSfsjuhCoA29B6xliz0YfWfF3OfBh5a1j6uBI7gxUUuJLbGtWGWrR6RytM0nK_2X6-3OcH7VkiLzBdaEg930RJ1PYZUfLwYOxDg9QAghLjnewJEGceaFhnXEEjkEouy6qKx654Mzg" />
                        <div>
                            <h3 className="text-sm font-bold text-slate-800">Cô Minh Thu</h3>
                            <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Đang hoạt động
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
                            <span className="material-symbols-outlined text-sm">emergency</span>
                            KHẨN CẤP
                        </button>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="text-center">
                        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold bg-white px-3 py-1 rounded-full shadow-sm">Hôm nay</span>
                    </div>

                    {/* Sent Message (From Parent) */}
                    <div className="flex flex-col items-end gap-1 ml-auto max-w-[80%]">
                        <div className="bg-green-700 text-white p-4 rounded-2xl rounded-tr-none shadow-sm">
                            <p className="text-sm">Chào cô Thu, sáng nay bé Quân thức dậy hơi ho nhẹ và có vẻ hơi mệt. Cô theo dõi giúp gia đình xem bé có sốt không nhé. Cảm ơn cô!</p>
                        </div>
                        <div className="flex items-center gap-1 px-1">
                            <span className="text-[10px] text-slate-400">08:32 AM</span>
                            <span className="material-symbols-outlined text-xs text-green-700">done_all</span>
                        </div>
                    </div>

                    {/* Received Message (From Teacher) */}
                    <div className="flex items-end gap-3 max-w-[80%]">
                        <img alt="Giáo viên" className="w-8 h-8 rounded-full object-cover shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIuDkLC_a79YWqwP4_1tq2Hc0bA22nMdsb5yQrovFFYo1h-CaA-3Syd3lj7Tc7Yzz2yHM8PsOpBHA2A84EtxwLJyesrt87yY8TG5SmUn1mPOnmfE2YBpEN-Zw1e8YagzG1zcSSfsjuhCoA29B6xliz0YfWfF3OfBh5a1j6uBI7gxUUuJLbGtWGWrR6RytM0nK_2X6-3OcH7VkiLzBdaEg930RJ1PYZUfLwYOxDg9QAghLjnewJEGceaFhnXEEjkEouy6qKx654Mzg" />
                        <div className="group">
                            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
                                <p className="text-sm text-slate-800">Dạ chào chị, em đã nhận được thông tin ạ. Em sẽ để ý bé kỹ hơn, nếu có biểu hiện gì bất thường em sẽ báo chị ngay ạ. Chị yên tâm nhé!</p>
                            </div>
                            <div className="flex items-center gap-2 mt-1 px-1">
                                <span className="text-[10px] text-slate-400">08:45 AM</span>
                            </div>
                        </div>
                    </div>

                    {/* Status Update (Asymmetric Element) */}
                    <div className="flex justify-center">
                        <div className="bg-blue-50 border border-blue-100 px-4 py-2 rounded-2xl flex items-center gap-3">
                            <span className="material-symbols-outlined text-blue-600">medical_services</span>
                            <p className="text-xs text-blue-800 font-semibold">Giáo viên đã cập nhật Nhật ký sức khỏe: Theo dõi ho</p>
                        </div>
                    </div>
                </div>

                {/* Footer / Input */}
                <div className="p-4 bg-white border-t border-slate-100 space-y-3 z-10 w-full">
                    {/* Quick Replies */}
                    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                        <button className="shrink-0 px-4 py-1.5 bg-slate-100 hover:bg-green-100 text-slate-700 rounded-full text-xs font-medium transition-colors border border-slate-200">Bé ăn ngon không cô?</button>
                        <button className="shrink-0 px-4 py-1.5 bg-slate-100 hover:bg-green-100 text-slate-700 rounded-full text-xs font-medium transition-colors border border-slate-200">Trưa nay bé ngủ ngoan không?</button>
                        <button className="shrink-0 px-4 py-1.5 bg-slate-100 hover:bg-green-100 text-slate-700 rounded-full text-xs font-medium transition-colors border border-slate-200">Xin nghỉ học ngày mai</button>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-100 p-2 rounded-2xl w-full">
                        <button className="p-2 text-slate-500 hover:text-green-700 transition-colors"><span className="material-symbols-outlined">add_circle</span></button>
                        <input className="flex-1 bg-transparent border-none focus:ring-0 text-sm outline-none" placeholder="Nhập tin nhắn đến Giáo viên..." type="text"/>
                        <button className="p-2 text-slate-500 hover:text-green-700 transition-colors"><span className="material-symbols-outlined">mood</span></button>
                        <button className="w-10 h-10 bg-green-700 text-white rounded-xl flex items-center justify-center shadow-lg shadow-green-700/30 active:scale-95 transition-transform">
                            <span className="material-symbols-outlined">send</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* AI Summary Panel */}
            <div className="w-72 bg-slate-50 border-l border-slate-100 p-5 hidden lg:block overflow-y-auto">
                <div className="flex items-center gap-2 mb-6">
                    <span className="material-symbols-outlined text-green-700" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                    <h4 className="font-bold text-sm text-slate-800">Trợ lý AI</h4>
                </div>
                <div className="space-y-4">
                    {/* Summary Card */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-yellow-600">
                        <h5 className="text-[10px] font-bold text-yellow-800 uppercase mb-2">Tóm tắt tình hình</h5>
                        <p className="text-xs text-slate-800 leading-relaxed">Bạn vừa dặn cô theo dõi tình trạng ho nhẹ của <strong>Minh Quân</strong>. Cô giáo đã ghi nhận.</p>
                    </div>
                    {/* Task List */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm">
                        <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-3">Thông tin liên quan</h5>
                        <ul className="space-y-3">
                            <li className="flex gap-2 items-start">
                                <span className="material-symbols-outlined text-green-700 text-sm mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>thermometer</span>
                                <span className="text-xs text-slate-700">Lần đo nhiệt độ gần nhất: 36.5°C lúc 10:00 AM</span>
                            </li>
                            <li className="flex gap-2 items-start opacity-70">
                                <span className="material-symbols-outlined text-blue-600 text-sm mt-0.5">info</span>
                                <span className="text-xs text-slate-700">Xem thêm trong tab Sức Khỏe</span>
                            </li>
                        </ul>
                    </div>
                    {/* Child Profile Quick Access */}
                    <div className="pt-4 mt-6 border-t border-slate-200">
                        <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-4">Thông tin Cô giáo</h5>
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-500">GV Chủ nhiệm</span>
                                <span className="font-bold text-slate-800">Minh Thu</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-500">Liên hệ khẩn</span>
                                <span className="font-bold text-slate-800">098x.xxx.xxx</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagesView;
