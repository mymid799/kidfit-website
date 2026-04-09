import React, { useState, useEffect } from 'react';
import { authenticatedFetch } from '@/modules/auth/services/authService';
import { API_BASE_URL } from '@/shared/services/api';

export default function DocumentRepositoryView() {
    const [activeTab, setActiveTab] = useState<'lessons' | 'tools'>('lessons');
    
    // Lessons State
    const [lessons, setLessons] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Tools State
    const [tools, setTools] = useState<any[]>([]);
    const [scanData, setScanData] = useState<{ uid: string, action: 'INFO' | 'BORROW' | 'RETURN' } | null>(null);
    const [scanResult, setScanResult] = useState<any>(null);

    const fetchLessons = async () => {
        setIsLoading(true);
        try {
            const url = new URL(`${API_BASE_URL}/api/teacher/materials/lessons`);
            if (searchQuery) url.searchParams.append('search', searchQuery);

            const res = await authenticatedFetch(url.toString());
            const data = await res.json();
            if (data.success) {
                setLessons(data.data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchTools = async () => {
        setIsLoading(true);
        try {
            const res = await authenticatedFetch(`${API_BASE_URL}/api/teacher/materials/tools`);
            const data = await res.json();
            if (data.success) {
                setTools(data.data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    // Use effect cho tab Lessons
    useEffect(() => {
        if (activeTab === 'lessons') {
            const delayDebounceFn = setTimeout(() => {
                fetchLessons();
            }, 500);

            return () => clearTimeout(delayDebounceFn);
        }
    }, [searchQuery, activeTab]);

    // Use effect cho tab Tools
    useEffect(() => {
        if (activeTab === 'tools') {
            fetchTools();
        }
    }, [activeTab]);

    const handleScanQR = async () => {
        if (!scanData?.uid) return alert('Vui lòng nhập mã QR');
        try {
            const res = await authenticatedFetch(`${API_BASE_URL}/api/teacher/materials/tools/scan`, {
                method: 'POST',
                body: JSON.stringify({
                    qrCodeUid: scanData.uid,
                    action: scanData.action
                })
            });
            const data = await res.json();
            if (data.success) {
                setScanResult(data.data);
                if (scanData.action !== 'INFO') {
                    alert(data.message);
                    fetchTools();
                }
            } else {
                alert(data.error);
            }
        } catch (e) {
            alert('Lỗi máy chủ');
        }
    };

    const activeClass = "bg-primary text-white shadow-xl shadow-primary/30 font-bold scale-105";
    const inactiveClass = "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200 font-semibold";

    return (
        <div className="flex-1 pb-12 w-full max-w-7xl mx-auto space-y-8 rounded-[32px] font-display text-slate-800 fade-in">
            {/* Header Tabs */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white/60 backdrop-blur-xl p-4 lg:p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50 gap-4">
                <div className="flex bg-slate-100 p-1.5 rounded-full overflow-hidden w-full md:w-auto relative zoom-in">
                    <button 
                        onClick={() => setActiveTab('lessons')} 
                        className={`flex-1 md:w-48 px-6 py-3 rounded-full flex items-center justify-center gap-2 text-[14px] transition-all duration-300 z-10 ${activeTab === 'lessons' ? activeClass : inactiveClass}`}
                    >
                        <span className="material-symbols-outlined text-[20px]">smart_display</span>
                        Giáo trình
                    </button>
                    <button 
                        onClick={() => setActiveTab('tools')} 
                        className={`flex-1 md:w-48 px-6 py-3 rounded-full flex items-center justify-center gap-2 text-[14px] transition-all duration-300 z-10 ${activeTab === 'tools' ? activeClass : inactiveClass}`}
                    >
                        <span className="material-symbols-outlined text-[20px]">construction</span>
                        Học cụ
                    </button>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-full font-bold hover:shadow-lg transition-all hover:bg-slate-900 text-sm">
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        Thêm mới
                    </button>
                </div>
            </div>

            {/* TAB: LESSONS */}
            {activeTab === 'lessons' && (
                <div className="space-y-8 fade-in">
                    {/* Search & Insight */}
                    <div className="flex gap-4">
                        <div className="relative flex-1 group">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                <span className="material-symbols-outlined text-[24px]">search</span>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-3xl text-[15px] focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm outline-none font-medium placeholder:text-slate-400"
                                placeholder="Tìm kiếm giáo trình, video bằng phương pháp Full-Text Search..."
                            />
                            {isLoading && (
                                <div className="absolute inset-y-0 right-0 pr-6 flex items-center">
                                    <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Lesson Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lessons.length === 0 && !isLoading && (
                            <div className="col-span-full py-20 text-center">
                                <span className="material-symbols-outlined text-6xl text-slate-200 mb-4 block">sentiment_dissatisfied</span>
                                <h3 className="text-xl font-bold text-slate-600 mb-2">Chưa có giáo trình nào</h3>
                                <p className="text-slate-500">Hãy thêm giáo trình mới vào thư viện.</p>
                            </div>
                        )}
                        
                        {lessons.map((lesson) => (
                            <div key={lesson.id} className="bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col hover:-translate-y-1">
                                <div className={`h-40 flex items-center justify-center relative overflow-hidden p-6 ${
                                    lesson.content_type === 'VIDEO' ? 'bg-red-50 text-red-500' : 
                                    lesson.content_type === 'PDF' ? 'bg-amber-50 text-amber-600' : 
                                    'bg-blue-50 text-blue-500'
                                }`}>
                                    <span className="material-symbols-outlined text-6xl opacity-40 group-hover:scale-110 transition-transform duration-500">
                                        {lesson.content_type === 'VIDEO' ? 'play_circle' : 
                                         lesson.content_type === 'PDF' ? 'picture_as_pdf' : 'article'}
                                    </span>
                                    
                                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm">
                                        {lesson.content_type}
                                    </div>
                                </div>
                                
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="font-bold text-[18px] text-slate-800 mb-2 leading-tight group-hover:text-primary transition-colors">{lesson.title}</h3>
                                    <p className="text-[13px] text-slate-500 line-clamp-2 leading-relaxed font-medium mb-4">{lesson.description}</p>
                                    
                                    <div className="flex flex-wrap gap-2 mt-auto pb-4 border-b border-slate-50">
                                        {lesson.tags?.map((tag: string, i: number) => (
                                            <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase">{tag}</span>
                                        ))}
                                    </div>
                                    
                                    <div className="pt-4 flex items-center justify-between">
                                        <button className="text-primary text-[13px] font-bold flex items-center gap-1.5 hover:underline">
                                           Xem chi tiết <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                        </button>
                                        <button className="w-8 h-8 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 flex items-center justify-center transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB: TOOLS */}
            {activeTab === 'tools' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 fade-in">
                    
                    {/* Scanner Section */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-slate-800 rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-800/30">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-[50px]"></div>
                            
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">qr_code_scanner</span>
                                Quét mã học cụ
                            </h3>
                            
                            <div className="space-y-4 relative z-10">
                                <div>
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Nhập / Quét mã (Giả lập)</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-600"
                                        placeholder="Ví dụ: UID_123"
                                        onChange={(e) => setScanData({ ...scanData, uid: e.target.value } as any)}
                                    />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-2">
                                    <button 
                                        onClick={() => setScanData(prev => ({ uid: prev?.uid || '', action: 'INFO' }))}
                                        className={`py-2 rounded-xl text-xs font-bold border transition-colors ${scanData?.action === 'INFO' ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'border-slate-700 text-slate-400 hover:bg-slate-700'}`}
                                    >
                                        Thông tin
                                    </button>
                                    <button 
                                        onClick={() => setScanData(prev => ({ uid: prev?.uid || '', action: 'BORROW' }))}
                                        className={`py-2 rounded-xl text-xs font-bold border transition-colors ${scanData?.action === 'BORROW' ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'border-slate-700 text-slate-400 hover:bg-slate-700'}`}
                                    >
                                        Mượn đồ
                                    </button>
                                </div>
                                <button 
                                    onClick={() => setScanData(prev => ({ uid: prev?.uid || '', action: 'RETURN' }))}
                                    className={`w-full py-2 rounded-xl text-xs font-bold border transition-colors ${scanData?.action === 'RETURN' ? 'bg-green-500/20 border-green-500 text-green-400' : 'border-slate-700 text-slate-400 hover:bg-slate-700'}`}
                                >
                                    Trả đồ
                                </button>
                                
                                <button 
                                    onClick={handleScanQR}
                                    className="w-full mt-4 bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(76,174,79,0.4)]"
                                >
                                    THỰC THI QUÉT
                                </button>
                            </div>
                        </div>

                        {scanResult && (
                            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-green-200 fade-in relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <span className="material-symbols-outlined text-8xl text-green-500">check_circle</span>
                                </div>
                                <h4 className="text-xs font-bold text-green-500 uppercase tracking-widest mb-4">Kết quả truy xuất</h4>
                                <h3 className="text-xl font-black text-slate-800 mb-1">{scanResult.name}</h3>
                                <p className="text-sm font-bold text-slate-400 mb-4">{scanResult.qr_code_uid}</p>
                                
                                <div className="bg-slate-50 p-4 rounded-2xl space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-500">Tình trạng</span>
                                        <span className="text-xs font-black px-2 py-1 bg-green-100 text-green-600 rounded-md">{scanResult.condition}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-500">Kho / Tổng</span>
                                        <span className="text-sm font-black text-slate-800"><span className="text-primary text-lg">{scanResult.available_quantity}</span> / {scanResult.total_quantity}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Inventory List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden relative">
                            {isLoading && (
                                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
                                    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                </div>
                            )}

                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <h3 className="font-bold text-lg text-slate-800">Danh sách trong kho</h3>
                                <div className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-xl">
                                    {tools.length} Vật phẩm
                                </div>
                            </div>
                            
                            <div className="divide-y divide-slate-50 max-h-[600px] overflow-y-auto hide-scrollbar">
                                {tools.length === 0 && !isLoading && (
                                    <div className="p-12 text-center text-slate-400">Chưa có dữ liệu học cụ.</div>
                                )}
                                
                                {tools.map(tool => (
                                    <div key={tool.id} className="p-6 flex items-center justify-between hover:bg-slate-50/80 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-100">
                                                <span className="material-symbols-outlined">extension</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[15px] text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight mb-1">{tool.name}</h4>
                                                <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400">
                                                    <span className="uppercase tracking-widest text-slate-300">UID: {tool.qr_code_uid}</span>
                                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                                    {tool.condition === 'NEW' && <span className="text-green-500">CÒN MỚI</span>}
                                                    {tool.condition === 'USED' && <span className="text-amber-500">ĐÃ SỬ DỤNG</span>}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="text-right flex flex-col items-end">
                                            <div className="bg-slate-100 text-slate-800 px-3 py-1.5 rounded-xl text-xs font-black shadow-inner">
                                                <span className={tool.available_quantity === 0 ? "text-red-500" : "text-primary"}>
                                                    {tool.available_quantity}
                                                </span> / {tool.total_quantity}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
