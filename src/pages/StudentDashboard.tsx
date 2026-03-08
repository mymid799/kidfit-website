import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../constants/assets';

const JournalView = () => (
  <div className="max-w-6xl mx-auto space-y-8">
    {/* Child Header Info Card */}
    <section className="flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-sm border border-primary/5">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <div className="size-32 rounded-full border-4 border-accent overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={IMAGES.journal.avatar}
              alt="Bé Minh Quân avatar"
              onError={(e) => { e.currentTarget.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' }}
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-accent text-slate-900 rounded-full px-3 py-1 text-xs font-bold shadow-md">LV. 4</div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-slate-900">Bé Minh Quân</h1>
          <p className="text-slate-500 font-medium">4 tuổi • Lớp Chồi • Niên khóa 2023-2024</p>
          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
            <span className="rounded-full bg-secondary/10 px-4 py-1 text-sm font-semibold text-secondary">Họa sĩ nhí</span>
            <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">Sáng tạo không ngừng</span>
          </div>
        </div>
        <div className="w-full md:w-64 flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <span className="text-sm font-bold text-primary">Tiến độ tổng quát</span>
            <div className="flex gap-0.5 text-accent">
              <span className="material-symbols-outlined fill-1">star</span>
              <span className="material-symbols-outlined fill-1">star</span>
              <span className="material-symbols-outlined fill-1">star</span>
              <span className="material-symbols-outlined text-slate-200">star</span>
            </div>
          </div>
          <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full rounded-full bg-primary" style={{ width: '65%' }}></div>
          </div>
          <p className="text-right text-xs font-medium text-slate-500">65% Hoàn thành</p>
        </div>
      </div>
    </section>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Activities Feed */}
      <div className="lg:col-span-2 flex flex-col gap-8">
        <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
          <span className="material-symbols-outlined text-secondary">auto_stories</span>
          Nhật ký hoạt động gần đây
        </h3>

        {/* Activity Entry 1 */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border-l-8 border-secondary flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">15 Tháng 10, 2023</p>
              <h4 className="text-xl font-bold text-secondary">Thẻ A4 - Thế giới nước</h4>
            </div>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-white">Hoàn thành tốt</span>
          </div>
          <div className="aspect-video w-full rounded-2xl bg-slate-100 overflow-hidden border border-slate-200">
            <img
              className="h-full w-full object-cover"
              src={IMAGES.journal.activity1}
              alt="Tranh vẽ về đại dương"
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/2196F3/ffffff?text=The+Gioi+Nuoc' }}
            />
          </div>
          <div className="rounded-2xl bg-background-light p-4 italic text-slate-600 relative">
            <span className="material-symbols-outlined absolute -top-3 -left-1 text-primary opacity-30 text-4xl">format_quote</span>
            "Minh Quân hôm nay rất hào hứng khi kể về chú cá voi xanh. Con đã biết cách sử dụng màu xanh dương để tạo nên các tầng sóng khác nhau. Rất đáng khen!" - Cô Lan Anh
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="material-symbols-outlined text-primary text-3xl">visibility</span>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Tư duy hình ảnh</p>
              <div className="flex gap-0.5">
                <div className="h-1.5 w-4 rounded bg-primary"></div>
                <div className="h-1.5 w-4 rounded bg-primary"></div>
                <div className="h-1.5 w-4 rounded bg-slate-200"></div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="material-symbols-outlined text-secondary text-3xl">chat_bubble</span>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Diễn đạt</p>
              <div className="flex gap-0.5">
                <div className="h-1.5 w-4 rounded bg-secondary"></div>
                <div className="h-1.5 w-4 rounded bg-secondary"></div>
                <div className="h-1.5 w-4 rounded bg-secondary"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Entry 2 */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border-l-8 border-primary flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">12 Tháng 10, 2023</p>
              <h4 className="text-xl font-bold text-primary">Thẻ B2 - Khu vườn của bé</h4>
            </div>
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">Xuất sắc</span>
          </div>
          <div className="aspect-video w-full rounded-2xl bg-slate-100 overflow-hidden border border-slate-200">
            <img
              className="h-full w-full object-cover"
              src={IMAGES.journal.activity2}
              alt="Bức tranh vườn hoa"
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/4cae4f/ffffff?text=Khu+Vuon+Cua+Be' }}
            />
          </div>
        </div>
      </div>

      {/* Sidebar Info */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <button className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-lg font-bold text-white shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
            <span className="material-symbols-outlined">picture_as_pdf</span>
            Xuất file PDF nhật ký
          </button>
        </div>
        <div className="rounded-3xl bg-accent/20 p-6 border-2 border-accent/30 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <span className="material-symbols-outlined text-3xl text-orange-500">home_filled</span>
            <h4>Gợi ý cho Ba Mẹ</h4>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Tuần này, Ba Mẹ có thể cùng Minh Quân chơi trò **"Đuổi hình bắt bóng"** để giúp con phát triển thêm khả năng **Tư duy hình ảnh** nhé!
          </p>
        </div>
      </div>
    </div>
  </div>
);


const AchievementsView = () => (
  <div className="max-w-6xl mx-auto space-y-12">
    {/* Header Section */}
    <header className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-8 rounded-3xl shadow-sm border-b-4 border-primary">
      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative bg-white rounded-full p-1">
            <img alt="Avatar chibi" className="w-24 h-24 rounded-full" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-accent text-slate-900 text-xs font-bold px-3 py-1 rounded-full border-2 border-white shadow-sm">LV. 15</div>
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-black text-slate-900 leading-tight mb-1">
            Kho Thành Tích Của Bé! 🌟
          </h1>
          <p className="text-slate-600 font-medium">Chào mừng Nhà Thám Hiểm <span className="text-primary font-bold">Minh Khôi</span>!</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="flex items-center gap-2 bg-secondary text-white px-5 py-2.5 rounded-full font-bold shadow-lg transition-all active:scale-95 text-sm">
          <span className="material-symbols-outlined text-sm">share</span> Chia sẻ
        </button>
        <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-bold shadow-lg transition-all active:scale-95 text-sm">
          <span className="material-symbols-outlined text-sm">picture_as_pdf</span> In bằng khen
        </button>
      </div>
    </header>

    {/* Progress Stats */}
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-sm flex flex-col items-center justify-center border-2 border-primary/20">
        <h3 className="text-lg font-black mb-6 text-slate-700 uppercase tracking-widest text-center">Tiến độ tổng quát</h3>
        <div className="relative flex items-center justify-center">
          <svg className="w-40 h-40 transform -rotate-90">
            <circle className="text-primary/10" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="12"></circle>
            <circle className="text-primary" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeDasharray="439.8" strokeDashoffset="175.92" strokeLinecap="round" strokeWidth="12"></circle>
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-black text-slate-900">12/20</span>
            <span className="text-[10px] font-bold text-primary uppercase">Huy hiệu</span>
          </div>
        </div>
        <p className="mt-6 text-center text-slate-500 text-sm font-medium">
          Bé đã hoàn thành <span className="text-primary font-bold">60%</span> hành trình STEAM.
        </p>
      </div>
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-primary/5 p-6 rounded-3xl border-2 border-primary/20 flex items-center gap-4">
          <div className="bg-primary text-white p-3 rounded-2xl">
            <span className="material-symbols-outlined text-3xl">workspace_premium</span>
          </div>
          <div>
            <p className="text-slate-500 font-bold uppercase text-[10px] mb-1">Mới nhất</p>
            <h4 className="font-bold text-slate-800 leading-tight">Siêu Nhân Coding</h4>
          </div>
        </div>
        <div className="bg-secondary/5 p-6 rounded-3xl border-2 border-secondary/20 flex items-center gap-4">
          <div className="bg-secondary text-white p-3 rounded-2xl">
            <span className="material-symbols-outlined text-3xl">local_fire_department</span>
          </div>
          <div>
            <p className="text-slate-500 font-bold uppercase text-[10px] mb-1">Chăm chỉ</p>
            <h4 className="font-bold text-slate-800 leading-tight">7 Ngày Liên Tiếp</h4>
          </div>
        </div>
      </div>
    </section>

    {/* Badges Grid */}
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-2 bg-primary rounded-full"></div>
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Bộ Sưu Tập Huy Hiệu</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-primary/10 hover:border-primary transition-all group text-center">
          <div className="aspect-square bg-gradient-to-tr from-yellow-200 to-yellow-500 rounded-full mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-white text-5xl fill-1">emoji_events</span>
          </div>
          <h4 className="font-bold text-slate-800">Vua Sáng Tạo</h4>
          <p className="text-[10px] text-primary font-bold mt-1">12/10/2023</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-secondary/10 hover:border-secondary transition-all group text-center">
          <div className="aspect-square bg-gradient-to-tr from-blue-200 to-blue-500 rounded-full mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-white text-5xl fill-1">lightbulb</span>
          </div>
          <h4 className="font-bold text-slate-800">Nhà Phát Minh</h4>
          <p className="text-[10px] text-secondary font-bold mt-1">05/10/2023</p>
        </div>
        <div className="bg-slate-100 p-6 rounded-3xl border-2 border-dashed border-slate-300 grayscale opacity-70 group hover:grayscale-0 hover:opacity-100 transition-all text-center">
          <div className="aspect-square bg-slate-400 rounded-full mb-4 flex items-center justify-center shadow-inner">
            <span className="material-symbols-outlined text-white text-5xl">science</span>
          </div>
          <h4 className="font-bold text-slate-500 group-hover:text-slate-800">Bác Học Nhí</h4>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3">
            <div className="bg-primary h-full w-[80%] rounded-full"></div>
          </div>
        </div>
        <div className="bg-slate-100 p-6 rounded-3xl border-2 border-dashed border-slate-300 grayscale opacity-70 group hover:grayscale-0 hover:opacity-100 transition-all text-center">
          <div className="aspect-square bg-slate-400 rounded-full mb-4 flex items-center justify-center shadow-inner">
            <span className="material-symbols-outlined text-white text-5xl">draw</span>
          </div>
          <h4 className="font-bold text-slate-500 group-hover:text-slate-800">Họa Sĩ Nhí</h4>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3">
            <div className="bg-secondary h-full w-[45%] rounded-full"></div>
          </div>
        </div>
      </div>
    </section>

    {/* Upcoming */}
    <section>
      <div className="bg-white p-8 rounded-3xl shadow-sm border-t-8 border-accent">
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-8 flex items-center gap-3">
          <span className="material-symbols-outlined text-accent fill-1">stars</span> Thành tích sắp tới
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-background-light p-5 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined">menu_book</span>
              </div>
              <h5 className="font-bold text-slate-800 text-sm">Mọt Sách Nhí</h5>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full mb-2">
              <div className="bg-primary h-full w-[90%] rounded-full"></div>
            </div>
            <p className="text-[10px] text-slate-500 font-medium italic">Đọc thêm 1 truyện nữa thôi!</p>
          </div>
          {/* Repeat for others can be added dynamically later */}
        </div>
      </div>
    </section>
  </div>
);

const GalleryView = () => (

  <div className="max-w-7xl mx-auto space-y-10">
    {/* Hero Title Section */}
    <section className="text-center md:text-left">
      <div className="inline-block px-4 py-1 rounded-full bg-accent/20 text-yellow-700 text-xs font-bold mb-4 border border-yellow-200 uppercase tracking-wider">
        ✨ Phòng triển lãm năm 2024
      </div>
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
        Phòng Tranh <span className="text-primary underline decoration-secondary/30 decoration-8 underline-offset-8">Sáng Tạo</span> Của Các Bé
      </h2>
      <p className="text-lg text-slate-600 max-w-2xl">
        Mỗi nét vẽ là một ý tưởng bay bổng! Khám phá thế giới đa sắc màu qua lăng kính STEAM của các nghệ sĩ nhí. 🎨✨
      </p>
    </section>

    {/* Filters Section */}
    <section className="bg-white p-6 rounded-3xl shadow-xl shadow-primary/5 border border-primary/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500 flex items-center gap-2">
            <span className="material-symbols-outlined text-xs">face</span> Độ tuổi
          </label>
          <select className="w-full bg-slate-50 border-slate-200 rounded-xl text-sm focus:ring-primary focus:border-primary">
            <option>Tất cả các khối</option>
            <option>Khối Mầm (3-4 tuổi)</option>
            <option>Khối Chồi (4-5 tuổi)</option>
            <option>Khối Lá (5-6 tuổi)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500 flex items-center gap-2">
            <span className="material-symbols-outlined text-xs">grid_view</span> Module học
          </label>
          <select className="w-full bg-slate-50 border-slate-200 rounded-xl text-sm focus:ring-primary focus:border-primary">
            <option>Tất cả Module</option>
            <option>Module 1: Màu sắc cơ bản</option>
            <option>Module 2: Hình khối diệu kỳ</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500 flex items-center gap-2">
            <span className="material-symbols-outlined text-xs">science</span> Chủ đề STEAM
          </label>
          <select className="w-full bg-slate-50 border-slate-200 rounded-xl text-sm focus:ring-primary focus:border-primary">
            <option>Tất cả chủ đề</option>
            <option>Nước và sự sống</option>
            <option>Ánh sáng & Bóng tối</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined">filter_list</span> Lọc
          </button>
        </div>
      </div>
    </section>

    {/* Main Artwork Grid */}
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {/* Card 1 */}
      <div className="break-inside-avoid group cursor-pointer bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEBXzxdYRtD945JKQdq-XB_2RwhLnHGXKv4ol1ojSSvi-l8K_qdy_cgXlO9042DKcbiGlZsbRNdia_vtbedQQkcC55oyW5j7jZ6qm92tAlqR-AIPA8Ydsp6ztwCZjEAskruPdy3NBKBq-IA4nrlINjogeZSOh4wwEqYeoFkery2_o8zJjoF4qcnCWvJ5vfdDaWDA3inp1fW8R1INc7Q9kxk_kBhoh76pxbw3KDFpBWw0CgxorW5-JN2lHKgXz-SsqZ9K5PCQWJkSM" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-primary/90 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-sm">Khối Lá</span>
            <span className="bg-secondary/90 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-sm">Module 4</span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg mb-2 text-slate-800">Bức tranh "Nước lan tỏa"</h3>
          <p className="text-xs italic text-slate-500 leading-relaxed mb-4">"Bé đã biết kết hợp màu sắc và giải thích được hiện tượng mao dẫn qua các nét vẽ loang."</p>
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Bé Tuệ Minh - 5 Tuổi</span>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[18px] text-red-500">favorite</span>
              <span className="text-xs font-bold text-slate-600">24</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="break-inside-avoid group cursor-pointer bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGihpC1DeWM46DS3diSoBmOaFR63opfAKV-vfQ8toCoHLJ4SqC6t8fIMs1xwEpNidA5UUBdit6GPWxvA_Ct10C7KVqALTy3gbPL__G8LTku4G19VUHSFBmo_YM47PslLGf2WKTlk9S8m6CPQJx0cRJnb856pchMQxEIe_faxcr8oxZfgpGkA7oLKfex5aO83hDK-tmnJ6V8LGrd0Cu517RgFNgr_FBuCG8mpAHEilKfG4dESlFcT8YH6-0I67hpxg6J4qmlwFyHoM" />
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg mb-2 text-slate-800">Khu Vườn Của Ánh Sáng</h3>
          <p className="text-xs italic text-slate-500 leading-relaxed pt-4 border-t border-slate-100">Bé Gia Huy - 4 Tuổi</p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="break-inside-avoid group cursor-pointer bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
        <div className="relative aspect-square overflow-hidden">
          <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGe5uWpb6c22PSm6sIHinRKtQBCYOLjTfC01wSs1Q6cQYt6o46X71bCGOlDYF-tEurgUsx0siWTq94DrRQj5MOvWOm-U1mum0ua8bU8Nc9KspDn8LXaIxOA6-wxpJA4KOMjJ_1J4G8YgdtWMs66uNo3aC9cwXkVNmwnDRyEiurqYi1CVDDI2je3v-Tkmy_cxdpwPM1ZfEax5OnlDi-jIOC3ZEHCttszegtr27QavN3pwyERN-4imsHxOKR7zKm1t_Hu8slym2HHso" />
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg mb-2 text-slate-800">Thành Phố Tương Lai</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter pt-4 border-t border-slate-100">Nhóm Sáng Tạo Lá 2</p>
        </div>
      </div>
    </div>
  </div>
);

const StoryView = () => (

  <div className="max-w-6xl mx-auto space-y-10">
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">movie</span>
          Câu Chuyện Thú Vị
        </h3>
        <a className="text-primary text-sm font-bold hover:underline" href="#">Xem tất cả</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Video Card 1 */}
        <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGaRYB229vktQ5mxZ_giqGhNL4A_8IYQHMQ5Y_aK2U9OkPiv9Cvywmmt_ANHvlxx608n3t9G03j9gJsE5wOhCfBqYkvNoJ-_POm9WQ7mwB9sPd6CVNGdeJM4uMGo5-dxcLnsom2c5uEL2GZyg3S_cwQPwBmaiXo_8QNUZY6dc6m0jThj-s07PywQgGxZsYlZGneEHpbCDnxG8P8QUvJx4BASTLjEcwbr4J6r_-nNV28Rdbx5woL_kQCueijXW5_Xj_u60hXEpIA-4')" }}></div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center text-primary transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                <span className="material-symbols-outlined text-4xl">play_arrow</span>
              </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-1 rounded-md backdrop-blur-md">12:45</div>
          </div>
          <div className="p-5">
            <span className="text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">Khám phá</span>
            <h4 className="font-bold text-lg mt-2 leading-snug">Thế giới côn trùng kỳ thú quanh em</h4>
            <div className="flex items-center gap-2 mt-4 text-slate-500 text-xs">
              <span className="material-symbols-outlined text-sm">visibility</span>
              <span>1.2k lượt xem</span>
              <span className="mx-1">•</span>
              <span>2 ngày trước</span>
            </div>
          </div>
        </div>
        {/* Video Card 2 */}
        <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA2B-HmbSOppkrBMida9qt4Um4Ww5kXRgOBeQMYRYbOEW0gZZkXdRjuLAyaphuQ2akgCHvQDMO-nOnEs9e4kPF3JP_RJ-tPM7PtHkS01BZ-8za44tlbco7G2BfiG7Bs1SA0ygNFPfDdp9WjGGBUSAxT4_NDjB_txDl4qUgW1dlmycfRMTz4Xgb6PqRbn_NNNG7YF_aYKsLhz7ivhY7N8pJZRm9oZ2WofPL5_6zlcirEaT_ma9btfQxBGOldk1E1lgkxrTSl2aBKbGU')" }}></div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center text-primary transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                <span className="material-symbols-outlined text-4xl">play_arrow</span>
              </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-1 rounded-md backdrop-blur-md">08:20</div>
          </div>
          <div className="p-5">
            <span className="text-[10px] uppercase tracking-wider font-bold text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full">Sáng tạo</span>
            <h4 className="font-bold text-lg mt-2 leading-snug">Vẽ chú thỏ đáng yêu bằng vân tay</h4>
            <div className="flex items-center gap-2 mt-4 text-slate-500 text-xs">
              <span className="material-symbols-outlined text-sm">visibility</span>
              <span>850 lượt xem</span>
              <span className="mx-1">•</span>
              <span>5 ngày trước</span>
            </div>
          </div>
        </div>
        {/* Video Card 3 */}
        <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDi-1JNt_9CGQgwv8MjKTAtYO6Af81h08DIs5_7MfhV5JispjNAbcpRrsBKcwlWgvJjnK9isfMBSg6xTdQSlChD5dVCxz9AsyIKiqC8LMBQDrpJ1HFqucR9LawimHGywfPAWiFzYJvme4ZK9ojZr9xP3tWtb8s5wCOXW56BSxX-M1G_dBpZSBGKl-HH1D0iwKGpqdubZGdRWyINORClJrGp_uAxUhiCcxecpXYJM51Vi70EYB7NOebOyTAOv3FcljTmB1XVm1eQS08')" }}></div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center text-primary transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                <span className="material-symbols-outlined text-4xl">play_arrow</span>
              </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-1 rounded-md backdrop-blur-md">15:10</div>
          </div>
          <div className="p-5">
            <span className="text-[10px] uppercase tracking-wider font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full">Vận động</span>
            <h4 className="font-bold text-lg mt-2 leading-snug">Yoga buổi sáng cho bé yêu khỏe mạnh</h4>
            <div className="flex items-center gap-2 mt-4 text-slate-500 text-xs">
              <span className="material-symbols-outlined text-sm">visibility</span>
              <span>2.1k lượt xem</span>
              <span className="mx-1">•</span>
              <span>1 tuần trước</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="flex h-screen bg-background-light text-slate-900 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-300 z-20">
        <div className="flex flex-col h-full">
          <div className="h-20 flex flex-col items-center justify-center md:items-start md:px-6 border-b border-slate-100 gap-1">
            <img src="/assets/logo/mainlogo.png" alt="Vẽ Tư Duy STEAM" className="h-8 w-auto object-contain" />
            <span className="hidden md:block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Học sinh</span>
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
            <button
              onClick={() => setActiveTab('stories')}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'stories' ? 'bg-orange-500/10 text-orange-600 font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
            >
              <span className="material-symbols-outlined text-2xl">movie</span>
              <span className="hidden md:block">Câu Chuyện Thú Vị</span>
            </button>
            <button
              onClick={() => setActiveTab('journal')}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'journal' ? 'bg-secondary/10 text-secondary font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
            >
              <span className="material-symbols-outlined text-2xl">auto_stories</span>
              <span className="hidden md:block">Sổ Tay Cá Nhân</span>
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
          {activeTab === 'home' && (
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
          )}

          {activeTab === 'stories' && (
            <StoryView />
          )}

          {activeTab === 'gallery' && (
            <GalleryView />
          )}

          {activeTab === 'achievements' && (
            <AchievementsView />
          )}

          {activeTab === 'journal' && (
            <JournalView />
          )}

          {activeTab !== 'home' && activeTab !== 'stories' && activeTab !== 'journal' && activeTab !== 'gallery' && (
            <div className="flex h-64 items-center justify-center text-slate-400 font-medium bg-white rounded-3xl border-2 border-dashed border-slate-200 max-w-3xl mx-auto">
              Tính năng đang được phát triển
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
