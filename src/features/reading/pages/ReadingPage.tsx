import { Link } from 'react-router-dom';
import BookScanner from '../components/BookScanner';
import ReadingResult from '../components/ReadingResult';
import { useReading } from '../hooks/useReading';

export default function ReadingPage() {
    const { isProcessing, result, error, processBookPage, reset, isSpeaking, speak, stopSpeaking } = useReading();

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 font-display">
            {/* Navigation */}
            <header className="flex items-center justify-between px-6 md:px-12 py-4 bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
                <Link to="/" className="flex items-center gap-3">
                    <img src="/assets/logo/mainlogo.png" alt="KidFit" className="h-9 w-auto" />
                    <div>
                        <h1 className="text-lg font-black text-slate-900 leading-none">BéĐọc AI</h1>
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Interactive Reading</p>
                    </div>
                </Link>
                <Link
                    to="/"
                    className="px-5 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition-all flex items-center gap-2"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Trang chủ
                </Link>
            </header>

            <main className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-10">
                {/* Hero */}
                {!result && (
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">
                            <span className="material-symbols-outlined text-base">auto_awesome</span>
                            AI Vision • Miễn phí
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                            Biến <span className="text-emerald-600">mọi cuốn sách</span> thành<br />
                            bài học tương tác AI
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            Chụp ảnh bất kỳ trang sách nào → AI đọc, phân tích, tạo bài học, quiz và dạy từ vựng song ngữ Việt-Anh cho bé. Hoàn toàn miễn phí!
                        </p>

                        {/* Feature highlights */}
                        <div className="flex flex-wrap justify-center gap-3 pt-4">
                            {[
                                { icon: 'text_fields', label: 'OCR tiếng Việt' },
                                { icon: 'record_voice_over', label: 'AI đọc to' },
                                { icon: 'translate', label: 'Song ngữ Việt-Anh' },
                                { icon: 'quiz', label: 'Quiz 3 cấp độ' },
                            ].map((f, i) => (
                                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-600 shadow-sm">
                                    <span className="material-symbols-outlined text-sm text-emerald-600">{f.icon}</span>
                                    {f.label}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Scanner or Result */}
                {!result ? (
                    <BookScanner onScan={processBookPage} isProcessing={isProcessing} />
                ) : (
                    <ReadingResult
                        result={result}
                        onReset={reset}
                        isSpeaking={isSpeaking}
                        onSpeak={speak}
                        onStopSpeaking={stopSpeaking}
                    />
                )}

                {/* Error */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                        <p className="text-red-600 font-bold text-sm">❌ {error}</p>
                        <button onClick={reset} className="mt-2 px-4 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-bold hover:bg-red-200 transition-all">
                            Thử lại
                        </button>
                    </div>
                )}

                {/* How it works */}
                {!result && (
                    <section className="pt-8">
                        <h3 className="text-center text-2xl font-black text-slate-900 mb-8">Cách hoạt động</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { step: '1', icon: 'photo_camera', title: 'Chụp trang sách', desc: 'Chụp hoặc chọn ảnh bất kỳ trang sách, truyện, thơ...', color: 'emerald' },
                                { step: '2', icon: 'smart_toy', title: 'AI phân tích', desc: 'Gemini Vision nhận diện chữ Việt, hình ảnh, nội dung', color: 'blue' },
                                { step: '3', icon: 'record_voice_over', title: 'AI đọc to', desc: 'Giọng đọc sinh động bằng cả tiếng Việt và tiếng Anh', color: 'purple' },
                                { step: '4', icon: 'quiz', title: 'Quiz tương tác', desc: 'Câu hỏi 3 cấp độ Bloom: ghi nhớ → hiểu → phân tích', color: 'orange' },
                            ].map((s) => (
                                <div key={s.step} className="relative text-center p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
                                    <div className={`size-14 mx-auto rounded-2xl bg-${s.color}-100 flex items-center justify-center text-${s.color}-600 mb-4 group-hover:scale-110 transition-transform`}>
                                        <span className="material-symbols-outlined text-3xl">{s.icon}</span>
                                    </div>
                                    <div className="absolute -top-3 -right-3 size-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-black">
                                        {s.step}
                                    </div>
                                    <h4 className="font-bold text-slate-900 mb-1">{s.title}</h4>
                                    <p className="text-sm text-slate-500">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            {/* Footer */}
            <footer className="text-center py-8 border-t border-slate-100">
                <p className="text-slate-400 text-xs">
                    BéĐọc AI — Tính năng của KidFit Creative Ecosystem © 2026
                </p>
            </footer>
        </div>
    );
}
