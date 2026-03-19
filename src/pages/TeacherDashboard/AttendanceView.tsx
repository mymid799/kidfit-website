import React from 'react';

const AttendanceView = () => {
    return (
        <div className="max-w-7xl mx-auto space-y-10 pb-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Điểm danh Lớp học</h1>
                    <p className="text-lg text-slate-500 font-medium italic">
                        STEAM cơ bản - Lớp Gấu Trúc • <span className="text-blue-600 font-semibold uppercase">Thứ Hai, ngày 23/10/2023</span>
                    </p>
                </div>
                <button className="flex items-center gap-2 text-red-600 font-semibold px-4 py-2 hover:bg-red-50 rounded-full transition-colors whitespace-nowrap">
                    <span className="material-symbols-outlined">person_off</span> Đánh dấu vắng tất cả
                </button>
            </div>

            {/* Bento Summary Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-slate-50 rounded-full group-hover:scale-110 transition-transform"></div>
                    <p className="text-slate-500 font-medium mb-1 relative z-10 text-sm">Tổng số học sinh</p>
                    <p className="text-4xl font-extrabold text-slate-900 relative z-10 tracking-tight">25</p>
                </div>
                <div className="bg-green-50/50 p-6 rounded-3xl border-l-[6px] border-green-600 relative overflow-hidden group shadow-sm">
                    <p className="text-green-700 font-bold mb-1 text-sm uppercase tracking-wide">Có mặt</p>
                    <p className="text-4xl font-extrabold text-green-700 tracking-tight">22</p>
                    <span className="material-symbols-outlined absolute right-4 bottom-4 text-green-700/10 text-6xl">check_circle</span>
                </div>
                <div className="bg-red-50/50 p-6 rounded-3xl border-l-[6px] border-red-500 relative overflow-hidden group shadow-sm">
                    <p className="text-red-700 font-bold mb-1 text-sm uppercase tracking-wide">Vắng mặt</p>
                    <p className="text-4xl font-extrabold text-red-700 tracking-tight">02</p>
                    <span className="material-symbols-outlined absolute right-4 bottom-4 text-red-700/10 text-6xl">cancel</span>
                </div>
                <div className="bg-amber-50/50 p-6 rounded-3xl border-l-[6px] border-amber-500 relative overflow-hidden group shadow-sm">
                    <p className="text-amber-700 font-bold mb-1 text-sm uppercase tracking-wide">Đi muộn</p>
                    <p className="text-4xl font-extrabold text-amber-700 tracking-tight">01</p>
                    <span className="material-symbols-outlined absolute right-4 bottom-4 text-amber-700/10 text-6xl">schedule</span>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-full w-full md:w-auto">
                    <button className="px-8 py-2.5 rounded-full bg-white text-slate-900 font-bold shadow-sm transition-all text-sm">Tất cả</button>
                    <button className="px-8 py-2.5 rounded-full text-slate-500 hover:bg-white/50 transition-all font-bold text-sm">Có mặt</button>
                    <button className="px-8 py-2.5 rounded-full text-slate-500 hover:bg-white/50 transition-all font-bold text-sm">Vắng mặt</button>
                    <button className="px-8 py-2.5 rounded-full text-slate-500 hover:bg-white/50 transition-all font-bold text-sm">Đi muộn</button>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                    <div className="relative w-full md:w-64">
                         <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                        <input className="w-full bg-white border border-slate-200 rounded-full py-2 pl-11 pr-4 focus:ring-2 focus:ring-green-600/20 text-sm font-medium" placeholder="Tìm tên bé..." type="text"/>
                    </div>
                </div>
            </div>

            {/* Student Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {/* Student 1: Present */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border-2 border-green-600 relative group transition-all hover:shadow-xl">
                    <div className="absolute top-6 right-6">
                        <button className="text-slate-300 hover:text-green-600 transition-colors">
                            <span className="material-symbols-outlined text-[20px]">sticky_note_2</span>
                        </button>
                    </div>
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="relative mb-5">
                            <img alt="Student Portrait" className="w-28 h-28 rounded-[24px] object-cover border-4 border-slate-50 shadow-md ring-4 ring-green-600/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRpUD0fCi86TJGaBhBfSEjUsrV6EP_3Vi0zWuncHBkJtfhvoaACzug8zrUQYnyt7VL70ruNV0mW2QUvyiuPC7jz3faFzo5guvj8hWGPdjlEu41BUlLY0kqREgeyJU2eVmU7W8MAK1i8bB0yuaFvonbtu1r7fvY1_DO6eQ87Na51YZqlyorAH-X_aRHgNNtydPdTaY4e_R1s_PKQr8wuQM0wxhya6lqL95b2zgGUFUTuWZ85eDzls_tMIxinEL5UQxrwP45GH0W_EY" />
                            <div className="absolute -bottom-2 -right-2 bg-green-600 text-white p-1.5 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                                <span className="material-symbols-outlined text-sm font-black" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-1">Bé Minh Quân</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Mã số: KS-042</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex-1 py-4 rounded-2xl bg-green-600 text-white font-black text-xs flex flex-col items-center justify-center transition-all shadow-lg shadow-green-600/20 active:scale-95">
                            <span className="material-symbols-outlined mb-1 text-[18px]">check_circle</span> 
                            CÓ MẶT
                        </button>
                        <button className="flex-1 py-4 rounded-2xl bg-slate-50 text-slate-400 font-bold text-[10px] flex flex-col items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all">
                            <span className="material-symbols-outlined mb-1 text-[18px]">cancel</span>
                            VẮNG
                        </button>
                        <button className="flex-1 py-4 rounded-2xl bg-slate-50 text-slate-400 font-bold text-[10px] flex flex-col items-center justify-center hover:bg-amber-50 hover:text-amber-600 transition-all">
                            <span className="material-symbols-outlined mb-1 text-[18px]">schedule</span>
                            TRỄ
                        </button>
                    </div>
                </div>

                {/* Student 2: Default */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 relative group transition-all hover:shadow-xl hover:border-blue-100">
                    <div className="absolute top-6 right-6">
                        <button className="text-slate-300 hover:text-blue-600 transition-colors">
                            <span className="material-symbols-outlined text-[20px]">sticky_note_2</span>
                        </button>
                    </div>
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="relative mb-5">
                            <img alt="Student Portrait" className="w-28 h-28 rounded-[24px] object-cover border-4 border-slate-50 shadow-md ring-4 ring-slate-100" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4ZRCh5z8oI4mUrJLS9F389RQmFR3yFk48mdYyNLxjRmUKslyUMBjb94E9FFsxoaSUCZwRVmtmjT5J1jqPr4t4KoiaTH6xiTAGLbABOfR6xcKR7bpkpGok48QnYwq_dxb-N8JsQIBXXUPLPDeUBxMau_3TWIGAKKNf3komhTK9425VUP39cZhzJ92S1tarBbjvpEpiSZdUk8jDzxmU91TTFpAjfpjl7ghiybsGsgFOIkH5RonI3JafOp_fXSa-8HhI--ZesRqjOLQ" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-1">Bé Bảo An</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Mã số: KS-085</p>
                    </div>
                    <div className="flex gap-2">
                         <button className="flex-1 py-4 rounded-2xl bg-slate-50 text-slate-500 font-black text-[10px] flex flex-col items-center justify-center hover:bg-green-600 hover:text-white transition-all active:scale-95">
                            <span className="material-symbols-outlined mb-1 text-[18px]">check_circle</span> 
                            CÓ MẶT
                        </button>
                        <button className="flex-1 py-4 rounded-2xl bg-slate-50 text-slate-500 font-black text-[10px] flex flex-col items-center justify-center hover:bg-red-500 hover:text-white transition-all active:scale-95">
                            <span className="material-symbols-outlined mb-1 text-[18px]">cancel</span> 
                            VẮNG
                        </button>
                        <button className="flex-1 py-4 rounded-2xl bg-slate-50 text-slate-500 font-black text-[10px] flex flex-col items-center justify-center hover:bg-amber-500 hover:text-white transition-all active:scale-95">
                            <span className="material-symbols-outlined mb-1 text-[18px]">schedule</span> 
                            TRỄ
                        </button>
                    </div>
                </div>

                {/* Student 3: Late */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border-2 border-amber-500 relative group transition-all hover:shadow-xl">
                    <div className="absolute top-6 right-6 flex items-center gap-3">
                        <span className="bg-amber-100 text-amber-700 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider">08:15 AM</span>
                        <button className="text-amber-600 transition-colors">
                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>sticky_note_2</span>
                        </button>
                    </div>
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="relative mb-5">
                            <img alt="Student Portrait" className="w-28 h-28 rounded-[24px] object-cover border-4 border-slate-50 shadow-md ring-4 ring-amber-500/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJSrm62zpo7DABwiE2_EdB1PXGml10u_Y_oGDuzSAi78rR5F_hfXTOlC1kzWhaVAYGPbqV7ppqHLcqDRcpe8I0saGJH6gemMPSGRWjp2w9UCRXg1WYPD1KPm6eKf5hb-mAuWG2Eqz9pr7Kx4NOeNLLSMPWrahDRNORcGGmQ6OOmSnVLoB_7FIaxUjMUcjkwgKdOj3aoNwVYzRSWIsHeAWCT0FmNVgjU-pCNVfXelbV6sZHlhOS-QBmgv8WsS_4FTmvGD6dhs6LQVU" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-1">Bé Gia Huy</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Mã số: KS-012</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex-1 py-4 rounded-2xl bg-slate-50 text-slate-400 font-black text-[10px] flex flex-col items-center justify-center transition-all">
                            <span className="material-symbols-outlined mb-1 text-[18px]">check_circle</span>
                            MẶT
                        </button>
                        <button className="flex-1 py-4 rounded-2xl bg-slate-50 text-slate-400 font-black text-[10px] flex flex-col items-center justify-center transition-all">
                            <span className="material-symbols-outlined mb-1 text-[18px]">cancel</span>
                            VẮNG
                        </button>
                        <button className="flex-1 py-4 rounded-2xl bg-amber-500 text-white font-black text-[10px] flex flex-col items-center justify-center transition-all shadow-lg shadow-amber-500/20 active:scale-95 uppercase tracking-wide">
                            <span className="material-symbols-outlined mb-1 text-[18px]">schedule</span> 
                            Đi muộn
                        </button>
                    </div>
                    <div className="mt-4 p-3 bg-amber-50 rounded-2xl border border-amber-100">
                        <p className="text-[9px] text-amber-700 font-black uppercase tracking-widest mb-1">Ghi chú:</p>
                        <p className="text-xs text-slate-700 italic leading-relaxed">Hỏng xe dọc đường, phụ huynh báo trễ 15p.</p>
                    </div>
                </div>

                {/* Student 4: Absent */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border-2 border-red-500 relative group transition-all hover:shadow-xl">
                    <div className="absolute top-6 right-6">
                        <button className="text-red-500 transition-colors">
                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>sticky_note_2</span>
                        </button>
                    </div>
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="relative mb-5 grayscale opacity-80">
                            <img alt="Student Portrait" className="w-28 h-28 rounded-[24px] object-cover border-4 border-slate-50 shadow-md ring-4 ring-red-500/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjpIXFeCcLsxp7NuOTLi-k9Bb2RX7ArPdwX0byuv0RdxxDhFmveGbhZQMd2VGMjlSCTwNTp1IATHyGkFYSj9rlF1yyZ7iyhl0h19kFe4olz-VIQV9afuzsyXwfBGD_5Va4q3nJ7buWJA4gsrr32tJ-4rY5XX0zWiZiONrLdAUEbsh-oDXCu9_FjWn-cgrBIvJNuk4-64k_Uq0aSBuiGYMMrBfHQXKXK10JxFsyG7A4bgYyL9uGQn6soE6L5SEJdl-eMMTesOv7tQg" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-1">Bé Linh Chi</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Mã số: KS-056</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex-1 py-4 rounded-2xl bg-slate-50 text-slate-400 font-black text-[10px] flex flex-col items-center justify-center transition-all">
                            <span className="material-symbols-outlined mb-1 text-[18px]">check_circle</span>
                            MẶT
                        </button>
                        <button className="flex-1 py-4 rounded-2xl bg-red-500 text-white font-black text-[10px] flex flex-col items-center justify-center transition-all shadow-lg shadow-red-500/20 active:scale-95 uppercase tracking-wide">
                            <span className="material-symbols-outlined mb-1 text-[18px]">cancel</span> 
                            Vắng mặt
                        </button>
                        <button className="flex-1 py-4 rounded-2xl bg-slate-50 text-slate-400 font-black text-[10px] flex flex-col items-center justify-center transition-all">
                            <span className="material-symbols-outlined mb-1 text-[18px]">schedule</span>
                            TRỄ
                        </button>
                    </div>
                    <div className="mt-4 p-3 bg-red-50 rounded-2xl border border-red-100">
                        <p className="text-[9px] text-red-700 font-black uppercase tracking-widest mb-1">Ghi chú:</p>
                        <p className="text-xs text-slate-700 italic leading-relaxed">Nghỉ ốm (Sốt siêu vi), gia đình xin nghỉ 3 ngày.</p>
                    </div>
                </div>
            </div>

            {/* Floating Action Footer Spacer */}
            <div className="h-24"></div>

            {/* Floating Action Footer */}
            <div className="fixed bottom-0 left-0 md:left-[280px] right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-40 transition-all">
                <div className="flex items-center gap-8 text-slate-500">
                    <span className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-600"></span>
                        <span className="text-sm font-black text-slate-800">22 Có mặt</span>
                    </span>
                    <span className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                        <span className="text-sm font-black text-slate-800">2 Vắng mặt</span>
                    </span>
                    <span className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                        <span className="text-sm font-black text-slate-800">1 Đi muộn</span>
                    </span>
                </div>
                <button className="w-full md:w-auto bg-green-600 text-white px-12 py-4 rounded-2xl font-black text-lg shadow-xl shadow-green-600/30 active:scale-95 transition-all flex items-center justify-center gap-3">
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> 
                    HOÀN TẤT ĐIỂM DANH
                </button>
            </div>
        </div>
    );
};

export default AttendanceView;
