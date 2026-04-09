import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import mammoth from 'mammoth';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL, getAssetUrl } from '@/config/api';

const TOOLBAR_OPTIONS = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'align': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['blockquote', 'code-block'],
    ['link', 'image'],
    ['clean']
];

export default function DocumentEditorView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('Văn bản không tên');
    const [content, setContent] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isLoaded, setIsLoaded] = useState(!id);

    useEffect(() => {
        if (id) {
            fetchDocument();
        }
    }, [id]);

    const fetchDocument = async () => {
        console.log('Fetching document ID:', id);
        try {
            const res = await fetch(`${API_BASE_URL}/api/documents/${id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const result = await res.json();
            console.log('API Result:', result);
            
            if (result.success) {
                setTitle(result.data.title);
                
                if (result.data.web_content) {
                    setContent(result.data.web_content);
                } else if (result.data.file_url && result.data.file_url.endsWith('.docx')) {
                    console.log('Importing from Docx:', result.data.file_url);
                    try {
                        const fileRes = await fetch(getAssetUrl(result.data.file_url));
                        const arrayBuffer = await fileRes.arrayBuffer();
                        const convertResult = await mammoth.convertToHtml({ arrayBuffer });
                        setContent(convertResult.value);
                    } catch (mammothErr) {
                        console.error('Mammoth conversion error:', mammothErr);
                        setContent('<p style="color:red">Lỗi khi chuyển đổi file Word. Bạn có thể tự soạn thảo lại tại đây.</p>');
                    }
                } else {
                    setContent('');
                }
            } else {
                console.warn('Document not found or error:', result.error);
                alert('Không tìm thấy hồ sơ hoặc bạn không có quyền truy cập.');
            }
        } catch (e) {
            console.error('Fetch error:', e);
        } finally {
            setIsLoaded(true);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/documents/${id || ''}`, {
                method: id ? 'PUT' : 'POST',
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    web_content: content,
                    type: 'web_doc'
                })
            });
            const result = await res.json();
            if (result.success) {
                alert('Đã lưu văn bản thành công!');
                if (!id) navigate(`/teacher/document-editor/${result.data.id}`);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsSaving(false);
        }
    };

    if (!isLoaded) return <div className="h-screen bg-slate-100 flex items-center justify-center font-bold text-slate-400">Đang tải bộ soạn thảo...</div>;

    return (
        <div className="h-screen flex flex-col bg-[#f0f2f5] font-sans">
            {/* Top Navigation / Ribbon Mimic */}
            <header className="bg-white border-b border-slate-200 shadow-sm z-50">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white transition-transform hover:rotate-12">
                            <span className="material-symbols-outlined text-[18px]">description</span>
                        </div>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-transparent border-none text-[14px] font-bold text-slate-700 focus:outline-none focus:bg-slate-50 px-2 py-1 rounded" 
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-400 font-medium italic">Tự động sao lưu...</span>
                        <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher" alt="Avatar" />
                        </div>
                    </div>
                </div>
                <div className="px-6 py-1 flex gap-4 text-[12px] font-bold text-slate-500">
                    {['FILE', 'INSERT', 'LAYOUT', 'REVIEW', 'VIEW'].map(m => (
                        <button key={m} className="px-2 py-1 hover:bg-slate-100 rounded transition-colors uppercase tracking-wider">{m}</button>
                    ))}
                    <div className="flex-1" />
                    <button onClick={handleSave} className="flex items-center gap-2 px-6 py-1 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700 transition-all font-black uppercase text-[10px]">
                        <span className="material-symbols-outlined text-[16px]">save</span>
                        {isSaving ? 'ĐANG LƯU...' : 'LƯU VĂN BẢN'}
                    </button>
                </div>
            </header>

            {/* Editor Container */}
            <div className="flex-1 overflow-auto bg-slate-100 p-10 flex justify-center scrollbar-hide">
                <div className="bg-white shadow-2xl min-h-[1123px] w-[794px] p-[80px] relative transition-all duration-500 hover:shadow-blue-200/50">
                    <ReactQuill 
                        theme="snow" 
                        value={content} 
                        onChange={setContent}
                        modules={{ toolbar: TOOLBAR_OPTIONS }}
                        placeholder="Bắt đầu soạn thảo giáo án chuyên nghiệp tại đây..."
                        className="h-full border-none"
                    />
                </div>
            </div>

            {/* Status Bar */}
            <footer className="bg-blue-600 text-white px-6 py-1 flex items-center justify-between text-[11px] font-bold">
                <div className="flex gap-4">
                    <span>PAGE 1 OF 1</span>
                    <span>WORDS: {content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length}</span>
                </div>
                <div className="flex gap-4 items-center">
                    <span className="material-symbols-outlined text-[16px]">accessibility_new</span>
                    <span>ENGLISH (UNITED STATES)</span>
                    <span>100%</span>
                </div>
            </footer>

            <style>{`
                .quill { height: auto !important; }
                .ql-container { border: none !important; font-family: 'Times New Roman', serif; font-size: 16px; }
                .ql-toolbar { 
                    border: none !important; 
                    background: #f8fafc !important; 
                    position: sticky; 
                    top: 0; 
                    z-index: 100;
                    margin-bottom: 40px;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);
                }
                .ql-editor { padding: 0 !important; overflow-y: visible !important; min-height: 800px; }
                .ql-editor p { margin-bottom: 1em; }
            `}</style>
        </div>
    );
}
