import React, { useState } from 'react';

export default function ParentCommunity() {
  const [activeTab, setActiveTab] = useState('feed');

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
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 md:px-10 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-slate-900">Cộng Đồng Phụ Huynh</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 hide-scrollbar">
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
        </div>
      </main>
    </div>
  );
}
