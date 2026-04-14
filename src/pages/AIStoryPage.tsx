import { Link } from 'react-router-dom';
import AIStoryboardTab from '@/components/AIStoryboardTab';

export default function AIStoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf4] via-[#f8faff] to-white font-display antialiased">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-3">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/assets/logo/mainlogo.png"
              alt="Trạng Nguyên Kids"
              className="h-9 w-auto object-contain"
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-slate-900 text-sm font-black tracking-tight">Trạng Nguyên Kids 4.0</span>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">AI Magic Story</span>
            </div>
          </Link>

          {/* Badge — no login needed */}
          <div className="hidden md:flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
            Trải nghiệm miễn phí — Không cần đăng nhập
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/ai"
              className="hidden sm:flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Quay lại
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 px-5 py-2 bg-[#186A3B] text-white rounded-full text-sm font-bold hover:bg-[#145a32] transition-all shadow-md shadow-[#186A3B]/20 hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined text-base">login</span>
              Đăng nhập đầy đủ
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO BANNER ── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#186A3B] via-emerald-600 to-teal-500 text-white py-10 px-6 md:px-12">
        {/* Background noise + decoration */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-emerald-900/20 blur-2xl" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4">
              <span className="material-symbols-outlined text-sm">auto_fix_high</span>
              AI Magic Story Machine
            </div>
            <h1 className="text-3xl md:text-4xl font-black leading-tight mb-2">
              Cỗ Máy Kể Chuyện <span className="text-yellow-300">AI</span>
            </h1>
            <p className="text-white/80 text-sm max-w-lg leading-relaxed">
              Upload nét vẽ của bé — AI sẽ tạo ra <strong className="text-white">5 cảnh phim hoạt hình</strong> với nhạc nền,
              lời kể và hình ảnh 3D Pixar. <strong className="text-yellow-200">Hoàn toàn miễn phí</strong>, không cần tài khoản.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 md:flex-col md:items-end">
            {[
              { icon: 'image', label: 'Upload ảnh vẽ tay' },
              { icon: 'auto_awesome', label: 'AI sinh 5 cảnh phim' },
              { icon: 'record_voice_over', label: 'Lời kể tự động' },
              { icon: 'music_note', label: 'Nhạc nền phù hợp' },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 text-xs font-bold">
                <span className="material-symbols-outlined text-sm">{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Guest notice */}
        <div className="mb-8 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-800">
          <span className="material-symbols-outlined text-amber-500 mt-0.5">info</span>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold">Bạn đang dùng bản Demo</span>
            <span className="text-xs leading-relaxed">
              Tính năng đầy đủ — lưu lịch sử, chia sẻ với phụ huynh, quản lý lớp học — chỉ dành cho tài khoản giáo viên.{' '}
              <Link to="/login" className="font-bold underline hover:text-amber-900">Đăng nhập ngay →</Link>
            </span>
          </div>
        </div>

        {/* The actual storyboard component — reused 1:1 from teacher dashboard */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-10">
          <AIStoryboardTab />
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-br from-[#186A3B] to-emerald-500 rounded-3xl p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          />
          <div className="relative z-10">
            <span className="material-symbols-outlined text-4xl mb-3 block text-yellow-300">school</span>
            <h2 className="text-2xl font-black mb-2">Bạn là giáo viên?</h2>
            <p className="text-white/80 text-sm max-w-md mx-auto mb-6">
              Mở khóa toàn bộ hệ sinh thái: Quản lý lớp học, giáo án AI, cổng phụ huynh và nhiều hơn nữa.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 px-7 py-3 bg-white text-[#186A3B] rounded-full font-bold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <span className="material-symbols-outlined text-base">login</span>
                Đăng nhập giáo viên
              </Link>
              <Link
                to="/register"
                className="flex items-center justify-center gap-2 px-7 py-3 bg-white/20 border border-white/40 text-white rounded-full font-bold text-sm hover:bg-white/30 transition-all"
              >
                Đăng ký miễn phí
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-100 py-6 text-center text-slate-400 text-xs font-medium">
        © 2026 Trạng Nguyên Kids 4.0 — AI Magic Story Machine · Phi lợi nhuận · Dành cho giáo dục
      </footer>
    </div>
  );
}
