import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '@/config/api';
import './SaoMaiLanding.css';

// ======================== TYPES ========================
type LoginRole = 'teacher' | 'parent' | 'school' | null;

// ======================== LOGIN MODAL ========================
function LoginModal({ role, onClose }: { role: LoginRole; onClose: () => void }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!role) return null;

  const roleConfig = {
    teacher: {
      label: 'Giáo Viên',
      icon: '👩‍🏫',
      color: '#4A90D9',
      gradient: 'linear-gradient(135deg, #4A90D9 0%, #7EC8E3 100%)',
      bg: '#EBF5FB',
      border: '#4A90D9',
      usernameLabel: 'Mã giáo viên / Email',
      placeholder: 'Nhập mã giáo viên hoặc email...',
    },
    parent: {
      label: 'Phụ Huynh',
      icon: '👨‍👩‍👧',
      color: '#F4A261',
      gradient: 'linear-gradient(135deg, #F4A261 0%, #FFCBA4 100%)',
      bg: '#FEF5EC',
      border: '#F4A261',
      usernameLabel: 'Số điện thoại / Email',
      placeholder: 'Nhập số điện thoại hoặc email...',
    },
    school: {
      label: 'Nhà Trường',
      icon: '🏫',
      color: '#2ECC71',
      gradient: 'linear-gradient(135deg, #2ECC71 0%, #A8E6CF 100%)',
      bg: '#EAFAF1',
      border: '#2ECC71',
      usernameLabel: 'Tên đăng nhập / Email',
      placeholder: 'Nhập tên đăng nhập hoặc email...',
    },
  };

  const cfg = roleConfig[role];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: username, password }),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        const userRole = data.user.role;
        if (userRole === 'teacher') navigate('/teacher');
        else if (userRole === 'parent') navigate('/parent');
        else if (userRole === 'admin') navigate('/dashboard');
        else navigate('/parent');
      } else {
        setError(data.error || 'Sai tên đăng nhập hoặc mật khẩu!');
      }
    } catch {
      setError('Lỗi kết nối máy chủ. Vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sm-modal-overlay" onClick={onClose}>
      <div className="sm-modal" onClick={(e) => e.stopPropagation()}>
        <button className="sm-modal-close" onClick={onClose}>✕</button>

        <div className="sm-modal-header" style={{ background: cfg.gradient }}>
          <span className="sm-modal-icon">{cfg.icon}</span>
          <h2 className="sm-modal-title">Đăng Nhập {cfg.label}</h2>
          <p className="sm-modal-subtitle">Hệ thống quản lý trường Mầm Non Sao Mai</p>
        </div>

        <form className="sm-modal-form" onSubmit={handleLogin}>
          {error && (
            <div className="sm-error-box">
              <span>⚠️</span> {error}
            </div>
          )}
          <div className="sm-form-group">
            <label className="sm-label">{cfg.usernameLabel}</label>
            <div className="sm-input-wrap">
              <span className="sm-input-icon">👤</span>
              <input
                className="sm-input"
                type="text"
                placeholder={cfg.placeholder}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ '--focus-color': cfg.border } as React.CSSProperties}
              />
            </div>
          </div>

          <div className="sm-form-group">
            <label className="sm-label">Mật khẩu</label>
            <div className="sm-input-wrap">
              <span className="sm-input-icon">🔒</span>
              <input
                className="sm-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="sm-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className="sm-form-footer">
            <label className="sm-remember">
              <input type="checkbox" /> Ghi nhớ đăng nhập
            </label>
            <a href="#" className="sm-forgot" style={{ color: cfg.color }}>Quên mật khẩu?</a>
          </div>

          <button
            className="sm-login-btn"
            type="submit"
            style={{ background: cfg.gradient }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="sm-spinner" />
            ) : (
              <>🚀 Đăng Nhập</>
            )}
          </button>

          <p className="sm-support">
            Cần hỗ trợ? <a href="tel:02936522591" style={{ color: cfg.color }}>📞 0293 6522 591</a>
          </p>
        </form>
      </div>
    </div>
  );
}

// ======================== STAT COUNTER ========================
function StatCounter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let current = 0;
        const step = end / 60;
        const timer = setInterval(() => {
          current += step;
          if (current >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, 25);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div className="sm-stat" ref={ref}>
      <span className="sm-stat-number">{count}{suffix}</span>
      <span className="sm-stat-label">{label}</span>
    </div>
  );
}

// ======================== FEATURE CARD ========================
function FeatureCard({ icon, title, desc, color }: { icon: string; title: string; desc: string; color: string }) {
  return (
    <div className="sm-feature-card" style={{ '--card-color': color } as React.CSSProperties}>
      <div className="sm-feature-icon" style={{ background: color + '20', color }}>
        {icon}
      </div>
      <h3 className="sm-feature-title">{title}</h3>
      <p className="sm-feature-desc">{desc}</p>
    </div>
  );
}

// ======================== MAIN PAGE ========================
export default function SaoMaiLanding() {
  const [activeLogin, setActiveLogin] = useState<LoginRole>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const reveals = document.querySelectorAll('.sm-reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('sm-revealed');
      });
    }, { threshold: 0.1 });
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navLinks = ['Giới thiệu', 'Tính năng', 'Thống kê', 'Liên hệ'];

  return (
    <div className="sm-root">
      {/* ===== NAVBAR ===== */}
      <nav className={`sm-nav ${scrolled ? 'sm-nav-scrolled' : ''}`}>
        <div className="sm-nav-inner">
          <a href="#" className="sm-logo">
            <span className="sm-logo-star">⭐</span>
            <div>
              <span className="sm-logo-text">Sao Mai</span>
              <span className="sm-logo-sub">Mầm Non</span>
            </div>
          </a>

          <div className={`sm-nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s/g, '-')}`} className="sm-nav-link">
                {link}
              </a>
            ))}
          </div>

          <div className="sm-nav-actions">
            <button className="sm-nav-login-btn" onClick={() => setActiveLogin('teacher')}>
              Đăng Nhập
            </button>
            <button className="sm-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="sm-hero" id="giới-thiệu">
        {/* Floating decorations */}
        <div className="sm-bubble sm-bubble-1">📚</div>
        <div className="sm-bubble sm-bubble-2">✏️</div>
        <div className="sm-bubble sm-bubble-3">🎨</div>
        <div className="sm-bubble sm-bubble-4">🌟</div>
        <div className="sm-bubble sm-bubble-5">🎵</div>
        <div className="sm-bubble sm-bubble-6">🦋</div>

        <div className="sm-hero-content">
          <div className="sm-hero-badge">
            <span>⭐</span> Hệ Thống Quản Lý Trường Mầm Non
          </div>
          <h1 className="sm-hero-title">
            Trường Mầm Non
            <span className="sm-hero-highlight"> Sao Mai</span>
          </h1>
          <p className="sm-hero-subtitle">
            Nền tảng quản lý giáo dục thông minh — kết nối <strong>Nhà trường</strong>,{' '}
            <strong>Giáo viên</strong> và <strong>Phụ huynh</strong> trong một hệ sinh thái hiện đại,
            minh bạch và hiệu quả.
          </p>

          {/* Login Portal Cards */}
          <div className="sm-portal-grid">
            <button
              className="sm-portal-card sm-portal-teacher"
              onClick={() => setActiveLogin('teacher')}
              id="sm-login-teacher"
            >
              <span className="sm-portal-emoji">👩‍🏫</span>
              <span className="sm-portal-role">Giáo Viên</span>
              <span className="sm-portal-action">Đăng nhập →</span>
            </button>

            <button
              className="sm-portal-card sm-portal-parent"
              onClick={() => setActiveLogin('parent')}
              id="sm-login-parent"
            >
              <span className="sm-portal-emoji">👨‍👩‍👧</span>
              <span className="sm-portal-role">Phụ Huynh</span>
              <span className="sm-portal-action">Đăng nhập →</span>
            </button>

            <button
              className="sm-portal-card sm-portal-school"
              onClick={() => setActiveLogin('school')}
              id="sm-login-school"
            >
              <span className="sm-portal-emoji">🏫</span>
              <span className="sm-portal-role">Nhà Trường</span>
              <span className="sm-portal-action">Đăng nhập →</span>
            </button>
          </div>
        </div>

        <div className="sm-hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f0f7ff" />
          </svg>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="sm-stats-section" id="thống-kê">
        <div className="sm-container">
          <div className="sm-stats-grid sm-reveal">
            <StatCounter end={500} suffix="+" label="Học Sinh" />
            <StatCounter end={45} suffix="" label="Giáo Viên" />
            <StatCounter end={12} suffix="" label="Năm Hoạt Động" />
            <StatCounter end={98} suffix="%" label="Phụ Huynh Hài Lòng" />
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="sm-features-section" id="tính-năng">
        <div className="sm-container">
          <div className="sm-section-header sm-reveal">
            <span className="sm-section-badge">✨ Tính Năng Nổi Bật</span>
            <h2 className="sm-section-title">Quản Lý Toàn Diện – Kết Nối Vững Chắc</h2>
            <p className="sm-section-desc">
              Hệ thống được thiết kế riêng cho giáo dục mầm non, giúp mọi hoạt động trở nên dễ dàng và minh bạch hơn.
            </p>
          </div>

          <div className="sm-features-grid">
            {[
              { icon: '📊', title: 'Quản Lý Học Sinh', desc: 'Theo dõi hồ sơ, sức khỏe, dinh dưỡng và sự phát triển của từng trẻ theo thời gian thực.', color: '#4A90D9' },
              { icon: '📅', title: 'Thời Khóa Biểu', desc: 'Lập kế hoạch giảng dạy, thông báo lịch học và sự kiện đến phụ huynh tức thì.', color: '#F4A261' },
              { icon: '💬', title: 'Nhắn Tin & Thông Báo', desc: 'Kết nối trực tiếp giữa giáo viên và phụ huynh qua hệ thống tin nhắn bảo mật.', color: '#9B59B6' },
              { icon: '📷', title: 'Album Kỷ Niệm', desc: 'Lưu giữ và chia sẻ những khoảnh khắc đáng nhớ của các bé an toàn và riêng tư.', color: '#E74C3C' },
              { icon: '💳', title: 'Quản Lý Học Phí', desc: 'Hóa đơn điện tử, nhắc nhở tự động và báo cáo thu chi minh bạch rõ ràng.', color: '#2ECC71' },
              { icon: '📈', title: 'Báo Cáo & Phân Tích', desc: 'Dashboard thống kê trực quan giúp ban giám hiệu ra quyết định nhanh chóng, chính xác.', color: '#F39C12' },
            ].map((f) => (
              <div key={f.title} className="sm-reveal">
                <FeatureCard {...f} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="sm-how-section">
        <div className="sm-container">
          <div className="sm-section-header sm-reveal">
            <span className="sm-section-badge">🚀 Cách Hoạt Động</span>
            <h2 className="sm-section-title">Dễ Dàng – Nhanh Chóng – Hiệu Quả</h2>
          </div>
          <div className="sm-how-grid">
            {[
              { step: '01', icon: '🔐', title: 'Đăng Nhập', desc: 'Chọn vai trò phù hợp và đăng nhập an toàn bằng tài khoản được cấp.' },
              { step: '02', icon: '📋', title: 'Quản Lý', desc: 'Truy cập dashboard cá nhân với đầy đủ thông tin và công cụ cần thiết.' },
              { step: '03', icon: '🤝', title: 'Kết Nối', desc: 'Trao đổi, chia sẻ và phối hợp giữa tất cả các bên liên quan dễ dàng.' },
              { step: '04', icon: '🌱', title: 'Phát Triển', desc: 'Theo dõi sự tiến bộ của trẻ và tối ưu chương trình giáo dục liên tục.' },
            ].map((item) => (
              <div key={item.step} className="sm-how-card sm-reveal">
                <div className="sm-how-step">{item.step}</div>
                <div className="sm-how-icon">{item.icon}</div>
                <h3 className="sm-how-title">{item.title}</h3>
                <p className="sm-how-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="sm-testimonials-section">
        <div className="sm-container">
          <div className="sm-section-header sm-reveal">
            <span className="sm-section-badge">💬 Phản Hồi</span>
            <h2 className="sm-section-title">Cộng Đồng Nói Gì?</h2>
          </div>
          <div className="sm-testimonials-grid">
            {[
              { name: 'Cô Nguyễn Thu Hà', role: 'Giáo viên lớp Lá', avatar: '👩‍🏫', text: 'Hệ thống giúp tôi tiết kiệm rất nhiều thời gian cho việc báo cáo. Phụ huynh cũng dễ dàng theo dõi con hơn!', stars: 5 },
              { name: 'Anh Trần Minh Khoa', role: 'Phụ huynh học sinh', avatar: '👨', text: 'Tôi có thể xem ảnh con học hàng ngày, nhận thông báo học phí và nhắn tin với cô giáo rất tiện lợi.', stars: 5 },
              { name: 'Hiệu Trưởng Lê Thị Mai', role: 'Ban Giám Hiệu', avatar: '👩‍💼', text: 'Dashboard quản lý rất trực quan. Chúng tôi nắm được toàn bộ hoạt động nhà trường từ một nơi.', stars: 5 },
            ].map((t) => (
              <div key={t.name} className="sm-testimonial-card sm-reveal">
                <div className="sm-testimonial-stars">{'⭐'.repeat(t.stars)}</div>
                <p className="sm-testimonial-text">"{t.text}"</p>
                <div className="sm-testimonial-author">
                  <span className="sm-testimonial-avatar">{t.avatar}</span>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="sm-cta-section" id="liên-hệ">
        <div className="sm-cta-inner sm-reveal">
          <h2 className="sm-cta-title">Sẵn Sàng Trải Nghiệm?</h2>
          <p className="sm-cta-desc">
            Đăng nhập ngay để khám phá hệ sinh thái quản lý giáo dục toàn diện của trường Sao Mai.
          </p>
          <div className="sm-cta-btns">
            <button className="sm-cta-btn sm-cta-primary" onClick={() => setActiveLogin('teacher')}>
              👩‍🏫 Dành cho Giáo Viên
            </button>
            <button className="sm-cta-btn sm-cta-secondary" onClick={() => setActiveLogin('parent')}>
              👨‍👩‍👧 Dành cho Phụ Huynh
            </button>
            <button className="sm-cta-btn sm-cta-school" onClick={() => setActiveLogin('school')}>
              🏫 Quản Trị Nhà Trường
            </button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="sm-footer">
        <div className="sm-container">
          <div className="sm-footer-grid">
            <div className="sm-footer-brand">
              <div className="sm-logo" style={{ marginBottom: '12px' }}>
                <span className="sm-logo-star">⭐</span>
                <div>
                  <span className="sm-logo-text" style={{ color: '#fff' }}>Sao Mai</span>
                  <span className="sm-logo-sub" style={{ color: 'rgba(255,255,255,0.6)' }}>Mầm Non</span>
                </div>
              </div>
              <p className="sm-footer-tagline">
                Nơi ươm mầm những tài năng nhỏ bé — Vì một thế hệ tương lai tươi sáng 🌟
              </p>
            </div>
            <div className="sm-footer-col">
              <h4>Liên Kết Nhanh</h4>
              <a href="#">Trang Chủ</a>
              <a href="#">Về Chúng Tôi</a>
              <a href="#">Tính Năng</a>
              <a href="#">Hỗ Trợ</a>
            </div>
            <div className="sm-footer-col">
              <h4>Đăng Nhập</h4>
              <button onClick={() => setActiveLogin('teacher')}>👩‍🏫 Giáo Viên</button>
              <button onClick={() => setActiveLogin('parent')}>👨‍👩‍👧 Phụ Huynh</button>
              <button onClick={() => setActiveLogin('school')}>🏫 Nhà Trường</button>
            </div>
            <div className="sm-footer-col">
              <h4>Liên Hệ</h4>
              <span>📞 0293 6522 591</span>
              <span>📧 lienhe@saomaimamnon.edu.vn</span>
              <span>📍 Ấp Sơn Phú,Phường Đại Thành,TP Cần Thơ</span>
            </div>
          </div>
          <div className="sm-footer-bottom">
            <p>© 2025 Trường Mầm Non Sao Mai. Bảo lưu mọi quyền.</p>
          </div>
        </div>
      </footer>

      {/* ===== LOGIN MODAL ===== */}
      <LoginModal role={activeLogin} onClose={() => setActiveLogin(null)} />
    </div>
  );
}
