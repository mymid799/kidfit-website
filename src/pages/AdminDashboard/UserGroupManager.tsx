import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/config/api';

interface UserGroup {
    id: number;
    name: string;
    description: string;
    created_at: string;
}

const UserGroupManager = () => {
    const [groups, setGroups] = useState<UserGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [editingGroup, setEditingGroup] = useState<UserGroup | null>(null);
    const [search, setSearch] = useState('');
    
    const [formData, setFormData] = useState({ name: '', description: '' });

    const fetchGroups = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/groups`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setGroups(data.data);
            }
        } catch (error) {
            console.error('Khong the tai nhom', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const endpoint = editingGroup ? `${API_BASE_URL}/api/groups/${editingGroup.id}` : `${API_BASE_URL}/api/groups`;
            const method = editingGroup ? 'PUT' : 'POST';
            
            const res = await fetch(endpoint, {
                method,
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const data = await res.json();
            if (data.success) {
                alert('Thành công!');
                setIsCreating(false);
                setEditingGroup(null);
                setFormData({ name: '', description: '' });
                fetchGroups();
            } else {
                alert(data.error || 'Có lỗi xảy ra');
            }
        } catch (error) {
            alert('Lỗi hệ thống!');
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa nhóm này? Các tài khoản sẽ mất quyền tương ứng.')) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/groups/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setGroups(groups.filter(g => g.id !== id));
            } else {
                alert(data.error || 'Không thể xóa');
            }
        } catch (error) {
            alert('Lỗi hệ thống!');
        }
    };

    const startEdit = (group: UserGroup) => {
        setEditingGroup(group);
        setFormData({ name: group.name, description: group.description || '' });
    };

    const cancelEdit = () => {
        setEditingGroup(null);
        setIsCreating(false);
        setFormData({ name: '', description: '' });
    };

    const filtered = groups.filter(g => g.name.toLowerCase().includes(search.toLowerCase()) || (g.description && g.description.toLowerCase().includes(search.toLowerCase())));

    if (isCreating || editingGroup) {
        return (
            <div className="max-w-2xl mx-auto w-full animate-in fade-in zoom-in-95 duration-300">
                <nav className="flex items-center space-x-2 text-sm text-slate-400 mb-8 cursor-pointer hover:text-slate-600 transition-colors" onClick={cancelEdit}>
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    <span>Quay lại danh sách</span>
                </nav>
                <div className="bg-white rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
                    <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                    <div className="p-8 md:p-10">
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black text-slate-800 tracking-tight">{editingGroup ? 'Cập nhật nhóm' : 'Thêm nhóm mới'}</h2>
                                <p className="text-slate-500 text-sm mt-1 font-medium">{editingGroup ? 'Chỉnh sửa thông tin phân loại quyền' : 'Khai báo một chuẩn quyền hạn mới cho hệ thống'}</p>
                            </div>
                            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-indigo-600 text-3xl">groups_3</span>
                            </div>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Tên Nhóm <span className="text-red-500">*</span></label>
                                <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 text-slate-800 font-bold transition-all placeholder:font-medium placeholder:text-slate-400"
                                    placeholder="Vd: Quản trị viên, Kế toán..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Mô tả chi tiết</label>
                                <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 text-slate-800 font-medium transition-all min-h-[120px] placeholder:text-slate-400 resize-none"
                                    placeholder="Nhóm này được sinh ra để làm gì? Ai sẽ thuộc nhóm này?" />
                            </div>
                            <div className="pt-6 flex gap-4">
                                <button type="button" onClick={cancelEdit} className="w-full py-4 rounded-2xl font-bold text-slate-600 bg-white border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95">Hủy bỏ</button>
                                <button type="submit" className="w-full py-4 rounded-2xl font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:-translate-y-0.5 transition-all active:translate-y-0 tracking-wide">{editingGroup ? 'LƯU THAY ĐỔI' : 'TẠO NHÓM MỚI'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight lg:text-4xl mb-2">Nhóm Người Dùng</h2>
                    <p className="text-slate-500 font-medium">Quản lý cách phân loại và phân mảnh vai trò của hệ thống.</p>
                </div>
                <button onClick={() => setIsCreating(true)} className="bg-slate-800 text-white px-6 py-3.5 rounded-2xl font-bold shadow-xl shadow-slate-800/20 hover:shadow-slate-800/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 tracking-wide">
                    <span className="material-symbols-outlined text-lg">add</span>
                    THÊM NHÓM
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="flex-1 relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input value={search} onChange={e => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 font-medium text-sm text-slate-800 placeholder:text-slate-400"
                        placeholder="Tìm kiếm nhóm..." />
                </div>
                <button onClick={fetchGroups} className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-500 bg-slate-50 hover:bg-slate-100 transition-colors" title="Làm mới">
                    <span className={`material-symbols-outlined ${loading ? 'animate-spin' : ''}`}>sync</span>
                </button>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(group => (
                    <div key={group.id} className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 group relative overflow-hidden transition-all hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full transition-transform group-hover:scale-110 pointer-events-none"></div>
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-xl">
                                {group.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => startEdit(group)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                </button>
                                <button onClick={() => handleDelete(group.id)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors">
                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                </button>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">{group.name}</h3>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-3 min-h-[60px]">{group.description || <span className="italic opacity-50">Không có mô tả</span>}</p>
                        <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-6">
                            <div className="flex gap-1.5 flex-wrap">
                                <span className="px-2.5 py-1 bg-slate-100 text-slate-500 text-[10px] font-black tracking-widest uppercase rounded-lg">ID: {group.id}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{new Date(group.created_at).toLocaleDateString('vi-VN')}</span>
                        </div>
                    </div>
                ))}

                {filtered.length === 0 && !loading && (
                    <div className="col-span-full py-20 text-center flex flex-col items-center">
                        <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">search_off</span>
                        <p className="text-slate-500 font-medium">Không có nhóm nào hợp lệ.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserGroupManager;
