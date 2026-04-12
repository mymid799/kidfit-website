import React, { useRef, useState } from 'react';

interface BookScannerProps {
    onScan: (file: File) => void;
    isProcessing: boolean;
}

const BookScanner: React.FC<BookScannerProps> = ({ onScan, isProcessing }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (selectedFile: File) => {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) handleFile(f);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const f = e.dataTransfer.files?.[0];
        if (f && f.type.startsWith('image/')) handleFile(f);
    };

    return (
        <div className="space-y-6">
            {/* Upload area */}
            <div
                onDragOver={e => e.preventDefault()}
                onDrop={handleDrop}
                className={`relative rounded-3xl border-4 border-dashed transition-all overflow-hidden ${preview
                    ? 'border-emerald-400 bg-emerald-50/30'
                    : 'border-slate-200 hover:border-emerald-400/50 bg-white'
                    }`}
            >
                {preview ? (
                    <div className="p-6 flex flex-col items-center gap-6">
                        <div className="relative group">
                            <img
                                src={preview}
                                alt="Preview trang sách"
                                className="max-h-[360px] w-auto rounded-2xl shadow-xl border-4 border-white object-contain"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-2xl transition-all" />
                        </div>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="px-5 py-2.5 rounded-full bg-white border-2 border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-lg">swap_horiz</span>
                                Chọn ảnh khác
                            </button>
                            {!isProcessing && (
                                <button
                                    onClick={() => file && onScan(file)}
                                    className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 text-base"
                                >
                                    <span className="material-symbols-outlined">auto_stories</span>
                                    📖 Đọc Sách Thôi!
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="p-10 md:p-16 flex flex-col items-center gap-8 text-center">
                        <div className="flex gap-5">
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="group cursor-pointer flex flex-col items-center gap-3 p-6 rounded-2xl hover:bg-emerald-50 transition-all"
                            >
                                <div className="size-20 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform shadow-sm">
                                    <span className="material-symbols-outlined text-4xl">photo_library</span>
                                </div>
                                <span className="text-sm font-bold text-slate-700">Chọn từ thư viện</span>
                            </div>
                            <div
                                onClick={() => cameraInputRef.current?.click()}
                                className="group cursor-pointer flex flex-col items-center gap-3 p-6 rounded-2xl hover:bg-blue-50 transition-all"
                            >
                                <div className="size-20 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform shadow-sm">
                                    <span className="material-symbols-outlined text-4xl">photo_camera</span>
                                </div>
                                <span className="text-sm font-bold text-slate-700">Chụp trang sách</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xl font-black text-slate-800">Chụp hoặc chọn ảnh trang sách bất kỳ</p>
                            <p className="text-slate-400 text-sm">Hỗ trợ JPG, PNG, WebP — Sách truyện, sách giáo khoa, thơ, truyện tranh...</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Hidden inputs */}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileChange} className="hidden" />

            {/* Processing overlay */}
            {isProcessing && (
                <div className="fixed inset-0 z-[100] bg-gradient-to-br from-emerald-900/95 to-teal-900/95 backdrop-blur-md flex flex-col items-center justify-center gap-8">
                    {/* Animated book icon */}
                    <div className="relative">
                        <div className="size-32 rounded-full border-[6px] border-emerald-400/20 border-t-emerald-400 animate-spin" />
                        <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-emerald-300 animate-pulse">
                            auto_stories
                        </span>
                    </div>
                    <div className="text-center space-y-3 max-w-md">
                        <h3 className="text-2xl font-black text-white">AI đang đọc trang sách...</h3>
                        <p className="text-emerald-200 font-medium">Đang nhận diện chữ, phân tích nội dung và tạo bài học tương tác ✨</p>
                        <div className="flex justify-center gap-1.5 pt-4">
                            {[0, 1, 2, 3, 4].map(i => (
                                <div
                                    key={i}
                                    className="w-3 h-3 rounded-full bg-emerald-400"
                                    style={{
                                        animation: 'pulse 1.4s ease-in-out infinite',
                                        animationDelay: `${i * 0.15}s`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookScanner;
