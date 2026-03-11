import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keypresses if user is typing in an input or textarea
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;

      if (e.key === '1') {
        setIsMuted(false);
      } else if (e.key === '0') {
        setIsMuted(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="layout-container flex h-full grow flex-col bg-background-light text-slate-900 antialiased overflow-x-hidden">
      {/* Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 px-6 md:px-20 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/assets/logo/mainlogo.png" alt="Vẽ Tư Duy STEAM" className="h-10 w-auto object-contain" />
        </div>
        <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
          <nav className="flex items-center gap-8">
            <a className="text-slate-700 text-sm font-medium hover:text-primary transition-colors" href="#goals">Mục tiêu</a>
            <a className="text-slate-700 text-sm font-medium hover:text-primary transition-colors" href="#program">Chương trình</a>
            <a className="text-slate-700 text-sm font-medium hover:text-primary transition-colors" href="#audience">Đối tượng</a>
          </nav>
          <Link to="/login" className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-full h-10 px-5 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
            Đăng Nhập
          </Link>
        </div>
      </header>
      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="px-6 md:px-20 py-12 md:py-20 max-w-[1280px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8 order-2 lg:order-1">
              <div className="flex flex-col gap-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
                  <span className="material-symbols-outlined text-sm">auto_awesome</span> Giáo dục sáng tạo 4.0
                </span>
                <h1 className="text-slate-900 text-4xl md:text-6xl font-black leading-tight tracking-tight">
                  Phát Triển Tư Duy Sáng Tạo Qua <span className="text-primary">Vẽ</span> Và <span className="text-secondary">STEAM</span>
                </h1>
                <p className="text-slate-600 text-lg leading-relaxed max-w-[540px]">
                  Khám phá tiềm năng vô hạn của trẻ thông qua sự kết hợp độc đáo giữa nghệ thuật vẽ tư duy và giáo dục STEAM hiện đại, giúp trẻ hình thành thế giới quan đa chiều.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/login" className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-full h-14 px-6 bg-primary text-white text-base font-bold shadow-xl shadow-primary/25 hover:bg-primary/90 transition-all">
                  Đăng Nhập Để Tham Gia
                </Link>
                <a
                  href="https://www.facebook.com/profile.php?id=61583736567306"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-[150px] cursor-pointer items-center justify-center rounded-full h-14 px-6 bg-white border-2 border-slate-200 text-slate-900 text-base font-bold hover:bg-slate-50 transition-all"
                >
                  Tìm Hiểu Thêm
                </a>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="relative w-full aspect-square md:aspect-video rounded-xl bg-slate-200 shadow-2xl overflow-hidden group">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                >
                  <source src="/assets/video/intro.mp4" type="video/mp4" />
                </video>

                {/* Audio Status Overlay */}
                <div className="absolute top-4 left-4 z-40 bg-black/50 backdrop-blur-md rounded-full px-4 py-1.5 flex items-center gap-2 text-white border border-white/20 text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">
                    {isMuted ? 'volume_off' : 'volume_up'}
                  </span>
                  <span>{isMuted ? 'Bấm số 1: Bật tiếng' : 'Bấm số 0: Tắt tiếng'}</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur rounded-lg border border-white/20 z-20">
                  <p className="text-slate-900 font-bold italic">"Nơi nét vẽ dẫn lối tư duy logic và sáng tạo đột phá"</p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent rounded-full flex items-center justify-center text-white shadow-xl animate-bounce z-30">
                <span className="material-symbols-outlined text-4xl">emoji_objects</span>
              </div>
            </div>
          </div>
        </section>
        {/* Carousel Section (Featured Highlights) */}
        <section className="bg-slate-50 py-16">
          <div className="px-6 md:px-20 max-w-[1280px] mx-auto overflow-x-auto scrollbar-hide flex gap-6 pb-8">
            <div className="flex-none w-80 md:w-96 group">
              <div className="h-56 rounded-xl bg-slate-200 overflow-hidden mb-4 bg-cover bg-center shadow-lg" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDaIlryGC20lqk0klJn6IV70aZ-Z04A9AtTQ8kQc9Hdst9P_20ROfWp5HV3ZWTjuS_2uwKj0SjHfNhaOowG29cwez_PIoskYtAnt_485XlLUdDqTzfrxp3xOWyZ_WSRNT7JqgBU5t5KKVjliU0HaWXthLTNnK_YrD82w1JmuGZZgri5oREbOtCARZ8RVY_7voN-_RTmNd-oLQ0meIkqp45nNn6A1pGhtOiKwifKS7cT_Dts5vbkgqdPVcd2Yvj2eLnxqX7cG2q0rXk")' }}></div>
              <h3 className="text-xl font-bold text-slate-900">Học Qua Trò Chơi</h3>
              <p className="text-slate-600">Kết hợp chữ cái và màu sắc sinh động để trẻ dễ ghi nhớ.</p>
            </div>
            <div className="flex-none w-80 md:w-96 group">
              <div className="h-56 rounded-xl bg-slate-200 overflow-hidden mb-4 bg-cover bg-center shadow-lg" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDHU0g_XT6LW13-ODN1winAuTmVeTD8gTb50jb2spjvE7w6dGW7gCf_DZe_tBhRDF9ee3bRTRkurN_E2lEm-abcaWwowsIGD0KyEv3hcawx8ZMm9giv8Hshk1-0Al53X9I55QApLoYkBXFFopL4J7l7hquCaoaOwGszwD9RWscXenNVe5TnW1o_dvpKkuyPfqZvdqoIhDcaLjfZfosAhaUTHxHQ2GqE0tnZ39Qj1VMAJDROLCRApOTVD7cckyJ4YC9l3JEGOTNuZ8o")' }}></div>
              <h3 className="text-xl font-bold text-slate-900">Hợp Tác Nhóm</h3>
              <p className="text-slate-600">Phát triển kỹ năng giao tiếp và làm việc tập thể.</p>
            </div>
            <div className="flex-none w-80 md:w-96 group">
              <div className="h-56 rounded-xl bg-slate-200 overflow-hidden mb-4 bg-cover bg-center shadow-lg" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBXSbS4ZEbnkusa8nVs57hJ4J8qQdFwHJ8v_xZskElHLYN0c93TLLt_iHyClL4x-OYsKwVjhYX1tA7Y6A6Y15csUm7we25z0PgEEtNQsv3RL7nSJ1g9szwx2VsuJiY4viq_fZFTep-OLItuJu0vyE3fuTXKjJ5rV7eLsHgR_NQTL020klXh4G_G607hOAccE9v-rBS-r2M028z8ZRlWTrWOX8R3opaFUtLrvlBl8S72mq7b3VbZUoJw97LdP1TheFk7mu1s202Bh5I")' }}></div>
              <h3 className="text-xl font-bold text-slate-900">Tư Duy Hình Ảnh</h3>
              <p className="text-slate-600">Ghi nhớ kiến thức hiệu quả bằng sơ đồ tư duy trực quan.</p>
            </div>
          </div>
        </section>
        {/* Goals Section */}
        <section className="px-6 md:px-20 py-20 max-w-[1280px] mx-auto w-full" id="goals">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Mục tiêu chương trình</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Chúng tôi xây dựng nền tảng tư duy toàn diện, chuẩn bị hành trang cho thế hệ công dân toàn cầu tương lai.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-lg border border-slate-200 bg-white hover:shadow-xl hover:border-primary/30 transition-all flex flex-col gap-4">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl">palette</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Sáng tạo</h3>
              <p className="text-sm text-slate-600">Tự do thể hiện ý tưởng và cảm xúc qua từng nét vẽ độc bản.</p>
            </div>
            <div className="p-8 rounded-lg border border-slate-200 bg-white hover:shadow-xl hover:border-secondary/30 transition-all flex flex-col gap-4">
              <div className="size-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-3xl">psychology</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Tư duy logic</h3>
              <p className="text-sm text-slate-600">Sắp xếp thông tin khoa học thông qua cấu trúc sơ đồ thông minh.</p>
            </div>
            <div className="p-8 rounded-lg border border-slate-200 bg-white hover:shadow-xl hover:border-accent/30 transition-all flex flex-col gap-4">
              <div className="size-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <span className="material-symbols-outlined text-3xl">front_hand</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Kỹ năng vận động</h3>
              <p className="text-sm text-slate-600">Rèn luyện sự khéo léo của đôi tay và sự phối hợp tay - mắt.</p>
            </div>
            <div className="p-8 rounded-lg border border-slate-200 bg-white hover:shadow-xl hover:border-primary/30 transition-all flex flex-col gap-4">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl">biotech</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Kiến thức STEAM</h3>
              <p className="text-sm text-slate-600">Tiếp cận Khoa học, Công nghệ và Toán học một cách tự nhiên.</p>
            </div>
          </div>
        </section>
        {/* 6 Program Modules Timeline */}
        <section className="bg-slate-900 text-white py-20 px-6 md:px-20 overflow-hidden relative" id="program">
          <div className="max-w-[1280px] mx-auto w-full relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-16 text-center">Lộ trình 6 học phần phát triển</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="relative pl-12 before:content-['1'] before:absolute before:left-0 before:top-0 before:size-8 before:bg-primary before:rounded-full before:flex before:items-center before:justify-center before:font-bold">
                <h4 className="text-xl font-bold text-primary mb-2">Khám Phá Sắc Màu</h4>
                <p className="text-slate-400">Làm quen với các công cụ hội họa cơ bản và nhận diện bảng màu STEAM.</p>
              </div>
              <div className="relative pl-12 before:content-['2'] before:absolute before:left-0 before:top-0 before:size-8 before:bg-secondary before:rounded-full before:flex before:items-center before:justify-center before:font-bold">
                <h4 className="text-xl font-bold text-secondary mb-2">Hình Khối Logic</h4>
                <p className="text-slate-400">Học cách liên tưởng vật thể thực tế qua các hình khối hình học cơ bản.</p>
              </div>
              <div className="relative pl-12 before:content-['3'] before:absolute before:left-0 before:top-0 before:size-8 before:bg-accent before:rounded-full before:flex before:items-center before:justify-center before:font-bold">
                <h4 className="text-xl font-bold text-accent mb-2">Sơ Đồ Kết Nối</h4>
                <p className="text-slate-400">Xây dựng sơ đồ tư duy (Mind-map) đơn giản từ những từ khóa chủ đề.</p>
              </div>
              <div className="relative pl-12 before:content-['4'] before:absolute before:left-0 before:top-0 before:size-8 before:bg-primary before:rounded-full before:flex before:items-center before:justify-center before:font-bold">
                <h4 className="text-xl font-bold text-primary mb-2">Kỹ Sư Nhí</h4>
                <p className="text-slate-400">Vẽ thiết kế và mô phỏng các công trình kỹ thuật đơn giản từ vật liệu tái chế.</p>
              </div>
              <div className="relative pl-12 before:content-['5'] before:absolute before:left-0 before:top-0 before:size-8 before:bg-secondary before:rounded-full before:flex before:items-center before:justify-center before:font-bold">
                <h4 className="text-xl font-bold text-secondary mb-2">Thế Giới Tự Nhiên</h4>
                <p className="text-slate-400">Ứng dụng vẽ tư duy để tìm hiểu về vòng đời sinh vật và hệ sinh thái.</p>
              </div>
              <div className="relative pl-12 before:content-['6'] before:absolute before:left-0 before:top-0 before:size-8 before:bg-accent before:rounded-full before:flex before:items-center before:justify-center before:font-bold">
                <h4 className="text-xl font-bold text-accent mb-2">Sáng Tạo Đột Phá</h4>
                <p className="text-slate-400">Dự án cuối khóa: Tự tạo nên một câu chuyện STEAM qua nét vẽ cá nhân.</p>
              </div>
            </div>
          </div>
        </section>
        {/* Target Audience */}
        <section className="px-6 md:px-20 py-20 max-w-[1280px] mx-auto w-full" id="audience">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Đối tượng tham gia</h2>
            <p className="text-slate-600">Chúng tôi phân chia lộ trình phù hợp với từng giai đoạn phát triển của trẻ.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-primary/5 rounded-xl p-8 border-t-4 border-primary text-center group hover:bg-primary/10 transition-colors">
              <div className="text-primary mb-6"><span className="material-symbols-outlined text-6xl">child_care</span></div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Lớp Mầm</h3>
              <span className="text-slate-500 block mb-4">3 - 4 Tuổi</span>
              <p className="text-slate-600">Khơi gợi cảm xúc qua màu sắc và các nét vẽ tự do đầu đời.</p>
            </div>
            <div className="bg-secondary/5 rounded-xl p-8 border-t-4 border-secondary text-center group hover:bg-secondary/10 transition-colors">
              <div className="text-secondary mb-6"><span className="material-symbols-outlined text-6xl">face_6</span></div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Lớp Chồi</h3>
              <span className="text-slate-500 block mb-4">4 - 5 Tuổi</span>
              <p className="text-slate-600">Phát triển khả năng quan sát và tái hiện hình ảnh theo chủ đề.</p>
            </div>
            <div className="bg-accent/5 rounded-xl p-8 border-t-4 border-accent text-center group hover:bg-accent/10 transition-colors">
              <div className="text-accent mb-6"><span className="material-symbols-outlined text-6xl">school</span></div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Lớp Lá</h3>
              <span className="text-slate-500 block mb-4">5 - 6 Tuổi</span>
              <p className="text-slate-600">Rèn luyện tư duy logic, lập sơ đồ và kể chuyện qua hình vẽ.</p>
            </div>
          </div>
        </section>
        {/* Final CTA */}
        <section className="px-6 md:px-20 pb-20 max-w-[1280px] mx-auto w-full">
          <div className="bg-primary rounded-xl p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-20"><span className="material-symbols-outlined text-9xl">rocket_launch</span></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-6">Sẵn sàng khai phá tiềm năng?</h2>
              <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">Đăng ký ngay hôm nay để nhận lộ trình học tập cá nhân hóa cho con bạn và bộ quà tặng họa cụ STEAM khởi đầu.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-white text-primary font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:scale-105 transition-transform">Bắt đầu ngay</button>
                <button className="bg-primary-dark/20 border-2 border-white text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-white/10 transition-colors">Tư vấn miễn phí</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-slate-50 px-6 md:px-20 py-12 border-t border-slate-200">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <img src="/assets/logo/mainlogo.png" alt="Vẽ Tư Duy STEAM" className="h-8 w-auto object-contain" />
          </div>
          <div className="text-slate-500 text-sm">
            © 2026 Vẽ Tư Duy STEAM Program. Tất cả quyền được bảo lưu.
          </div>
          <div className="flex gap-6">
            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">social_leaderboard</span></a>
            <a className="text-slate-400 hover:text-secondary transition-colors" href="#"><span className="material-symbols-outlined">video_library</span></a>
            <a className="text-slate-400 hover:text-accent transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
