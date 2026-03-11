import { motion, AnimatePresence } from 'motion/react';
import { StoryboardUpload, StoryboardResult, useStoryboard } from '@/features/storyboard';

const AIStoryboardTab = () => {
    const { isProcessing, result, error, processDrawing, reset, speakStory } = useStoryboard();

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            {/* Header Info */}
            <header className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                    <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3 justify-center md:justify-start">
                        <span className="material-symbols-outlined text-primary text-4xl">auto_fix_high</span>
                        AI Storyboard
                    </h2>
                    <p className="text-slate-500 font-medium max-w-lg italic">"Mọi nét vẽ của bé đều ẩn chứa một câu chuyện kỳ diệu. Hãy để AI giúp bé kể câu chuyện đó!"</p>
                </div>
                <div className="hidden lg:flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full border border-accent/30 text-xs font-bold text-orange-700">
                    <span className="material-symbols-outlined text-sm">verified_user</span>
                    Quyền riêng tư: Tranh sẽ được ẩn danh hoàn toàn
                </div>
            </header>

            {/* Upload Area */}
            {!result && (
                <section>
                    <StoryboardUpload onProcess={processDrawing} isProcessing={isProcessing} />
                    {error && <p className="text-red-500 text-sm font-bold mt-4 text-center">❌ {error}</p>}
                </section>
            )}

            {/* Processing State */}
            <AnimatePresence>
                {isProcessing && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center gap-8"
                    >
                        <div className="relative">
                            <div className="size-32 rounded-full border-8 border-primary/20 border-t-primary animate-spin"></div>
                            <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-primary animate-pulse">auto_fix_high</span>
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-2xl font-black text-slate-900">AI đang "đọc" ý tưởng của bé...</h3>
                            <p className="text-slate-500 font-medium">Bố cục đang dần hiện ra, câu chuyện đang được viết tiếp ✨</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Result Section */}
            {result && (
                <StoryboardResult
                    result={result}
                    onReset={reset}
                    onSpeak={speakStory}
                />
            )}

            {/* Community Inspiration (Static/Placeholder) */}
            <section className="space-y-8 pt-12">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black flex items-center gap-2 text-slate-800">
                        <span className="material-symbols-outlined text-accent text-3xl">lightbulb</span>
                        Cảm hứng sáng tạo
                    </h3>
                    <p className="hidden md:block text-slate-500 font-medium text-sm">Khám phá những câu chuyện thú vị từ các bạn nhỏ khác</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-md cursor-pointer border-4 border-white">
                            <img
                                src={`https://lh3.googleusercontent.com/aida-public/AB6AXuCIC8MrEDXKNTlKl34690D3vM6y27lcMjztohXoBqHmHA58XrqkaihBuAm4yJk2aqfn1t1MyG5iOlC28TIIaBwQ1PncktdE0G2soPtMuBZOsxUc9watSnIpBGnbiDiP8y85bdTJUDIxkGq3jUOh55B8iq805r66LV5QtsrA0vGCE72CQhwwxikYawqVUYV0ABoXeLdctF4vZRWFUyJY5lzOl2nz0cSOggg5kPiMf9wiNrzbaFGZBXy2rZ4v0YOV1W6CW3ckjXz0dHM`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all p-5 flex flex-col justify-end">
                                <p className="text-white text-xs font-black uppercase tracking-wider mb-1">Mùa Hè Sáng Tạo</p>
                                <p className="text-white/70 text-[10px] uppercase font-bold tracking-tighter">Bé Bảo Hân - 4 tuổi</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Warning Footer */}
            <footer className="text-center bg-slate-100/50 p-6 rounded-3xl border border-slate-200/50 space-y-3 mt-12">
                <div className="flex items-center justify-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-xl">verified_user</span>
                    <span className="font-bold text-sm">Bảo mật trí tuệ trẻ thơ</span>
                </div>
                <p className="text-slate-500 text-xs max-w-xl mx-auto leading-relaxed">
                    AI chỉ phân tích nét vẽ kỹ thuật và sáng tạo để tạo cốt truyện tích cực. Tranh của bé được xóa khỏi hệ thống xử lý sau 24h để đảm bảo sự riêng tư tuyệt đối.
                </p>
            </footer>
        </div>
    );
};

export default AIStoryboardTab;
