import React, { useState, useEffect } from 'react';
import { useProfile } from '../hooks/useProfile';

export const EditParentProfile = ({ onSaveSuccess }: { onSaveSuccess?: () => void }) => {
    const { data, isLoading, error, updateProfile } = useProfile();
    const [formData, setFormData] = useState({
        parent_name: '',
        child_name_anonymous: '',
        child_age: 3,
        phone: ''
    });
    const [saveLoading, setSaveLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const ageOptions = [3, 4, 5, 6];

    useEffect(() => {
        if (data && data.profile) {
            setFormData({
                parent_name: data.profile.parent_name || '',
                child_name_anonymous: data.profile.child_name_anonymous || '',
                child_age: data.profile.child_age || 3,
                phone: data.profile.phone || ''
            });
        }
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: name === 'child_age' ? parseInt(value) : value 
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaveLoading(true);
        setMessage({ text: '', type: '' });

        const result = await updateProfile(formData);

        if (result.success) {
            setMessage({ text: 'Cập nhật thông tin thành công!', type: 'success' });
            onSaveSuccess?.();
        } else {
            setMessage({ text: result.error || 'Có lỗi xảy ra', type: 'error' });
        }
        setSaveLoading(false);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse text-[#4cae4f]">
                <span className="material-symbols-outlined text-6xl mb-4">family_restroom</span>
                <p className="font-black text-xs uppercase tracking-[0.2em]">Đang tải thông tin...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-[#4cae4f] p-2 bg-[#4cae4f]/10 rounded-lg">family_restroom</span>
                <h2 className="text-xl font-bold">Thông tin Phụ huynh & Bé</h2>
            </div>

            {message.text && (
                <div className={`p-4 rounded-xl mb-4 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {message.text}
                </div>
            )}

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-[#4cae4f]/5">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-black mb-2 text-slate-700 uppercase tracking-widest text-[10px]">Họ và Tên Phụ huynh</label>
                        <input 
                            className="w-full rounded-2xl border-slate-100 focus:border-[#4cae4f] focus:ring-[#4cae4f] bg-slate-50 text-sm font-bold" 
                            type="text" 
                            name="parent_name" 
                            value={formData.parent_name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-black mb-2 text-slate-700 uppercase tracking-widest text-[10px]">Tên bé (biệt danh/tên riêng)</label>
                        <input 
                            className="w-full rounded-2xl border-slate-100 focus:border-[#4cae4f] focus:ring-[#4cae4f] bg-slate-50 text-sm font-bold" 
                            type="text" 
                            name="child_name_anonymous" 
                            value={formData.child_name_anonymous} 
                            onChange={handleChange} 
                            required 
                            placeholder="VD: Bé Mầm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-black mb-2 text-slate-700 uppercase tracking-widest text-[10px]">Độ tuổi của bé</label>
                        <select 
                            className="w-full rounded-2xl border-slate-100 focus:border-[#4cae4f] focus:ring-[#4cae4f] bg-slate-50 text-sm font-bold" 
                            name="child_age" 
                            value={formData.child_age} 
                            onChange={handleChange}
                        >
                            {ageOptions.map(age => (
                                <option key={age} value={age}>{age} tuổi</option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-black mb-2 text-slate-700 uppercase tracking-widest text-[10px]">Số điện thoại liên lạc</label>
                        <input 
                            className="w-full rounded-2xl border-slate-100 focus:border-[#4cae4f] focus:ring-[#4cae4f] bg-slate-50 text-sm font-bold" 
                            type="tel" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            placeholder="VD: 0912345678"
                        />
                    </div>

                    <div className="md:col-span-2 pt-4">
                        <button 
                            className="w-full bg-[#4cae4f] hover:bg-[#439a46] text-white font-black py-4 rounded-2xl shadow-lg shadow-[#4cae4f]/20 transition-all flex justify-center items-center gap-2 uppercase tracking-widest text-xs" 
                            type="submit" 
                            disabled={saveLoading}
                        >
                            {saveLoading && <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>}
                            Lưu thông tin cập nhật
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
