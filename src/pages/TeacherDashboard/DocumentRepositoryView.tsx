import React from 'react';

export default function DocumentRepositoryView() {
    return (
        <div className="flex-1 pb-12 w-full max-w-7xl mx-auto space-y-8 rounded-[32px] font-display text-slate-800 fade-in">
            {/* Action Bar (Replaces TopNavBar bits for this view context) */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100 gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="bg-primary-container/10 p-3 rounded-2xl text-primary">
                        <span className="material-symbols-outlined text-2xl">folder_shared</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Kho Tài Liệu Thông Minh</h2>
                        <p className="text-sm text-slate-500">Tháng 10, {new Date().getFullYear()}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:shadow-lg transition-all hover:scale-[1.02]">
                        <span className="material-symbols-outlined">cloud_upload</span>
                        Tải lên
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center hover:bg-slate-100 text-slate-600 rounded-full transition-colors border border-slate-200">
                        <span className="material-symbols-outlined">filter_list</span>
                    </button>
                </div>
            </div>

            {/* Dashboard Overview (Bento Style) */}
            <section>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Tài liệu mới */}
                    <div className="bg-green-50/80 border border-green-100 p-6 rounded-3xl relative overflow-hidden group hover:shadow-md transition-all cursor-pointer">
                        <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                            <span className="material-symbols-outlined text-green-600 text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>new_releases</span>
                            <div>
                                <h3 className="font-bold text-sm text-green-800 mb-1">Tài liệu mới</h3>
                                <p className="text-[32px] leading-none font-black text-green-600">24</p>
                            </div>
                        </div>
                        <div className="absolute right-[-10px] bottom-[-10px] opacity-10 group-hover:scale-110 transition-transform duration-500">
                            <span className="material-symbols-outlined text-8xl text-green-600">auto_awesome</span>
                        </div>
                    </div>
                    {/* File Ảnh */}
                    <div className="bg-blue-50/80 border border-blue-100 p-6 rounded-3xl relative overflow-hidden group hover:shadow-md transition-all cursor-pointer">
                        <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                            <span className="material-symbols-outlined text-blue-600 text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>image</span>
                            <div>
                                <h3 className="font-bold text-sm text-blue-800 mb-1">Thư viện ảnh</h3>
                                <p className="text-[32px] leading-none font-black text-blue-600">1.2k</p>
                            </div>
                        </div>
                        <div className="absolute right-[-10px] bottom-[-10px] opacity-10 group-hover:scale-110 transition-transform duration-500">
                            <span className="material-symbols-outlined text-8xl text-blue-600">photo_library</span>
                        </div>
                    </div>
                    {/* PDF Giáo án */}
                    <div className="bg-amber-50/80 border border-amber-100 p-6 rounded-3xl relative overflow-hidden group hover:shadow-md transition-all cursor-pointer">
                        <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                            <span className="material-symbols-outlined text-amber-600 text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>picture_as_pdf</span>
                            <div>
                                <h3 className="font-bold text-sm text-amber-800 mb-1">Giáo án PDF</h3>
                                <p className="text-[32px] leading-none font-black text-amber-600">86</p>
                            </div>
                        </div>
                        <div className="absolute right-[-10px] bottom-[-10px] opacity-10 group-hover:scale-110 transition-transform duration-500">
                            <span className="material-symbols-outlined text-8xl text-amber-600">description</span>
                        </div>
                    </div>
                    {/* Video bài giảng */}
                    <div className="bg-red-50/80 border border-red-100 p-6 rounded-3xl relative overflow-hidden group hover:shadow-md transition-all cursor-pointer">
                        <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                            <span className="material-symbols-outlined text-red-500 text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>video_library</span>
                            <div>
                                <h3 className="font-bold text-sm text-red-800 mb-1">Video bài giảng</h3>
                                <p className="text-[32px] leading-none font-black text-red-500">12</p>
                            </div>
                        </div>
                        <div className="absolute right-[-10px] bottom-[-10px] opacity-10 group-hover:scale-110 transition-transform duration-500">
                            <span className="material-symbols-outlined text-8xl text-red-500">play_circle</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid View: Documents */}
            <section className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[20px] font-bold text-slate-800">Thư mục & Tài liệu gần đây</h2>
                        <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                            <button className="p-2 bg-primary/10 rounded-lg text-primary flex items-center justify-center transition-colors"><span className="material-symbols-outlined text-xl">grid_view</span></button>
                            <button className="p-2 text-slate-400 hover:text-slate-800 flex items-center justify-center transition-colors"><span className="material-symbols-outlined text-xl">list</span></button>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* File Card 1 */}
                        <div className="bg-white rounded-3xl p-5 shadow-sm hover:-translate-y-1 transition-all duration-300 border border-slate-100 group relative flex flex-col">
                            <div className="aspect-video bg-slate-50 rounded-2xl mb-5 overflow-hidden relative">
                                <img alt="STEAM Activity" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLFVUY1rmoSvhz53sBITPI0mqfLLuKvuOO3Md5NkPsEzOIDfAyIfPgUAqS8_IpxE0ZmXIss0pTV5RYZNgWMs9h9clTYFzcEhO3PWYeuw9Nduq7VQfsMeJzDwDpSf9zyT8nfLlCAKW99umsPTEH8XXRZWzs-UM-dJmMH0nV_I9ME6Ynd4IQ-yMM0S2c6wozNwFBAciMMzruRut5hzq8BMw05keXO0epPQzbx58zSbsNnWcCK4PyzpxvGIdG0vVEaOg6Ak8yNOL_tJw" />
                                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 bg-white/90 backdrop-blur shadow-sm rounded-full text-yellow-500 hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-800 truncate mb-1 text-[15px]">Thẻ học cụ STEAM - Robot thông minh</h4>
                                <p className="text-[12px] text-slate-500 flex items-center gap-1.5 font-medium">
                                    <span className="material-symbols-outlined text-[14px]">image</span>
                                    2.4 MB • Cập nhật 2 giờ trước
                                </p>
                            </div>
                            <div className="mt-5 pt-4 border-t border-slate-100/80 flex items-center justify-between">
                                <button className="text-[13px] font-bold text-primary flex items-center gap-1.5 hover:underline">
                                    <span className="material-symbols-outlined text-[16px]">info</span>
                                    Chi tiết
                                </button>
                                <div className="flex gap-1 -mr-2">
                                    <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors rounded-full hover:bg-slate-50"><span className="material-symbols-outlined text-[20px]">share</span></button>
                                    <button className="p-2 text-slate-400 hover:text-primary transition-colors rounded-full hover:bg-slate-50"><span className="material-symbols-outlined text-[20px]">download</span></button>
                                </div>
                            </div>
                        </div>

                        {/* File Card 2 (PDF Style) */}
                        <div className="bg-[#f0faeb] rounded-3xl p-5 shadow-sm hover:-translate-y-1 transition-all duration-300 border-2 border-primary/20 flex flex-col">
                            <div className="aspect-video bg-red-50 rounded-2xl mb-5 flex items-center justify-center relative overflow-hidden group">
                                <span className="material-symbols-outlined text-6xl text-red-400 opacity-60">picture_as_pdf</span>
                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                                    <span className="text-xs font-bold bg-white px-4 py-1.5 rounded-full text-primary shadow-sm hover:scale-105 transition-transform cursor-pointer">Xem trước</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-bold text-slate-800 truncate text-[15px]">Giáo án Tuần 4 - Khối Lá</h4>
                                </div>
                                <p className="text-[12px] text-slate-500 flex items-center gap-1.5 font-medium">
                                    <span className="material-symbols-outlined text-[14px]">description</span>
                                    1.8 MB • Hôm qua
                                </p>
                            </div>
                            <div className="mt-5 pt-4 border-t border-primary/10 flex items-center justify-between">
                                <button className="text-[13px] font-bold text-primary flex items-center gap-1.5 bg-white px-3 py-1 rounded-lg">
                                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                    Đang mở
                                </button>
                                <div className="flex gap-1 -mr-2">
                                    <button className="p-2 text-slate-500 hover:text-blue-600 transition-colors rounded-full hover:bg-white/50"><span className="material-symbols-outlined text-[20px]">share</span></button>
                                    <button className="p-2 text-slate-500 hover:text-primary transition-colors rounded-full hover:bg-white/50"><span className="material-symbols-outlined text-[20px]">download</span></button>
                                </div>
                            </div>
                        </div>

                        {/* File Card 3 (Video Style) */}
                        <div className="bg-white rounded-3xl p-5 shadow-sm hover:-translate-y-1 transition-all duration-300 border border-slate-100 group flex flex-col">
                            <div className="aspect-video bg-slate-900 rounded-2xl mb-5 overflow-hidden relative">
                                <img alt="Video Thumbnail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-k5K0OE_JcYkJKm9Txk5mFYPeYsPjFQNCW0b1hvIDg-wOaa3GyX-6niZrvFGNSkyWO6imiOt-ztjLbIln-7lJrTRZTeCq6HOjXWUEhSHXEaCkYMCRb12OaEBtF---5tngYjruuxCbcuCHOr7SDTvjj7EvA0s7OJidZOKt4ssxtYTJDK3Rix7kNBs5hSEOW3kc6FPFFQ0-RC-5rfme9xY5wyBXljAJl_mOYazzdO5Ofs1ttGrZP2EMDI8jZ0yF2xEs45oy7aJwxmQ" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white ring-2 ring-white/50 group-hover:scale-110 transition-transform cursor-pointer">
                                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-800 truncate mb-1 text-[15px]">Video: Thí nghiệm núi lửa</h4>
                                <p className="text-[12px] text-slate-500 flex items-center gap-1.5 font-medium">
                                    <span className="material-symbols-outlined text-[14px]">videocam</span>
                                    15.2 MB • 05/10/2023
                                </p>
                            </div>
                            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                                <button className="text-[13px] font-bold text-primary flex items-center gap-1.5 hover:underline">
                                    <span className="material-symbols-outlined text-[16px]">info</span>
                                    Chi tiết
                                </button>
                                <div className="flex gap-1 -mr-2">
                                    <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors rounded-full hover:bg-slate-50"><span className="material-symbols-outlined text-[20px]">share</span></button>
                                    <button className="p-2 text-slate-400 hover:text-primary transition-colors rounded-full hover:bg-slate-50"><span className="material-symbols-outlined text-[20px]">download</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Side Panel (Detail View) */}
                <aside className="w-full lg:w-80 bg-white shadow-sm rounded-3xl p-6 flex flex-col gap-6 border border-slate-100 shrink-0">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-slate-800">Chi tiết tập tin</h3>
                        <button className="w-8 h-8 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"><span className="material-symbols-outlined text-xl">close</span></button>
                    </div>
                    
                    <div className="rounded-2xl overflow-hidden aspect-square border border-slate-100">
                        <img alt="Preview Image" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw-F9P3PyhBTvHy76aCsGHgEvbI2qWQ_OSufTppwe9D-ef2FnW0sRscLFzaftWOX0pOC4lI_wNhmSTfEmPJa9JNmvOoz0uKYVQuWvyJm-uCP5O-z4Osmkai9ns6nvat901CltMxblwZqE9vuxAqfcm7iPcqfg5PA4Et0kgh1yiNgbPUsm-rAvMg68jpmAvjToVPrwJc-QZnp8vPvZlE_hSkZjAgikbK5PVe-cD7d0hibmZh-UuX33DPu3YKz1dtOXifmI8MTzTStY" />
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-bold text-slate-800 mb-1 text-[16px]">Giáo án Tuần 4 - Khối Lá</h4>
                            <p className="text-[13px] text-slate-500 leading-relaxed font-medium">Bản thảo giáo án chi tiết chủ đề "Thế giới Động Vật" kèm theo danh sách học cụ chuẩn bị.</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col justify-center items-center text-center">
                                <p className="text-[10px] text-slate-400 uppercase font-bold mb-1 tracking-wider">Loại file</p>
                                <p className="text-[13px] font-bold text-slate-800 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-red-500 text-[14px]">picture_as_pdf</span>
                                    PDF
                                </p>
                            </div>
                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col justify-center items-center text-center">
                                <p className="text-[10px] text-slate-400 uppercase font-bold mb-1 tracking-wider">Kích thước</p>
                                <p className="text-[13px] font-bold text-slate-800">1.8 MB</p>
                            </div>
                        </div>
                        
                        <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                            <button className="w-full py-3.5 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_4px_14px_0_rgba(76,174,79,0.25)] hover:shadow-[0_6px_20px_rgba(76,174,79,0.23)] hover:-translate-y-0.5 transition-all text-[14px]">
                                <span className="material-symbols-outlined">folder</span> Lưu vào thư mục
                            </button>
                            <button className="w-full py-3.5 border border-slate-200 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors text-[14px]">
                                <span className="material-symbols-outlined text-[20px]">share</span> Chia sẻ giáo án
                            </button>
                        </div>
                    </div>
                    
                    <div className="mt-auto p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
                        <p className="text-[12px] font-bold text-blue-800 mb-3 flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">groups</span>
                            Giáo viên cùng xem
                        </p>
                        <div className="flex -space-x-3 mt-1 pl-2">
                            <img alt="User" className="w-9 h-9 rounded-full border-[2.5px] border-white object-cover transform hover:-translate-y-1 transition-transform z-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9cI0UG8pX1l9t6zS1h-jsO0JyNZA47KxMXE7WG58E62Ss3Ia15tUW8O9nMR5YTZgJBH7l_9yxQVPA6hPtlvwIOnYq2J4bD1V0MpCNLexGPo9pU0ZU_OlRH63XXNDJ7F5FlmfOyTSFuFTmU5cQkAbAutcwKGdEXnvg1wlwjDf7GVI_D6jil5VREVeoa7IjdMy9a2duZu6OF5qs7JlzZJ0hUGldVnnwNNL8y_povX8Yxi445UVAZ7g60Obd7Y5tmBf7y7xyPPndgbc" />
                            <img alt="User" className="w-9 h-9 rounded-full border-[2.5px] border-white object-cover transform hover:-translate-y-1 transition-transform z-20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCzXpJa9rTjAzAC6GOVzEbHZqeQAJmhubf-cHV8y2EJSmtd_J1c_-AqotKOzmsYd9fI3F6GhuE19v6oZugVNn9BLhEGCg-nPEnnhFzgMAH4L26IeMR12l0Txp7A9cbBqny6t_jsoCm62cStqDJuZl8t1Ecwln46s3h8-tziONt49Odz8XgtOZMvaW953DZEMU_37u_0CBjr-2mpEQ1P06CPV9TGiSbFg5PQCDD_qr1Mjl85p3xyvJq3H0vRcCsE60etwKBJu_NYRU" />
                            <div className="w-9 h-9 rounded-full border-[2.5px] border-white bg-slate-100 flex items-center justify-center text-[11px] font-black text-slate-500 z-30">+5</div>
                        </div>
                    </div>
                </aside>
            </section>
        </div>
    );
}
