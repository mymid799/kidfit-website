import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="flex h-screen bg-background-light text-slate-900 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-300 z-20">
        <div className="flex flex-col h-full">
          <div className="h-20 flex items-center justify-center md:justify-start md:px-6 border-b border-slate-100">
            <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-md shadow-primary/20 shrink-0">
              <span className="material-symbols-outlined">draw</span>
            </div>
            <h1 className="hidden md:block ml-3 font-black text-xl text-slate-900 tracking-tight">Vẽ Tư Duy</h1>
          </div>
          
          <nav className="flex-1 py-6 px-3 flex flex-col gap-2 overflow-y-auto hide-scrollbar">
            <button 
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'home' ? 'bg-primary/10 text-primary font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
            >
              <span className="material-symbols-outlined text-2xl">home</span>
              <span className="hidden md:block">Trang Chủ</span>
            </button>
            <button 
              onClick={() => setActiveTab('courses')}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'courses' ? 'bg-secondary/10 text-secondary font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
            >
              <span className="material-symbols-outlined text-2xl">school</span>
              <span className="hidden md:block">Bài Học</span>
            </button>
            <button 
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'gallery' ? 'bg-accent/10 text-accent font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
            >
              <span className="material-symbols-outlined text-2xl">palette</span>
              <span className="hidden md:block">Phòng Tranh</span>
            </button>
            <button 
              onClick={() => setActiveTab('achievements')}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'achievements' ? 'bg-primary/10 text-primary font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
            >
              <span className="material-symbols-outlined text-2xl">emoji_events</span>
              <span className="hidden md:block">Thành Tích</span>
            </button>
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="size-10 rounded-full bg-slate-200 border-2 border-white shadow-sm shrink-0" />
              <div className="hidden md:block overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate">Bé Bi</p>
                <p className="text-xs text-slate-500 truncate">Lớp Mầm</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 md:px-10 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-slate-900">Xin chào, Bé Bi! 👋</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent font-bold">
              <span className="material-symbols-outlined text-xl">stars</span>
              <span>120 Điểm</span>
            </div>
            <button className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-slate-100"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 hide-scrollbar">
          <div className="max-w-6xl mx-auto space-y-10">
            
            {/* Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-primary p-8 md:p-12 text-white shadow-xl shadow-primary/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
              <div className="relative z-10 max-w-lg">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-sm">Bài học tiếp theo</span>
                <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight">Khám Phá Hình Tròn Kì Diệu</h3>
                <p className="text-white/80 mb-8 text-lg">Cùng vẽ mặt trời, quả bóng và những người bạn hình tròn đáng yêu nhé!</p>
                <button className="bg-white text-primary font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                  <span className="material-symbols-outlined">play_arrow</span>
                  Bắt Đầu Vẽ Ngay
                </button>
              </div>
              <div className="absolute right-10 bottom-0 hidden lg:block">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Happy" alt="Mascot" className="w-48 h-48 drop-shadow-2xl" />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:shadow-md transition-shadow">
                <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-3xl">task_alt</span>
                </div>
                <span className="text-3xl font-black text-slate-900">12</span>
                <span className="text-sm font-medium text-slate-500">Bài Đã Hoàn Thành</span>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:shadow-md transition-shadow">
                <div className="size-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-3xl">schedule</span>
                </div>
                <span className="text-3xl font-black text-slate-900">24h</span>
                <span className="text-sm font-medium text-slate-500">Thời Gian Học</span>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:shadow-md transition-shadow">
                <div className="size-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-3xl">workspace_premium</span>
                </div>
                <span className="text-3xl font-black text-slate-900">5</span>
                <span className="text-sm font-medium text-slate-500">Huy Hiệu</span>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:shadow-md transition-shadow">
                <div className="size-12 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-3xl">favorite</span>
                </div>
                <span className="text-3xl font-black text-slate-900">48</span>
                <span className="text-sm font-medium text-slate-500">Lượt Thích Tranh</span>
              </div>
            </div>

            {/* Recommended Courses */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-slate-900">Gợi Ý Cho Bé</h3>
                <button className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                  Xem tất cả <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Course Card 1 */}
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer flex flex-col">
                  <div className="h-40 bg-slate-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDaIlryGC20lqk0klJn6IV70aZ-Z04A9AtTQ8kQc9Hdst9P_20ROfWp5HV3ZWTjuS_2uwKj0SjHfNhaOowG29cwez_PIoskYtAnt_485XlLUdDqTzfrxp3xOWyZ_WSRNT7JqgBU5t5KKVjliU0HaWXthLTNnK_YrD82w1JmuGZZgri5oREbOtCARZ8RVY_7voN-_RTmNd-oLQ0meIkqp45nNn6A1pGhtOiKwifKS7cT_Dts5vbkgqdPVcd2Yvj2eLnxqX7cG2q0rXk")' }}></div>
                    <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-slate-900">Lớp Mầm</div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">Vẽ Con Vật Từ Hình Tròn</h4>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">Học cách kết hợp các hình tròn để tạo ra những con vật ngộ nghĩnh.</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1 text-accent font-bold text-sm">
                        <span className="material-symbols-outlined text-base">star</span> 4.9
                      </div>
                      <div className="flex -space-x-2">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" className="size-6 rounded-full border border-white bg-slate-200" />
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" className="size-6 rounded-full border border-white bg-slate-200" />
                        <div className="size-6 rounded-full border border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">+12</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Card 2 */}
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer flex flex-col">
                  <div className="h-40 bg-slate-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDHU0g_XT6LW13-ODN1winAuTmVeTD8gTb50jb2spjvE7w6dGW7gCf_DZe_tBhRDF9ee3bRTRkurN_E2lEm-abcaWwowsIGD0KyEv3hcawx8ZMm9giv8Hshk1-0Al53X9I55QApLoYkBXFFopL4J7l7hquCaoaOwGszwD9RWscXenNVe5TnW1o_dvpKkuyPfqZvdqoIhDcaLjfZfosAhaUTHxHQ2GqE0tnZ39Qj1VMAJDROLCRApOTVD7cckyJ4YC9l3JEGOTNuZ8o")' }}></div>
                    <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-slate-900">Lớp Chồi</div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-secondary transition-colors">Thế Giới Dưới Đại Dương</h4>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">Khám phá các loài cá và sinh vật biển qua nét vẽ tự do.</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1 text-accent font-bold text-sm">
                        <span className="material-symbols-outlined text-base">star</span> 4.8
                      </div>
                      <div className="flex -space-x-2">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" className="size-6 rounded-full border border-white bg-slate-200" />
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=4" className="size-6 rounded-full border border-white bg-slate-200" />
                        <div className="size-6 rounded-full border border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">+8</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Card 3 */}
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer flex flex-col">
                  <div className="h-40 bg-slate-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBXSbS4ZEbnkusa8nVs57hJ4J8qQdFwHJ8v_xZskElHLYN0c93TLLt_iHyClL4x-OYsKwVjhYX1tA7Y6A6Y15csUm7we25z0PgEEtNQsv3RL7nSJ1g9szwx2VsuJiY4viq_fZFTep-OLItuJu0vyE3fuTXKjJ5rV7eLsHgR_NQTL020klXh4G_G607hOAccE9v-rBS-r2M028z8ZRlWTrWOX8R3opaFUtLrvlBl8S72mq7b3VbZUoJw97LdP1TheFk7mu1s202Bh5I")' }}></div>
                    <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-slate-900">Lớp Lá</div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-accent transition-colors">Sơ Đồ Tư Duy Gia Đình</h4>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">Tập vẽ sơ đồ tư duy đơn giản giới thiệu về các thành viên trong gia đình.</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1 text-accent font-bold text-sm">
                        <span className="material-symbols-outlined text-base">star</span> 5.0
                      </div>
                      <div className="flex -space-x-2">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=5" className="size-6 rounded-full border border-white bg-slate-200" />
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=6" className="size-6 rounded-full border border-white bg-slate-200" />
                        <div className="size-6 rounded-full border border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">+24</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Artworks */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-slate-900">Tác Phẩm Gần Đây</h3>
                <Link to="/gallery" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                  Đến phòng tranh <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="aspect-square rounded-2xl bg-slate-200 overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-lg transition-all">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDaIlryGC20lqk0klJn6IV70aZ-Z04A9AtTQ8kQc9Hdst9P_20ROfWp5HV3ZWTjuS_2uwKj0SjHfNhaOowG29cwez_PIoskYtAnt_485XlLUdDqTzfrxp3xOWyZ_WSRNT7JqgBU5t5KKVjliU0HaWXthLTNnK_YrD82w1JmuGZZgri5oREbOtCARZ8RVY_7voN-_RTmNd-oLQ0meIkqp45nNn6A1pGhtOiKwifKS7cT_Dts5vbkgqdPVcd2Yvj2eLnxqX7cG2q0rXk")' }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <p className="text-white font-bold truncate">Chú Chó Đốm</p>
                    <div className="flex items-center gap-2 text-white/80 text-xs">
                      <span className="material-symbols-outlined text-sm">favorite</span> 12
                    </div>
                  </div>
                </div>
                <div className="aspect-square rounded-2xl bg-slate-200 overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-lg transition-all">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDHU0g_XT6LW13-ODN1winAuTmVeTD8gTb50jb2spjvE7w6dGW7gCf_DZe_tBhRDF9ee3bRTRkurN_E2lEm-abcaWwowsIGD0KyEv3hcawx8ZMm9giv8Hshk1-0Al53X9I55QApLoYkBXFFopL4J7l7hquCaoaOwGszwD9RWscXenNVe5TnW1o_dvpKkuyPfqZvdqoIhDcaLjfZfosAhaUTHxHQ2GqE0tnZ39Qj1VMAJDROLCRApOTVD7cckyJ4YC9l3JEGOTNuZ8o")' }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <p className="text-white font-bold truncate">Ngôi Nhà Của Bé</p>
                    <div className="flex items-center gap-2 text-white/80 text-xs">
                      <span className="material-symbols-outlined text-sm">favorite</span> 8
                    </div>
                  </div>
                </div>
                <div className="aspect-square rounded-2xl bg-slate-200 overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-lg transition-all border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:text-primary hover:border-primary hover:bg-primary/5">
                  <span className="material-symbols-outlined text-4xl mb-2">add_circle</span>
                  <span className="font-bold text-sm">Vẽ Mới</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
