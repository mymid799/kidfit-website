import React, { useRef, useState } from 'react';

interface StoryboardUploadProps {
    onProcess: (file: File) => void;
    isProcessing: boolean;
}

export const StoryboardUpload: React.FC<StoryboardUploadProps> = ({ onProcess, isProcessing }) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    return (
        <div
            onClick={() => fileInputRef.current?.click()}
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
                            <span className="material-symbols-outlined text-5xl">photo_library</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-xl font-bold text-slate-800">Tải vẽ tay của bé lên đây</p>
                        <p className="text-slate-500 text-sm">Nhấn để chọn ảnh hoặc kéo thả trực tiếp (JPG, PNG)</p>
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

            <div className="flex gap-4">
                <button className="bg-primary hover:bg-primary/90 text-white font-black py-4 px-10 rounded-full shadow-lg shadow-primary/30 flex items-center gap-2 transition-all active:scale-95">
                    {file ? 'Chọn ảnh khác' : 'Chọn Từ Thư Viện'}
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
    );
};
