import React from 'react';
import { motion } from 'motion/react';
import { StoryboardData as StoryboardDataType } from '../types';

interface StoryboardResultProps {
    result: StoryboardDataType;
    onReset: () => void;
    onSpeak: () => void;
}

export const StoryboardResult: React.FC<StoryboardResultProps> = ({ result, onReset, onSpeak }) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black flex items-center gap-2 text-slate-800">
                    <span className="material-symbols-outlined text-secondary text-3xl">magic_button</span>
                    Kết Quả Phép Màu
                </h3>
                <button
                    onClick={onReset}
                    className="text-slate-400 hover:text-red-500 text-sm font-bold flex items-center gap-1"
                >
                    <span className="material-symbols-outlined text-sm">refresh</span> Tạo mới
                </button>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 grid md:grid-cols-2">
                {/* Left: Original Drawing */}
                <div className="p-8 bg-slate-50 flex flex-col items-center justify-center gap-6 border-r border-slate-100">
                    <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-4 py-1 rounded-full">Tranh gốc của bé</span>
                    <div className="relative group w-full max-w-sm aspect-square bg-white rounded-2xl shadow-xl p-4 overflow-hidden">
                        <motion.img
                            animate={{
                                y: [0, -5, 0],
                                rotate: [0, 1, 0, -1, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            src={result.drawingUrl}
                            className="w-full h-full object-contain rounded-xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                        <span className="bg-white px-3 py-1 rounded-full text-[10px] font-bold shadow-sm">✨ Nét vẽ sáng tạo</span>
                        <span className="bg-white px-3 py-1 rounded-full text-[10px] font-bold shadow-sm">🎨 Phối màu nhí</span>
                    </div>
                </div>

                {/* Right: AI Story */}
                <div className="p-10 flex flex-col justify-between gap-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <span className="material-symbols-outlined text-9xl">auto_stories</span>
                    </div>

                    <div className="space-y-6 relative">
                        <div className="flex items-center gap-3">
                            <span className="size-10 rounded-2xl bg-secondary/20 text-secondary flex items-center justify-center">
                                <span className="material-symbols-outlined">history_edu</span>
                            </span>
                            <h4 className="text-2xl font-black text-slate-900 leading-tight">Câu Chuyện Của Bé</h4>
                        </div>

                        <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                            <p className="text-lg leading-relaxed text-slate-700 font-medium italic first-letter:text-4xl first-letter:font-black first-letter:text-primary first-letter:float-left first-letter:mr-3">
                                {result.story}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-8 border-t border-slate-100 mt-auto">
                        <button
                            onClick={onSpeak}
                            className="flex-1 bg-secondary hover:bg-secondary/90 text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-secondary/20"
                        >
                            <span className="material-symbols-outlined text-2xl">volume_up</span>
                            Nghe Kể Chuyện
                        </button>
                        <button className="flex-1 bg-primary hover:bg-primary/90 text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-2xl">download</span>
                            Tải Video & Story
                        </button>
                        <button className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-black py-4 px-5 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95">
                            <span className="material-symbols-outlined">share</span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};
