import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function LandingPage() {
  const [activeNav, setActiveNav] = useState('gioi-thieu');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.message) return;
    setFormStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  // Scroll animations
  const heroAnim = useScrollAnimation({ threshold: 0.1 });
  const metricsAnim = useScrollAnimation({ threshold: 0.1 });
  const featuresAnim = useScrollAnimation({ threshold: 0.1 });
  const visionAnim = useScrollAnimation({ threshold: 0.1 });
  const solutionAnim = useScrollAnimation({ threshold: 0.1 });
  const pricingAnim = useScrollAnimation({ threshold: 0.1 });
  const teamAnim = useScrollAnimation({ threshold: 0.1 });
  const pilotAnim = useScrollAnimation({ threshold: 0.1 });
  const contactAnim = useScrollAnimation({ threshold: 0.1 });

  const navItems = [
    { id: 'gioi-thieu', label: 'Giới thiệu' },
    { id: 'giai-phap', label: 'Giải pháp' },
    { id: 'bang-gia', label: 'Bảng giá' },
    { id: 'doi-ngu', label: 'Đội ngũ' },
    { id: 'du-an', label: 'Dự án' },
  ];

  return (
    <div className="flex h-full grow flex-col bg-[#f8faff] text-slate-900 antialiased font-display overflow-x-hidden">
      {/* ══════════════════════════════════════════════ */}
      {/* NAVIGATION — OrcaX style                      */}
      {/* ══════════════════════════════════════════════ */}
      <header className="flex items-center justify-between px-6 md:px-16 py-4 bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <img src="/assets/logo/mainlogo.png" alt="Logo" className="h-10 w-auto object-contain" />
          <span className="text-slate-900 text-lg font-bold tracking-tight hidden sm:block">Trạng Nguyên Kids 4.0</span>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActiveNav(item.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeNav === item.id
                ? 'bg-[#186A3B]/10 text-[#186A3B] border border-[#186A3B]/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
              {item.label}
            </a>
          ))}
          <Link to="/ai" className="px-4 py-2 rounded-full text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all">
            Trải Nghiệm AI
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a href="#lien-he" onClick={() => setActiveNav('')} className="flex items-center gap-2 px-5 py-2.5 bg-[#186A3B] text-white rounded-full text-sm font-bold hover:bg-[#145a32] transition-all shadow-lg shadow-[#186A3B]/20">
            HỢP TÁC NGAY
            <span className="material-symbols-outlined text-base">arrow_downward</span>
          </a>
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setIsMenuOpen(v => !v)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Mở menu"
          >
            <span className="material-symbols-outlined text-slate-700">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </header>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-[65px] inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-xl px-6 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => { setActiveNav(item.id); setIsMenuOpen(false); }}
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeNav === item.id
                ? 'bg-[#186A3B]/10 text-[#186A3B]'
                : 'text-slate-700 hover:bg-slate-50'
                }`}
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/ai"
            onClick={() => setIsMenuOpen(false)}
            className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
          >
            Trải Nghiệm AI
          </Link>
          <a
            href="#lien-he"
            onClick={() => { setActiveNav(''); setIsMenuOpen(false); }}
            className="mt-2 flex items-center justify-center gap-2 px-5 py-3 bg-[#186A3B] text-white rounded-xl text-sm font-bold"
          >
            HỢP TÁC NGAY
            <span className="material-symbols-outlined text-base">arrow_downward</span>
          </a>
        </div>
      )}

      <main className="flex flex-col">
        {/* ══════════════════════════════════════════════ */}
        {/* SECTION 1: HERO — Giới thiệu                 */}
        {/* ══════════════════════════════════════════════ */}
        <section ref={heroAnim.ref} id="gioi-thieu" className="relative px-6 md:px-16 pt-16 pb-8 overflow-hidden">
          {/* Grid background pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(#186A3B 1px, transparent 1px), linear-gradient(90deg, #186A3B 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />

          {/* Floating 'STEAM' Decorative Elements - 3D Rendered Style (CSS/SVG) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Green Sphere */}
            <div className="absolute top-[8%] left-[55%] w-24 h-24 rounded-full bg-[radial-gradient(circle_at_30%_30%,_#a7f3d0,_#059669)] shadow-[0_15px_30px_rgba(5,150,105,0.3)] floating-shape-1" style={{ animationDelay: '0s' }} />

            {/* Blue Sphere */}
            <div className="absolute top-[28%] left-[25%] w-16 h-16 rounded-full bg-[radial-gradient(circle_at_30%_30%,_#93c5fd,_#1e3a8a)] shadow-[0_8px_20px_rgba(30,58,138,0.3)] floating-shape-2" style={{ animationDelay: '0.8s' }} />

            {/* 3D Brown Hexagon Ring */}
            <div className="absolute top-[12%] left-[68%] w-12 h-12 floating-shape-1" style={{ animationDelay: '0.4s' }}>
              <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: 'drop-shadow(4px 10px 12px rgba(0,0,0,0.2))' }}>
                <path d="M50 5 L93 25 L93 75 L50 95 L7 75 L7 25 Z" fill="none" stroke="url(#brown-grad)" strokeWidth="16" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="brown-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#78350f" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* 3D Gold Star */}
            <div className="absolute top-[52%] left-[22%] w-20 h-20 floating-shape-2" style={{ animationDelay: '1.2s' }}>
              <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: 'drop-shadow(5px 12px 18px rgba(180,83,9,0.3))' }}>
                <polygon points="50,5 61,35 95,35 68,55 78,85 50,65 22,85 32,55 5,35 39,35" fill="url(#gold-grad)" />
                <defs>
                  <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* 3D Red/Brown Star */}
            <div className="absolute top-[15%] right-[20%] w-10 h-10 floating-shape-1" style={{ animationDelay: '1.6s' }}>
              <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: 'drop-shadow(3px 8px 10px rgba(127,29,29,0.3))' }}>
                <polygon points="50,5 61,35 95,35 68,55 78,85 50,65 22,85 32,55 5,35 39,35" fill="url(#red-grad)" />
                <defs>
                  <linearGradient id="red-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#7f1d1d" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Purple Star */}
            <div className="absolute bottom-[8%] left-[55%] w-8 h-8 floating-shape-2 rotate-[15deg]" style={{ animationDelay: '0.5s' }}>
              <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: 'drop-shadow(2px 6px 8px rgba(88,28,135,0.3))' }}>
                <polygon points="50,5 61,35 95,35 68,55 78,85 50,65 22,85 32,55 5,35 39,35" fill="url(#purple-grad)" />
                <defs>
                  <linearGradient id="purple-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#4c1d95" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Red Pencil */}
            <div className="absolute top-[5%] left-[20%] w-4 h-28 floating-shape-1 rotate-[15deg] z-20" style={{ animationDelay: '2s' }}>
              <div className="w-full h-full bg-gradient-to-r from-red-400 via-red-600 to-red-800 rounded-sm shadow-[6px_12px_20px_rgba(0,0,0,0.2)] relative">
                {/* Pencil Tip */}
                <div className="absolute -bottom-[14px] left-0 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[16px] border-t-[#fcd34d]" />
                <div className="absolute -bottom-[14px] left-[2.5px] w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[10px] border-t-red-900" />
              </div>
            </div>

            {/* Green Pencil */}
            <div className="absolute bottom-[2%] left-[45%] w-[18px] h-36 floating-shape-2 rotate-[-15deg] z-20" style={{ animationDelay: '0.6s' }}>
              <div className="w-full h-full bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-800 rounded-sm shadow-[6px_12px_20px_rgba(0,0,0,0.25)] relative">
                <div className="absolute -top-[18px] left-0 w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-[20px] border-b-[#fcd34d]" />
                <div className="absolute -top-[18px] left-[3px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[12px] border-b-emerald-900" />
              </div>
            </div>

            {/* Rainbow 3D Arcs */}
            <div className="absolute top-[28%] left-[48%] w-32 h-16 overflow-hidden floating-shape-1 rotate-[5deg] z-0" style={{ animationDelay: '1.8s', filter: 'drop-shadow(5px 15px 20px rgba(0,0,0,0.15))' }}>
              <div className="w-32 h-32 rounded-full border-[10px] border-[#8b5cf6] relative scale-y-[0.8] origin-bottom mt-[-10px]">
                <div className="absolute inset-[-2px] rounded-full border-[10px] border-[#3b82f6] m-[2px]" />
                <div className="absolute inset-[-2px] rounded-full border-[10px] border-[#10b981] m-[14px]" />
                <div className="absolute inset-[-2px] rounded-full border-[10px] border-[#f59e0b] m-[26px]" />
                <div className="absolute inset-[-2px] rounded-full border-[10px] border-[#ef4444] m-[38px]" />
              </div>
            </div>

            {/* Accents (small bubbles) */}
            <div className="absolute top-[10%] right-[10%] w-6 h-6 rounded-full bg-gradient-to-br from-white to-emerald-100 shadow-md floating-shape-2 opacity-60" style={{ animationDelay: '1.4s' }} />
            <div className="absolute bottom-[30%] right-[5%] w-8 h-8 rounded-full bg-gradient-to-br from-white to-amber-100 shadow-lg floating-shape-1 opacity-50 rotate-45" style={{ animationDelay: '0.2s' }} />
          </div>

          <div className="max-w-[1280px] mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">
              {/* Left: Content */}
              <div className={`flex flex-col gap-6 relative z-10 ${heroAnim.isVisible ? 'anim-fadeInUp3D' : 'anim-hidden'}`}>
                {/* Glowing White Halo behind text to improve readability against 3D shapes */}
                <div className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 w-[120%] h-[160%] bg-white/90 blur-[60px] rounded-full pointer-events-none -z-10" />

                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#186A3B]/20 bg-white/70 backdrop-blur-md text-[#186A3B] text-xs font-bold uppercase tracking-widest w-fit shadow-sm">
                  <span className="material-symbols-outlined text-sm">info</span> GIỚI THIỆU — TRẠNG NGUYÊN KIDS 4.0 LÀ AI?
                </span>

                <h1 className="text-4xl md:text-[4.5rem] font-black leading-[1.1] tracking-tight text-slate-900 drop-shadow-[0_0_20px_rgba(255,255,255,1)]">
                  HỆ SINH THÁI{' '}
                  <span className="relative inline-block">
                    <span className="text-[#186A3B]">GIÁO DỤC SỐ</span>
                  </span>
                  <br />
                  THÔNG MINH VÀ HIỆN ĐẠI
                </h1>

                {/* Quote box */}
                <div className="relative bg-white border border-slate-200 rounded-2xl p-5 max-w-md shadow-sm">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#186A3B] rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-sm">format_quote</span>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed italic font-medium pl-4">
                    Chúng tôi không chỉ xây dựng ứng dụng — <strong>chúng tôi tái thiết kế hệ sinh thái giáo dục sớm</strong> từ góc nhìn của giáo viên, phụ huynh và trẻ em.
                  </p>
                </div>

                <p className="text-slate-600 text-base leading-relaxed max-w-lg">
                  <strong>Trạng Nguyên Kids 4.0</strong> là startup <span className="text-[#186A3B] font-bold">EdTech</span> tiên phong ứng dụng <strong>AI (Gemini, DALL-E)</strong> vào hệ sinh thái trường mầm non thông minh. Chúng tôi không chỉ viết phần mềm — chúng tôi <strong className="text-[#186A3B]">tái thiết kế hệ sinh thái giáo dục sớm</strong> từ góc nhìn của giáo viên, phụ huynh và trẻ em.
                </p>
                <p className="text-slate-500 text-sm">
                  Xuất phát từ dự án EXE101 tại <strong>ĐH FPT Cần Thơ</strong>, Trạng Nguyên Kids mang <strong className="text-[#186A3B]">chuyển đổi số giáo dục toàn diện</strong> đến hàng loạt trường tại ĐBSCL.
                </p>

                {/* Hero CTA buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    to="/register"
                    className="flex items-center gap-2 px-6 py-3 bg-[#186A3B] text-white rounded-full text-sm font-bold hover:bg-[#145a32] transition-all shadow-lg shadow-[#186A3B]/25 hover:-translate-y-0.5"
                  >
                    <span className="material-symbols-outlined text-base">school</span>
                    Dùng thử miễn phí
                  </Link>
                  <a
                    href="#giai-phap"
                    onClick={() => setActiveNav('giai-phap')}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-full text-sm font-bold border border-slate-200 hover:border-[#186A3B]/40 hover:text-[#186A3B] transition-all hover:-translate-y-0.5 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-base">play_circle</span>
                    Xem giải pháp
                  </a>
                </div>
              </div>

              {/* Right: Visual — Glowing orb with floating widgets replaced by Video Intro */}
              <div className={`relative flex items-center justify-center w-full max-w-[550px] ml-auto lg:mt-0 mt-8 ${heroAnim.isVisible ? 'anim-fadeInRight3D anim-delay-2' : 'anim-hidden'}`}>
                {/* Decorative glowing background behind video */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#186A3B]/30 to-emerald-400/20 rounded-[2.5rem] blur-2xl transform rotate-3 scale-105" />

                {/* Video Container */}
                <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.2)] border-4 border-white/80 z-10 bg-slate-100 group">
                  <div className="absolute top-4 left-4 z-20 bg-black/40 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  </div>
                  <video
                    src="/assets/video/intro.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Play icon overlay just for decoration since it's autoplay muted */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 z-20 pointer-events-none">
                    <span className="material-symbols-outlined text-white text-6xl drop-shadow-lg">play_circle</span>
                  </div>
                </div>

                {/* Floating widget: AI Model */}
                <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl border border-slate-100 flex items-center gap-3 floating-shape-1 z-30">
                  <div className="w-8 h-8 rounded-full bg-[#186A3B]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#186A3B] text-sm">timer</span>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Mô hình AI</div>
                    <div className="text-lg font-black text-slate-900 leading-none mt-0.5">30<span className="text-xs text-slate-400 ml-0.5">ms</span></div>
                  </div>
                </div>

                {/* Floating widget: Data Synced */}
                <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl border border-slate-100 flex items-center gap-3 floating-shape-2 z-30">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-emerald-500 text-sm">sync</span>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Đồng bộ dữ liệu</div>
                    <div className="text-sm font-bold text-emerald-600 leading-none mt-0.5">Thời gian thực</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════ */}
        {/* SECTION 2: METRICS BAR — 4 Stats             */}
        {/* ══════════════════════════════════════════════ */}
        <section ref={metricsAnim.ref} className="px-6 md:px-16 py-8">
          <div className={`max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 ${metricsAnim.isVisible ? 'anim-fadeInUp3D' : 'anim-hidden'}`}>
            {[
              { stat: '03', unit: 'HỆ SINH THÁI', desc: 'Nhà trường · Giáo viên · Phụ huynh', highlight: true },
              { stat: '03', unit: 'LÕI CÔNG NGHỆ', desc: 'AI · STEAM · 3D Modeling', highlight: false },
              { stat: '01', unit: 'STARTUP', desc: 'EdTech 4.0 đầu tiên tại Đồng bằng sông Cửu Long', highlight: false },
              { stat: '∞', unit: 'TIỀM NĂNG', desc: 'Hệ sinh thái mở rộng sang toàn ASEAN', highlight: false },
            ].map((item, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 transition-all duration-300 ${item.highlight
                  ? 'bg-[#186A3B] text-white shadow-xl shadow-[#186A3B]/15'
                  : 'bg-white border border-slate-100 hover:shadow-md'
                  }`}
              >
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className={`text-4xl font-black ${item.highlight ? 'text-white' : 'text-[#186A3B]'}`}>{item.stat}</span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${item.highlight ? 'text-white/70' : 'text-slate-400'}`}>{item.unit}</span>
                </div>
                <p className={`text-xs leading-relaxed ${item.highlight ? 'text-white/80' : 'text-slate-500'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════ */}
        {/* SECTION 3: CORE FEATURES — 4 Cards            */}
        {/* ══════════════════════════════════════════════ */}
        <section ref={featuresAnim.ref} className="px-6 md:px-16 py-12">
          <div className={`max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 ${featuresAnim.isVisible ? 'anim-fadeInUp3D' : 'anim-hidden'}`}>
            {[
              {
                icon: 'dashboard', tag: 'QUẢN TRỊ', tagColor: 'bg-blue-50 text-blue-600',
                title: 'Quản Trị Hệ Thống Thông Minh',
                desc: 'Nền tảng hợp nhất dữ liệu nhân sự, tài chính, lớp học và cơ sở vật chất trên một Dashboard duy nhất — thay thế hoàn toàn Excel.',
              },
              {
                icon: 'smart_toy', tag: 'SMART AI', tagColor: 'bg-emerald-50 text-emerald-600',
                title: 'AI Trợ Lý Giáo Án',
                desc: 'Mô hình AI Gemini được huấn luyện chuyên biệt để soạn giáo án STEAM từ một từ khóa. Tự động sinh mục tiêu, hoạt động và câu hỏi tương tác.',
              },
              {
                icon: 'child_care', tag: 'STUDENT UX', tagColor: 'bg-purple-50 text-purple-600',
                title: 'Trải Nghiệm Vẽ Tích Hợp AI',
                desc: 'Trẻ tương tác trực quan với nét vẽ 3D, phim hoạt hình AI và mô hình AR — biến mỗi nét vẽ nguệch ngoạc thành tác phẩm kỳ diệu.',
              },
              {
                icon: 'speed', tag: 'SMART OPS', tagColor: 'bg-orange-50 text-orange-600',
                title: 'Vận Hành Trường Học Thông Minh',
                desc: 'Dashboard thời gian thực tích hợp RBAC, quản lý 4 vai trò (Admin, Teacher, Parent, Student) và báo cáo hiệu suất toàn diện.',
              },
            ].map((feature, i) => (
              <div key={i} className={`bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group ${featuresAnim.isVisible ? `anim-fadeInUp3D anim-delay-${i + 1}` : 'anim-hidden'}`}>
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#186A3B]/5 transition-colors">
                    <span className="material-symbols-outlined text-[#186A3B] text-2xl">{feature.icon}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${feature.tagColor}`}>{feature.tag}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════ */}
        {/* SECTION 4: VISION — Tầm Nhìn & Giá Trị       */}
        {/* ══════════════════════════════════════════════ */}
        <section ref={visionAnim.ref} id="giai-phap" className="relative px-6 md:px-16 py-20 overflow-hidden">
          {/* Subtle gradient bg */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f0fdf4] via-[#f8faff] to-[#eff6ff] opacity-60" />

          <div className="max-w-[1280px] mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: Content */}
              <div className={`flex flex-col gap-6 ${visionAnim.isVisible ? 'anim-fadeInUp3D' : 'anim-hidden'}`}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#186A3B]/20 bg-white text-[#186A3B] text-xs font-bold uppercase tracking-widest w-fit shadow-sm">
                  <span className="material-symbols-outlined text-sm">star</span> HỆ SINH THÁI TRẠNG NGUYÊN KIDS 4.0
                </span>

                <h2 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight text-slate-900">
                  HỢP NHẤT<br />
                  <span className="text-[#186A3B]">QUẢN TRỊ &amp;<br />GIÁO DỤC</span>
                </h2>

                <p className="text-slate-600 text-base leading-relaxed max-w-lg">
                  Trạng Nguyên Kids tiên phong kiến tạo mô hình EdTech SaaS toàn diện cho <strong>hệ thống giáo dục các cấp</strong>. Chúng tôi giải phóng giáo viên khỏi gánh nặng sổ sách bằng <span className="text-[#186A3B] font-bold">AI Copilot</span> để tập trung vào chất lượng giảng dạy.
                </p>

                {/* KPI row */}
                <div className={`flex flex-wrap gap-6 mt-4 pt-6 border-t border-slate-200 ${visionAnim.isVisible ? 'anim-fadeInUp3D anim-delay-2' : 'anim-hidden'}`}>
                  {[
                    { stat: '65%', label: 'GIẢM TẢI GIẤY TỜ', color: 'text-[#186A3B]' },
                    { stat: '99%', label: 'PHỤ HUYNH AN TÂM', color: 'text-blue-600' },
                    { stat: '100%', label: 'HỌC SINH TƯƠNG TÁC', color: 'text-purple-600' },
                  ].map((kpi, i) => (
                    <div key={i}>
                      <div className={`text-3xl font-black ${kpi.color}`}>{kpi.stat}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{kpi.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: 4 Core Value Cards (2x2 grid, floating style) */}
              <div className={`grid grid-cols-2 gap-4 ${visionAnim.isVisible ? 'anim-fadeInRight3D anim-delay-1' : 'anim-hidden'}`}>
                {[
                  { tag: 'CORE VALUE', title: 'MINH BẠCH', desc: 'Hệ thống RBAC phân quyền chặt chẽ.', icon: 'verified', iconColor: 'text-[#186A3B]', iconBg: 'bg-[#186A3B]/10' },
                  { tag: 'PURPOSE', title: 'GIẢI PHÓNG', desc: 'Trợ lý AI tự động sinh giáo án.', icon: 'target', iconColor: 'text-rose-500', iconBg: 'bg-rose-50' },
                  { tag: 'VISION', title: 'KHAI PHÓNG', desc: 'Đánh giá năng lực sinh viên bằng AI đa chiều.', icon: 'visibility', iconColor: 'text-amber-500', iconBg: 'bg-amber-50' },
                  { tag: 'ACTION', title: 'ALL-IN-ONE', desc: 'Nền tảng SaaS quản trị toàn diện các cấp học.', icon: 'bolt', iconColor: 'text-orange-500', iconBg: 'bg-orange-50' },
                ].map((card, i) => (
                  <div key={i} className={`bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${i === 1 || i === 3 ? 'mt-8' : ''}`}>
                    <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center mb-4`}>
                      <span className={`material-symbols-outlined ${card.iconColor} text-xl`}>{card.icon}</span>
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{card.tag}</div>
                    <h4 className="text-lg font-black text-slate-900 mb-1.5">{card.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════ */}
        {/* SECTION 5: SOLUTIONS — Giải Pháp Đột Phá     */}
        {/* ══════════════════════════════════════════════ */}
        <section ref={solutionAnim.ref} className="px-6 md:px-16 py-20">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: 3 Solution items */}
              <div className={`flex flex-col gap-4 ${solutionAnim.isVisible ? 'anim-fadeInUp3D' : 'anim-hidden'}`}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#186A3B]/20 bg-white text-[#186A3B] text-xs font-bold uppercase tracking-widest w-fit shadow-sm">
                  <span className="material-symbols-outlined text-sm">star</span> HỆ SINH THÁI TRẠNG NGUYÊN KIDS
                </span>

                <h2 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight text-slate-900 mb-4">
                  GIẢI PHÁP<br />
                  <span className="text-[#186A3B]">ĐỘT PHÁ</span>
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed max-w-lg mb-4">
                  Ứng dụng công nghệ <span className="text-[#186A3B] font-bold">AI Generative</span> tiên phong để tái tạo toàn diện quy trình vận hành và đánh thức trải nghiệm giáo dục tương lai.
                </p>

                {[
                  {
                    icon: 'dashboard', iconColor: 'text-[#186A3B]', iconBg: 'border-[#186A3B]/20',
                    title: 'QUẢN TRỊ NHÀ TRƯỜNG TOÀN DIỆN',
                    desc: 'Dashboard tập trung hóa dữ liệu nhân sự, tài chính, lớp học, cơ sở vật chất và phân quyền RBAC 4 cấp trên một nền tảng duy nhất.',
                  },
                  {
                    icon: 'smart_toy', iconColor: 'text-purple-500', iconBg: 'border-purple-200',
                    title: 'AI GIÁO ÁN & MAGIC STORY',
                    desc: 'Tích hợp lõi trí tuệ nhân tạo (Gemini, DALL-E) giúp soạn giáo án STEAM trong 30 giây và biến nét vẽ trẻ thành phim 3D Pixar.',
                  },
                  {
                    icon: 'family_restroom', iconColor: 'text-amber-500', iconBg: 'border-amber-200',
                    title: 'CỔNG LIÊN KẾT PHỤ HUYNH',
                    desc: 'Phụ huynh theo dõi "Hồ sơ Năng lực Ẩn" — đánh giá năng lực trẻ qua dữ liệu tương tác thực tế, không phải "Bé ngoan / chưa ngoan".',
                  },
                ].map((solution, i) => (
                  <div key={i} className={`flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ${solutionAnim.isVisible ? `anim-fadeInUp3D anim-delay-${i + 1}` : 'anim-hidden'}`}>
                    <div className={`w-11 h-11 rounded-xl bg-white border-2 ${solution.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <span className={`material-symbols-outlined ${solution.iconColor} text-xl`}>{solution.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 tracking-wide mb-1">{solution.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{solution.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Network visual */}
              <div className={`relative flex items-center justify-center ${solutionAnim.isVisible ? 'anim-fadeInRight3D anim-delay-2' : 'anim-hidden'}`}>
                <div className="relative w-full max-w-md aspect-square">
                  {/* Central node */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-[#186A3B] to-emerald-500 shadow-2xl shadow-[#186A3B]/30 flex items-center justify-center z-10">
                    <span className="material-symbols-outlined text-white text-3xl">hub</span>
                  </div>

                  {/* Orbiting nodes */}
                  {[
                    { top: '10%', left: '15%', icon: 'school', label: 'Admin', color: 'bg-blue-500' },
                    { top: '10%', right: '15%', icon: 'person', label: 'Teacher', color: 'bg-emerald-500' },
                    { bottom: '15%', left: '10%', icon: 'family_restroom', label: 'Parent', color: 'bg-amber-500' },
                    { bottom: '15%', right: '10%', icon: 'child_care', label: 'Student', color: 'bg-purple-500' },
                  ].map((node, i) => (
                    <div key={i} className="absolute flex flex-col items-center gap-2" style={{ top: node.top, left: node.left, right: node.right, bottom: node.bottom }}>
                      <div className={`w-14 h-14 rounded-2xl ${node.color} shadow-lg flex items-center justify-center floating-shape-${(i % 2) + 1}`} style={{ animationDelay: `${i * 0.5}s` }}>
                        <span className="material-symbols-outlined text-white text-2xl">{node.icon}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{node.label}</span>
                    </div>
                  ))}

                  {/* Connection lines (SVG) */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                    <line x1="80" y1="70" x2="200" y2="200" stroke="#186A3B" strokeWidth="1" strokeDasharray="5,5" opacity="0.3" />
                    <line x1="320" y1="70" x2="200" y2="200" stroke="#186A3B" strokeWidth="1" strokeDasharray="5,5" opacity="0.3" />
                    <line x1="60" y1="320" x2="200" y2="200" stroke="#186A3B" strokeWidth="1" strokeDasharray="5,5" opacity="0.3" />
                    <line x1="340" y1="320" x2="200" y2="200" stroke="#186A3B" strokeWidth="1" strokeDasharray="5,5" opacity="0.3" />
                  </svg>

                  {/* Floating tags */}
                  <div className="absolute top-1/2 -right-2 bg-white rounded-full px-3 py-1.5 shadow-md border border-slate-100 flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Thời gian thực</span>
                  </div>
                  <div className="absolute bottom-1/3 -left-4 bg-white rounded-full px-3 py-1.5 shadow-md border border-slate-100 flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Hỗ trợ bởi AI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════ */}
        {/* SECTION PRICING — Bảng giá                   */}
        {/* ══════════════════════════════════════════════ */}
        <section ref={pricingAnim.ref} id="bang-gia" className="px-6 md:px-16 py-20 bg-slate-50 relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto relative z-10">
            <div className={`text-center mb-16 ${pricingAnim.isVisible ? 'anim-fadeInUp3D' : 'anim-hidden'}`}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4 shadow-sm">
                <span className="material-symbols-outlined text-sm">lock</span> PHÂN KHÚC GIÁ TRỊ (B2B)
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                BẢNG GIÁ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#186A3B] to-emerald-400">XÂY DỰNG HỆ THỐNG</span>
              </h2>
              <p className="text-slate-500 text-sm mt-4 max-w-2xl mx-auto">
                Giải pháp phần mềm quản trị toàn diện, tối ưu chi phí vận hành dựa trên quy mô thực tế của từng trường mầm non.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto py-8">

              {/* Plan 1: Starter / B2B Small */}
              <div className={`bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-lg flex flex-col h-full ${pricingAnim.isVisible ? 'anim-fadeInUp3D anim-delay-1' : 'anim-hidden'}`}>
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[#186A3B]">business</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Starter</h3>
                <p className="text-xs text-slate-500 mt-2 h-12">Chuyển đổi số tinh gọn cho cơ sở giáo dục mầm non độc lập.</p>
                <div className="my-6 h-20 flex flex-col justify-center">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black text-slate-900">990</span>
                    <span className="text-sm font-bold text-slate-400 mb-1">,000đ</span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">DÀNH CHO TRƯỜNG DƯỚI 50 TRẺ</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    'Quản lý hồ sơ học sinh & điểm danh',
                    'Sổ liên lạc điện tử cho Phụ huynh',
                    'Lên thực đơn & xếp thời khóa biểu cơ bản',
                    'Quản lý thu học phí tiêu chuẩn',
                    'Tài khoản Giáo viên (tối đa 5 user)'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-slate-600">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center mt-0.5">
                        <span className="material-symbols-outlined text-[10px] text-slate-500">check</span>
                      </div>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3.5 rounded-full bg-slate-50 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 mt-auto">
                  Dùng thử ngay <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>

              {/* Plan 2: Professional / B2B SaaS (Highlighted) */}
              <div className={`bg-white rounded-[2rem] p-8 border-2 border-[#186A3B] shadow-xl relative transition-all duration-300 md:scale-[1.03] flex flex-col h-full ${pricingAnim.isVisible ? 'anim-fadeInUp3D anim-delay-2' : 'anim-hidden'}`}>
                {/* Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#186A3B] text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md whitespace-nowrap">
                  ĐƯỢC ĐỀ XUẤT
                </div>

                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[#186A3B]">school</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Professional</h3>
                <p className="text-xs text-slate-500 mt-2 h-12">Nền tảng quản trị toàn diện & AI Copilot cho trường học tiêu chuẩn.</p>

                <div className="my-6 h-20 flex flex-col justify-center">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black text-slate-900">2 - 5</span>
                    <span className="text-sm font-bold text-slate-400 mb-1">triệu</span>
                  </div>
                  <p className="text-[10px] font-bold text-[#186A3B] uppercase tracking-widest mt-2">DÀNH CHO TRƯỜNG TỪ 50 - 500 TRẺ</p>
                </div>

                <div className="h-px w-full bg-slate-100 mb-6" />

                <ul className="space-y-4 mb-8">
                  {[
                    'Đầy đủ tính năng gói Starter',
                    'Trợ lý soạn giáo án AI (Lesson Planner)',
                    'Trải nghiệm AI Magic Story cho toàn trường',
                    'Phân quyền RBAC 4 cấp độ bảo mật',
                    'Tài khoản Giáo viên & Quản trị (Không giới hạn)',
                    'Hỗ trợ kỹ thuật chuyên gia định kỳ'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-slate-700 font-medium">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#186A3B] flex items-center justify-center mt-0.5">
                        <span className="material-symbols-outlined text-[10px] text-white">check</span>
                      </div>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 rounded-full bg-[#186A3B] text-white text-xs font-bold hover:bg-[#145a32] shadow-lg shadow-[#186A3B]/20 transition-all flex items-center justify-center gap-2 mt-auto">
                  Nhận báo giá chi tiết <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>

              {/* Plan 3: Enterprise */}
              <div className={`bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-lg flex flex-col h-full ${pricingAnim.isVisible ? 'anim-fadeInUp3D anim-delay-3' : 'anim-hidden'}`}>
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-slate-500">domain</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Enterprise</h3>
                <p className="text-xs text-slate-500 mt-2 h-12">Giải pháp vận hành độc quyền cho hệ thống chuỗi trường mầm non.</p>

                <div className="my-6 h-20 flex flex-col justify-center">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black text-slate-900">8 - 30 triệu</span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 border-t border-transparent pt-[5px]">TÙY BIẾN CẤP DOANH NGHIỆP</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    'Bao gồm gói Professional',
                    'Triển khai máy chủ tự chủ (Server On-premise)',
                    'Tích hợp API ERP/Kế toán có sẵn',
                    'Tùy biến module báo cáo chuyên sâu',
                    'Đội ngũ triển khai & bảo trì tận nơi'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-slate-600">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center mt-0.5">
                        <span className="material-symbols-outlined text-[10px] text-slate-500">check</span>
                      </div>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3.5 rounded-full bg-slate-50 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 mt-auto">
                  Tư vấn lộ trình <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════ */}
        {/* SECTION 6: TEAM — Hội Đồng Sáng Lập          */}
        {/* ══════════════════════════════════════════════ */}
        <section ref={teamAnim.ref} id="doi-ngu" className="px-6 md:px-16 py-20 bg-white">
          <div className="max-w-[1280px] mx-auto">
            <div className={`text-center mb-16 ${teamAnim.isVisible ? 'anim-fadeInUp3D' : 'anim-hidden'}`}>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                HỘI ĐỒNG <span className="text-[#186A3B]">SÁNG LẬP</span>
              </h2>
              <p className="text-slate-500 text-base mt-4 max-w-2xl mx-auto">
                Dưới sự định hướng chuyên môn sâu sắc từ các cố vấn, đội ngũ Trạng Nguyên Kids 4.0 vinh dự quy tụ những tài năng trẻ nhiệt huyết từ ĐH FPT, cùng chung một sứ mệnh vĩ đại: Tái định nghĩa trải nghiệm giáo dục.
              </p>
            </div>

            {/* Team grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { name: 'Thái Hoàng Huân', role: 'CEO', specialty: 'Kỹ Thuật Phần Mềm', img: '/assets/picture/huan.jpg', roleColor: 'bg-[#186A3B]' },
                { name: 'Lương Hoàng Minh Thư', role: 'CDO', specialty: 'Thiết Kế Sáng Tạo', img: '/assets/picture/thu.png', roleColor: 'bg-orange-500' },
                { name: 'Nguyễn Ngọc Thảo Vy', role: 'CFO', specialty: 'Nghiên Cứu & Tài Chính', img: '/assets/picture/vy.png', roleColor: 'bg-pink-500' },
                { name: 'Lê Nguyễn Hải Đăng', role: 'CTO', specialty: 'Kỹ Thuật Backend', img: '/assets/picture/dang.jpg', roleColor: 'bg-blue-500' },
                { name: 'Lâm Gia Huy', role: 'CMO', specialty: 'Thiết Kế & Visual', img: '/assets/picture/huy.jpg', roleColor: 'bg-purple-500' },
                { name: 'Phạm Vũ Khang', role: 'COO', specialty: 'Nội Dung & Vận Hành', img: '/assets/picture/khang.png', roleColor: 'bg-teal-500' },
              ].map((member, i) => (
                <div key={i} className={`bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center group ${teamAnim.isVisible ? `anim-scaleIn3D anim-delay-${i + 1}` : 'anim-hidden'}`}>
                  <div className="relative w-28 h-28 mx-auto mb-4">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-100 group-hover:border-[#186A3B]/20 transition-colors">
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    {/* Role badge */}
                    <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 ${member.roleColor} text-white px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg`}>
                      {member.role}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-2">{member.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{member.specialty}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════ */}
        {/* SECTION 7: PILOT PROJECTS — Dự Án Triển Khai  */}
        {/* ══════════════════════════════════════════════ */}
        <section ref={pilotAnim.ref} id="du-an" className="px-6 md:px-16 py-20 bg-gradient-to-b from-[#f8faff] to-white">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
              <div className={`${pilotAnim.isVisible ? 'anim-fadeInUp3D' : 'anim-hidden'}`}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#186A3B]/20 bg-white text-[#186A3B] text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-sm">rocket_launch</span> DỰ ÁN THỰC TẾ
                </span>
                <h2 className="text-4xl font-black text-slate-900">
                  DỰ ÁN <span className="text-[#186A3B]">TRIỂN KHAI</span>
                </h2>
              </div>
              <p className={`text-sm text-slate-500 max-w-sm ${pilotAnim.isVisible ? 'anim-fadeInUp3D anim-delay-1' : 'anim-hidden'}`}>
                Các mô hình triển khai thực tế chuẩn đồng bằng, tham vọng mang hệ sinh thái Trạng Nguyên Kids 4.0 vào vận hành thực tế.
              </p>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ${pilotAnim.isVisible ? 'anim-fadeInUp3D anim-delay-2' : 'anim-hidden'}`}>
              {/* Active project */}
              <Link to="/login" className="bg-white rounded-2xl overflow-hidden border border-[#186A3B]/20 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group block cursor-pointer">
                <div className="h-40 bg-gradient-to-br from-[#186A3B] to-emerald-400 flex items-center justify-center relative overflow-hidden">
                  <span className="material-symbols-outlined text-white/20 group-hover:scale-110 transition-transform duration-500" style={{ fontSize: '100px' }}>school</span>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-[10px] font-bold text-[#186A3B] uppercase tracking-wider">
                    ĐANG TRIỂN KHAI
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#186A3B] transition-colors">Trường Mầm Non Sao Mai</h4>
                    <span className="material-symbols-outlined text-[#186A3B] text-sm opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">arrow_forward</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Pilot đầu tiên — EXE101 FPT</p>
                </div>
              </Link>

              {/* Coming soon cards */}
              {['Kế hoạch Q3/2026', 'Kế hoạch Q4/2026', 'Kế hoạch 2027'].map((label, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-dashed border-slate-200 hover:border-slate-300 transition-all">
                  <div className="h-40 bg-slate-50 flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-slate-300 text-4xl mb-2">add_circle</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
                  </div>
                  <div className="p-5 text-center">
                    <h4 className="text-sm font-bold text-slate-400">COMING SOON</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════ */}
        {/* SECTION 8: CONTACT — Liên Hệ                 */}
        {/* ══════════════════════════════════════════════ */}
        <section id="lien-he" ref={contactAnim.ref} className="px-6 md:px-16 py-20 bg-white relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${contactAnim.isVisible ? 'anim-fadeInUp3D' : 'anim-hidden'}`}>

              {/* Left Side: Contact Info */}
              <div className="flex flex-col gap-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white text-slate-500 text-[10px] font-bold uppercase tracking-widest w-fit shadow-sm">
                  <span className="material-symbols-outlined text-sm text-[#186A3B] -ml-0.5">send</span> LIÊN HỆ TRỰC TIẾP
                </span>

                <h2 className="text-5xl md:text-5xl font-black leading-[1.1] tracking-tight text-slate-900">
                  Quản Trị Thảnh Thơi<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#186A3B] to-emerald-400">Chuyển Đổi Số Trong Tầm Tay?</span>
                </h2>

                <p className="text-slate-500 text-sm leading-relaxed max-w-sm mb-4">
                  Khởi tạo hệ sinh thái số cho trường mầm non của bạn ngay hôm nay. Điền form bên cạnh để nhận tài khoản trải nghiệm hệ sinh thái nền tảng miễn phí.
                </p>

                <div className="flex flex-col gap-6 mt-4">
                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-blue-600">mail</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Email Tư vấn</h4>
                      <p className="text-sm text-slate-500 mt-0.5">trangnguyenkids4.0@gmail.com</p>
                    </div>
                  </div>
                  {/* Hotline */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[#186A3B]">call</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Hotline Trực Tiếp</h4>
                      <p className="text-sm text-slate-500 mt-0.5">0961 372 222</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Contact Form */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50 relative">
                {formStatus === 'success' ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#186A3B]/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#186A3B] text-4xl">check_circle</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900">Gửi thành công!</h3>
                    <p className="text-sm text-slate-500 max-w-xs">Chúng tôi đã nhận được yêu cầu của bạn và sẽ liên hệ lại trong thời gian sớm nhất.</p>
                    <button
                      onClick={() => setFormStatus('idle')}
                      className="mt-2 px-6 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      Gửi yêu cầu khác
                    </button>
                  </div>
                ) : (
                  <form className="flex flex-col gap-5" onSubmit={e => { e.preventDefault(); handleFormSubmit(); }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-700">Họ và Tên <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          placeholder="VD: Nguyễn Văn A"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#186A3B]/20 focus:border-[#186A3B] transition-all text-sm"
                        />
                      </div>
                      {/* Phone */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-700">Số điện thoại <span className="text-red-500">*</span></label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          placeholder="09xx xxx xxx"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#186A3B]/20 focus:border-[#186A3B] transition-all text-sm"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700">Email <span className="text-slate-400 font-normal">(Tùy chọn)</span></label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="company@domain.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#186A3B]/20 focus:border-[#186A3B] transition-all text-sm"
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2 mb-2">
                      <label className="text-xs font-bold text-slate-700">Nhu cầu tư vấn / Giải pháp <span className="text-red-500">*</span></label>
                      <textarea
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        placeholder="Mô tả sơ lược quy mô cơ sở giáo dục mầm non và mong muốn của bạn..."
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#186A3B]/20 focus:border-[#186A3B] transition-all text-sm resize-none"
                      />
                    </div>

                    {formStatus === 'error' && (
                      <p className="text-xs text-red-500 font-medium flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">error</span>
                        Gửi thất bại. Vui lòng thử lại hoặc liên hệ trực tiếp qua hotline.
                      </p>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="w-full py-4 rounded-xl bg-[#186A3B] text-white text-sm font-bold shadow-lg shadow-[#186A3B]/30 hover:bg-[#145a32] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                    >
                      {formStatus === 'loading' ? (
                        <>
                          <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                          Đang gửi...
                        </>
                      ) : (
                        <>
                          XÁC NHẬN GỬI YÊU CẦU <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════ */}
        {/* CTA Footer Banner                             */}
        {/* ══════════════════════════════════════════════ */}
        <section className="relative px-6 md:px-16 py-16 bg-[#186A3B] overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div style={{
              backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
              backgroundSize: '40px 40px', width: '100%', height: '100%'
            }} />
          </div>
          <div className="max-w-[900px] mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Xóa Bỏ Áp Lực Sổ Sách<br className="hidden md:block" /> Quản Trị Trực Quan Chỉ Với 1 Chạm?
            </h2>
            <p className="text-white/70 text-base mb-8 max-w-xl mx-auto">
              Tham gia cùng hàng nghìn giáo viên và nhà trường đang chuyển đổi số với Trạng Nguyên Kids 4.0
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register" className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#186A3B] rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-xl">
                <span className="material-symbols-outlined">school</span>
                Đăng ký dùng thử MIỄN PHÍ
              </Link>
              <Link to="/ai" className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-sm hover:bg-white/10 transition-all">
                <span className="material-symbols-outlined">auto_awesome</span>
                Trải nghiệm tính năng AI
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-16 pb-8 px-6 md:px-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img alt="Logo" className="h-10 object-contain" src="/assets/logo/mainlogo.png" />
                <h3 className="text-slate-900 font-black text-lg">Trạng Nguyên Kids 4.0</h3>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">
                "Nơi công nghệ không thay thế trái tim, mà là đôi cánh cho trí tuệ mầm non."
              </p>
            </div>
            <div>
              <h4 className="text-slate-900 font-bold text-sm mb-4">Liên kết</h4>
              <ul className="flex flex-col gap-3 text-xs text-slate-500">
                <li><a href="#gioi-thieu" className="hover:text-[#186A3B] transition-colors">Trang chủ</a></li>
                <li><a href="#giai-phap" className="hover:text-[#186A3B] transition-colors">Giải pháp</a></li>
                <li><a href="#doi-ngu" className="hover:text-[#186A3B] transition-colors">Đội ngũ</a></li>
                <li><a href="#du-an" className="hover:text-[#186A3B] transition-colors">Dự án</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-bold text-sm mb-4">Liên hệ</h4>
              <ul className="flex flex-col gap-3 text-xs text-slate-500">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[#186A3B] text-sm">location_on</span> Cần Thơ, Việt Nam</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[#186A3B] text-sm">call</span> 0961 372 222</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[#186A3B] text-sm">mail</span> trangnguyenkids4@gmail.com</li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-bold text-sm mb-4">Chính sách</h4>
              <ul className="flex flex-col gap-3 text-xs text-slate-500">
                <li><a href="#" className="hover:text-[#186A3B] transition-colors">Bảo mật dữ liệu</a></li>
                <li><a href="#" className="hover:text-[#186A3B] transition-colors">Điều khoản dịch vụ</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-xs">© 2026 Trạng Nguyên Kids 4.0. Tất cả quyền được bảo hộ. | EXE101 — ĐH FPT Cần Thơ</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
