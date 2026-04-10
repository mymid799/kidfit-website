import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft, Volume2 } from 'lucide-react';

interface StoryData {
    id: number;
    original_image_url: string;
    ai_image_url: string;
    ai_story_text: string;
    audio_url: string | null;
    title: string;
}

export default function StoryBookResult() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [story, setStory] = useState<StoryData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [displayedText, setDisplayedText] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4002'}/api/magic/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();

                if (data.success) {
                    setStory(data.data);
                } else {
                    setError('Không tìm thấy câu chuyện này!');
                }
            } catch (err) {
                setError('Lỗi kết nối máy chủ!');
            } finally {
                setIsLoading(false);
            }
        };

        fetchStory();
    }, [id]);

    useEffect(() => {
        if (!story) return;
        
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < story.ai_story_text.length) {
                setDisplayedText(prev => prev + story.ai_story_text.charAt(i));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 30); // Tốc độ gõ chữ

        return () => clearInterval(typingInterval);
    }, [story]);

    const handleReadAloud = () => {
        if (!story || !story.audio_url) return;

        const audio = document.getElementById('magic-audio') as HTMLAudioElement;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play();
            setIsPlaying(true);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <Sparkles className="text-yellow-400 mb-4 animate-spin-slow" size={48} />
                    <p className="text-white text-xl font-medium">Đang mở sách thần kỳ...</p>
                </div>
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

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4002';

    return (
        <div className="min-h-screen bg-[#1a1225] py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden relative">
            {/* Nền cổ tích */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
            
            <div className="max-w-6xl mx-auto relative z-10">
                <button 
                    onClick={() => navigate('/magic-story')}
                    className="flex items-center text-purple-300 hover:text-white transition-colors mb-8 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm w-fit"
                >
                    <ArrowLeft size={20} className="mr-2" /> Trở về Camera
                </button>

                <h1 className="text-4xl md:text-5xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-orange-500 mb-12 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                    {story.title || "Câu Chuyện Diệu Kỳ"}
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* KHUNG ẢNH */}
                    <div className="relative group perspective-1000">
                        {/* Hình Gốc (Trang trí nhỏ xíu đè lên góc) */}
                        <div className="absolute -top-6 -left-6 w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden border-4 border-white shadow-2xl z-20 rotate-[-10deg] group-hover:rotate-0 transition-transform duration-500 pointer-events-none">
                            <div className="absolute bg-blue-500 text-white text-xs px-2 py-1 rotate-[-15deg] -top-1 -left-1 font-bold rounded-br-lg z-30">Bé vẽ</div>
                            <img src={`${apiUrl}${story.original_image_url}`} alt="Bé vẽ" className="w-full h-full object-cover" />
                        </div>
                        
                        {/* Hình AI 3D (Hình lớn) */}
                        <div className="relative w-full aspect-square rounded-3xl overflow-hidden border-8 border-[#3b2354] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-style-3d transition-transform duration-500">
                            <div className="absolute top-4 right-4 bg-yellow-500 text-purple-900 font-bold px-3 py-1 rounded-full shadow-lg z-10 flex items-center gap-1 text-sm">
                                <Sparkles size={14}/> AI Xoay Vần
                            </div>
                            <img src={`${apiUrl}${story.ai_image_url}`} alt="AI 3D Model" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
                        </div>
                    </div>

                    {/* KHUNG TRUYỆN */}
                    <div className="bg-[#2a1a3a]/80 backdrop-blur-md border border-purple-500/30 rounded-3xl p-8 md:p-10 shadow-2xl relative">
                        {story.audio_url && (
                            <audio 
                                id="magic-audio" 
                                src={`${apiUrl}${story.audio_url}`} 
                                onEnded={() => setIsPlaying(false)}
                                className="hidden"
                            />
                        )}
                        <button 
                            onClick={handleReadAloud}
                            className={`absolute -top-6 right-8 p-4 rounded-full shadow-xl text-white transition-all duration-300 border-2 ${isPlaying ? 'bg-pink-500 border-white animate-pulse' : 'bg-purple-600 border-purple-400 hover:bg-purple-500 hover:scale-110'}`}
                            title="Đọc truyện"
                        >
                            <Volume2 size={28} />
                        </button>

                        <div className="prose prose-invert prose-lg max-w-none">
                            <p className="text-xl md:text-2xl leading-relaxed font-serif text-purple-50 whitespace-pre-wrap">
                                {displayedText}
                                <span className="inline-block w-2 bg-yellow-400 animate-ping ml-1">_</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
