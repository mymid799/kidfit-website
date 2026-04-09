import React, { useState } from 'react';
import { authService } from '../../auth/services/authService';

export const ChangePassword = ({ onSuccess }: { onSuccess?: () => void }) => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    // Password strength checks
    const checks = {
        length: formData.newPassword.length >= 8,
        upper: /[A-Z]/.test(formData.newPassword),
        lower: /[a-z]/.test(formData.newPassword),
        number: /[0-9]/.test(formData.newPassword),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword),
    };
    const strengthCount = Object.values(checks).filter(Boolean).length;
    const strengthLabel = strengthCount <= 2 ? 'Yếu' : strengthCount <= 4 ? 'Trung bình' : 'Mạnh';
    const strengthColor = strengthCount <= 2 ? 'bg-red-500' : strengthCount <= 4 ? 'bg-amber-500' : 'bg-green-500';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setMessage({ text: '', type: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        if (formData.newPassword !== formData.confirmNewPassword) {
            setMessage({ text: 'Mật khẩu mới và xác nhận không khớp!', type: 'error' });
            return;
        }

        if (strengthCount < 5) {
            setMessage({ text: 'Mật khẩu mới chưa đáp ứng tất cả yêu cầu bảo mật!', type: 'error' });
            return;
        }

        setLoading(true);

        try {
            const data = await authService.changePassword(
                formData.currentPassword,
                formData.newPassword,
                formData.confirmNewPassword
            );

            if (data.success) {
                setMessage({ text: 'Đổi mật khẩu thành công! Vui lòng đăng nhập lại.', type: 'success' });
                setFormData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
                onSuccess?.();

                // Auto logout sau 2 giây (do server đã invalidate tất cả sessions)
                setTimeout(() => {
                    authService.logout().then(() => {
                        window.location.href = '/login';
                    });
                }, 2000);
            } else {
                setMessage({ text: data.error || 'Có lỗi xảy ra!', type: 'error' });
            }
        } catch (err) {
            setMessage({ text: 'Lỗi kết nối server.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">lock</span>
                <h2 className="text-xl font-bold">Đổi mật khẩu</h2>
            </div>

            {message.text && (
                <div className={`p-4 rounded-xl mb-4 flex items-center gap-2 ${message.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                    <span className="material-symbols-outlined text-lg">
                        {message.type === 'success' ? 'check_circle' : 'error'}
                    </span>
                    {message.text}
                </div>
            )}

            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl shadow-lg border border-primary/5">
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Current Password */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                            Mật khẩu hiện tại
                        </label>
                        <div className="relative">
                            <input
                                className="w-full rounded-lg border border-slate-200 px-4 py-3 focus:border-primary focus:ring-primary bg-slate-50 dark:bg-slate-800 pr-12"
                                type={showCurrent ? 'text' : 'password'}
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                required
                                autoComplete="current-password"
                                placeholder="Nhập mật khẩu hiện tại"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                onClick={() => setShowCurrent(!showCurrent)}
                            >
                                <span className="material-symbols-outlined text-xl">
                                    {showCurrent ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    <hr className="border-slate-100" />

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                            Mật khẩu mới
                        </label>
                        <div className="relative">
                            <input
                                className="w-full rounded-lg border border-slate-200 px-4 py-3 focus:border-primary focus:ring-primary bg-slate-50 dark:bg-slate-800 pr-12"
                                type={showNew ? 'text' : 'password'}
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                                placeholder="Nhập mật khẩu mới"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                onClick={() => setShowNew(!showNew)}
                            >
                                <span className="material-symbols-outlined text-xl">
                                    {showNew ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>

                        {/* Password Strength */}
                        {formData.newPassword.length > 0 && (
                            <div className="mt-3 space-y-2 animate-in fade-in duration-300">
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${strengthColor} transition-all duration-300 rounded-full`} style={{ width: `${(strengthCount / 5) * 100}%` }}></div>
                                    </div>
                                    <span className={`text-xs font-black ${strengthCount <= 2 ? 'text-red-500' : strengthCount <= 4 ? 'text-amber-500' : 'text-green-500'}`}>
                                        {strengthLabel}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-1 text-xs">
                                    {[
                                        { check: checks.length, label: '≥ 8 ký tự' },
                                        { check: checks.upper, label: 'Chữ hoa (A-Z)' },
                                        { check: checks.lower, label: 'Chữ thường (a-z)' },
                                        { check: checks.number, label: 'Chữ số (0-9)' },
                                        { check: checks.special, label: 'Ký tự đặc biệt' },
                                    ].map((item, i) => (
                                        <div key={i} className={`flex items-center gap-1 ${item.check ? 'text-green-600' : 'text-slate-400'}`}>
                                            <span className="material-symbols-outlined text-sm">{item.check ? 'check_circle' : 'circle'}</span>
                                            {item.label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Confirm New Password */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                            Xác nhận mật khẩu mới
                        </label>
                        <input
                            className="w-full rounded-lg border border-slate-200 px-4 py-3 focus:border-primary focus:ring-primary bg-slate-50 dark:bg-slate-800"
                            type="password"
                            name="confirmNewPassword"
                            value={formData.confirmNewPassword}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                            placeholder="Nhập lại mật khẩu mới"
                        />
                        {formData.confirmNewPassword && formData.newPassword !== formData.confirmNewPassword && (
                            <p className="mt-1 text-xs text-red-500 font-bold flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">error</span>
                                Mật khẩu không khớp!
                            </p>
                        )}
                    </div>

                    <button
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg shadow-lg shadow-primary/20 transition-all mt-2 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={loading}
                    >
                        {loading && <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>}
                        <span className="material-symbols-outlined text-lg">lock</span>
                        Đổi mật khẩu
                    </button>
                </form>
            </div>
        </div>
    );
};
