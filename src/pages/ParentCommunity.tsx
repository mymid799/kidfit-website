import React, { useState } from 'react';

const ProgressView = () => {
  return (
    <div className="w-full flex-1 relative bg-background-light font-display text-slate-900 overflow-y-auto pb-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between mb-8 bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Kids Fit" className="h-12 w-auto object-contain" onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x40/4cae4f/ffffff?text=Logo' }} />
            <div>
              <h2 className="text-lg font-bold leading-tight">Vẽ Tư Duy STEAM</h2>
              <p className="text-xs text-slate-500">Học viện Sáng tạo Nhí</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="size-10 rounded-full bg-slate-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">notifications</span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">Minh Quân</p>
                <p className="text-xs text-primary font-medium">Khối Chồi • 4 tuổi</p>
              </div>
              <div className="size-10 rounded-full bg-cover bg-center border-2 border-primary/30" style={{ backgroundImage: "url('https://api.dicebear.com/7.x/avataaars/svg?seed=Felix')" }}></div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Progress & Skills */}
          <div className="lg:col-span-8 space-y-8">
            {/* Main Progress Card */}
            <div className="bg-white rounded-xl p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16"></div>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative size-40 flex items-center justify-center">
                  {/* Circular Progress */}
                  <svg className="size-full" viewBox="0 0 36 36">
                    <circle className="stroke-slate-100" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                    <circle className="stroke-primary" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset="35" strokeLinecap="round" strokeWidth="3"></circle>
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-bold text-primary">65%</span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Tiến độ</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Chào Minh Quân! 👋</h3>
                  <p className="text-slate-600 mb-4">Con đang làm rất tốt lộ trình "Khám phá Hình khối &amp; Màu sắc". Tiếp tục phát huy nhé!</p>
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-6">
                    <span className="text-xl">🌟🌟🌟🌟</span><span className="text-xl grayscale opacity-30">🌟</span>
                    <span className="ml-2 text-sm font-medium bg-accent/20 text-orange-700 px-3 py-1 rounded-full">Tuyệt vời!</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all">Xem chi tiết sổ tay</button>
                    <button className="bg-white border-2 border-slate-200 text-slate-700 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-slate-50 transition-all">Chia sẻ với gia đình</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Developing Skills Section */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                  Kỹ năng đang phát triển
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Skill 1 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🖼️</span>
                      <span className="font-semibold text-sm">Tư duy hình ảnh</span>
                    </div>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">TỰ TIN</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '85%' }}></div>
                  </div>
                </div>
                {/* Skill 2 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🎨</span>
                      <span className="font-semibold text-sm">Sáng tạo</span>
                    </div>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">TỰ TIN</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '78%' }}></div>
                  </div>
                </div>
                {/* Skill 3 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🗣️</span>
                      <span className="font-semibold text-sm">Diễn đạt &amp; Trình bày</span>
                    </div>
                    <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">ĐANG PHÁT TRIỂN</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary" style={{ width: '55%' }}></div>
                  </div>
                </div>
                {/* Skill 4 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🤝</span>
                      <span className="font-semibold text-sm">Cộng tác</span>
                    </div>
                    <span className="text-[10px] font-bold text-orange-400 bg-orange-50 px-2 py-0.5 rounded-full">ĐANG HÌNH THÀNH</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities Timeline */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">calendar_month</span>
                Hoạt động tuần này
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs shrink-0">12</div>
                    <div className="w-0.5 h-full bg-slate-100 my-1"></div>
                  </div>
                  <div className="pb-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Thứ Hai</p>
                    <p className="font-medium text-sm">Nhận diện hình khối cơ bản (Hình tròn &amp; Vuông)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs shrink-0">14</div>
                    <div className="w-0.5 h-full bg-slate-100 my-1"></div>
                  </div>
                  <div className="pb-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Thứ Tư</p>
                    <p className="font-medium text-sm">Sáng tạo nhân vật từ thẻ hình học B5</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="size-10 rounded-full bg-slate-100 border-2 border-primary flex items-center justify-center text-primary font-bold text-xs shrink-0">16</div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Hôm Nay (Thứ Sáu)</p>
                    <p className="font-medium text-sm text-primary">Buổi thuyết trình: Ý tưởng của con ✨</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Highlights & Support */}
          <div className="lg:col-span-4 space-y-8">
            {/* Recent Highlight Card */}
            <div className="bg-secondary/10 rounded-xl p-6 border-2 border-secondary/20 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-secondary">verified</span>
                <h3 className="font-bold text-secondary">Điểm nhấn sáng tạo</h3>
              </div>
              <p className="text-sm leading-relaxed mb-6 font-medium">
                "Minh Quân đã rất tự tin chia sẻ ý tưởng từ <span className="text-secondary font-bold">thẻ B5 – Kết hợp!</span> ✨"
              </p>
              <div className="bg-white p-4 rounded-lg flex items-center justify-center">
                <div className="w-32 h-32 bg-slate-50 rounded flex items-center justify-center relative">
                  {/* Abstract Illustration representation */}
                  <div className="size-12 bg-secondary rounded-lg mb-4"></div>
                  <div className="absolute bottom-4 left-4 size-8 bg-accent rounded-full"></div>
                  <div className="absolute top-4 right-4 size-6 bg-primary cursor-pointer transition-transform hover:rotate-90"></div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <span className="material-symbols-outlined text-4xl">smart_toy</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-center mt-3 text-slate-500 font-medium">Hình minh họa: Robot từ hình khối</p>
            </div>

            {/* Home Support Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">home</span>
                Gợi ý cho Ba Mẹ
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="size-10 bg-accent/20 text-orange-600 rounded-full flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">face</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">Cùng bé soi gương</p>
                    <p className="text-xs text-slate-500 leading-relaxed">Ba mẹ cùng bé soi gương và tập vẽ các hình khối trên khuôn mặt mình nhé!</p>
                  </div>
                </div>
                <div className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="size-10 bg-primary/20 text-primary rounded-full flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">search</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">Săn tìm hình khối</p>
                    <p className="text-xs text-slate-500 leading-relaxed">Khi đi dạo, hãy cùng bé tìm xem các đồ vật xung quanh có hình khối gì nhé.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Support */}
            <div className="bg-slate-900 text-white rounded-xl p-6 shadow-md overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 opacity-20">
                <span className="material-symbols-outlined text-9xl">chat</span>
              </div>
              <p className="text-sm font-medium mb-4 relative z-10">Cần trao đổi thêm với giáo viên hướng dẫn của Minh Quân?</p>
              <button className="w-full py-3 bg-primary rounded-lg font-bold text-sm relative z-10 hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-lg">message</span>
                Nhắn tin ngay
              </button>
            </div>
          </div>
        </div>
        {/* Footer Info */}
        <footer className="mt-12 text-center pb-8 border-t border-slate-200 pt-8">
          <p className="text-slate-400 text-sm">Hệ thống Vẽ Tư Duy STEAM Academy • Cập nhật lần cuối: Hôm nay, 09:30</p>
        </footer>
      </div>
    </div>
  );
};

const ReportView = () => {
  return (
    <div className="w-full flex-1 relative bg-background-light font-display text-slate-900 doodle-bg"
      style={{
        backgroundImage: 'radial-gradient(rgba(76, 174, 79, 0.1) 1px, transparent 1px), radial-gradient(rgba(33, 150, 243, 0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        backgroundPosition: '0 0, 20px 20px',
      }}
    >
      <div className="layout-container flex h-full grow flex-col pb-10">
        <header className="flex items-center justify-between border-b border-solid border-primary/10 bg-white/80 backdrop-blur-md px-6 md:px-10 py-4 sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Kids Fit" className="h-10 w-auto object-contain" onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x40/4cae4f/ffffff?text=Logo' }} />
            <div>
              <h2 className="text-primary text-lg font-bold leading-tight tracking-tight uppercase">Vẽ Tư Duy STEAM</h2>
              <p className="text-xs text-slate-500 font-medium">Khai phóng tiềm năng nhí</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-bold">Minh Quân (5 tuổi)</span>
              <span className="text-xs text-secondary font-medium italic">Lớp Mầm non Sáng tạo</span>
            </div>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 border-2 border-primary p-0.5 shadow-sm" style={{ backgroundImage: 'url("https://api.dicebear.com/7.x/avataaars/svg?seed=Felix")' }}>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto w-full px-4 py-10">
          <section className="mb-12 text-center bg-white/60 p-8 rounded-xl backdrop-blur-sm border border-white/50 shadow-sm">
            <div className="inline-flex items-center justify-center bg-accent/20 text-primary px-4 py-1 rounded-full text-sm font-bold mb-4">
              <span className="material-symbols-outlined text-sm mr-2 text-rose-500">favorite</span> Hành trình tháng 3/2026
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Chào ba mẹ, <span className="text-primary">con là Minh Quân</span> đây!
            </h1>
            <div className="max-w-2xl mx-auto text-lg leading-relaxed text-slate-700 italic">
              "Tháng này ở xưởng vẽ STEAM vui lắm ba mẹ ơi! Con đã học được cách pha những màu sắc kỳ diệu như cầu vồng, và con còn tự tay làm một chú robot biết nhảy múa nữa. Con thích nhất là lúc được cùng các bạn khám phá những điều mới lạ. Con tặng ba mẹ báo cáo này để ba mẹ thấy con đã lớn thế nào nhé!"
            </div>
          </section>

          <section className="mb-16">
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-2xl shadow-sm border border-primary/10">
              <div className="w-full md:w-1/3 text-center md:text-left">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Tiến độ Module 4</h3>
                <p className="text-slate-500 text-sm italic">"Thế giới quanh em qua lăng kính khoa học"</p>
              </div>
              <div className="w-full md:w-2/3">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-3xl font-black text-primary">85%</span>
                  <span className="text-sm font-bold text-slate-400">Sắp hoàn thành rồi!</span>
                </div>
                <div className="h-8 w-full bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner border border-slate-200">
                  <div className="h-full rounded-full flex items-center justify-end px-3 transition-all duration-1000" style={{ width: '85%', background: 'linear-gradient(90deg, #FF5252, #FFEB3B, #4CAF50, #2196F3, #9C27B0)' }}>
                    <span className="material-symbols-outlined text-white text-sm animate-bounce">rocket_launch</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <span className="material-symbols-outlined text-secondary text-3xl">photo_library</span>
              <h3 className="text-2xl font-bold">Khoảnh khắc đáng nhớ</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group relative overflow-hidden rounded-2xl aspect-square shadow-lg border-4 border-white">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544208285-b0d774cb2e6f?q=80&w=800&auto=format&fit=crop")' }}></div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                  <p className="text-white text-base font-bold">Bé tập trung vẽ tranh</p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl aspect-square shadow-lg border-4 border-white">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=800&auto=format&fit=crop")' }}></div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                  <p className="text-white text-base font-bold">Lắp ghép robot thông minh</p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl aspect-square shadow-lg border-4 border-white">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1503454537195-1dc5348aa334?q=80&w=800&auto=format&fit=crop")' }}></div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                  <p className="text-white text-base font-bold">Pha màu kỳ diệu</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <span className="material-symbols-outlined text-primary text-3xl">star</span>
              <h3 className="text-2xl font-bold">Năng lực của bé</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-primary/5 hover:bg-primary/10 transition-colors p-6 rounded-2xl border-b-4 border-primary text-center group cursor-default">
                <div className="size-14 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30 group-hover:-translate-y-1 transition-transform">
                  <span className="material-symbols-outlined text-2xl">psychology</span>
                </div>
                <h4 className="font-bold text-lg mb-2 text-slate-800">Tư duy</h4>
                <p className="text-sm text-slate-600">Con biết quan sát và đặt câu hỏi 'Tại sao?' rất thông minh!</p>
              </div>

              <div className="bg-secondary/5 hover:bg-secondary/10 transition-colors p-6 rounded-2xl border-b-4 border-secondary text-center group cursor-default">
                <div className="size-14 bg-secondary text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-secondary/30 group-hover:-translate-y-1 transition-transform">
                  <span className="material-symbols-outlined text-2xl">chat_bubble</span>
                </div>
                <h4 className="font-bold text-lg mb-2 text-slate-800">Biểu đạt</h4>
                <p className="text-sm text-slate-600">Con kể chuyện về tác phẩm của mình thật truyền cảm.</p>
              </div>

              <div className="bg-amber-100/50 hover:bg-amber-100 transition-colors p-6 rounded-2xl border-b-4 border-amber-400 text-center group cursor-default">
                <div className="size-14 bg-amber-400 text-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-400/30 group-hover:-translate-y-1 transition-transform">
                  <span className="material-symbols-outlined text-2xl">lightbulb</span>
                </div>
                <h4 className="font-bold text-lg mb-2 text-slate-800">Sáng tạo</h4>
                <p className="text-sm text-slate-600">Cách con phối màu sắc thực sự độc đáo và đầy bất ngờ!</p>
              </div>

              <div className="bg-orange-50 hover:bg-orange-100 transition-colors p-6 rounded-2xl border-b-4 border-orange-500 text-center group cursor-default">
                <div className="size-14 bg-orange-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30 group-hover:-translate-y-1 transition-transform">
                  <span className="material-symbols-outlined text-2xl">groups</span>
                </div>
                <h4 className="font-bold text-lg mb-2 text-slate-800">Hợp tác</h4>
                <p className="text-sm text-slate-600">Con luôn sẵn lòng chia sẻ màu vẽ với các bạn cùng lớp.</p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-white/80 p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-primary text-3xl">home</span>
                <h3 className="text-2xl font-bold">Cùng con vui chơi tại nhà</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-5 items-center bg-white border border-slate-100 hover:border-green-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group cursor-pointer">
                  <div className="size-16 rounded-xl bg-green-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-green-600 text-3xl">eco</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-slate-800 group-hover:text-green-600 transition-colors">Tranh ghép lá cây</h4>
                    <p className="text-sm text-slate-600 line-clamp-2">Cùng bé nhặt lá khô trong vườn và dán thành hình các con vật ngộ nghĩnh.</p>
                  </div>
                </div>
                <div className="flex gap-5 items-center bg-white border border-slate-100 hover:border-red-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group cursor-pointer">
                  <div className="size-16 rounded-xl bg-red-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-red-600 text-3xl">volcano</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-slate-800 group-hover:text-red-600 transition-colors">Núi lửa Baking Soda</h4>
                    <p className="text-sm text-slate-600 line-clamp-2">Thí nghiệm khoa học vui với giấm và bột nở để tạo ra vụ nổ sắc màu.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
            <button className="flex items-center justify-center gap-2 bg-primary text-white py-3.5 px-8 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 w-full sm:w-auto">
              <span className="material-symbols-outlined">picture_as_pdf</span> Tải báo cáo PDF
            </button>
            <button className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-700 py-3 px-8 rounded-xl font-bold hover:bg-slate-50 transition-all active:scale-95 w-full sm:w-auto">
              <span className="material-symbols-outlined">share</span> Chia sẻ
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default function ParentCommunity() {
  const [activeTab, setActiveTab] = useState('report');

  return (
    <div className="flex h-screen bg-background-light text-slate-900 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-300 z-20">
        <div className="flex flex-col h-full">
          <div className="h-20 flex items-center justify-center md:justify-start md:px-6 border-b border-slate-100">
            <div className="size-10 bg-accent rounded-xl flex items-center justify-center text-white shadow-md shadow-accent/20 shrink-0">
              <span className="material-symbols-outlined">family_restroom</span>
            </div>
            <h1 className="hidden md:block ml-3 font-black text-xl text-slate-900 tracking-tight">Phụ Huynh</h1>
          </div>

          <nav className="flex-1 py-6 px-3 flex flex-col gap-2 overflow-y-auto hide-scrollbar">
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'feed' ? 'bg-accent/10 text-accent font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
            >
              <span className="material-symbols-outlined text-2xl">forum</span>
              <span className="hidden md:block">Cộng Đồng</span>
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'progress' ? 'bg-primary/10 text-primary font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
            >
              <span className="material-symbols-outlined text-2xl">monitoring</span>
              <span className="hidden md:block">Tiến Độ Của Bé</span>
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'messages' ? 'bg-secondary/10 text-secondary font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
            >
              <span className="material-symbols-outlined text-2xl">chat</span>
              <span className="hidden md:block">Tin Nhắn</span>
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'resources' ? 'bg-accent/10 text-accent font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
            >
              <span className="material-symbols-outlined text-2xl">library_books</span>
              <span className="hidden md:block">Tài Liệu</span>
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'report' ? 'bg-primary/10 text-primary font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
            >
              <span className="material-symbols-outlined text-2xl">analytics</span>
              <span className="hidden md:block">Báo Cáo Tổng Hợp</span>
            </button>
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mom" alt="Avatar" className="size-10 rounded-full bg-slate-200 border-2 border-white shadow-sm shrink-0" />
              <div className="hidden md:block overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate">Mẹ Bé Bi</p>
                <p className="text-xs text-slate-500 truncate">Phụ huynh</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50/50">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 md:px-10 sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-slate-900">
              {activeTab === 'feed' && 'Cộng Đồng Phụ Huynh'}
              {activeTab === 'report' && 'Hành Trình Của Trẻ'}
              {activeTab === 'progress' && 'Tiến Độ Học Tập'}
              {activeTab !== 'feed' && activeTab !== 'report' && activeTab !== 'progress' && 'Thông Tin'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 hide-scrollbar relative">
          {activeTab === 'feed' && (
            <div className="max-w-3xl mx-auto space-y-6">

              {/* Create Post */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex gap-4">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mom" className="size-12 rounded-full bg-slate-100 shrink-0" />
                  <div className="flex-1">
                    <textarea
                      placeholder="Chia sẻ khoảnh khắc học tập của bé..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-slate-700"
                      rows={3}
                    ></textarea>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-slate-500 hover:text-accent hover:bg-accent/10 rounded-full transition-colors">
                          <span className="material-symbols-outlined">image</span>
                        </button>
                        <button className="p-2 text-slate-500 hover:text-secondary hover:bg-secondary/10 rounded-full transition-colors">
                          <span className="material-symbols-outlined">sentiment_satisfied</span>
                        </button>
                      </div>
                      <button className="px-6 py-2 bg-accent text-white font-bold rounded-full shadow-md shadow-accent/20 hover:bg-accent/90 transition-colors">
                        Đăng Bài
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Posts Feed */}
              <div className="space-y-6">
                {/* Post 1 */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dad1" className="size-10 rounded-full bg-slate-100" />
                        <div>
                          <h4 className="font-bold text-slate-900">Bố Cún</h4>
                          <p className="text-xs text-slate-500">2 giờ trước • Lớp Mầm A1</p>
                        </div>
                      </div>
                      <button className="text-slate-400 hover:text-slate-600">
                        <span className="material-symbols-outlined">more_horiz</span>
                      </button>
                    </div>
                    <p className="text-slate-700 mb-4">
                      Hôm nay Cún nhà mình học bài "Vẽ Con Vật Từ Hình Tròn". Bé rất thích và tự vẽ được một chú ếch xanh siêu đáng yêu. Cảm ơn cô giáo đã hướng dẫn nhiệt tình! 🐸💚
                    </p>
                    <div className="rounded-xl overflow-hidden bg-slate-100 aspect-video relative">
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDaIlryGC20lqk0klJn6IV70aZ-Z04A9AtTQ8kQc9Hdst9P_20ROfWp5HV3ZWTjuS_2uwKj0SjHfNhaOowG29cwez_PIoskYtAnt_485XlLUdDqTzfrxp3xOWyZ_WSRNT7JqgBU5t5KKVjliU0HaWXthLTNnK_YrD82w1JmuGZZgri5oREbOtCARZ8RVY_7voN-_RTmNd-oLQ0meIkqp45nNn6A1pGhtOiKwifKS7cT_Dts5vbkgqdPVcd2Yvj2eLnxqX7cG2q0rXk")' }}></div>
                    </div>
                  </div>
                  <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between text-slate-500">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-rose-500 text-sm">favorite</span>
                      <span className="text-sm font-medium">24</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">5 bình luận</span>
                    </div>
                  </div>
                  <div className="px-6 py-3 border-t border-slate-100 flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium transition-colors">
                      <span className="material-symbols-outlined">favorite_border</span>
                      Thích
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium transition-colors">
                      <span className="material-symbols-outlined">chat_bubble_outline</span>
                      Bình luận
                    </button>
                  </div>
                </div>

                {/* Post 2 */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher1" className="size-10 rounded-full bg-secondary/20 border-2 border-secondary" />
                        <div>
                          <h4 className="font-bold text-slate-900 flex items-center gap-1">
                            Cô Lan <span className="material-symbols-outlined text-secondary text-sm" title="Giáo viên">verified</span>
                          </h4>
                          <p className="text-xs text-slate-500">5 giờ trước • Thông báo chung</p>
                        </div>
                      </div>
                      <button className="text-slate-400 hover:text-slate-600">
                        <span className="material-symbols-outlined">more_horiz</span>
                      </button>
                    </div>
                    <p className="text-slate-700 mb-4">
                      Quý phụ huynh thân mến, cuối tuần này trung tâm sẽ tổ chức buổi triển lãm tranh "Sắc Màu Tuổi Thơ" trưng bày các tác phẩm xuất sắc nhất tháng của các bé. Kính mời ba mẹ bớt chút thời gian đến tham dự và cổ vũ tinh thần cho các con nhé! 🎨✨
                    </p>
                    <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-4 flex items-center gap-4">
                      <div className="size-12 bg-secondary/20 text-secondary rounded-lg flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-2xl">event</span>
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900">Triển Lãm Tranh "Sắc Màu Tuổi Thơ"</h5>
                        <p className="text-sm text-slate-600">09:00 AM - Chủ Nhật, 15/10/2023</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between text-slate-500">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-rose-500 text-sm">favorite</span>
                      <span className="text-sm font-medium">45</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">12 bình luận</span>
                    </div>
                  </div>
                  <div className="px-6 py-3 border-t border-slate-100 flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium transition-colors">
                      <span className="material-symbols-outlined">favorite_border</span>
                      Thích
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium transition-colors">
                      <span className="material-symbols-outlined">chat_bubble_outline</span>
                      Bình luận
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="absolute inset-0 z-20">
              <ProgressView />
            </div>
          )}

          {activeTab === 'report' && (
            <div className="absolute inset-0 z-20">
              <ReportView />
            </div>
          )}

          {activeTab !== 'feed' && activeTab !== 'report' && activeTab !== 'progress' && (
            <div className="flex h-64 items-center justify-center text-slate-400 font-medium bg-white rounded-3xl border-2 border-dashed border-slate-200 max-w-3xl mx-auto">
              Tính năng đang được phát triển
            </div>
          )}

        </div>
      </main >
    </div >
  );
}
