import React from 'react';
import { Staff } from '../types';

interface StaffStatsProps {
    staff: Staff[];
}

export const StaffStats: React.FC<StaffStatsProps> = ({ staff }) => {
    const total = staff.length;
    const onLeave = staff.filter(s => s.status === 'on_leave').length;
    // Let's assume some dummy logic for trending/urgency since we don't have historical data or contract expiry in model yet
    const attendanceRate = total > 0 ? 98.5 : 0;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Staff */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <span className="material-symbols-outlined text-6xl text-slate-400">groups</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                    <div className="size-12 rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 flex items-center justify-center text-rose-600">
                        <span className="material-symbols-outlined">group</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tổng số nhân sự</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">{total}</span>
                    <span className="text-emerald-500 text-sm font-medium flex items-center">
                        <span className="material-symbols-outlined text-sm">trending_up</span> 4%
                    </span>
                </div>
            </div>

            {/* Leave Today */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <span className="material-symbols-outlined text-6xl text-slate-400">event_busy</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                    <div className="size-12 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center text-emerald-600">
                        <span className="material-symbols-outlined">person_off</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Nghỉ phép hôm nay</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">{onLeave.toString().padStart(2, '0')}</span>
                    <span className="text-slate-400 text-sm font-medium italic">người</span>
                </div>
            </div>

            {/* Contract Alert - Placeholder */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <span className="material-symbols-outlined text-6xl text-slate-400">description</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                    <div className="size-12 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center text-amber-600">
                        <span className="material-symbols-outlined">contract</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sắp hết hạn HĐ</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">08</span>
                    <span className="text-rose-500 text-sm font-medium flex items-center">
                        <span className="material-symbols-outlined text-sm">priority_high</span> Cần chú ý
                    </span>
                </div>
            </div>

            {/* Attendance Rate */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <span className="material-symbols-outlined text-6xl text-slate-400">how_to_reg</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                    <div className="size-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-blue-600">
                        <span className="material-symbols-outlined">fact_check</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tỷ lệ chấm công</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">{attendanceRate}%</span>
                    <span className="text-emerald-500 text-sm font-medium flex items-center">
                        <span className="material-symbols-outlined text-sm">check_circle</span> Ổn định
                    </span>
                </div>
            </div>
        </div>
    );
};
