import React, { useState, useEffect, useCallback } from 'react';
import { StaffManagement } from '@/features/staff';

// ============================================================
// TYPES
// ============================================================
interface User {
    id: number;
    username: string;
    email: string;
    role: 'parent' | 'teacher' | 'admin' | 'student';
    is_active: boolean;
    email_verified: boolean;
    created_at: string;
    parentProfile?: { parent_name: string; phone: string | null; child_age: number };
    staffProfile?: { full_name: string; phone: string | null; position: string };
}

const API = 'http://localhost:3001/api';
const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
});

// ============================================================
// USER MANAGER
// ============================================================
const UserManager = ({ initialRole = 'all' }: { initialRole?: string }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [filterRole, setFilterRole] = useState(initialRole);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [togglingId, setTogglingId] = useState<number | null>(null);

    // Update filter if initialRole changes
    useEffect(() => {
        setFilterRole(initialRole);
    }, [initialRole]);

    const fetchUsers = useCallback(async () => {
        setLoading(true); setError('');
        try {
            const res = await fetch(`${API}/users`, { headers: getHeaders() });
            if (res.status === 401) throw new Error('Phiên đăng nhập hết hạn!');
            if (!res.ok) throw new Error('Không thể tải dữ liệu người dùng!');
            const data = await res.json();
            setUsers(data.users || []);
        } catch (e: any) { setError(e.message); }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchUsers(); }, [fetchUsers]);

    const handleToggle = async (user: User) => {
        setTogglingId(user.id);
        try {
            const res = await fetch(`${API}/users/${user.id}/toggle`, { method: 'PATCH', headers: getHeaders() });
            if (!res.ok) throw new Error();
            setUsers(prev => prev.map(u => u.id === user.id ? { ...u, is_active: !u.is_active } : u));
        } catch { alert('Không thể cập nhật!'); }
        finally { setTogglingId(null); }
    };

    const handleDelete = async (user: User) => {
        if (!window.confirm(`Xoá vĩnh viễn tài khoản "@${user.username}"?`)) return;
        setDeletingId(user.id);
        try {
            const res = await fetch(`${API}/users/${user.id}`, { method: 'DELETE', headers: getHeaders() });
            if (!res.ok) throw new Error();
            setUsers(prev => prev.filter(u => u.id !== user.id));
        } catch { alert('Không thể xoá!'); }
        finally { setDeletingId(null); }
    };

    const displayName = (u: User) =>
        u.staffProfile?.full_name || u.parentProfile?.parent_name || u.username;

    const filtered = users.filter(u => {
        const q = search.toLowerCase();
        const name = displayName(u).toLowerCase();
        return (name.includes(q) || u.email.toLowerCase().includes(q)) &&
            (filterRole === 'all' || u.role === filterRole);
    });

    const ROLE_COLORS: Record<string, string> = {
        admin: 'bg-red-100 text-red-700',
        teacher: 'bg-kids-blue/10 text-kids-blue',
        parent: 'bg-kids-green/10 text-kids-green',
        student: 'bg-kids-pink/10 text-kids-pink',
    };
    const ROLE_LABELS: Record<string, string> = {
        admin: 'Admin', teacher: 'Giáo viên', parent: 'Phụ huynh', student: 'Học sinh'
    };

    return (
        <div className="space-y-6">
            {initialRole === 'all' && (
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <span className="w-8 h-8 bg-kids-blue rounded-xl flex items-center justify-center text-white">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                            </span>
                            Quản Lý Tài Khoản
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">Xem và quản lý tất cả người dùng trong hệ thống</p>
                    </div>
                    <button onClick={fetchUsers}
                        className="flex items-center gap-2 px-4 py-2.5 bg-kids-blue text-white rounded-2xl text-sm font-bold shadow-sm hover:bg-sky-600 transition-colors">
                        <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                        Làm mới
                    </button>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                    { label: 'Tổng', value: users.length, bg: 'bg-slate-100', text: 'text-slate-700' },
                    { label: 'Admin', value: users.filter(u => u.role === 'admin').length, bg: 'bg-red-50', text: 'text-red-600' },
                    { label: 'Giáo viên', value: users.filter(u => u.role === 'teacher').length, bg: 'bg-pastel-blue', text: 'text-kids-blue' },
                    { label: 'Phụ huynh', value: users.filter(u => u.role === 'parent').length, bg: 'bg-pastel-green', text: 'text-kids-green' },
                    { label: 'Bị khoá', value: users.filter(u => !u.is_active).length, bg: 'bg-pastel-yellow', text: 'text-kids-yellow' },
                ].map(s => (
                    <div key={s.label} className={`${s.bg} p-4 rounded-3xl border border-white/50 text-center shadow-sm`}>
                        <p className={`text-2xl font-bold ${s.text}`}>{s.value}</p>
                        <p className="text-xs text-slate-500 font-semibold mt-0.5">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Filter + Search */}
            <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    <input value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Tìm theo tên, email..."
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-kids-blue/20 focus:outline-none" />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {['all', 'admin', 'teacher', 'parent', 'student'].map(r => (
                        <button key={r} onClick={() => setFilterRole(r)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${filterRole === r ? 'bg-kids-blue text-white shadow-sm' : 'bg-white border border-slate-100 text-slate-500 hover:border-kids-blue/40'}`}>
                            {r === 'all' ? 'Tất cả' : ROLE_LABELS[r]}
                        </button>
                    ))}
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 rounded-3xl p-6 flex items-center gap-4 text-red-600">
                    <svg className="w-8 h-8 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    <div>
                        <p className="font-bold">{error}</p>
                        <button onClick={fetchUsers} className="mt-1 text-sm underline">Thử lại</button>
                    </div>
                </div>
            )}

            {loading && !error && (
                <div className="bg-white rounded-3xl border border-slate-50 p-16 flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-kids-blue/20 border-t-kids-blue rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-semibold text-sm">Đang tải dữ liệu...</p>
                </div>
            )}

            {!loading && !error && (
                <div className="bg-white rounded-3xl border border-slate-50 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-[11px] uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold">Tên tài khoản</th>
                                    <th className="px-6 py-4 font-semibold">Thông tin thêm</th>
                                    <th className="px-6 py-4 font-semibold">Vai trò</th>
                                    <th className="px-6 py-4 font-semibold text-center">Trạng thái</th>
                                    <th className="px-6 py-4 font-semibold">Ngày tạo</th>
                                    <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 text-sm">
                                {filtered.length === 0 ? (
                                    <tr><td colSpan={6} className="py-16 text-center text-slate-400 text-sm">Không tìm thấy tài khoản nào</td></tr>
                                ) : filtered.map(user => (
                                    <tr key={user.id} className={`hover:bg-slate-50/50 transition-colors ${!user.is_active ? 'opacity-50' : ''}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-kids-blue to-kids-green flex items-center justify-center text-white font-bold text-sm shrink-0">
                                                    {displayName(user).charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800">{displayName(user)}</p>
                                                    <p className="text-xs text-slate-400">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.parentProfile?.parent_name ? (
                                                <div>
                                                    <p className="text-xs font-bold text-slate-700">{user.parentProfile.parent_name}</p>
                                                    <p className="text-[10px] text-slate-400">{user.parentProfile.phone || 'Chưa có SĐT'} · Bé {user.parentProfile.child_age} tuổi</p>
                                                </div>
                                            ) : user.staffProfile?.full_name ? (
                                                <div>
                                                    <p className="text-xs font-bold text-slate-700">{user.staffProfile.full_name}</p>
                                                    <p className="text-[10px] text-slate-400">{user.staffProfile.phone || 'Chưa có SĐT'} · {user.staffProfile.position}</p>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-300 italic">Không có hồ sơ</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${ROLE_COLORS[user.role] || 'bg-slate-100 text-slate-600'}`}>
                                                {ROLE_LABELS[user.role] || user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${user.is_active ? 'text-kids-green' : 'text-red-400'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${user.is_active ? 'bg-kids-green animate-pulse' : 'bg-red-400'}`}></span>
                                                {user.is_active ? 'Hoạt động' : 'Đã khoá'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs text-slate-500">{new Date(user.created_at).toLocaleDateString('vi-VN')}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <button onClick={() => handleToggle(user)} disabled={togglingId === user.id}
                                                    title={user.is_active ? 'Khoá tài khoản' : 'Mở khoá'}
                                                    className={`p-2 rounded-xl transition-colors ${user.is_active ? 'text-kids-yellow hover:bg-pastel-yellow' : 'text-kids-green hover:bg-pastel-green'} disabled:opacity-40`}>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        {user.is_active
                                                            ? <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                                            : <path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                                        }
                                                    </svg>
                                                </button>
                                                <button onClick={() => handleDelete(user)} disabled={deletingId === user.id}
                                                    className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                        <p className="text-xs text-slate-400">Hiển thị <strong className="text-slate-700">{filtered.length}</strong> / <strong>{users.length}</strong> người dùng</p>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                            <span className="w-2 h-2 bg-kids-green rounded-full animate-pulse"></span>
                            PostgreSQL · Đang đồng bộ
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ============================================================
// OVERVIEW TAB
// ============================================================
const Overview = ({ onNavigate }: { onNavigate: (tab: string) => void }) => {
    const summaryCards = [
        { label: 'Tổng học sinh', value: '1,280', change: '+12% so với tháng trước', bg: 'bg-pastel-blue border-blue-100', icon: 'text-kids-blue', iconBg: 'bg-white text-kids-blue',
          path: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
        { label: 'Giáo viên', value: '86', change: 'Tỉ lệ 1:15 học sinh', bg: 'bg-pastel-pink border-pink-100', icon: 'text-kids-pink', iconBg: 'bg-white text-kids-pink',
          path: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
        { label: 'Lớp học', value: '42', change: 'Đang hoạt động', bg: 'bg-pastel-green border-green-100', icon: 'text-kids-green', iconBg: 'bg-white text-kids-green',
          path: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
        { label: 'Điểm danh', value: '94%', change: 'Hôm nay: 1,203 học sinh', bg: 'bg-pastel-yellow border-yellow-100', icon: 'text-kids-yellow', iconBg: 'bg-white text-kids-yellow',
          path: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
        { label: 'Doanh thu', value: '450M', change: 'Doanh thu tháng 10', bg: 'bg-slate-100 border-slate-200', icon: 'text-slate-700', iconBg: 'bg-white text-slate-700',
          path: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    ];

    const classData = [
        { name: 'Mầm 1', teacher: 'Cô Thanh Hà', students: 25, attendance: '98%', color: 'bg-green-100 text-green-800' },
        { name: 'Mầm 2', teacher: 'Cô Minh Thư', students: 24, attendance: '96%', color: 'bg-green-100 text-green-800' },
        { name: 'Chồi 1', teacher: 'Thầy Quốc Huy', students: 28, attendance: '92%', color: 'bg-yellow-100 text-yellow-800' },
        { name: 'Lá 1', teacher: 'Cô Mai Phương', students: 30, attendance: '100%', color: 'bg-green-100 text-green-800' },
    ];

    const recentStudents = [
        { name: 'Minh Huy', parent: 'Chị Lan', class: 'Lá 1', date: '22/10/2023', status: 'HOÀN TẤT', statusColor: 'bg-green-100 text-green-600', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA16IXGR61yjXNYiwMRxmSZ4fhdikZLfwKsPwbdbeVshulkWrFq3vwqMEWbhwbo3Z7gEUJGkrDETObhVWkBaIqcJ_s9ZhrNnjGm-BK-fyzNOeRRZQzGJNCrdAd_66lrTeUXbLf7brPxCkHO9mkRW0iguY8bWYag1lqxyDsE-8jJUeIBNBaL1eCXMRhbA_Vv7KiSLLcO4T45t5OfU3V1fHLVYcTWpxxY2f9dN9TUxtWxFly23rd8-NBsUCvvopdYh6kbnwYN9A6Ov80' },
        { name: 'Bảo Anh', parent: 'Anh Tùng', class: 'Mầm 2', date: '21/10/2023', status: 'ĐANG CHỜ', statusColor: 'bg-yellow-100 text-yellow-600', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6w3O79Y0vdh4kz5yDjjSjaeDToOyC9haBdOL-Bly01lwdDT8bhf0cT7AOpSP_aUC4gONdhlybUbq-XzfHeGBu59HIWFwZYZ3LmZdTXTSwG7KtTYVsiGl0TI2QRlsKK9uUyC308ycph8E4hc3McEFj2E6EtTuhrKOPU2_UuccyDG_f5Xk4TgTzFTULnajkoHVZlvZPRrcRlfVTbnYt1njW_6BQGoc0pXgdfvIfEMlYGvYcOJd5V3NTXVTkygJaaBpGc8WWQQvZPzE' },
        { name: 'Tuấn Phong', parent: 'Chị Nga', class: 'Chồi 3', date: '20/10/2023', status: 'ĐÃ LIÊN HỆ', statusColor: 'bg-blue-100 text-blue-600', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAspglSQ7o097Uc7HhvHjZp9_-k9EoZ7ydhuLNGkq5FBEeCTg7Ip9YcLXjFQeZtrWUpY99H8WQVk52I3jpaHjKctUxTzK-M6m1PtYBIOTVp4YaGvxkbFelDBxG_MQrEruOmHXc5xejaHWjMRv-IMQwpNzMRfA92IhzHuP3ZslKbSlyNxwZ-lblsQaT5DxusYQDFrLsB_XKdIwk5Qr0UUXOz6ZY0Thq4ayGLMLAZ0CEeA7pM-W6QzI3AhqKBV5YkmSj1izMZubsr01k' },
    ];

    const barHeights = [48, 80, 112, 144, 96, 160];
    const months = ['T5', 'T6', 'T7', 'T8', 'T9', 'T10'];

    return (
        <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                {summaryCards.map(c => (
                    <div key={c.label} className={`${c.bg} border p-5 rounded-3xl shadow-sm`}>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">{c.label}</p>
                                <h3 className="text-2xl font-bold mt-1">{c.value}</h3>
                            </div>
                            <div className={`p-2 ${c.iconBg} rounded-xl shadow-sm`}>
                                <svg className={`w-6 h-6 ${c.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d={c.path} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </svg>
                            </div>
                        </div>
                        <p className={`text-xs mt-4 font-semibold ${c.icon}`}>{c.change}</p>
                    </div>
                ))}
            </div>

            {/* Charts + Table Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Charts Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Enrollment Bar Chart */}
                        <div className="bg-white p-6 rounded-4xl shadow-sm border border-slate-50">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-sm font-bold">Thống kê học sinh đăng ký</h3>
                                <select className="text-[10px] bg-slate-50 border-none rounded-lg py-1 px-2 focus:outline-none">
                                    <option>6 tháng qua</option>
                                </select>
                            </div>
                            <div className="h-48 relative flex items-end justify-between px-2">
                                <div className="absolute inset-0 flex flex-col justify-between py-2 text-[8px] text-slate-400 pointer-events-none">
                                    <span className="border-b border-slate-50 w-full">300</span>
                                    <span className="border-b border-slate-50 w-full">200</span>
                                    <span className="border-b border-slate-50 w-full">100</span>
                                    <span>0</span>
                                </div>
                                {barHeights.map((h, i) => (
                                    <div key={i} className="w-1/6 flex flex-col items-center group relative z-10">
                                        <div className={`w-6 ${i === 3 ? 'bg-kids-blue' : 'bg-pastel-blue group-hover:bg-kids-blue'} rounded-t-lg transition-colors`} style={{ height: h }}></div>
                                        <span className={`text-[8px] mt-1 ${i === 3 ? 'font-bold text-kids-blue' : ''}`}>{months[i]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Class Distribution */}
                        <div className="bg-white p-6 rounded-4xl shadow-sm border border-slate-50">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-sm font-bold">Số lượng theo lớp</h3>
                                <span className="text-[10px] text-slate-400">Tổng: 1,280</span>
                            </div>
                            <div className="h-48 relative flex items-end justify-between px-2">
                                <div className="absolute inset-0 flex flex-col justify-between py-2 text-[8px] text-slate-400 pointer-events-none">
                                    <span className="border-b border-slate-50 w-full">50</span>
                                    <span className="border-b border-slate-50 w-full">30</span>
                                    <span className="border-b border-slate-50 w-full">10</span>
                                    <span>0</span>
                                </div>
                                {[
                                    { label: 'Mầm 1', h: 96, color: 'bg-kids-blue' },
                                    { label: 'Mầm 2', h: 128, color: 'bg-kids-pink' },
                                    { label: 'Chồi 1', h: 80, color: 'bg-kids-green' },
                                    { label: 'Chồi 2', h: 112, color: 'bg-kids-yellow' },
                                    { label: 'Lá 1', h: 144, color: 'bg-slate-400' },
                                    { label: 'Lá 2', h: 104, color: 'bg-pastel-blue' },
                                ].map((b, i) => (
                                    <div key={i} className="w-[14%] flex flex-col items-center z-10">
                                        <div className={`w-6 ${b.color} rounded-t-lg`} style={{ height: b.h }}></div>
                                        <span className="text-[8px] mt-1">{b.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Class Overview Table */}
                    <div className="bg-white rounded-4xl shadow-sm overflow-hidden border border-slate-50">
                        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                            <h3 className="text-lg font-bold">Tổng quan học sinh các lớp</h3>
                            <button className="text-xs text-kids-blue font-semibold hover:bg-pastel-blue px-3 py-1 rounded-lg transition-colors">
                                Chi tiết báo cáo
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider">
                                        <th className="px-6 py-4 font-semibold">Tên lớp</th>
                                        <th className="px-6 py-4 font-semibold">Giáo viên chủ nhiệm</th>
                                        <th className="px-6 py-4 font-semibold">Tổng học sinh</th>
                                        <th className="px-6 py-4 font-semibold text-center">Tỷ lệ đi học</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 text-sm">
                                    {classData.map(cls => (
                                        <tr key={cls.name} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-slate-700">{cls.name}</td>
                                            <td className="px-6 py-4 text-slate-500">{cls.teacher}</td>
                                            <td className="px-6 py-4">{cls.students}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${cls.color}`}>{cls.attendance}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Registrations */}
                    <div className="bg-white rounded-4xl shadow-sm overflow-hidden border border-slate-50">
                        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                            <h3 className="text-lg font-bold">Học sinh mới đăng ký</h3>
                            <button onClick={() => onNavigate('accounts')} className="text-sm text-kids-blue font-semibold hover:underline">Xem tất cả</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                        <th className="px-6 py-4 font-semibold">Tên học sinh</th>
                                        <th className="px-6 py-4 font-semibold">Lớp mong muốn</th>
                                        <th className="px-6 py-4 font-semibold">Ngày đăng ký</th>
                                        <th className="px-6 py-4 font-semibold">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {recentStudents.map(s => (
                                        <tr key={s.name} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img alt={s.name} className="h-9 w-9 rounded-full object-cover border-2 border-pastel-yellow" src={s.avatar} />
                                                    <div>
                                                        <p className="text-sm font-bold">{s.name}</p>
                                                        <p className="text-xs text-slate-500">PH: {s.parent}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium">{s.class}</td>
                                            <td className="px-6 py-4 text-sm text-slate-500">{s.date}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${s.statusColor}`}>{s.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {/* Activity Calendar */}
                    <div className="bg-white p-6 rounded-4xl shadow-sm border border-slate-50">
                        <h3 className="text-lg font-bold mb-4">Lịch hoạt động</h3>
                        <div className="bg-pastel-yellow/30 border border-pastel-yellow p-4 rounded-3xl mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-kids-yellow rounded-xl flex items-center justify-center text-white font-bold shrink-0">25</div>
                                <div>
                                    <p className="text-sm font-bold">Lễ hội hóa trang</p>
                                    <p className="text-xs text-slate-500">08:00 AM - Toàn trường</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-kids-blue rounded-full shrink-0"></div>
                                <div>
                                    <p className="text-xs font-bold">Họp phụ huynh lớp Lá 1</p>
                                    <p className="text-[10px] text-slate-400">Ngày mai, 17:00 PM</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-kids-pink rounded-full shrink-0"></div>
                                <div>
                                    <p className="text-xs font-bold">Khám sức khỏe định kỳ</p>
                                    <p className="text-[10px] text-slate-400">28 Th10, 08:30 AM</p>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-5 py-2 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-sm font-medium hover:bg-slate-50 transition-colors">
                            + Thêm sự kiện
                        </button>
                    </div>

                    {/* News */}
                    <div className="bg-white p-6 rounded-4xl shadow-sm border border-slate-50">
                        <h3 className="text-lg font-bold mb-4">Tin tức &amp; Thông báo</h3>
                        <div className="space-y-5">
                            <div className="flex gap-4">
                                <div className="shrink-0 w-12 h-12 bg-pastel-pink rounded-2xl flex items-center justify-center text-kids-pink">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold leading-tight">Phản hồi từ phụ huynh Bé Bắp</p>
                                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">Cảm ơn cô giáo đã chăm sóc bé rất chu đáo trong tuần qua...</p>
                                    <span className="text-[10px] text-slate-400 mt-1 block">10 phút trước</span>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="shrink-0 w-12 h-12 bg-pastel-green rounded-2xl flex items-center justify-center text-kids-green">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold leading-tight">Thực đơn mới tuần 4</p>
                                    <p className="text-xs text-slate-500 mt-1">Cập nhật thực đơn giàu dinh dưỡng cho các bé khối Mầm...</p>
                                    <span className="text-[10px] text-slate-400 mt-1 block">2 giờ trước</span>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-5 py-2 bg-slate-50 rounded-2xl text-slate-600 text-sm font-bold hover:bg-slate-100 transition-colors">
                            Xem tất cả tin tức
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ============================================================
// CLASS MANAGEMENT TAB
// ============================================================
const ClassManagement = () => {
    const [classes, setClasses] = useState<any[]>([]);
    const [teachers, setTeachers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingClass, setEditingClass] = useState<any>(null);

    const fetchClasses = useCallback(async () => {
        try {
            const res = await fetch(`${API}/classes`, { headers: getHeaders() });
            const data = await res.json();
            if (data.success) setClasses(data.classes);
        } catch (e) { setError('Lỗi khi tải danh sách lớp học'); }
    }, []);

    const fetchTeachers = useCallback(async () => {
        try {
            const res = await fetch(`${API}/staff`, { headers: getHeaders() });
            const data = await res.json();
            if (data.success) setTeachers(data.staff);
        } catch (e) { console.error('Lỗi khi tải danh sách giáo viên'); }
    }, []);

    useEffect(() => {
        setLoading(true);
        Promise.all([fetchClasses(), fetchTeachers()]).finally(() => setLoading(false));
    }, [fetchClasses, fetchTeachers]);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Bạn có chắc chắn muốn xoá lớp học này?')) return;
        try {
            const res = await fetch(`${API}/classes/${id}`, { method: 'DELETE', headers: getHeaders() });
            if (res.ok) fetchClasses();
            else alert('Không thể xoá lớp học');
        } catch (e) { alert('Lỗi kết nối'); }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        
        const payload = {
            ...data,
            capacity: parseInt(data.capacity as string) || 20,
            teacher_id: data.teacher_id ? parseInt(data.teacher_id as string) : null,
            // Randomly assign visual styles for new classes if not editing
            icon: editingClass?.icon || ['child_care', 'toys', 'lightbulb', 'palette', 'music_note', 'auto_stories'][Math.floor(Math.random() * 6)],
            color: editingClass?.color || ['bg-primary/20 text-primary', 'bg-orange-100 text-orange-600', 'bg-blue-100 text-blue-600', 'bg-purple-100 text-purple-600', 'bg-pink-100 text-pink-600'][Math.floor(Math.random() * 5)],
            grad: editingClass?.grad || ['from-primary/10 to-primary/30', 'from-orange-100 to-orange-200', 'from-blue-50 to-blue-200', 'from-purple-50 to-purple-200', 'from-pink-50 to-pink-200'][Math.floor(Math.random() * 5)],
        };

        try {
            const method = editingClass ? 'PUT' : 'POST';
            const url = editingClass ? `${API}/classes/${editingClass.id}` : `${API}/classes`;
            const res = await fetch(url, {
                method,
                headers: getHeaders(),
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                setShowForm(false);
                setEditingClass(null);
                fetchClasses();
            } else {
                const err = await res.json();
                alert(err.error || 'Lỗi khi lưu lớp học');
            }
        } catch (e) { alert('Lỗi kết nối'); }
    };

    const studentAvatars = [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAYfh77-_GcyTukEQndG53LOhqMGIeSZaknVoca0eNsrMj9wrFW_M4mnsLJlFs4-3NyP7nSEtuY63Zvvasb8CIm4ZsswoICtnT66lr7IW8XXpPDBfQAzNj0wQ-QrgN4WBkMHWO6wU4ExndojcWN2JJ4yiPSChwfewA2B8XRdef4QjfbPVP1kXsAcPdnyKuEDJ3vCvI-VLBxDw_V0fsc5WXuAL4FgcfpPBMDb2FVd3rdxixTcWn1I4KYEqSkDhz6FRZcINr-ldtxQ7E',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA06GxZO54Rd35yGAt7PrIM8pXBG7zClr_8JjUATnvpbiGNzxD6uA4vHvtWEKMo2gz2IgeKZXPaCvwPEYjjtoymBd-UeKYaQqJ7AQq3X0rBpnZTY_voaN8bOE3EbrDQUVVzCBvHpJS2YnortzEe62J3gDUt4EkFYe6XXso6cSJotwE_FeUL36FiB_7IRfI565rcO3rwVHXPZrTJxIhp4f2Tp9wAcVAPKE-z3TnsTZ-ZLkvkBlxXKhLmZ06-zD6G3B8k5nGBp07hnPc',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCx5cXMwxgoNJAHqE8WSVZ73QR8WDjBo4cSNfBLBzQE_Aqzd7cI4yuBs0Gr80-r8sZ38cKe3iC-ogM6yXmpZIPN0_aWdiot5HiUr-xGDzGPNO-1y5uA6RbJWcjoNPWRaa2ARAzoDmJnd4PrWOmeKJeB2wCnZmQgugdSSQK8X9gMrxJabw0ehR-MBargNA4FJJGVaEt2BtVFM8WLbDZj6Hdc586v2-e7sKIW-ErZTnTLX0L9atpLVzedLWg2SCSNX9ZDuYMLbYthjbk'
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-800">Quản lý lớp học STEAM</h2>
                    <p className="text-slate-500 mt-1">Học kỳ II - Năm học 2023-2024</p>
                </div>
                <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
                    <button className="px-5 py-2 rounded-xl bg-kids-blue text-white text-sm font-bold shadow-sm transition-all">Tất cả lớp</button>
                    <button className="px-5 py-2 rounded-xl text-slate-500 hover:text-kids-blue text-sm font-bold transition-all">Đang diễn ra</button>
                    <button className="px-5 py-2 rounded-xl text-slate-500 hover:text-kids-blue text-sm font-bold transition-all">Sắp khai giảng</button>
                </div>
            </div>

            {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {classes.map(cls => (
                    <div key={cls.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-50 hover:shadow-xl hover:-translate-y-1 transition-all group">
                        <div className={`h-40 relative bg-gradient-to-br ${cls.grad}`}>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className={`material-symbols-outlined text-6xl opacity-30 group-hover:scale-110 group-hover:opacity-60 transition-all`}>{cls.icon}</span>
                            </div>
                            <div className="absolute top-4 right-4 bg-white/90 px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest text-slate-700 shadow-sm">
                                {cls.code}
                            </div>
                            <div className="absolute top-4 left-4 flex gap-1 transform -translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                                <button onClick={() => { setEditingClass(cls); setShowForm(true); }} className="p-2 bg-white/95 rounded-xl text-slate-600 hover:text-kids-blue shadow-sm">
                                    <span className="material-symbols-outlined text-sm">edit</span>
                                </button>
                                <button onClick={() => handleDelete(cls.id)} className="p-2 bg-white/95 rounded-xl text-slate-600 hover:text-red-500 shadow-sm">
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-black text-slate-800 mb-4">{cls.name}</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <span className="material-symbols-outlined text-kids-blue text-lg">person</span>
                                    <span>GV: <b className="text-slate-800">{cls.teacher?.full_name || 'Chưa phân công'}</b></span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <span className="material-symbols-outlined text-kids-green text-lg">groups</span>
                                    <span>Sĩ số: <b className="text-slate-800">{cls.capacity} học sinh</b></span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <span className="material-symbols-outlined text-kids-yellow text-lg">meeting_room</span>
                                    <span>Phòng: <b className="text-slate-800">{cls.room}</b></span>
                                </div>
                            </div>
                            <div className="mt-6 pt-5 border-t border-slate-50 flex justify-between items-center">
                                <div className="flex -space-x-2">
                                    {studentAvatars.map((url, i) => (
                                        <div key={i} className="size-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                                            <img src={url} alt="Học sinh" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                    <div className="size-8 rounded-full border-2 border-white bg-pastel-blue flex items-center justify-center text-[10px] font-black text-kids-blue shadow-sm">
                                        +15
                                    </div>
                                </div>
                                <button className="text-kids-blue text-sm font-black flex items-center gap-1 hover:underline transition-all">
                                    Chi tiết <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <button onClick={() => { setEditingClass(null); setShowForm(true); }} className="bg-slate-50 rounded-3xl border-3 border-dashed border-slate-100 flex flex-col items-center justify-center p-8 text-slate-400 hover:text-kids-blue hover:border-kids-blue/50 hover:bg-pastel-blue/30 transition-all group min-h-[400px]">
                    <span className="material-symbols-outlined text-6xl mb-4 group-hover:scale-110 transition-transform">add_circle</span>
                    <span className="font-black text-lg">Thêm lớp học</span>
                </button>
            </div>

            {/* Modal Form */}
            {showForm && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in duration-300">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-2xl font-black text-slate-800">{editingClass ? 'Cập nhật lớp học' : 'Tạo lớp học mới'}</h3>
                                <p className="text-slate-400 text-sm font-semibold">Điền đầy đủ thông tin bên dưới</p>
                            </div>
                            <button onClick={() => setShowForm(false)} className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white text-slate-400 hover:text-red-500 shadow-sm transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2 px-1">Tên lớp học</label>
                                    <input name="name" defaultValue={editingClass?.name} required className="w-full px-6 py-4 bg-slate-100 border-none rounded-2xl focus:ring-4 focus:ring-kids-blue/10 outline-none font-bold text-slate-700 transition-all" placeholder="Nhập tên lớp (e.g. Mầm 1)..." />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2 px-1">Mã lớp</label>
                                    <input name="code" defaultValue={editingClass?.code} required className="w-full px-6 py-4 bg-slate-100 border-none rounded-2xl focus:ring-4 focus:ring-kids-blue/10 outline-none font-bold text-slate-700 transition-all" placeholder="E.g. STEAM-01" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2 px-1">Phòng học</label>
                                    <input name="room" defaultValue={editingClass?.room} required className="w-full px-6 py-4 bg-slate-100 border-none rounded-2xl focus:ring-4 focus:ring-kids-blue/10 outline-none font-bold text-slate-700 transition-all" placeholder="E.g. Lab 01" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2 px-1">Giáo viên phụ trách</label>
                                    <div className="relative">
                                        <select name="teacher_id" defaultValue={editingClass?.teacher_id || ''} className="w-full px-6 py-4 bg-slate-100 border-none rounded-2xl focus:ring-4 focus:ring-kids-blue/10 outline-none appearance-none font-bold text-slate-700 transition-all">
                                            <option value="">-- Chọn giáo viên --</option>
                                            {teachers.map(t => (
                                                <option key={t.id} value={t.id}>{t.full_name} ({t.position})</option>
                                            ))}
                                        </select>
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2 px-1">Sĩ số tối đa</label>
                                    <input type="number" name="capacity" defaultValue={editingClass?.capacity || 20} className="w-full px-6 py-4 bg-slate-100 border-none rounded-2xl focus:ring-4 focus:ring-kids-blue/10 outline-none font-bold text-slate-700 transition-all" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2 px-1">Trạng thái</label>
                                    <select name="status" defaultValue={editingClass?.status || 'active'} className="w-full px-6 py-4 bg-slate-100 border-none rounded-2xl focus:ring-4 focus:ring-kids-blue/10 outline-none appearance-none font-bold text-slate-700 transition-all">
                                        <option value="active">Đang giảng dạy</option>
                                        <option value="upcoming">Sắp khai giảng</option>
                                        <option value="finished">Đã hoàn thành</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-4 px-6 rounded-2xl font-black text-slate-400 hover:bg-slate-50 transition-colors uppercase text-xs tracking-widest">Huỷ bỏ</button>
                                <button type="submit" className="flex-[2] py-4 px-6 rounded-2xl font-black bg-kids-blue text-white shadow-xl shadow-kids-blue/20 hover:bg-sky-600 transition-all active:scale-95 uppercase text-xs tracking-widest">Lưu thông tin</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// ============================================================
// ATTENDANCE MANAGEMENT TAB
// ============================================================
const AttendanceManagement = () => {
    const summaryCards = [
        { label: 'Tổng học sinh', value: '450', sub: 'Hôm nay', icon: 'groups', color: 'border-blue-400', iconBg: 'bg-blue-100 text-blue-600' },
        { label: 'Có mặt', value: '423', sub: '94%', icon: 'check_circle', color: 'border-emerald-400', iconBg: 'bg-emerald-100 text-emerald-600' },
        { label: 'Vắng mặt', value: '18', sub: '4%', icon: 'cancel', color: 'border-rose-400', iconBg: 'bg-rose-100 text-rose-600' },
        { label: 'Đến muộn', value: '9', sub: '2%', icon: 'schedule', color: 'border-amber-400', iconBg: 'bg-amber-100 text-amber-600' },
        { label: 'Lớp hoàn tất', value: '80%', sub: '12/15', icon: 'fact_check', color: 'border-kids-blue', iconBg: 'bg-pastel-blue text-kids-blue' },
    ];

    const alerts = [
        { id: 'M1', name: 'Lớp Mầm 1 - Cơ sở 1', teacher: 'Cô Nguyễn Hồng Nhung' },
        { id: 'C2', name: 'Lớp Chồi 2 - Cơ sở 2', teacher: 'Thầy Trần Anh Tuấn' },
        { id: 'L1', name: 'Lớp Lá 1 - Cơ sở 1', teacher: 'Cô Lê Thị Lan Anh' },
    ];

    const classAttendance = [
        { name: 'Chồi 1', teacher: 'Cô Mai Thu Huyền', total: 30, present: 28, absent: 1, late: 1, time: '07:45 AM' },
        { name: 'Lá 2', teacher: 'Thầy Đỗ Minh Quân', total: 32, present: 32, absent: 0, late: 0, time: '08:12 AM' },
        { name: 'Mầm 3', teacher: 'Cô Hoàng Yến', total: 25, present: 22, absent: 2, late: 1, time: '07:55 AM' },
        { name: 'Mầm 1', teacher: 'Cô Hồng Nhung', total: 28, present: null, absent: null, late: null, time: null },
        { name: 'Chồi 3', teacher: 'Cô Lý Lan', total: 29, present: 25, absent: 3, late: 1, time: '08:05 AM' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Top Stats */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-800">Thống kê Điểm danh</h2>
                    <p className="text-slate-500 font-semibold mt-1">Thứ Hai, ngày 24 tháng 5 năm 2024</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm font-bold text-slate-600">
                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                        24/05/2024
                    </button>
                    <button className="bg-kids-blue text-white px-6 py-3 rounded-2xl font-black shadow-lg shadow-kids-blue/20 flex items-center gap-2 hover:bg-sky-600 transition-all text-xs tracking-widest">
                        <span className="material-symbols-outlined text-sm">filter_alt</span>
                        LỌC DỮ LIỆU
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {summaryCards.map(c => (
                    <div key={c.label} className={`bg-white p-6 rounded-[32px] shadow-sm border-b-4 ${c.color} hover:translate-y-[-4px] transition-all`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className={`${c.iconBg} p-2 rounded-xl`}>
                                <span className="material-symbols-outlined">{c.icon}</span>
                            </div>
                            <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${c.iconBg.replace('bg-', 'text-')}`}>{c.sub}</span>
                        </div>
                        <h3 className="text-slate-400 text-xs font-black uppercase tracking-wider">{c.label}</h3>
                        <p className={`text-3xl font-black mt-1 ${c.label === 'Có mặt' ? 'text-emerald-600' : c.label === 'Vắng mặt' ? 'text-rose-600' : c.label === 'Đến muộn' ? 'text-amber-600' : 'text-slate-800'}`}>
                            {c.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Alerts & Chart */}
                <div className="space-y-8">
                    <section className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="font-black text-slate-800 flex items-center gap-2 text-lg uppercase tracking-tight">
                                <span className="material-symbols-outlined text-rose-500">warning</span>
                                Chưa điểm danh
                            </h3>
                            <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">{alerts.length} Lớp</span>
                        </div>
                        <div className="space-y-3">
                            {alerts.map(a => (
                                <div key={a.id} className="bg-white p-4 rounded-[24px] border border-rose-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
                                    <div className="bg-rose-50 w-12 h-12 rounded-xl flex items-center justify-center font-black text-rose-600">
                                        {a.id}
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <h4 className="font-bold text-sm truncate">{a.name}</h4>
                                        <p className="text-[10px] text-slate-400 font-semibold">{a.teacher}</p>
                                    </div>
                                    <button className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-2.5 rounded-xl transition-all active:scale-90">
                                        <span className="material-symbols-outlined text-lg">send</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-50 space-y-6">
                        <h3 className="font-black text-slate-800 uppercase tracking-tight text-sm">Tỷ lệ chuyên cần tuần</h3>
                        <div className="h-48 flex items-end justify-between gap-3 px-2">
                            {[94, 91, 96, 88, 92].map((h, i) => (
                                <div key={i} className="flex flex-col items-center gap-3 flex-1 group">
                                    <div className="w-full bg-slate-50 rounded-t-xl relative h-[140px] overflow-hidden">
                                        <div 
                                            className="absolute bottom-0 w-full bg-kids-blue rounded-t-xl transition-all duration-1000 group-hover:bg-kids-blue/80" 
                                            style={{ height: `${h}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-black uppercase">Th {i + 2}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Table & More Stats */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white rounded-[32px] shadow-sm border border-slate-50 overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                            <h3 className="font-black text-slate-800 uppercase tracking-tight">Điểm danh theo lớp</h3>
                            <button className="text-kids-blue hover:bg-pastel-blue px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">download</span>
                                Xuất báo cáo
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[2px]">
                                        <th className="px-8 py-5">Lớp & Giáo viên</th>
                                        <th className="px-6 py-5 text-center">Sĩ số</th>
                                        <th className="px-6 py-5 text-center text-emerald-600">Có mặt</th>
                                        <th className="px-6 py-5 text-center text-rose-500">Vắng</th>
                                        <th className="px-6 py-5">Thời gian</th>
                                        <th className="px-8 py-5 text-right">Chi tiết</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {classAttendance.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-8 py-4">
                                                <div className="flex flex-col">
                                                    <span className={`font-black text-sm ${row.present === null ? 'text-slate-400 italic' : 'text-slate-800'}`}>{row.name}</span>
                                                    <span className="text-[10px] text-slate-400 font-semibold">{row.teacher}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center font-bold text-slate-600">{row.total}</td>
                                            <td className="px-6 py-4 text-center">
                                                {row.present !== null ? (
                                                    <span className="text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg text-sm font-black">{row.present}</span>
                                                ) : (
                                                    <span className="text-rose-500 bg-rose-50 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest animate-pulse">Đang chờ...</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {row.absent !== null ? (
                                                    <span className="text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg text-sm font-black">{row.absent}</span>
                                                ) : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-500 tracking-tight">{row.time || '--:--'}</td>
                                            <td className="px-8 py-4 text-right">
                                                <button className={`p-2 rounded-xl transition-all ${row.present !== null ? 'text-kids-blue hover:bg-pastel-blue' : 'text-slate-300 cursor-not-allowed'}`}>
                                                    <span className="material-symbols-outlined">{row.present !== null ? 'visibility' : 'notifications_active'}</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-50">
                            <h3 className="font-black text-slate-800 uppercase tracking-tight text-sm mb-8">Trạng thái hoàn tất</h3>
                            <div className="flex items-center gap-8">
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle className="text-slate-50" cx="64" cy="64" fill="transparent" r="54" stroke="currentColor" strokeWidth="12"></circle>
                                        <circle className="text-kids-blue" cx="64" cy="64" fill="transparent" r="54" stroke="currentColor" strokeDasharray="339.29" strokeDashoffset="67.85" strokeWidth="12" strokeLinecap="round"></circle>
                                    </svg>
                                    <div className="absolute flex flex-col items-center">
                                        <span className="text-2xl font-black text-slate-800 font-display">80%</span>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full bg-kids-blue"></span>
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Hoàn tất</span>
                                        </div>
                                        <span className="text-sm font-black text-slate-800">12 lớp</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Đang chờ</span>
                                        </div>
                                        <span className="text-sm font-black text-slate-800">3 lớp</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-50">
                            <h3 className="font-black text-slate-800 uppercase tracking-tight text-sm mb-8">Lý do vắng mặt</h3>
                            <div className="space-y-5">
                                {[
                                    { label: 'Ốm/Bệnh', val: 65, color: 'bg-blue-400' },
                                    { label: 'Việc gia đình', val: 25, color: 'bg-amber-400' },
                                    { label: 'Không phép', val: 10, color: 'bg-rose-400' },
                                ].map(r => (
                                    <div key={r.label} className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-wider">
                                            <span className="text-slate-500">{r.label}</span>
                                            <span className="text-slate-800">{r.val}%</span>
                                        </div>
                                        <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden">
                                            <div className={`h-full ${r.color} rounded-full transition-all duration-1000`} style={{ width: `${r.val}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ============================================================
// MAIN ADMIN DASHBOARD
// ============================================================
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const navItems = [
        {
            id: 'overview', label: 'Tổng quan',
            path: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
        },
        {
            id: 'students', label: 'Học sinh',
            path: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
        },
        {
            id: 'accounts', label: 'Giáo viên', badge: 'LIVE',
            path: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
        },
        {
            id: 'classes', label: 'Lớp học',
            path: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
        },
        {
            id: 'attendance', label: 'Điểm danh',
            path: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
        },
        {
            id: 'nutrition', label: 'Dinh dưỡng',
            path: 'M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18z'
        },
        {
            id: 'notifications', label: 'Thông báo',
            path: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
        },
        {
            id: 'fees', label: 'Học phí',
            path: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        {
            id: 'reports', label: 'Báo cáo',
            path: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
        },
        {
            id: 'settings', label: 'Cài đặt',
            path: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
        },
    ];

    return (
        <div className="flex h-screen overflow-hidden" style={{ fontFamily: "'Quicksand', sans-serif", backgroundColor: '#F8FAFC', color: '#334155' }}>
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-100 flex flex-col z-20 overflow-y-auto shrink-0" style={{ scrollbarWidth: 'thin' }}>
                {/* Logo */}
                <div className="px-6 pt-6 pb-4 flex items-center justify-center border-b border-slate-100">
                    <img
                        src="/assets/logo/mainlogo.png"
                        alt="KidsFit"
                        className="h-16 w-auto object-contain"
                    />
                </div>

                <nav className="flex-1 px-4 py-4 space-y-0.5">
                    {navItems.map(item => (
                        <button key={item.id} onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl font-semibold text-sm text-left transition-all ${activeTab === item.id
                                ? 'bg-pastel-blue text-kids-blue'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-kids-blue'
                            }`}>
                            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d={item.path} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                            <span className="flex-1">{item.label}</span>
                            {item.badge && activeTab !== item.id && (
                                <span className="text-[8px] bg-kids-green/15 text-kids-green px-1.5 py-0.5 rounded-full font-bold uppercase animate-pulse">{item.badge}</span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <a href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-slate-500 hover:bg-red-50 hover:text-red-500 font-semibold text-sm transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                        Về Landing Page
                    </a>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Topbar */}
                <header className="bg-white h-16 flex items-center justify-between px-6 border-b border-slate-100 shrink-0">
                    <div className="flex items-center flex-1">
                        <div className="relative max-w-sm w-full">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                            <input className="block w-full pl-9 pr-3 py-2 border-none bg-slate-100 rounded-2xl text-sm placeholder-slate-400 focus:ring-2 focus:ring-kids-blue focus:outline-none" placeholder="Tìm kiếm học sinh, giáo viên..." type="text" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-xl">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                            <span className="absolute top-1 right-1 w-2 h-2 bg-kids-pink rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-slate-200"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-800 leading-none">Admin KidsFit</p>
                                <p className="text-xs text-slate-500 mt-1">Quản trị viên</p>
                            </div>
                            <img alt="Admin" className="h-9 w-9 rounded-2xl object-cover ring-2 ring-pastel-blue" src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: 'thin' }}>
                    {activeTab === 'overview' && <Overview onNavigate={setActiveTab} />}
                    {activeTab === 'students' && (
                        <div>
                            <div className="mb-4">
                                <h2 className="text-xl font-bold text-slate-800">Quản lý Học sinh</h2>
                                <p className="text-sm text-slate-500">Danh sách các bé đang tham gia KidsFit</p>
                            </div>
                            <UserManager initialRole="student" />
                        </div>
                    )}
                    {activeTab === 'accounts' && (
                        <div>
                            <div className="mb-4">
                                <h2 className="text-xl font-bold text-slate-800">Quản lý Giáo viên</h2>
                                <p className="text-sm text-slate-500">Quản lý đội ngũ giáo viên và nhân sự</p>
                            </div>
                            <UserManager initialRole="teacher" />
                        </div>
                    )}
                    {activeTab === 'classes' && <ClassManagement />}
                    {activeTab === 'attendance' && <AttendanceManagement />}
                    {activeTab === 'staff' && <StaffManagement />}
                    {!['overview', 'students', 'accounts', 'classes', 'attendance', 'staff'].includes(activeTab) && (
                        <div className="flex h-64 flex-col items-center justify-center text-slate-400 font-semibold bg-white rounded-4xl border-2 border-dashed border-slate-200">
                            <svg className="w-16 h-16 text-slate-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                            <p className="text-lg">Tính năng "{navItems.find(i => i.id === activeTab)?.label}" đang được phát triển</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
