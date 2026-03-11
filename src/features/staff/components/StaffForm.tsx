import React, { useState, useEffect } from 'react';
import { CreateStaffData, Staff, StaffStatus } from '../types';

interface StaffFormProps {
    onClose: () => void;
    onSubmit: (data: CreateStaffData | any) => Promise<{ success: boolean; error?: string }>;
    initialData?: Staff;
}

export const StaffForm: React.FC<StaffFormProps> = ({ onClose, onSubmit, initialData }) => {
    const [form, setForm] = useState<CreateStaffData>({
        username: '',
        email: '',
        password: '',
        role: 'teacher',
        employee_id: '',
        full_name: '',
        class_group: '',
        position: 'Giáo viên chính',
        qualification: '',
        status: 'active',
        phone: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setForm({
                username: initialData.user.username,
                email: initialData.user.email,
                role: initialData.user.role as 'teacher' | 'admin',
                employee_id: initialData.employee_id,
                full_name: initialData.full_name,
                class_group: initialData.class_group || '',
                position: initialData.position,
                qualification: initialData.qualification || '',
                status: initialData.status,
                phone: initialData.phone || '',
            });
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // For update, ID is needed
        const submitData = initialData ? { ...form, id: initialData.id, is_active: initialData.user.is_active } : form;

        const result = await onSubmit(submitData);
        if (result.success) {
            onClose();
        } else {
            setError(result.error || 'Có lỗi xảy ra!');
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl w-full max-w-2xl p-10 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="size-14 bg-gradient-to-br from-primary to-orange-400 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-3xl">{initialData ? 'edit_square' : 'person_add'}</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-800 dark:text-white">
                                {initialData ? 'Chỉnh sửa Cán bộ' : 'Thêm mới Cán bộ'}
                            </h3>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">Sunshine School HR Management</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="size-10 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {error && (
                    <div className="mb-6 bg-rose-50 border-2 border-rose-100 text-rose-600 p-4 rounded-2xl text-sm font-black flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
                        <span className="material-symbols-outlined text-xl">error</span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Họ và tên *</label>
                            <input
                                required
                                value={form.full_name}
                                onChange={e => setForm({ ...form, full_name: e.target.value })}
                                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 rounded-2xl text-sm font-bold focus:outline-none transition-all placeholder:text-slate-300"
                                placeholder="Nguyễn Thị Lan Anh"
                            />
                        </div>

                        {/* Employee ID */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Mã nhân viên *</label>
                            <input
                                required
                                disabled={!!initialData}
                                value={form.employee_id}
                                onChange={e => setForm({ ...form, employee_id: e.target.value })}
                                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 rounded-2xl text-sm font-bold focus:outline-none transition-all placeholder:text-slate-300 disabled:opacity-50"
                                placeholder="GV-202401"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Email liên hệ *</label>
                            <input
                                required
                                type="email"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 rounded-2xl text-sm font-bold focus:outline-none transition-all placeholder:text-slate-300"
                                placeholder="anh.lt@sunshine.edu.vn"
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Số điện thoại</label>
                            <input
                                value={form.phone}
                                onChange={e => setForm({ ...form, phone: e.target.value })}
                                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 rounded-2xl text-sm font-bold focus:outline-none transition-all placeholder:text-slate-300"
                                placeholder="0912 345 678"
                            />
                        </div>

                        {/* Position */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Vị trí / Vai trò *</label>
                            <select
                                value={form.position}
                                onChange={e => setForm({ ...form, position: e.target.value })}
                                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 rounded-2xl text-sm font-bold focus:outline-none transition-all"
                            >
                                <option value="Giáo viên chính">Giáo viên chính</option>
                                <option value="Giáo viên phụ">Giáo viên phụ</option>
                                <option value="Bảo mẫu">Bảo mẫu</option>
                                <option value="Kế toán">Kế toán</option>
                                <option value="Quản lý">Quản lý</option>
                            </select>
                        </div>

                        {/* Class Group */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Nhóm lớp quản lý</label>
                            <input
                                value={form.class_group}
                                onChange={e => setForm({ ...form, class_group: e.target.value })}
                                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 rounded-2xl text-sm font-bold focus:outline-none transition-all placeholder:text-slate-300"
                                placeholder="Mầm 1, Chồi 2..."
                            />
                        </div>

                        {/* Status */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Trạng thái công tác</label>
                            <div className="flex gap-2">
                                {(['active', 'on_leave', 'suspended'] as StaffStatus[]).map(s => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setForm({ ...form, status: s })}
                                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${form.status === s ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-50 border-transparent text-slate-400 hover:border-slate-200'}`}
                                    >
                                        {s === 'active' ? 'Đang làm' : s === 'on_leave' ? 'Nghỉ phép' : 'Đình chỉ'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Qualification */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Trình độ chuyên môn</label>
                            <input
                                value={form.qualification}
                                onChange={e => setForm({ ...form, qualification: e.target.value })}
                                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 rounded-2xl text-sm font-bold focus:outline-none transition-all placeholder:text-slate-300"
                                placeholder="Đại học Sư phạm..."
                            />
                        </div>
                    </div>

                    {!initialData && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Username Đăng nhập *</label>
                                <input
                                    required
                                    value={form.username}
                                    onChange={e => setForm({ ...form, username: e.target.value })}
                                    className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 rounded-2xl text-sm font-bold focus:outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Mật khẩu ban đầu *</label>
                                <input
                                    required
                                    type="password"
                                    value={form.password}
                                    onChange={e => setForm({ ...form, password: e.target.value })}
                                    className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 rounded-2xl text-sm font-bold focus:outline-none transition-all"
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex gap-4 pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 border-2 border-slate-200 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all hover:text-slate-700"
                        >
                            Huỷ bỏ
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30 hover:shadow-primary/40 active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="size-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <span className="material-symbols-outlined text-sm">save</span>
                            )}
                            {initialData ? 'Lưu thay đổi' : 'Tạo mới nhân sự'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
