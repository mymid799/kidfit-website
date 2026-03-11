import React, { useState, useRef } from 'react';
import { useLessonPlanner } from '@/features/lessons';

const AILessonPlannerTab = () => {
    const { isGenerating, result, error, generateLesson, reset } = useLessonPlanner();
    const [formData, setFormData] = useState({
        topic: '',
        ageGroup: '5-6 Tuổi',
        duration: '45 phút',
        activityCount: 4,
        document: null as File | null
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, document: e.target.files![0] }));
        }
    };

    const adjustActivities = (delta: number) => {
        setFormData(prev => ({
            ...prev,
            activityCount: Math.max(1, Math.min(10, prev.activityCount + delta))
        }));
    };

    const handleSubmit = async () => {
        if (!formData.topic && !formData.document) {
            alert('Vui lòng nhập chủ đề hoặc tải lên tài liệu!');
            return;
        }
        await generateLesson({
            topic: formData.topic,
            ageGroup: formData.ageGroup,
            duration: formData.duration,
            activityCount: formData.activityCount,
            document: formData.document || undefined
        });
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* 1. Lesson Planner Dashboard Statistics */}
            {!result && (
                <section>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-tight">AI Lesson Planner</h2>
                            <p className="text-slate-500 mt-1 font-medium">Trợ lý ảo thiết kế bài giảng STEAM thông minh</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-2xl text-sm font-black flex items-center gap-2 hover:bg-slate-50 transition-all text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined text-lg">help_outline</span> Hướng dẫn
                            </button>
                            <button className="bg-primary text-white px-8 py-3 rounded-2xl text-sm font-black flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all uppercase tracking-widest">
                                <span className="material-symbols-outlined text-lg">add</span> Bài giảng mẫu
                            </button>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all group">
                            <div>
                                <div className="size-12 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">today</span>
                                </div>
                                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Bài giảng hôm nay</p>
                                <h3 className="text-4xl font-black mt-2 text-slate-800 dark:text-white font-display">03</h3>
                            </div>
                            <p className="text-xs text-green-600 mt-4 flex items-center font-black">
                                <span className="material-symbols-outlined text-sm mr-1">trending_up</span> +1 SO VỚI HÔM QUA
                            </p>
                        </div>
                        
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all group">
                            <div>
                                <div className="size-12 rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center text-yellow-600 mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">calendar_view_week</span>
                                </div>
                                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Tuần này</p>
                                <h3 className="text-4xl font-black mt-2 text-slate-800 dark:text-white font-display">15</h3>
                            </div>
                            <p className="text-xs text-green-600 mt-4 flex items-center font-black">
                                <span className="material-symbols-outlined text-sm mr-1">trending_up</span> +3 HOÀN THÀNH
                            </p>
                        </div>
                        
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all group">
                            <div>
                                <div className="size-12 rounded-2xl bg-pink-50 dark:bg-pink-900/20 flex items-center justify-center text-pink-600 mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">library_books</span>
                                </div>
                                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Tổng bài giảng</p>
                                <h3 className="text-4xl font-black mt-2 text-slate-800 dark:text-white font-display">124</h3>
                            </div>
                            <p className="text-xs text-slate-400 mt-4 flex items-center font-black uppercase tracking-wider">TĂNG 12% THÁNG NÀY</p>
                        </div>
                        
                        <div className="bg-primary text-white p-8 rounded-[32px] shadow-xl shadow-primary/20 relative overflow-hidden group">
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <p className="text-white/70 text-[10px] font-black uppercase tracking-[2px]">Chủ đề hiện tại</p>
                                    <h3 className="text-xl font-black mt-2 leading-tight">Khám phá Đại dương & Sinh vật biển</h3>
                                </div>
                                <div className="mt-4 inline-block bg-white/20 px-3 py-1.5 rounded-full text-[9px] uppercase font-black tracking-widest backdrop-blur-md w-fit">Lớp STEAM - 5 Tuổi</div>
                            </div>
                            <span className="material-symbols-outlined absolute -bottom-6 -right-6 text-white/10 text-9xl transition-transform group-hover:scale-110 group-hover:-rotate-12 duration-700">waves</span>
                        </div>
                    </div>
                </section>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* 2. AI Lesson Generator Form */}
                <div className="lg:col-span-4 space-y-8">
                    <section className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                        {isGenerating && (
                            <div className="absolute inset-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
                                <div className="size-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
                                <p className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-xs">AI đang soạn bài giảng...</p>
                                <p className="text-[10px] text-slate-500 mt-2">Vui lòng đợi trong giây lát ✨</p>
                            </div>
                        )}

                        <div className="flex items-center gap-3 mb-8">
                            <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
                            <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Thiết kế nhanh</h2>
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-3">Chủ đề bài giảng</label>
                                <input 
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-primary/20 transition-all dark:text-white" 
                                    placeholder="Ví dụ: Vòng đời của Bướm..." 
                                    type="text"
                                    name="topic"
                                    value={formData.topic}
                                    onChange={handleInputChange}
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-3">Độ tuổi</label>
                                    <select 
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-primary/20 dark:text-white"
                                        name="ageGroup"
                                        value={formData.ageGroup}
                                        onChange={handleInputChange}
                                    >
                                        <option>3-4 Tuổi</option>
                                        <option>4-5 Tuổi</option>
                                        <option>5-6 Tuổi</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-3">Thời lượng</label>
                                    <select 
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-primary/20 dark:text-white"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                    >
                                        <option>30 phút</option>
                                        <option>45 phút</option>
                                        <option>60 phút</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-3">Tài liệu đính kèm (PDF/Ảnh)</label>
                                <div 
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`w-full border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all ${formData.document ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-primary/50'}`}
                                >
                                    <span className={`material-symbols-outlined text-2xl mb-1 ${formData.document ? 'text-primary' : 'text-slate-300'}`}>
                                        {formData.document ? 'task_alt' : 'cloud_upload'}
                                    </span>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest truncate max-w-full">
                                        {formData.document ? formData.document.name : 'Chọn file tài liệu'}
                                    </p>
                                    <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept="image/*,application/pdf" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-3">Số lượng hoạt động</label>
                                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 rounded-2xl px-4 py-2">
                                    <button onClick={() => adjustActivities(-1)} className="size-10 rounded-xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center font-black text-slate-600 dark:text-white hover:bg-primary hover:text-white transition-all">-</button>
                                    <span className="flex-1 text-center font-black text-lg text-slate-800 dark:text-white">{formData.activityCount}</span>
                                    <button onClick={() => adjustActivities(1)} className="size-10 rounded-xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center font-black text-slate-600 dark:text-white hover:bg-primary hover:text-white transition-all">+</button>
                                </div>
                            </div>
                            
                            <button 
                                onClick={handleSubmit}
                                disabled={isGenerating}
                                className="w-full bg-primary text-white py-5 rounded-[24px] font-black flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 mt-6 group uppercase tracking-[2px] text-xs disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">magic_button</span>
                                Thiết kế bằng AI
                            </button>

                            {error && <p className="text-red-500 text-[10px] font-black uppercase text-center mt-4">❌ {error}</p>}
                        </div>
                    </section>

                    <section className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-white font-black text-lg uppercase tracking-widest mb-6">Lịch giảng dạy</h2>
                            <div className="grid grid-cols-7 text-center gap-y-4">
                                {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(day => (
                                    <span key={day} className="text-[10px] font-black text-slate-500 uppercase">{day}</span>
                                ))}
                                {Array.from({ length: 14 }).map((_, i) => (
                                    <button key={i} className={`text-xs h-10 w-10 mx-auto rounded-xl flex items-center justify-center font-bold transition-all ${i + 1 === 6 ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110' : 'text-slate-400 hover:bg-white/10'}`}>
                                        {i + 1}
                                        {i + 1 === 7 && <span className="absolute bottom-2 size-1 bg-primary rounded-full"></span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="absolute -top-10 -left-10 size-40 bg-primary/10 rounded-full blur-3xl"></div>
                    </section>
                </div>

                {/* 3. Lesson Output */}
                <div className="lg:col-span-8">
                    <section className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm min-h-[600px] flex flex-col overflow-hidden">
                        {!result ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 text-slate-300">
                                <span className="material-symbols-outlined text-8xl mb-6">menu_book</span>
                                <h3 className="text-xl font-black uppercase tracking-[4px]">Chưa có dữ liệu</h3>
                                <p className="mt-2 text-sm font-bold text-slate-400">Hãy nhập chủ đề bên cạnh để AI giúp bạn thiết kế giáo trình!</p>
                            </div>
                        ) : (
                            <>
                                <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/30">
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-widest">{result.topic_tag}</span>
                                            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">• Vừa tạo xong</span>
                                        </div>
                                        <h2 className="text-3xl font-black text-slate-800 dark:text-white leading-tight">{result.title}</h2>
                                    </div>
                                    <div className="flex gap-3">
                                        <button onClick={reset} className="size-12 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-500 flex items-center justify-center hover:bg-slate-50 transition-all"><span className="material-symbols-outlined text-2xl">refresh</span></button>
                                        <button className="size-12 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-500 flex items-center justify-center hover:bg-slate-50 transition-all"><span className="material-symbols-outlined text-2xl">download</span></button>
                                        <button className="bg-primary text-white px-8 py-3 rounded-2xl text-xs font-black hover:scale-105 transition-all shadow-lg shadow-primary/20 uppercase tracking-widest">Lưu giáo trình</button>
                                    </div>
                                </div>
                                
                                <div className="p-10 flex-1 overflow-y-auto space-y-12">
                                    {/* Mục tiêu bài học */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                                <span className="material-symbols-outlined text-2xl">target</span>
                                            </div>
                                            <h3 className="font-black text-xl text-slate-800 dark:text-white uppercase tracking-tight">Mục tiêu bài học</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {[
                                                { title: 'Kiến thức', text: result.objectives.knowledge, color: 'text-blue-600', bg: 'bg-blue-50' },
                                                { title: 'Kỹ năng', text: result.objectives.skills, color: 'text-green-600', bg: 'bg-green-50' },
                                                { title: 'Thái độ', text: result.objectives.attitude, color: 'text-purple-600', bg: 'bg-purple-50' },
                                            ].map((goal, i) => (
                                                <div key={i} className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all">
                                                    <p className={`text-[10px] font-black ${goal.color} uppercase tracking-[2px] mb-3`}>{goal.title}</p>
                                                    <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed">{goal.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Hoạt động chính */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="size-10 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-2xl">directions_run</span>
                                            </div>
                                            <h3 className="font-black text-xl text-slate-800 dark:text-white uppercase tracking-tight">Hoạt động chính (STEAM)</h3>
                                        </div>
                                        <div className="space-y-6">
                                            {result.activities.map((act: any, i: number) => (
                                                <div key={i} className="flex gap-6 p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl hover:border-primary/30 transition-all group">
                                                    <div className="bg-primary text-white size-10 rounded-2xl flex items-center justify-center font-black shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">{act.step || i + 1}</div>
                                                    <div>
                                                        <h4 className="font-black text-slate-800 dark:text-white mb-2 text-lg">{act.title}</h4>
                                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">{act.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Trò chơi & Câu chuyện */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="bg-pink-50/50 dark:bg-pink-900/10 p-8 rounded-[32px] border border-pink-100 dark:border-pink-900/20 relative">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="size-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-2xl">auto_stories</span>
                                                </div>
                                                <h3 className="font-black text-xl text-slate-800 dark:text-white uppercase tracking-tight">Câu chuyện dẫn dắt</h3>
                                            </div>
                                            <p className="italic text-slate-700 dark:text-slate-300 leading-relaxed font-medium relative pr-8">
                                                <span className="material-symbols-outlined absolute -top-4 -right-2 text-pink-200 dark:text-pink-800/20 text-6xl rotate-180">format_quote</span>
                                                {result.story}
                                            </p>
                                        </div>
                                        
                                        <div className="bg-blue-50/50 dark:bg-blue-900/10 p-8 rounded-[32px] border border-blue-100 dark:border-blue-900/20">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="size-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-2xl">quiz</span>
                                                </div>
                                                <h3 className="font-black text-xl text-slate-800 dark:text-white uppercase tracking-tight">Câu hỏi tương tác</h3>
                                            </div>
                                            <ul className="space-y-4">
                                                {result.questions.map((q: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-4 text-sm font-black text-slate-600 dark:text-slate-400">
                                                        <span className="material-symbols-outlined text-primary text-xl mt-0.5">help</span>
                                                        {q}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </section>
                </div>
            </div>

            {/* 4. Lesson Library */}
            {!result && (
                <section>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined text-3xl">folder_managed</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Thư viện bài giảng của tôi</h2>
                                <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-widest">Quản lý các giáo trình đã lưu</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <select className="bg-white dark:bg-slate-800 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest px-6 py-3 outline-none focus:ring-4 focus:ring-primary/10 shadow-sm text-slate-600 dark:text-white">
                                <option>Tất cả chủ đề</option>
                                <option>Thế giới thực vật</option>
                                <option>Vũ trụ bao la</option>
                                <option>Gia đình thân yêu</option>
                            </select>
                            <select className="bg-white dark:bg-slate-800 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest px-6 py-3 outline-none focus:ring-4 focus:ring-primary/10 shadow-sm text-slate-600 dark:text-white">
                                <option>Tháng 10/2023</option>
                                <option>Tháng 09/2023</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: 'Ong thợ thông minh & Thuật toán', tags: ['Robotics', 'Logic'], time: '45\'', age: '5-6T', color: 'primary', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW1kwqv6hzQOA3FVFb6WwglpW47u6SlJShFPz2upXOwd8DojlKMZLM10cZvsDeAAYm2-RQeU4hBzQOXf73U0LzgRpbZ6hUVOUzzptRaVZ2WMFvLNadI7fv-TYe6QX7Y4JPSZ3Q9UDbpf-NOJAjh5IzfnqEsD-ovhFR1di4WIqKP6GnN5pvFi4gOiEHF0kOLJuTH5DtIgomRchxe79ECJsr-rAxXHP608dizeP23bpj0BQNHsyBgaAHc-RdY8nZ6erywVrQ5WDERBM' },
                            { title: 'Tên lửa giấy & Chinh phục Mặt trăng', tags: ['Thiên văn'], time: '60\'', age: '4-5T', color: 'orange', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuGzNCKSdpAXStTe6_RaisDGxgRrJmrbxoO1-SrOEkeLujcN7WT27vehtwaDdIgS6OVtxmIsDJZq47ZnGMVj8IYTj3KWFg786W1_szXpKrQ7DG0Fl9p0oOe-FtFZ0CkQpVuFEb0aClQS0amRbRblLhfPTVX5hrzRAoMZAMnAWiFlSbHJ7m-hQQ-TuOs-TPL3Gd5MlM1xg4U9EeOdhC-mnmZWbYvYBTsdQE6L3bcY-1E2rolfNM341k8G6HZKlxGsdPjvGJkm3LFOI' },
                            { title: 'Sự rung động & Nhạc cụ tự chế', tags: ['Nghệ thuật'], time: '30\'', age: '3-4T', color: 'pink', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDs7SKAy8A6eY74Qpz5BqFARh88tYxRdY7aSIqJWZE9EuLDmZGpOVYMcEI0-Rrh2qMa9_04uOFKZ1i6NhSqhH6nZ31Zu82rVfCdJHBswUVsm29MJ0EWAv-Qugqn4BjnDkpCJNjmTR3BL-UoFAwae9WHq78YK7ZWC96lj9DqGenMFijg2_QmYseV9z4G_QzpR2hKuCa5cWUA12w7LkKJyJrR7EYUTThgEkmS-SnuKNcgh2oVHfbqE2mte4__5wwBGjvKz6YSKUjbtlo' },
                        ].map((card, i) => (
                            <div key={i} className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                                <div className="h-56 relative overflow-hidden">
                                    <img alt="Lesson Cover" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={card.img} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                                        <div className="flex gap-2">
                                            {card.tags.map(tag => (
                                                <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[9px] font-black rounded-full uppercase tracking-widest">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h4 className="font-black text-slate-800 dark:text-white text-xl mb-6 group-hover:text-primary transition-colors leading-tight">{card.title}</h4>
                                    <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-6 mt-6">
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                                <span className="material-symbols-outlined text-lg text-primary">schedule</span> {card.time}
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                                <span className="material-symbols-outlined text-lg text-primary">groups</span> {card.age}
                                            </div>
                                        </div>
                                        <button className="material-symbols-outlined text-slate-300 hover:text-red-500 hover:scale-125 transition-all transition-colors duration-300">favorite</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-12 text-center">
                        <button className="px-10 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-[3px] hover:bg-primary hover:text-white transition-all shadow-sm">
                            Xem thêm 12+ bài giảng cũ hơn
                        </button>
                    </div>
                </section>
            )}
        </div>
    );
};

export default AILessonPlannerTab;
