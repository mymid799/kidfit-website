import React from 'react';

const InteractiveCommunity = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Sidebar Navigation */}
            <aside className="hidden lg:flex flex-col w-64 shrink-0 gap-8">
                <div className="flex flex-col gap-2">
                    <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Cộng Đồng</h3>
                    <a className="flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20" href="#">
                        <span className="material-symbols-outlined">dynamic_feed</span>
                        <span className="font-medium">Bài Viết Mới</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 hover:bg-primary/5 rounded-xl text-slate-600 transition-all" href="#">
                        <span className="material-symbols-outlined">explore</span>
                        <span className="font-medium">Khám Phá</span>
                    </a>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Chủ Đề Thảo Luận</h3>
                    <a className="flex items-center gap-3 px-4 py-3 hover:bg-primary/5 rounded-xl text-slate-600 transition-all group" href="#">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                            <span className="material-symbols-outlined text-lg">rocket_launch</span>
                        </div>
                        <span className="font-medium group-hover:text-primary">STEAM sharing</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 hover:bg-primary/5 rounded-xl text-slate-600 transition-all group" href="#">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                            <span className="material-symbols-outlined text-lg">palette</span>
                        </div>
                        <span className="font-medium group-hover:text-primary">Drawing tips</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 hover:bg-primary/5 rounded-xl text-slate-600 transition-all group" href="#">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                            <span className="material-symbols-outlined text-lg">dark_mode</span>
                        </div>
                        <span className="font-medium group-hover:text-primary">Kể chuyện đêm khuya</span>
                    </a>
                </div>
                {/* Promo Card */}
                <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-primary to-green-600 text-white shadow-xl shadow-primary/30">
                    <p className="text-sm font-medium opacity-90 mb-3">Tham gia workshop nuôi dạy con cuối tuần này!</p>
                    <button className="w-full py-2 bg-white text-primary rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">Đăng ký ngay</button>
                </div>
            </aside>
            
            {/* Main Content Area */}
            <main className="flex-1 flex flex-col gap-6 max-w-[800px] xl:max-w-none">
                {/* Create Post Form */}
                <section className="bg-white border border-primary/10 rounded-3xl p-6 shadow-sm ring-4 ring-primary/5">
                    <div className="flex gap-4">
                        <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden shrink-0 border-2 border-primary/20 bg-blue-50">
                            <img className="w-full h-full object-cover" src="https://api.dicebear.com/7.x/avataaars/svg?seed=parent_flora" alt="Current user avatar" />
                        </div>
                        <div className="flex-1">
                            <textarea className="w-full border-none focus:ring-0 resize-none bg-transparent outline-none placeholder:text-slate-400 text-lg py-1 min-h-[60px]" placeholder="Bạn muốn chia sẻ điều gì với các phụ huynh khác?"></textarea>
                            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                                <div className="flex gap-1 flex-wrap">
                                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-primary/10 rounded-full text-slate-600 transition-all">
                                        <span className="material-symbols-outlined text-primary text-xl">image</span>
                                        <span className="text-sm font-medium hidden sm:inline">Ảnh</span>
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-primary/10 rounded-full text-slate-600 transition-all">
                                        <span className="material-symbols-outlined text-blue-400 text-xl">videocam</span>
                                        <span className="text-sm font-medium hidden sm:inline">Video</span>
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-primary/10 rounded-full text-slate-600 transition-all">
                                        <span className="material-symbols-outlined text-orange-400 text-xl">sentiment_satisfied</span>
                                        <span className="text-sm font-medium hidden sm:inline">Cảm xúc</span>
                                    </button>
                                </div>
                                <button className="bg-primary text-white px-6 sm:px-8 py-2 sm:py-2.5 rounded-full font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all text-sm sm:text-base whitespace-nowrap">
                                    Đăng bài
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Post Feed */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white border border-primary/10 rounded-[24px] p-4 shadow-sm flex flex-col gap-3">
                        <div className="flex items-center gap-2 px-2">
                            <span className="material-symbols-outlined text-primary text-sm">filter_list</span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Phân loại theo khối</span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full border border-green-100 hover:bg-green-100 transition-all group">
                                <span className="material-symbols-outlined text-lg">child_care</span>
                                <span className="text-sm font-medium">Khối Mầm</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full border border-blue-100 hover:bg-blue-100 transition-all group">
                                <span className="material-symbols-outlined text-lg">eco</span>
                                <span className="text-sm font-medium">Khối Chồi</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-full border border-orange-100 hover:bg-orange-100 transition-all group">
                                <span className="material-symbols-outlined text-lg">forest</span>
                                <span className="text-sm font-medium">Khối Lá</span>
                            </button>
                        </div>
                    </div>
                    
                    {/* Post Card 1 */}
                    <article className="bg-blue-50/50 border border-blue-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="p-5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full overflow-hidden bg-white shadow-sm ring-2 ring-blue-100 bg-blue-50">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0RkyzeoEgLdijqPp0YhKKUVgUxVGAWhoEZ39FHiXOYT7N4DtqZRyljaol6pe8f0OTEQOxTopFAk7suRf3aKMn2u9b_aaOLMYSgUP_oswj5Mt4-su8N1jJbpj-zEkUBhfkviAQUqtbYfLV92A4zn75jM1VntPazZDE40Bep22j4sY74p5RQMKitxFGOksD1jRdyyfXHjJwOoC0CYdtF8zM33eFB_5l3WkTqwje_y42PF7vF1dstqv7z3XbvLc5Y6tfTUe6Cb88FF0" alt="Sarah" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[15px] text-blue-900">Thanh Mai</h4>
                                    <p className="text-xs text-blue-500 font-medium">2 giờ trước • STEAM sharing</p>
                                </div>
                            </div>
                            <button className="p-1 hover:bg-blue-100 rounded-full text-blue-400">
                                <span className="material-symbols-outlined">more_horiz</span>
                            </button>
                        </div>
                        <div className="px-5 pb-3">
                            <h3 className="text-xl font-bold mb-2 text-blue-900">Thí nghiệm núi lửa phun trào tại gia 🌋</h3>
                            <p className="text-blue-800/80 text-[15px] leading-relaxed mb-4">
                                Bé nhà mình cực kỳ hào hứng với hoạt động này! Chỉ cần baking soda và giấm màu là đã có một buổi chiều học STEAM siêu thú vị.
                            </p>
                        </div>
                        <div className="px-5">
                            <div className="aspect-video w-full rounded-2xl overflow-hidden mb-4 shadow-inner ring-1 ring-blue-100 bg-blue-100">
                                <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQfwubML4RsegHfZp03opiVWz3UCS4FSUNsvMquY0yYeg9mJMvbbpndyAnBH4yvHFg0Xh4W1yMS-qbli5RnLPY7tCeSWU7t4M2HxUGOASkhAuAGzfhqUe9RQiNojxKFD8ACglQrgKseGnIBHtockG4BBjkuPGpCmVGvPan86b2hihCfTmuGC606IC5A5SEuVeBbrHeC41aYK--6oLpjnuk41meyAuVTSKeCsZNuVJlsype6jWogw7NqJU0hONkL0gX58hfkIkQgEw" alt="Experiment" />
                            </div>
                        </div>
                        <div className="px-5 py-4 border-t border-blue-100 flex items-center justify-between bg-blue-50/30">
                            <div className="flex items-center gap-6">
                                <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors group outline-none">
                                    <span className="material-symbols-outlined group-hover:scale-110 transition-transform">favorite</span>
                                    <span className="text-sm font-semibold">124</span>
                                </button>
                                <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors outline-none">
                                    <span className="material-symbols-outlined">chat_bubble</span>
                                    <span className="text-sm font-semibold">18</span>
                                </button>
                            </div>
                            <button className="text-blue-500 hover:text-blue-600 outline-none">
                                <span className="material-symbols-outlined">bookmark</span>
                            </button>
                        </div>
                    </article>
                    
                    {/* Post Card 2 */}
                    <article className="bg-orange-50/50 border border-orange-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="p-5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full overflow-hidden bg-white shadow-sm ring-2 ring-orange-100 bg-orange-50">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbsfGw_lEDxza40ovmDSsjTlXyGaXEPDzNoWoACtZweX8DqEy54iNlIB_qjicNOwRGCdSAnmXsK94P9GqG7TYvYDt_WvbTV6TV1VKEktG5DhYd7-ARDB09VrqJYRhiv1m5RLIiRTWNr7JkPNJXBgUvWeln5KuUUZca5sztbNnu7vUy8z8wFdHJvYK9cX1N4xCFQ0Xx7t-WfdF236HNOmlVb2fOj7C4hBkV_ud2SLbpYMABZL--jazoqwhodATXmlhsZx088cn1J54" alt="Nam" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[15px] text-orange-900">Anh Tuấn</h4>
                                    <p className="text-xs text-orange-500 font-medium">5 giờ trước • Drawing tips</p>
                                </div>
                            </div>
                            <button className="p-1 hover:bg-orange-100 rounded-full text-orange-400">
                                <span className="material-symbols-outlined">more_horiz</span>
                            </button>
                        </div>
                        <div className="px-5 pb-5">
                            <h3 className="text-xl font-bold mb-2 text-orange-900">Cách giúp trẻ 4 tuổi cầm bút vẽ đúng cách 🎨</h3>
                            <p className="text-orange-800/80 text-[15px] leading-relaxed">
                                Đừng ép trẻ cầm bút quá sớm, hãy bắt đầu bằng việc rèn luyện cơ tay thông qua nặn đất sét hoặc xé giấy dán tranh...
                            </p>
                        </div>
                        <div className="px-5 py-4 border-t border-orange-100 flex items-center justify-between bg-orange-50/30">
                            <div className="flex items-center gap-6">
                                <button className="flex items-center gap-2 text-primary font-bold outline-none">
                                    <span className="material-symbols-outlined fill-[1]">favorite</span>
                                    <span className="text-sm">56</span>
                                </button>
                                <button className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors outline-none">
                                    <span className="material-symbols-outlined">chat_bubble</span>
                                    <span className="text-sm font-semibold">4</span>
                                </button>
                            </div>
                            <button className="text-orange-500 hover:text-orange-600 outline-none">
                                <span className="material-symbols-outlined">bookmark</span>
                            </button>
                        </div>
                    </article>
                </div>
            </main>
            
            {/* Right Sidebar: Stats & Trending */}
            <aside className="hidden xl:flex flex-col w-72 shrink-0 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-800">
                        <span className="material-symbols-outlined text-primary">trending_up</span>
                        Xu hướng thảo luận
                    </h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">#NhaTre</span>
                            <span className="text-md font-bold text-slate-800 mt-1">Kinh nghiệm chọn trường mầm non</span>
                            <span className="text-xs font-bold text-primary mt-1.5">150 bài viết mới</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">#Suckhoe</span>
                            <span className="text-md font-bold text-slate-800 mt-1">Tăng đề kháng cho trẻ mùa lạnh</span>
                            <span className="text-xs font-bold text-primary mt-1.5">89 bài viết mới</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">#AmThuc</span>
                            <span className="text-md font-bold text-slate-800 mt-1">Thực đơn BLW cho bé 6 tháng</span>
                            <span className="text-xs font-bold text-primary mt-1.5">42 bài viết mới</span>
                        </div>
                    </div>
                </div>
                
                <div className="bg-[#e8f5e9] rounded-2xl p-6 border border-primary/20 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-[#2e7d32]">Thành viên tích cực</h3>
                        <span className="material-symbols-outlined text-primary text-xl">stars</span>
                    </div>
                    <p className="text-xs text-[#2e7d32]/80 font-medium mb-6 leading-relaxed">Những phụ huynh chia sẻ nhiều cảm hứng nhất tuần này</p>
                    <div className="flex flex-wrap gap-4">
                        <div className="relative group hover:-translate-y-1 transition-transform cursor-pointer">
                            <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-md ring-2 ring-primary bg-white">
                                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM4duJwOeGy5N07I7j-QZUtkvlIotDhoJOCR8ALHPWwQNrqE0zW3X-ujn-_xBvzVPm_tp2eS12MBwlfz7JUHK7WL_oLkaRZNgcGdG4SyabbVMnAO9cuf2G1Ho-ukID-hU3rCiRQPEVk_q5tVtMOKYxISCVUMZkjPo4Lg-UUKlzFw7KDL6cWgh-q7K5xr87m1oPu1ku1DSvjMhBvg07AUjDsh6BVFWExXMfjeprlxkJdfpxLHgVoPG5Ro0BadneLrDnsa8Q0clQDzc" alt="M1" />
                            </div>
                            <div className="absolute -bottom-1 -right-2 bg-white text-[9px] px-1.5 py-0.5 rounded-full shadow-md border border-slate-100 font-black text-primary">Top 1</div>
                        </div>
                        <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-md ring-2 ring-transparent bg-white hover:-translate-y-1 transition-transform cursor-pointer">
                            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZFHM1kcdsSX3RxVnmq8-8iCKOtgj2skEEYLXJ_l2Uq98CaA2ObunAANF2URKNM0KqiSCqnBb8hX4GAx1YC8lavKptrKMErxWhDbQS9RRDp0PDYL9UNyIJmioLI2K0koTTg1qwLRX8CK4vZr3veVQcW6pY7QP6rKXAGklcmV3-CQeuD9aLPAQbbOQ3PoFMh6NvUB8_mrtlOnVCG6QgZoiADoT3m6PP5L-Jex0XHMNfUdUSb2w17RlRKBc4k-iZfjJ5tw8YAxUP8aA" alt="M2" />
                        </div>
                        <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-md ring-2 ring-transparent bg-white hover:-translate-y-1 transition-transform cursor-pointer">
                            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrfLha_Q7kLZYfvMvLW7B9NPEIwRYxGcCHuSOp8gGs1-cHBkFdruh-gGjqwsGkbVVcVhd0u1QgEofJrEVCdKELA35KPwmi0NNXe0jlTPwZb6r-hlb8p3eUiFIcKVjfxHrTkHFNcr_Tbs2f2cpLhM6ihFhE8nclqNWxH74u3DFMvFVhH68i1ikV3nMgxLuAJ8f_78Z6tZKyH7d1qKdqW_MVwkMAVVOdP-pE6YoSemErE7Keefj7RUBOi5yjMVv8qZRMmAdtorITfnM" alt="M3" />
                        </div>
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-[13px] font-black border-2 border-white shadow-md hover:-translate-y-1 transition-transform cursor-pointer">
                            +12
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default InteractiveCommunity;
