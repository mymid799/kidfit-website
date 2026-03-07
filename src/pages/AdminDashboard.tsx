import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside className="w-72 bg-white dark:bg-background-dark border-r border-slate-200 dark:border-slate-800 flex flex-col">
                    <div className="p-6 flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-3xl">draw</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-tight text-primary">Vẽ Tư Duy STEAM</h1>
                            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Super Admin</p>
                        </div>
                    </div>
                    <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                        <a className="flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-xl shadow-md" href="#">
                            <span className="material-symbols-outlined">dashboard</span>
                            <span className="font-medium">Tổng quan</span>
                        </a>
                        <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors" href="#">
                            <span className="material-symbols-outlined text-secondary">group</span>
                            <span className="font-medium">Quản lý Tài Khoản</span>
                        </a>
                        <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors" href="#">
                            <span className="material-symbols-outlined text-secondary">monitoring</span>
                            <span className="font-medium">Giám sát Hoạt Động</span>
                        </a>
                        <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors" href="#">
                            <span className="material-symbols-outlined text-secondary">article</span>
                            <span className="font-medium">Quản lý Nội Dung</span>
                        </a>
                        <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors" href="#">
                            <span className="material-symbols-outlined text-secondary">bar_chart</span>
                            <span className="font-medium">Báo Cáo & Thống Kê</span>
                        </a>
                        <div className="pt-4 pb-2 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Hệ thống</div>
                        <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors" href="#">
                            <span className="material-symbols-outlined">settings</span>
                            <span className="font-medium">Cài Đặt Hệ Thống</span>
                        </a>
                        <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors" href="#">
                            <span className="material-symbols-outlined">history_edu</span>
                            <span className="font-medium">Log Hệ Thống</span>
                        </a>
                    </nav>
                    <div className="p-4 m-4 bg-primary/10 rounded-xl">
                        <p className="text-xs text-primary font-bold mb-2">Hỗ trợ kỹ thuật</p>
                        <button className="w-full py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">Liên hệ ngay</button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <header className="h-20 bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shrink-0">
                        <div className="flex items-center gap-4 w-96">
                            <div className="relative w-full">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                                <input className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary/50 text-sm" placeholder="Tìm kiếm dữ liệu..." type="text" />
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <button className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">notifications</span>
                                </button>
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-background-dark">5</span>
                            </div>
                            <div className="flex items-center gap-3 border-l pl-6 border-slate-200 dark:border-slate-800">
                                <div className="text-right">
                                    <p className="text-sm font-bold leading-none">Admin Nguyễn</p>
                                    <p className="text-xs text-slate-500 mt-1">Quản trị viên cấp cao</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-primary/20 overflow-hidden border-2 border-primary/20">
                                    <img alt="Admin Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoGly1du3ut1O-pXIr1SaQnG2ZN0tpihQEN_RyW6z_79b80IyfcwVbDdY38N9M6RWj4uDwe96Kb9rWMGFI7rmM8Sl5uhLY_iZU_C6N5e2WVqNKeLs88zNjfTMCoIfMLklU94ziZxTOt8Uawg9eHyHYG0dxmgpOjsXuoENSpVnAP2lvZCgLBkvUUdjafd1SaN9FEjlPHOmt4MocdDBwpCFK-7_efopJeurjg6IbECMr5uR4nsgqBKvkl1kCU8NRHBc7ngJUkiCClnA" />
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Dashboard Body */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-8">
                        {/* Top Warning Box */}
                        <div className="bg-gradient-to-r from-secondary to-primary p-6 rounded-2xl flex items-center justify-between text-white shadow-xl shadow-primary/20 border border-white/10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white text-3xl">pending_actions</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">Nội dung chờ duyệt</h3>
                                    <p className="opacity-90">Có 5 nội dung mới đang chờ bạn kiểm duyệt trên hệ thống.</p>
                                </div>
                            </div>
                            <button className="px-6 py-2 bg-accent text-slate-900 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-accent/20">Xem ngay</button>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white dark:bg-background-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-slate-500 text-sm font-medium">Tổng người dùng</p>
                                        <h4 className="text-3xl font-black mt-1">1,500</h4>
                                    </div>
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <span className="material-symbols-outlined">person</span>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center gap-2">
                                    <div className="flex-1 h-8 flex items-end gap-1">
                                        <div className="bg-primary/30 w-full rounded-t-sm" style={{ height: '40%' }}></div>
                                        <div className="bg-primary/30 w-full rounded-t-sm" style={{ height: '60%' }}></div>
                                        <div className="bg-primary/30 w-full rounded-t-sm" style={{ height: '45%' }}></div>
                                        <div className="bg-primary/30 w-full rounded-t-sm" style={{ height: '80%' }}></div>
                                        <div className="bg-primary/30 w-full rounded-t-sm" style={{ height: '70%' }}></div>
                                        <div className="bg-primary w-full rounded-t-sm" style={{ height: '90%' }}></div>
                                    </div>
                                    <span className="text-xs text-primary font-bold">+12%</span>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-background-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-slate-500 text-sm font-medium">Giáo viên</p>
                                        <h4 className="text-3xl font-black mt-1">50</h4>
                                    </div>
                                    <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                                        <span className="material-symbols-outlined">school</span>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center gap-2">
                                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-secondary w-[75%] rounded-full shadow-[0_0_10px_rgba(33,150,243,0.5)]"></div>
                                    </div>
                                    <span className="text-xs text-secondary font-bold">75%</span>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-background-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-slate-500 text-sm font-medium">Phụ huynh</p>
                                        <h4 className="text-3xl font-black mt-1">600</h4>
                                    </div>
                                    <div className="p-2 bg-accent/20 rounded-lg text-yellow-600">
                                        <span className="material-symbols-outlined">family_restroom</span>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center gap-2">
                                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-400 w-[60%] rounded-full shadow-[0_0_10px_rgba(255,235,59,0.5)]"></div>
                                    </div>
                                    <span className="text-xs text-yellow-600 font-bold">60%</span>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-background-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-slate-500 text-sm font-medium">Học sinh</p>
                                        <h4 className="text-3xl font-black mt-1">850</h4>
                                    </div>
                                    <div className="p-2 bg-red-100 rounded-lg text-red-500">
                                        <span className="material-symbols-outlined">child_care</span>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center gap-2">
                                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-400 w-[85%] rounded-full shadow-[0_0_10px_rgba(244,67,54,0.5)]"></div>
                                    </div>
                                    <span className="text-xs text-red-500 font-bold">85%</span>
                                </div>
                            </div>
                        </div>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Bar Chart Area */}
                            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-xl font-black">Hoạt động hàng tháng</h3>
                                    <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary h-10 px-4">
                                        <option>Năm 2024</option>
                                        <option>Năm 2023</option>
                                    </select>
                                </div>
                                <div className="flex items-end justify-between h-64 px-4 gap-4">
                                    {[
                                        { label: 'Tháng 1', value: 45 },
                                        { label: 'Tháng 2', value: 65 },
                                        { label: 'Tháng 3', value: 85 },
                                        { label: 'Tháng 4', value: 60 },
                                        { label: 'Tháng 5', value: 95 },
                                        { label: 'Tháng 6', value: 75 }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex flex-col items-center gap-3 w-full h-full justify-end">
                                            <div className="w-full bg-slate-50 dark:bg-slate-800 rounded-t-xl relative h-full">
                                                <div
                                                    className="absolute bottom-0 w-full bg-primary rounded-t-xl hover:opacity-80 transition-all cursor-pointer shadow-lg shadow-primary/10"
                                                    style={{ height: `${item.value}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pie Chart Area */}
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                                <h3 className="text-xl font-black mb-8">Phân bố khối tuổi</h3>
                                <div className="flex-1 flex flex-col justify-center">
                                    <div className="flex justify-center mb-8 relative">
                                        <svg className="w-48 h-48" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" fill="transparent" r="40" stroke="#4cae4f" strokeDasharray="251.2" strokeDashoffset="60" strokeWidth="15"></circle>
                                            <circle cx="50" cy="50" fill="transparent" r="40" stroke="#2196F3" strokeDasharray="251.2" strokeDashoffset="180" strokeWidth="15"></circle>
                                            <circle cx="50" cy="50" fill="transparent" r="40" stroke="#FFEB3B" strokeDasharray="251.2" strokeDashoffset="240" strokeWidth="15"></circle>
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-3xl font-black">100%</span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Học sinh</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_8px_rgba(76,174,79,0.5)]"></div>
                                                <span className="text-sm font-bold">Mầm</span>
                                            </div>
                                            <span className="text-sm font-black text-slate-600">35%</span>
                                        </div>
                                        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 bg-secondary rounded-full shadow-[0_0_8px_rgba(33,150,243,0.5)]"></div>
                                                <span className="text-sm font-bold">Chồi</span>
                                            </div>
                                            <span className="text-sm font-black text-slate-600">45%</span>
                                        </div>
                                        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 bg-accent rounded-full shadow-[0_0_8px_rgba(255,235,59,0.5)]"></div>
                                                <span className="text-sm font-bold">Lá</span>
                                            </div>
                                            <span className="text-sm font-black text-slate-600">20%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Table */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <h3 className="text-xl font-black">Hoạt động gần nhất</h3>
                                <button className="text-primary text-sm font-black flex items-center gap-1 hover:underline group">
                                    Xem tất cả <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                        <tr>
                                            <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Thời gian</th>
                                            <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Người dùng</th>
                                            <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Hoạt động</th>
                                            <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng thái</th>
                                            <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-8 py-4 text-xs font-medium text-slate-500">Hôm nay, 10:45</td>
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shadow-sm border border-white">
                                                        <img alt="User" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher" />
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-800">Gv. Minh Anh</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-black text-[10px] uppercase tracking-tighter shadow-sm border border-secondary/10">Upload</span>
                                                    <span className="text-xs font-bold text-slate-600 italic">Bài giảng Tư duy sáng tạo</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-2 text-primary">
                                                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(76,174,79,0.5)]"></span>
                                                    <span className="text-[10px] font-black uppercase tracking-tighter">Thành công</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4 text-right">
                                                <button className="p-2 text-slate-300 hover:text-primary transition-colors hover:bg-primary/5 rounded-lg">
                                                    <span className="material-symbols-outlined text-lg">more_horiz</span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-8 py-4 text-xs font-medium text-slate-500">Hôm nay, 09:20</td>
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shadow-sm border border-white">
                                                        <img alt="User" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Parent" />
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-800">Pn. Hoàng Nam</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-black text-[10px] uppercase tracking-tighter shadow-sm border border-primary/10">Login</span>
                                                    <span className="text-xs font-bold text-slate-600 italic">Đăng nhập từ Mobile App</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-2 text-primary">
                                                    <span className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(76,174,79,0.5)]"></span>
                                                    <span className="text-[10px] font-black uppercase tracking-tighter">Thành công</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4 text-right">
                                                <button className="p-2 text-slate-300 hover:text-primary transition-colors hover:bg-primary/5 rounded-lg">
                                                    <span className="material-symbols-outlined text-lg">more_horiz</span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-8 py-4 text-xs font-medium text-slate-500">05/03/2024, 16:30</td>
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shadow-sm border border-white">
                                                        <img alt="User" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kids" />
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-800">Hs. Bé Bi</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="px-3 py-1 bg-accent/20 text-yellow-700 rounded-full font-black text-[10px] uppercase tracking-tighter shadow-sm border border-accent/20">Đăng bài</span>
                                                    <span className="text-xs font-bold text-slate-600 italic">Bức vẽ "Gia đình em"</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-2 text-yellow-500">
                                                    <span className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce shadow-[0_0_8px_rgba(255,235,59,0.5)]"></span>
                                                    <span className="text-[10px] font-black uppercase tracking-tighter">Đang duyệt</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4 text-right">
                                                <button className="p-2 text-slate-300 hover:text-primary transition-colors hover:bg-primary/5 rounded-lg">
                                                    <span className="material-symbols-outlined text-lg">more_horiz</span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
