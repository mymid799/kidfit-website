import React, { useState, useEffect, useCallback } from 'react';

// ============================================================
// TYPE DEFINITIONS
// ============================================================
interface User {
    id: number;
    parentName: string;
    email: string;
    phone: string;
    role: string;
    isActive: boolean;
    createdAt: string;
}

// ============================================================
// USER DATABASE MANAGER COMPONENT
// ============================================================
const UserDatabaseManager = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [togglingId, setTogglingId] = useState<number | null>(null);
    const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('http://localhost:3001/api/users');
            if (!res.ok) throw new Error('Không thể kết nối tới API!');
            const data = await res.json();
            setUsers(data.users || []);
            setDbStatus('connected');
        } catch (e: any) {
            setError(e.message || 'Lỗi kết nối server!');
            setDbStatus('disconnected');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleToggleActive = async (id: number) => {
        setTogglingId(id);
        try {
            const res = await fetch(`http://localhost:3001/api/users/${id}/toggle`, { method: 'PATCH' });
            if (!res.ok) throw new Error('Lỗi cập nhật!');
            setUsers(prev => prev.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u));
        } catch (e) {
            alert('Không thể cập nhật trạng thái user!');
        } finally {
            setTogglingId(null);
        }
    };

    const handleDelete = async (id: number, name: string) => {
        if (!window.confirm(`Bạn có chắc muốn xoá tài khoản của "${name}"? Hành động này không thể hoàn tác!`)) return;
        setDeletingId(id);
        try {
            const res = await fetch(`http://localhost:3001/api/users/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Lỗi xoá!');
            setUsers(prev => prev.filter(u => u.id !== id));
        } catch (e) {
            alert('Không thể xoá user!');
        } finally {
            setDeletingId(null);
        }
    };

    const filtered = users.filter(u =>
        u.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.phone.includes(searchQuery)
    );

    const activeCount = users.filter(u => u.isActive).length;

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                        <span className="material-symbols-outlined text-3xl text-primary">database</span>
                        Quản Lý User Database
                    </h2>
                    <p className="text-slate-500 mt-1 text-sm">Quản lý tài khoản người dùng được lưu trong PostgreSQL Docker</p>
                </div>
                <button
                    onClick={fetchUsers}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
                >
                    <span className={`material-symbols-outlined text-sm ${loading ? 'animate-spin' : ''}`}>refresh</span>
                    Làm mới
                </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Tổng tài khoản</p>
                    <p className="text-3xl font-black text-slate-900">{users.length}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Đang hoạt động</p>
                    <p className="text-3xl font-black text-primary">{activeCount}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Bị khoá</p>
                    <p className="text-3xl font-black text-red-500">{users.length - activeCount}</p>
                </div>
                <div className={`p-5 rounded-2xl border shadow-sm ${dbStatus === 'connected' ? 'bg-green-50 border-green-200' : dbStatus === 'disconnected' ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Trạng thái DB</p>
                    <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${dbStatus === 'connected' ? 'bg-green-500 animate-pulse' : dbStatus === 'disconnected' ? 'bg-red-500' : 'bg-yellow-500 animate-pulse'}`}></span>
                        <p className={`font-bold text-sm ${dbStatus === 'connected' ? 'text-green-700' : dbStatus === 'disconnected' ? 'text-red-700' : 'text-yellow-700'}`}>
                            {dbStatus === 'connected' ? 'PostgreSQL' : dbStatus === 'disconnected' ? 'Mất kết nối' : 'Đang kết nối...'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Tìm theo tên, email hoặc số điện thoại..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/30 focus:outline-none text-slate-700"
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>
                    )}
                </div>
                {searchQuery && (
                    <p className="text-xs text-slate-500 mt-2 px-1">Tìm thấy <strong>{filtered.length}</strong> kết quả cho "{searchQuery}"</p>
                )}
            </div>

            {/* Error State */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4">
                    <span className="material-symbols-outlined text-red-500 text-3xl shrink-0">wifi_off</span>
                    <div>
                        <h4 className="font-bold text-red-800 mb-1">Không thể kết nối đến Server</h4>
                        <p className="text-sm text-red-600">{error}</p>
                        <p className="text-xs text-red-500 mt-2">Hãy chắc chắn server đang chạy: <code className="bg-red-100 px-2 py-0.5 rounded">npm run server</code></p>
                        <button onClick={fetchUsers} className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-bold hover:bg-red-600 transition-colors">
                            Thử lại
                        </button>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {loading && !error && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-medium">Đang tải dữ liệu từ PostgreSQL...</p>
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && filtered.length === 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
                    <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">manage_accounts</span>
                    <h4 className="text-lg font-bold text-slate-600 mb-2">
                        {searchQuery ? 'Không tìm thấy kết quả' : 'Chưa có tài khoản nào'}
                    </h4>
                    <p className="text-sm text-slate-400">
                        {searchQuery ? 'Thử tìm kiếm với từ khoá khác.' : 'Người dùng sẽ xuất hiện ở đây sau khi đăng ký tài khoản.'}
                    </p>
                </div>
            )}

            {/* User Table */}
            {!loading && !error && filtered.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Người dùng</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Liên hệ</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vai trò</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ngày đăng ký</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng thái</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filtered.map(user => (
                                    <tr key={user.id} className={`hover:bg-slate-50/50 transition-colors ${!user.isActive ? 'opacity-60' : ''}`}>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">
                                                #{String(user.id).padStart(5, '0')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-full bg-gradient-to-br from-primary to-green-400 flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
                                                    {user.parentName.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800 text-sm">{user.parentName}</p>
                                                    <p className="text-xs text-slate-400">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-slate-600">
                                                <span className="material-symbols-outlined text-sm text-slate-400">call</span>
                                                <span className="text-sm font-medium">{user.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${user.role === 'parent' ? 'bg-purple-100 text-purple-700' : user.role === 'teacher' ? 'bg-secondary/10 text-secondary' : user.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-600'}`}>
                                                {user.role === 'parent' ? 'Phụ huynh' : user.role === 'teacher' ? 'Giáo viên' : user.role === 'admin' ? 'Admin' : user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs font-medium text-slate-500">
                                                {new Date(user.createdAt).toLocaleDateString('vi-VN', {
                                                    day: '2-digit', month: '2-digit', year: 'numeric'
                                                })}
                                            </p>
                                            <p className="text-[10px] text-slate-400">
                                                {new Date(user.createdAt).toLocaleTimeString('vi-VN', {
                                                    hour: '2-digit', minute: '2-digit'
                                                })}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-primary animate-pulse' : 'bg-slate-300'}`}></span>
                                                <span className={`text-xs font-bold ${user.isActive ? 'text-primary' : 'text-slate-400'}`}>
                                                    {user.isActive ? 'Hoạt động' : 'Đã khoá'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => handleToggleActive(user.id)}
                                                    disabled={togglingId === user.id}
                                                    title={user.isActive ? 'Khoá tài khoản' : 'Mở khoá'}
                                                    className={`p-2 rounded-lg transition-colors ${user.isActive ? 'text-yellow-500 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'} disabled:opacity-50`}
                                                >
                                                    <span className="material-symbols-outlined text-lg">
                                                        {togglingId === user.id ? 'hourglass_empty' : user.isActive ? 'lock' : 'lock_open'}
                                                    </span>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id, user.parentName)}
                                                    disabled={deletingId === user.id}
                                                    title="Xoá tài khoản"
                                                    className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                                                >
                                                    <span className="material-symbols-outlined text-lg">
                                                        {deletingId === user.id ? 'hourglass_empty' : 'delete'}
                                                    </span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                        <p className="text-xs text-slate-500">
                            Hiển thị <strong>{filtered.length}</strong> / <strong>{users.length}</strong> tài khoản
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span className="material-symbols-outlined text-base text-green-500">database</span>
                            PostgreSQL Docker • Port 5433
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ============================================================
// MAIN ADMIN DASHBOARD
// ============================================================
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const navItems = [
        { id: 'overview', icon: 'dashboard', label: 'Tổng quan', color: 'text-primary' },
        { id: 'users-db', icon: 'database', label: 'User Database', color: 'text-purple-600', badge: true },
        { id: 'accounts', icon: 'group', label: 'Quản lý Tài Khoản', color: 'text-secondary' },
        { id: 'monitor', icon: 'monitoring', label: 'Giám sát Hoạt Động', color: 'text-secondary' },
        { id: 'content', icon: 'article', label: 'Quản lý Nội Dung', color: 'text-secondary' },
        { id: 'reports', icon: 'bar_chart', label: 'Báo Cáo & Thống Kê', color: 'text-secondary' },
    ];

    const systemItems = [
        { id: 'settings', icon: 'settings', label: 'Cài Đặt Hệ Thống' },
        { id: 'logs', icon: 'history_edu', label: 'Log Hệ Thống' },
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside className="w-72 bg-white dark:bg-background-dark border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0">
                    <div className="p-6 flex flex-col items-start gap-4 border-b border-slate-100">
                        <img src="/assets/logo/mainlogo.png" alt="Vẽ Tư Duy STEAM" className="h-12 w-auto object-contain" />
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold px-1">Super Admin</p>
                    </div>
                    <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${activeTab === item.id ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-600 hover:bg-slate-100'}`}
                            >
                                <span className={`material-symbols-outlined ${activeTab === item.id ? '' : item.color}`}>{item.icon}</span>
                                <span className="font-medium flex-1">{item.label}</span>
                                {item.badge && activeTab !== item.id && (
                                    <span className="text-[9px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-black uppercase">DB</span>
                                )}
                            </button>
                        ))}
                        <div className="pt-4 pb-2 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Hệ thống</div>
                        {systemItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${activeTab === item.id ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                            </button>
                        ))}
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
                                <input className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary/50 text-sm focus:outline-none" placeholder="Tìm kiếm dữ liệu..." type="text" />
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <button className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 transition-colors">
                                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">notifications</span>
                                </button>
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">5</span>
                            </div>
                            <div className="flex items-center gap-3 border-l pl-6 border-slate-200 dark:border-slate-800">
                                <div className="text-right">
                                    <p className="text-sm font-bold leading-none">Admin Nguyễn</p>
                                    <p className="text-xs text-slate-500 mt-1">Quản trị viên cấp cao</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-primary/20 overflow-hidden border-2 border-primary/20">
                                    <img alt="Admin Avatar" className="w-full h-full object-cover" src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Dashboard Body */}
                    <div className="flex-1 overflow-y-auto p-8">

                        {/* === USER DATABASE TAB === */}
                        {activeTab === 'users-db' && <UserDatabaseManager />}

                        {/* === OVERVIEW TAB === */}
                        {activeTab === 'overview' && (
                            <div className="space-y-8">
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
                                    {[
                                        { label: 'Tổng người dùng', value: '1,500', icon: 'person', color: 'primary', change: '+12%' },
                                        { label: 'Giáo viên', value: '50', icon: 'school', color: 'secondary', pct: '75%' },
                                        { label: 'Phụ huynh', value: '600', icon: 'family_restroom', color: 'yellow-400', pct: '60%' },
                                        { label: 'Học sinh', value: '850', icon: 'child_care', color: 'red-400', pct: '85%' },
                                    ].map((stat, idx) => (
                                        <div key={idx} className="bg-white dark:bg-background-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                                                    <h4 className="text-3xl font-black mt-1">{stat.value}</h4>
                                                </div>
                                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                                    <span className="material-symbols-outlined">{stat.icon}</span>
                                                </div>
                                            </div>
                                            {stat.pct && (
                                                <div className="mt-4 flex items-center gap-2">
                                                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                        <div className="h-full bg-primary rounded-full" style={{ width: stat.pct }}></div>
                                                    </div>
                                                    <span className="text-xs text-primary font-bold">{stat.pct}</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Quick action to User DB */}
                                <div
                                    onClick={() => setActiveTab('users-db')}
                                    className="bg-gradient-to-r from-purple-600 to-purple-400 p-6 rounded-2xl flex items-center justify-between text-white cursor-pointer hover:from-purple-700 hover:to-purple-500 transition-all shadow-lg"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white text-2xl">database</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold">User Database Manager</h3>
                                            <p className="text-white/80 text-sm">Xem và quản lý tất cả tài khoản người dùng trong PostgreSQL</p>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-3xl">arrow_forward</span>
                                </div>

                                {/* Charts Section */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                        <div className="flex justify-between items-center mb-8">
                                            <h3 className="text-xl font-black">Hoạt động hàng tháng</h3>
                                            <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary h-10 px-4 focus:outline-none">
                                                <option>Năm 2024</option>
                                                <option>Năm 2023</option>
                                            </select>
                                        </div>
                                        <div className="flex items-end justify-between h-48 px-4 gap-4">
                                            {[45, 65, 85, 60, 95, 75].map((value, idx) => (
                                                <div key={idx} className="flex flex-col items-center gap-3 w-full h-full justify-end">
                                                    <div className="w-full bg-slate-50 dark:bg-slate-800 rounded-t-xl relative h-full">
                                                        <div className="absolute bottom-0 w-full bg-primary rounded-t-xl hover:opacity-80 transition-all cursor-pointer" style={{ height: `${value}%` }}></div>
                                                    </div>
                                                    <span className="text-[10px] text-slate-500 font-black uppercase">T{idx + 1}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                                        <h3 className="text-xl font-black mb-8">Phân bố khối tuổi</h3>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <div className="flex justify-center mb-8 relative">
                                                <svg className="w-40 h-40" viewBox="0 0 100 100">
                                                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#4cae4f" strokeDasharray="251.2" strokeDashoffset="60" strokeWidth="15" />
                                                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#2196F3" strokeDasharray="251.2" strokeDashoffset="180" strokeWidth="15" />
                                                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#FFEB3B" strokeDasharray="251.2" strokeDashoffset="240" strokeWidth="15" />
                                                </svg>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-3xl font-black">100%</span>
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Học sinh</span>
                                                </div>
                                            </div>
                                            {[['Mầm', 'primary', '35%'], ['Chồi', 'secondary', '45%'], ['Lá', 'accent', '20%']].map(([label, color, pct]) => (
                                                <div key={label} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-3 h-3 bg-${color} rounded-full`}></div>
                                                        <span className="text-sm font-bold">{label}</span>
                                                    </div>
                                                    <span className="text-sm font-black text-slate-600">{pct}</span>
                                                </div>
                                            ))}
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
                                                    {['Thời gian', 'Người dùng', 'Hoạt động', 'Trạng thái', 'Thao tác'].map(h => (
                                                        <th key={h} className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                                {[
                                                    { time: 'Hôm nay, 10:45', name: 'Gv. Minh Anh', action: 'Upload', label: 'Bài giảng Tư duy sáng tạo', seed: 'Teacher' },
                                                    { time: 'Hôm nay, 09:20', name: 'Pn. Hoàng Nam', action: 'Login', label: 'Đăng nhập từ Mobile App', seed: 'Parent' },
                                                    { time: '05/03/2024', name: 'Hs. Bé Bi', action: 'Đăng bài', label: 'Bức vẽ "Gia đình em"', seed: 'Kids' },
                                                ].map((row, idx) => (
                                                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                        <td className="px-8 py-4 text-xs font-medium text-slate-500">{row.time}</td>
                                                        <td className="px-8 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shadow-sm border border-white">
                                                                    <img alt="User" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${row.seed}`} />
                                                                </div>
                                                                <span className="text-sm font-bold text-slate-800">{row.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-black text-[10px] uppercase">{row.action}</span>
                                                                <span className="text-xs font-bold text-slate-600 italic">{row.label}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-4">
                                                            <div className="flex items-center gap-2 text-primary">
                                                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                                                <span className="text-[10px] font-black uppercase">Thành công</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-4 text-right">
                                                            <button className="p-2 text-slate-300 hover:text-primary transition-colors hover:bg-primary/5 rounded-lg">
                                                                <span className="material-symbols-outlined text-lg">more_horiz</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Placeholder for other tabs */}
                        {!['overview', 'users-db'].includes(activeTab) && (
                            <div className="flex h-64 flex-col items-center justify-center text-slate-400 font-medium bg-white rounded-3xl border-2 border-dashed border-slate-200">
                                <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">construction</span>
                                <p className="text-lg">Tính năng đang được phát triển</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
