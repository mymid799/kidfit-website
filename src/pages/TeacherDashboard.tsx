import React, { useState } from 'react';

const VideoManagement = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight mb-2 text-slate-900">Quản Lý Video</h2>
          <p className="text-slate-500">Tải lên, tổ chức và quản lý nội dung bài giảng của bạn một cách chuyên nghiệp.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button className="px-5 py-2.5 rounded-xl border border-primary/20 bg-white font-medium hover:bg-primary/5 transition-colors text-slate-700">Xuất báo cáo</button>
          <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md shadow-primary/20">
            <span className="material-symbols-outlined text-sm">add</span> Thêm mới
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Upload Form */}
        <section className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
              <span className="material-symbols-outlined text-primary">upload_file</span>
              Tải lên Video mới
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-slate-700">Tiêu đề bài giảng</label>
                <input className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all focus:outline-none" placeholder="Nhập tên bài giảng..." type="text" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-slate-700">Mô tả nội dung</label>
                <textarea className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none focus:outline-none" placeholder="Nhập nội dung tóm tắt..." rows={3}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-slate-700">File Video</label>
                <div className="border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center hover:bg-primary/5 transition-all cursor-pointer group bg-slate-50 relative overflow-hidden">
                  <span className="material-symbols-outlined text-4xl text-primary/50 group-hover:scale-110 transition-transform mb-2">cloud_upload</span>
                  <p className="text-sm font-medium text-slate-700">Kéo thả file vào đây</p>
                  <p className="text-xs text-slate-400 mt-1">Hỗ trợ MP4, MKV (Tối đa 500MB)</p>
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="video/mp4,video/x-matroska" />
                </div>
              </div>
              <button className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all mt-2">Bắt đầu tải lên</button>
            </div>
          </div>

          {/* Statistics Small Card */}
          <div className="bg-primary p-6 rounded-2xl text-white shadow-lg shadow-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-8xl">cloud</span>
            </div>
            <div className="relative z-10">
              <p className="text-white/80 text-sm mb-1 font-medium">Dung lượng đã dùng</p>
              <h4 className="text-2xl font-bold mb-4">45.8 GB / 100 GB</h4>
              <div className="w-full bg-black/20 rounded-full h-2 mb-2 overflow-hidden">
                <div className="bg-white h-full rounded-full" style={{ width: '45.8%' }}></div>
              </div>
              <p className="text-xs text-white/70">Nâng cấp gói để có thêm không gian lưu trữ</p>
            </div>
          </div>
        </section>

        {/* Video List Table & Notebooks */}
        <section className="lg:col-span-2 space-y-8">
          {/* Table Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="font-bold text-lg text-slate-800">Video đã tải lên</h3>
              <div className="flex items-center bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                <span className="material-symbols-outlined text-slate-400 text-xl mr-2">search</span>
                <input className="bg-transparent border-none text-sm focus:outline-none w-full md:w-48 text-slate-700 placeholder:text-slate-400" placeholder="Tìm kiếm video..." type="text" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-bold">Tiêu đề</th>
                    <th className="px-6 py-4 font-bold">Ngày đăng</th>
                    <th className="px-6 py-4 font-bold">Trạng thái</th>
                    <th className="px-6 py-4 font-bold text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-primary">movie</span>
                        </div>
                        <span className="font-bold text-slate-700">Toán học đại số lớp 10 - Bài 1</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-500">20/10/2023</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-[11px] font-bold uppercase rounded-md tracking-wider">Đã duyệt</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-blue-500"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                        <button className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-orange-500">movie</span>
                        </div>
                        <span className="font-bold text-slate-700">Vật lý hạt nhân căn bản</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-500">18/10/2023</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-amber-100 text-amber-600 text-[11px] font-bold uppercase rounded-md tracking-wider">Đang xử lý</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-blue-500"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                        <button className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Notebook Management Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-bold text-lg text-slate-800">Quản lý Sổ tay học sinh</h3>
                <p className="text-sm font-medium text-slate-500">Phê duyệt và nhận xét các bản ghi chép từ học viên.</p>
              </div>
              <div className="flex items-center bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                <span className="material-symbols-outlined text-slate-400 text-xl mr-2">search</span>
                <input className="bg-transparent border-none text-sm focus:outline-none w-full md:w-56 text-slate-700 placeholder:text-slate-400" placeholder="Tìm học sinh..." type="text" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Notebook Card 1 */}
              <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-start gap-4 hover:border-primary/20 hover:shadow-md transition-all">
                <div className="size-12 rounded-full border-2 border-white shadow-sm overflow-hidden shrink-0">
                  <img className="w-full h-full object-cover" alt="Student" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-800">Trần Văn An</h4>
                    <span className="text-[11px] font-medium text-slate-400">2 giờ trước</span>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3 leading-relaxed">Ghi chép về bài 1: Công thức đạo hàm và các ứng dụng trong thực tiễn...</p>
                  <div className="flex items-center gap-3">
                    <button className="text-[12px] font-bold text-primary hover:text-primary/80 transition-colors">Xem nội dung</button>
                    <span className="size-1 bg-slate-300 rounded-full"></span>
                    <button className="text-[12px] font-bold tracking-wide text-white bg-primary px-3 py-1 rounded-md hover:bg-primary/90 transition-colors">Duyệt sổ tay</button>
                  </div>
                </div>
              </div>

              {/* Notebook Card 2 */}
              <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-start gap-4 hover:border-primary/20 hover:shadow-md transition-all">
                <div className="size-12 rounded-full border-2 border-white shadow-sm overflow-hidden shrink-0">
                  <img className="w-full h-full object-cover" alt="Student" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-800">Lê Thị Hoa</h4>
                    <span className="text-[11px] font-medium text-slate-400">5 giờ trước</span>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3 leading-relaxed">Tóm tắt chương 2 Vật Lý: Các định luật bảo toàn khối lượng và năng lượng...</p>
                  <div className="flex items-center gap-3">
                    <button className="text-[12px] font-bold text-primary hover:text-primary/80 transition-colors">Xem nội dung</button>
                    <span className="size-1 bg-slate-300 rounded-full"></span>
                    <button className="text-[12px] font-bold tracking-wide text-white bg-primary px-3 py-1 rounded-md hover:bg-primary/90 transition-colors">Duyệt sổ tay</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('lessons'); // Default to lessons for immediately viewing new changes

  return (
    <div className="flex h-screen bg-background-light text-slate-900 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-300 z-20">
        <div className="flex flex-col h-full">
          <div className="h-20 flex items-center justify-center md:justify-start md:px-6 border-b border-slate-100">
            <div className="size-10 bg-secondary rounded-xl flex items-center justify-center text-white shadow-md shadow-secondary/20 shrink-0">
              <span className="material-symbols-outlined">school</span>
            </div>
            <h1 className="hidden md:block ml-3 font-black text-xl text-slate-900 tracking-tight">Giáo Viên</h1>
          </div>

          <nav className="flex-1 py-6 px-3 flex flex-col gap-2 overflow-y-auto hide-scrollbar">
            <button
              onClick={() => setActiveTab('classes')}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'classes' ? 'bg-secondary/10 text-secondary font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
            >
              <span className="material-symbols-outlined text-2xl">groups</span>
              <span className="hidden md:block">Lớp Học</span>
            </button>
            <button
              onClick={() => setActiveTab('lessons')}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'lessons' ? 'bg-primary/10 text-primary font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
            >
              <span className="material-symbols-outlined text-2xl">video_settings</span>
              <span className="hidden md:block">Quản Lý Video</span>
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'submissions' ? 'bg-accent/10 text-accent font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
            >
              <span className="material-symbols-outlined text-2xl">assignment_turned_in</span>
              <span className="hidden md:block">Chấm Bài</span>
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'reports' ? 'bg-secondary/10 text-secondary font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
            >
              <span className="material-symbols-outlined text-2xl">analytics</span>
              <span className="hidden md:block">Báo Cáo</span>
            </button>
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" alt="Avatar" className="size-10 rounded-full bg-slate-200 border-2 border-white shadow-sm shrink-0" />
              <div className="hidden md:block overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate">Cô Lan</p>
                <p className="text-xs text-slate-500 truncate">Giáo viên Mỹ thuật</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 md:px-10 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-slate-900">
              {activeTab === 'classes' && 'Tổng Quan Lớp Học'}
              {activeTab === 'lessons' && 'Nội Dung Đào Tạo'}
              {activeTab === 'submissions' && 'Chấm Bài'}
              {activeTab === 'reports' && 'Báo Cáo'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-full font-bold shadow-md shadow-secondary/20 hover:bg-secondary/90 transition-colors">
              <span className="material-symbols-outlined text-xl">add</span>
              <span>Tạo Lớp Mới</span>
            </button>
            <button className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-slate-100"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 hide-scrollbar">
          {activeTab === 'classes' && (
            <div className="max-w-6xl mx-auto space-y-10">

              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="size-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-3xl">groups</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Tổng Học Sinh</p>
                    <p className="text-3xl font-black text-slate-900">124</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-3xl">assignment_turned_in</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Bài Tập Cần Chấm</p>
                    <p className="text-3xl font-black text-slate-900">32</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="size-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-3xl">trending_up</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Tỷ Lệ Hoàn Thành</p>
                    <p className="text-3xl font-black text-slate-900">85%</p>
                  </div>
                </div>
              </div>

              {/* Class List */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-black text-slate-900">Danh Sách Lớp</h3>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                      <input type="text" placeholder="Tìm lớp..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary w-48 transition-all" />
                    </div>
                    <button className="p-2 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 transition-colors">
                      <span className="material-symbols-outlined text-xl">filter_list</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Class Card 1 */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-md uppercase">Lớp Mầm</span>
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-md">Sáng T3, T5</span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900">Lớp Mầm Sáng Tạo A1</h4>
                      </div>
                      <button className="text-slate-400 hover:text-secondary transition-colors">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="material-symbols-outlined text-lg text-slate-400">group</span>
                        <span className="text-sm font-medium">24 Học sinh</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="material-symbols-outlined text-lg text-slate-400">menu_book</span>
                        <span className="text-sm font-medium">Bài 5/12</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-slate-600">Tiến độ lớp học</span>
                        <span className="font-bold text-secondary">45%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-100 flex gap-3">
                      <button className="flex-1 py-2 bg-secondary/10 text-secondary font-bold rounded-xl hover:bg-secondary/20 transition-colors">Vào Lớp</button>
                      <button className="flex-1 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">Chấm Bài (12)</button>
                    </div>
                  </div>

                  {/* Class Card 2 */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-bold rounded-md uppercase">Lớp Chồi</span>
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-md">Chiều T7, CN</span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900">Lớp Chồi Khám Phá B2</h4>
                      </div>
                      <button className="text-slate-400 hover:text-secondary transition-colors">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="material-symbols-outlined text-lg text-slate-400">group</span>
                        <span className="text-sm font-medium">18 Học sinh</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="material-symbols-outlined text-lg text-slate-400">menu_book</span>
                        <span className="text-sm font-medium">Bài 8/12</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-slate-600">Tiến độ lớp học</span>
                        <span className="font-bold text-secondary">70%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-100 flex gap-3">
                      <button className="flex-1 py-2 bg-secondary/10 text-secondary font-bold rounded-xl hover:bg-secondary/20 transition-colors">Vào Lớp</button>
                      <button className="flex-1 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">Chấm Bài (5)</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Submissions to Grade */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-black text-slate-900">Bài Tập Mới Nộp</h3>
                  <button className="text-secondary font-bold text-sm hover:underline flex items-center gap-1">
                    Xem tất cả <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm">
                          <th className="p-4 font-medium">Học Sinh</th>
                          <th className="p-4 font-medium">Bài Tập</th>
                          <th className="p-4 font-medium">Lớp</th>
                          <th className="p-4 font-medium">Thời Gian Nộp</th>
                          <th className="p-4 font-medium text-center">Hành Động</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="size-8 rounded-full bg-slate-200" />
                              <span className="font-bold text-slate-900">Nguyễn Văn A</span>
                            </div>
                          </td>
                          <td className="p-4 font-medium text-slate-700">Vẽ Con Vật Từ Hình Tròn</td>
                          <td className="p-4 text-slate-500">Mầm A1</td>
                          <td className="p-4 text-slate-500">10 phút trước</td>
                          <td className="p-4 text-center">
                            <button className="px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-colors">Chấm Điểm</button>
                          </td>
                        </tr>
                        <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mia" className="size-8 rounded-full bg-slate-200" />
                              <span className="font-bold text-slate-900">Trần Thị B</span>
                            </div>
                          </td>
                          <td className="p-4 font-medium text-slate-700">Sơ Đồ Tư Duy Gia Đình</td>
                          <td className="p-4 text-slate-500">Lá C1</td>
                          <td className="p-4 text-slate-500">1 giờ trước</td>
                          <td className="p-4 text-center">
                            <button className="px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-colors">Chấm Điểm</button>
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Leo" className="size-8 rounded-full bg-slate-200" />
                              <span className="font-bold text-slate-900">Lê Văn C</span>
                            </div>
                          </td>
                          <td className="p-4 font-medium text-slate-700">Thế Giới Dưới Đại Dương</td>
                          <td className="p-4 text-slate-500">Chồi B2</td>
                          <td className="p-4 text-slate-500">Hôm qua</td>
                          <td className="p-4 text-center">
                            <button className="px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-colors">Chấm Điểm</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'lessons' && <VideoManagement />}

          {activeTab !== 'classes' && activeTab !== 'lessons' && (
            <div className="flex h-64 items-center justify-center text-slate-400 font-medium bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
              <div className="text-center">
                <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">construction</span>
                <p className="text-lg">Tính năng đang được phát triển</p>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
