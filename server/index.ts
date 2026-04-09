/**
 * Server Entry Point — KidFit
 * ========================================
 * Stack: Node.js + Express + Sequelize + PostgreSQL
 * 
 * Module Architecture:
 *  - core/     → config, middleware, utils
 *  - modules/  → feature-based modules (auth, user, curriculum, gallery, etc.)
 *  - shared/   → shared services (email, AI, etc.)
 */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Op } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config
dotenv.config();

// Sequelize + Models (phải import để Sequelize biết model)
import sequelize from './core/config/database.js';
import './modules/user/user.model.js';
import './modules/user/parentProfile.model.js';
import './modules/user/staffProfile.model.js';
import './modules/user/rolePermission.model.js';
import './modules/curriculum/video/video.model.js';
import './modules/curriculum/lesson/lesson.model.js';
import './modules/curriculum/tool/tool.model.js';
import './modules/class/class.model.js';
import './modules/gallery/gallery.model.js';
import './modules/auth/refreshToken.model.js';

// Rate limiter
import { apiLimiter } from './core/config/rateLimiter.js';

// ─── Module Routes ───────────────────────────────────────────────────────────
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/user/user.routes.js';
import accountRoutes from './modules/account/account.routes.js';
import lessonRoutes from './modules/curriculum/lesson/lesson.routes.js';
import videoRoutes from './modules/curriculum/video/video.routes.js';
import materialRoutes from './modules/curriculum/material.routes.js';
import galleryRoutes from './modules/gallery/gallery.routes.js';
import classRoutes from './modules/class/class.routes.js';
import journalRoutes from './modules/journal/journal.routes.js';
import achievementRoutes from './modules/journal/achievement.routes.js';
import storyboardRoutes from './modules/storyboard/storyboard.routes.js';
import staffRoutes from './modules/staff-admin/staff.routes.js';
import { notificationService } from './modules/notification/notification.service.js';

// Legacy pool (cho các route cũ - sẽ deprecated dần)
import pool from './core/config/db.js';
import { authenticate, authorize } from './core/middleware/auth.js';

const app = express();
const PORT = process.env.API_PORT || 3001;

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:4001',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ─── MOUNT MODULE ROUTES ─────────────────────────────────────────────────────
// II. Auth (login, register, verify-email, /me)
app.use('/api', authRoutes);

// I. Account Management (profile, change password)
app.use('/api', accountRoutes);

// User Management (admin CRUD)
app.use('/api', userRoutes);

// III. Curriculum (lessons, videos, materials)
app.use('/api', lessonRoutes);
app.use('/api', videoRoutes);
app.use('/api', materialRoutes);

// IV. Gallery + Comments
app.use('/api', galleryRoutes);

// V. Staff Admin
app.use('/api', staffRoutes);

// VI. Super Admin (dashboard, system config) — managed via userRoutes + other modules

// VII. Storyboard (AI)
app.use('/api', storyboardRoutes);

// Other modules
app.use('/api', classRoutes);
app.use('/api', journalRoutes);
app.use('/api', achievementRoutes);

// Static files (uploads)
app.use('/uploads', express.static('uploads'));

// ─── ROUTES LEGACY (sẽ xoá dần) ─────────────────────────────────────────────

/**
 * GET /api/health — Kiểm tra trạng thái hệ thống
 */
app.get('/api/health', async (_req, res) => {
    try {
        await pool.query('SELECT 1');
        let sequelizeStatus = 'ok';
        try {
            await sequelize.authenticate();
        } catch (e) {
            sequelizeStatus = 'error';
        }

        res.json({
            status: 'ok',
            db: 'connected',
            sequelize: sequelizeStatus,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Health check error:', error);
        res.status(500).json({ status: 'error', db: 'disconnected' });
    }
});

// ─── GLOBAL ERROR HANDLER ────────────────────────────────────────────────────
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('❌ Unhandled Error:', err);
    res.status(err.status || 500).json({
        success: false,
        error: process.env.NODE_ENV === 'production'
            ? 'Đã có lỗi hệ thống xảy ra!'
            : err.message,
    });
});

// 404 handler for API routes
app.use('/api', (_req, res) => {
    res.status(404).json({ success: false, error: 'API route không tồn tại!' });
});

// Serve static files from the Vite build directory in production
if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, '../dist');
    console.log(`📂 Chế độ Production: Đang phục vụ file tĩnh tại ${distPath}`);
    
    app.use(express.static(distPath));

    app.get('*', (req, res) => {
        if (!req.path.startsWith('/api')) {
            const indexPath = path.join(distPath, 'index.html');
            res.sendFile(indexPath, (err) => {
                if (err) {
                    console.error(`❌ Không tìm thấy file index.html tại: ${indexPath}`);
                    res.status(500).send('Ứng dụng chưa được build hoặc thiếu file index.html!');
                }
            });
        }
    });
} else {
    app.use((_req, res) => {
        res.status(404).json({ success: false, error: 'Route không tồn tại!' });
    });
}

import User from './modules/user/user.model.js';
import bcrypt from 'bcryptjs';

// Helper to ensure default accounts exist
const ensureDefaultUsersExist = async () => {
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash('123456', salt);
        
        const defaultUsers = [
            { username: 'admin', email: 'admin@kidfit.com', role: 'admin' as const },
            { username: 'teacher', email: 'teacher@kidfit.com', role: 'teacher' as const },
            { username: 'parent', email: 'parent@kidfit.com', role: 'parent' as const }
        ];

        for (const userData of defaultUsers) {
            const [user, created] = await User.findOrCreate({
                where: { username: userData.username },
                defaults: {
                    ...userData,
                    password_hash: passwordHash,
                    email_verified: true,
                    is_active: true
                }
            });

            if (created) {
                console.log(`   ✅ Tạo tài khoản mẫu: ${userData.username}`);
            }
            // Không reset mật khẩu mỗi lần boot để bảo mật
        }
        console.log('✅ Đã kiểm tra và đồng bộ 3 tài khoản mẫu (Admin, Teacher, Parent) thành công: Mật khẩu 123456');
    } catch (error) {
        console.error('❌ Lỗi khi khởi tạo tài khoản mẫu:', error);
    }
};

import { Role, Permission, RolePermission } from './modules/user/rolePermission.model.js';

const seedRolesAndPermissions = async () => {
    try {
        // 1. Tạo các Modules/Permissions
        const modules = ['account', 'user', 'class', 'lesson', 'gallery', 'iot', 'report', 'setting'];
        const actions: ('C' | 'R' | 'U' | 'D')[] = ['C', 'R', 'U', 'D'];
        
        for (const mod of modules) {
            for (const act of actions) {
                await Permission.findOrCreate({
                    where: { module_name: mod, action: act },
                    defaults: { description: `${act} on ${mod}` }
                });
            }
        }

        // 2. Tạo Roles
        const roles = [
            { name: 'it_admin', display_name: 'Quản trị hệ thống (IT)' },
            { name: 'principal', display_name: 'Ban Giám Hiệu' },
            { name: 'specialist', display_name: 'Tổ trưởng Chuyên môn' },
            { name: 'class_teacher', display_name: 'Giáo viên Chủ nhiệm' },
            { name: 'parent', display_name: 'Phụ huynh' }
        ];

        for (const r of roles) {
            const [roleInstance] = await Role.findOrCreate({
                where: { name: r.name },
                defaults: { display_name: r.display_name }
            });

            // 3. Phân quyền mặc định (Demo)
            if (r.name === 'it_admin' || r.name === 'principal') {
                const allPerms = await Permission.findAll();
                await (roleInstance as any).setPermissions(allPerms);
            } else if (r.name === 'class_teacher') {
                const teacherPerms = await Permission.findAll({
                    where: { 
                        module_name: { [Op.in]: ['lesson', 'gallery', 'class'] }
                    }
                });
                await (roleInstance as any).setPermissions(teacherPerms);
            }
        }
        console.log('✅ Đã đồng bộ Ma trận vai trò & Phân quyền');
    } catch (error) {
        console.error('❌ Lỗi seed roles:', error);
    }
};

// ─── KHỞI ĐỘNG SERVER ─────────────────────────────────────────────────────────
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Sequelize kết nối PostgreSQL thành công!');

        await sequelize.sync({ alter: true });
        console.log('✅ Sequelize sync models xong (alter mode)');

        await seedRolesAndPermissions();
        await ensureDefaultUsersExist();

        app.listen(PORT, () => {
            console.log('');
            console.log('🚀 ══════════════════════════════════════════════');
            console.log(`🚀  KidFit — API Server (Modular Architecture)`);
            console.log(`🚀  http://localhost:${PORT}`);
            console.log('🚀 ══════════════════════════════════════════════');
            console.log('');
            console.log('📦 Modules loaded:');
            console.log('   ├── auth       (login, register, verify-email)');
            console.log('   ├── account    (profile, change password)');
            console.log('   ├── user       (admin CRUD)');
            console.log('   ├── curriculum (lessons, videos)');
            console.log('   ├── gallery    (photos, comments)');
            console.log('   ├── staff      (staff admin)');
            console.log('   ├── class      (class management)');
            console.log('   ├── journal    (journals, achievements)');
            console.log('   └── storyboard (AI storyboard)');
            console.log('');
        });
    } catch (error) {
        console.error('❌ Không thể khởi động server:', error);
        process.exit(1);
    }
};

startServer();
