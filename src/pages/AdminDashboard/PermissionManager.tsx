import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/config/api';

interface UserGroup {
    id: number;
    name: string;
}

interface Permission {
    id: number;
    code: string;
    description: string;
}

const PermissionManager = () => {
    const [groups, setGroups] = useState<UserGroup[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
    const [groupPerms, setGroupPerms] = useState<number[]>([]);
    
    // Status
    const [loadingData, setLoadingData] = useState(true);
    const [loadingPerms, setLoadingPerms] = useState(false);
    const [saving, setSaving] = useState(false);
    
    const [isCreatingPerm, setIsCreatingPerm] = useState(false);
    const [newPermData, setNewPermData] = useState({ code: '', description: '' });

    const fetchData = async () => {
        setLoadingData(true);
        try {
            const token = localStorage.getItem('token');
            const [gRes, pRes] = await Promise.all([
                fetch(`${API_BASE_URL}/api/groups`, { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch(`${API_BASE_URL}/api/permissions`, { headers: { 'Authorization': `Bearer ${token}` } })
            ]);
            const gData = await gRes.json();
            const pData = await pRes.json();
            
            if (gData.success) setGroups(gData.data);
            if (pData.success) setPermissions(pData.data);
            
            if (gData.success && gData.data.length > 0) {
                setSelectedGroupId(gData.data[0].id);
            }
        } catch (error) {
            console.error('Failed to load groups/permissions');
        } finally {
            setLoadingData(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedGroupId) {
            fetchGroupPermissions(selectedGroupId);
        }
    }, [selectedGroupId]);

    const fetchGroupPermissions = async (groupId: number) => {
        setLoadingPerms(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/groups/${groupId}/permissions`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setGroupPerms(data.data.map((p: any) => p.id));
            }
        } catch (error) {
            console.error('Failed to load group perms');
        } finally {
            setLoadingPerms(false);
        }
    };

    const handleTogglePerm = (permId: number) => {
        setGroupPerms(prev => 
            prev.includes(permId) ? prev.filter(id => id !== permId) : [...prev, permId]
        );
    };

    const handleSaveGroupPerms = async () => {
        if (!selectedGroupId) return;
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/groups/${selectedGroupId}/permissions`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ permission_ids: groupPerms })
            });
            const data = await res.json();
            if (data.success) {
                alert('Đã cập nhật quyền cho nhóm!');
            } else {
                alert(data.error || 'Có lỗi xảy ra');
            }
        } catch (error) {
            alert('Lỗi hệ thống!');
        } finally {
            setSaving(false);
        }
    };
    
    const handleCreatePerm = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/permissions`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPermData)
            });
            const data = await res.json();
            if (data.success) {
                setPermissions([...permissions, data.data]);
                setIsCreatingPerm(false);
                setNewPermData({ code: '', description: '' });
            } else {
                alert(data.error || 'Có lỗi xảy ra');
            }
        } catch (error) {
            alert('Lỗi hệ thống!');
        }
    };

    // Group permissions by their prefix (e.g. user:create -> Users)
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
                    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight lg:text-4xl mb-2">Phân Quyền Nhóm</h2>
                    <p className="text-slate-500 font-medium">Ấn định đặc quyền truy cập hệ thống cho từng phân nhóm người dùng.</p>
                </div>
                <button onClick={() => setIsCreatingPerm(true)} className="bg-white border-2 border-slate-200 text-slate-600 px-5 py-3 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2 text-sm tracking-wide">
                    <span className="material-symbols-outlined text-[20px]">vpn_key</span>
                    TẠO QUYỀN MỚI
                </button>
            </div>
            
            {/* Create Perm Modal */}
            {isCreatingPerm && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-bold text-slate-800">Tạo mã quyền hệ thống</h3>
                            <button onClick={() => setIsCreatingPerm(false)} className="text-slate-400 hover:text-slate-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleCreatePerm} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mã Quyền (Code)</label>
                                <input required placeholder="vd: student:create" value={newPermData.code} onChange={e => setNewPermData({...newPermData, code: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mô tả (Description)</label>
                                <input placeholder="Cho phép tạo học sinh mới..." value={newPermData.description} onChange={e => setNewPermData({...newPermData, description: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" />
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setIsCreatingPerm(false)} className="flex-1 py-3 rounded-xl font-bold bg-white border-2 border-slate-200 text-slate-600 hover:bg-slate-50">Hủy</button>
                                <button type="submit" className="flex-1 py-3 rounded-xl font-bold bg-indigo-600 text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700">Tạo mới</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {loadingData ? (
                <div className="flex h-64 items-center justify-center">
                    <span className="material-symbols-outlined animate-spin text-4xl text-indigo-500">sync</span>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-6 h-[800px]">
                    {/* Left Col - Groups */}
                    <div className="w-full lg:w-80 bg-white rounded-[32px] shadow-sm border border-slate-100 flex flex-col overflow-hidden shrink-0">
                        <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                            <h3 className="font-extrabold text-slate-800 text-lg uppercase tracking-tight">Danh Sách Nhóm</h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-3 space-y-1">
                            {groups.length === 0 ? (
                                <p className="text-center text-sm text-slate-400 p-4">Chưa có nhóm nào.</p>
                            ) : (
                                groups.map(g => (
                                    <button 
                                        key={g.id} 
                                        onClick={() => setSelectedGroupId(g.id)}
                                        className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl text-left transition-all ${selectedGroupId === g.id ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-50 text-slate-600 font-medium'}`}
                                    >
                                        <span className="truncate">{g.name}</span>
                                        {selectedGroupId === g.id && <span className="material-symbols-outlined text-[18px]">chevron_right</span>}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Right Col - Permissions */}
                    <div className="flex-1 bg-white rounded-[32px] shadow-sm border border-slate-100 flex flex-col overflow-hidden relative">
                        {loadingPerms && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                                <span className="material-symbols-outlined animate-spin text-4xl text-indigo-500">sync</span>
                            </div>
                        )}
                        <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h3 className="font-extrabold text-slate-800 text-lg uppercase tracking-tight">Thiết Lập Quyền</h3>
                                <p className="text-sm font-medium text-slate-500 mt-1">Đang cấu hình cho: <span className="text-indigo-600 font-bold">{groups.find(g => g.id === selectedGroupId)?.name || '...'}</span></p>
                            </div>
                            <button 
                                onClick={handleSaveGroupPerms} disabled={saving || !selectedGroupId}
                                className="bg-indigo-600 text-white flex items-center gap-2 px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
                            >
                                <span className="material-symbols-outlined text-[20px]">{saving ? 'sync' : 'save'}</span>
                                {saving ? 'ĐANG LƯU...' : 'LƯU PHÂN QUYỀN'}
                            </button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-6 md:p-8">
                            {permissions.length === 0 ? (
                                <div className="text-center py-20 text-slate-400">
                                    <span className="material-symbols-outlined text-5xl mb-2 opacity-50">gpp_maybe</span>
                                    <p className="font-medium">Chưa có quyền nào trong hệ thống.</p>
                                </div>
                            ) : (
                                <div className="space-y-10">
                                    {Object.entries(groupedPermissions).map(([prefix, perms]) => (
                                        <div key={prefix}>
                                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[3px] mb-4 flex items-center gap-2">
                                                <span>MODULE {prefix}</span>
                                                <div className="flex-1 h-px bg-slate-100"></div>
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {perms.map(p => {
                                                    const isChecked = groupPerms.includes(p.id);
                                                    return (
                                                        <label key={p.id} className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${isChecked ? 'bg-indigo-50/50 border-indigo-200' : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}>
                                                            <div className={`mt-0.5 w-6 h-6 rounded-md flex items-center justify-center shrink-0 border-2 transition-all ${isChecked ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-white border-slate-300'}`}>
                                                                {isChecked && <span className="material-symbols-outlined text-[16px] font-bold">check</span>}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className={`font-bold text-sm ${isChecked ? 'text-indigo-900' : 'text-slate-700'}`}>{p.code}</p>
                                                                {p.description && <p className={`text-[12px] font-medium leading-relaxed mt-1 ${isChecked ? 'text-indigo-600/70' : 'text-slate-400'}`}>{p.description}</p>}
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
                    </div>
                </div>
            )}
        </div>
    );
};

export default PermissionManager;
