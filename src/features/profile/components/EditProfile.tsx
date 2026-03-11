import React, { useState, useEffect } from 'react';
import { useProfile } from '../hooks/useProfile';
import { ProfileData } from '../types';

export const EditProfile = ({ onSaveSuccess }: { onSaveSuccess?: () => void }) => {
    const { data, isLoading, error, updateProfile } = useProfile();
    const [formData, setFormData] = useState({
        full_name: '',
        employee_id: '',
        phone: '',
        bio: '',
        position: '',
        teaching_classes: [] as string[],
        certificates: [] as any[]
    });
    const [saveLoading, setSaveLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const classesList = ['Mầm', 'Chồi', 'Lá'];

    useEffect(() => {
        if (data && data.profile) {
            setFormData({
                full_name: data.profile.full_name || '',
                employee_id: data.profile.employee_id || '',
                phone: data.profile.phone || '',
                bio: data.profile.bio || '',
                position: data.profile.position || '',
                teaching_classes: data.profile.teaching_classes || [],
                certificates: data.profile.certificates || []
            });
        }
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (className: string) => {
        setFormData(prev => {
            const current = [...prev.teaching_classes];
            if (current.includes(className)) {
                return { ...prev, teaching_classes: current.filter(c => c !== className) };
            } else {
                return { ...prev, teaching_classes: [...current, className] };
            }
        });
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        // In a real scenario, this would upload the file to a server and get a URL.
        // For now, we omit real file uploading to avoid overcomplicating unless required.
        alert("Upload file chưa được triển khai đầy đủ. Vui lòng thêm logic upload.");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaveLoading(true);
        setMessage({ text: '', type: '' });

        const result = await updateProfile({
            full_name: formData.full_name,
            phone: formData.phone,
            bio: formData.bio,
            position: formData.position,
            teaching_classes: formData.teaching_classes,
            // Certificates can be added here if needed
            // avatar_url: can be added here once uploaded
        });

        if (result.success) {
            setMessage({ text: 'Cập nhật hồ sơ thành công!', type: 'success' });
            onSaveSuccess?.();
        } else {
            setMessage({ text: result.error || 'Có lỗi xảy ra', type: 'error' });
        }
        setSaveLoading(false);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse text-slate-300">
                <span className="material-symbols-outlined text-6xl mb-4">person</span>
                <p className="font-black text-xs uppercase tracking-[0.2em]">Đang tải hồ sơ...</p>
            </div>
        );
    }

    if (error && !data) {
        return (
            <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-200 flex items-center gap-4">
                <span className="material-symbols-outlined text-3xl">error</span>
                <div>
                    <p className="font-bold">Lỗi tải hồ sơ</p>
                    <p className="text-sm">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">person</span>
                <h2 className="text-xl font-bold">Hồ sơ Giáo viên</h2>
            </div>

            {message.text && (
                <div className={`p-4 rounded-xl mb-4 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {message.text}
                </div>
            )}

            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl shadow-lg border border-primary/5">
                <div className="flex flex-col items-center mb-8">
                    <div className="relative group">
                        <div className="size-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-md">
                            <img alt="Avatar" className="w-full h-full object-cover" src={data?.profile?.avatar_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuC5DuaznL_IO7ulfD0oj4LaqszSSM8Yl7EHhgEBKYsTway28vSIbAaaFs_2yvKbnGHVZWukHg491ZQNDxO8pjrpE3ARMSjW6IWo8zNrKlyDl5EF_q0R8VjOiC8qpfS2G3v13aAlHPkI6FB3t1CimEwmN0jlhI4oDZ8a8U7hGa3PHPkU06R7xSv8Md2-HoM7iGpgIChi_KMWvKE_vNNAsbD9XpUhcIwxtEmoTGpt1VB58NuLZm_KAisiF-wkQkE-XMtrVVeZldr1Dfk"} />
                        </div>
                        <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg">
                            <span className="material-symbols-outlined text-sm">upload_file</span>
                            <input className="hidden" type="file" onChange={handleAvatarChange} accept="image/*" />
                        </label>
                    </div>
                    <p className="mt-3 text-sm text-slate-500 font-medium">Thay đổi ảnh đại diện</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Họ và Tên</label>
                        <input className="w-full rounded-lg border-primary/20 focus:border-primary focus:ring-primary bg-background-light dark:bg-slate-800" type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Mã Giáo viên</label>
                        <input className="w-full rounded-lg border-primary/10 bg-slate-100 dark:bg-slate-700 text-slate-500 cursor-not-allowed" readOnly type="text" value={formData.employee_id} />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Chuyên môn / Vị trí</label>
                        <input className="w-full rounded-lg border-primary/20 focus:border-primary focus:ring-primary bg-background-light dark:bg-slate-800" type="text" name="position" value={formData.position} onChange={handleChange} placeholder="VD: Giáo viên Mỹ thuật" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Số điện thoại</label>
                        <input className="w-full rounded-lg border-primary/20 focus:border-primary focus:ring-primary bg-background-light dark:bg-slate-800" type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Giới thiệu (Bio)</label>
                        <textarea className="w-full rounded-lg border-primary/20 focus:border-primary focus:ring-primary bg-background-light dark:bg-slate-800" rows={4} name="bio" value={formData.bio} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Khối lớp giảng dạy</label>
                        <div className="flex flex-wrap gap-2">
                            {classesList.map(cls => (
                                <label key={cls} className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full cursor-pointer hover:bg-primary/20 transition-colors">
                                    <input
                                        type="checkbox"
                                        className="text-primary focus:ring-primary rounded"
                                        checked={formData.teaching_classes.includes(cls)}
                                        onChange={() => handleCheckboxChange(cls)}
                                    />
                                    <span className="text-sm font-medium">{cls}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Chứng chỉ nghiệp vụ</label>
                        <div className="space-y-2">
                            {formData.certificates.map((cert: any, index: number) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-background-light dark:bg-slate-800 rounded-lg border border-primary/10">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{cert.name}</span>
                                        <span className="text-xs text-slate-500">Cấp ngày: {cert.issue_date}</span>
                                    </div>
                                    <button className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors" type="button" onClick={() => {
                                        if (cert.file_url) window.open(cert.file_url, '_blank');
                                    }}>
                                        <span className="material-symbols-outlined">visibility</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button className="flex items-center justify-center gap-2 w-full py-2 border-2 border-dashed border-primary/30 rounded-lg text-primary text-sm font-semibold hover:bg-primary/5 transition-all" type="button" onClick={() => alert('Thêm chứng chỉ chưa được triển khai')}>
                            <span className="material-symbols-outlined text-sm">add_circle</span>
                            Thêm chứng chỉ mới
                        </button>
                    </div>
                    <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg shadow-lg shadow-primary/20 transition-all mt-2 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed" type="submit" disabled={saveLoading}>
                        {saveLoading && <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>}
                        Lưu thay đổi
                    </button>
                </form>
            </div>
        </div>
    );
};
