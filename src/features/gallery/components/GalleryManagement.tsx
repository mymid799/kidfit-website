import React, { useState, useEffect, useRef } from 'react';
import { galleryService, GalleryItem } from '../services/galleryService';

const GalleryManagement = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target_class: '',
    module: '',
    lesson: '',
    date: ''
  });
  const [isUploading, setIsUploading] = useState(false);

  // Load items on mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const fetchedItems = await galleryService.getItems();
      setItems(fetchedItems);
    } catch (error) {
      console.error('Lỗi khi tải danh sách ảnh:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      if (!formData.title) {
         setFormData(prev => ({ ...prev, title: file.name.split('.')[0] }));
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Vui lòng chọn file ảnh!');
      return;
    }
    if (!formData.title || !formData.target_class) {
      alert('Vui lòng nhập Chủ đề và Lớp học!');
      return;
    }

    try {
      setIsUploading(true);
      const uploadData = new FormData();
      uploadData.append('image', selectedFile);
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description);
      uploadData.append('target_class', formData.target_class);
      uploadData.append('module', formData.module);
      uploadData.append('lesson', formData.lesson);
      uploadData.append('date', formData.date);

      await galleryService.uploadImage(uploadData);
      
      // Thành công, reset form và load lại danh sách
      alert('Upload thành công!');
      setShowUploadModal(false);
      removeFile();
      setFormData({
        title: '', description: '', target_class: '', module: '', lesson: '', date: ''
      });
      fetchItems();
    } catch (error: any) {
      alert('Upload thất bại: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá ảnh này?')) {
      try {
        await galleryService.deleteImage(id);
        fetchItems();
      } catch (error: any) {
        alert('Lỗi xoá ảnh: ' + error.message);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Quản lý Ảnh & Video Bài học</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Lưu trữ và tổ chức tư liệu giảng dạy của bạn một cách chuyên nghiệp.</p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-black shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Upload Ảnh Mới
        </button>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 bg-white rounded-3xl border border-primary/10 shadow-sm">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Lớp học</label>
          <select className="w-full bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-sm font-bold h-11 px-4 text-slate-900">
            <option>Tất cả các lớp</option>
            <option>Lớp 6A1</option>
            <option>Lớp 7B2</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Module</label>
          <select className="w-full bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-sm font-bold h-11 px-4 text-slate-900">
            <option>Tất cả Module</option>
            <option>Module 1: Robotics</option>
            <option>Module 2: Coding</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Tiết học</label>
          <select className="w-full bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-sm font-bold h-11 px-4 text-slate-900">
            <option>Tất cả các tiết</option>
            <option>Tiết 1</option>
            <option>Tiết 2</option>
          </select>
        </div>
        <div className="flex items-end">
          <button className="w-full bg-slate-100 h-11 rounded-xl font-black text-xs uppercase tracking-widest text-slate-600 flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
            <span className="material-symbols-outlined text-sm">filter_alt</span>
            Áp dụng
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      {isLoading ? (
          <div className="text-center text-slate-500 font-bold py-10">Đang tải dữ liệu...</div>
      ) : items.length === 0 ? (
          <div className="text-center text-slate-400 font-bold py-10 bg-white rounded-[32px] border border-slate-100 shadow-sm">Chưa có ảnh nào được tải lên.</div>
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <div key={item.id} className="group bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all relative flex flex-col">
            <div className="relative aspect-video overflow-hidden bg-slate-50 rounded-[24px] mb-5 border-4 border-slate-50 shadow-md ring-4 ring-slate-100">
              <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={item.file_path} alt={item.title} />
              <div className="absolute top-3 right-3">
                <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md border-2 border-white ${
                  item.has_video ? 'bg-blue-100 text-blue-600' : 'bg-white text-slate-400'
                }`}>
                  <span className="material-symbols-outlined !text-[12px]">
                    {item.has_video ? 'link' : 'link_off'}
                  </span> 
                </span>
              </div>
            </div>
            <div className="flex flex-col flex-1 text-center">
              <h3 className="font-extrabold text-slate-900 text-[18px] leading-tight mb-2">{item.title}</h3>
              <p className="text-[12px] text-slate-400 font-bold uppercase tracking-widest mb-4">
                {item.lesson || 'Tiết N/A'} • Lớp {item.target_class}
              </p>
              
              <div className="flex items-center justify-center gap-2 mt-auto pt-4 border-t border-slate-50">
                <button onClick={() => handleDelete(item.id)} className="flex-1 py-3.5 rounded-2xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 font-black text-[10px] flex flex-col items-center justify-center transition-all">
                  <span className="material-symbols-outlined mb-1 text-[18px]">delete</span>
                  XÓA
                </button>
                {item.has_video ? (
                  <button className="flex-1 py-3.5 rounded-2xl bg-blue-500 text-white font-black text-[10px] flex flex-col items-center justify-center transition-all shadow-lg shadow-blue-500/20 active:scale-95 uppercase tracking-wide">
                    <span className="material-symbols-outlined mb-1 text-[18px]">play_circle</span>
                    VIDEO
                  </button>
                ) : (
                  <button className="flex-1 py-3.5 rounded-2xl bg-green-500 text-white font-black text-[10px] flex flex-col items-center justify-center transition-all shadow-lg shadow-green-500/20 active:scale-95 uppercase tracking-wide">
                    <span className="material-symbols-outlined mb-1 text-[18px]">add_link</span>
                    LIÊN KẾT
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Modal Upload Ảnh */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => !isUploading && setShowUploadModal(false)}></div>
          <div className="relative bg-white w-full max-w-5xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            <div className="w-full md:w-1/2 bg-slate-50 p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              
              {!selectedFile ? (
                  <div onClick={() => fileInputRef.current?.click()} className="w-full max-w-sm border-4 border-dashed border-primary/20 rounded-[32px] p-12 flex flex-col items-center justify-center text-center hover:bg-primary/5 transition-all group cursor-pointer bg-white">
                    <div className="w-20 h-20 bg-primary/10 rounded-[24px] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all">
                      <span className="material-symbols-outlined text-primary text-5xl">cloud_upload</span>
                    </div>
                    <h4 className="text-xl font-black text-slate-900 mb-2">Kéo & thả ảnh vào đây</h4>
                    <p className="text-sm text-slate-500 font-bold mb-8">Hoặc nhấn để chọn từ máy tính</p>
                    <button type="button" className="px-8 py-3 bg-white border-2 border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm hover:shadow-md transition-all">
                      Chọn tệp tin
                    </button>
                  </div>
              ) : (
                  <div className="mt-10 w-full max-w-sm">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[3px] mb-4 opacity-70">Đang chuẩn bị upload (01)</p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="size-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 border-2 border-white">
                          <img className="w-full h-full object-cover" src={previewUrl!} alt="upload preview" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-black text-slate-800 truncate">{selectedFile.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <button type="button" onClick={removeFile} className="text-slate-300 hover:text-red-500 transition-colors p-2" disabled={isUploading}>
                          <span className="material-symbols-outlined !text-[20px]">close</span>
                        </button>
                      </div>
                    </div>
                  </div>
              )}
            </div>

            <div className="w-full md:w-1/2 p-10 overflow-y-auto">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-slate-900">Thông tin bài học</h3>
                <button type="button" onClick={() => !isUploading && setShowUploadModal(false)} className="p-3 hover:bg-slate-100 rounded-2xl transition-all">
                  <span className="material-symbols-outlined text-slate-400">close</span>
                </button>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-black uppercase text-slate-400 ml-1 tracking-widest">Module</label>
                    <select name="module" value={formData.module} onChange={handleChange} className="w-full bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 text-sm font-bold h-12 px-4 shadow-sm transition-all focus:bg-white text-slate-900">
                      <option value="">Chọn Module</option>
                      {[1, 2, 3, 4, 5, 6].map(m => <option key={m} value={`Module ${m}`}>Module {m}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-black uppercase text-slate-400 ml-1 tracking-widest">Tiết học</label>
                    <select name="lesson" value={formData.lesson} onChange={handleChange} className="w-full bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 text-sm font-bold h-12 px-4 shadow-sm transition-all focus:bg-white text-slate-900">
                      <option value="">Chọn Tiết</option>
                      <option value="Tiết 1">Tiết 1</option>
                      <option value="Tiết 2">Tiết 2</option>
                      <option value="Tiết 3">Tiết 3</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-black uppercase text-slate-400 ml-1 tracking-widest">Lớp học <span className="text-red-500">*</span></label>
                    <select name="target_class" value={formData.target_class} onChange={handleChange} className="w-full bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 text-sm font-bold h-12 px-4 shadow-sm transition-all focus:bg-white text-slate-900" required>
                      <option value="">Chọn Lớp</option>
                      <option value="Mầm 1">Mầm 1</option>
                      <option value="Chồi 1">Chồi 1</option>
                      <option value="Lá 1">Lá 1</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-black uppercase text-slate-400 ml-1 tracking-widest">Ngày thực hiện</label>
                    <input name="date" value={formData.date} onChange={handleChange} className="w-full bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 text-sm font-bold h-12 px-4 shadow-sm transition-all focus:bg-white text-slate-900" type="date" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-black uppercase text-slate-400 ml-1 tracking-widest">Chủ đề / Hoạt động <span className="text-red-500">*</span></label>
                  <input name="title" value={formData.title} onChange={handleChange} className="w-full bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 text-sm font-bold h-12 px-5 shadow-sm transition-all focus:bg-white placeholder:text-slate-400 placeholder:font-bold text-slate-900" placeholder="Ví dụ: Thực hành robot" type="text" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-black uppercase text-slate-400 ml-1 tracking-widest">Mô tả ngắn</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} className="w-full bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 text-sm font-bold p-5 shadow-sm transition-all focus:bg-white placeholder:text-slate-400 placeholder:font-bold resize-none text-slate-900" placeholder="Ghi chú thêm về hoạt động này..." rows={3}></textarea>
                </div>
                <div className="pt-6 flex flex-col sm:flex-row gap-4">
                  <button disabled={isUploading} className="flex-1 bg-primary text-white py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-[2px] disabled:opacity-50 disabled:hover:scale-100" type="submit">
                    {isUploading ? 'Đang tải lên...' : 'Lưu ngay'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
