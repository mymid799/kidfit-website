import React, { useState } from 'react';

// ============================================================
// SYSTEM SETTINGS COMPONENT
// ============================================================
type SettingsSection = 'general' | 'notifications' | 'backup' | 'logs';

const SystemSettings = () => {
    const [activeSection, setActiveSection] = useState<SettingsSection>('general');
    const [schoolName, setSchoolName] = useState('KidsFit STEAM International Academy');
    const [slogan, setSlogan] = useState('Nurturing Tomorrow\'s Explorers');
    const [autoBackup, setAutoBackup] = useState(true);
    const [broadcastTarget, setBroadcastTarget] = useState('parents');
    const [broadcastMessage, setBroadcastMessage] = useState('');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        }, 1000);
    };

    const sectionNav = [
        { id: 'general' as const, icon: 'settings', label: 'Cấu hình chung', color: 'bg-primary text-white' },
        { id: 'notifications' as const, icon: 'campaign', label: 'Thông báo', color: 'bg-secondary text-white' },
        { id: 'backup' as const, icon: 'security', label: 'Sao lưu & Bảo mật', color: 'bg-amber-500 text-white' },
        { id: 'logs' as const, icon: 'history_edu', label: 'Nhật ký hệ thống', color: 'bg-slate-800 text-white' },
    ];

    const recentNotifications = [
        { title: 'Thông báo nghỉ lễ Giỗ tổ Hùng Vương', time: '2 giờ trước', count: 420, status: 'success' },
        { title: 'Nhắc lịch tiêm chủng mở rộng đợt 2', time: 'Hôm qua', count: 158, status: 'success' },
        { title: 'Thông báo đóng học phí tháng 3', time: '3 ngày trước', count: 380, status: 'success' },
    ];

    const activityLogs = [
        { time: '14:02:11', message: "Admin (admin_01) đã thay đổi cấu hình 'Phụ huynh'.", type: 'info' },
        { time: '13:58:45', message: 'Hệ thống gửi thành công 120 SMS OTP.', type: 'warning' },
        { time: '13:45:02', message: 'Lỗi kết nối API thanh toán - Đang thử lại...', type: 'error' },
        { time: '13:30:10', message: 'Tự động sao lưu thành công (Database_Main).', type: 'info' },
        { time: '13:15:22', message: 'Đăng nhập mới từ IP: 192.168.1.105 (Hà Nội).', type: 'info' },
        { time: '12:45:00', message: 'Cập nhật hệ thống lên phiên bản v2.4.5.', type: 'info' },
        { time: '12:20:33', message: 'Backup tự động đã hoàn tất (12.4GB).', type: 'info' },
        { time: '11:55:10', message: 'Phụ huynh (PH_042) đã đổi mật khẩu.', type: 'warning' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-800">Cài đặt hệ thống</h2>
                    <p className="text-slate-500 font-semibold mt-1">Quản lý cấu hình toàn diện cho hệ thống KidsFit STEAM.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-2xl text-xs font-black uppercase tracking-wider">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                        Hệ thống: Tốt
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 text-xs tracking-widest uppercase disabled:opacity-70"
                    >
                        <span className={`material-symbols-outlined text-sm ${saving ? 'animate-spin' : ''}`}>
                            {saving ? 'progress_activity' : saved ? 'check_circle' : 'save'}
                        </span>
                        {saving ? 'Đang lưu...' : saved ? 'Đã lưu!' : 'Lưu thay đổi'}
                    </button>
                </div>
            </div>

            {/* Alert Banner */}
            <div className="flex items-center justify-between p-5 bg-amber-50 border border-amber-200 rounded-[24px] shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-amber-600 text-2xl">warning</span>
                    </div>
                    <div>
                        <h4 className="font-black text-amber-800 text-sm">Cảnh báo bảo mật</h4>
                        <p className="text-xs text-amber-600 font-medium mt-0.5">Hệ thống chưa được sao lưu dữ liệu trong 7 ngày qua. Vui lòng thực hiện sao lưu ngay.</p>
                    </div>
                </div>
                <button
                    onClick={() => setActiveSection('backup')}
                    className="px-5 py-2.5 bg-amber-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-wider hover:bg-amber-600 transition-all active:scale-95 shadow-md shadow-amber-500/20 whitespace-nowrap"
                >
                    Sao lưu ngay
                </button>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-8">
                {/* Left Sidebar Navigation */}
                <div className="col-span-12 lg:col-span-3 space-y-3">
                    {sectionNav.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-[20px] transition-all text-left ${
                                activeSection === item.id
                                    ? `${item.color} shadow-lg scale-[1.02]`
                                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100 shadow-sm'
                            }`}
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span className="font-black text-sm">{item.label}</span>
                        </button>
                    ))}

                    {/* Server Health Widget */}
                    <div className="mt-6 p-6 bg-white rounded-[24px] shadow-sm border border-slate-100">
                        <h5 className="text-[10px] font-black uppercase tracking-[2px] text-slate-400 mb-5">Sức khỏe máy chủ</h5>
                        <div className="space-y-5">
                            <div>
                                <div className="flex justify-between items-center text-sm mb-2">
                                    <span className="font-bold text-slate-600">CPU</span>
                                    <span className="font-black text-primary">12%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className="bg-primary h-2 rounded-full transition-all duration-1000" style={{ width: '12%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center text-sm mb-2">
                                    <span className="font-bold text-slate-600">RAM</span>
                                    <span className="font-black text-secondary">4.2 / 8 GB</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className="bg-secondary h-2 rounded-full transition-all duration-1000" style={{ width: '52%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center text-sm mb-2">
                                    <span className="font-bold text-slate-600">Disk</span>
                                    <span className="font-black text-amber-500">28.4 / 50 GB</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className="bg-amber-400 h-2 rounded-full transition-all duration-1000" style={{ width: '57%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Config Area */}
                <div className="col-span-12 lg:col-span-9 space-y-8">
                    {/* ====== Section: Cấu hình chung ====== */}
                    {activeSection === 'general' && (
                        <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 relative overflow-hidden animate-in fade-in duration-300">
                            <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
                                <span className="material-symbols-outlined text-[120px]">school</span>
                            </div>
                            <h3 className="text-xl font-black mb-8 flex items-center gap-3 uppercase tracking-tight">
                                <span className="w-2 h-8 bg-primary rounded-full"></span>
                                Cấu hình chung
                            </h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2 md:col-span-1 space-y-2">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Tên trường mầm non</label>
                                    <input
                                        type="text"
                                        value={schoolName}
                                        onChange={e => setSchoolName(e.target.value)}
                                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none font-bold text-slate-700 transition-all"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1 space-y-2">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Khẩu hiệu (Slogan)</label>
                                    <input
                                        type="text"
                                        value={slogan}
                                        onChange={e => setSlogan(e.target.value)}
                                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none font-bold text-slate-700 transition-all"
                                    />
                                </div>
                                <div className="col-span-2 space-y-3">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Nhận diện thương hiệu</label>
                                    <div className="flex items-center gap-8 p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-primary/30 transition-colors">
                                        <div className="w-28 h-28 bg-slate-100 rounded-2xl flex flex-col items-center justify-center relative group cursor-pointer overflow-hidden shadow-inner">
                                            <img
                                                alt="Logo trường"
                                                className="w-full h-full object-contain p-2"
                                                src="/assets/logo/mainlogo.png"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                                                <span className="material-symbols-outlined text-white text-2xl">upload</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <p className="text-xs text-slate-500 font-medium">Tải lên Logo chính thức của trường. Định dạng yêu cầu: .png, .svg. Kích thước tối đa 2MB.</p>
                                            <div className="flex gap-3 items-center">
                                                <div className="w-9 h-9 rounded-full bg-primary shadow-md ring-4 ring-white cursor-pointer hover:scale-110 transition-transform"></div>
                                                <div className="w-9 h-9 rounded-full bg-secondary shadow-md ring-4 ring-white cursor-pointer hover:scale-110 transition-transform"></div>
                                                <div className="w-9 h-9 rounded-full bg-amber-400 shadow-md ring-4 ring-white cursor-pointer hover:scale-110 transition-transform"></div>
                                                <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 hover:bg-slate-200 transition-colors">
                                                    <span className="material-symbols-outlined text-sm text-slate-500">add</span>
                                                </button>
                                                <span className="text-xs font-bold text-slate-500 ml-1">Màu chủ đạo hệ thống</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Settings */}
                                <div className="col-span-2 md:col-span-1 space-y-2">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Email liên hệ</label>
                                    <input
                                        type="email"
                                        defaultValue="admin@kidsfit.edu.vn"
                                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none font-bold text-slate-700 transition-all"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1 space-y-2">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Số điện thoại</label>
                                    <input
                                        type="tel"
                                        defaultValue="028 123 456 789"
                                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none font-bold text-slate-700 transition-all"
                                    />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Địa chỉ</label>
                                    <input
                                        type="text"
                                        defaultValue="123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh"
                                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none font-bold text-slate-700 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end gap-3">
                                <button className="px-6 py-3 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all text-xs tracking-widest uppercase">Hủy bỏ</button>
                                <button
                                    onClick={handleSave}
                                    className="px-8 py-3 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 text-xs tracking-widest uppercase"
                                >
                                    Lưu cấu hình
                                </button>
                            </div>
                        </section>
                    )}

                    {/* ====== Section: Thông báo ====== */}
                    {activeSection === 'notifications' && (
                        <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 animate-in fade-in duration-300">
                            <h3 className="text-xl font-black mb-8 flex items-center gap-3 uppercase tracking-tight">
                                <span className="w-2 h-8 bg-secondary rounded-full"></span>
                                Broadcast thông báo nhanh
                            </h3>
                            <div className="grid grid-cols-12 gap-8">
                                <div className="col-span-12 md:col-span-7 space-y-6">
                                    <div className="space-y-3">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Đối tượng nhận tin</label>
                                        <div className="flex gap-2 flex-wrap">
                                            {[
                                                { id: 'parents', label: 'Tất cả phụ huynh' },
                                                { id: 'teachers', label: 'Giáo viên' },
                                                { id: 'staff', label: 'Nhân viên' },
                                            ].map(t => (
                                                <button
                                                    key={t.id}
                                                    onClick={() => setBroadcastTarget(t.id)}
                                                    className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wide transition-all ${
                                                        broadcastTarget === t.id
                                                            ? 'bg-secondary text-white shadow-md shadow-secondary/20'
                                                            : 'bg-white border-2 border-slate-100 text-slate-500 hover:border-secondary/40'
                                                    }`}
                                                >
                                                    {t.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-1">Nội dung thông báo</label>
                                        <textarea
                                            value={broadcastMessage}
                                            onChange={e => setBroadcastMessage(e.target.value)}
                                            className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-secondary/10 outline-none font-medium text-slate-700 transition-all resize-none"
                                            placeholder="Nhập thông báo gửi đến toàn hệ thống..."
                                            rows={4}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-3">
                                            {['image', 'attach_file', 'schedule'].map(icon => (
                                                <button key={icon} className="p-2.5 rounded-xl text-slate-400 hover:text-secondary hover:bg-secondary/10 transition-colors">
                                                    <span className="material-symbols-outlined">{icon}</span>
                                                </button>
                                            ))}
                                        </div>
                                        <button className="px-6 py-3 bg-secondary text-white font-black rounded-2xl shadow-lg shadow-secondary/20 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2 text-xs tracking-widest uppercase">
                                            <span className="material-symbols-outlined text-sm">send</span>
                                            Gửi ngay
                                        </button>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-5">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-4 flex items-center gap-2 px-1">
                                        <span className="material-symbols-outlined text-sm">history</span>
                                        Lịch sử gửi gần đây
                                    </h4>
                                    <div className="space-y-3">
                                        {recentNotifications.map((notif, idx) => (
                                            <div key={idx} className="p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                                                <p className="text-sm font-bold text-slate-800 line-clamp-1">{notif.title}</p>
                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="text-[10px] text-slate-400 font-semibold">Đã gửi: {notif.time}</span>
                                                    <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-1 rounded-full font-black">
                                                        Thành công ({notif.count})
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* ====== Section: Sao lưu & Bảo mật ====== */}
                    {activeSection === 'backup' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-300">
                            {/* Backup */}
                            <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-50">
                                <h3 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-tight">
                                    <span className="material-symbols-outlined text-primary text-2xl">cloud_done</span>
                                    Sao lưu dữ liệu
                                </h3>
                                <div className="p-5 bg-slate-50 rounded-2xl mb-6 space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm font-bold text-slate-500">Bản sao lưu cuối:</span>
                                        <span className="text-sm font-black text-red-500">7 ngày trước</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm font-bold text-slate-500">Dung lượng hiện tại:</span>
                                        <span className="text-sm font-black text-slate-800">12.4 GB</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm font-bold text-slate-500">Số bản sao lưu:</span>
                                        <span className="text-sm font-black text-slate-800">24 bản</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-slate-400">update</span>
                                            <span className="text-sm font-bold text-slate-700">Sao lưu tự động</span>
                                        </div>
                                        <button
                                            onClick={() => setAutoBackup(!autoBackup)}
                                            className={`relative w-12 h-7 rounded-full transition-colors cursor-pointer ${autoBackup ? 'bg-primary' : 'bg-slate-300'}`}
                                        >
                                            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${autoBackup ? 'translate-x-6' : 'translate-x-1'}`}></div>
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-slate-400">schedule</span>
                                            <span className="text-sm font-bold text-slate-700">Tần suất sao lưu</span>
                                        </div>
                                        <select className="px-4 py-2 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none">
                                            <option>Hàng ngày</option>
                                            <option>Hàng tuần</option>
                                            <option>Hàng tháng</option>
                                        </select>
                                    </div>
                                    <button className="w-full py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2 text-xs tracking-widest uppercase">
                                        <span className="material-symbols-outlined text-sm">backup</span>
                                        Sao lưu ngay bây giờ
                                    </button>
                                    <button className="w-full py-4 border-2 border-primary text-primary font-black rounded-2xl hover:bg-primary/5 transition-all text-xs tracking-widest uppercase">
                                        Cấu hình lịch trình sao lưu
                                    </button>
                                </div>
                            </section>

                            {/* Security */}
                            <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-50">
                                <h3 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-tight">
                                    <span className="material-symbols-outlined text-amber-500 text-2xl">shield</span>
                                    Bảo mật hệ thống
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { icon: 'lock', label: 'Xác thực hai yếu tố (2FA)', desc: 'Bật xác thực 2FA cho tài khoản Admin', enabled: true },
                                        { icon: 'vpn_key', label: 'Đăng nhập SSO', desc: 'Hỗ trợ đăng nhập qua Google/Microsoft', enabled: false },
                                        { icon: 'visibility_off', label: 'Mã hóa dữ liệu', desc: 'Mã hóa AES-256 cho dữ liệu nhạy cảm', enabled: true },
                                        { icon: 'gpp_good', label: 'Tường lửa ứng dụng', desc: 'WAF bảo vệ chống DDoS & SQL Injection', enabled: true },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.enabled ? 'bg-primary/10 text-primary' : 'bg-slate-200 text-slate-400'}`}>
                                                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">{item.label}</p>
                                                    <p className="text-[10px] text-slate-400 font-medium">{item.desc}</p>
                                                </div>
                                            </div>
                                            <div className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${item.enabled ? 'bg-primary/10 text-primary' : 'bg-slate-200 text-slate-500'}`}>
                                                {item.enabled ? 'Bật' : 'Tắt'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 p-5 bg-primary/5 rounded-2xl border border-primary/10">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="material-symbols-outlined text-primary">verified_user</span>
                                        <span className="font-black text-sm text-primary">Chứng chỉ SSL</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold text-slate-500">
                                        <span>Hết hạn: 15/12/2026</span>
                                        <span className="text-primary">Hợp lệ ✓</span>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {/* ====== Section: Nhật ký hệ thống ====== */}
                    {activeSection === 'logs' && (
                        <section className="bg-slate-900 rounded-[32px] p-8 shadow-xl animate-in fade-in duration-300">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-black flex items-center gap-3 text-white uppercase tracking-tight">
                                    <span className="material-symbols-outlined text-primary text-2xl">terminal</span>
                                    Activity Logs
                                </h3>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-mono bg-white/10 text-white/80 px-3 py-1.5 rounded-lg flex items-center gap-2">
                                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                        Live View
                                    </span>
                                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all">
                                        Xuất log
                                    </button>
                                </div>
                            </div>

                            {/* Log Filters */}
                            <div className="flex gap-2 mb-6">
                                {['Tất cả', 'Info', 'Warning', 'Error'].map((filter, idx) => (
                                    <button
                                        key={filter}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                                            idx === 0
                                                ? 'bg-white/20 text-white'
                                                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
                                        }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>

                            {/* Log Entries */}
                            <div className="font-mono text-[12px] space-y-2 max-h-[400px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                                {activityLogs.map((log, idx) => (
                                    <div key={idx} className="flex gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors group">
                                        <span className={`shrink-0 ${
                                            log.type === 'error' ? 'text-red-400' : log.type === 'warning' ? 'text-amber-400' : 'text-primary'
                                        }`}>
                                            [{log.time}]
                                        </span>
                                        <span className={`${
                                            log.type === 'error' ? 'text-red-300' : 'text-white/70'
                                        }`}>
                                            {log.message}
                                        </span>
                                        <button className="ml-auto opacity-0 group-hover:opacity-100 text-white/30 hover:text-white/60 transition-all">
                                            <span className="material-symbols-outlined text-sm">content_copy</span>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                    Xem tất cả nhật ký
                                </button>
                                <button className="py-3 px-6 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-sm">delete_sweep</span>
                                    Xóa log cũ
                                </button>
                            </div>
                        </section>
                    )}

                    {/* System Footer */}
                    <div className="flex justify-between items-center pt-6 border-t border-slate-100 text-xs text-slate-400">
                        <div className="flex items-center gap-4 font-medium">
                            <span>© 2024 KidsFit STEAM Management System</span>
                            <span>Phiên bản: 2.4.5 Build-892</span>
                            <a href="#" className="hover:text-primary underline transition-colors">Điều khoản & Bảo mật</a>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></span>
                            <span className="font-black uppercase tracking-widest text-slate-500">Database Syncing</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemSettings;
