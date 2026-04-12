import React, { useRef, useState, useCallback, useEffect } from 'react';

interface StoryboardUploadProps {
    onProcess: (file: File) => void;
    isProcessing: boolean;
}

// ─── Camera Capture Mini-Component ───────────────────────────────────────────

function CameraCapture({ onCapture, onClose }: { onCapture: (file: File) => void; onClose: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [isReady, setIsReady] = useState(false);

    const startCamera = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
                audio: false,
            });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
                setIsReady(true);
            }
        } catch {
            alert('Không thể mở camera. Vui lòng cấp quyền truy cập!');
            onClose();
        }
    }, [onClose]);

    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(t => t.stop());
            streamRef.current = null;
        }
    }, []);

    const takePhoto = useCallback(() => {
        const video = videoRef.current;
        if (!video || video.readyState < 2) return;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(video, 0, 0);
        canvas.toBlob((blob) => {
            if (blob) {
                const file = new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
                stopCamera();
                onCapture(file);
            }
        }, 'image/jpeg', 0.85);
    }, [stopCamera, onCapture]);

    useEffect(() => {
        startCamera();
        return () => stopCamera();
    }, [startCamera, stopCamera]);

    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
            <video
                ref={videoRef}
                playsInline
                muted
                className="flex-1 w-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 p-6 flex items-center justify-center gap-6 bg-gradient-to-t from-black/80 to-transparent">
                <button
                    onClick={() => { stopCamera(); onClose(); }}
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-all"
                >
                    <span className="material-symbols-outlined text-2xl">close</span>
                </button>
                {isReady && (
                    <button
                        onClick={takePhoto}
                        className="w-20 h-20 rounded-full bg-white border-4 border-white/50 shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                    >
                        <span className="material-symbols-outlined text-4xl text-slate-800">photo_camera</span>
                    </button>
                )}
            </div>
        </div>
    );
}

// ─── Main Upload Component ───────────────────────────────────────────────────

export const StoryboardUpload: React.FC<StoryboardUploadProps> = ({ onProcess, isProcessing }) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [showCamera, setShowCamera] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleCameraCapture = useCallback((capturedFile: File) => {
        setFile(capturedFile);
        setPreview(URL.createObjectURL(capturedFile));
        setShowCamera(false);
    }, []);

    return (
        <>
            {showCamera && (
                <CameraCapture
                    onCapture={handleCameraCapture}
                    onClose={() => setShowCamera(false)}
                />
            )}

            <div
                onClick={() => !file && fileInputRef.current?.click()}
                className={`bg-white rounded-3xl p-10 shadow-xl border-4 border-dashed transition-all cursor-pointer relative overflow-hidden flex flex-col items-center justify-center text-center gap-6 group ${file ? 'border-primary' : 'border-primary/20 hover:border-primary/50'}`}
            >
                {preview ? (
                    <img src={preview} alt="Preview" className="h-64 w-auto rounded-2xl shadow-lg border-4 border-white object-contain" />
                ) : (
                    <>
                        <div className="flex gap-4">
                            <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-5xl">upload_file</span>
                            </div>
                            <div className="size-20 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform delay-75">
                                <span className="material-symbols-outlined text-5xl">photo_camera</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xl font-bold text-slate-800">Tải vẽ tay của bé lên đây</p>
                            <p className="text-slate-500 text-sm">Nhấn để chọn ảnh, chụp trực tiếp, hoặc kéo thả (JPG, PNG)</p>
                        </div>
                    </>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                />

                <div className="flex flex-wrap gap-4 justify-center">
                    <button
                        onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                        className="bg-primary hover:bg-primary/90 text-white font-black py-4 px-8 rounded-full shadow-lg shadow-primary/30 flex items-center gap-2 transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined">photo_library</span>
                        {file ? 'Chọn ảnh khác' : 'Chọn Từ Thư Viện'}
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setShowCamera(true); }}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-black py-4 px-8 rounded-full shadow-lg shadow-indigo-200 flex items-center gap-2 transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined">photo_camera</span>
                        Chụp ảnh
                    </button>
                    {file && !isProcessing && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onProcess(file); }}
                            className="bg-secondary hover:bg-secondary/90 text-white font-black py-4 px-12 rounded-full shadow-lg shadow-secondary/30 flex items-center gap-2 transition-all active:scale-95 animate-pulse"
                        >
                            <span className="material-symbols-outlined">magic_button</span>
                            Úm Ba La: Tạo Story!
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};
