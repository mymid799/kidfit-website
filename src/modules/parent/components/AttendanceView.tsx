import React from 'react';

const AttendanceView = () => {
    return (
        <div className="flex-1 px-4 md:px-0 py-2 max-w-[1400px] mx-auto w-full animate-fade-in fade-in">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 mb-6">
                <a className="text-[#4cae4f] text-sm font-medium hover:underline" href="#">Bảng điều khiển</a>
                <span className="text-slate-400 text-sm font-medium">/</span>
                <a className="text-[#4cae4f] text-sm font-medium hover:underline" href="#">Danh sách </a>
                <span className="text-slate-400 text-sm font-medium">/</span>
                <span className="text-slate-500 text-sm font-medium">Chi tiết Nguyễn Văn A</span>
            </div>

            {/* Profile Header */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-[#4cae4f]/5 mb-8">
                <div className="flex flex-col @container">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex gap-6 items-center">
                            <div className="bg-[#4cae4f]/10 p-1 rounded-full border-4 border-[#4cae4f]/20 shrink-0">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-24 h-24 md:w-32 md:h-32" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBu9HcwlTA2AbX5akaE0CAjN0ulIlsXt21S2vZzc7C6o1XsjLT01Ed_GbICPmRdHEPrDCyf8sKan-Wt3imayEwVjwI8lNe777tlum076MYRBDHUVoK1Qtr1XipPTGIJH1dM-AaEG2_-bdrVfQM1S8YkttRv6EWKLPItCIdt7rxxpAht9NS2MhB1EMpWVSFRilMm7AXqZlWJBBuqPdKtt2dyiBOcnC8H69bBlHJLqwsHbhQXVzO5wNifhcBV7tzp9KlArcmRrIqQzaE")' }}></div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-1 w-full flex-wrap">
                                    <h1 className="text-slate-900 dark:text-slate-100 text-2xl md:text-3xl font-bold tracking-tight">Nguyễn Văn A</h1>
                                    <span className="bg-[#4cae4f]/10 text-[#4cae4f] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 mt-1 md:mt-0">Đang học</span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2 flex-wrap">
                                    <span className="material-symbols-outlined text-base">school</span> Lớp: Mầm | <span className="material-symbols-outlined text-base md:ml-2">fingerprint</span> Mã HS: HS2024001
                                </p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Niên khóa: 2026-2027</p>
                            </div>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-full h-11 px-6 bg-[#4cae4f]/10 text-[#4cae4f] text-sm font-bold hover:bg-[#4cae4f]/20 transition-all">
                                <span className="material-symbols-outlined text-lg">edit</span>
                                Chỉnh sửa
                            </button>
                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-full h-11 px-6 bg-[#4cae4f] text-white text-sm font-bold hover:shadow-lg hover:shadow-[#4cae4f]/30 transition-all whitespace-nowrap">
                                <span className="material-symbols-outlined text-lg hidden sm:block">picture_as_pdf</span>
                                Xuất PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Modules */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-[#4cae4f]/5 flex items-center gap-4 hover:-translate-y-1 transition-transform">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500 border-4 border-emerald-100 dark:border-emerald-900/30 shrink-0">
                        <span className="material-symbols-outlined text-3xl">calendar_today</span>
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Tổng ngày đi học</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">20/22 <span className="text-emerald-500 text-sm font-semibold ml-2">90.9%</span></p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-[#4cae4f]/5 flex items-center gap-4 hover:-translate-y-1 transition-transform">
                    <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center text-rose-500 border-4 border-rose-100 dark:border-rose-900/30 shrink-0">
                        <span className="material-symbols-outlined text-3xl">event_busy</span>
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Số ngày vắng</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">01 <span className="text-rose-500 text-sm font-semibold ml-2">Phép</span></p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-[#4cae4f]/5 flex items-center gap-4 hover:-translate-y-1 transition-transform">
                    <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-500 border-4 border-amber-100 dark:border-amber-900/30 shrink-0">
                        <span className="material-symbols-outlined text-3xl">schedule</span>
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Số ngày đi muộn</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">01 <span className="text-amber-500 text-sm font-semibold ml-2">-5% điểm</span></p>
                    </div>
                </div>
            </div>

            {/* Charts & Ratings */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-[#4cae4f]/5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Biểu đồ chuyên cần theo tháng</h3>
                        <div className="flex gap-4">
                            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500"><span className="w-2.5 h-2.5 rounded-full bg-[#4cae4f]"></span> Đi học</span>
                            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500"><span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span> Vắng</span>
                        </div>
                    </div>
                    <div className="h-64 flex flex-col justify-end">
                        <div className="flex items-end justify-between h-48 gap-2 px-2">
                            {[{ label: 'T8', p: '95%' }, { label: 'T9', p: '90%' }, { label: 'T10', p: '92%' }, { label: 'T11', p: '85%' }, { label: 'T12', p: '100%' }, { label: 'T1', p: '98%' }, { label: 'T2', p: '80%' }].map((item, id) => (
                                <div key={id} className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                                    <div className={`w-full bg-[#4cae4f]/10 rounded-t-lg relative flex items-end justify-center group-hover:bg-[#4cae4f]/20 transition-all`} style={{ height: item.p }}>
                                        <div className="w-3/4 bg-[#4cae4f] rounded-t-lg h-full transition-all group-hover:bg-[#3d9140]"></div>
                                    </div>
                                    <span className="text-[12px] font-medium text-slate-500">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-[#4cae4f]/5">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">Xếp hạng chuyên cần</h3>
                    <div className="flex flex-col items-center justify-center py-4">
                        <div className="relative w-32 h-32 mb-6">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                <circle className="stroke-slate-100 dark:stroke-slate-800" cx="18" cy="18" fill="none" r="16" strokeWidth="3" />
                                <circle className="stroke-[#4cae4f]" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset="10" strokeLinecap="round" strokeWidth="3" />
                            </svg>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">A</span>
                                <p className="text-[10px] uppercase font-bold text-[#4cae4f]">Excellent</p>
                            </div>
                        </div>
                        <div className="w-full space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Tỷ lệ chuyên cần</span>
                                <span className="font-bold">90.9%</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-[#4cae4f] h-full w-[91%]"></div>
                            </div>
                            <p className="text-xs text-slate-400 text-center italic mt-2">Nằm trong top 5% học sinh chuyên cần của khối 12</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Attendance History */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-[#4cae4f]/5 overflow-hidden">
                <div className="p-6 border-b border-[#4cae4f]/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Lịch sử điểm danh chi tiết</h3>
                    <div className="flex gap-3">
                        <select className="rounded-full border-[#4cae4f]/10 bg-[#4cae4f]/5 text-sm font-medium py-1.5 px-4 focus:ring-[#4cae4f] focus:border-[#4cae4f] outline-none cursor-pointer">
                            <option>Tháng 10/2023</option>
                            <option>Tháng 9/2023</option>
                            <option>Học kỳ I</option>
                        </select>
                        <button className="w-9 h-9 shrink-0 rounded-full bg-[#4cae4f]/5 text-[#4cae4f] flex items-center justify-center hover:bg-[#4cae4f]/10 transition-colors">
                            <span className="material-symbols-outlined text-xl">filter_list</span>
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-[#4cae4f]/5 text-[#4cae4f] text-xs uppercase font-bold">
                                <th className="px-6 py-4">Ngày</th>
                                <th className="px-6 py-4">Trạng thái</th>
                                <th className="px-6 py-4">Giờ Check-in</th>
                                <th className="px-6 py-4 whitespace-nowrap">Người điểm danh</th>
                                <th className="px-6 py-4">Ghi chú</th>
                                <th className="px-6 py-4 text-center">Minh chứng</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {[
                                { date: '24/10/2023', textDay: 'Thứ Ba', statVal: 'Có mặt', badgeCls: 'bg-emerald-100 text-emerald-600', dotCls: 'bg-emerald-600', time: '07:25 AM', by: 'Trần Văn B (GVCN)', note: 'Đúng giờ', type: 'image' },
                                { date: '23/10/2023', textDay: 'Thứ Hai', statVal: 'Đi muộn', badgeCls: 'bg-amber-100 text-amber-600', dotCls: 'bg-amber-600', time: '07:45 AM', by: 'Trần Văn B (GVCN)', note: 'Xe hỏng', type: 'image' },
                                { date: '20/10/2023', textDay: 'Thứ Sáu', statVal: 'Vắng mặt', badgeCls: 'bg-rose-100 text-rose-600', dotCls: 'bg-rose-600', time: '--:--', by: 'Hệ thống', note: 'Nghỉ ốm (phép)', type: 'file_present' },
                                { date: '19/10/2023', textDay: 'Thứ Năm', statVal: 'Có mặt', badgeCls: 'bg-emerald-100 text-emerald-600', dotCls: 'bg-emerald-600', time: '07:10 AM', by: 'Trần Văn B (GVCN)', note: 'Trực nhật lớp', type: 'image' },
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-[#4cae4f]/5 transition-colors">
                                    <td className="px-6 py-4 relative">
                                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{row.date}</p>
                                        <p className="text-xs text-slate-500">{row.textDay}</p>
                                    </td>
                                    <td className="px-6 py-4 relative">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${row.badgeCls}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${row.dotCls}`}></span> {row.statVal}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300 relative">{row.time}</td>
                                    <td className="px-6 py-4 relative text-sm">
                                        {row.by === 'Hệ thống' ? (
                                            <span className="text-slate-500 font-medium">Hệ thống</span>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-slate-200 shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD8UNbFLtnpkpEqiMpJxt6BvHfToVqw0-HY5V-klC4geMbTgguw9ugVRDC8p4qxK9h2xb4WejB-maC2SCpXCSJOsj_dw_0eH8J7gY1A97dALOv5VQ6ZjUqArDT4CSW8pqDWbf62v1DuyuvmrYVgQqmHRikAAY1lamrbgPM7itg4e5W6zV6WpNoijaITE3OUH2L3WS9Ua0LKXXpj7FrPW-Qfukt9r0P6Tz-dMYX0AJAXBZbe1RJwjtx9842G9WKTIOwP0EVajOjbevg")', backgroundSize: 'cover' }}></div>
                                                <span className="text-sm font-medium whitespace-nowrap">{row.by}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500 italic relative">{row.note}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="text-[#4cae4f] hover:text-[#4cae4f]/70 bg-[#4cae4f]/10 p-1.5 rounded-lg hover:bg-[#4cae4f]/20 transition-colors">
                                            <span className="material-symbols-outlined text-[18px] leading-none block">{row.type}</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-[#4cae4f]/5 flex items-center justify-between">
                    <p className="text-xs text-slate-500 font-medium">Hiển thị 4 của 22 bản ghi</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-medium hover:bg-slate-50 transition-colors text-slate-600">Trước</button>
                        <button className="px-3 py-1 rounded-lg bg-[#4cae4f] text-white text-xs font-medium shadow-sm">1</button>
                        <button className="px-3 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-medium hover:bg-slate-50 transition-colors text-slate-600">2</button>
                        <button className="px-3 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-medium hover:bg-slate-50 transition-colors text-slate-600">Sau</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceView;
