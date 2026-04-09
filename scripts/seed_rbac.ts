import dotenv from 'dotenv';
dotenv.config();

import sequelize from '../src/config/sequelize.js';
import UserGroup from '../src/models/UserGroup.js';
import Permission from '../src/models/Permission.js';
import GroupPermission from '../src/models/GroupPermission.js';

const INIT_GROUPS = [
    { name: 'Admin IT', description: 'Toàn quyền hệ thống, quản lý bảo mật và kỹ thuật.' },
    { name: 'BGH Nhà Trường', description: 'Ban Giám Hiệu, quản trị nhân sự, báo cáo toàn trường.' },
    { name: 'Tổ Trưởng Bộ Môn', description: 'Trưởng bộ môn, có quyền thẩm định và phê duyệt giáo án.' },
    { name: 'Giáo Viên', description: 'Quản lý lớp học, đăng tin, trình ký giáo án tiết dạy.' },
    { name: 'Phụ Huynh', description: 'Tài khoản Read-Only, theo dõi thông tin học sinh.' }
];

const INIT_PERMS = [
    // Hệ thống
    { code: 'system:view', description: 'Xem cấu hình hệ thống' },
    { code: 'system:modify', description: 'Sửa cấu hình hệ thống' },
    { code: 'rbac:manage', description: 'Quản lý phân quyền' },
    { code: 'logs:view', description: 'Xem nhật ký truy cập' },
    // Tài khoản
    { code: 'user:manage_all', description: 'Thêm/sửa/xoá/khoá toàn bộ tài khoản' },
    { code: 'staff:create', description: 'Tạo tài khoản giáo viên/nhân sự' },
    { code: 'staff:view', description: 'Xem danh sách nhân sự' },
    { code: 'staff:view_department', description: 'Xem nhân sự trong tổ bộ môn' },
    { code: 'profile:edit_own', description: 'Chỉnh sửa Profile cá nhân' },
    // Bài giảng (Lesson)
    { code: 'lesson:create', description: 'Soạn mới bài giảng/tiết học' },
    { code: 'lesson:update', description: 'Chỉnh sửa bài giảng' },
    { code: 'lesson:submit', description: 'Trình duyệt bài giảng lên cấp trên' },
    { code: 'lesson:approve_department', description: 'Phê duyệt/Từ chối bài giảng cấp bộ môn' },
    { code: 'lesson:approve_final', description: 'Chốt duyệt cuối cùng cấp trường' },
    { code: 'lesson:view_public', description: 'Xem giáo trình khung public' },
    // Lớp học
    { code: 'class:manage', description: 'Phân bổ và tạo mới lớp học' },
    { code: 'class:view_assigned', description: 'Chỉ xem các lớp được gán chủ nhiệm' },
    // Tương tác (Học sinh)
    { code: 'journal:create', description: 'Ghi nhật ký điểm số học sinh' },
    { code: 'journal:view_child', description: 'Xem nhật ký của con mình' },
    { code: 'gallery:upload', description: 'Tải thư viện ảnh lên lớp' },
    { code: 'gallery:view_child_class', description: 'Xem thư viện ảnh của lớp con' },
    // Video nền tảng
    { code: 'video:manage', description: 'Đăng tải tư liệu video đào tạo' }
];

async function seed() {
    try {
        console.log('🔄 Đang kết nối Database...');
        await sequelize.authenticate();
        
        console.log('🔄 Đang thiết lập các Nhóm (User Groups)...');
        for (const g of INIT_GROUPS) {
            await UserGroup.findOrCreate({
                where: { name: g.name },
                defaults: g
            });
        }

        console.log('🔄 Đang thiết lập các Quyền (Permissions)...');
        for (const p of INIT_PERMS) {
            await Permission.findOrCreate({
                where: { code: p.code },
                defaults: p
            });
        }
        
        console.log('✅ Khởi tạo Seed Data Nhóm & Quyền phân lớp thành công!');
        process.exit(0);
    } catch (e) {
        console.error('❌ Lỗi:', e);
        process.exit(1);
    }
}

seed();
