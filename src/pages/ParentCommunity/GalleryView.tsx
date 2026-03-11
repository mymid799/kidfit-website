import React from 'react';

const GalleryView = () => {
    // Trong thực tế, có thể sử dụng endpoint video/gallery đã có
    // Ở đây ta mock data cho sinh động
    const galleryItems = [
        { id: 1, title: 'Bé khám phá thế giới nước', img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800', date: '10/03/2026', tag: 'Sáng tạo' },
        { id: 2, title: 'Buổi tập yoga nhí', img: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=80&w=800', date: '08/03/2026', tag: 'Thể chất' },
        { id: 3, title: 'Lễ hội hoa xuân', img: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&q=80&w=800', date: '05/03/2026', tag: 'Dã ngoại' },
        { id: 4, title: 'Bữa trưa ngon miệng', img: 'https://images.unsplash.com/photo-1440288736878-766bd5839edb?auto=format&fit=crop&q=80&w=800', date: '03/03/2026', tag: 'Sinh hoạt' },
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-800">Khoảnh Khắc Của Bé</h2>
                    <p className="text-slate-400 font-bold mt-1 uppercase text-[10px] tracking-widest">Những hình ảnh đẹp được ghi lại tại trường</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-black shadow-sm text-slate-500 hover:text-primary hover:border-primary/20 transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">filter_alt</span>
                        Mới nhất
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {galleryItems.map(item => (
                    <div key={item.id} className="group relative bg-white p-3 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all">
                        <div className="aspect-[3/4] rounded-[30px] overflow-hidden relative shadow-inner">
                            <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mx-auto hover:bg-white hover:text-primary transition-all shadow-lg">
                                    <span className="material-symbols-outlined">visibility</span>
                                </button>
                            </div>
                            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                                {item.tag}
                            </span>
                        </div>
                        <div className="p-4 space-y-1">
                            <h3 className="text-sm font-black text-slate-800 line-clamp-1">{item.title}</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-primary/5 rounded-[40px] border border-primary/10 p-12 text-center">
                <h3 className="font-black text-primary text-xl">Tham gia cộng đồng phụ huynh ngay</h3>
                <p className="text-slate-500 font-medium text-sm mt-2 max-w-lg mx-auto leading-relaxed">Để xem thêm hàng ngàn khoảnh khắc ý nghĩa khác và cùng thảo luận về sự phát triển của các bé yêu tại Vẽ Tư Duy STEAM.</p>
                <button className="mt-8 px-8 py-3.5 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/30 hover:bg-green-600 active:scale-95 transition-all">Gửi Lời Chúc Tới Bé</button>
            </div>
        </div>
    );
};

export default GalleryView;
