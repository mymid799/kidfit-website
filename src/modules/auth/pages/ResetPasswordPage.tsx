import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { authService } from '../services/authService';

export default function ResetPasswordPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    // Password strength indicators
    const checks = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    const strengthCount = Object.values(checks).filter(Boolean).length;
    const strengthLabel = strengthCount <= 2 ? 'Yếu' : strengthCount <= 4 ? 'Trung bình' : 'Mạnh';
    const strengthColor = strengthCount <= 2 ? 'bg-red-500' : strengthCount <= 4 ? 'bg-amber-500' : 'bg-green-500';

    useEffect(() => {
        if (!email) {
            setError('Không tìm thấy thông tin email. Vui lòng yêu cầu lại.');
        }
    }, [email]);

    const handleOtpChange = (index: number, value: string) => {
        if (!/^[0-9]?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) inputRefs.current[index + 1]?.focus();
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
        if (pastedData.length > 0) {
            const newOtp = [...otp];
            for (let i = 0; i < pastedData.length; i++) {
                newOtp[i] = pastedData[i];
            }
            setOtp(newOtp);
            inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const otpCode = otp.join('');
        if (otpCode.length < 6) {
            setError('Vui lòng nhập đủ 6 số OTP.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp!');
            return;
        }

        if (strengthCount < 5) {
            setError('Mật khẩu chưa đáp ứng tất cả yêu cầu bảo mật!');
            return;
        }

        setLoading(true);

        try {
            const data = await authService.resetPassword(email!, otpCode, password);
            if (data.success) {
                setSuccess(true);
                setTimeout(() => navigate('/login'), 3000);
            } else {
                setError(data.error || 'Đã có lỗi xảy ra!');
            }
        } catch (err) {
            setError('Lỗi kết nối server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-sans bg-[#f6f7f6] min-h-screen relative overflow-x-hidden text-slate-900">
            <div className="absolute top-10 left-10 text-primary/10 select-none pointer-events-none">
                <span className="material-symbols-outlined text-[120px]">key</span>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <header className="flex items-center justify-between px-6 py-4 lg:px-20 border-b border-primary/10 bg-white/50 backdrop-blur-md">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/assets/logo/mainlogo.png" alt="Vẽ Tư Duy STEAM" className="h-12 w-auto object-contain" />
                    </Link>
                </header>

                <main className="flex-1 flex flex-col items-center justify-center px-4 py-12" style={{ background: 'radial-gradient(circle at center, rgba(76, 174, 79, 0.15) 0%, rgba(246, 247, 246, 1) 100%)' }}>
                    <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl shadow-primary/5 overflow-hidden border border-primary/5">
                        <div className="p-8 md:p-10">
                            {success ? (
                                <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <span className="material-symbols-outlined text-5xl text-primary">check_circle</span>
                                    </div>
                                    <h2 className="text-2xl font-black text-slate-900 mb-3">Đặt lại mật khẩu thành công!</h2>
                                    <p className="text-slate-500 font-medium mb-6">
                                        Bạn sẽ được chuyển về trang đăng nhập trong vài giây...
                                    </p>
                                    <Link to="/login" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3 rounded-2xl hover:bg-primary/90 transition-all">
                                        <span className="material-symbols-outlined">login</span>
                                        Đăng nhập ngay
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <div className="text-center mb-8">
                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="material-symbols-outlined text-4xl text-primary">key</span>
                                        </div>
                                        <h2 className="text-3xl font-black text-slate-900 mb-2">Đặt lại mật khẩu</h2>
                                        <p className="text-slate-500 font-medium">Nhập mã OTP gồm 6 chữ số được gửi tới<br/><span className="font-bold">{email || '...'}</span></p>
                                    </div>

                                    {error && (
                                        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-lg">error</span>
                                            {error}
                                        </div>
                                    )}

                                    <form className="space-y-5" onSubmit={handleSubmit}>
                                        
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2 text-center">Mã thư xác thực (OTP)</label>
                                            <div className="flex justify-between gap-1 sm:gap-2 mb-2" onPaste={handlePaste}>
                                                {otp.map((digit, index) => (
                                                    <input
                                                        key={index}
                                                        ref={(el) => { inputRefs.current[index] = el; }}
                                                        type="text"
                                                        inputMode="numeric"
                                                        maxLength={1}
                                                        value={digit}
                                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                                        className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-black text-slate-800 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all"
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">Mật khẩu mới</label>
                                            <div className="relative">
                                                <input
                                                    id="reset-password"
                                                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all bg-slate-50 pr-12"
                                                    placeholder="••••••••"
                                                    type={showPassword ? 'text' : 'password'}
                                                    required
                                                    autoComplete="new-password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    <span className="material-symbols-outlined text-xl">
                                                        {showPassword ? 'visibility_off' : 'visibility'}
                                                    </span>
                                                </button>
                                            </div>

                                            {/* Password Strength Indicator */}
                                            {password.length > 0 && (
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

                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">Xác nhận mật khẩu mới</label>
                                            <input
                                                id="reset-confirm-password"
                                                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all bg-slate-50"
                                                placeholder="••••••••"
                                                type="password"
                                                required
                                                autoComplete="new-password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                            {confirmPassword && password !== confirmPassword && (
                                                <p className="mt-1 text-xs text-red-500 font-bold">Mật khẩu không khớp!</p>
                                            )}
                                        </div>

                                        <button
                                            id="reset-submit"
                                            type="submit"
                                            disabled={loading || !email}
                                            className={`w-full bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-primary/20 text-lg flex items-center justify-center gap-2 ${loading || !email ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-1 active:translate-y-0'}`}
                                        >
                                            {loading ? (
                                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    <span className="material-symbols-outlined">lock</span>
                                                    Xác nhận đổi mật khẩu
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </main>

                <footer className="py-6 text-center text-slate-400 text-xs font-bold">
                    © 2026 Vẽ Tư Duy STEAM. Kiến tạo tương lai bằng sáng tạo.
                </footer>
            </div>
        </div>
    );
}
