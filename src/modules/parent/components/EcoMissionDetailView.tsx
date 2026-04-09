import React from 'react';

interface Props {
    onBack: () => void;
}

const EcoMissionDetailView: React.FC<Props> = ({ onBack }) => {
    return (
        <div className="bg-[#fafbfa] pb-24 -mt-6 -mx-4 md:-mx-8">
            <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center gap-4 border-b border-slate-200 transition-all">
                <button 
                    onClick={onBack}
                    className="p-2 hover:bg-[#4cae4f]/10 rounded-full transition-all active:scale-95 duration-200"
                >
                    <span className="material-symbols-outlined text-[#006e1c]">arrow_back</span>
                </button>
                <span className="text-xl font-bold text-[#006e1c] tracking-tight">Chi tiết nhiệm vụ tuần</span>
            </nav>

            <main className="max-w-5xl mx-auto px-6 pt-8 space-y-12">
                {/* Hero Header Section */}
                <header className="relative overflow-hidden rounded-xl bg-[#4caf50]/10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border-l-8 border-[#006e1c]">
                    <div className="flex-1 space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#33a0fd] text-white text-sm font-medium shadow-sm">
                            <span className="material-symbols-outlined text-sm">eco</span>
                            Eco-Mission
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">Trồng cây xanh tại nhà</h1>
                        <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                            Chào mừng bé đến với hành trình kiến tạo lá phổi xanh! Nhiệm vụ này giúp bé hiểu về cách một mầm xanh vươn mình, học cách chăm sóc và trân trọng món quà từ thiên nhiên ngay tại không gian sống của mình.
                        </p>
                    </div>
                    <div className="relative w-64 h-64 flex-shrink-0">
                        <div className="absolute inset-0 bg-[#006e1c]/20 rounded-full blur-3xl animate-pulse"></div>
                        <img alt="Hình ảnh minh họa mầm cây xanh" className="relative z-10 w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIp-lM6rcM8X-O8Uh47iJmA4a3T-0xzwFkm4bJ0DpSWp4HrVhiX3RDMsH33UBPKWqnCaOUjb4pTvk7AVqB-eFZOUQE6_D5rU9Ufh6X-I0aiW-WMSJ-W0wdJZV8jwqkObG73QiUnFWU9LZSisgK4V_QZr8-H_B7tfhup2VQ86xpuWRfQG9Cipw2bFpUQven3kD7qXLtrLyhBiVe5Wv0LAFwVsv8SgZwCX0UxfUTyqvw46_axqmgEk2fKa6rMLDoQZlAtN3gf4D9aKA"/>
                    </div>
                </header>

                {/* Step-by-Step Instructions */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-800">3 Bước Thực Hiện</h2>
                        <div className="h-1 flex-1 bg-slate-200 mx-6 rounded-full opacity-50"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Step 1 */}
                        <div className="bg-white p-8 rounded-xl relative overflow-hidden group hover:bg-slate-50 transition-colors shadow-sm border border-slate-100">
                            <span className="text-5xl font-black absolute right-4 top-2 opacity-5 text-[#006e1c]">01</span>
                            <div className="w-12 h-12 rounded-lg bg-[#d1e4ff] flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-[#0061a4] text-3xl">inventory_2</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-800">Chuẩn bị hạt</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">Chọn những hạt giống bé thích (đỗ, ngô, hoặc hạt hoa) và một chiếc chậu nhỏ xinh có đất ẩm nhé.</p>
                        </div>
                        {/* Step 2 */}
                        <div className="bg-white p-8 rounded-xl relative overflow-hidden group hover:bg-slate-50 transition-colors shadow-sm border border-slate-100">
                            <span className="text-5xl font-black absolute right-4 top-2 opacity-5 text-[#006e1c]">02</span>
                            <div className="w-12 h-12 rounded-lg bg-[#94f990]/30 flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-[#006e1c] text-3xl">psychiatry</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-800">Gieo mầm</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">Dùng ngón tay tạo một lỗ nhỏ trên đất, nhẹ nhàng đặt hạt vào và phủ một lớp đất mỏng lên trên.</p>
                        </div>
                        {/* Step 3 */}
                        <div className="bg-white p-8 rounded-xl relative overflow-hidden group hover:bg-slate-50 transition-colors shadow-sm border border-slate-100">
                            <span className="text-5xl font-black absolute right-4 top-2 opacity-5 text-[#006e1c]">03</span>
                            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-blue-600 text-3xl">water_drop</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-800">Tưới nước</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">Tưới một chút nước đủ làm ẩm đất. Hãy nhớ kiểm tra và cho "bạn cây" uống nước mỗi ngày nha!</p>
                        </div>
                    </div>
                </section>

                {/* Rewards & Submission Section */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Rewards */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold text-slate-800">Phần thưởng</h2>
                        <div className="bg-[#f9e534]/10 p-8 rounded-xl border-2 border-dashed border-[#bdad00]/30 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg shadow-[#695f00]/5">
                                    <span className="material-symbols-outlined text-[#695f00] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>generating_tokens</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Hạt giống tích lũy</p>
                                    <p className="text-2xl font-black text-[#695f00]">200 Hạt giống</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg shadow-[#006e1c]/10">
                                    <span className="material-symbols-outlined text-[#006e1c] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Huy hiệu mới</p>
                                    <p className="text-2xl font-black text-[#006e1c]">Nhà Bảo Vệ Cây</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submission */}
                    <div className="lg:col-span-3 space-y-6">
                        <h2 className="text-2xl font-bold text-slate-800">Nộp bài tập</h2>
                        <div className="bg-white p-8 rounded-xl shadow-lg shadow-slate-200/50 space-y-6 border border-slate-100">
                            <div className="flex flex-col items-center justify-center border-4 border-dashed border-slate-200 rounded-xl p-12 group hover:border-[#4caf50] transition-all cursor-pointer bg-slate-50/50 hover:bg-[#4caf50]/5">
                                <div className="w-20 h-20 rounded-full bg-[#4caf50] text-white flex items-center justify-center shadow-lg shadow-[#4caf50]/20 mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-4xl">cloud_upload</span>
                                </div>
                                <p className="text-xl font-bold text-[#006e1c] mb-2">Tải ảnh minh chứng</p>
                                <p className="text-slate-500 text-sm text-center">Hãy chụp bức ảnh bé đang chăm sóc mầm xanh của mình nhé!</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg space-y-2 border border-slate-100">
                                <p className="text-xs font-bold text-slate-600 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">visibility_off</span>
                                    LƯU Ý AN TOÀN
                                </p>
                                <ul className="text-xs text-slate-500 list-disc list-inside space-y-1">
                                    <li>Ảnh của bé sẽ được ẩn danh và chỉ chia sẻ trong nhóm học tập.</li>
                                    <li>Bố mẹ hãy giúp bé kiểm tra để không lộ các thông tin cá nhân trong ảnh.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EcoMissionDetailView;
