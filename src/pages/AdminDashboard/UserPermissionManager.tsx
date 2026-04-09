import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/config/api';

interface User {
    id: number;
    username: string;
    email: string;
    role?: string;
    parentProfile?: { parent_name: string };
    staffProfile?: { full_name: string };
}

interface Permission {
    id: number;
    code: string;
    description: string;
}

const UserPermissionManager = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    
    const [searchUser, setSearchUser] = useState('');
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    
    // Permission states
    const [directPerms, setDirectPerms] = useState<number[]>([]);
    const [inheritedPerms, setInheritedPerms] = useState<number[]>([]); // To be populated if backend supports it
    
    const [loadingData, setLoadingData] = useState(true);
    const [loadingUserPerms, setLoadingUserPerms] = useState(false);
    const [saving, setSaving] = useState(false);

    const fetchData = async () => {
        setLoadingData(true);
        try {
            const token = localStorage.getItem('token');
            const [uRes, pRes] = await Promise.all([
                fetch(`${API_BASE_URL}/api/users`, { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch(`${API_BASE_URL}/api/permissions`, { headers: { 'Authorization': `Bearer ${token}` } })
            ]);
            const uData = await uRes.json();
            const pData = await pRes.json();
            
            if (uData.success) {
                // users might be wrapped in different ways depending on your app
                setUsers(uData.users || uData.data || []);
            }
            if (pData.success) setPermissions(pData.data);
        } catch (error) {
            console.error('Failed to load users/permissions');
        } finally {
            setLoadingData(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedUserId) {
            fetchUserPermissions(selectedUserId);
        } else {
            setDirectPerms([]);
            setInheritedPerms([]);
        }
    }, [selectedUserId]);

    const fetchUserPermissions = async (userId: number) => {
        setLoadingUserPerms(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/users/${userId}/permissions`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                // For now backend returns flat array of direct permissions.
                // In the future it might return { direct: [...], inherited: [...] }
                if (data.data && Array.isArray(data.data)) {
                    setDirectPerms(data.data.map((p: any) => p.id));
                    setInheritedPerms([]); // Mock empty for now
                } else if (data.data) {
                    setDirectPerms((data.data.direct || []).map((p: any) => p.id));
                    setInheritedPerms((data.data.inherited || []).map((p: any) => p.id));
                }
            }
        } catch (error) {
            console.error('Failed to load user perms');
        } finally {
            setLoadingUserPerms(false);
        }
    };

    const handleTogglePerm = (permId: number) => {
        if (inheritedPerms.includes(permId)) return; // Cannot toggle inherited
        
        setDirectPerms(prev => 
            prev.includes(permId) ? prev.filter(id => id !== permId) : [...prev, permId]
        );
    };

    const handleSaveUserPerms = async () => {
        if (!selectedUserId) return;
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/users/${selectedUserId}/permissions`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ permission_ids: directPerms }) // Expected by backend
            });
            const data = await res.json();
            if (data.success) {
                alert('Đã cập nhật đặc quyền thành công!');
            } else {
                alert(data.error || 'Có lỗi xảy ra');
            }
        } catch (error) {
            alert('Lỗi hệ thống!');
        } finally {
            setSaving(false);
        }
    };

    const displayName = (u: User) => u.staffProfile?.full_name || u.parentProfile?.parent_name || u.username;

    const filteredUsers = searchUser.trim() === '' 
        ? users.slice(0, 100) // limit initial render
        : users.filter(u => displayName(u).toLowerCase().includes(searchUser.toLowerCase()) || u.email.toLowerCase().includes(searchUser.toLowerCase())).slice(0, 50);

    const groupedPermissions = permissions.reduce((acc, perm) => {
        const prefix = perm.code.split(':')[0] || 'Khác';
        if (!acc[prefix]) acc[prefix] = [];
        acc[prefix].push(perm);
        return acc;
    }, {} as Record<string, Permission[]>);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight lg:text-4xl mb-2">Phân Quyền Cá Nhân</h2>
                    <p className="text-slate-500 font-medium">Cấp đặc quyền ngoại lệ hoặc đè quyền cho từng tài khoản cụ thể.</p>
                </div>
            </div>

            {loadingData ? (
                <div className="flex h-64 items-center justify-center">
                    <span className="material-symbols-outlined animate-spin text-4xl text-emerald-500">sync</span>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-6 h-[800px]">
                    {/* Left Col - User Search */}
                    <div className="w-full lg:w-96 bg-white rounded-[32px] shadow-sm border border-slate-100 flex flex-col overflow-hidden shrink-0">
                        <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                            <h3 className="font-extrabold text-slate-800 text-lg uppercase tracking-tight mb-4">Tìm kiếm người dùng</h3>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                                <input value={searchUser} onChange={e => setSearchUser(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 shadow-sm rounded-xl focus:ring-2 focus:ring-emerald-500/20 font-medium text-sm text-slate-800 placeholder:text-slate-400 transition-all"
                                    placeholder="Tên hoặc email..." />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
                            {filteredUsers.length === 0 ? (
                                <p className="text-center text-sm text-slate-400 p-4">Không tìm thấy tài khoản nào.</p>
                            ) : (
                                filteredUsers.map(u => (
                                    <button 
                                        key={u.id} 
                                        onClick={() => setSelectedUserId(u.id)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left transition-all ${selectedUserId === u.id ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-100 shadow-sm' : 'hover:bg-slate-50 text-slate-600 font-medium border border-transparent'}`}
                                    >
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate block">{displayName(u)}</p>
                                            <p className={`text-[10px] truncate ${selectedUserId === u.id ? 'text-emerald-600/70' : 'text-slate-400'}`}>{u.email}</p>
                                        </div>
                                        {selectedUserId === u.id && <span className="material-symbols-outlined text-[18px] ml-2 shrink-0">check_circle</span>}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Right Col - Permissions */}
                    <div className="flex-1 bg-white rounded-[32px] shadow-sm border border-slate-100 flex flex-col overflow-hidden relative">
                        {loadingUserPerms && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                                <span className="material-symbols-outlined animate-spin text-4xl text-emerald-500">sync</span>
                            </div>
                        )}
                        
                        {!selectedUserId ? (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                                    <span className="material-symbols-outlined text-5xl text-slate-300">person_search</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-700 mb-2">Chưa chọn người dùng</h3>
                                <p className="text-slate-500 font-medium">Vui lòng tìm kiếm và chọn một người dùng ở cột bên trái để cấp quyền riêng.</p>
                            </div>
                        ) : (
                            <>
                                <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <h3 className="font-extrabold text-slate-800 text-lg uppercase tracking-tight">Đặc Quyền Cá Nhân</h3>
                                        <p className="text-sm font-medium text-slate-500 mt-1">Đang cấu hình cho tài khoản: <span className="text-emerald-600 font-bold">{displayName(users.find(u => u.id === selectedUserId)!)}</span></p>
                                    </div>
                                    <button 
                                        onClick={handleSaveUserPerms} disabled={saving}
                                        className="bg-emerald-600 text-white flex items-center gap-2 px-6 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-600/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 tracking-wide"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">{saving ? 'sync' : 'how_to_reg'}</span>
                                        {saving ? 'ĐANG LƯU...' : 'LƯU ĐẶC QUYỀN'}
                                    </button>
                                </div>
                                
                                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                                    {permissions.length === 0 ? (
                                        <div className="text-center py-20 text-slate-400">
                                            <p className="font-medium">Chưa có quyền nào trong hệ thống.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-10">
                                            {/* Note alert */}
                                            <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex gap-3 text-sm text-blue-800 font-medium">
                                                <span className="material-symbols-outlined shrink-0">info</span>
                                                <p>Các quyền có <span className="inline-block w-3 h-3 bg-slate-200 border border-slate-300 rounded mx-1"></span> nền xám là quyền được <strong>THỪA KẾ TỪ NHÓM</strong> của người dùng này. Bạn không thể gỡ quyền mặc định của nhóm tại màn hình này, chỉ có thể cấp thêm đặc quyền mới.</p>
                                            </div>

                                            {Object.entries(groupedPermissions).map(([prefix, perms]) => (
                                                <div key={prefix}>
                                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[3px] mb-4 flex items-center gap-2">
                                                        <span>MODULE {prefix}</span>
                                                        <div className="flex-1 h-px bg-slate-100"></div>
                                                    </h4>
                                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                                                        {perms.map(p => {
                                                            const isInherited = inheritedPerms.includes(p.id);
                                                            const isDirect = directPerms.includes(p.id);
                                                            const isChecked = isInherited || isDirect;
                                                            
                                                            // Style based on state
                                                            let containerStyle = '';
                                                            let checkStyle = '';
                                                            let textStyle = '';
                                                            
                                                            if (isInherited) {
                                                                containerStyle = 'bg-slate-50 border-slate-200 opacity-70 cursor-not-allowed';
                                                                checkStyle = 'bg-slate-300 border-slate-300 text-white';
                                                                textStyle = 'text-slate-500';
                                                            } else if (isDirect) {
                                                                containerStyle = 'bg-emerald-50/50 border-emerald-200 cursor-pointer';
                                                                checkStyle = 'bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-500/30';
                                                                textStyle = 'text-emerald-900';
                                                            } else {
                                                                containerStyle = 'bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50 cursor-pointer';
                                                                checkStyle = 'bg-white border-slate-300';
                                                                textStyle = 'text-slate-700';
                                                            }

                                                            return (
                                                                <label key={p.id} onClick={(e) => { e.preventDefault(); handleTogglePerm(p.id); }} className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all select-none ${containerStyle}`}>
                                                                    <div className={`mt-0.5 w-6 h-6 rounded-md flex items-center justify-center shrink-0 border-2 transition-all ${checkStyle}`}>
                                                                        {isChecked && <span className="material-symbols-outlined text-[16px] font-bold">check</span>}
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="flex items-center gap-2">
                                                                            <p className={`font-bold text-sm ${textStyle}`}>{p.code}</p>
                                                                            {isInherited && <span className="text-[9px] bg-slate-200 text-slate-500 font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Từ Nhóm</span>}
                                                                        </div>
                                                                        {p.description && <p className={`text-[12px] font-medium leading-relaxed mt-1 ${isInherited ? 'text-slate-400' : (isDirect ? 'text-emerald-600/80' : 'text-slate-400')}`}>{p.description}</p>}
                                                                    </div>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserPermissionManager;
