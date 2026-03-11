import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Chuyển hướng theo role của user trả về từ server (đảm bảo đúng quyền)
        const userRole = data.user.role;
        if (userRole === 'teacher') navigate('/teacher');
        else if (userRole === 'parent') navigate('/parent');
        else if (userRole === 'admin') navigate('/dashboard');
        else navigate('/parent');
      } else {
        setError(data.error || 'Đăng nhập thất bại!');
      }
    } catch (err) {
      setError('Lỗi kết nối server. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans bg-[#f6f7f6] min-h-screen relative overflow-x-hidden text-slate-900">
      {/* Floating Decorative Icons */}
      <div className="absolute top-10 left-10 text-primary/10 select-none pointer-events-none">
        <span className="material-symbols-outlined text-[120px]">rocket_launch</span>
      </div>
      <div className="absolute bottom-20 right-10 text-primary/10 select-none pointer-events-none">
        <span className="material-symbols-outlined text-[150px]">lightbulb</span>
      </div>
      <div className="absolute top-1/2 left-1/4 text-primary/10 select-none pointer-events-none">
        <span className="material-symbols-outlined text-[80px]">science</span>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 lg:px-20 border-b border-primary/10 bg-white/50 backdrop-blur-md">
          <Link to="/" className="flex items-center gap-2">
            <img src="/assets/logo/mainlogo.png" alt="Vẽ Tư Duy STEAM" className="h-12 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-4">
            <button className="bg-primary/10 p-2 rounded-full text-primary">
              <span className="material-symbols-outlined">help</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-12" style={{ background: 'radial-gradient(circle at center, rgba(76, 174, 79, 0.15) 0%, rgba(246, 247, 246, 1) 100%)' }}>
          <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl shadow-primary/5 overflow-hidden border border-primary/5">
            {/* Form Section */}
            <div className="p-8 md:p-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-slate-900 mb-2">Đăng nhập</h2>
                <p className="text-slate-500 font-medium">Chào mừng bạn quay lại với Vẽ Tư Duy STEAM</p>
                {error && (
                  <div className="mt-4 bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">error</span>
                    {error}
                  </div>
                )}
              </div>

              <form className="space-y-5" onSubmit={handleLogin}>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Tên đăng nhập hoặc Email</label>
                  <input
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all bg-slate-50"
                    placeholder="Nhập tên tài khoản hoặc email của bạn"
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Mật khẩu</label>
                  <input
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all bg-slate-50"
                    placeholder="••••••••"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between py-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                    <span className="text-xs font-bold text-slate-500">Ghi nhớ tôi</span>
                  </label>
                  <a className="text-xs font-bold text-primary hover:underline" href="#">Quên mật khẩu?</a>
                </div>

                <button
                  disabled={loading}
                  className={`w-full bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-primary/20 transform hover:-translate-y-1 active:translate-y-0 text-lg flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  type="submit"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : "Đăng nhập ngay"}
                </button>
              </form>

              <div className="mt-8 text-center border-t border-slate-100 pt-6">
                <p className="text-sm text-slate-500 font-medium">
                  Chưa có tài khoản? <Link to="/register" className="text-primary font-black hover:underline">Đăng ký ngay</Link>
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 text-center text-slate-400 text-xs font-bold">
          © 2026 Vẽ Tư Duy STEAM. Kiến tạo tương lai bằng sáng tạo.
        </footer>
      </div>
    </div>
  );
}
