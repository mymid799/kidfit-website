import React from 'react';

const FeesView = () => {
    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">Xem và Quản lý Học phí</h1>
                <p className="text-slate-600 font-medium">Chào buổi sáng, Phụ huynh của Minh Quân! Dưới đây là tình hình tài chính tháng này.</p>
            </header>
            
            {/* Bento Layout Content */}
            <div className="grid grid-cols-12 gap-8">
                {/* Summary Cards Section */}
                <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Total Fees */}
                    <div className="col-span-1 md:col-span-2 bg-slate-50 rounded-lg p-8 relative overflow-hidden flex flex-col justify-between min-h-[180px] border border-slate-100 shadow-sm">
                        <div className="relative z-10">
                            <span className="text-slate-600 text-sm uppercase tracking-widest font-bold">Tổng học phí tháng 10</span>
                            <h2 className="text-5xl font-extrabold text-green-700 mt-2">5.450.000đ</h2>
                        </div>
                        <div className="flex items-center gap-2 mt-4 text-green-700 font-semibold relative z-10">
                            <span className="material-symbols-outlined">calendar_today</span>
                            <span>Hạn: 05/10/2023</span>
                        </div>
                        {/* Background Halo Effect */}
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-500/10 rounded-full blur-3xl z-0"></div>
                    </div>
                    {/* Payment Status */}
                    <div className="col-span-1 bg-white rounded-lg p-8 border-l-8 border-yellow-500 flex flex-col items-center justify-center text-center shadow-sm">
                        <span className="material-symbols-outlined text-yellow-500 text-5xl mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>pending_actions</span>
                        <div className="px-4 py-1 rounded-full bg-yellow-100 text-yellow-800 font-bold text-sm mb-2">Chưa thanh toán</div>
                        <p className="text-slate-600 text-xs font-bold">Vui lòng hoàn tất trước hạn</p>
                    </div>
                </div>

                {/* AI Insights Card */}
                <div className="col-span-12 lg:col-span-4 bg-white/80 backdrop-blur-md rounded-lg p-8 border border-white/40 shadow-xl shadow-green-900/5 relative">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">Dự báo thông minh</h3>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                            <p className="text-sm text-slate-600 font-medium mb-1">Dự kiến tháng tới</p>
                            <div className="text-2xl font-bold text-blue-600">5.200.000đ</div>
                        </div>
                        <div className="flex gap-4 items-start bg-yellow-50 p-4 rounded-xl border border-yellow-100/50">
                            <span className="material-symbols-outlined text-yellow-600 mt-1">lightbulb</span>
                            <p className="text-sm text-yellow-800 leading-relaxed">
                                <span className="font-bold">Mẹo:</span> Đăng ký đóng theo quý để tiết kiệm 5% (khoảng 780.000đ/năm).
                            </p>
                        </div>
                    </div>
                </div>

                {/* Fee Breakdown */}
                <div className="col-span-12 lg:col-span-7 bg-white rounded-lg p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-slate-800">Chi tiết Chi phí</h3>
                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Kỳ học: Học kỳ I</span>
                    </div>
                    <div className="space-y-4">
                        {/* Item */}
                        <div className="flex items-center justify-between py-4 border-b border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-700">
                                    <span className="material-symbols-outlined">school</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">Học phí chính khóa</h4>
                                    <p className="text-xs text-slate-500">Tháng 10/2023</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-slate-800">3.500.000đ</p>
                            </div>
                        </div>
                        {/* Item */}
                        <div className="flex items-center justify-between py-4 border-b border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                    <span className="material-symbols-outlined">restaurant</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">Tiền ăn dinh dưỡng</h4>
                                    <p className="text-xs text-slate-500">22 buổi x 40.000đ</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-slate-800">880.000đ</p>
                            </div>
                        </div>
                        {/* Item */}
                        <div className="flex items-center justify-between py-4 border-b border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600">
                                    <span className="material-symbols-outlined">directions_bus</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">Xe đưa đón</h4>
                                    <p className="text-xs text-slate-500">2 chiều - 5km</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-slate-800">600.000đ</p>
                            </div>
                        </div>
                        {/* Item */}
                        <div className="flex items-center justify-between py-4 border-b border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                                    <span className="material-symbols-outlined">palette</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">Ngoại khóa STEAM</h4>
                                    <p className="text-xs text-slate-500">Lớp Robotics nâng cao</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-slate-800">470.000đ</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                        <div className="text-right mr-8">
                            <p className="text-sm text-slate-500 font-bold">Thành tiền</p>
                            <p className="text-3xl font-extrabold text-slate-800">5.450.000đ</p>
                        </div>
                        <button className="bg-green-700 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-transform shadow-lg shadow-green-700/25">
                            <span className="material-symbols-outlined">payments</span>
                            Thanh toán ngay
                        </button>
                    </div>
                </div>

                {/* Payment Methods and History */}
                <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
                    <div className="bg-slate-50 rounded-lg p-8 border border-slate-100 shadow-sm">
                        <h3 className="text-lg font-bold mb-6 text-slate-800">Phương thức thanh toán</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {/* Momo */}
                            <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-green-500 border-2 border-transparent transition-all cursor-pointer shadow-sm">
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-fuchsia-600 flex items-center justify-center">
                                    <img alt="MoMo Wallet" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBB7f7WPk7NK0S1CFNAEosCF9L1wiJGdbfzP7R0DjiHWLuC3SUC2GEkEuGp5Xja46451QHUyitSOzj_1iinflfwyz-mM9qVSJSkYRxptwMf11SXZavvAM804pyd-vPW67EaBvl1uP79NLIdO2JCxWspjt13wbpI1h_3ZXo22L_h-i7BvGy3GJMiwMTMhe9bEXxppumBMm4LiZTKOEiv86KbRDfwA4GmYeun14T3MvxJNtFtrXQfx0s6ZeX_xcZ5WdldJuiHM7qR9z0" />
                                </div>
                                <span className="text-xs font-bold text-slate-700">MoMo</span>
                            </div>
                            {/* ZaloPay */}
                            <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-green-500 border-2 border-transparent transition-all cursor-pointer shadow-sm">
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-blue-500 flex items-center justify-center">
                                    <img alt="ZaloPay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7Hz_juJf7sciNp3GLHgAxWCdzc2_Nki_o98WOKPAOG25PS6mGTrkTTG7XFpv9wOqUGnaxOi7oBUjm9qoFHlzEdgwXU50iksTWJwAYZInh6gO34aG0X2sYMx9rd9lK-v-EsV2c5Sqq88uyjad5RXVL5r_OwMCgQAxucezQnHiPbkRPJQ8nfGpDJX9uAHxAn0drgfxiwmNgyhAn8XZWN87IIeGqMOj6JPrNR5rNoWwW5YpFCJyVi3EKLfepjACjUIKddCibKHTtpPA" />
                                </div>
                                <span className="text-xs font-bold text-slate-700">ZaloPay</span>
                            </div>
                            {/* Bank */}
                            <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-green-500 border-2 border-transparent transition-all cursor-pointer shadow-sm">
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-green-700 flex items-center justify-center border border-green-800">
                                    <img alt="Vietcombank" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7Tlp0ud7FeLvMNVDSsseFaho1cMbCf8TLHuEbZEV2XaIcNs-jRqlJh-EDOmJxjNDgfb9JrGAgaVgQ76NceaFQPGA5kH3D5Y1hdjdKyCqt8PQBSMYwyPdsQXwz_UaHjGaG2J5crDo_j3FgAuk76oz-JbnSn4TP4933c0bLzogkSW76l3I1II8fjXoXBdn8DBYe_2d3yHhokLFbYwQ0azjx4_4Yxi8eli66wbuYqzgifJZEGg3jmxScj8m8-G64hSYZ-MzPKTZCp-A" />
                                </div>
                                <span className="text-xs font-bold text-slate-700">Vietcombank</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment History Section */}
                    <div className="bg-slate-50 rounded-lg p-8 flex-1 border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-800">Lịch sử thanh toán</h3>
                            <button className="text-green-700 font-bold text-sm hover:underline">Xem tất cả</button>
                        </div>
                        <div className="space-y-4">
                            {/* History Row */}
                            <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                <div>
                                    <p className="font-bold text-slate-800">Tháng 09/2023</p>
                                    <p className="text-xs text-slate-500 font-bold">Đã đóng: 10/09</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-bold text-green-700">5.120k</span>
                                    <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
                                        <span className="material-symbols-outlined">download</span>
                                    </button>
                                </div>
                            </div>
                            {/* History Row */}
                            <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                <div>
                                    <p className="font-bold text-slate-800">Tháng 08/2023</p>
                                    <p className="text-xs text-slate-500 font-bold">Đã đóng: 05/08</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-bold text-green-700">4.950k</span>
                                    <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
                                        <span className="material-symbols-outlined">download</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeesView;
