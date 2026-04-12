import React, { useState } from 'react';
import type { ReadingData } from '../types';
import { getAssetUrl } from '@/config/api';

interface ReadingResultProps {
    result: ReadingData;
    onReset: () => void;
    isSpeaking: boolean;
    onSpeak: (text: string, lang: 'vi' | 'en') => void;
    onStopSpeaking: () => void;
}

const ReadingResult: React.FC<ReadingResultProps> = ({ result, onReset, isSpeaking, onSpeak, onStopSpeaking }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'vocabulary' | 'quiz'>('overview');
    const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [narratorLang, setNarratorLang] = useState<'vi' | 'en'>('vi');

    const tabs = [
        { id: 'overview' as const, icon: 'auto_stories', label: 'Tổng Quan' },
        { id: 'vocabulary' as const, icon: 'translate', label: 'Từ Vựng' },
        { id: 'quiz' as const, icon: 'quiz', label: 'Câu Đố' },
    ];

    const levelColors: Record<string, string> = {
        'truyện cổ tích': 'bg-purple-100 text-purple-700',
        'sách khoa học': 'bg-blue-100 text-blue-700',
        'sách giáo khoa': 'bg-amber-100 text-amber-700',
        'thơ': 'bg-pink-100 text-pink-700',
        'truyện tranh': 'bg-orange-100 text-orange-700',
        'other': 'bg-slate-100 text-slate-700',
    };

    const handleQuizAnswer = (qIdx: number, aIdx: number) => {
        if (quizSubmitted) return;
        setQuizAnswers(prev => ({ ...prev, [qIdx]: aIdx }));
    };

    const quizScore = quizSubmitted
        ? result.quiz.filter((q, i) => quizAnswers[i] === q.correct).length
        : 0;

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Header with image + meta */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-0">
                    {/* Book image */}
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 flex items-center justify-center">
                        <img
                            src={getAssetUrl(result.imageUrl)}
                            alt="Trang sách"
                            className="max-h-[280px] w-auto rounded-xl shadow-lg border-4 border-white object-contain"
                        />
                    </div>

                    {/* Meta info */}
                    <div className="p-6 md:p-8 flex flex-col gap-5">
                        <div className="flex flex-wrap gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${levelColors[result.bookType] || levelColors['other']}`}>
                                {result.bookType}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-700 uppercase tracking-wider">
                                📚 {result.readingLevel}
                            </span>
                        </div>

                        <div>
                            <h2 className="text-xl font-black text-slate-900 mb-2">📖 Tóm tắt nội dung</h2>
                            <p className="text-slate-600 leading-relaxed">{result.summary}</p>
                        </div>

                        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                            <p className="text-sm font-bold text-amber-800 flex items-start gap-2">
                                <span className="text-lg">💡</span>
                                <span><strong>Fun Fact:</strong> {result.funFact}</span>
                            </p>
                        </div>

                        {/* TTS Controls */}
                        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
                            <span className="text-sm font-bold text-slate-500">🔊 AI đọc to:</span>
                            <div className="flex bg-slate-100 rounded-full p-0.5">
                                <button
                                    onClick={() => setNarratorLang('vi')}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${narratorLang === 'vi' ? 'bg-white shadow text-emerald-700' : 'text-slate-500'}`}
                                >
                                    🇻🇳 Tiếng Việt
                                </button>
                                <button
                                    onClick={() => setNarratorLang('en')}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${narratorLang === 'en' ? 'bg-white shadow text-blue-700' : 'text-slate-500'}`}
                                >
                                    🇬🇧 English
                                </button>
                            </div>
                            {isSpeaking ? (
                                <button
                                    onClick={onStopSpeaking}
                                    className="px-4 py-2 rounded-full bg-red-100 text-red-700 text-xs font-bold hover:bg-red-200 transition-all flex items-center gap-1.5"
                                >
                                    <span className="material-symbols-outlined text-sm">stop</span>
                                    Dừng
                                </button>
                            ) : (
                                <button
                                    onClick={() => onSpeak(
                                        narratorLang === 'vi' ? result.narration : result.narration_en,
                                        narratorLang
                                    )}
                                    className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold hover:bg-emerald-200 transition-all flex items-center gap-1.5"
                                >
                                    <span className="material-symbols-outlined text-sm">play_arrow</span>
                                    Đọc truyện
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab navigation */}
            <div className="flex justify-center gap-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all ${activeTab === tab.id
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                            : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                            }`}
                    >
                        <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 md:p-8">
                {/* ── OVERVIEW ── */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {result.extractedText && (
                            <div>
                                <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-emerald-600">description</span>
                                    Nội dung nhận diện
                                </h3>
                                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-[15px]">
                                        {result.extractedText}
                                    </p>
                                </div>
                            </div>
                        )}

                        {result.illustrations && (
                            <div>
                                <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-600">image</span>
                                    Hình minh họa
                                </h3>
                                <p className="text-slate-600 leading-relaxed">{result.illustrations}</p>
                            </div>
                        )}

                        <div>
                            <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-purple-600">record_voice_over</span>
                                Bài kể chuyện
                            </h3>
                            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-100">
                                <p className="text-slate-700 leading-relaxed italic text-[15px]">
                                    "{result.narration}"
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── VOCABULARY ── */}
                {activeTab === 'vocabulary' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                            <span className="material-symbols-outlined text-amber-600">translate</span>
                            Từ vựng mới ({result.vocabulary.length} từ)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {result.vocabulary.map((v, i) => (
                                <div
                                    key={i}
                                    className="group bg-gradient-to-br from-white to-slate-50 rounded-2xl p-5 border border-slate-100 hover:shadow-lg hover:border-emerald-200 transition-all cursor-pointer"
                                    onClick={() => onSpeak(v.word, 'vi')}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xl font-black text-emerald-700">{v.word}</span>
                                                <span className="material-symbols-outlined text-slate-300 text-sm group-hover:text-emerald-500 transition-colors">volume_up</span>
                                            </div>
                                            <p className="text-sm text-slate-600 mb-2">{v.meaning}</p>
                                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">
                                                🇬🇧 {v.english}
                                            </span>
                                        </div>
                                        <div className="size-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-black text-sm shrink-0">
                                            {i + 1}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── QUIZ ── */}
                {activeTab === 'quiz' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                                <span className="material-symbols-outlined text-orange-600">quiz</span>
                                Câu đố ({result.quiz.length} câu)
                            </h3>
                            {quizSubmitted && (
                                <div className={`px-4 py-2 rounded-full font-black text-sm ${quizScore === result.quiz.length
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : quizScore >= result.quiz.length / 2
                                        ? 'bg-amber-100 text-amber-700'
                                        : 'bg-red-100 text-red-700'
                                    }`}>
                                    🏆 {quizScore}/{result.quiz.length} đúng!
                                </div>
                            )}
                        </div>

                        {result.quiz.map((q, qIdx) => (
                            <div key={qIdx} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className={`shrink-0 size-8 rounded-full flex items-center justify-center font-black text-white text-sm ${q.level === 'ghi nhớ' ? 'bg-emerald-500'
                                        : q.level === 'hiểu' ? 'bg-blue-500'
                                            : 'bg-purple-500'
                                        }`}>
                                        {qIdx + 1}
                                    </span>
                                    <div>
                                        <p className="text-slate-900 font-bold">{q.question}</p>
                                        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${q.level === 'ghi nhớ' ? 'bg-emerald-100 text-emerald-700'
                                            : q.level === 'hiểu' ? 'bg-blue-100 text-blue-700'
                                                : 'bg-purple-100 text-purple-700'
                                            }`}>
                                            {q.level}
                                        </span>
                                    </div>
                                </div>
                                <div className="grid gap-2 pl-11">
                                    {q.options.map((opt, aIdx) => {
                                        const isSelected = quizAnswers[qIdx] === aIdx;
                                        const isCorrect = q.correct === aIdx;
                                        let optClass = 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer';

                                        if (quizSubmitted) {
                                            if (isCorrect) optClass = 'bg-emerald-100 border-emerald-400 text-emerald-800';
                                            else if (isSelected && !isCorrect) optClass = 'bg-red-100 border-red-400 text-red-800';
                                            else optClass = 'bg-white border-slate-200 opacity-60';
                                        } else if (isSelected) {
                                            optClass = 'bg-emerald-100 border-emerald-400 text-emerald-800';
                                        }

                                        return (
                                            <button
                                                key={aIdx}
                                                onClick={() => handleQuizAnswer(qIdx, aIdx)}
                                                disabled={quizSubmitted}
                                                className={`w-full text-left p-3 rounded-xl border-2 font-medium text-sm flex items-center gap-3 transition-all ${optClass}`}
                                            >
                                                <span className="size-7 rounded-full border-2 border-current flex items-center justify-center text-xs font-black shrink-0">
                                                    {String.fromCharCode(65 + aIdx)}
                                                </span>
                                                {opt}
                                                {quizSubmitted && isCorrect && (
                                                    <span className="ml-auto material-symbols-outlined text-emerald-600">check_circle</span>
                                                )}
                                                {quizSubmitted && isSelected && !isCorrect && (
                                                    <span className="ml-auto material-symbols-outlined text-red-600">cancel</span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        {!quizSubmitted && Object.keys(quizAnswers).length === result.quiz.length && (
                            <div className="flex justify-center">
                                <button
                                    onClick={() => setQuizSubmitted(true)}
                                    className="px-10 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black shadow-lg shadow-orange-500/25 hover:scale-105 transition-all text-base"
                                >
                                    ✅ Nộp bài!
                                </button>
                            </div>
                        )}

                        {quizSubmitted && (
                            <div className="text-center space-y-3 py-4">
                                <div className="text-5xl">
                                    {quizScore === result.quiz.length ? '🎉' : quizScore >= 2 ? '👏' : '💪'}
                                </div>
                                <p className="text-lg font-black text-slate-900">
                                    {quizScore === result.quiz.length
                                        ? 'Xuất sắc! Con trả lời đúng hết!'
                                        : quizScore >= 2
                                            ? 'Giỏi lắm! Con gần đúng hết rồi!'
                                            : 'Cố lên con nhé! Đọc lại trang sách nào!'}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Action footer */}
            <div className="flex justify-center gap-4 pt-4">
                <button
                    onClick={onReset}
                    className="px-8 py-3 rounded-full bg-white border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                    <span className="material-symbols-outlined">photo_camera</span>
                    Đọc trang khác
                </button>
            </div>
        </div>
    );
};

export default ReadingResult;
