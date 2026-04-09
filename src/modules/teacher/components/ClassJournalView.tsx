import React from 'react';

export default function ClassJournalView() {
    return (
        <div className="max-w-5xl mx-auto pb-24 animate-in fade-in duration-500">
            {/* Dashboard Header Section */}
            <section className="mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <span className="text-primary font-black text-sm tracking-wider uppercase mb-1 block">HÔM NAY, 24 THÁNG 5</span>
                        <h2 className="text-4xl font-black text-slate-800 tracking-tight">Nhật ký hoạt động</h2>
                        <p className="text-slate-500 mt-2 font-bold text-lg">Ghi lại những khoảnh khắc tuyệt vời của bé mỗi ngày</p>
                    </div>
                    <div className="flex space-x-3 items-center">
                        <button className="bg-white px-6 py-3 rounded-2xl shadow-sm flex items-center text-sm font-bold border border-slate-100 hover:bg-slate-50 transition-all text-slate-600">
                            <span className="material-symbols-outlined text-[18px] mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
                            Chọn ngày
                        </button>
                    </div>
                </div>

                {/* Fast Actions / Quick Post Options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                    <button className="flex items-center p-6 bg-white rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md hover:border-orange-100 transition-all group cursor-pointer">
                        <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mr-5 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
                        </div>
                        <div className="text-left">
                            <p className="font-black text-lg text-slate-800">Giờ ăn</p>
                            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Cập nhật thực đơn</p>
                        </div>
                    </button>
                    <button className="flex items-center p-6 bg-white rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all group cursor-pointer">
                        <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mr-5 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>bedtime</span>
                        </div>
                        <div className="text-left">
                            <p className="font-black text-lg text-slate-800">Giờ ngủ</p>
                            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Theo dõi giấc ngủ</p>
                        </div>
                    </button>
                    <button className="flex items-center p-6 bg-white rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md hover:border-green-100 transition-all group cursor-pointer">
                        <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mr-5 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
                        </div>
                        <div className="text-left">
                            <p className="font-black text-lg text-slate-800">Học tập</p>
                            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Đăng hoạt động</p>
                        </div>
                    </button>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="relative mt-8">
                {/* Timeline Vertical Bar */}
                <div className="absolute left-4 top-0 bottom-0 w-[3px] bg-slate-100 rounded-full hidden md:block"></div>
                
                <div className="space-y-12">
                    {/* Activity Card 1 */}
                    <div className="relative md:pl-16">
                        {/* Timeline Dot */}
                        <div className="absolute left-2.5 top-0 w-[15px] h-[15px] bg-primary rounded-full hidden md:block ring-[6px] ring-primary/20"></div>
                        
                        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-lg">
                            <div className="p-8 md:p-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="flex items-center space-x-3 mb-3">
                                            <span className="text-[10px] font-black tracking-widest text-primary px-3 py-1.5 bg-primary/10 rounded-xl uppercase">Nghệ thuật</span>
                                            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">schedule</span>
                                                10:15 AM
                                            </span>
                                        </div>
                                        <h3 className="text-[26px] font-black text-slate-800">Bé vẽ tranh theo thẻ A4</h3>
                                    </div>
                                    <div className="flex space-x-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                                        <button className="w-10 h-10 rounded-xl text-slate-400 hover:text-primary hover:bg-white hover:shadow-sm transition-all flex items-center justify-center" title="Chỉnh sửa">
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                        <button className="w-10 h-10 rounded-xl text-slate-400 hover:text-red-500 hover:bg-white hover:shadow-sm transition-all flex items-center justify-center" title="Xóa">
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                                
                                <p className="text-slate-600 font-medium leading-relaxed mb-8 text-[15px]">Các bé đang hăng say khám phá thế giới sắc màu. Hôm nay các bé lớp STEAM Blue đã có một giờ học mỹ thuật cực kỳ thú vị. Các con học cách quan sát chi tiết từ thẻ mẫu và tái hiện lại bằng những mảng màu rực rỡ.</p>
                                
                                {/* Photo Grid (Asymmetric) */}
                                <div className="grid grid-cols-4 gap-4 h-[350px] mb-8">
                                    <div className="col-span-2 row-span-2 overflow-hidden rounded-[24px]">
                                        <img alt="Bé vẽ tranh" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7NQhVHmCe09vC6OGtLgAZXcZ1JtLgfxjRu1e5xw-xDs5YWsQHP_wiIaurnOwbqp-zPeT4M8kLTTRVPQvPTgSc3sXt02cqMmnlH0cxn9GE1lzhv7bZtkORv1t4XGZl_cWGRYz2s2pkeolPJNzu3SK3SMyuZZEJaidLmTlMeq-f0vLYR9Fkj31mGpt6q-S12q0Tx_UDXmkYf15l6RXA4govf8Nb_JyRzs7_JnY3Zc-lKsKlh0MoFUzQ6FkR2cg_Bow0JeH30_d73fU"/>
                                    </div>
                                    <div className="col-span-2 overflow-hidden rounded-[24px]">
                                        <img alt="Dụng cụ mỹ thuật" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARNgvzyykcnAmyK_kkw33-6qSidyNj05xAaTbNwV-6xSTA6ZnhCcAKw2FMWAHN8L1pz4bEdZNeWnN3lPCKxfA4E_hEedRXOpPxFnmuJHfhuh6I37nI4UZHTmbNN3C2DrjLaslMt2PEyj-wSBmyyBx8l0NYZr98Bxa6_zv6Ma2ti6uM6-hVVhpBwIPZAn3NHrzka8pcaNWsNxtvS4n2aa8E-oCd1vfFAErE0phPzbxA_1qex1-HfcJ-RiPGBk9r2tQmnB5yhsYjYdU"/>
                                    </div>
                                    <div className="overflow-hidden rounded-[24px]">
                                        <img alt="Bé đang tô màu" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNfFeRG8kctLs9gnKMgJgev1WbhMbBHh22-rbjYp7ruzUyvdozoKJHrlmpC_uv2M8VNQ_S-ObbOSp0MyDQAzdkoExbzyaTI5lZTBoupJbQqw62p7PSySw4xxF1WDgpYJaq0Hgbei95Ruqp9vvXjJHy7CwvedK8XKeLcVRCUs9WGob_WIez6-Ybq5JnHLxBORzbDS6rz4Uvik6B1gibRWIz3EygKsjZnAlcZSPsyryMFDNqod6qTjnYRCdJZQ4tqvhTrXUIFLAT8nc"/>
                                    </div>
                                    <div className="overflow-hidden rounded-[24px] relative cursor-pointer group">
                                        <img alt="Hoạt động vẽ tranh" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5eaZIMRDHn-9sRAmXUb0O2nJD1w38HtW69UPJyM1Ond8agsr42M-5tXAlL0rDucLi2KFcXqEV8EEdbzmorBEynDDinFuZG4LIzto8kbPyCVorlKV1ePv5FvCZ_UbZmvOvA7FrnW8M_q1fHZ4qbALF8io4EWXBFIRP9GUjPFVX0SI3xKPBdjograAlfJlnkaPchLS33gncY_hluI5XmB06ZmFBTuUV32t1eHGOXWOq-42Lioelyj237dXJ9WhbqFXqsLfM60Tv22Q"/>
                                        <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center text-white font-black text-3xl group-hover:bg-slate-900/40 transition-colors backdrop-blur-[2px]">
                                            +2
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between border-t border-slate-100/80 pt-6">
                                    <div className="flex -space-x-3 overflow-hidden p-1">
                                        <img alt="Bé 1" className="inline-block h-10 w-10 rounded-full ring-4 ring-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF00ua8GQpnuKXKOnrLrpXQQ4lj5A1Oj4LQ4AFOMpHDIiVx0RhChs79owAwDkYBAsmcOatfsSYTlc_CqDOauZqe84TBzIWQZgGm99qc2rSR63LdI3ytukja2-vOMQoobmLLCfi5KP1uY3_a44k7nWjyYPUawilTu6AExRaCvHO1mlyLPdJ-jSpQFIkm1qwZpaC0EtSdqMURNHYYQM2ul5TznEL8Tep41XLbKVzA94Hhm2AuouSc842LkvcyOQwkWgTOprLpuBqiS4"/>
                                        <img alt="Bé 2" className="inline-block h-10 w-10 rounded-full ring-4 ring-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2k41OCAtrTYL0X1q9yWUlgimNni64TU2_Th9GKLG1n-Ovr62sW-6r6A77hAwA-PLd8Fd7PwWnYStYSmwi84VNCLel_qPfs47V2huE7i14N7GtQd9pGQvvkT4RFy0rAhZeJMGSa12g9O7nMWO4bfxhaTmk4cp1gr9tRNwAZ7yvrswGw6XKjNURWW5WLrxGQVnxPBAYPVr4Qv9tdNnTjSa0Kxdb4HV4yODUd1nnQ12GxQmfe_oajJzJiA3ActJMjESN0pToHJXVZ7s"/>
                                        <img alt="Bé 3" className="inline-block h-10 w-10 rounded-full ring-4 ring-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8k23fWXQt91bmu8VEwNCNT4lDzZGAgO1cemXdyHw5AezA9toM9U_G-K1-_FIYZOgqnXeThyAexIA2-dkxJEwk9Vt8lfHG8egfycEI8BetcKTubmZW5BeMY0T5PXVdYLZ4rQgv_lEf0ouAhSbD6On5NaidiCGJhmbCNHapEOKhyrll8m_9xyCygI5246EnH7T1iYHyVFzJkKE4Ftzqmub-JStsfSl_ZUJ9ZmcHicmKQ3pO-18uCkrgehdFZM8gDJIr32JCl3gYwbc"/>
                                        <div className="inline-block h-10 w-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[11px] font-black text-slate-500 ring-4 ring-white">+12</div>
                                    </div>
                                    <div className="flex space-x-6 text-slate-400">
                                        <div className="flex items-center space-x-2 hover:text-pink-500 hover:bg-pink-50 px-4 py-2 rounded-2xl cursor-pointer transition-colors">
                                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                            <span className="text-sm font-black">24</span>
                                        </div>
                                        <div className="flex items-center space-x-2 hover:text-primary hover:bg-green-50 px-4 py-2 rounded-2xl cursor-pointer transition-colors">
                                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
                                            <span className="text-sm font-black">8</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Activity Card 2 */}
                    <div className="relative md:pl-16">
                        <div className="absolute left-2.5 top-0 w-[15px] h-[15px] bg-blue-500 rounded-full hidden md:block ring-[6px] ring-blue-500/20"></div>
                        
                        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-lg">
                            <div className="p-8 md:p-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="flex items-center space-x-3 mb-3">
                                            <span className="text-[10px] font-black tracking-widest text-blue-600 px-3 py-1.5 bg-blue-50 rounded-xl uppercase">Dinh dưỡng</span>
                                            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">schedule</span>
                                                08:30 AM
                                            </span>
                                        </div>
                                        <h3 className="text-[26px] font-black text-slate-800">Bữa sáng đầy năng lượng</h3>
                                    </div>
                                    <div className="flex space-x-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                                        <button className="w-10 h-10 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-sm transition-all flex items-center justify-center" title="Chỉnh sửa">
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                        <button className="w-10 h-10 rounded-xl text-slate-400 hover:text-red-500 hover:bg-white hover:shadow-sm transition-all flex items-center justify-center" title="Xóa">
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                                
                                <p className="text-slate-600 font-medium leading-relaxed mb-8 text-[15px]">Bữa sáng hôm nay có nhiều rau xanh và protein giúp bé mau lớn. Thực đơn sáng nay: Cháo sườn rau củ và sữa tươi hạt sen. Các bé ăn rất ngoan và hào hứng.</p>
                                
                                <div className="grid grid-cols-2 gap-4 h-[250px] mb-8">
                                    <div className="overflow-hidden rounded-[24px]">
                                        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Bữa sáng" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtYcc76-sn2PQx1Bujon5zTXajRv7DJG6fWIiJ3Z4a2IpJ4hEFY-fHr87EtIzP3d2So8dQke1q_IpX5-1RV2Tkvdoedf8cILos5zYXmxis-H3MAN-jpQ7OHjdpxnZQwRsuSwusDcoALvxmzAtVRL5Csp-m2qQP0zlecK-aOrFw1nSD_slxTNgmEPrZ9kxVoRe3mKfv9HEgG1bMp8C9qaAqXAmo4ryHTxuRIxME26IVuGCLOT7ZkHtdo_693-HHTVle5IF-KKXO-1w"/>
                                    </div>
                                    <div className="overflow-hidden rounded-[24px]">
                                        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Sữa" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9f3Ux74uaBwN9sh0idY-r1IFG5mOzZjPUei2K_AwKOWrUGa_bf63SgS3fRyZe3uW1EHGy68P00W4J_W8DhLVzqnzu5jVoUcDGuyuoQphV9Bw1iDbJnp8Mp_UP3eQVhu-KE9VEt3L8SdKZ-x972ifdVUevJ53PkEEIXWm-ieuOTduV-uyXjWjyxuCEaeCznFM4UyCAkEnfsQI5XJDEmzVe4x4VVrUNqWms83HKlcDMIB3s5eTFvSmPB2jaKPzkv3ayctHntA0zaIk"/>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between border-t border-slate-100/80 pt-6">
                                    <div className="flex items-center -space-x-2">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[11px] font-black text-slate-500 uppercase tracking-widest pl-2">ALL</div>
                                        <span className="ml-4 pl-3 text-sm text-slate-400 font-bold uppercase tracking-widest">Áp dụng cả lớp</span>
                                    </div>
                                    <div className="flex space-x-6 text-slate-400">
                                        <div className="flex items-center space-x-2 hover:text-pink-500 hover:bg-pink-50 px-4 py-2 rounded-2xl cursor-pointer transition-colors">
                                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                            <span className="text-sm font-black">15</span>
                                        </div>
                                        <div className="flex items-center space-x-2 hover:text-primary hover:bg-green-50 px-4 py-2 rounded-2xl cursor-pointer transition-colors">
                                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
                                            <span className="text-sm font-black">2</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Floating Action Button */}
            <button className="fixed bottom-12 right-12 w-[60px] h-[60px] rounded-[24px] bg-primary text-white shadow-xl shadow-primary/30 flex items-center justify-center hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/40 active:translate-y-0 transition-all z-50 group hover:rounded-full">
                <span className="material-symbols-outlined text-3xl transition-transform duration-500 group-hover:rotate-180">add</span>
            </button>
        </div>
    );
}
