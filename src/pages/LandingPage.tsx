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
  const timelineAnim = useScrollAnimation({ threshold: 0.1 });
  const audienceAnim = useScrollAnimation({ threshold: 0.1 });
  const teamAnim = useScrollAnimation({ threshold: 0.1 });
  const supportAnim = useScrollAnimation({ threshold: 0.1 });
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
          <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-tight">Vẽ Tư Duy STEAM</h2>
        </div>
        <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
          <nav className="flex items-center gap-8">
            <a className="text-slate-700 text-sm font-medium hover:text-primary transition-colors" href="#goals">Mục tiêu</a>
            <a className="text-slate-700 text-sm font-medium hover:text-primary transition-colors" href="#program">Chương trình</a>
            <a className="text-slate-700 text-sm font-medium hover:text-primary transition-colors" href="#audience">Đối tượng</a>
            <a className="text-slate-700 text-sm font-medium hover:text-primary transition-colors" href="#team">Đội ngũ</a>
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
                  Phát Triển Tư Duy Sáng Tạo Qua <span className="text-primary">Vẽ</span> Và <span className="text-secondary">STEAM</span>
                </h1>
                <p className={`text-slate-600 text-lg leading-relaxed max-w-[540px] ${heroAnim.isVisible ? 'anim-fadeInUp3D anim-delay-2' : ''}`}>
                  Khám phá tiềm năng vô hạn của trẻ thông qua sự kết hợp độc đáo giữa nghệ thuật vẽ tư duy và giáo dục STEAM hiện đại, giúp trẻ hình thành thế giới quan đa chiều.
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur rounded-lg border border-white/20 pointer-events-none">
                  <p className="text-slate-900 font-bold italic">"Nơi nét vẽ dẫn lối tư duy logic và sáng tạo đột phá"</p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent rounded-full flex items-center justify-center text-white shadow-xl animate-bounce">
                <span className="material-symbols-outlined text-4xl">emoji_objects</span>
              </div>
            </div>
          </div>
        </section>

        {/* Carousel Section */}
        <section ref={carouselAnim.ref} className="bg-slate-50 py-16">
          <div className="px-6 md:px-20 max-w-[1280px] mx-auto overflow-x-auto scrollbar-hide flex gap-6 pb-8">
            {[
              { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaIlryGC20lqk0klJn6IV70aZ-Z04A9AtTQ8kQc9Hdst9P_20ROfWp5HV3ZWTjuS_2uwKj0SjHfNhaOowG29cwez_PIoskYtAnt_485XlLUdDqTzfrxp3xOWyZ_WSRNT7JqgBU5t5KKVjliU0HaWXthLTNnK_YrD82w1JmuGZZgri5oREbOtCARZ8RVY_7voN-_RTmNd-oLQ0meIkqp45nNn6A1pGhtOiKwifKS7cT_Dts5vbkgqdPVcd2Yvj2eLnxqX7cG2q0rXk', title: 'Học Qua Trò Chơi', desc: 'Kết hợp chữ cái và màu sắc sinh động để trẻ dễ ghi nhớ.' },
              { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHU0g_XT6LW13-ODN1winAuTmVeTD8gTb50jb2spjvE7w6dGW7gCf_DZe_tBhRDF9ee3bRTRkurN_E2lEm-abcaWwowsIGD0KyEv3hcawx8ZMm9giv8Hshk1-0Al53X9I55QApLoYkBXFFopL4J7l7hquCaoaOwGszwD9RWscXenNVe5TnW1o_dvpKkuyPfqZvdqoIhDcaLjfZfosAhaUTHxHQ2GqE0tnZ39Qj1VMAJDROLCRApOTVD7cckyJ4YC9l3JEGOTNuZ8o', title: 'Hợp Tác Nhóm', desc: 'Phát triển kỹ năng giao tiếp và làm việc tập thể.' },
              { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXSbS4ZEbnkusa8nVs57hJ4J8qQdFwHJ8v_xZskElHLYN0c93TLLt_iHyClL4x-OYsKwVjhYX1tA7Y6A6Y15csUm7we25z0PgEEtNQsv3RL7nSJ1g9szwx2VsuJiY4viq_fZFTep-OLItuJu0vyE3fuTXKjJ5rV7eLsHgR_NQTL020klXh4G_G607hOAccE9v-rBS-r2M028z8ZRlWTrWOX8R3opaFUtLrvlBl8S72mq7b3VbZUoJw97LdP1TheFk7mu1s202Bh5I', title: 'Tư Duy Hình Ảnh', desc: 'Ghi nhớ kiến thức hiệu quả bằng sơ đồ tư duy trực quan.' },
            ].map((item, i) => (
              <div key={i} className={`flex-none w-80 md:w-96 group tilt-3d ${carouselAnim.isVisible ? `anim-fadeInUp3D anim-delay-${i + 1}` : 'anim-hidden'}`}>
                <div className="h-56 rounded-xl bg-slate-200 overflow-hidden mb-4 bg-cover bg-center shadow-lg group-hover:shadow-2xl transition-shadow" style={{ backgroundImage: `url("${item.img}")` }}></div>
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Goals Section */}
        <section ref={goalsAnim.ref} className="px-6 md:px-20 py-20 max-w-[1280px] mx-auto w-full" id="goals">
          <div className={`text-center mb-16 ${goalsAnim.isVisible ? 'anim-fadeInUp3D' : 'anim-hidden'}`}>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Mục tiêu chương trình</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Chúng tôi xây dựng nền tảng tư duy toàn diện, chuẩn bị hành trang cho thế hệ công dân toàn cầu tương lai.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'palette', title: 'Sáng tạo', desc: 'Tự do thể hiện ý tưởng và cảm xúc qua từng nét vẽ độc bản.', borderHover: 'hover:border-primary/30', iconBg: 'bg-primary/10', iconColor: 'text-primary' },
              { icon: 'psychology', title: 'Tư duy logic', desc: 'Sắp xếp thông tin khoa học thông qua cấu trúc sơ đồ thông minh.', borderHover: 'hover:border-secondary/30', iconBg: 'bg-secondary/10', iconColor: 'text-secondary' },
              { icon: 'front_hand', title: 'Kỹ năng vận động', desc: 'Rèn luyện sự khéo léo của đôi tay và sự phối hợp tay - mắt.', borderHover: 'hover:border-accent/30', iconBg: 'bg-accent/10', iconColor: 'text-accent' },
              { icon: 'biotech', title: 'Kiến thức STEAM', desc: 'Tiếp cận Khoa học, Công nghệ và Toán học một cách tự nhiên.', borderHover: 'hover:border-primary/30', iconBg: 'bg-primary/10', iconColor: 'text-primary' },
            ].map((goal, i) => (
              <div key={i} className={`p-8 rounded-lg border border-slate-200 bg-white ${goal.borderHover} hover:shadow-xl transition-all flex flex-col gap-4 tilt-3d ${goalsAnim.isVisible ? `anim-scaleIn3D anim-delay-${i + 1}` : 'anim-hidden'}`}>
                <div className={`size-12 rounded-full ${goal.iconBg} flex items-center justify-center ${goal.iconColor}`}>
                  <span className="material-symbols-outlined text-3xl">{goal.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{goal.title}</h3>
                <p className="text-sm text-slate-600">{goal.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section ref={timelineAnim.ref} className="bg-slate-900 text-white py-20 px-6 md:px-20 overflow-hidden relative" id="program">
          {/* Floating decorations */}
          <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10 floating-shape-1 hidden md:block" />
          <div className="absolute bottom-10 right-16 w-14 h-14 rounded-full bg-secondary/10 floating-shape-2 hidden md:block" />
          <div className="absolute top-1/2 right-1/4 w-8 h-8 rounded-full bg-accent/10 floating-shape-1 hidden md:block" style={{ animationDelay: '3s' }} />

          <div className="max-w-[1280px] mx-auto w-full relative z-10">
            <h2 className={`text-3xl md:text-5xl font-black mb-16 text-center ${timelineAnim.isVisible ? 'anim-fadeInUp3D' : 'anim-hidden'}`}>Lộ trình 6 học phần phát triển</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { id: 1, title: 'Khám Phá Sắc Màu', desc: 'Làm quen với các công cụ hội họa cơ bản và nhận diện bảng màu STEAM.', color: 'bg-primary' },
                { id: 2, title: 'Hình Khối Logic', desc: 'Học cách liên tưởng vật thể thực tế qua các hình khối hình học cơ bản.', color: 'bg-secondary' },
                { id: 3, title: 'Sơ Đồ Kết Nối', desc: 'Xây dựng sơ đồ tư duy (Mind-map) đơn giản từ những từ khóa chủ đề.', color: 'bg-accent' },
                { id: 4, title: 'Kỹ Sư Nhí', desc: 'Vẽ thiết kế và mô phỏng các công trình kỹ thuật đơn giản từ vật liệu tái chế.', color: 'bg-primary' },
                { id: 5, title: 'Thế Giới Tự Nhiên', desc: 'Ứng dụng vẽ tư duy để tìm hiểu về vòng đời sinh vật và hệ sinh thái.', color: 'bg-secondary' },
                { id: 6, title: 'Sáng Tạo Đột Phá', desc: 'Dự án cuối khóa: Tự tạo nên một câu chuyện STEAM qua nét vẽ cá nhân.', color: 'bg-accent' },
              ].map(module => (
                <div key={module.id} className={`relative pl-12 ${timelineAnim.isVisible ? `anim-fadeInLeft3D anim-delay-${module.id}` : 'anim-hidden'}`}>
                  <span className={`absolute left-0 top-0 size-8 ${module.color} rounded-full flex items-center justify-center font-bold text-white`}>{module.id}</span>
                  <h4 className={`text-xl font-bold ${module.color.replace('bg-', 'text-')} mb-2`}>{module.title}</h4>
                  <p className="text-slate-400">{module.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audience Section */}
        <section ref={audienceAnim.ref} className="px-6 md:px-20 py-20 max-w-[1280px] mx-auto w-full" id="audience">
          <div className={`text-center mb-16 ${audienceAnim.isVisible ? 'anim-fadeInUp3D' : 'anim-hidden'}`}>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Đối tượng tham gia</h2>
            <p className="text-slate-600">Chúng tôi phân chia lộ trình phù hợp với từng giai đoạn phát triển của trẻ.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { bgClass: 'bg-primary/5', borderClass: 'border-primary', hoverClass: 'hover:bg-primary/10', iconColor: 'text-primary', icon: 'child_care', title: 'Lớp Mầm', age: '3 - 4 Tuổi', desc: 'Khơi gợi cảm xúc qua màu sắc và các nét vẽ tự do đầu đời.' },
              { bgClass: 'bg-secondary/5', borderClass: 'border-secondary', hoverClass: 'hover:bg-secondary/10', iconColor: 'text-secondary', icon: 'face_6', title: 'Lớp Chồi', age: '4 - 5 Tuổi', desc: 'Phát triển khả năng quan sát và tái hiện hình ảnh theo chủ đề.' },
              { bgClass: 'bg-accent/5', borderClass: 'border-accent', hoverClass: 'hover:bg-accent/10', iconColor: 'text-accent', icon: 'school', title: 'Lớp Lá', age: '5 - 6 Tuổi', desc: 'Rèn luyện tư duy logic, lập sơ đồ và kể chuyện qua hình vẽ.' },
            ].map((item, i) => (
              <div key={i} className={`${item.bgClass} rounded-xl p-8 border-t-4 ${item.borderClass} text-center group ${item.hoverClass} transition-colors tilt-3d ${audienceAnim.isVisible ? `anim-fadeInUp3D anim-delay-${i + 1}` : 'anim-hidden'}`}>
                <div className={`${item.iconColor} mb-6`}><span className="material-symbols-outlined text-6xl">{item.icon}</span></div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <span className="text-slate-500 block mb-4">{item.age}</span>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
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
                Gặp gỡ đội ngũ KidFit – <br className="hidden md:block" /> Những người khơi dậy tư duy bé yêu!
              </h2>
              <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 font-medium opacity-80">
                Đội ngũ trẻ trung, đam mê giáo dục mầm non, thiết kế sáng tạo &amp; công nghệ để giúp trẻ phát triển tư duy qua vẽ &amp; STEAM.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[
                { name: 'Thái Hoàng Huân', role: 'Leader & Developer', roleColor: 'text-kidfitBlue', borderColor: 'border-kidfitBlue', imgBg: 'bg-blue-50', img: '/assets/picture/huan.jpg', desc: 'Dẫn dắt KidFit với niềm đam mê xây dựng giáo dục sáng tạo. Chịu trách nhiệm thiết kế và phát triển nền tảng số.' },
                { name: 'Lương Hoàng Minh Thư', role: 'Creative Strategist', roleColor: 'text-kidfitOrange', borderColor: 'border-kidfitOrange', imgBg: 'bg-orange-50', img: '/assets/picture/thu.png', desc: 'Chuyên gia thiết kế bộ thẻ tư duy và học liệu. Biến những khái niệm STEAM khó khăn thành các hoạt động trực quan, sinh động và phù hợp với trẻ mầm non.' },
                { name: 'Nguyễn Ngọc Thảo Vy', role: 'Research & Finance', roleColor: 'text-kidfitPink', borderColor: 'border-kidfitPink', imgBg: 'bg-pink-50', img: '/assets/picture/vy.png', desc: 'Chịu trách nhiệm nghiên cứu thị trường, phân tích nhu cầu phụ huynh và xây dựng mô hình tài chính bền vững. Đồng thời hỗ trợ soạn thảo nội dung và tài liệu dự án KidFit.' },
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

        {/* Support Team Section */}
        <section ref={supportAnim.ref} className="py-20 px-6 md:px-20 bg-white">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Lê Nguyễn Hải Đăng', role: 'Content Specialist', roleColor: 'text-kidfitGreen', borderColor: 'border-kidfitGreen', imgBg: 'bg-green-50', img: '/assets/picture/dang.jpg', desc: 'Chuyên gia phát triển web và hệ thống backend. Xây dựng nền tảng KidFit ổn định, thân thiện và dễ sử dụng cho cả giáo viên lẫn phụ huynh.' },
                { name: 'Lâm Gia Huy', role: 'Operations Manager', roleColor: 'text-kidfitPurple', borderColor: 'border-kidfitPurple', imgBg: 'bg-purple-50', img: '/assets/picture/huy.jpg', desc: 'Người tạo ra bộ 36 thẻ tư duy độc quyền của KidFit. Chịu trách nhiệm thiết kế hình ảnh, bố cục và phong cách visual giúp trẻ dễ tiếp nhận và hứng thú học tập.' },
                { name: 'Phạm Vũ Khang', role: 'Content & Operations', roleColor: 'text-kidfitBlue', borderColor: 'border-kidfitBlue', imgBg: 'bg-blue-50', img: '/assets/picture/khang.png', desc: 'Hỗ trợ xây dựng nội dung chương trình, tài liệu hướng dẫn và quy trình vận hành. Đảm bảo các hoạt động của KidFit diễn ra suôn sẻ và nhất quán về chất lượng.' },
              ].map((member, i) => (
                <div key={i} className={`bg-white rounded-3xl p-8 shadow-sm hover:-translate-y-2 transition-all duration-300 border-b-8 ${member.borderColor} tilt-3d ${supportAnim.isVisible ? `anim-scaleIn3D anim-delay-${i + 1}` : 'anim-hidden'}`}>
                  <div className={`w-40 h-40 mx-auto ${member.imgBg} rounded-full overflow-hidden border-4 ${member.borderColor} mb-6 p-1`}>
                    <img src={member.img} className="w-full h-full object-cover rounded-full" alt={member.name} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 text-center">{member.name}</h3>
                  <p className={`${member.roleColor} font-semibold text-center mb-4 uppercase text-xs tracking-widest`}>{member.role}</p>
                  <p className="text-slate-600 text-sm text-center">{member.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section ref={ctaAnim.ref} className="px-6 md:px-20 pb-20 max-w-[1280px] mx-auto w-full">
          <div className={`bg-primary rounded-xl p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl ${ctaAnim.isVisible ? 'anim-scaleIn3D' : 'anim-hidden'}`}>
            <div className="absolute top-0 right-0 p-8 opacity-20"><span className="material-symbols-outlined text-9xl">rocket_launch</span></div>
            {/* Floating shapes */}
            <div className="absolute top-10 left-10 w-10 h-10 rounded-full bg-white/10 floating-shape-1 hidden md:block" />
            <div className="absolute bottom-10 right-1/3 w-6 h-6 rounded-full bg-white/10 floating-shape-2 hidden md:block" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-6">Sẵn sàng khai phá tiềm năng?</h2>
              <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">Đăng ký ngay hôm nay để nhận lộ trình học tập cá nhân hóa cho con bạn và bộ quà tặng họa cụ STEAM khởi đầu.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-white text-primary font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:scale-105 transition-transform">Bắt đầu ngay</button>
                <button className="bg-primary/20 border-2 border-white text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-white/10 transition-colors">Tư vấn miễn phí</button>
              </div>
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
                <h3 className="text-slate-900 font-black text-xl">KidFit</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Chương trình phát triển tư duy sáng tạo qua vẽ và STEAM cho trẻ 3-6 tuổi tại Cần Thơ.
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
            <p className="text-slate-500 text-xs">© 2026 KidsFit STEAM Program. Tất cả quyền được bảo hộ.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
