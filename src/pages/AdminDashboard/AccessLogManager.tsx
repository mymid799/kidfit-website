import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/config/api';

interface AccessLog {
    id: number;
    user_id: number;
    action: string;
    ip_address: string;
    user_agent: string;
    timestamp: string;
    user?: {
        username: string;
        email: string;
    };
}

const AccessLogManager = () => {
    const [logs, setLogs] = useState<AccessLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    // Filters
    const [searchAction, setSearchAction] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    const fetchLogs = async (pageNum = 1) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/logs?page=${pageNum}&limit=50`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                let filteredData = data.data;

                // Basic frontend filtering on the current page to demonstrate
                if (searchAction) {
                    filteredData = filteredData.filter((log: AccessLog) => 
                        log.action.toLowerCase().includes(searchAction.toLowerCase()) || 
                        (log.user && log.user.username.toLowerCase().includes(searchAction.toLowerCase()))
                    );
                }
                if (dateFilter) {
                    filteredData = filteredData.filter((log: AccessLog) => 
                        log.timestamp.startsWith(dateFilter)
                    );
                }

                setLogs(filteredData);
                setTotalPages(data.totalPages || 1);
                setPage(data.currentPage || 1);
            }
        } catch (error) {
            console.error('Failed to load logs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs(page);
    }, [page, searchAction, dateFilter]);

    const getActionStyle = (action: string) => {
        const lowerAction = action.toLowerCase();
        if (lowerAction.includes('login') || lowerAction.includes('đăng nhập')) return 'bg-blue-100 text-blue-700 border-blue-200';
        if (lowerAction.includes('delete') || lowerAction.includes('xoá')) return 'bg-red-100 text-red-700 border-red-200';
        if (lowerAction.includes('create') || lowerAction.includes('thêm') || lowerAction.includes('tạo')) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        if (lowerAction.includes('update') || lowerAction.includes('cập nhật') || lowerAction.includes('edit')) return 'bg-orange-100 text-orange-700 border-orange-200';
        return 'bg-slate-100 text-slate-600 border-slate-200';
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight lg:text-4xl mb-2 flex items-center gap-3">
                        Lịch Sử Truy Cập
                        <span className="bg-red-100 text-red-600 text-xs font-black uppercase px-2.5 py-1 rounded-lg tracking-wider border border-red-200 align-middle">Beta</span>
                    </h2>
                    <p className="text-slate-500 font-medium">Theo dõi hoạt động, đăng nhập và thay đổi quan trọng trên hệ thống.</p>
                </div>
                <button onClick={() => fetchLogs(1)} className="bg-white border text-slate-600 px-6 py-3 rounded-2xl font-bold shadow-sm hover:bg-slate-50 active:scale-95 transition-all flex items-center gap-2">
                    <span className={`material-symbols-outlined text-[20px] ${loading ? 'animate-spin' : ''}`}>sync</span>
                    TẢI LẠI
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[250px] relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">filter_alt</span>
                    <input value={searchAction} onChange={e => setSearchAction(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-500/20 font-medium text-sm text-slate-800 placeholder:text-slate-400"
                        placeholder="Lọc theo Hành động hoặc Tài khoản..." />
                </div>
                <div className="min-w-[200px]">
                    <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-500/20 font-medium text-sm text-slate-800"
                    />
                </div>
                <button onClick={() => { setSearchAction(''); setDateFilter(''); }} className="px-4 py-3 text-slate-500 font-bold text-sm bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">XÓA LỌC</button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden relative min-h-[400px]">
                {loading && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center">
                        <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin mb-3"></div>
                        <p className="font-bold text-slate-600 text-sm">Đang tải nhật ký hệ thống...</p>
                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 text-slate-400 text-xs font-black uppercase tracking-widest border-b border-slate-100">
                                <th className="px-8 py-5">Thời gian</th>
                                <th className="px-6 py-5">Tài khoản thao tác</th>
                                <th className="px-6 py-5">Sự kiện</th>
                                <th className="px-6 py-5">IP / Mạng</th>
                                <th className="px-8 py-5 text-right flex-1">Thiết bị (User-Agent)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {logs.length === 0 && !loading ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <span className="material-symbols-outlined text-5xl text-slate-200 mb-3 block">manage_search</span>
                                        <p className="text-slate-500 font-medium">Không tìm thấy vệt nhật ký nào trùng khớp.</p>
                                    </td>
                                </tr>
                            ) : (
                                logs.map(log => (
                                    <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <p className="font-bold text-slate-700 text-sm">{new Date(log.timestamp).toLocaleDateString('vi-VN')}</p>
                                            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mt-1">{new Date(log.timestamp).toLocaleTimeString('vi-VN')}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            {log.user ? (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                                                        <span className="font-black text-slate-600 text-xs uppercase">{log.user.username.charAt(0)}</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-800 text-sm">{log.user.username}</p>
                                                        <p className="text-[11px] font-medium text-slate-400 mt-0.5">{log.user.email}</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <span className="material-symbols-outlined text-[18px]">no_accounts</span>
                                                    <span className="text-sm font-medium italic">Hệ thống / Vô danh</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${getActionStyle(log.action)} inline-block`}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-slate-300 text-[16px]">language</span>
                                                <span className="font-mono text-xs font-bold text-slate-500">{log.ip_address || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right w-64">
                                            <p className="text-[11px] text-slate-400 font-medium leading-relaxed truncate" title={log.user_agent || ''}>
                                                {log.user_agent || 'Không xác định'}
                                            </p>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="bg-slate-50 border-t border-slate-100 p-4 px-8 flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Trang {page} / {totalPages}</p>
                    <div className="flex items-center gap-2">
                        <button 
                            disabled={page === 1} onClick={() => setPage(p => p - 1)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl font-bold bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50 transition-colors"
                        >
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button 
                            disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl font-bold bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50 transition-colors"
                        >
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccessLogManager;
