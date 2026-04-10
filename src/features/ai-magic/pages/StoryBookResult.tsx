import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft, Volume2, Film, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StoryData {
    id: number;
    originalImageUrl: string;
    aiImageUrl: string;
    aiStoryText: string;
    audioUrl: string | null;
    videoUrl: string | null;
    videoStatus: 'none' | 'pending' | 'processing' | 'completed' | 'failed';
    pipelineStep: string;
    title: string;
    storyMeta?: {
        vocabulary: { vi: string; en: string; emoji: string }[];
        moral: string;
        category: string;
    };
}

export default function StoryBookResult() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [story, setStory] = useState<StoryData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [displayedText, setDisplayedText] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [pipelineStep, setPipelineStep] = useState<string>('queued');
    const [stepMessage, setStepMessage] = useState<string>('🔍 Đang chuẩn bị...');
    const pollingInterval = useRef<NodeJS.Timeout | null>(null);

    const apiUrl = import.meta.env.VITE_API_URL || '';

    const fetchStory = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiUrl}/api/magic/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();

            if (data.success) {
                setStory(data.data);
                if (data.data.pipelineStep !== 'done' && data.data.pipelineStep !== 'failed') {
                    startPolling();
                }
            } else {
                setError('Không tìm thấy câu chuyện này!');
            }
        } catch (err) {
            setError('Lỗi kết nối máy chủ!');
        } finally {
            setIsLoading(false);
        }
    };

    const startPolling = () => {
        if (pollingInterval.current) return; // Prevent double polling
        pollingInterval.current = setInterval(async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${apiUrl}/api/magic/${id}/status`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();

                if (data.success) {
                    setPipelineStep(data.pipelineStep);
                    setStepMessage(data.stepMessage);

                    if (data.isDone) {
                        if (pollingInterval.current) clearInterval(pollingInterval.current);
                        pollingInterval.current = null;
                        // Re-fetch the full story now that pipeline is done
                        const storyRes = await fetch(`${apiUrl}/api/magic/${id}`, {
                            headers: { 'Authorization': `Bearer ${token}` }
                        });
                        const storyData = await storyRes.json();
                        if (storyData.success) setStory(storyData.data);
                    }

                    if (data.videoStatus === 'completed' && data.videoUrl) {
                        setStory(prev => prev ? { ...prev, videoUrl: data.videoUrl, videoStatus: 'completed' } : null);
                    }
                }
            } catch (err) {
                console.error("Polling error:", err);
            }
        }, 3000); // Poll mỗi 3 giây
    };

    useEffect(() => {
        fetchStory();
        return () => {
            if (pollingInterval.current) clearInterval(pollingInterval.current);
        };
    }, [id]);

    useEffect(() => {
        if (!story) return;
        
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < story.aiStoryText.length) {
                setDisplayedText(story.aiStoryText.substring(0, i + 1));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 30);

        return () => clearInterval(typingInterval);
    }, [story?.aiStoryText]);

    const handleReadAloud = () => {
        if (!story || !story.audioUrl) return;
        const audio = document.getElementById('magic-audio') as HTMLAudioElement;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play();
            setIsPlaying(true);
        }
    };

    if (isLoading || (story && story.pipelineStep !== 'done' && story.pipelineStep !== 'failed')) {
        const steps = [
            { key: 'vision', label: 'Phân tích tranh', icon: '👁️' },
            { key: 'story',  label: 'Sáng tác truyện', icon: '📖' },
            { key: 'art',    label: 'Vẽ ảnh 3D Pixar', icon: '🎨' },
            { key: 'audio',  label: 'Giọng đọc', icon: '🎙️' },
            { key: 'saving', label: 'Lưu kết quả', icon: '💾' },
        ];
        const stepOrder = ['queued','vision','story','art','audio','saving','done'];
        const currentIndex = stepOrder.indexOf(pipelineStep);

        return (
            <div className="min-h-screen bg-[#0f0a1a] flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <Sparkles className="text-yellow-400 mb-4 animate-pulse mx-auto" size={50} />
                        <h2 className="text-white text-2xl font-bold">Cỗ Máy Ma Thuật đang hoạt động</h2>
                        <p className="text-purple-300 mt-2 text-sm">{stepMessage}</p>
                    </div>

                    {/* Agent Pipeline Steps */}
                    <div className="space-y-3">
                        {steps.map((step, idx) => {
                            const isDone = currentIndex > stepOrder.indexOf(step.key);
                            const isActive = pipelineStep === step.key;
                            return (
                                <motion.div
                                    key={step.key}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-500
                                        ${isDone ? 'bg-green-900/30 border-green-500/40 text-green-300' :
                                          isActive ? 'bg-purple-900/50 border-purple-400/50 text-white' :
                                          'bg-white/5 border-white/10 text-white/30'}`}
                                >
                                    <span className={`text-xl ${isActive ? 'animate-bounce' : ''}`}>
                                        {isDone ? '✅' : step.icon}
                                    </span>
                                    <span className="font-medium text-sm">{step.label}</span>
                                    {isActive && <Loader2 className="ml-auto animate-spin text-purple-400" size={16} />}
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        );
    }

    if (error || !story) {
        return (
            <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center text-white p-6">
                <p className="text-red-400 text-xl mb-6">{error}</p>
                <button onClick={() => navigate('/magic-story')} className="px-6 py-3 bg-purple-600 rounded-full hover:bg-purple-500 font-bold transition">
                    Thử lại
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#120b1e] py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden relative">
            {/* Animated Magic Particles Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                        animate={{
                            y: [0, -1000],
                            x: [Math.random() * 2000, Math.random() * 2000],
                            opacity: [0, 1, 0],
                            scale: [0, Math.random() * 2, 0]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>
            
            <div className="max-w-6xl mx-auto relative z-10">
                <button 
                    onClick={() => navigate('/magic-story')}
                    className="group flex items-center text-purple-300 hover:text-white transition-all mb-8 bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10 w-fit"
                >
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
                    Quay lại Camera
                </button>

                <motion.h1 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-4xl md:text-6xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-orange-500 mb-12 drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                >
                    {story.title}
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    {/* KHUNG MEDIA (Ảnh 3D/Video) */}
                    <div className="relative">
                        <motion.div 
                            layoutId="media-container"
                            className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden border-[12px] border-[#2d1b42] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.7)] bg-[#0f0a1a]"
                        >
                                <AnimatePresence mode="wait">
                                    {story.videoStatus === 'completed' && story.videoUrl ? (
                                        <motion.video
                                            key="video"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            src={`${story.videoUrl.startsWith('http') ? '' : apiUrl}${story.videoUrl}`}
                                            autoPlay
                                            loop
                                            muted
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <motion.div key="image" className="relative w-full h-full bg-black">
                                            {/* Cinematic Fallback Animation */}
                                            <motion.img 
                                                initial={{ scale: 1.2, x: -20 }}
                                                animate={{ 
                                                    scale: [1.2, 1.3, 1.2],
                                                    x: [-20, 20, -20],
                                                    y: [-10, 10, -10]
                                                }}
                                                transition={{
                                                    duration: 20,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                                src={`${apiUrl}${story.aiImageUrl}`} 
                                                alt="AI 3D Movie Still" 
                                                className="w-full h-full object-cover" 
                                            />
                                            {/* Overlay Loading Video */}
                                            {story.videoStatus !== 'completed' && (
                                                <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex flex-col items-center justify-center p-6 text-center">
                                                    <div className="bg-purple-900/40 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
                                                        <Loader2 className="text-amber-400 animate-spin mb-3 mx-auto" size={40} />
                                                        <h3 className="text-amber-100 font-bold text-lg mb-1 italic">Đang biến hình thành phim...</h3>
                                                        <p className="text-purple-200 text-sm">Hệ thống đang xếp hàng tạo thước phim 3D của bé</p>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            {/* Badge */}
                            <div className="absolute top-6 right-6 z-20">
                                <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 text-xs uppercase tracking-tighter">
                                    {story.videoStatus === 'completed' ? <Film size={14} /> : <Sparkles size={14} />}
                                    {story.videoStatus === 'completed' ? 'Phim 3D Cổ Tích' : 'Đang Tạo Video...'}
                                </div>
                            </div>
                        </motion.div>

                        {/* Hình Gốc (Thumbnail nổi) */}
                        <motion.div 
                            initial={{ x: -20, rotate: -15, opacity: 0 }}
                            animate={{ x: 0, rotate: -10, opacity: 1 }}
                            whileHover={{ rotate: 0, scale: 1.1 }}
                            className="absolute -bottom-6 -left-6 w-32 h-32 md:w-44 md:h-44 rounded-3xl overflow-hidden border-4 border-white shadow-2xl z-30 transition-shadow hover:shadow-yellow-400/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                                <span className="text-white text-[10px] font-bold uppercase tracking-widest">Tranh của bé</span>
                            </div>
                            <img src={`${apiUrl}${story.originalImageUrl}`} alt="Bé vẽ" className="w-full h-full object-cover" />
                        </motion.div>
                    </div>

                    {/* KHUNG TRUYỆN */}
                    <div className="relative">
                        <motion.div 
                            initial={{ x: 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-[#2a1a3a]/80 backdrop-blur-xl border border-purple-500/20 rounded-[2.5rem] p-10 md:p-12 shadow-2xl min-h-[400px] flex flex-col"
                        >
                            {story.audioUrl && (
                                <audio 
                                    id="magic-audio" 
                                    src={`${story.audioUrl.startsWith('http') ? '' : apiUrl}${story.audioUrl}`} 
                                    onEnded={() => setIsPlaying(false)}
                                    className="hidden"
                                />
                            )}
                            
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400/50"></div>
                                </div>
                                <button 
                                    onClick={handleReadAloud}
                                    className={`p-5 rounded-3xl shadow-2xl text-white transition-all duration-500 border-2 ${isPlaying ? 'bg-pink-500 border-white scale-110' : 'bg-purple-600 border-purple-400/50 hover:bg-purple-500 hover:scale-105'}`}
                                >
                                    <Volume2 size={32} className={isPlaying ? 'animate-pulse' : ''} />
                                </button>
                            </div>

                            <div className="flex-grow">
                                <p className="text-2xl md:text-3xl leading-relaxed font-medium text-purple-50/90 whitespace-pre-wrap italic">
                                    {displayedText}
                                    <motion.span 
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.8 }}
                                        className="inline-block w-3 h-8 bg-amber-400 ml-2 align-middle"
                                    />
                                </p>
                            </div>

                            <div className="mt-12 pt-8 border-t border-purple-500/20">
                                <div className="flex items-center gap-3 text-amber-400/80 uppercase text-xs font-black tracking-widest">
                                    <Sparkles size={16} />
                                    Bản quyền phép thuật bởi KidFit AI
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
