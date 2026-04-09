import React, { useState, useEffect, useCallback } from 'react';

// API Configuration helper (Reuse logic from Admin dashboard)
const API = 'http://localhost:5000/api';
const getHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'application/json'
});

const TeacherLessonManager = () => {
    const [lessons, setLessons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');

    const fetchMyLessons = useCallback(async () => {
        try {
            const res = await fetch(`${API}/teacher/materials/lessons`, { headers: getHeaders() });
            const data = await res.json();
            if (data.success) {
                // Filter only own lessons (Server should already do this based on role, but safe-guard)
                setLessons(data.data);
            }
        } catch (error) {
            console.error('Lỗi tải giáo án cá nhân:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchMyLessons(); }, [fetchMyLessons]);

    const handleSubmitForReview = async (id: number) => {
        if (!confirm('Bạn có chắc chắn muốn gửi giáo án này lên Ban Giám Hiệu để phê duyệt?')) return;
        try {
            const res = await fetch(`${API}/teacher/materials/lessons/${id}/submit`, {
                method: 'POST',
                headers: getHeaders()
            });
            const data = await res.json();
            if (data.success) {
                alert('Đã gửi giáo án thành công!');
                fetchMyLessons();
            }
        } catch (error) {
            alert('Lỗi khi gửi duyệt');
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'APPROVED': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'SUBMITTED': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'VERIFIED': return 'bg-purple-50 text-purple-600 border-purple-100';
            case 'REJECTED': return 'bg-rose-50 text-rose-600 border-rose-100';
            default: return 'bg-slate-50 text-slate-400 border-slate-100';
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Hồ sơ Giáo án cá nhân</h2>
                    <p className="text-slate-500 mt-1 font-bold text-xs uppercase tracking-widest">Quản lý quy trình soạn thảo & ký duyệt số</p>
                </div>
                <div className="flex gap-2 p-1.5 bg-white rounded-2xl shadow-sm border border-slate-100">
                    {['ALL', 'DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED'].map(f => (
                        <button 
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${filter === f ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {f === 'ALL' ? 'Tất cả' : f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {loading ? (
                    <div className="py-20 text-center font-black text-slate-300 uppercase tracking-[4px] animate-pulse">Đang tải hồ sơ chuyên môn...</div>
                ) : lessons.length === 0 ? (
                    <div className="bg-white p-20 rounded-[40px] text-center border-2 border-dashed border-slate-100">
                        <span className="material-symbols-outlined text-7xl text-slate-100 mb-6 block">folder_off</span>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Bạn chưa có giáo án nào trong kho</p>
                    </div>
                ) : lessons.filter(l => filter === 'ALL' || l.status === filter).map(lesson => (
                    <div key={lesson.id} className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
                        {lesson.status === 'APPROVED' && (
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <span className="material-symbols-outlined text-8xl text-emerald-600">verified</span>
                            </div>
                        )}
                        
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                            <span className="material-symbols-outlined text-3xl">{lesson.status === 'APPROVED' ? 'verified_user' : 'description'}</span>
                        </div>

                        <div className="flex-1 min-w-0 text-center md:text-left">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                                <h3 className="text-lg font-black text-slate-800 tracking-tight truncate max-w-md">{lesson.title}</h3>
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusBadge(lesson.status)}`}>
                                    {lesson.status}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">• KHỐI {lesson.grade_block}</span>
                            </div>
                            <p className="text-sm text-slate-500 font-medium line-clamp-1">{lesson.description || 'Chưa có mô tả chi tiết'}</p>
                            
                            {lesson.status === 'APPROVED' && lesson.digital_signature && (
                                <div className="mt-4 p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-center gap-4 animate-in zoom-in-95 duration-500">
                                    <div className="size-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-xl">draw</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Đã ký số phê duyệt</p>
                                        <p className="text-[9px] font-mono text-emerald-500/80 truncate">{lesson.digital_signature}</p>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">{new Date(lesson.signed_at).toLocaleDateString('vi-VN')}</p>
                                </div>
                            )}

                            {lesson.status === 'REJECTED' && (
                                <div className="mt-4 p-3 bg-rose-50/50 border border-rose-100 rounded-xl flex items-center gap-4">
                                    <div className="size-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-xl">report</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-black text-rose-700 uppercase tracking-widest">Yêu cầu sửa đổi</p>
                                        <p className="text-xs font-bold text-rose-500">{lesson.review_note}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2 shrink-0">
                            <button className="px-5 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl text-xs font-black uppercase tracking-wider transition-all">Xem</button>
                            {(lesson.status === 'DRAFT' || lesson.status === 'REJECTED') && (
                                <button 
                                    onClick={() => handleSubmitForReview(lesson.id)}
                                    className="px-6 py-3 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-sm">send</span>
                                    Gửi duyệt
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherLessonManager;
