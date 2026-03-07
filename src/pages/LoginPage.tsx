import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

type Role = 'student' | 'parent' | 'teacher' | 'school';

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('student');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'student') navigate('/student');
    else if (role === 'teacher') navigate('/teacher');
    else if (role === 'parent') navigate('/parent');
    else if (role === 'school') navigate('/dashboard'); // Mocking school dashboard
  };

  const getRoleContent = () => {
    switch (role) {
      case 'student':
        return {
          title: "Đăng nhập dành cho Học sinh",
          desc: "Khám phá thế giới sáng tạo cùng STEAM",
          btn: "Đăng nhập Học sinh"
        };
      case 'parent':
        return {
          title: "Đăng nhập dành cho Phụ huynh",
          desc: "Theo dõi tiến độ và thành tích của bé",
          btn: "Đăng nhập Phụ huynh"
        };
      case 'teacher':
        return {
          title: "Đăng nhập dành cho Giáo viên",
          desc: "Quản lý lớp học và cập nhật sổ tay",
          btn: "Đăng nhập Giáo viên"
        };
      case 'school':
        return {
          title: "Đăng nhập dành cho Nhà trường",
          desc: "Giám sát toàn bộ hệ thống Vẽ Tư Duy STEAM",
          btn: "Đăng nhập Nhà trường"
        };
    }
  };

  const content = getRoleContent();

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
          <Link to="/" className="flex items-center gap-3">
            <span aria-label="Kids Fit Logo" className="material-symbols-outlined text-primary text-5xl">draw</span>
            <h1 className="text-xl font-bold text-slate-900 hidden sm:block">Vẽ Tư Duy STEAM</h1>
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
            {/* Tab Interface */}
            <div className="flex border-b border-slate-100">
              <button
                onClick={() => setRole('student')}
                className={`flex-1 flex flex-col items-center py-4 transition-all duration-300 ${role === 'student' ? 'border-b-[3px] border-primary text-primary' : 'border-b-[3px] border-transparent text-slate-400'}`}
              >
                <span className="material-symbols-outlined mb-1">child_care</span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">Học sinh</span>
              </button>
              <button
                onClick={() => setRole('parent')}
                className={`flex-1 flex flex-col items-center py-4 transition-all duration-300 ${role === 'parent' ? 'border-b-[3px] border-primary text-primary' : 'border-b-[3px] border-transparent text-slate-400'}`}
              >
                <span className="material-symbols-outlined mb-1">family_restroom</span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">Phụ huynh</span>
              </button>
              <button
                onClick={() => setRole('teacher')}
                className={`flex-1 flex flex-col items-center py-4 transition-all duration-300 ${role === 'teacher' ? 'border-b-[3px] border-primary text-primary' : 'border-b-[3px] border-transparent text-slate-400'}`}
              >
                <span className="material-symbols-outlined mb-1">school</span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">Giáo viên</span>
              </button>
              <button
                onClick={() => setRole('school')}
                className={`flex-1 flex flex-col items-center py-4 transition-all duration-300 ${role === 'school' ? 'border-b-[3px] border-primary text-primary' : 'border-b-[3px] border-transparent text-slate-400'}`}
              >
                <span className="material-symbols-outlined mb-1">admin_panel_settings</span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">Nhà trường</span>
              </button>
            </div>

            {/* Form Section */}
            <div className="p-8 md:p-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-slate-900 mb-2">{content.title}</h2>
                <p className="text-slate-500 font-medium">{content.desc}</p>
              </div>

              <form className="space-y-5" onSubmit={handleLogin}>
                {role === 'school' && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Mã trường</label>
                    <input
                      className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all bg-slate-50"
                      placeholder="Nhập mã định danh trường"
                      type="text"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Tên đăng nhập</label>
                  <input
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all bg-slate-50"
                    placeholder="Nhập tên tài khoản của bạn"
                    type="text"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Mật khẩu</label>
                  <input
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all bg-slate-50"
                    placeholder="••••••••"
                    type="password"
                    required
                  />
                </div>

                {role === 'teacher' && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Mã giáo viên</label>
                    <input
                      className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all bg-slate-50"
                      placeholder="Nhập mã số cán bộ"
                      type="text"
                      required
                    />
                  </div>
                )}

                {role === 'parent' && (
                  <p className="text-[11px] text-slate-400 italic">
                    Gợi ý: Sử dụng email đã đăng ký liên kết với tài khoản học sinh.
                  </p>
                )}

                <div className="flex items-center justify-between py-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                    <span className="text-xs font-bold text-slate-500">Ghi nhớ tôi</span>
                  </label>
                  <a className="text-xs font-bold text-primary hover:underline" href="#">Quên mật khẩu?</a>
                </div>

                <button
                  className="w-full bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-primary/20 transform hover:-translate-y-1 active:translate-y-0 text-lg"
                  type="submit"
                >
                  {content.btn}
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
          © 2024 Vẽ Tư Duy STEAM. Kiến tạo tương lai bằng sáng tạo.
        </footer>
      </div>
    </div>
  );
}
