/**
 * Seed Script: Khởi tạo tài khoản mẫu (Admin, Teacher, Parent)
 * ────────────────────────────────────────────────────────
 * Chạy lệnh: npx tsx src/seed.ts
 */
import bcrypt from 'bcryptjs';
import sequelize from './config/sequelize.js';
import User from './models/User.js';
import ParentProfile from './models/ParentProfile.js';

const seed = async () => {
    try {
        console.log('🌱 Đang khởi tạo dữ liệu mẫu...');
        await sequelize.authenticate();

        // Hash mật khẩu chung cho tất cả tài khoản mẫu
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash('123456', salt);

        // 1. Tạo Admin
        const [admin, adminCreated] = await User.findOrCreate({
            where: { email: 'admin@kidfit.com' },
            defaults: {
                username: 'admin',
                email: 'admin@kidfit.com',
                password_hash: passwordHash,
                role: 'admin',
                email_verified: true,
                is_active: true
            }
        });
        if (adminCreated) console.log('✅ Đã tạo tài khoản Admin: admin@kidfit.com / 123456');

        // 2. Tạo Giáo viên (Teacher)
        const [teacher, teacherCreated] = await User.findOrCreate({
            where: { email: 'teacher@kidfit.com' },
            defaults: {
                username: 'teacher',
                email: 'teacher@kidfit.com',
                password_hash: passwordHash,
                role: 'teacher',
                email_verified: true,
                is_active: true
            }
        });
        if (teacherCreated) console.log('✅ Đã tạo tài khoản Giáo viên: teacher@kidfit.com / 123456');

        // 3. Tạo Phụ huynh mẫu (Parent)
        const [parentUser, parentCreated] = await User.findOrCreate({
            where: { email: 'parent@kidfit.com' },
            defaults: {
                username: 'parent',
                email: 'parent@kidfit.com',
                password_hash: passwordHash,
                role: 'parent',
                email_verified: true,
                is_active: true
            }
        });

        if (parentCreated) {
            await ParentProfile.create({
                user_id: parentUser.id,
                parent_name: 'Phụ huynh mẫu',
                child_name_anonymous: 'Bé Mầm',
                child_age: 4,
                phone: '0912345678'
            });
            console.log('✅ Đã tạo tài khoản Phụ huynh: parent@kidfit.com / 123456');
        }

        console.log('🌱 Hoàn tất khởi tạo dữ liệu mẫu!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Lỗi SEED dữ liệu:', error);
        process.exit(1);
    }
};

seed();
