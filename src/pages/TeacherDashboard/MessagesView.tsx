import React from 'react';

export default function MessagesView() {
    return (
        <div className="flex h-[calc(100vh-120px)] overflow-hidden -mx-8 -mt-6">
            <div className="flex-1 p-6 grid grid-cols-12 gap-6 overflow-y-auto bg-slate-50/50">
                {/* Left Sidebar: Contact List */}
                <div className="col-span-12 md:col-span-4 lg:col-span-3 flex flex-col gap-4">
                    <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-6 px-1">
                            <h3 className="font-black text-slate-800 text-lg">Cuộc hội thoại</h3>
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-xl text-[10px] font-bold">12 MỚI</span>
                        </div>
                        <div className="space-y-3">
                            {/* Contact Item Active */}
                            <div className="p-3 bg-green-50 rounded-2xl flex items-center gap-3 border-l-4 border-primary cursor-pointer hover:bg-green-100/50 transition-colors">
                                <div className="relative">
                                    <img alt="Avatar" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ3B1ybIkMAKWqPn7T0lX0tKscZzzgSa31qZFkyYTELSWREjexFuYq0LcqXSaBOoI-rOj8c2rD0Z1fz8Im9A6ims1mw1KO70_JR_wv2VY0TGPlZ0kqZJxeihcEGDwCfkyAw7bSVf15x6fvBat0WIExdy_J38h1qSabkESBIi8LztuWfKNxCDL9a8X2eSubn1fwCOsA9F2wbDNLgRKYaTGrHEYq9748IfoDHtkkKxt_Q3tHvdb7xkAWaFbG5Pm7PMDXiqZskafw3nE" />
                                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-primary border-2 border-white rounded-full"></span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[15px] font-bold text-green-900 truncate">Phụ huynh Bé Bi</p>
                                    <p className="text-xs text-green-700 truncate font-medium mt-0.5">✨ Bé ăn ngoan, đã...</p>
                                </div>
                                <span className="text-[10px] font-bold text-green-600 whitespace-nowrap">2 phút</span>
                            </div>

                            {/* Contact Items */}
                            <div className="p-3 hover:bg-slate-50 rounded-2xl flex items-center gap-3 transition-colors cursor-pointer group">
                                <img alt="Avatar" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDotCkLvBV8rAzqxepT2eKni7zklT7W-iiUBp23l5MHsBh-BZFz1lScM1ZkAdVi_yidPhCNJYFB-FmCJpFajpylkFcy2qEtIqLHv6_nN4K-G1hTezpiNnUaoF-BjCKIeugX3EpeERZqzNVFUtJqmo21ucRsu6VEoSEZhxQyCArkjq31tJIflqmaYl0gmA0xPVOg3WxLV6vjAjcB5yCmOA2IdGvnEVek00H6pMJc4SATr_lrCNDOKe8mmnvsRmj4aiqQFan4_fmSFKE" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-[15px] font-bold text-slate-800 truncate group-hover:text-primary transition-colors">Mẹ Bé Bắp</p>
                                    <p className="text-xs text-slate-400 truncate mt-0.5">Chiều nay cô cho bé...</p>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400">15 phút</span>
                            </div>

                            <div className="p-3 hover:bg-slate-50 rounded-2xl flex items-center gap-3 transition-colors cursor-pointer group">
                                <img alt="Avatar" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEi6mdjAuMxxLdOZFB_JY_t1DMzgTUt0Ovyvt3hMSyV3Pc9yaJ9OSvritjQia6NqYBknnGwytqjytgJmk5mvcKJIzh8VGp8_DIF2-TpuMowvb5mA1RHOLnDreU4x7_8CrzLkZwXMx12UmCE77C8wpScYI3eGb3a2NahhH_Eor7ztPEk2uxcq5foEngM1zsZBcWDUYHbd5Uao7aFSYJJV_9EMHzdXl-u_uF8d5qKaxuwpSb4uTm8jvpmuBJjH5xlWn5LDGSeJsEvq0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-[15px] font-bold text-slate-800 truncate group-hover:text-primary transition-colors">Bố Bé Kem</p>
                                    <p className="text-xs text-slate-400 truncate mt-0.5">Cảm ơn cô nhiều ạ!</p>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400">1 giờ</span>
                            </div>
                        </div>
                    </div>

                    {/* Mini Dashboard Widgets */}
                    <div className="bg-primary/5 p-5 rounded-3xl border border-primary/10">
                        <h4 className="text-xs font-black tracking-widest uppercase text-primary mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px]">analytics</span>
                            Tình hình lớp học
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white p-4 rounded-2xl shadow-sm">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sĩ số</p>
                                <p className="text-2xl font-black text-primary mt-1">24/25</p>
                            </div>
                            <div className="bg-white p-4 rounded-2xl shadow-sm">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Vắng</p>
                                <p className="text-2xl font-black text-red-500 mt-1">01</p>
                            </div>
                            <div className="bg-white p-4 rounded-2xl shadow-sm col-span-2 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Hoạt động tiếp theo</p>
                                    <p className="text-sm font-black text-blue-600 mt-1">Học lắp ráp Robot</p>
                                </div>
                                <span className="material-symbols-outlined text-blue-600 text-[28px]">smart_toy</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center: Main Chat Window */}
                <div className="col-span-12 md:col-span-8 lg:col-span-6 flex flex-col h-full bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden relative">
                    {/* Chat Header */}
                    <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-md absolute top-0 w-full z-10">
                        <div className="flex items-center gap-4">
                            <img alt="Avatar" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVvr9uQ0qI_nhXcCGe3NYlp1-K6MdN4n-I7cSWlzWr95GD8_KMi31NZDRCJd84C-xTrjil6AeKY3YAQ2x6mvIlHlOK_50t7yyPlw8jhDVT_TGfErxjU3v9p61ZKm9jd2Tq0e-YEjibUeOIwQ6NwYb5CisB5K8dFnOXkPIj6DJz-BM3gGusGdx38ypwHPcDL2xyIstN4OC1pPnQmNRO0JSPpInJS3KQHZtWvdTCbI4sDrF5E4By-lKJDiZxAkXyS5RiFH2UIs_eC64" />
                            <div>
                                <h3 className="font-black text-slate-800 text-lg">Phụ huynh Bé Bi</h3>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Đang trực tuyến</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                            <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white rounded-xl transition-all shadow-sm">
                                <span className="material-symbols-outlined text-[20px]">call</span>
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white rounded-xl transition-all shadow-sm">
                                <span className="material-symbols-outlined text-[20px]">videocam</span>
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white rounded-xl transition-all shadow-sm">
                                <span className="material-symbols-outlined text-[20px]">info</span>
                            </button>
                        </div>
                    </div>

                    {/* Chat Body */}
                    <div className="flex-1 overflow-y-auto p-6 pt-28 pb-32 space-y-6 bg-[url('https://i.pinimg.com/736x/8c/98/99/8c989942702202613b5ee0c99a5bea44.jpg')] bg-cover bg-center bg-fixed">
                        <div className="absolute inset-0 bg-white/90 pointer-events-none"></div>

                        {/* AI Summary Card */}
                        <div className="relative z-10 bg-gradient-to-br from-green-400 to-green-600 p-[2px] rounded-3xl shadow-xl shadow-green-900/10 hover:-translate-y-1 transition-transform">
                            <div className="bg-white/95 backdrop-blur-xl p-6 rounded-[22px]">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-[14px] bg-primary flex items-center justify-center text-white shadow-md shadow-primary/30">
                                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                                        </div>
                                        <h4 className="font-black text-slate-800 tracking-tight text-lg">Tóm tắt trò chuyện AI ✨</h4>
                                    </div>
                                    <span className="text-[10px] bg-primary/10 text-primary px-3 py-1.5 rounded-xl font-black uppercase tracking-widest border border-primary/20">Cập nhật 1p trước</span>
                                </div>
                                <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
                                    <div className="flex items-start gap-3 p-3.5 bg-green-50/50 rounded-2xl border border-primary/10">
                                        <span className="material-symbols-outlined text-primary text-[20px]">restaurant</span>
                                        <p className="text-[13px] font-bold text-green-900 leading-snug">Bé ăn ngoan, hết suất trưa hôm nay.</p>
                                    </div>
                                    <div className="flex items-start gap-3 p-3.5 bg-green-50/50 rounded-2xl border border-primary/10">
                                        <span className="material-symbols-outlined text-primary text-[20px]">medical_services</span>
                                        <p className="text-[13px] font-bold text-green-900 leading-snug">Đã uống thuốc ho theo đơn vào 14:00.</p>
                                    </div>
                                    <div className="flex items-start gap-3 p-3.5 bg-green-50/50 rounded-2xl border border-primary/10">
                                        <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
                                        <p className="text-[13px] font-bold text-green-900 leading-snug">Gia đình đón muộn (sau 17:30).</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="relative z-10 flex flex-col gap-5 pt-4">
                            {/* Received */}
                            <div className="flex items-end gap-3 max-w-[85%]">
                                <img alt="Avatar" className="w-8 h-8 rounded-full object-cover mb-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4E2yyNiSQxcYypJ-FZq4Nbi-tatkW4Ec04zKNbQmuxhBsl72gsw-S4L7k5WhL_mllPrwy1TrWCaV6SWmNoM0Y6CNgAFk5Fx_PIQiLrLclFpKmoydvT9lWEmDJZ13jAHAkqeJaPFe5qSLDbVOBsMA626dU3avvuRzR-HeIjiIZbjJGePoafezLaBmG-Rmkl_WBnof4YdZfwp1k0vc4UaIAyHkYtYaCnrchGLMXkMHU0RwxxLuxh_1jGelMTNKEmhv85HsiV0jBZio" />
                                <div>
                                    <div className="bg-white px-5 py-3.5 rounded-3xl rounded-bl-sm shadow-sm border border-slate-100/50">
                                        <p className="text-[15px] font-medium text-slate-700 leading-relaxed">Chào cô Thư, hôm nay bé Bi ở lớp có ngoan không cô? Cô nhớ nhắc bé uống thuốc ho giúp gia đình nhé.</p>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 mt-1.5 ml-2 block">09:15 AM</span>
                                </div>
                            </div>

                            {/* Sent */}
                            <div className="flex items-end gap-3 flex-row-reverse max-w-[85%] ml-auto mt-2">
                                <div className="flex flex-col items-end">
                                    <div className="bg-primary px-5 py-3.5 rounded-3xl rounded-br-sm shadow-md shadow-primary/20">
                                        <p className="text-[15px] font-medium text-white leading-relaxed">Dạ chào anh, hôm nay Bi rất ngoan và ăn hết suất ạ. Em đã cho bé uống thuốc lúc 14h chiều rồi anh nhé. Anh cứ yên tâm!</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-1.5 mr-2">
                                        <span className="text-[10px] font-bold text-slate-400">Đã xem lúc 14:20</span>
                                        <span className="material-symbols-outlined text-[14px] text-blue-500" style={{ fontVariationSettings: "'FILL' 1" }}>done_all</span>
                                    </div>
                                </div>
                            </div>

                            {/* Received */}
                            <div className="flex items-end gap-3 max-w-[85%] mt-2">
                                <img alt="Avatar" className="w-8 h-8 rounded-full object-cover mb-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQNlf1HIVgmVDTXs6XpJDdMirzdn11mhMUe1Y_mFbpfhZClyxEhoRfIWxFLWAuvz164kQbCiIGBazY-4FivJa--Vi3jAg_L8xiR5jdEtlYa-pExec5AxreBPJn3ZGJx2rjeaHkcRs3UsRO3Kq4d_ZDheC_ppteo9wiEioKyxgD9xoHEp4M2FhPVuyzJPAC_oiG69MWKqdMWzLl8IHLu-V-WCLq8U2qfiw_HNKieYDPDejEURVP8Mq9UAU21b3faWnvNeJk12CDdcY" />
                                <div>
                                    <div className="bg-white px-5 py-3.5 rounded-3xl rounded-bl-sm shadow-sm border border-slate-100/50">
                                        <p className="text-[15px] font-medium text-slate-700 leading-relaxed">Cảm ơn cô. Chiều nay bố bé bận họp nên chắc 17h30 mới đón bé được, nhờ cô trông hộ gia đình thêm một lúc nhé.</p>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 mt-1.5 ml-2 block">14:45 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat Input Area */}
                    <div className="p-4 bg-white/90 backdrop-blur-xl border-t border-slate-100 absolute bottom-0 w-full z-10">
                        <div className="flex items-center gap-3">
                            <button className="flex items-center justify-center bg-green-50 text-primary w-12 h-12 rounded-full hover:bg-green-100 transition-colors tooltip group relative">
                                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                                <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap">Tóm tắt AI</span>
                            </button>
                            <div className="flex-1 flex items-center bg-slate-50 rounded-full px-4 border-2 border-transparent focus-within:border-primary/20 focus-within:bg-white transition-all shadow-inner">
                                <button className="p-2 -ml-2 text-slate-400 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">mood</span>
                                </button>
                                <input className="flex-1 bg-transparent border-none focus:ring-0 py-3.5 text-[15px] font-medium placeholder:text-slate-400" placeholder="Nhập tin nhắn..." type="text" />
                                <button className="p-2 -mr-2 text-slate-400 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">attach_file</span>
                                </button>
                            </div>
                            <button className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/40 active:translate-y-0 transition-all">
                                <span className="material-symbols-outlined text-[20px] ml-1" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Context Info */}
                <aside className="hidden lg:flex lg:col-span-3 flex-col bg-white rounded-3xl shadow-sm border border-slate-100 p-6 overflow-y-auto h-full">
                    <h3 className="font-black text-slate-800 text-lg mb-6 flex items-center justify-between px-1">
                        Hồ sơ học sinh
                        <button className="text-slate-300 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">expand_more</span>
                        </button>
                    </h3>
                    
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative mb-4">
                            <img alt="Student photo" className="w-[110px] h-[110px] rounded-[32px] object-cover ring-[6px] ring-green-50 shadow-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2OVoRejukG8J0tO98nqJIw3O-oOzlAkIXTX76jyo3kUcUf8gvGRzd982wTVbswc8LvTbbOSomtibgkLgq7TJD3qFw0sIp5GXVd_5gblVfsVbuiJjwpylPeKkE4xNsNH4zyMMn3c8HFajxHAzqFU6d_pibuTiDps5LufPTqu-4HVg-YWG3zHdCn7JU733w5qMGwJO5yQ4PyQl9yejaoMqwjfVKv-MUwayUuGBhcoCeUHv-M5rYZJtRWFozffnuO00YcvNib24hoqo" />
                            <span className="absolute -bottom-2 -right-3 bg-amber-300 text-amber-900 border-[3px] border-white px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm">STEAM 01</span>
                        </div>
                        <h4 className="text-[22px] font-black text-slate-800">Nguyễn Tuấn Bi</h4>
                        <p className="text-[13px] text-slate-500 font-bold mt-1">Biệt danh: Bi</p>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="bg-blue-50/50 p-5 rounded-3xl border border-blue-100">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="material-symbols-outlined text-blue-500 text-[18px]">event_note</span>
                                <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest">Lịch sử chuyên cần</p>
                            </div>
                            <div className="flex justify-between items-end">
                                <div className="flex gap-1.5 items-end">
                                    <div className="w-2.5 h-6 bg-blue-500 rounded-full"></div>
                                    <div className="w-2.5 h-8 bg-blue-500 rounded-full"></div>
                                    <div className="w-2.5 h-4 bg-blue-500 opacity-30 rounded-full"></div>
                                    <div className="w-2.5 h-7 bg-blue-500 rounded-full"></div>
                                    <div className="w-2.5 h-8 bg-blue-500 rounded-full"></div>
                                </div>
                                <p className="text-[13px] font-black text-blue-600 bg-white px-2 py-1 rounded-lg">TỐT (100%)</p>
                            </div>
                        </div>

                        <div className="bg-amber-50/50 p-5 rounded-3xl border border-amber-100">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-amber-500 text-[18px]">health_and_safety</span>
                                <p className="text-[10px] text-amber-600 font-black uppercase tracking-widest">Ghi chú sức khỏe</p>
                            </div>
                            <p className="text-[13px] font-bold text-slate-700 leading-relaxed mt-1">Dị ứng nhẹ với phấn hoa. Cần uống thuốc ho sau ăn trưa.</p>
                        </div>

                        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="material-symbols-outlined text-primary text-[18px]">extension</span>
                                <p className="text-[10px] text-primary font-black uppercase tracking-widest">SP STEAM Gần đây</p>
                            </div>
                            <img alt="STEAM Project" className="w-full h-32 rounded-2xl object-cover mb-3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoLNUxdXgwm7uQZR8MSnm3uw-YjKaoOZI5NreM53G5P3J0w-tc-kxwmHJcGuNQ3_slwRYdMJaJ1a8Dhnet-xPm24svoxEayFElqjlPxn-8245vHBj3KmGGXKH2zpx1guwqktnUKRgEuAD37AkDORKLZmSYuFqROV7Vuy22ITCFTeGEbnM1Oe0cN5-gQNmnAuXrgugggCefxgaN80HhD4UGuvzquDV_P_0A5fOLJEtfDskcBbfjlYcR9EHQllQnbSBS6wAaWzF-L-0" />
                            <p className="text-[14px] font-black text-slate-800">Mô hình Robot tự hành</p>
                            <p className="text-[11px] font-bold text-slate-400 mt-0.5">Hoàn thành sáng nay</p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
