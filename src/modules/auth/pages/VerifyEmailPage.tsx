import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../services/authService';

const VerifyEmailPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const email = searchParams.get('email');
    
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        if (!email) {
            setStatus('error');
            setErrorMessage('Không tìm thấy thông tin email. Vui lòng đăng ký lại.');
        }
    }, [email]);

    const handleOtpChange = (index: number, value: string) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input automatically
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Trigger verify automatically if all 6 digits are filled
        if (newOtp.every(x => x !== '')) {
            submitOtp(newOtp.join(''));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            // Move back on backspace
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
            if (pastedData.length === 6) {
                submitOtp(pastedData);
            }
        }
    };

    const submitOtp = async (otpCode: string) => {
        if (!email) return;
        setStatus('loading');
        
        try {
            const data = await authService.verifyEmail(email, otpCode);
            if (!data.success) {
                throw new Error(data.error || 'Xác thực thất bại');
            }
            setStatus('success');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err: any) {
            setStatus('error');
            setErrorMessage(err.message || 'Lỗi kết nối tới máy chủ.');
        }
    };

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join('');
        if (otpCode.length === 6) {
            submitOtp(otpCode);
        } else {
            setStatus('error');
            setErrorMessage('Vui lòng nhập đủ 6 số OTP.');
        }
    };

    return (
        <div className="min-h-screen bg-[#f0fdf4] font-display flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-8 relative overflow-hidden border border-white">
                
                {/* Header Icon */}
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-4xl text-primary animate-pulse">mark_email_read</span>
                </div>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-slate-800 mb-2">Nhập mã Xác thực</h2>
                    <p className="text-slate-500 font-medium">
                        Chúng tôi đã gửi một mã OTP 6 số tới email<br/>
                        <span className="font-bold text-slate-800">{email || '...'}</span>
                    </p>
                </div>

                {status === 'success' ? (
                    <div className="text-center animate-in zoom-in duration-500">
                        <div className="bg-green-50 text-green-700 p-6 rounded-2xl font-bold mb-6 border border-green-100">
                            🎉 Xác thực thành công! Tài khoản của bạn đã được kích hoạt. Đang chuyển hướng...
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleManualSubmit} className="space-y-6">
                        
                        {/* OTP Inputs */}
                        <div className="flex justify-between gap-2" onPaste={handlePaste}>
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
                                    className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black text-slate-800 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all"
                                />
                            ))}
                        </div>

                        {status === 'error' && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 text-center animate-in slide-in-from-top-2">
                                {errorMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading' || otp.join('').length < 6}
                            className={`w-full py-4.5 rounded-2xl font-black text-lg transition-all shadow-xl ${
                                status === 'loading'
                                ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                                : 'bg-primary text-white shadow-primary/30 hover:bg-green-600 hover:scale-[1.02] active:scale-95'
                            }`}
                        >
                            {status === 'loading' ? 'ĐANG XÁC THỰC...' : 'XÁC NHẬN'}
                        </button>
                    </form>
                )}

                <p className="mt-8 text-center text-xs text-slate-400 font-bold uppercase tracking-widest">
                    Chưa nhận được mã? <a href="#" className="text-primary hover:underline" onClick={(e) => { e.preventDefault(); alert('Tính năng gửi lại đang phát triển!'); }}>Gửi lại OTP</a>
                </p>
            </div>
        </div>
    );
};

export default VerifyEmailPage;
