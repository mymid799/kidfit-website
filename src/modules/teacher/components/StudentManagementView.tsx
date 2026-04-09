import React, { useState } from 'react';

export default function StudentManagementView() {
    const [selectedStudent, setSelectedStudent] = useState<string | null>('Bảo Nam');

    return (
        <div className="flex flex-col xl:flex-row gap-8 w-full max-w-[1600px] mx-auto pb-12 animate-in fade-in duration-500">
            {/* Main Content Column */}
            <div className="flex-1 min-w-0 space-y-12">
                {/* Search & Filter Section */}
                <section>
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full max-w-md">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input 
                                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all text-slate-800 shadow-sm outline-none font-bold" 
                                placeholder="Tìm kiếm học sinh..." 
                                type="text"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
                            <button className="px-6 py-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-sm font-bold whitespace-nowrap hover:bg-green-50 hover:text-primary transition-colors text-slate-600">Khối Mầm</button>
                            <button className="px-6 py-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-sm font-bold whitespace-nowrap hover:bg-green-50 hover:text-primary transition-colors text-slate-600">Khối Chồi</button>
                            <button className="px-6 py-3 bg-primary text-white rounded-2xl shadow-md text-sm font-bold whitespace-nowrap hover:bg-primary/90 transition-colors">Khối Lá</button>
                            <button className="px-6 py-3 bg-amber-50 text-amber-600 rounded-2xl text-sm font-bold flex items-center gap-2 whitespace-nowrap hover:bg-amber-100 transition-colors">
                                <span className="material-symbols-outlined text-sm font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span> Dị ứng
                            </button>
                        </div>
                    </div>
                </section>

                {/* Attention Needed Section */}
                <section>
                    <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-slate-800">
                        <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
                        Trẻ cần chú ý hôm nay
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Alert Card 1 */}
                        <div className="bg-white p-6 rounded-[32px] shadow-sm flex items-start gap-5 relative overflow-hidden group border border-slate-100 cursor-pointer hover:shadow-md transition-all">
                            <div className="absolute left-0 top-0 w-2 h-full bg-amber-500"></div>
                            <img className="w-16 h-16 rounded-2xl object-cover ring-4 ring-amber-50 transition-transform group-hover:scale-110" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaXSTvRYi8RwYz1l4m7ynOaBfUm26X9aun_CWO-E4qSOHXzpUnlol36y9HJtPLmnlWJjw7UY2jWkoFNRANXPmxph5AS0W1AdjyDvfY_CRB08EoldjdhJCjHY_J9zzpf84s7FXjH9DJ7lpYsuQwQ-6E44Jt84k93ppwpJxNiiZ8nZ8btPRfDi4w_D5Z04ob-ZR1PayuHx4RLhsmttciXIWi4AgFZadeOzWBNn7fM1YFwmKB6mR0PTgxBt5TC9G1juFxMzXIfwa5jw4" />
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-black text-lg text-slate-800">Bảo Nam</h3>
                                    <span className="material-symbols-outlined text-amber-500 bg-amber-50 p-1.5 rounded-xl" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                                </div>
                                <p className="text-sm font-bold text-slate-500">Dị ứng: Sữa đậu nành, Phấn hoa</p>
                                <div className="mt-4 flex items-center gap-2">
                                    <span className="px-3 py-1.5 bg-amber-50 text-amber-700 text-[10px] font-black rounded-full uppercase tracking-widest">Cần theo dõi sát</span>
                                </div>
                            </div>
                        </div>

                        {/* Alert Card 2 */}
                        <div className="bg-white p-6 rounded-[32px] shadow-sm flex items-start gap-5 relative overflow-hidden group border border-slate-100 cursor-pointer hover:shadow-md transition-all">
                            <div className="absolute left-0 top-0 w-2 h-full bg-red-500"></div>
                            <img className="w-16 h-16 rounded-2xl object-cover ring-4 ring-red-50 transition-transform group-hover:scale-110" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw68szHN2btW_24_NtstK4N37A5Rsohx7n8TxipH0_eMGkJ_ukB00YmfwjoYyyefxflwccR_Si2GzvynVN_d0yAet6aqCssJ7Hry1VFknXK4ydlxhYVHjAgisTLURiuGVYj5NcCX0PfleLW1uauG5YubwFrwvmh75rlx034k_st6Bn3Do0HV0QCM5Besq6Td93F-a5B4cah_mkY63eLDSFqyQl5Ctev_Ff1ZWrBdw64AFEE-UarTInvNt6wn2k43r8nr1lKvfxxjQ" />
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-black text-lg text-slate-800">Gia Linh</h3>
                                    <span className="material-symbols-outlined text-red-500 bg-red-50 p-1.5 rounded-xl">thermometer</span>
                                </div>
                                <p className="text-sm font-bold text-slate-500">Sốt nhẹ 37.5°C lúc 08:30 AM</p>
                                <div className="mt-4 flex items-center gap-2">
                                    <span className="px-3 py-1.5 bg-red-50 text-red-700 text-[10px] font-black rounded-full uppercase tracking-widest">Bố đón sớm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Student Grid */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black flex items-center gap-3 text-slate-800">
                            <span className="w-2 h-8 bg-primary rounded-full"></span>
                            Danh sách lớp STEAM A1
                        </h2>
                        <span className="text-slate-500 text-sm font-bold bg-slate-100 px-4 py-1.5 rounded-full">Hiện diện: 22/24</span>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Card 1 */}
                        <div className="bg-white px-5 py-6 rounded-[32px] shadow-sm border border-slate-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group flex flex-col items-center text-center">
                            <div className="relative mb-5">
                                <img className="w-24 h-24 rounded-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Child profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCILwV7oh_22DEOK1IE_BoAisBu7ZNbIs9dnL-9xI6UZ7klJarUPUrB_FmYsGq6tVmALe0DFnfGfbDTb4ID2Xf6i5NW3cbA4044r_9v6eb1_qiiRa1wlyJjqWFJ87ScpX9kcYqr0M2sA-dqSFHQgo6lLiRwuJguUvaZdljXfOVXPn0LS5WBAi8dLMJ_IJYI1eShFr2ZqS_Wj6HFkNci2KDqbQ3BDv20g1KSxrJ_7Eq7BE2HwZgPgRjGcc06gYPi7V4fCncGXHnM_9U" />
                                <span className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></span>
                            </div>
                            <h4 className="font-black text-lg text-slate-800 mb-1">Minh Khôi</h4>
                            <p className="text-[11px] font-bold text-slate-400 mb-5 uppercase tracking-widest">ID: 240982</p>
                            <span className="px-4 py-1.5 bg-green-50 text-green-700 text-[10px] font-black rounded-full uppercase tracking-widest w-full">Đã đến</span>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white px-5 py-6 rounded-[32px] shadow-sm border border-slate-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group flex flex-col items-center text-center">
                            <div className="relative mb-5">
                                <img className="w-24 h-24 rounded-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Child profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdvT8xf6nHoTFtRJ5rJNvDJctUx6smNShr_KoJoXcjofH5S0eO9mG8yABY6V1_A__09_p4dY1fpv9f698xg1f8sHxA50WF3sjRuEHNlWkILEoqM1MKfnclO9vhlrKfrlJXzlF81OVeGeWLZwo7FkvKBOqmiRNyM2fB_Sj9WAbZuOZdh2B0apHy2CbDz9xuufhmnYov5kx0tr5_xGnQwwW2Vay894mhHYpfcYHVvNrGCKJMrAhG0s7NqVI-YkHhHYi-wJJUxiKm8SQ" />
                                <span className="absolute bottom-1 right-1 w-6 h-6 bg-amber-500 border-4 border-white rounded-full"></span>
                            </div>
                            <h4 className="font-black text-lg text-slate-800 mb-1">Tuệ Nhi</h4>
                            <p className="text-[11px] font-bold text-slate-400 mb-5 uppercase tracking-widest">ID: 240985</p>
                            <span className="px-4 py-1.5 bg-amber-50 text-amber-700 text-[10px] font-black rounded-full uppercase tracking-widest w-full">Vào muộn</span>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white px-5 py-6 rounded-[32px] shadow-sm border border-slate-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group flex flex-col items-center text-center">
                            <div className="relative mb-5">
                                <img className="w-24 h-24 rounded-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Child profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy6xSUmfp1bTorzR5naJ4nwI86n9-Vti2ilFfJUrpYDE8L6YzbHVPD3NMqGWOM5tscXcnCgC54InKMPya1E1kcswCv8QSJ7XDUEMErFtXSP7myrxhSeergSiyKa10CT45OUTFXuULb1HceQHo6UZsY5t6FnRWvlrHNsEL4jrtsh1iE1GAblY66gM6ODl4agfj-koeSZQynheckUK42ococKpRQPt6Gdoz94Q7trQRiv_t3WWo1Vr7GoHmRLVZd6JlLV2TAqhPiuRI" />
                                <span className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></span>
                            </div>
                            <h4 className="font-black text-lg text-slate-800 mb-1">Đức Anh</h4>
                            <p className="text-[11px] font-bold text-slate-400 mb-5 uppercase tracking-widest">ID: 240990</p>
                            <span className="px-4 py-1.5 bg-green-50 text-green-700 text-[10px] font-black rounded-full uppercase tracking-widest w-full">Đã đến</span>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white px-5 py-6 rounded-[32px] shadow-sm border border-slate-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group flex flex-col items-center text-center opacity-75 grayscale hover:grayscale-0 hover:opacity-100">
                            <div className="relative mb-5">
                                <img className="w-24 h-24 rounded-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Child profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGNhwfzdYwJkCt2fJ_2RelW1hYhtfCrKrhzkXPpZX6aUVH2OshanDsDDXtJBu_lU-vJyePyuGojTiIIfzSs4TP7MtTjK944aV9xuviwR_FKCtK8y-OypxibJ28DjGJ68fD9kicrwlwofvC_ISLr3eHqu-ermMOMej9rjlBjd3JcHA_1IMqFSyLck4K9qrBdTKz-RkIb5CYGXv2aU6I-_vGjUUvM4hZ0j2oMMfBij0zx3iYnpMtHBcPQ3MHp9DbuDND4rL9Q6hNW3I" />
                                <span className="absolute bottom-1 right-1 w-6 h-6 bg-slate-300 border-4 border-white rounded-full"></span>
                            </div>
                            <h4 className="font-black text-lg text-slate-800 mb-1">Hải Yến</h4>
                            <p className="text-[11px] font-bold text-slate-400 mb-5 uppercase tracking-widest">ID: 241002</p>
                            <span className="px-4 py-1.5 bg-slate-100 text-slate-500 text-[10px] font-black rounded-full uppercase tracking-widest w-full">Nghỉ phép</span>
                        </div>
                    </div>
                </section>
            </div>

            {/* Slide Panel (Right Side) - Detail View */}
            <aside className="w-full xl:w-[420px] shrink-0 bg-white rounded-[40px] shadow-sm border border-slate-100 p-8 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-black text-xl text-slate-800">Hồ sơ chi tiết</h3>
                    <button className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 hover:text-slate-800 transition-colors">
                        <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                </div>

                {/* Child Large Profile */}
                <div className="relative rounded-[32px] overflow-hidden mb-8 aspect-[4/3] group shadow-inner">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Close up" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvmCwYcv_FYT8cz-fn2jrmctPe-7_VYc6YDTh1ODvHmxyfIH_xPNGso1xzD_FVSs4IHFgs6rt-r0FOB256yJewjMpsGnqFrIIWFkriVnZNTlyNfSXjvvX0CvyVTjqI36ifyRlW1oOecEStHsI8L-PUXx6ztithWyIP8TckmP7F8zuo9v2WKvp0iQ0m0E57AicsRQeInKx67b9kxkNuqjLuou-tFdd50dsCJaF9kBKOax5Dj6gvEq4tNYgnps_qzopJxbU6PeW7atY" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white text-[10px] font-black uppercase tracking-widest">STEAM A1</span>
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white text-[10px] font-black uppercase tracking-widest">5 tuổi</span>
                        </div>
                        <h2 className="text-3xl font-black text-white">{selectedStudent}</h2>
                    </div>
                </div>

                <div className="space-y-6 flex-1">
                    {/* Health Info Section */}
                    <div className="bg-amber-50/50 p-6 rounded-[24px] border border-amber-100">
                        <div className="flex items-center gap-3 mb-4 text-amber-700">
                            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>medical_information</span>
                            <h4 className="font-black text-[15px] uppercase tracking-widest">Sức khỏe & Lưu ý</h4>
                        </div>
                        <ul className="space-y-3 text-sm font-bold">
                            <li className="flex justify-between items-center py-2 border-b border-amber-100">
                                <span className="text-slate-500">Dị ứng</span>
                                <span className="text-red-500 bg-red-50 px-3 py-1 rounded-lg">Sữa đậu nành</span>
                            </li>
                            <li className="flex justify-between items-center py-2 border-b border-amber-100">
                                <span className="text-slate-500">Nhóm máu</span>
                                <span className="text-slate-800">O+</span>
                            </li>
                            <li className="flex justify-between items-center py-2">
                                <span className="text-slate-500">Chiều cao/Cân nặng</span>
                                <span className="text-slate-800">112cm - 20kg</span>
                            </li>
                        </ul>
                    </div>

                    {/* Emergency Contact */}
                    <div className="bg-blue-50/50 p-6 rounded-[24px] border border-blue-100">
                        <div className="flex items-center gap-3 mb-4 text-blue-700">
                            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>contact_phone</span>
                            <h4 className="font-black text-[15px] uppercase tracking-widest">Người giám hộ</h4>
                        </div>
                        <div className="flex items-center gap-4">
                            <img className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-sm" alt="Mother" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3Vz0vNlvwEI9MNlQ_DhQafJ0VlyJmLKSIMAhIaYiq_iODrVsjeFqQs4oCNPoCTly7nD1EGplW2j4OvUovQCuTlDcTWi5iu5igtTRhOrJhS_R7TH0xuV8EJup6DcqvfIcj6OMstyNq8VkkijCD0URrqyZocaci955x09_rmoWFletH_V_cDdcb8r1A_VCxnNjyFQvNTnfzr4SLJbdhCeSRIy2cGkTyiwpYHaPxChHTQXpTVaDn017ersiaGqqkDg_gotruqmi1K20" />
                            <div className="flex-1 min-w-0">
                                <p className="font-black text-[15px] text-slate-800 truncate">Chị Thu Thủy (Mẹ)</p>
                                <p className="text-[13px] text-slate-500 font-bold mt-0.5">090 123 4567</p>
                            </div>
                            <button className="w-12 h-12 bg-white text-blue-600 rounded-[16px] flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-blue-100">
                                <span className="material-symbols-outlined">call</span>
                            </button>
                        </div>
                    </div>

                    {/* Teacher Notes */}
                    <div>
                        <h4 className="font-black text-[13px] uppercase tracking-widest text-slate-400 mb-3 px-2">Ghi chú gần đây</h4>
                        <div className="bg-slate-50 p-5 rounded-[24px] font-bold text-[13px] text-slate-600 leading-relaxed border border-slate-100">
                            "Bé Nam dạo này rất thích các bài học về lắp ráp robot. Cần khuyến khích bé chia sẻ đồ chơi với các bạn cùng nhóm hơn."
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
                    <button className="py-4 bg-slate-50 text-slate-600 font-black rounded-2xl hover:bg-slate-100 transition-colors uppercase tracking-widest text-[11px]">
                        Lịch sử điểm danh
                    </button>
                    <button className="py-4 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all uppercase tracking-widest text-[11px]">
                        Cập nhật hồ sơ
                    </button>
                </div>
            </aside>
        </div>
    );
}
