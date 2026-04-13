import React from 'react';
import { Link } from 'react-router-dom';

export default function AIPage() {
  return (
    <div className="layout-container flex h-full grow flex-col bg-slate-950 text-white min-h-screen antialiased overflow-x-hidden font-display">
      {/* Navigation - Dark Mode Version */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-white/10 px-6 md:px-20 py-4 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-3">
          <img src="/assets/logo/mainlogo.png" alt="KidFit Logo" className="h-10 w-auto object-contain brightness-0 invert" />
          <h2 className="text-white text-xl font-bold leading-tight tracking-tight">Trạng Nguyên Kids 4.0</h2>
        </Link>
        <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
          <nav className="flex items-center gap-8">
            <Link to="/" className="text-slate-300 text-sm font-medium hover:text-emerald-400 transition-colors">Về trang chủ</Link>
          </nav>
          <Link to="/login" className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-full h-10 px-5 bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform">
            Thử Nghiệm
          </Link>
        </div>
      </header>

      <main className="flex-1 relative pb-24 px-6 md:px-12 lg:px-24 w-full">
        {/* Background Neon Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="glow-blob absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full"></div>
          <div className="glow-blob absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full"></div>
          <div className="glow-blob absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-green-900/30 rounded-full"></div>
        </div>
        
        {/* Component Content */}
        <div className="relative pt-24 z-10 text-center mb-24 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Khai phóng tiềm năng với sức mạnh AI
          </h1>
          <p className="text-xl text-slate-400 font-light leading-relaxed">
              Trải nghiệm kỷ nguyên giáo dục 4.0 nơi trí tuệ nhân tạo đồng hành cùng sự sáng tạo của trẻ em Việt Nam.
          </p>
        </div>
      
        {/* AI Showcase Grid */}
        <div className="relative z-10 space-y-32 max-w-7xl mx-auto">
          
          {/* Feature 1: AI Magic Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full glass-card border-emerald-500/20 text-emerald-400 text-sm font-medium">
                <span className="material-symbols-outlined mr-2 text-lg">auto_awesome</span>
                AI MAGIC STORY
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                  Biến nét vẽ nguệch ngoạc thành phim 3D Pixar sinh động
              </h2>
              <p className="text-lg text-slate-400">
                  Chỉ với một bản phác thảo đơn giản, công nghệ AI Diffusion của chúng tôi tự động dựng bối cảnh, nhân vật và chuyển động theo phong cách điện ảnh chuyên nghiệp.
              </p>
              <div className="flex gap-4">
                <Link to="/login" className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-4 rounded-full font-bold transition-all lightning-hover flex items-center gap-2">
                    Thử ngay miễn phí
                    <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative glass-card rounded-lg p-1 overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                    <div className="aspect-video bg-slate-900 rounded-lg relative overflow-hidden">
                        <img alt="3D render of a cute cartoon robot in a space forest" className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsyPHWQbwNex4RU43Mt7hG9XNKblEVN65nopu8pBGDTKVQ3GchFJeTJgJsbVMmrnhrEdj-3-cQJ9Ll_E9ptCzPK9hsHYzGHT4cjJTvc-9gevQy1bxP9M64Je4fo-cJljiPRTy8T-H8ydAP7qtKc6CN5pIVi4k9MH0XlU3cynEsJLDW3KU-SnVnoD_gywRVnCi-cbyR9cKwWdGV8xiTUzGoUbV6M4evvjhn-BC1MQbxaAYpOIcbO8HaRupWPz1d-RWYG1VZldYEPMw" />
                        {/* Terminal Overlay */}
                        <div className="absolute bottom-6 left-6 right-6 glass-card p-4 rounded-xl border-t border-white/20">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                <span className="text-xs text-slate-500 ml-2 font-mono">ai_engine_v4.0</span>
                            </div>
                            <div className="font-mono text-sm text-emerald-400 space-y-1">
                                <p className="terminal-text">Đang phân tích nét vẽ...</p>
                                <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-500">Đang sinh ảnh 3D...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Feature 2: AI Lesson Planner */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-1 group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative glass-card rounded-lg p-1 overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                    <div className="aspect-video bg-slate-900 rounded-lg relative overflow-hidden flex flex-col p-8">
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-2/3 h-4 bg-slate-800 rounded-full animate-pulse"></div>
                            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-emerald-400">smart_toy</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="w-full h-24 bg-slate-800/50 rounded-xl border border-white/5 p-4">
                                <div className="flex gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="w-1/2 h-3 bg-slate-700 rounded-full"></div>
                                        <div className="w-3/4 h-3 bg-slate-700 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-4/5 h-16 bg-slate-800/50 rounded-xl border border-white/5"></div>
                        </div>
                        {/* Terminal Overlay */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 glass-card p-4 rounded-xl shadow-2xl border border-white/10">
                            <div className="font-mono text-xs text-blue-400 space-y-1">
                                <p className="terminal-text">Nhận từ khóa: Vũ trụ</p>
                                <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-700">Đang thiết lập mục tiêu bài học...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="order-2 space-y-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full glass-card border-blue-500/20 text-blue-400 text-sm font-medium">
                    <span className="material-symbols-outlined mr-2 text-lg">smart_toy</span>
                    AI LESSON PLANNER
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                    Giáo án STEAM chuẩn Bộ GD&amp;ĐT trong 10 giây
                </h2>
                <p className="text-lg text-slate-400">
                    Giúp giáo viên và phụ huynh tiết kiệm hàng giờ chuẩn bị. AI tự động đề xuất lộ trình học tập cá nhân hóa, tích hợp đầy đủ các tiêu chuẩn kiến thức hiện đại.
                </p>
                <div className="flex gap-4">
                    <button className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-full font-bold transition-all lightning-hover flex items-center gap-2">
                        Khám phá thư viện
                        <span className="material-symbols-outlined">auto_stories</span>
                    </button>
                </div>
            </div>
          </div>

        </div>

        {/* Bento Grid Statistics */}
        <div className="mt-48 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 glass-card rounded-xl p-10 flex flex-col justify-between group overflow-hidden relative">
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>
                <div className="relative z-10">
                    <h3 className="text-4xl font-bold mb-2 text-white">98%</h3>
                    <p className="text-slate-400 text-lg">Trẻ em cảm thấy hào hứng hơn với các bài học có ứng dụng AI.</p>
                </div>
                <div className="mt-12 flex -space-x-4 relative z-10">
                    <img alt="student" className="w-12 h-12 rounded-full border-2 border-slate-950" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7aplnX5zLLwP-uxprNfcOO1_I1VuvxSB904D7riF8GQerppxjD9iTfkQLsEfiyXBsKvk9hBQuBewhNEHcoyCGIYq6L91d8CHQ-K_qlzwIQkD_EwLHY-OuJeXN2R3H0LHsn8Wc2ZmNAjbz9U9KNt06NSP31RcJTSugB4tJtewieg3xYaeda9_dQbq-kS5l7_sMtkf62FEA9lUnaI79t0huD8HC9VRpIuF9s7RyhF40GGfbjc_t6X3BmOAFH3lUPhiR1H87ZLsiXj0" />
                    <img alt="student" className="w-12 h-12 rounded-full border-2 border-slate-950" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdw1yIVgfo5u9-bLKpMkxMY1dzWpAR7SYs5B18NXDeYijGZOAZil1ZO9-XnQtb9LCnEyqAjlf0Vwlwp-8JQfsm70PLpXBb0cRJM0xmbsp7oQ5fKMXws4SodVBWbEgnhM-IjP_uuZ75Ih81GzPRjgYGOAuurzk6cL7u7HbJ5HDQDYgpAWG-RIeNvA4Xvd9wFzkvYGeoZjml6AUFrQPiOs96UpxklnB90_UIQqlqRUksClFJDwaa1hxWLuKJnpkh5Ml-DweY_spOUBE" />
                    <img alt="student" className="w-12 h-12 rounded-full border-2 border-slate-950" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-HPT9a_JEjJMqDUgK-3_X3zoIm3H9ALdEveVgzEiOobX3E9yuaFKJgsk9QAy9ldmTf-no4ei-fUZYPmTTeV1PNralSMILncPyX2J2U2EIZSpomevM-SKsMKQJQAKSl3qAosN_fb1NApVSq8TklV6oy8u6Y2f86dwigujsqftFDACyUDUmtUDyJ-fdHqLNj4XWKym7mvgTf04DCPiVbrCiadJenl92QLfVFI-SzwTgLmuDQtuH4pbBGKmKx1eimq6mbxJsCSwr_s8" />
                    <div className="w-12 h-12 rounded-full border-2 border-slate-950 bg-emerald-600 flex items-center justify-center text-xs font-bold text-white">+10k</div>
                </div>
            </div>
            <div className="glass-card rounded-xl p-10 group flex flex-col justify-center text-center">
                <span className="material-symbols-outlined text-6xl text-emerald-400 mb-6 group-hover:scale-110 transition-transform">speed</span>
                <h3 className="text-3xl font-bold mb-2 text-white">10 Giây</h3>
                <p className="text-slate-400">Thời gian trung bình để AI hoàn thiện một ý tưởng sáng tạo.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
