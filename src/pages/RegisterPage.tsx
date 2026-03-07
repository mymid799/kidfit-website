import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        parentName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        termsAgreed: false
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setErrorMsg('Mật khẩu không khớp!');
            return;
        }
        if (!formData.termsAgreed) {
            setErrorMsg('Bạn cần đồng ý với các điều khoản dịch vụ!');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    parentName: formData.parentName,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Có lỗi xảy ra khi đăng ký!');
            }

            setSuccessMsg('Đăng ký tài khoản thành công! Tự động chuyển trang...');
            setTimeout(() => navigate('/login'), 2000);

        } catch (err: any) {
            setErrorMsg(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light text-slate-900 min-h-screen flex flex-col font-sans">
            {/* Top Navigation Bar */}
            <header className="w-full px-6 lg:px-40 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-primary/10">
                <Link to="/" className="flex items-center gap-3">
                    <div className="size-10 bg-primary flex items-center justify-center rounded-lg text-white">
                        <span className="material-symbols-outlined">draw</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-primary">Vẽ Tư Duy STEAM</h1>
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Trang chủ</Link>
                    <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Chương trình</a>
                    <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Về chúng tôi</a>
                    <Link to="/login" className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full text-sm font-bold transition-all">
                        Đăng nhập
                    </Link>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden"
                style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(76, 174, 79, 0.05) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}>

                {/* Decorative STEAM Elements */}
                <div className="absolute top-20 left-10 opacity-20 transform -rotate-12 hidden lg:block">
                    <span className="material-symbols-outlined text-primary text-9xl">architecture</span>
                </div>
                <div className="absolute bottom-20 right-10 opacity-20 transform rotate-12 hidden lg:block">
                    <span className="material-symbols-outlined text-blue-500 text-9xl">science</span>
                </div>
                <div className="absolute top-1/2 left-20 opacity-10 hidden lg:block">
                    <span className="material-symbols-outlined text-amber-500 text-7xl">lightbulb</span>
                </div>

                {/* Registration Card */}
                <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl shadow-primary/5 p-8 md:p-12 z-10 border border-primary/5">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Tham gia cùng chúng tôi</h2>
                        <p className="text-slate-500">Khám phá thế giới sáng tạo và khoa học qua từng nét vẽ cho bé</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {errorMsg && (
                            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center font-medium">
                                {errorMsg}
                            </div>
                        )}
                        {successMsg && (
                            <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm text-center font-bold">
                                {successMsg}
                            </div>
                        )}

                        {/* Parent Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Họ và tên phụ huynh</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">person</span>
                                <input
                                    type="text"
                                    name="parentName"
                                    value={formData.parentName}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/50 text-slate-900 transition-all focus:outline-none"
                                    placeholder="Nhập họ và tên của bạn"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Email</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">mail</span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/50 text-slate-900 transition-all focus:outline-none"
                                        placeholder="example@gmail.com"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Số điện thoại</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">call</span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/50 text-slate-900 transition-all focus:outline-none"
                                        placeholder="090x xxx xxx"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Mật khẩu</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/50 text-slate-900 transition-all focus:outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Xác nhận mật khẩu</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock_reset</span>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/50 text-slate-900 transition-all focus:outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-start gap-3 py-2">
                            <input
                                type="checkbox"
                                id="terms"
                                name="termsAgreed"
                                checked={formData.termsAgreed}
                                onChange={handleChange}
                                className="mt-1 rounded border-slate-300 text-primary focus:ring-primary"
                            />
                            <label className="text-sm text-slate-500" htmlFor="terms">
                                Tôi đồng ý với các <a className="text-primary hover:underline" href="#">Điều khoản dịch vụ</a> và <a className="text-primary hover:underline" href="#">Chính sách bảo mật</a>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all transform hover:scale-[1.01] active:scale-95 text-lg disabled:opacity-70 disabled:hover:scale-100"
                        >
                            {loading ? 'Đang xử lý...' : 'Đăng Ký Ngay'}
                        </button>

                        <div className="text-center mt-8">
                            <p className="text-slate-600">
                                Đã có tài khoản?
                                <Link to="/login" className="text-blue-500 font-bold hover:underline ml-1">Đăng nhập ngay</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </main>

            {/* Illustrative Footer Graphics */}
            <div className="w-full h-32 relative overflow-hidden flex items-end justify-center pointer-events-none opacity-40">
                <div className="flex gap-12">
                    <div className="flex flex-col items-center">
                        <span className="material-symbols-outlined text-primary text-5xl">edit</span>
                        <div className="h-2 w-12 bg-primary/20 rounded-full mt-2"></div>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="material-symbols-outlined text-blue-400 text-5xl">square_foot</span>
                        <div className="h-2 w-12 bg-blue-200 rounded-full mt-2"></div>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="material-symbols-outlined text-amber-400 text-5xl">brush</span>
                        <div className="h-2 w-12 bg-amber-200 rounded-full mt-2"></div>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="material-symbols-outlined text-primary text-5xl">school</span>
                        <div className="h-2 w-12 bg-primary/20 rounded-full mt-2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
