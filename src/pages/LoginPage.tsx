import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'student' | 'teacher' | 'parent'>('student');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'student') navigate('/student');
    else if (role === 'teacher') navigate('/teacher');
    else if (role === 'parent') navigate('/parent');
  };

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
      <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-slate-100">
        <div className="p-8 md:p-10">
          <div className="flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="size-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">draw</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Vẽ Tư Duy STEAM</h1>
            </Link>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Đăng Nhập</h2>
            <p className="text-slate-500">Chọn vai trò của bạn để tiếp tục</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${role === 'student' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-primary/30'}`}
              >
                <span className="material-symbols-outlined text-3xl mb-2">child_care</span>
                <span className="text-sm font-bold">Học Sinh</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${role === 'teacher' ? 'border-secondary bg-secondary/5 text-secondary' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-secondary/30'}`}
              >
                <span className="material-symbols-outlined text-3xl mb-2">school</span>
                <span className="text-sm font-bold">Giáo Viên</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('parent')}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${role === 'parent' ? 'border-accent bg-accent/5 text-accent' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-accent/30'}`}
              >
                <span className="material-symbols-outlined text-3xl mb-2">family_restroom</span>
                <span className="text-sm font-bold">Phụ Huynh</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Tên đăng nhập</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">person</span>
                  <input
                    type="text"
                    className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-900 font-medium"
                    placeholder="Nhập tên đăng nhập"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Mật khẩu</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                  <input
                    type="password"
                    className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-900 font-medium"
                    placeholder="Nhập mật khẩu"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                <span className="text-slate-600 font-medium">Ghi nhớ</span>
              </label>
              <a href="#" className="text-primary font-bold hover:underline">Quên mật khẩu?</a>
            </div>

            <button
              type="submit"
              className={`w-full h-14 rounded-xl text-white font-bold text-lg shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 ${role === 'student' ? 'bg-primary shadow-primary/30' :
                  role === 'teacher' ? 'bg-secondary shadow-secondary/30' :
                    'bg-accent shadow-accent/30'
                }`}
            >
              <span>Vào Lớp Học</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            Chưa có tài khoản? <Link to="/register" className="text-primary font-bold hover:underline">Đăng ký ngay</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
