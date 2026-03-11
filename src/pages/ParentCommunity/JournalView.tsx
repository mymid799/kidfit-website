import React, { useState, useEffect } from 'react';

interface JournalEntry {
    id: number;
    date: string;
    content: string;
    images?: string[];
    mood?: 'vui' | 'bình thường' | 'buồn' | 'hào hứng';
    teacher: { username: string };
    student: { full_name: string; avatar_url: string | null };
    created_at: string;
}

const MOCK_ENTRIES: JournalEntry[] = [
    {
        id: 1,
        date: new Date().toISOString(),
        content: 'Hôm nay bé rất vui khi tham gia hoạt động vẽ tranh STEAM. Bé đã tự tô màu được bức tranh "Gia đình yêu thương" một cách sáng tạo và cẩn thận. Cô giáo rất khen ngợi sự cố gắng của bé!',
        images: ['https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800'],
        mood: 'vui',
        teacher: { username: 'Cô Minh Anh' },
        student: { full_name: 'Bé Mầm', avatar_url: null },
        created_at: new Date().toISOString()
    },
    {
        id: 2,
        date: new Date(Date.now() - 86400000).toISOString(),
        content: 'Bé hoàn thành xuất sắc bài tập nhận biết hình khối 3D. Trong giờ học STEAM, bé đã ghép thành công mô hình ngôi nhà từ các khối hình học một cách hoàn toàn độc lập, không cần hỗ trợ của cô.',
        images: [],
        mood: 'hào hứng',
        teacher: { username: 'Cô Lan' },
        student: { full_name: 'Bé Mầm', avatar_url: null },
        created_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
        id: 3,
        date: new Date(Date.now() - 172800000).toISOString(),
        content: 'Bé tham gia tốt các hoạt động thể chất buổi sáng, chạy nhảy vui vẻ cùng các bạn và chia sẻ đồ chơi rất ngoan. Thầy cô rất tự hào về sự tiến bộ trong kỹ năng xã hội của bé.',
        images: ['https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=80&w=800'],
        mood: 'bình thường',
        teacher: { username: 'Cô Minh Anh' },
        student: { full_name: 'Bé Mầm', avatar_url: null },
        created_at: new Date(Date.now() - 172800000).toISOString()
    }
];

const JournalView = () => {
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEntries = async () => {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:3001/api/parent/journals', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
                    }
                });
                const data = await res.json();
                if (res.ok && data.journals?.length > 0) {
                    setEntries(data.journals);
                } else {
                    setEntries(MOCK_ENTRIES);
                }
            } catch {
                setEntries(MOCK_ENTRIES);
            } finally {
                setLoading(false);
            }
        };
        fetchEntries();
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-20 animate-pulse text-slate-300">
            <span className="material-symbols-outlined text-6xl mb-4">analytics</span>
            <p className="font-black text-xs uppercase tracking-[0.2em]">Đang tải nhật ký của bé...</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-800">Sổ Nhật Ký Hôm Nay</h2>
                    <p className="text-slate-400 font-bold mt-1 uppercase text-[10px] tracking-widest">Những khoảnh khắc đáng yêu của bé tại lớp</p>
                </div>
                <div className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <span className="material-symbols-outlined text-green-500">calendar_today</span>
                    <span className="text-sm font-black text-slate-600">{new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {entries.map(entry => (
                    <div key={entry.id} className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all group">
                        {/* Mood Header */}
                        <div className="px-8 py-6 flex items-center justify-between bg-slate-50/50 border-b border-slate-50">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-2xl">
                                    {entry.mood === 'vui' ? '😊' : entry.mood === 'bình thường' ? '😐' : entry.mood === 'buồn' ? '😢' : '🤩'}
                                </div>
                                <div>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Tâm trạng</p>
                                    <p className="text-sm font-black text-slate-700 capitalize">Bé đang {entry.mood || 'bình thường'}</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-black text-slate-300 uppercase bg-white px-3 py-1.5 rounded-full border border-slate-100">#{entry.id}</span>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-6">
                            <p className="text-slate-600 font-medium leading-relaxed italic line-clamp-4">"{entry.content}"</p>

                            {entry.images && entry.images.length > 0 && (
                                <div className="grid grid-cols-2 gap-3">
                                    {entry.images.slice(0, 2).map((img, i) => (
                                        <div key={i} className="aspect-square bg-slate-100 rounded-3xl overflow-hidden shadow-inner cursor-zoom-in">
                                            <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt={`activity-${i}`} />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-green-500 text-sm">person</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Giáo viên</p>
                                        <p className="text-xs font-black text-slate-700">{entry.teacher.username}</p>
                                    </div>
                                </div>
                                <button className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-90">
                                    <span className="material-symbols-outlined text-lg">favorite</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JournalView;
