import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Image as ImageIcon, Sparkles, Loader2 } from 'lucide-react';

export default function CameraCapture() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [students, setStudents] = useState<any[]>([]);
    const [selectedStudentId, setSelectedStudentId] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch students
        const fetchStudents = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4002'}/api/students`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (data.success) {
                    setStudents(data.data);
                    if (data.data.length > 0) setSelectedStudentId(data.data[0].id.toString());
                }
            } catch (err) {
                console.error("Lỗi khi lấy danh sách học sinh:", err);
            }
        };
        fetchStudents();
    }, []);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setError(null);
        }
    };

    const handleCreateMagic = async () => {
        if (!selectedImage) return;

        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('drawing', selectedImage);
        if (selectedStudentId) formData.append('student_id', selectedStudentId);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4002'}/api/magic/generate`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                navigate(`/magic-story/${data.story_id}`);
            } else {
                setError(data.error || 'Có lỗi xảy ra, vui lòng thử lại!');
            }
        } catch (err: any) {
            setError(err.message || 'Không thể kết nối đến máy chủ ma thuật!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-fuchsia-900 flex items-center justify-center p-6 text-white font-sans">
            <div className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden">
                {/* Decorative floating orbs */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>

                <div className="relative z-10">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400 mb-2 text-center drop-shadow-sm">
                        Cỗ Máy Kể Chuyện
                    </h1>
                    <p className="text-center text-purple-200 mb-8 font-medium">Bức vẽ của bé sẽ biến thành truyện cổ tích 3D!</p>

                    {students.length > 0 && (
                        <div className="mb-6 animate-in slide-in-from-top duration-500">
                            <label className="block text-sm font-bold text-purple-200 mb-2 ml-1">Bức tranh này của bé:</label>
                            <select 
                                value={selectedStudentId}
                                onChange={(e) => setSelectedStudentId(e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-pink-400 transition-colors"
                            >
                                {students.map(student => (
                                    <option key={student.id} value={student.id} className="bg-purple-900 text-white">
                                        {student.full_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-500/20 text-red-200 p-4 rounded-xl mb-6 border border-red-500/50 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div 
                        className={`border-2 border-dashed ${previewUrl ? 'border-pink-400 bg-white/5' : 'border-purple-300/50 hover:bg-white/5 hover:border-pink-300'} rounded-2xl p-4 transition-all duration-300 text-center cursor-pointer min-h-[250px] flex flex-col items-center justify-center relative group`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input 
                            type="file" 
                            accept="image/*" 
                            capture="environment"
                            className="hidden" 
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            disabled={isLoading}
                        />
                        
                        {previewUrl ? (
                            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-inner">
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover max-h-[250px] rounded-xl" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-white font-semibold flex items-center gap-2"><ImageIcon size={20}/> Đổi ảnh khác</p>
                                </div>
                            </div>
                        ) : (
                            <div className="py-8 flex flex-col items-center text-purple-200 group-hover:text-pink-300 transition-colors">
                                <div className="p-4 bg-white/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Camera size={48} />
                                </div>
                                <p className="font-semibold text-lg">Chụp hoặc Chọn ảnh</p>
                                <p className="text-sm opacity-70 mt-2">Đưa bức tranh của bé vào đây</p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleCreateMagic}
                        disabled={!selectedImage || isLoading}
                        className={`w-full mt-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 text-lg transition-all duration-300 shadow-[0_0_20px_rgba(236,72,153,0.4)]
                            ${!selectedImage || isLoading 
                                ? 'bg-white/20 text-white/50 cursor-not-allowed border border-white/10' 
                                : 'bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-400 hover:to-violet-400 hover:scale-[1.02] active:scale-[0.98] border border-pink-400/50 text-white'}`}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" size={24} />
                                Đang nhào nặn phép thuật...
                            </>
                        ) : (
                            <>
                                <Sparkles size={24} />
                                Úm ba la! Biến hình!
                            </>
                        )}
                    </button>
                    <p className="text-center text-xs text-purple-300 mt-4 opacity-60">Sử dụng AI tiên tiến nhất hiện nay (Gemini & DALL-E 3)</p>
                </div>
            </div>
        </div>
    );
}
