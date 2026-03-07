import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function KidsGallery() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="min-h-screen bg-background-light text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-md shadow-primary/20">
              <span className="material-symbols-outlined">palette</span>
            </div>
            <h1 className="font-black text-xl text-slate-900 tracking-tight hidden sm:block">Phòng Tranh Của Bé</h1>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input type="text" placeholder="Tìm kiếm tác phẩm..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 w-64 transition-all" />
            </div>
            <Link to="/student" className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-full hover:bg-slate-200 transition-colors">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span className="hidden sm:block">Quay lại</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Khám Phá Thế Giới Sáng Tạo</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Nơi lưu giữ những khoảnh khắc nghệ thuật tuyệt vời và những ý tưởng độc đáo từ các họa sĩ nhí tài năng.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button 
            onClick={() => setFilter('all')}
            className={`px-6 py-2.5 rounded-full font-bold transition-all ${filter === 'all' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            Tất cả
          </button>
          <button 
            onClick={() => setFilter('popular')}
            className={`px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 ${filter === 'popular' ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            <span className="material-symbols-outlined text-sm">local_fire_department</span>
            Nổi bật
          </button>
          <button 
            onClick={() => setFilter('recent')}
            className={`px-6 py-2.5 rounded-full font-bold transition-all ${filter === 'recent' ? 'bg-secondary text-white shadow-md shadow-secondary/20' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            Mới nhất
          </button>
          <button 
            onClick={() => setFilter('mầm')}
            className={`px-6 py-2.5 rounded-full font-bold transition-all ${filter === 'mầm' ? 'bg-accent text-white shadow-md shadow-accent/20' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            Lớp Mầm
          </button>
          <button 
            onClick={() => setFilter('chồi')}
            className={`px-6 py-2.5 rounded-full font-bold transition-all ${filter === 'chồi' ? 'bg-accent text-white shadow-md shadow-accent/20' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            Lớp Chồi
          </button>
          <button 
            onClick={() => setFilter('lá')}
            className={`px-6 py-2.5 rounded-full font-bold transition-all ${filter === 'lá' ? 'bg-accent text-white shadow-md shadow-accent/20' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            Lớp Lá
          </button>
        </div>

        {/* Masonry Grid (Simulated with columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {/* Artwork Item 1 */}
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col">
            <div className="relative aspect-[4/3] bg-slate-200 overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDaIlryGC20lqk0klJn6IV70aZ-Z04A9AtTQ8kQc9Hdst9P_20ROfWp5HV3ZWTjuS_2uwKj0SjHfNhaOowG29cwez_PIoskYtAnt_485XlLUdDqTzfrxp3xOWyZ_WSRNT7JqgBU5t5KKVjliU0HaWXthLTNnK_YrD82w1JmuGZZgri5oREbOtCARZ8RVY_7voN-_RTmNd-oLQ0meIkqp45nNn6A1pGhtOiKwifKS7cT_Dts5vbkgqdPVcd2Yvj2eLnxqX7cG2q0rXk")' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <button className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-rose-500 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">favorite</span>
                </button>
                <button className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-colors">
                  <span className="material-symbols-outlined">share</span>
                </button>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 mb-1 truncate">Chú Chó Đốm Đáng Yêu</h3>
                <p className="text-xs text-slate-500 mb-3 line-clamp-2">Bé vẽ chú chó đốm đang chơi đùa trong vườn hoa.</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="size-6 rounded-full bg-slate-200" />
                  <span className="text-sm font-bold text-slate-700">Bé Bi</span>
                </div>
                <div className="flex items-center gap-1 text-rose-500 text-sm font-bold">
                  <span className="material-symbols-outlined text-sm">favorite</span> 124
                </div>
              </div>
            </div>
          </div>

          {/* Artwork Item 2 */}
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col">
            <div className="relative aspect-square bg-slate-200 overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDHU0g_XT6LW13-ODN1winAuTmVeTD8gTb50jb2spjvE7w6dGW7gCf_DZe_tBhRDF9ee3bRTRkurN_E2lEm-abcaWwowsIGD0KyEv3hcawx8ZMm9giv8Hshk1-0Al53X9I55QApLoYkBXFFopL4J7l7hquCaoaOwGszwD9RWscXenNVe5TnW1o_dvpKkuyPfqZvdqoIhDcaLjfZfosAhaUTHxHQ2GqE0tnZ39Qj1VMAJDROLCRApOTVD7cckyJ4YC9l3JEGOTNuZ8o")' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <button className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-rose-500 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">favorite</span>
                </button>
                <button className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-colors">
                  <span className="material-symbols-outlined">share</span>
                </button>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 mb-1 truncate">Ngôi Nhà Mơ Ước</h3>
                <p className="text-xs text-slate-500 mb-3 line-clamp-2">Ngôi nhà có nhiều cửa sổ và một khu vườn rộng lớn.</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mia" className="size-6 rounded-full bg-slate-200" />
                  <span className="text-sm font-bold text-slate-700">Bé Na</span>
                </div>
                <div className="flex items-center gap-1 text-rose-500 text-sm font-bold">
                  <span className="material-symbols-outlined text-sm">favorite</span> 89
                </div>
              </div>
            </div>
          </div>

          {/* Artwork Item 3 */}
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col">
            <div className="relative aspect-[3/4] bg-slate-200 overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBXSbS4ZEbnkusa8nVs57hJ4J8qQdFwHJ8v_xZskElHLYN0c93TLLt_iHyClL4x-OYsKwVjhYX1tA7Y6A6Y15csUm7we25z0PgEEtNQsv3RL7nSJ1g9szwx2VsuJiY4viq_fZFTep-OLItuJu0vyE3fuTXKjJ5rV7eLsHgR_NQTL020klXh4G_G607hOAccE9v-rBS-r2M028z8ZRlWTrWOX8R3opaFUtLrvlBl8S72mq7b3VbZUoJw97LdP1TheFk7mu1s202Bh5I")' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <button className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-rose-500 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">favorite</span>
                </button>
                <button className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-colors">
                  <span className="material-symbols-outlined">share</span>
                </button>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 mb-1 truncate">Sơ Đồ Tư Duy Gia Đình</h3>
                <p className="text-xs text-slate-500 mb-3 line-clamp-2">Bé vẽ sơ đồ tư duy giới thiệu về các thành viên trong gia đình mình.</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Leo" className="size-6 rounded-full bg-slate-200" />
                  <span className="text-sm font-bold text-slate-700">Bé Tí</span>
                </div>
                <div className="flex items-center gap-1 text-rose-500 text-sm font-bold">
                  <span className="material-symbols-outlined text-sm">favorite</span> 256
                </div>
              </div>
            </div>
          </div>

          {/* Artwork Item 4 */}
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col">
            <div className="relative aspect-video bg-slate-200 overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDaIlryGC20lqk0klJn6IV70aZ-Z04A9AtTQ8kQc9Hdst9P_20ROfWp5HV3ZWTjuS_2uwKj0SjHfNhaOowG29cwez_PIoskYtAnt_485XlLUdDqTzfrxp3xOWyZ_WSRNT7JqgBU5t5KKVjliU0HaWXthLTNnK_YrD82w1JmuGZZgri5oREbOtCARZ8RVY_7voN-_RTmNd-oLQ0meIkqp45nNn6A1pGhtOiKwifKS7cT_Dts5vbkgqdPVcd2Yvj2eLnxqX7cG2q0rXk")' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <button className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-rose-500 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">favorite</span>
                </button>
                <button className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-colors">
                  <span className="material-symbols-outlined">share</span>
                </button>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 mb-1 truncate">Thế Giới Dưới Biển</h3>
                <p className="text-xs text-slate-500 mb-3 line-clamp-2">Nhiều loài cá đầy màu sắc đang bơi lội tung tăng.</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe" className="size-6 rounded-full bg-slate-200" />
                  <span className="text-sm font-bold text-slate-700">Bé Bông</span>
                </div>
                <div className="flex items-center gap-1 text-rose-500 text-sm font-bold">
                  <span className="material-symbols-outlined text-sm">favorite</span> 198
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-full hover:bg-slate-50 hover:border-primary/30 transition-all">
            Tải thêm tác phẩm
          </button>
        </div>

      </main>
    </div>
  );
}
