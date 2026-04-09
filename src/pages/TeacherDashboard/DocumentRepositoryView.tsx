import React, { useState, useEffect } from 'react';
import { API_BASE_URL, getAssetUrl } from '@/config/api';

// Biểu mẫu mẫu (Templates)
const DOCUMENT_TEMPLATES = [
    { id: 1, frequency: '1 lần/tháng', name: 'Kế hoạch bài dạy', category: 'ke_hoach' },
    { id: 2, frequency: '1 lần/tháng', name: 'GIÁO ÁN THÁNG 10 - TỔ KHTN', category: 'giao_an' },
    { id: 3, frequency: '1 lần/tháng', name: 'GIÁO ÁN THÁNG 9 - TỔ KHTN', category: 'giao_an' },
    { id: 4, frequency: '1 lần/tuần học', name: 'Lịch báo giảng Tuần 1', category: 'lich_bao_giang' },
    { id: 5, frequency: '1 lần/tháng', name: 'GIÁO ÁN THÁNG 10 - TỔ KHXH', category: 'giao_an' }
];

const getHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
    'Accept': 'application/json'
});

export default function DocumentRepositoryView() {
    const [viewMode, setViewMode] = useState<'dashboard' | 'list'>('dashboard');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [stats, setStats] = useState<any>({
        not_submitted: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        total_files: 0,
        total_size_mb: 0
    });
    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [showHosoMenu, setShowHosoMenu] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    // Modal State
    const [showAddModal, setShowAddModal] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [isUploading, setIsUploading] = useState(false);
    const [reviewers, setReviewers] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        template_name: '',
        customTitle: '',
        period: '',
        teacherName: '',
        grade: '',
        subject: '',
        file: null as File | null,
        reviewer_id: '',
        auto_convert: true
    });

    const [approvalSteps, setApprovalSteps] = useState<any[]>([]);
    const [isAddingStep, setIsAddingStep] = useState(false);
    const [newStep, setNewStep] = useState({ order: 1, group: '', person_id: '', person_name: '', electronic: false });
    const [isSigned, setIsSigned] = useState(false);

    const fetchStats = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/documents/stats`, { headers: getHeaders() });
            const data = await res.json();
            if (data.success) {
                setStats({
                    ...data.data,
                    total_size_mb: Math.ceil(data.data.total_size / (1024 * 1024))
                });
            }
        } catch (e) { console.error(e); }
    };

    const fetchReviewers = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/documents/reviewers`, { headers: getHeaders() });
            const data = await res.json();
            if (data.success) setReviewers(data.data);
        } catch (e) { console.error(e); }
    };

    const fetchDocuments = async () => {
        setLoading(true);
        try {
            const statusParam = selectedStatus === 'all' ? '' : `&status=${selectedStatus}`;
            const res = await fetch(`${API_BASE_URL}/api/documents?tab=submitted_list${statusParam}`, { headers: getHeaders() });
            const data = await res.json();
            if (data.success) setDocuments(data.data);
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    useEffect(() => {
        fetchStats();
        fetchReviewers();
    }, []);

    useEffect(() => {
        if (viewMode === 'list') {
            fetchDocuments();
        }
    }, [viewMode, selectedStatus]);

    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0) return alert('Vui lòng chọn hồ sơ cần xóa!');
        if (!confirm(`Bạn có chắc muốn xóa ${selectedIds.length} hồ sơ đã chọn?`)) return;

        try {
            for (const id of selectedIds) {
                await fetch(`${API_BASE_URL}/api/documents/${id}`, {
                    method: 'DELETE',
                    headers: getHeaders()
                });
            }
            alert('Đã xóa thành công!');
            setSelectedIds([]);
            fetchStats();
            fetchDocuments();
        } catch (e) {
            console.error(e);
            alert('Lỗi khi xóa hồ sơ!');
        }
    };

    const toggleSelect = (id: number) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === documents.length) setSelectedIds([]);
        else setSelectedIds(documents.map(d => d.id));
    };

    const handleViewFile = (doc: any) => {
        const isDocx = doc.file_url?.toLowerCase().endsWith('.docx');
        
        if (doc.web_content || isDocx) {
            // Web Document OR Docx -> Open in Online Editor
            // This works even on localhost because we convert it locally using mammoth.js
            window.open(`/teacher/document-editor/${doc.id}`, '_blank');
        } else if (doc.file_url) {
            // Physical File (PDF, Image, etc.)
            const fullUrl = getAssetUrl(doc.file_url);
            window.open(fullUrl, '_blank');
        } else {
            alert('Hồ sơ không có nội dung hoặc tệp đính kèm!');
        }
    };

    const handleQuickSubmit = async (doc: any) => {
        if (doc.status !== 'draft') return alert('Hồ sơ này đã được trình ký trước đó!');
        if (!confirm(`Bạn có chắc muốn trình ký hồ sơ "${doc.title}"?`)) return;

        try {
            const res = await fetch(`${API_BASE_URL}/api/documents/${doc.id}/submit`, {
                method: 'PUT',
                headers: getHeaders()
            });
            const result = await res.json();
            if (result.success) {
                alert('Trình ký thành công!');
                fetchStats();
                fetchDocuments();
            }
        } catch (e) { console.error(e); }
    };

    const handleFileUpload = async (isProceeding: boolean = true) => {
        if (!formData.file) return alert('Vui lòng chọn tài liệu!');
        
        const uploadData = new FormData();
        uploadData.append('file', formData.file);
        uploadData.append('title', formData.customTitle || formData.template_name || formData.file.name);
        if (formData.reviewer_id) uploadData.append('reviewer_id', formData.reviewer_id);

        setIsUploading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/documents`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                body: uploadData
            });
            const result = await res.json();
            if (result.success) {
                alert('Đã lưu hồ sơ thành công!');
                fetchStats();
                if (viewMode === 'list') fetchDocuments();
                if (isProceeding && currentStep === 1) setCurrentStep(2);
            }
        } catch (e) { console.error(e); }
        finally { setIsUploading(false); }
    };

    const handleAddStep = () => {
        if (!newStep.person_name) return alert('Vui lòng nhập họ tên người ký!');
        setApprovalSteps([...approvalSteps, { 
            ...newStep, 
            person_name: newStep.person_name,
            group_name: newStep.group || 'Cá nhân' 
        }]);
        setIsAddingStep(false);
        setNewStep({ order: approvalSteps.length + 2, group: '', person_id: '', person_name: '', electronic: false });
    };

    const removeStep = (index: number) => {
        setApprovalSteps(approvalSteps.filter((_, i) => i !== index));
    };

    const handleStep2Continue = () => {
        if (approvalSteps.length === 0) return alert('Vui lòng chọn ít nhất một nhân sự ký duyệt!');
        setCurrentStep(3);
    };

    const handleFinalSubmit = async () => {
        if (!isSigned) return alert('Vui lòng thực hiện chèn ảnh ký trước khi hoàn tất!');
        alert('Đã hoàn tất trình ký hồ sơ!');
        setShowAddModal(false);
        setCurrentStep(1);
        fetchStats();
        if (viewMode === 'list') fetchDocuments();
    };

    const renderDashboard = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { id: 'not_submitted', label: 'Hồ sơ bạn chưa trình ký', value: stats.not_submitted, color: 'text-blue-500', border: 'border-l-blue-500', icon: 'drafts', iconColor: 'text-amber-500' },
                    { id: 'pending', label: 'Hồ sơ đang chờ bạn ký', value: stats.pending, color: 'text-blue-600', border: 'border-l-blue-600', icon: 'edit_note', iconColor: 'text-blue-500' },
                    { id: 'approved', label: 'Hồ sơ bạn đã ký duyệt', value: stats.approved, color: 'text-blue-600', border: 'border-l-blue-600', icon: 'edit_square', iconColor: 'text-emerald-500' },
                    { id: 'rejected', label: 'Hồ sơ bạn đã ban hành', value: stats.rejected, color: 'text-blue-600', border: 'border-l-blue-600', icon: 'verified', iconColor: 'text-emerald-600' },
                ].map((card, i) => (
                    <div key={i} className={`bg-white p-6 rounded-lg shadow-sm border-l-4 ${card.border} flex justify-between items-center group transition-all`}>
                        <div><h3 className={`text-[36px] font-black leading-none ${card.color}`}>{card.value}</h3><p className="text-[13px] font-bold text-slate-500 mt-2 uppercase tracking-tight">{card.label}</p></div>
                        <span className={`material-symbols-outlined text-[32px] ${card.iconColor} opacity-80`}>{card.icon}</span>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 font-black text-blue-800 tracking-widest uppercase">BẢNG TIN</div>
                    <table className="w-full text-left">
                        <thead className="bg-[#0b72d8] text-white">
                            <tr>
                                <th className="p-2 text-center text-[11px] font-black border-r border-blue-400/20">STT</th>
                                <th className="p-2 text-[11px] font-black border-r border-blue-400/20">TẦN SUẤT NỘP</th>
                                <th className="p-2 text-[11px] font-black border-r border-blue-400/20">TÊN MẪU SỔ</th>
                                <th className="p-2 text-center text-[11px] font-black">TRÌNH KÝ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 italic">
                            {DOCUMENT_TEMPLATES.map((doc, idx) => (
                                <tr key={idx} className="hover:bg-slate-50">
                                    <td className="p-3 text-center text-sm font-bold text-slate-400">{idx+1}</td>
                                    <td className="p-3 text-sm font-bold text-slate-500">{doc.frequency}</td>
                                    <td className="p-3 text-sm font-bold text-slate-700">{doc.name}</td>
                                    <td className="p-3 text-center">
                                        <button onClick={() => { setFormData({...formData, template_name: doc.name}); setShowAddModal(true); }} className="w-10 h-8 bg-blue-600 text-white rounded flex items-center justify-center mx-auto hover:bg-blue-700"><span className="material-symbols-outlined text-[18px]">send</span></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderListView = () => (
        <div className="flex bg-[#f4f7f9] min-h-[500px] font-sans text-slate-700 fade-in h-[calc(100vh-220px)] rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto hide-scrollbar">
                <div className="p-4 border-b border-slate-100 flex gap-2"><button className="flex-1 py-1 px-3 text-[10px] font-black bg-blue-50 text-blue-600 rounded">TRƯỜNG</button></div>
                <div className="p-4">
                    <div className="flex items-center gap-2 text-blue-700 font-black text-[14px] mb-6 tracking-tight uppercase"><span className="material-symbols-outlined text-[18px]">house</span> 2.1. Sổ trình ký</div>
                    {[
                        { id: 'all', label: 'Tất cả', icon: 'description', color: 'text-blue-600' },
                        { id: 'draft', label: 'Chưa trình ký', icon: 'edit_document', color: 'text-slate-500' },
                        { id: 'submitted', label: 'Chờ ký duyệt', icon: 'schedule', color: 'text-amber-500' },
                        { id: 'approved', label: 'Đã ký duyệt ban hành', icon: 'verified', color: 'text-emerald-500' },
                        { id: 'rejected', label: 'Từ chối', icon: 'cancel', color: 'text-red-500' },
                    ].map((s) => (
                        <button key={s.id} onClick={() => setSelectedStatus(s.id)} className={`w-full flex items-center justify-between p-2.5 rounded-lg text-[13px] mb-1 transition-all ${selectedStatus === s.id ? 'bg-blue-50 text-blue-700 font-black' : 'hover:bg-slate-50 text-slate-600 font-bold'}`}>
                            <div className="flex items-center gap-3"><span className={`material-symbols-outlined text-[18px] ${s.color}`}>{s.icon}</span><span>{s.label}</span></div>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100">{stats[s.id === 'all' ? 'total_files' : s.id === 'submitted' ? 'pending' : s.id === 'draft' ? 'not_submitted' : s.id] || 0}</span>
                        </button>
                    ))}
                </div>
            </aside>
            <main className="flex-1 flex flex-col min-w-0 bg-white">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm">
                    <h2 className="font-black text-slate-700 uppercase tracking-tighter text-sm flex items-center gap-2 px-2"><span className="material-symbols-outlined text-slate-400">menu</span> THCS Hoàng Diệu</h2>
                    <div className="flex gap-2">
                         <button 
                            onClick={handleDeleteSelected}
                            className="px-5 py-2 bg-red-600 text-white text-[12px] font-black rounded uppercase shadow hover:bg-red-700 transition-colors"
                         >Xóa</button>
                         <button className="px-5 py-2 bg-blue-700 text-white text-[12px] font-black rounded uppercase shadow hover:bg-blue-800 transition-colors">Tìm kiếm</button>
                         <button 
                            onClick={() => window.open('/teacher/document-editor', '_blank')}
                            className="px-5 py-2 bg-emerald-600 text-white text-[12px] font-black rounded uppercase shadow hover:bg-emerald-700 transition-colors"
                         >SOẠN THẢO</button>
                         <button onClick={() => { setFormData({template_name: '', customTitle: '', period: '', teacherName: '', grade: '', subject: '', file: null, reviewer_id: '', auto_convert: true}); setShowAddModal(true); }} className="px-5 py-2 bg-blue-500 text-white text-[12px] font-black rounded uppercase shadow hover:bg-blue-600 transition-colors">THÊM MỚI</button>
                    </div>
                </div>
                <div className="flex-1 overflow-auto bg-[#f8fafc]">
                    <table className="w-full border-collapse">
                        <thead className="sticky top-0 bg-[#0b72d8] text-white z-20">
                            <tr className="text-[11px] font-black uppercase tracking-widest border-b border-blue-400/50">
                                <th className="p-3 w-10 text-center border-r border-blue-400/20">
                                    <input 
                                        type="checkbox" 
                                        className="accent-blue-500" 
                                        checked={documents.length > 0 && selectedIds.length === documents.length}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="p-3 w-12 text-center border-r border-blue-400/20">STT</th>
                                <th className="p-3 w-12 text-center border-r border-blue-400/20">XEM</th>
                                <th className="p-3 w-16 text-center border-r border-blue-400/20">TRÌNH KÝ</th>
                                <th className="p-3 w-28 text-center border-r border-blue-400/20">KỲ NỘP</th>
                                <th className="p-3 text-left border-r border-blue-400/20">TÊN HỒ SƠ</th>
                                <th className="p-3 w-32 text-center border-r border-blue-400/20">TRẠNG THÁI</th>
                                <th className="p-3 w-32 text-center border-r border-blue-400/20">TẠO LÚC</th>
                                <th className="p-3 w-32 text-center">TRÌNH LÚC</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 italic">
                            {loading ? (
                                <tr><td colSpan={9} className="p-20 text-center"><span className="material-symbols-outlined animate-spin text-blue-500 text-4xl">sync</span></td></tr>
                            ) : documents.length === 0 ? (
                                <tr><td colSpan={9} className="p-20 text-center italic text-slate-400 font-bold uppercase tracking-widest text-sm">Danh sách giáo án trống</td></tr>
                            ) : (
                                documents.map((doc, idx) => {
                                    const createdAt = doc.created_at || doc.createdAt;
                                    const submittedAt = doc.submitted_at;
                                    
                                    return (
                                        <tr key={doc.id} className={`hover:bg-blue-50/40 transition-all ${selectedIds.includes(doc.id) ? 'bg-blue-50/60' : 'bg-white'}`}>
                                            <td className="p-3 text-center border-r border-slate-50">
                                                <input 
                                                    type="checkbox" 
                                                    className="accent-blue-500" 
                                                    checked={selectedIds.includes(doc.id)}
                                                    onChange={() => toggleSelect(doc.id)}
                                                />
                                            </td>
                                            <td className="p-3 text-center text-xs font-black text-slate-400 border-r border-slate-50">{idx+1}</td>
                                            <td className="p-3 text-center border-r border-slate-50">
                                                <span 
                                                    onClick={() => handleViewFile(doc)}
                                                    className="material-symbols-outlined text-blue-500 text-[20px] cursor-pointer hover:scale-125 transition-transform"
                                                >visibility</span>
                                            </td>
                                            <td className="p-3 text-center border-r border-slate-50">
                                                <span 
                                                    onClick={() => handleQuickSubmit(doc)}
                                                    className="material-symbols-outlined text-blue-500 text-[20px] cursor-pointer hover:scale-125 transition-transform"
                                                >send</span>
                                            </td>
                                            <td className="p-3 text-center text-[11px] font-bold text-slate-500 border-r border-slate-50">{doc.category === 'ke_hoach' ? 'T9-2025' : 'Hàng tháng'}</td>
                                            <td className="p-3 border-r border-slate-50">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-purple-600 text-[18px]">description</span>
                                                    <span className="text-[13px] font-bold text-slate-700 truncate max-w-xs">{doc.title}</span>
                                                </div>
                                            </td>
                                            <td className="p-3 text-center border-r border-slate-50">
                                                <span className={`px-3 py-0.5 rounded-full text-[9px] font-black border uppercase tracking-tighter ${
                                                    doc.status === 'draft' ? 'bg-slate-50 text-slate-400 border-slate-200' :
                                                    doc.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                                                    'bg-blue-50 text-blue-600 border-blue-200'
                                                }`}>{doc.status}</span>
                                            </td>
                                            <td className="p-3 text-center text-[11px] text-slate-500 font-bold border-r border-slate-50">
                                                {createdAt ? new Date(createdAt).toLocaleString('vi-VN', { 
                                                    day: '2-digit', month: '2-digit', year: 'numeric',
                                                    hour: '2-digit', minute: '2-digit'
                                                }) : '--'}
                                            </td>
                                            <td className="p-3 text-center text-[11px] text-slate-400 font-bold">
                                                {submittedAt ? new Date(submittedAt).toLocaleString('vi-VN', { 
                                                    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                                                }) : '--'}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );

    return (
        <div className="flex-1 pb-12 w-full max-w-[1400px] mx-auto space-y-6 font-display text-slate-800 fade-in">
            <div className="bg-[#f0f2f5] rounded-xl border border-slate-200 p-1 flex items-center text-[13px] font-black text-slate-600 relative z-30 shadow-sm">
                <button onClick={() => setViewMode('dashboard')} className={`px-6 py-2.5 rounded-lg transition-all ${viewMode === 'dashboard' ? 'bg-white shadow-sm text-blue-700' : 'hover:bg-white/50'}`}>1. Danh mục</button>
                <div className="relative group" onMouseEnter={() => setShowHosoMenu(true)} onMouseLeave={() => setShowHosoMenu(false)}>
                    <button onClick={() => setViewMode('list')} className={`px-6 py-2.5 rounded-lg transition-all flex items-center gap-1 ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-700' : 'hover:bg-white/50'}`}>2. Hồ sơ <span className="material-symbols-outlined text-[18px]">arrow_drop_down</span></button>
                    {showHosoMenu && (
                        <div className="absolute top-[100%] left-0 mt-1 w-52 bg-white border border-slate-200 shadow-2xl rounded-xl py-3 z-50 animate-in fade-in slide-in-from-top-2">
                            <button onClick={() => { setViewMode('list'); setShowHosoMenu(false); }} className="w-full text-left px-5 py-2.5 hover:bg-blue-50 text-blue-700 font-black text-[12px]">2.1. Sổ trình ký</button>
                        </div>
                    )}
                </div>
                <button className="px-6 py-2.5 rounded-lg hover:bg-white/50">3. Báo cáo...</button><button className="px-6 py-2.5 rounded-lg hover:bg-white/50">4. Tra cứu</button><button className="px-6 py-2.5 rounded-lg hover:bg-white/50">5. Hệ thống</button>
            </div>

            {viewMode === 'dashboard' ? renderDashboard() : renderListView()}

            {showAddModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#f8f9fa] rounded shadow-2xl w-full max-w-5xl overflow-hidden animate-in zoom-in duration-200 h-[700px] flex flex-col">
                        <div className="px-6 py-3 bg-white border-b border-slate-200 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-2"><img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" className="w-5 h-5" alt="Logo" /><h3 className="text-[15px] font-black text-slate-700 uppercase tracking-tight">Trình ký chi tiết</h3></div>
                            <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><span className="material-symbols-outlined">close</span></button>
                        </div>
                        <div className="bg-white border-b border-slate-200 flex px-8 shadow-inner">
                            {[{ step: 1, label: '1. Khai báo hồ sơ' }, { step: 2, label: '2. Chọn nhân sự ký duyệt' }, { step: 3, label: '3. Chèn ảnh ký' }].map((s) => (
                                <div key={s.step} className={`py-4 px-6 border-b-2 font-black text-[14px] transition-all ${currentStep === s.step ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 uppercase tracking-widest'}`}>{s.label}</div>
                            ))}
                        </div>
                        <div className="flex-1 p-8 overflow-auto hide-scrollbar bg-slate-50/50">
                            <div className="max-w-4xl mx-auto bg-white border border-slate-100 rounded-xl shadow-lg p-8 space-y-8 relative">
                                {currentStep === 1 && (
                                    <div className="space-y-6 fade-in">
                                        <div className="flex items-center gap-2 mb-4 bg-blue-50/50 p-3 rounded-lg border border-blue-100"><input type="checkbox" checked={formData.auto_convert} onChange={(e) => setFormData({...formData, auto_convert: e.target.checked})} className="w-5 h-5 accent-blue-600 cursor-pointer" /><label className="text-[14px] font-bold text-slate-700 cursor-pointer italic">Tự động chuyển đổi qua định dạng PDF</label></div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-50">
                                            <div className="md:col-span-2"><label className="block text-[13px] font-black text-slate-500 mb-2 uppercase tracking-widest">Danh mục hồ sơ <span className="text-red-500">*</span></label>
                                                <select value={formData.template_name} onChange={(e) => setFormData({...formData, template_name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-[14px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20"><option value="">-- Chọn danh mục --</option>{DOCUMENT_TEMPLATES.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}</select>
                                            </div>
                                            <div className="md:col-span-2"><label className="block text-[13px] font-black text-slate-500 mb-2 uppercase tracking-widest">Tên hồ sơ trình ký <span className="text-red-500">*</span></label>
                                                <input type="text" value={formData.customTitle} onChange={(e) => setFormData({...formData, customTitle: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-[14px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Nhập tên giáo án..." />
                                            </div>
                                            <div><label className="block text-[13px] font-black text-slate-500 mb-2 uppercase tracking-widest">Kỳ nộp <span className="text-red-500">*</span></label>
                                                <select value={formData.period} onChange={(e) => setFormData({...formData, period: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-[14px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20"><option value="">-- Chọn kỳ nộp --</option><option>Tháng 9-2025</option><option>Tháng 10-2025</option><option>Tháng 11-2025</option></select>
                                            </div>
                                            <div><label className="block text-[13px] font-black text-slate-500 mb-2 uppercase tracking-widest">Giáo viên</label><input type="text" value={formData.teacherName} onChange={(e) => setFormData({...formData, teacherName: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-[14px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Nhập tên giáo viên..." /></div>
                                            <div><label className="block text-[13px] font-black text-slate-500 mb-2 uppercase tracking-widest">Khối</label><select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-[14px] font-bold text-slate-400 italic"><option>Chọn</option></select></div>
                                            <div><label className="block text-[13px] font-black text-slate-500 mb-2 uppercase tracking-widest">Môn học</label><select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-[14px] font-bold text-slate-400 italic"><option>Chọn</option></select></div>
                                        </div>
                                        <div className="border-2 border-dashed border-blue-200 bg-blue-50/10 rounded-xl p-10 text-center relative hover:bg-blue-50/40 transition-all cursor-pointer group">
                                            <input type="file" onChange={(e) => setFormData({...formData, file: e.target.files?.[0] || null})} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                            <span className="material-symbols-outlined text-5xl text-blue-500 mb-3 group-hover:scale-110 transition-transform">cloud_upload</span>
                                            <p className="text-[14px] font-black text-slate-700 uppercase tracking-widest">Thả tệp vào đây hoặc <span className="text-blue-600 underline">Chọn từ máy</span></p>
                                            {formData.file && <div className="mt-4 font-black text-emerald-600 text-[10px] uppercase tracking-widest border border-emerald-200 bg-white py-1 px-3 rounded-full inline-block shadow-sm">FILE: {formData.file.name}</div>}
                                        </div>
                                    </div>
                                )}
                                {currentStep === 2 && (
                                    <div className="space-y-6 fade-in min-h-[400px]">
                                        {/* Blue Conversion Banner */}
                                        <div className="absolute top-[-80px] right-[-20px] w-72 bg-blue-600 text-white p-4 rounded-lg shadow-xl animate-in slide-in-from-right-10 duration-500 z-50">
                                            <p className="text-[13px] font-bold mb-1">Đang thực hiện chuyển đổi file ...</p>
                                            <p className="text-[11px] opacity-80 leading-snug">Trong lúc chuyển đổi bạn vẫn có thể thao tác các tác vụ khác hoặc thoát khỏi phần mềm.</p>
                                        </div>

                                        <div className="flex items-center gap-2 text-slate-700 font-bold mb-4">
                                            <span className="material-symbols-outlined text-blue-600">contact_page</span>
                                            2. Chọn nhân sự ký duyệt
                                        </div>

                                        <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
                                            <div className="p-3 bg-white border-b border-slate-200 flex gap-2">
                                                <button 
                                                    onClick={() => setIsAddingStep(true)}
                                                    className="px-4 py-1.5 bg-blue-600 text-white text-[12px] font-bold rounded"
                                                >Thêm mới</button>
                                            </div>

                                            <table className="w-full text-left text-[12px]">
                                                <thead className="bg-[#0b72d8] text-white">
                                                    <tr>
                                                        <th className="p-2 w-8 text-center border-r border-blue-400/30">#</th>
                                                        <th className="p-2 w-8 text-center border-r border-blue-400/20">Sửa</th>
                                                        <th className="p-2 w-20 text-center border-r border-blue-400/20">Thứ tự ký</th>
                                                        <th className="p-2 border-r border-blue-400/20">Nhóm đối tượng</th>
                                                        <th className="p-2 border-r border-blue-400/20">Người ký</th>
                                                        <th className="p-2 w-20 text-center border-r border-blue-400/20">Ký điện tử</th>
                                                        <th className="p-2 w-12 text-center">Xóa</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white">
                                                    {approvalSteps.length === 0 && !isAddingStep && (
                                                        <tr><td colSpan={7} className="p-10 text-center text-slate-400 italic">Chưa có nhân sự nào được chọn</td></tr>
                                                    )}
                                                    {approvalSteps.map((s, i) => (
                                                        <tr key={i} className="border-b border-slate-100">
                                                            <td className="p-2 text-center text-slate-400 font-bold">{i+1}</td>
                                                            <td className="p-2 text-center"><span className="material-symbols-outlined text-blue-500 text-[18px]">edit</span></td>
                                                            <td className="p-2 text-center font-bold text-slate-600">{s.order}</td>
                                                            <td className="p-2 font-bold text-slate-600">{s.group_name}</td>
                                                            <td className="p-2 font-bold text-slate-800">{s.person_name}</td>
                                                            <td className="p-2 text-center"><input type="checkbox" checked={s.electronic} disabled className="accent-blue-500" /></td>
                                                            <td className="p-2 text-center">
                                                                <button onClick={() => removeStep(i)} className="material-symbols-outlined text-red-500 text-[18px]">delete</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    
                                                    {isAddingStep && (
                                                        <tr className="bg-blue-50/30">
                                                            <td colSpan={7} className="p-6">
                                                                <div className="max-w-xl mx-auto space-y-4 text-slate-700">
                                                                    <div className="grid grid-cols-3 items-center gap-4">
                                                                        <label className="text-right font-bold">Thứ tự ký <span className="text-red-500">(*)</span></label>
                                                                        <input 
                                                                            type="number" 
                                                                            value={newStep.order} 
                                                                            onChange={e => setNewStep({...newStep, order: parseInt(e.target.value)})}
                                                                            className="col-span-2 border border-slate-300 rounded px-3 py-1.5 focus:ring-1 focus:ring-blue-500 outline-none" 
                                                                        />
                                                                    </div>
                                                                    <div className="grid grid-cols-3 items-center gap-4">
                                                                        <label className="text-right font-bold">Nhóm ký duyệt Số <span className="text-red-500">(*)</span></label>
                                                                        <select 
                                                                            value={newStep.group}
                                                                            onChange={e => setNewStep({...newStep, group: e.target.value})}
                                                                            className="col-span-2 border border-slate-300 rounded px-3 py-1.5 outline-none"
                                                                        >
                                                                            <option value="">Chọn nhóm ký</option>
                                                                            <option>Ban Giám Hiệu</option>
                                                                            <option>Tổ Trưởng Chuyên Môn</option>
                                                                            <option>Công Đoàn</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="grid grid-cols-3 items-center gap-4">
                                                                        <label className="text-right font-bold">Ký điện tử</label>
                                                                        <div className="col-span-2"><input type="checkbox" checked={newStep.electronic} onChange={e => setNewStep({...newStep, electronic: e.target.checked})} className="w-4 h-4 accent-blue-600" /></div>
                                                                    </div>
                                                                    <div className="grid grid-cols-3 items-center gap-4">
                                                                        <label className="text-right font-bold">Họ tên <span className="text-red-500">(*)</span></label>
                                                                        <input 
                                                                            type="text"
                                                                            value={newStep.person_name}
                                                                            onChange={e => setNewStep({...newStep, person_name: e.target.value})}
                                                                            className="col-span-2 border border-slate-300 rounded px-3 py-1.5 outline-none font-bold text-slate-700" 
                                                                            placeholder="Nhập họ tên người ký duyệt..."
                                                                        />
                                                                    </div>
                                                                    <div className="flex justify-center gap-2 pt-2">
                                                                        <button onClick={handleAddStep} className="px-8 py-1.5 bg-blue-600 text-white font-bold rounded shadow">Thêm</button>
                                                                        <button onClick={() => setIsAddingStep(false)} className="px-8 py-1.5 bg-slate-100 text-slate-600 border border-slate-300 font-bold rounded">Hủy</button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                                {currentStep === 3 && (
                                    <div className="space-y-6 fade-in h-[500px] flex flex-col">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2 text-slate-700 font-bold uppercase tracking-tight">
                                                <span className="material-symbols-outlined text-emerald-600">draw</span>
                                                3. Chèn ảnh ký số
                                            </div>
                                            <button 
                                                onClick={() => setIsSigned(true)}
                                                className="px-4 py-2 bg-emerald-600 text-white text-[12px] font-bold rounded flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">ink_pen</span>
                                                CHÈN ẢNH KÝ
                                            </button>
                                        </div>

                                        <div className="flex-1 bg-slate-200 rounded-lg p-8 overflow-auto border-4 border-slate-300 shadow-inner relative group">
                                            {/* Mock PDF Page */}
                                            <div className="bg-white w-[600px] min-h-[800px] mx-auto shadow-2xl p-20 relative transition-transform duration-500 group-hover:scale-[1.01]">
                                                {/* Mock Content */}
                                                <div className="border-b-2 border-slate-900 pb-4 mb-8 text-center">
                                                    <p className="font-serif font-black text-xl uppercase tracking-widest">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                                                    <p className="font-serif font-bold text-lg">Độc lập - Tự do - Hạnh phúc</p>
                                                </div>

                                                <div className="text-center mb-10">
                                                    <h2 className="font-serif font-black text-2xl uppercase">{formData.customTitle || formData.template_name || 'GIÁO ÁN ĐIỆN TỬ'}</h2>
                                                    <p className="font-serif italic text-slate-500">Người thực hiện: {formData.teacherName || 'GV. Trình Viết Ánh'}</p>
                                                </div>

                                                <div className="space-y-6 font-serif text-justify text-lg leading-relaxed">
                                                    <p>Căn cứ vào kế hoạch giảng dạy năm học 2025-2026 của Nhà trường...</p>
                                                    <p>Tôi xin trình ký phê duyệt nội dung giáo án tuần này để chuẩn bị cho công tác giảng dạy sắp tới. Nội dung đã được bám sát chương trình đổi mới giáo dục...</p>
                                                    <p>Kính mong Ban Giám Hiệu và Tổ Trưởng xem xét, phê duyệt.</p>
                                                </div>

                                                {/* Signature Area */}
                                                <div className="absolute bottom-20 right-20 text-center w-64">
                                                    <p className="font-serif italic mb-2">Hà Nội, ngày {new Date().toLocaleDateString('vi-VN')}</p>
                                                    <p className="font-serif font-bold uppercase mb-20 text-blue-900 border-b border-blue-100 pb-2">Người trình ký</p>
                                                    
                                                    {isSigned && (
                                                        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 animate-in zoom-in duration-300">
                                                            <div className="relative">
                                                                <img 
                                                                    src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Seal_of_the_Republic_of_Vietnam.svg" 
                                                                    className="w-32 opacity-80 mix-blend-multiply rotate-[-15deg]"
                                                                    alt="Seal"
                                                                />
                                                                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-red-600 font-black text-[10px] whitespace-nowrap opacity-60">ĐÃ XÁC THỰC SỐ</p>
                                                            </div>
                                                            <p className="font-serif font-black text-red-800 mt-2 uppercase tracking-tighter whitespace-nowrap">{formData.teacherName || 'TRỊNH VIẾT ÁNH'}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-white border-t border-slate-200 flex justify-end gap-3 shadow-2xl">
                            <button onClick={() => setShowAddModal(false)} className="px-6 py-2 bg-white border border-slate-300 text-slate-600 font-black text-[12px] uppercase rounded-lg hover:bg-slate-50 transition-colors">ĐÓNG</button>
                            {currentStep === 1 && (
                                <>
                                    <button onClick={() => handleFileUpload(false)} className="px-6 py-2 bg-white border border-blue-600 text-blue-700 font-black text-[12px] uppercase rounded-lg shadow-sm hover:bg-blue-50 transition-all">Ghi</button>
                                    <button onClick={() => handleFileUpload(true)} className="px-6 py-2 bg-blue-600 text-white font-black text-[12px] uppercase rounded-lg shadow-md hover:bg-blue-700 transition-all">{isUploading ? 'Đang xử lý...' : 'Ghi & Tiếp tục'}</button>
                                </>
                            )}
                            {currentStep === 2 && ( <button onClick={() => handleStep2Continue()} className="px-8 py-2 bg-blue-600 text-white font-black text-[12px] uppercase rounded-lg shadow-md hover:bg-blue-700 transition-all">TIẾP TỤC</button> )}
                            {currentStep === 3 && ( <button onClick={() => handleFinalSubmit()} className="px-8 py-2 bg-emerald-600 text-white font-black text-[12px] uppercase rounded-lg shadow-md hover:bg-emerald-700 transition-all">HOÀN TẤT</button> )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
