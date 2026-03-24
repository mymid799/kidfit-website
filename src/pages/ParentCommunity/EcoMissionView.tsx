import React, { useState } from 'react';
import EcoMissionDetailView from './EcoMissionDetailView';

const EcoMissionView: React.FC = () => {
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    if (isDetailOpen) {
        return <EcoMissionDetailView onBack={() => setIsDetailOpen(false)} />;
    }

    return (
        <div className="bg-[#fafbfa] space-y-10">
            {/* Hero & Progress Row */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Level & Progress Card */}
                <div className="lg:col-span-4 bg-[#f3f4f5] rounded-xl p-8 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#4cae4f]/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <div>
                        <span className="bg-[#4cae4f]/10 text-[#006e1c] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Hành trình của bé</span>
                        <h3 className="text-4xl font-black mt-4 text-slate-800">Cấp độ 2</h3>
                        <p className="text-slate-600 font-medium mt-1">Mầm non xanh</p>
                    </div>
                    <div className="mt-8 space-y-3">
                        <div className="flex justify-between items-end">
                            <span className="text-sm font-bold text-slate-800">850 / 1500 XP</span>
                            <span className="text-xs text-slate-500">Còn 650 XP tới Cấp độ 3</span>
                        </div>
                        <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#006e1c] to-[#4caf50] rounded-full w-[56%] shadow-sm"></div>
                        </div>
                    </div>
                </div>

                {/* Weekly Mission Card */}
                <div className="lg:col-span-8 bg-[#f0f9ff] rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center border-l-8 border-[#33a0fd]">
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#0061a4]" data-icon="calendar_month">calendar_month</span>
                            <h3 className="font-bold text-[#0061a4] uppercase tracking-widest text-sm">Nhiệm vụ tuần</h3>
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-800">Trồng cây xanh tại nhà</h2>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            Cùng bé gieo mầm sự sống! Hãy chuẩn bị một chậu nhỏ, đất và hạt giống để bắt đầu hành trình trở thành một Digital Nurturer thực thụ.
                        </p>
                        <button 
                            onClick={() => setIsDetailOpen(true)}
                            className="bg-[#006e1c] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-[#006e1c]/20 transition-all flex items-center gap-2"
                        >
                            <span>Thực hiện ngay</span>
                            <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
                        </button>
                    </div>
                    <div className="w-full md:w-64 aspect-square rounded-xl overflow-hidden bg-white border border-slate-200 p-2 flex items-center justify-center">
                        <img alt="Potting plant task" className="w-full h-full object-cover rounded-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw2hHiqRgkK1NJq2giP9lfcYniEsKysr74BtPzl_9ldPZwYk5Wpx3IRb3dinLoye2njO4r6TzvgvGhLsxEzkDIa6bukw7T0OQ39gOnehDSs2gFmGbIagSixq1HtFFG_UQNkn34CAWgTaSjRgz6ZTSlvtzcps-nj8613nxZMxtXT5a_n6puIPbFnxbWsU_6Tz55MKod-hNWCKUkq0ZNxQ6PC5NTXEuTppWUhBE98QoXJMYIosv9W-petBVWAYw6pcuiqhUQ9uzswOU"/>
                    </div>
                </div>
            </section>

            {/* Kids Forest Section */}
            <section className="space-y-6">
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-800">Khu rừng của bé</h2>
                        <p className="text-slate-600">Nơi những mầm xanh của bé đang lớn lên từng ngày</p>
                    </div>
                    <button className="text-[#006e1c] font-bold flex items-center gap-1 hover:underline">
                        <span>Phóng to khu rừng</span>
                        <span className="material-symbols-outlined" data-icon="zoom_in">zoom_in</span>
                    </button>
                </div>
                <div className="h-[400px] w-full rounded-2xl relative overflow-hidden bg-gradient-to-b from-sky-100 to-[#e8f5e9] border border-slate-200">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#006e1c 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
                    <div className="absolute bottom-0 w-full h-32 bg-[#4caf50]/20 blur-3xl rounded-full translate-y-16"></div>
                    
                    <div className="absolute bottom-12 left-20 animate-bounce" style={{ animationDuration: '4s' }}>
                        <span className="material-symbols-outlined text-[#006e1c] text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>forest</span>
                    </div>
                    <div className="absolute bottom-20 left-48">
                        <span className="material-symbols-outlined text-[#4caf50] text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>nature_people</span>
                    </div>
                    <div className="absolute bottom-10 right-40">
                        <span className="material-symbols-outlined text-[#005313] text-9xl" style={{ fontVariationSettings: "'FILL' 1" }}>park</span>
                    </div>
                    <div className="absolute bottom-32 right-80">
                        <span className="material-symbols-outlined text-[#bdad00] text-4xl" data-icon="bug_report">bug_report</span>
                    </div>
                    <div className="absolute top-20 left-1/3">
                        <span className="material-symbols-outlined text-blue-400 text-4xl" data-icon="cloud">cloud</span>
                    </div>
                    <div className="absolute top-12 right-24 text-[#f9e534]">
                        <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>sunny</span>
                    </div>

                    <div className="absolute top-6 left-6 flex gap-4">
                        <div className="px-4 py-2 rounded-2xl shadow-sm flex items-center gap-3 bg-white/80 backdrop-blur-md">
                            <span className="material-symbols-outlined text-[#006e1c]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-slate-500 leading-none">Cây đã trồng</p>
                                <p className="text-xl font-black text-slate-800">12</p>
                            </div>
                        </div>
                        <div className="px-4 py-2 rounded-2xl shadow-sm flex items-center gap-3 bg-white/80 backdrop-blur-md">
                            <span className="material-symbols-outlined text-[#0061a4]" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-slate-500 leading-none">Bạn động vật</p>
                                <p className="text-xl font-black text-slate-800">04</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Thinking Journey */}
            <section className="space-y-6">
                <div className="flex justify-between items-end px-2">
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-800">Hành trình tư duy</h2>
                        <p className="text-slate-600">Lưu giữ những ý tưởng sáng tạo qua nét vẽ</p>
                    </div>
                    <button className="bg-slate-100 text-slate-800 px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:bg-slate-200">
                        Xem tất cả
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Drawing Card 1 */}
                    <div className="bg-white rounded-xl p-3 group cursor-pointer border border-transparent hover:border-[#006e1c]/20 transition-all hover:shadow-xl hover:shadow-slate-200">
                        <div className="aspect-square rounded-lg overflow-hidden bg-slate-100 relative mb-4">
                            <img alt="Drawing of a future city" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5f-kQURMzGAkQ8rQDd-qalKc-_hQEKEczcEkYrlHtuMcbveg0TSrw38DIjfQQjc-3lx4tu0GChFzV9tWYUamRRYbNgZCz70ZVra9qN_FdIcVSisPFTZCRuO-gzl6_c9-2P9RkyB9Tftgg6YxGo0FHDMQYVgz0izTnckdVKXSp5nzJR_VfEZ2h3KUrHY934x9eQwOelEA5bXaBMZ_aZZcpYuu9biXHtuxuFGlSVYIjwvCRmeV5MNNhgBBxe8md5Q5HG17P5GCyE08"/>
                            <div className="absolute top-2 right-2 bg-[#f9e534] text-[#201c00] p-1.5 rounded-full shadow-md">
                                <span className="material-symbols-outlined text-lg" data-icon="military_tech" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                            </div>
                        </div>
                        <div className="px-2 pb-2">
                            <h4 className="font-bold text-slate-800 truncate">Thành phố xanh tương lai</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-slate-500">Hoàn thành 2 ngày trước</span>
                            </div>
                        </div>
                    </div>

                    {/* Drawing Card 2 */}
                    <div className="bg-white rounded-xl p-3 group cursor-pointer border border-transparent hover:border-[#006e1c]/20 transition-all hover:shadow-xl hover:shadow-slate-200">
                        <div className="aspect-square rounded-lg overflow-hidden bg-slate-100 relative mb-4">
                            <img alt="Robot friend drawing" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu1XAddwL2qLi3oxUKqOGYfWsR0ZSH18oTPwQsX0qv311D2vUSRhE-OPBiqPDUsJzgMtaBUP4SyR3CcLnXnrawTPPMxqxctsV1V4P2fZY2YtduYPPKmFhWZRaxbd5RXUpaOPbcJ7mF51lsmZQIPBmUzhNKIGE9DipEqwIkZV9mG4HJtxJ75T1iUHrRlTXcTPBI1sFEJTJgKuBNLAQaUUw2SuTVDKpefMruNF-hgxQfe4jCFBZUJkytyeX1gMEIlZ7HYfF-JhUY1tU"/>
                            <div className="absolute top-2 right-2 bg-[#33a0fd] text-white p-1.5 rounded-full shadow-md">
                                <span className="material-symbols-outlined text-lg" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            </div>
                        </div>
                        <div className="px-2 pb-2">
                            <h4 className="font-bold text-slate-800 truncate">Bạn Robot giúp việc</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-slate-500">Hoàn thành 5 ngày trước</span>
                            </div>
                        </div>
                    </div>

                    {/* Drawing Card 3 */}
                    <div className="bg-white rounded-xl p-3 group cursor-pointer border border-transparent hover:border-[#006e1c]/20 transition-all hover:shadow-xl hover:shadow-slate-200">
                        <div className="aspect-square rounded-lg overflow-hidden bg-slate-100 relative mb-4">
                            <img alt="Nature observation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_DTAIN7BDmxUDMA0f82Rx46BRPTiVnKZoL5wTeOrrBxY871C2egpSyaW_fET-btwDIrwSYQjRO4Qr0xp2q1y3HObi4Jxyw11LK4kokV4i-IQGlcKXWoiMQ3ib3XIs5LfadXNsmTbS3yQ9K-axSNH1-0q4AYIL_1oCvZsgwmBplwxEZ2K1yHSmLk81K8RZX1CUZfOIkXipqDbEQRp8fVhiy8xy1bLrYVVN0z5kTn3HZ_G1jL2zzxeXebJGpzTQJwXCCqoDWggq0m4"/>
                            <div className="absolute top-2 right-2 bg-[#4caf50] text-[#003c0b] p-1.5 rounded-full shadow-md">
                                <span className="material-symbols-outlined text-lg" data-icon="emoji_events" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                            </div>
                        </div>
                        <div className="px-2 pb-2">
                            <h4 className="font-bold text-slate-800 truncate">Hệ sinh thái ao hồ</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-slate-500">Hoàn thành 1 tuần trước</span>
                            </div>
                        </div>
                    </div>

                    {/* New Entry Card */}
                    <div className="bg-slate-50/50 border-2 border-dashed border-slate-300 rounded-xl p-3 group cursor-pointer flex flex-col items-center justify-center gap-4 hover:border-[#006e1c]/50 transition-all hover:bg-[#4caf50]/5">
                        <div className="w-16 h-16 rounded-full bg-[#4caf50]/10 flex items-center justify-center text-[#006e1c] group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-4xl" data-icon="add_photo_alternate">add_photo_alternate</span>
                        </div>
                        <div className="text-center px-4">
                            <h4 className="font-bold text-slate-800">Thêm bản vẽ mới</h4>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Chia sẻ sáng tạo hôm nay của bé</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EcoMissionView;
