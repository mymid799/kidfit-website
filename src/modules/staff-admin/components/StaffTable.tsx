import React, { useState } from 'react';
import { Staff } from '../types';

interface StaffTableProps {
    staff: Staff[];
    onDelete: (id: number) => void;
    onEdit: (staff: Staff) => void;
    isLoading: boolean;
}

export const StaffTable: React.FC<StaffTableProps> = ({ staff, onDelete, onEdit, isLoading }) => {
    const [search, setSearch] = useState('');

    const filteredStaff = staff.filter(s =>
        s.full_name.toLowerCase().includes(search.toLowerCase()) ||
        s.employee_id.toLowerCase().includes(search.toLowerCase()) ||
        (s.class_group || '').toLowerCase().includes(search.toLowerCase())
    );

    const getStatusBadge = (status: Staff['status']) => {
        switch (status) {
            case 'active':
                return (
                    <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                        <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span> Đang làm việc
                    </span>
                );
            case 'on_leave':
                return (
                    <span className="flex items-center gap-1.5 text-amber-500 text-xs font-bold">
                        <span className="size-2 rounded-full bg-amber-500"></span> Nghỉ phép
                    </span>
                );
            case 'suspended':
                return (
                    <span className="flex items-center gap-1.5 text-rose-500 text-xs font-bold">
                        <span className="size-2 rounded-full bg-rose-500"></span> Đình chỉ
                    </span>
                );
            default:
                return status;
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* Table Search & Filter Bar */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:max-w-md">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-sm font-medium focus:outline-none transition-all"
                        placeholder="Tìm tên, mã nhân viên hoặc lớp..."
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 transition-colors">
                        <span className="material-symbols-outlined text-lg">filter_list</span> Bộ lọc
                    </button>
                </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
                {isLoading ? (
                    <div className="p-12 text-center text-slate-400 font-bold animate-pulse">Đang tải dữ liệu...</div>
                ) : filteredStaff.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 font-bold">Không tìm thấy nhân sự phù hợp.</div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50">
                                <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Cán bộ</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Mã NV</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Nhóm lớp</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Vai trò</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Trình độ</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Trạng thái</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filteredStaff.map((person) => (
                                <tr key={person.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-full bg-slate-100 flex-shrink-0 overflow-hidden border border-white flex items-center justify-center">
                                                {person.avatar_url ? (
                                                    <img alt={person.full_name} src={person.avatar_url} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="material-symbols-outlined text-slate-400 text-xl">person</span>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 dark:text-white">{person.full_name}</div>
                                                <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{person.user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-300">
                                        <span className="bg-slate-100 px-2 py-1 rounded-md">{person.employee_id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {person.class_group ? (
                                            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest border border-blue-100">
                                                {person.class_group}
                                            </span>
                                        ) : (
                                            <span className="text-slate-300 italic text-xs">Phòng ban</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">{person.position}</td>
                                    <td className="px-6 py-4 text-xs font-bold text-slate-600 dark:text-slate-400">{person.qualification || '---'}</td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(person.status)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-1">
                                            <button
                                                onClick={() => onEdit(person)}
                                                className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </button>
                                            <button
                                                onClick={() => { if (confirm('Xoá nhân sự này?')) onDelete(person.id); }}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination Placeholder */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex flex-col md:flex-row items-center justify-between border-t border-slate-100 dark:border-slate-800 gap-4">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    Hiển thị {filteredStaff.length} trên tổng số {staff.length} cán bộ
                </div>
                <div className="flex items-center gap-2">
                    <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-white transition-all">
                        <span className="material-symbols-outlined text-base">chevron_left</span>
                    </button>
                    <button className="size-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-black shadow-lg shadow-primary/20">1</button>
                    <button className="size-8 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 text-xs font-black hover:bg-white dark:hover:bg-slate-700 transition-all">2</button>
                    <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-white transition-all">
                        <span className="material-symbols-outlined text-base">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
