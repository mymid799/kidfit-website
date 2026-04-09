import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await authService.forgotPassword(email);
            if (data.success) {
                navigate(`/reset-password?email=${encodeURIComponent(email)}`);
            } else {
                setError(data.error || 'Đã có lỗi xảy ra!');
            }
        } catch (err) {
            setError('Lỗi kết nối server. Vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-sans bg-[#f6f7f6] min-h-screen relative overflow-x-hidden text-slate-900">
            {/* Decorative */}
            <div className="absolute top-10 right-10 text-primary/10 select-none pointer-events-none">
                <span className="material-symbols-outlined text-[120px]">lock_reset</span>
            </div>
            <div className="absolute bottom-20 left-10 text-primary/10 select-none pointer-events-none">
                <span className="material-symbols-outlined text-[100px]">mail</span>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Header */}
                <header className="flex items-center justify-between px-6 py-4 lg:px-20 border-b border-primary/10 bg-white/50 backdrop-blur-md">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/assets/logo/mainlogo.png" alt="Vẽ Tư Duy STEAM" className="h-12 w-auto object-contain" />
                    </Link>
                    <Link to="/login" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                        Quay lại đăng nhập
                    </Link>
                </header>

                {/* Main */}
                <main className="flex-1 flex flex-col items-center justify-center px-4 py-12" style={{ background: 'radial-gradient(circle at center, rgba(76, 174, 79, 0.15) 0%, rgba(246, 247, 246, 1) 100%)' }}>
                    <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl shadow-primary/5 overflow-hidden border border-primary/5">
                        <div className="p-8 md:p-10">
                            {/* Form State */}
                            <div className="text-center mb-8">
                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="material-symbols-outlined text-4xl text-primary">lock_reset</span>
                                        </div>
                                        <h2 className="text-3xl font-black text-slate-900 mb-2">Quên mật khẩu?</h2>
                                        <p className="text-slate-500 font-medium">
                                            Nhập email đã đăng ký, chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu.
                                        </p>
                                    </div>

                                    {error && (
                                        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-lg">error</span>
                                            {error}
                                        </div>
                                    )}

                                    <form className="space-y-5" onSubmit={handleSubmit}>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">Email đã đăng ký</label>
                                            <input
                                                id="forgot-email"
                                                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all bg-slate-50"
                                                placeholder="example@email.com"
                                                type="email"
                                                required
                                                autoComplete="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>

                                        <button
                                            id="forgot-submit"
                                            type="submit"
                                            disabled={loading}
                                            className={`w-full bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-primary/20 transform hover:-translate-y-1 active:translate-y-0 text-lg flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        >
                                            {loading ? (
                                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    <span className="material-symbols-outlined">send</span>
                                                    Gửi hướng dẫn
                                                </>
                                            )}
                                        </button>
                                    </form>

                                    <div className="mt-6 text-center">
                                        <Link to="/login" className="text-sm text-slate-500 font-bold hover:text-primary transition-colors">
                                            ← Quay lại đăng nhập
                                        </Link>
                                </div>
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
