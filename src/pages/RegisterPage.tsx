import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successData, setSuccessData] = useState<any>(null);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        parentName: '',
        phoneNumber: '',
        childName: '',
        childAge: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Client-side validation
        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu nhập lại không khớp!');
            setLoading(false);
            return;
        }

        // Phone validation (VN format)
        const phoneRegex = /^(\+84|0)(3[2-9]|5[6-9]|7[0|6-9]|8[0-9]|9[0-9])[0-9]{7}$/;
        if (!phoneRegex.test(formData.phoneNumber)) {
            setError('Số điện thoại không đúng định dạng Việt Nam!');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    parentName: formData.parentName,
                    childName: formData.childName,
                    childAge: parseInt(formData.childAge),
                    phone: formData.phoneNumber
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Phân tích chi tiết lỗi từ backend
                if (data.details) {
                    throw new Error(data.details[0].message);
                }
                throw new Error(data.error || 'Đăng ký thất bại');
            }

            // Đăng ký thành công
            setSuccessData(data.user);
            if (data.token) localStorage.setItem('token', data.token);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (successData) {
        return (
            <div className="min-h-screen bg-green-50 flex items-center justify-center p-4 font-display">
                <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-8 text-center border-t-8 border-primary animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-6xl text-primary">verified_user</span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 mb-2">Đăng ký thành công!</h2>
                    <p className="text-slate-500 mb-8 font-medium">Chào mừng {successData.parent_name} và bé đã gia nhập cộng đồng.</p>

                    <div className="bg-slate-50 rounded-2xl p-6 text-left mb-8 space-y-4 border border-slate-100">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Tài khoản</span>
                            <span className="font-black text-slate-700">{successData.username}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Email</span>
                            <span className="font-black text-slate-700">{successData.email}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Lưu trữ DB</span>
                            <span className="flex items-center gap-1 text-primary font-black">
                                <span className="material-symbols-outlined text-base">database</span>
                                PostgreSQL
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/login')}
                        className="w-full py-4.5 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:bg-green-600 hover:scale-[1.02] transition-all active:scale-95"
                    >
                        ĐI TỚI ĐĂNG NHẬP
                    </button>
                    <p className="mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                        Hãy kiểm tra email để xác nhận<br />kích hoạt tài khoản chính thức.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f0fdf4] font-display flex flex-col selection:bg-primary/20">
            {/* Header / Logo Section */}
            <header className="py-8 px-4 flex flex-col items-center shrink-0">
                <Link to="/" className="group">
                    <img src="/assets/logo/mainlogo.png" alt="KidsFit Logo" className="h-28 md:h-36 object-contain group-hover:scale-105 transition-transform duration-500" />
                </Link>
                <div className="text-center mt-4">
                    <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight">Đăng Ký Thành Viên</h1>
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <div className="h-1.5 w-12 bg-primary rounded-full"></div>
                        <p className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Vẽ Tư Duy STEAM</p>
                        <div className="h-1.5 w-12 bg-primary rounded-full"></div>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center p-4 md:p-8">
                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Hero Content (Left) */}
                    <section className="hidden lg:flex flex-col space-y-10 p-6">
                        <div className="space-y-6">
                            <h2 className="text-5xl font-black text-slate-800 leading-[1.1]">
                                Khai phá <span className="text-primary underline decoration-wavy decoration-2 underline-offset-8">Sáng tạo</span><br />
                                cho thiên tài nhí
                            </h2>
                            <p className="text-slate-600 text-xl leading-relaxed font-medium">
                                Hệ sinh thái giáo dục STEAM hiện đại, giúp trẻ 3-6 tuổi phát triển tư duy đa chiều qua hội họa và nghệ thuật số.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {[
                                { icon: 'drawing_flute', title: 'Học qua ngôn ngữ hình ảnh', desc: 'Giúp bé ghi nhớ thông tin 400% nhanh hơn.', color: 'text-primary', bg: 'bg-primary/5' },
                                { icon: 'auto_awesome', title: 'Tư duy phản biện từ sớm', desc: 'Khuyến khích bé đặt câu hỏi "Tại sao?".', color: 'text-secondary', bg: 'bg-secondary/5' },
                                { icon: 'diversity_1', title: 'Cộng đồng 10K+ phụ huynh', desc: 'Cùng chia sẻ hành trình lớn khôn của bé.', color: 'text-accent', bg: 'bg-accent/5' }
                            ].map((item, idx) => (
                                <div key={idx} className={`flex items-start gap-5 ${item.bg} p-6 rounded-[2rem] border border-white shadow-sm hover:shadow-md transition-shadow group cursor-default`}>
                                    <div className={`p-3 bg-white rounded-2xl shadow-sm ${item.color} group-hover:scale-110 transition-transform`}>
                                        <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-800 text-lg">{item.title}</h4>
                                        <p className="text-slate-500 text-sm font-medium mt-1">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Registration Form (Right) */}
                    <section className="bg-white/95 backdrop-blur-xl rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(76,174,79,0.15)] p-8 md:p-12 border border-white relative overflow-hidden">
                        {loading && (
                            <div className="absolute inset-0 bg-white/80 z-20 flex flex-col items-center justify-center space-y-4 backdrop-blur-sm animate-in fade-in">
                                <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                <p className="font-black text-primary uppercase tracking-widest text-xs">Đang khởi tạo tài khoản...</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-7">
                            {error && (
                                <div className="bg-red-50 text-red-600 p-5 rounded-2xl text-sm font-black border border-red-100 flex items-center gap-3 animate-in slide-in-from-top-4">
                                    <span className="material-symbols-outlined text-xl">warning</span>
                                    {error}
                                </div>
                            )}

                            {/* Section: Auth */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-slate-400 text-sm font-black">key</span>
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Thông tin đăng nhập</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative group">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">person</span>
                                        <input required id="username" value={formData.username} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-primary/20 focus:ring-0 transition-all font-bold text-slate-700 placeholder:text-slate-300 placeholder:font-medium" placeholder="Tên đăng nhập" />
                                    </div>
                                    <div className="relative group">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">alternate_email</span>
                                        <input required type="email" id="email" value={formData.email} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-primary/20 focus:ring-0 transition-all font-bold text-slate-700 placeholder:text-slate-300 placeholder:font-medium" placeholder="Email liên hệ" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative group">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">lock_open</span>
                                        <input required type={showPassword ? "text" : "password"} id="password" value={formData.password} onChange={handleChange} className="w-full pl-12 pr-14 py-4 bg-slate-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-primary/20 focus:ring-0 transition-all font-bold text-slate-700 placeholder:text-slate-300 placeholder:font-medium" placeholder="Mật khẩu" />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors">
                                            <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                        </button>
                                    </div>
                                    <div className="relative group">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-error transition-colors">verified</span>
                                        <input required type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-primary/20 focus:ring-0 transition-all font-bold text-slate-700 placeholder:text-slate-300 placeholder:font-medium" placeholder="Xác nhận mật khẩu" />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Profile */}
                            <div className="space-y-4 pt-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-slate-400 text-sm font-black">badge</span>
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Thông tin cá nhân & bé</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative group">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">face</span>
                                        <input required id="parentName" value={formData.parentName} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-primary/20 focus:ring-0 transition-all font-bold text-slate-700 placeholder:text-slate-300 placeholder:font-medium" placeholder="Họ tên phụ huynh" />
                                    </div>
                                    <div className="relative group">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">phone_iphone</span>
                                        <input required id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-primary/20 focus:ring-0 transition-all font-bold text-slate-700 placeholder:text-slate-300 placeholder:font-medium" placeholder="Số điện thoại" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative group">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">celebration</span>
                                        <input required id="childName" value={formData.childName} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-primary/20 focus:ring-0 transition-all font-bold text-slate-700 placeholder:text-slate-300 placeholder:font-medium" placeholder="Tên bé (VD: Bé Mầm)" />
                                    </div>
                                    <div className="relative group">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">school</span>
                                        <select required id="childAge" value={formData.childAge} onChange={handleChange} className="w-full pl-12 pr-10 py-4 bg-slate-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-primary/20 focus:ring-0 transition-all font-bold text-slate-700 appearance-none bg-white">
                                            <option value="">Lớp của bé</option>
                                            <option value="3">3 tuổi (Lớp Mầm)</option>
                                            <option value="4">4 tuổi (Lớp Chồi)</option>
                                            <option value="5">5 tuổi (Lớp Lá)</option>
                                            <option value="6">6 tuổi (Trang bị lớp 1)</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">expand_more</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button type="submit" className="group w-full py-5 bg-gradient-to-r from-primary to-green-600 text-white font-black text-xl rounded-[1.5rem] shadow-2xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1.5 transition-all duration-300 active:scale-95 flex items-center justify-center gap-4">
                                    BẮT ĐẦU NGAY
                                    <span className="material-symbols-outlined text-2xl group-hover:translate-x-2 transition-transform duration-300">rocket_launch</span>
                                </button>
                                <p className="text-center text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-widest">
                                    Bằng việc đăng ký, bạn đồng ý với <a href="#" className="text-primary hover:underline">điều khoản dịch vụ</a>
                                </p>
                            </div>

                            <div className="text-center pt-2">
                                <span className="text-slate-500 font-bold text-sm">Đã là thành viên?</span>
                                <Link to="/login" className="text-primary font-black text-sm hover:underline underline-offset-8 ml-2 decoration-2">
                                    Đăng nhập ngay
                                </Link>
                            </div>
                        </form>
                    </section>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="py-8 text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
                © 2024 KidsFit Education · Drawing mindset for kids
            </footer>
        </div>
    );
};

export default RegisterPage;
