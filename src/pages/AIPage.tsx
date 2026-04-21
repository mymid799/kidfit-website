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
          <Link to="/ai-story" className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-full h-10 px-5 bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform">
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
                <Link to="/ai-story" className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-4 rounded-full font-bold transition-all lightning-hover flex items-center gap-2">
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

          {/* Feature 2: Drawing Explorer 3D */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-1 group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative glass-card rounded-lg p-1 overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                    <div className="aspect-video bg-slate-900 rounded-lg relative overflow-hidden flex items-center justify-center p-8">
                        {/* 3D Visual — spinning cube mockup */}
                        <div className="relative w-48 h-48">
                            {/* Rotating cube outline */}
                            <div className="absolute inset-0 border-2 border-purple-500/40 rounded-xl animate-spin" style={{ animationDuration: '8s' }} />
                            <div className="absolute inset-4 border-2 border-indigo-400/30 rounded-xl animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
                            {/* Center icon */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/30 to-indigo-500/30 border border-purple-400/30 flex items-center justify-center">
                                <span className="material-symbols-outlined text-purple-400 text-4xl">view_in_ar</span>
                            </div>
                        </div>
                        {/* Floating elements */}
                        <div className="absolute top-6 left-8 glass-card px-3 py-2 rounded-lg text-xs font-mono text-purple-300 border border-purple-500/20 floating-shape-1">
                            ✏️ Nhận diện: Con Mèo
                        </div>
                        <div className="absolute bottom-8 right-8 glass-card px-3 py-2 rounded-lg text-xs font-mono text-emerald-300 border border-emerald-500/20 floating-shape-2">
                            🎉 Score: 8.5/10
                        </div>
                        <div className="absolute bottom-6 left-6 glass-card px-2 py-1 rounded text-[10px] text-amber-300 font-bold floating-shape-1" style={{ animationDelay: '1s' }}>
                            🧊 3D Model Ready
                        </div>
                    </div>
                </div>
            </div>
            <div className="order-2 space-y-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full glass-card border-purple-500/20 text-purple-400 text-sm font-medium">
                    <span className="material-symbols-outlined mr-2 text-lg">view_in_ar</span>
                    DRAWING EXPLORER 3D
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                    Biến nét vẽ thành mô hình 3D sống động
                </h2>
                <p className="text-lg text-slate-400">
                    AI nhận diện bức vẽ, chấm điểm kỹ thuật và dựng mô hình 3D ngay lập tức. Trẻ em học vẽ giỏi hơn khi thấy tác phẩm của mình sống động trong không gian 3D.
                </p>
                <div className="flex gap-4">
                    <Link to="/ai-drawing-3d" className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-full font-bold transition-all lightning-hover flex items-center gap-2">
                        Thử ngay miễn phí
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
            </div>
          </div>

        </div>

          {/* Feature 3: Quick Draw AI */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full glass-card border-orange-500/20 text-orange-400 text-sm font-medium">
                <span className="material-symbols-outlined mr-2 text-lg">draw</span>
                QUICK DRAW AI
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                Vẽ nhanh tay — AI đoán ngay lập tức
              </h2>
              <p className="text-lg text-slate-400">
                Lấy cảm hứng từ trò chơi nổi tiếng của Google. Chỉ có 20 giây để vẽ, Gemini AI sẽ nhận diện nét vẽ của bé trong số 15 danh mục. Vừa học vừa chơi, điểm số tăng theo tốc độ phản ứng.
              </p>
              <div className="flex gap-4">
                <a href="/ai-quickdraw" className="bg-orange-500 hover:bg-orange-400 text-white px-8 py-4 rounded-full font-bold transition-all lightning-hover flex items-center gap-2">
                  Chơi ngay miễn phí
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="order-1 lg:order-2 group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative glass-card rounded-lg p-1 overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="aspect-video bg-slate-900 rounded-lg relative overflow-hidden flex items-center justify-center p-6">
                  <div className="relative w-full h-full">
                    <div className="w-full h-40 bg-white rounded-xl relative overflow-hidden border border-slate-200/20">
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120">
                        <circle cx="100" cy="60" r="20" stroke="#1e293b" strokeWidth="3" fill="none" />
                        <line x1="100" y1="32" x2="100" y2="24" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
                        <line x1="100" y1="88" x2="100" y2="96" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
                        <line x1="72" y1="60" x2="64" y2="60" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
                        <line x1="128" y1="60" x2="136" y2="60" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
                        <line x1="79" y1="39" x2="73" y2="33" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
                        <line x1="121" y1="81" x2="127" y2="87" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
                        <line x1="121" y1="39" x2="127" y2="33" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
                        <line x1="79" y1="81" x2="73" y2="87" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="absolute -top-3 -right-2 glass-card px-3 py-2 rounded-xl text-sm font-bold text-orange-300 border border-orange-500/30 floating-shape-1">
                      ☀️ Sun — 92%
                    </div>
                    <div className="absolute -bottom-2 left-4 glass-card px-3 py-2 rounded-lg text-xs font-mono text-emerald-300 border border-emerald-500/20 floating-shape-2">
                      🎉 Chính xác! +18 điểm
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex flex-col items-center gap-1">
                    <span className="text-3xl font-black text-emerald-400">12</span>
                    <span className="text-[10px] text-slate-400">giây còn lại</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Feature 4: AI Lesson Editor — CV 2345 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-1 group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative glass-card rounded-lg p-1 overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                    <div className="aspect-video bg-slate-900 rounded-lg relative overflow-hidden flex items-center justify-center p-6">
                        {/* A4 Page mockup */}
                        <div className="relative w-full max-w-[280px]">
                            <div className="bg-white rounded-lg shadow-2xl p-4 text-[8px] text-gray-800 leading-relaxed">
                                <div className="text-center mb-2">
                                    <p className="font-black text-[10px] uppercase">Kế hoạch bài dạy</p>
                                    <p className="text-gray-500 text-[7px]">Môn: Toán — Lớp 2</p>
                                </div>
                                <p className="font-bold text-indigo-600 mb-1">I. YÊU CẦU CẦN ĐẠT</p>
                                <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
                                <div className="h-2 bg-gray-200 rounded w-4/5 mb-2"></div>
                                <p className="font-bold text-indigo-600 mb-1">II. ĐỒ DÙNG DẠY HỌC</p>
                                <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
                                <div className="h-2 bg-gray-200 rounded w-3/5 mb-2"></div>
                                <p className="font-bold text-indigo-600 mb-1">III. HOẠT ĐỘNG DẠY HỌC</p>
                                <div className="h-2 bg-indigo-100 rounded w-full mb-0.5"></div>
                                <div className="h-2 bg-indigo-100 rounded w-full mb-0.5"></div>
                                <div className="h-2 bg-indigo-100 rounded w-4/5"></div>
                            </div>
                            {/* AI sparkle */}
                            <div className="absolute -top-3 -right-3 glass-card px-2.5 py-1.5 rounded-xl text-xs font-bold text-indigo-300 border border-indigo-500/30 floating-shape-1">
                                ✨ AI Generated
                            </div>
                            <div className="absolute -bottom-2 -left-2 glass-card px-2 py-1 rounded-lg text-[9px] font-bold text-emerald-300 border border-emerald-500/20 floating-shape-2">
                                📄 Chuẩn CV 2345
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="order-2 space-y-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full glass-card border-indigo-500/20 text-indigo-400 text-sm font-medium">
                    <span className="material-symbols-outlined mr-2 text-lg">edit_document</span>
                    AI LESSON EDITOR
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                    Soạn giáo án Tiểu học chuẩn CV-2345 trong vài giây
                </h2>
                <p className="text-lg text-slate-400">
                    AI tự động tạo khung Kế hoạch bài dạy đầy đủ 4 phần theo Công văn 2345: Yêu cầu cần đạt, Đồ dùng, Hoạt động dạy học, và Điều chỉnh. Chỉnh sửa trực tiếp từng block, xuất PDF chuẩn nộp Ban Giám Hiệu.
                </p>
                <div className="flex gap-4">
                    <Link to="/ai-lesson" className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:from-indigo-400 hover:to-violet-400 px-8 py-4 rounded-full font-bold transition-all lightning-hover flex items-center gap-2">
                        Soạn giáo án ngay
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
            </div>
          </div>

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
