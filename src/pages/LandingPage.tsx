import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const HeroScene3D = React.lazy(() => import('../components/HeroScene3D'));

export default function LandingPage() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll animations for each section
  const heroAnim = useScrollAnimation({ threshold: 0.1 });
  const carouselAnim = useScrollAnimation({ threshold: 0.1 });
  const goalsAnim = useScrollAnimation({ threshold: 0.1 });
  const audienceAnim = useScrollAnimation({ threshold: 0.1 });
  const teamAnim = useScrollAnimation({ threshold: 0.1 });
  const ctaAnim = useScrollAnimation({ threshold: 0.1 });


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      if (e.key === '1') setIsMuted(false);
      else if (e.key === '0') setIsMuted(true);
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
    <div className="layout-container flex h-full grow flex-col bg-background-light text-slate-900 antialiased overflow-x-hidden font-display">
      {/* Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 px-6 md:px-20 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/assets/logo/mainlogo.png" alt="KidFit Logo" className="h-10 w-auto object-contain" />
          <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-tight">Trạng Nguyên Kids 4.0</h2>
        </div>
        <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
          <nav className="flex items-center gap-8">
            <a className="text-slate-700 text-sm font-medium hover:text-primary transition-colors" href="#goals">Trang Chủ</a>
            <a className="text-slate-700 text-sm font-medium hover:text-primary transition-colors" href="#program">Giải Pháp</a>
            <a className="text-slate-700 text-sm font-medium hover:text-primary transition-colors" href="#audience">Lộ Trình</a>
            <a className="text-slate-700 text-sm font-medium hover:text-primary transition-colors" href="#team">Liên Hệ</a>
            <Link to="/ai" className="text-slate-700 text-sm font-medium hover:text-primary transition-colors">Trải Nghiệm AI</Link>
          </nav>
          <Link to="/login" className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-full h-10 px-5 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
            Đăng Nhập
          </Link>
        </div>
      </header>

      <main className="flex flex-col">
        {/* Hero Section with 3D Scene */}
        <section ref={heroAnim.ref} className="px-6 md:px-20 py-12 md:py-20 max-w-[1280px] mx-auto w-full relative">
          {/* 3D Background Scene */}
          <Suspense fallback={null}>
            <HeroScene3D />
          </Suspense>

          {/* Floating decorative shapes */}
          <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-primary/10 floating-shape-1 hidden md:block" />
          <div className="absolute bottom-20 right-20 w-10 h-10 rounded-lg bg-accent/15 floating-shape-2 rotate-45 hidden md:block" />
          <div className="absolute top-1/3 right-10 w-6 h-6 rounded-full bg-secondary/15 floating-shape-1 hidden md:block" style={{ animationDelay: '2s' }} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className={`flex flex-col gap-8 order-2 lg:order-1 ${heroAnim.isVisible ? '' : 'anim-hidden'}`}>
              <div className="flex flex-col gap-4">
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit ${heroAnim.isVisible ? 'anim-fadeInUp3D' : ''}`}>
                  <span className="material-symbols-outlined text-sm">auto_awesome</span> Giáo dục sáng tạo 4.0
                </span>
                <h1 className={`text-slate-900 text-4xl md:text-6xl font-black leading-tight tracking-tight ${heroAnim.isVisible ? 'anim-fadeInUp3D anim-delay-1' : ''}`}>
                  Trạng Nguyên Kids 4.0 - <span className="text-primary">Hệ Điều Hành</span> Quản Trị Giáo Dục Tương Lai
                </h1>
                <p className={`text-slate-600 text-lg leading-relaxed max-w-[540px] ${heroAnim.isVisible ? 'anim-fadeInUp3D anim-delay-2' : ''}`}>
                  Không chỉ là sân chơi công nghệ cho trẻ. Chúng tôi kiến tạo một hệ sinh thái EdTech toàn diện: Tự động hóa thiết kế giáo án cho Giáo viên, Quản trị học liệu tập trung cho Nhà trường, và Cá nhân hóa năng lực cho từng mầm non.
                </p>
              </div>
              <div className={`flex flex-wrap gap-4 ${heroAnim.isVisible ? 'anim-fadeInUp3D anim-delay-3' : ''}`}>
                <Link to="/login" className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-full h-14 px-6 bg-primary text-white text-base font-bold shadow-xl shadow-primary/25 hover:bg-primary/90 hover:scale-105 transition-all">
                  Đăng Nhập Để Tham Gia
                </Link>
                <a href="https://www.facebook.com/profile.php?id=61583736567306&notif_id=1772859685733015&notif_t=follower_invite&ref=notif" target="_blank" rel="noopener noreferrer" className="flex min-w-[150px] cursor-pointer items-center justify-center rounded-full h-14 px-6 bg-white border-2 border-slate-200 text-slate-900 text-base font-bold hover:bg-slate-50 hover:scale-105 transition-all">
                  Tìm Hiểu Thêm
                </a>
              </div>
            </div>
            <div className={`relative order-1 lg:order-2 ${heroAnim.isVisible ? 'anim-fadeInRight3D anim-delay-2' : 'anim-hidden'}`}>
              <div className="w-full aspect-square md:aspect-video rounded-xl bg-slate-200 relative shadow-2xl overflow-hidden group">
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  src="/assets/video/intro.mp4"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent rounded-full flex items-center justify-center text-white shadow-xl animate-bounce">
                <span className="material-symbols-outlined text-4xl">emoji_objects</span>
              </div>
            </div>
          </div>
        </section>



        {/* Goals Section */}
        <section ref={goalsAnim.ref} className="px-6 md:px-20 py-20 max-w-[1280px] mx-auto w-full" id="goals">
          <div className={`mb-12 ${goalsAnim.isVisible ? 'anim-fadeInUp3D' : 'anim-hidden'}`}>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">Hệ Sinh Thái EdTech & Giải Pháp Quản Trị</h2>
            <div className="w-24 h-1.5 bg-[#186A3B] mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: 'domain', title: 'Quản Trị Nhà Trường (B2B)', desc: 'Tập trung hóa dữ liệu nhân sự, cơ sở vật chất, và chỉ số vận hành trên một Dashboard.', highlight: false, iconColor: 'text-amber-500' },
                { icon: 'smart_toy', title: 'AI Copilot Giáo Viên', desc: 'Từ một từ khóa, AI sinh ra chuỗi hoạt động STEAM và giáo án chi tiết trong 30 giây.', highlight: false, iconColor: 'text-[#186A3B]' },
                { icon: 'insights', title: 'Edu-Analytics (Báo cáo)', desc: 'Báo cáo chỉ số ẩn không qua điểm số mà thông qua thao tác tương tác của trẻ với nền tảng.', highlight: false, iconColor: 'text-blue-600' },
                { icon: 'auto_awesome', title: 'AI Magic Story (B2C)', desc: 'Nét vẽ phác thảo của trẻ được Diffuson AI tạo thành thế giới 3D tương tác chuẩn Pixar.', highlight: false, iconColor: 'text-purple-600' },
                { icon: 'groups', title: 'Cổng Liên Kết Phụ Huynh', desc: 'Cung cấp "Hồ sơ Năng lực Ẩn" giúp phụ huynh thấu hiểu thiên hướng bẩm sinh của bé.', highlight: false, iconColor: 'text-orange-500' },
                { icon: 'extension', title: 'Mở Rộng API (Tương lai)', desc: 'Tích hợp mượt mà (Plug-in) với hệ thống quản lý dữ liệu sẵn có của các Sở Giáo dục.', highlight: false, iconColor: 'text-slate-600' },
              ].map((feature, i) => (
                <div key={i} className={`relative flex flex-col gap-3 p-8 rounded-[24px] bg-white transition-all duration-300 z-0 ${feature.highlight ? 'border border-[#186A3B]/30' : 'shadow-sm hover:shadow-md border border-slate-100'} ${goalsAnim.isVisible ? `anim-fadeInUp3D anim-delay-${i + 1}` : 'anim-hidden'}`}>
                  {feature.highlight && (
                    <div className="absolute inset-0 bg-[#186A3B] -z-10 rounded-[24px] translate-y-2 -translate-x-2"></div>
                  )}
                  <div className="mb-2">
                    <span className={`material-symbols-outlined text-3xl font-light ${feature.iconColor}`}>
                      {feature.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">{feature.desc}</p>
                </div>
              ))}
            </div>

            <div className={`col-span-1 bg-[#186A3B] relative rounded-[32px] overflow-hidden shadow-2xl flex flex-col ${goalsAnim.isVisible ? 'anim-fadeInRight3D anim-delay-3' : 'anim-hidden'}`}>
              <div className="absolute inset-0 bg-black/5 z-0"></div>

              <div className="relative z-10 p-10 flex flex-col h-full gap-8">
                <div>
                  <h3 className="text-3xl font-bold leading-tight text-white mb-6">Tại Sao Chúng Tôi Xây Dựng Dự Án Này?</h3>
                  <p className="text-white/90 text-sm leading-relaxed font-medium">
                    Sống trong thời đại AI, nhà giáo vẫn đang kiệt sức với sổ sách và chứng từ. Sáu sinh viên FPT khát khao mang mô hình Quản trị SaaS kết hợp công nghệ Lõi AI (Gemini, DALL-E) để giải phóng "thời gian sư phạm". Mọi tương tác của trẻ em giờ đây đều trở thành "Dữ liệu tri thức" vô giá.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-y-10 gap-x-6 mt-auto">
                  <div>
                    <div className="text-4xl font-black text-white mb-2">3+</div>
                    <div className="text-white/80 text-xs font-semibold">Bảng điều khiển riêng biệt</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">40+</div>
                    <div className="text-white/80 text-xs font-semibold">Tính năng độc bản</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">6</div>
                    <div className="text-white/80 text-xs font-semibold">Thành viên sáng lập</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">AI</div>
                    <div className="text-white/80 text-xs font-semibold">Tích hợp sâu Gemini</div>
                  </div>
                </div>

                <div className="absolute -bottom-16 -right-10 text-white/5 pointer-events-none">
                  <span className="material-symbols-outlined" style={{ fontSize: '220px' }}>school</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section ref={teamAnim.ref} className="relative py-20 px-6 md:px-20 bg-gradient-to-b from-[#E0F2FE] via-[#FDF2F8] to-[#FFF7ED] overflow-hidden" id="team">
          {/* Floating decorations */}
          <div className="absolute top-16 right-16 w-12 h-12 rounded-full bg-blue-200/40 floating-shape-1 hidden md:block" />
          <div className="absolute bottom-20 left-10 w-8 h-8 rounded-full bg-pink-200/40 floating-shape-2 hidden md:block" />

          <div className="relative z-10 max-w-[1280px] mx-auto">
            <div className={`text-center mb-16 space-y-4 ${teamAnim.isVisible ? 'anim-fadeInUp3D' : 'anim-hidden'}`}>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-wide">
                Gặp gỡ đội ngũ Trạng Nguyên Kids 4.0<br className="hidden md:block" /> Những người khơi dậy tư duy bé yêu!
              </h2>
              <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 font-medium opacity-80">
                Đội ngũ trẻ trung, đam mê giáo dục, thiết kế sáng tạo &amp; công nghệ để giúp trẻ phát triển tư duy toàn diện với các tính năng AI thú vị.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[
                { name: 'Thái Hoàng Huân', role: 'Leader & Developer', roleColor: 'text-kidfitBlue', borderColor: 'border-kidfitBlue', imgBg: 'bg-blue-50', img: '/assets/picture/huan.jpg', desc: 'Dẫn dắt KidFit với niềm đam mê xây dựng giáo dục sáng tạo. Chịu trách nhiệm thiết kế và phát triển nền tảng số.' },
                { name: 'Lương Hoàng Minh Thư', role: 'Creative Strategist', roleColor: 'text-kidfitOrange', borderColor: 'border-kidfitOrange', imgBg: 'bg-orange-50', img: '/assets/picture/thu.png', desc: 'Chuyên gia thiết kế bộ thẻ tư duy và học liệu. Biến những khái niệm STEAM khó khăn thành các hoạt động trực quan, sinh động và phù hợp với trẻ mầm non.' },
                { name: 'Nguyễn Ngọc Thảo Vy', role: 'Research & Finance', roleColor: 'text-kidfitPink', borderColor: 'border-kidfitPink', imgBg: 'bg-pink-50', img: '/assets/picture/vy.png', desc: 'Chịu trách nhiệm nghiên cứu thị trường, phân tích nhu cầu phụ huynh và xây dựng mô hình tài chính bền vững. Đồng thời hỗ trợ soạn thảo nội dung và tài liệu dự án KidFit.' },
                { name: 'Lê Nguyễn Hải Đăng', role: 'Content Specialist', roleColor: 'text-kidfitGreen', borderColor: 'border-kidfitGreen', imgBg: 'bg-green-50', img: '/assets/picture/dang.jpg', desc: 'Chuyên gia phát triển web và hệ thống backend. Xây dựng nền tảng KidFit ổn định, thân thiện và dễ sử dụng cho cả giáo viên lẫn phụ huynh.' },
                { name: 'Lâm Gia Huy', role: 'Operations Manager', roleColor: 'text-kidfitPurple', borderColor: 'border-kidfitPurple', imgBg: 'bg-purple-50', img: '/assets/picture/huy.jpg', desc: 'Người tạo ra bộ 36 thẻ tư duy độc quyền của KidFit. Chịu trách nhiệm thiết kế hình ảnh, bố cục và phong cách visual giúp trẻ dễ tiếp nhận và hứng thú học tập.' },
                { name: 'Phạm Vũ Khang', role: 'Content & Operations', roleColor: 'text-kidfitBlue', borderColor: 'border-kidfitBlue', imgBg: 'bg-blue-50', img: '/assets/picture/khang.png', desc: 'Hỗ trợ xây dựng nội dung chương trình, tài liệu hướng dẫn và quy trình vận hành. Đảm bảo các hoạt động của KidFit diễn ra suôn sẻ và nhất quán về chất lượng.' },
              ].map((member, i) => (
                <div key={i} className={`bg-white rounded-3xl p-8 shadow-sm hover:-translate-y-2 transition-all duration-300 border-b-8 ${member.borderColor} tilt-3d ${teamAnim.isVisible ? `anim-scaleIn3D anim-delay-${i + 1}` : 'anim-hidden'}`}>
                  <div className={`w-40 h-40 mx-auto ${member.imgBg} rounded-full overflow-hidden border-4 ${member.borderColor} mb-6 p-1`}>
                    <img alt={member.name} className="w-full h-full object-cover rounded-full" src={member.img} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 text-center">{member.name}</h3>
                  <p className={`${member.roleColor} font-semibold text-center mb-4 uppercase text-xs tracking-widest`}>{member.role}</p>
                  <p className="text-slate-600 text-sm text-center">{member.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>



      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8 px-6 md:px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <img alt="KidsFit STEAM Logo" className="h-12 object-contain" src="/assets/logo/mainlogo.png" />
                <h3 className="text-slate-1200 font-black text-xl">Trạng Nguyên Kids 4.0</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                "Nơi công nghệ không thay thế trái tim, mà là đôi cánh cho trí tuệ mầm non. Trạng Nguyên Kids 4.0 không chỉ là một ứng dụng – đó là một cuộc cách mạng giáo dục. Chúng tôi kiến tạo một hệ sinh thái EdTech toàn diện, nơi mỗi nét vẽ phác thảo của trẻ đều có thể trở thành kỳ quan 3D sống động, và mỗi bài giảng của thầy cô đều được thăng hoa nhờ sức mạnh từ trí tuệ nhân tạo."
              </p>
            </div>
            <div>
              <h4 className="text-slate-900 font-bold mb-6">Liên kết</h4>
              <ul className="flex flex-col gap-4 text-sm text-slate-600">
                <li><a href="#" className="hover:text-primary transition-colors">Trang chủ</a></li>
                <li><a href="#goals" className="hover:text-primary transition-colors">Mục tiêu</a></li>
                <li><a href="#program" className="hover:text-primary transition-colors">Lộ trình</a></li>
                <li><a href="#team" className="hover:text-primary transition-colors">Đội ngũ</a></li>
              </ul>

            </div>
            <div>
              <h4 className="text-slate-900 font-bold mb-6">Liên hệ</h4>
              <ul className="flex flex-col gap-4 text-sm text-slate-600">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-lg">location_on</span> Cần Thơ, Việt Nam</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-lg">call</span> 0961372222</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-lg">mail</span> kidfit@gmail.com</li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-bold mb-6">Chính sách</h4>
              <ul className="flex flex-col gap-4 text-sm text-slate-600">
                <li><a href="#" className="hover:text-primary transition-colors">Bảo mật dữ liệu</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Điều khoản dịch vụ</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 text-center">
            <p className="text-slate-500 text-xs">© 2026 Trạng Nguyên Kids 4.0. Tất cả quyền được bảo hộ.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
