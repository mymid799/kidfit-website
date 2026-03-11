import React, { useState, useEffect } from 'react';

interface Achievement {
    id: number;
    title: string;
    description?: string;
    type: 'học tập' | 'rèn luyện' | 'sáng tạo' | 'thể chất';
    badge_icon?: string;
    earned_date: string;
    student: { full_name: string; avatar_url: string | null };
}

const MOCK_ACHIEVEMENTS: Achievement[] = [
    {
        id: 1,
        title: 'Ngôi Sao Sáng Tạo',
        description: 'Bé đã hoàn thành xuất sắc bài tập vẽ tranh sáng tạo và được bình chọn là tác phẩm đẹp nhất tuần.',
        type: 'sáng tạo',
        badge_icon: 'palette',
        earned_date: new Date(Date.now() - 86400000 * 3).toISOString(),
        student: { full_name: 'Bé Mầm', avatar_url: null }
    },
    {
        id: 2,
        title: 'Vận Động Viên Nhí',
        description: 'Bé tham gia tích cực các hoạt động thể chất và đạt thành tích nổi bật trong trò chơi vận động.',
        type: 'thể chất',
        badge_icon: 'fitness_center',
        earned_date: new Date(Date.now() - 86400000 * 7).toISOString(),
        student: { full_name: 'Bé Mầm', avatar_url: null }
    },
    {
        id: 3,
        title: 'Học Giỏi Xuất Sắc',
        description: 'Bé hoàn thành tất cả bài tập tuần này đúng hạn và đạt kết quả xuất sắc.',
        type: 'học tập',
        badge_icon: 'school',
        earned_date: new Date(Date.now() - 86400000 * 14).toISOString(),
        student: { full_name: 'Bé Mầm', avatar_url: null }
    },
    {
        id: 4,
        title: 'Bạn Tốt Của Lớp',
        description: 'Bé luôn chia sẻ và giúp đỡ bạn bè, là tấm gương sáng về tinh thần đoàn kết trong lớp.',
        type: 'rèn luyện',
        badge_icon: 'verified',
        earned_date: new Date(Date.now() - 86400000 * 21).toISOString(),
        student: { full_name: 'Bé Mầm', avatar_url: null }
    }
];

const TYPE_STYLES = {
    'học tập': { icon: 'school', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    'rèn luyện': { icon: 'verified', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
    'sáng tạo': { icon: 'palette', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
    'thể chất': { icon: 'fitness_center', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
};

const AchievementsView = () => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAchievements = async () => {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:3001/api/achievements/parent', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
                    }
                });
                const data = await res.json();
                if (res.ok && data.achievements?.length > 0) {
                    setAchievements(data.achievements);
                } else {
                    setAchievements(MOCK_ACHIEVEMENTS);
                }
            } catch {
                setAchievements(MOCK_ACHIEVEMENTS);
            } finally {
                setLoading(false);
            }
        };
        fetchAchievements();
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-20 animate-pulse text-slate-300">
            <span className="material-symbols-outlined text-6xl mb-4">military_tech</span>
            <p className="font-black text-xs uppercase tracking-[0.2em]">Đang tải huy hiệu của bé...</p>
        </div>
    );

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-800">Bộ Sưu Tập Huy Hiệu</h2>
                    <p className="text-slate-400 font-bold mt-1 uppercase text-[10px] tracking-widest">Ghi nhận từng bước tiến nhỏ của con</p>
                </div>
                <div className="flex items-center -space-x-3">
                    {achievements.slice(0, 5).map((a, i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white shadow-md bg-white flex items-center justify-center overflow-hidden">
                            <span className={`material-symbols-outlined text-sm ${TYPE_STYLES[a.type]?.color}`}>{TYPE_STYLES[a.type]?.icon}</span>
                        </div>
                    ))}
                    {achievements.length > 5 && (
                        <div className="w-10 h-10 rounded-full border-2 border-white shadow-md bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">
                            +{achievements.length - 5}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {achievements.map(a => {
                    const style = TYPE_STYLES[a.type] || TYPE_STYLES['học tập'];
                    return (
                        <div key={a.id} className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all flex flex-col group p-8 relative">
                            <div className={`w-20 h-20 ${style.bg} ${style.color} rounded-3xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                <span className="material-symbols-outlined text-4xl">{style.icon}</span>
                            </div>

                            <div className="space-y-4">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${style.bg} ${style.color} ${style.border}`}>
                                    {a.type}
                                </span>
                                <h3 className="text-xl font-black text-slate-800 leading-tight">Huy hiệu "{a.title}"</h3>
                                <p className="text-slate-500 font-medium line-clamp-2 text-sm">
                                    {a.description || 'Ghi nhận đóng góp và nỗ lực tích cực trong suốt quá trình tham gia rèn luyện tại lớp của bé.'}
                                </p>

                                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Đã đạt được</p>
                                        <p className="text-xs font-black text-slate-700">{new Date(a.earned_date).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                    </div>
                                    <button className={`w-10 h-10 ${style.bg} ${style.color} rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all shadow-sm`}>
                                        <span className="material-symbols-outlined text-lg">share</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AchievementsView;
