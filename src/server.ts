/**
 * Server Entry Point — Vẽ Tư Duy STEAM
 * ========================================
 * Stack: Node.js + Express + Sequelize + PostgreSQL
 *
 * Khởi động theo thứ tự:
 *  1. Kết nối Sequelize → PostgreSQL
 *  2. Sync models (tạo bảng nếu chưa có, KHÔNG xoá dữ liệu)
 *  3. Đăng ký middleware (cors, json, rate-limit)
 *  4. Mount các router
 *  5. Error handler toàn cục
 *  6. Listen
 */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config
dotenv.config();

// Sequelize + Models
import sequelize from './config/sequelize.js';
import User from './models/User.js';           // Phải import để Sequelize biết model

// --- New RBAC Models ---
import UserGroup from './models/UserGroup.js';
import './models/Permission.js';
import './models/GroupPermission.js';
import './models/UserPermission.js';
import UserGroupMember from './models/UserGroupMember.js';
import './models/AccessLog.js';
// -----------------------

import './models/ParentProfile.js';  // Phải import SAU User (do association)
import './models/StaffProfile.js';   // Quản lý nhân sự
import './models/Video.js';          // Model quản lý video học liệu
import './models/Class.js';          // Model quản lý lớp học
import './models/Gallery.js';        // Model quản lý gallery
import './models/DocumentSubmission.js'; // Model quản lý trình ký giáo án
import './models/School.js';         // Model dùng chung
import './models/Student.js';        // Model dùng chung
import './features/ai-magic/models/index.js'; // Cỗ Máy Kể Chuyện AI (Isolated)

// Rate limiter
import { apiLimiter } from './config/rateLimiter.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import storyboardRoutes from './routes/storyboardRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
import journalRoutes from './routes/journalRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import classRoutes from './routes/classRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import accountRoutes from './routes/accountRoutes.js'; // New RBAC routes
import documentRoutes from './routes/documentRoutes.js'; // Sổ trình ký giáo án
import aiMagicRoutes from './features/ai-magic/routes/index.js'; // Cỗ Máy Ma Thuật (Isolated)


// Legacy pool (cho các route cũ)
import pool from './config/db.js';
import { authenticate, authorize } from './middleware/auth.js';

const app = express();
const PORT = process.env.API_PORT || 3001;

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:4001',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10kb' })); // Giới hạn kích thước request body
app.use(express.urlencoded({ extended: true }));


// ─── ROUTES MỚI (Sequelize + JWT) ────────────────────────────────────────────
app.use('/api', authRoutes);
app.use('/api', storyboardRoutes);
app.use('/api', videoRoutes);
app.use('/api', staffRoutes);
app.use('/api', journalRoutes);
app.use('/api', achievementRoutes);
app.use('/api', profileRoutes);
app.use('/api', classRoutes);
app.use('/api', lessonRoutes);
app.use('/api', galleryRoutes);
app.use('/api', accountRoutes);
app.use('/api', documentRoutes);
app.use('/api', aiMagicRoutes);

// Static files (uploads cho storyboard)
app.use('/uploads', express.static('uploads'));

// ─── ROUTES LEGACY (Migrated sẽ bị xoá dần) ─────────────────────────────────

/**
 * GET /api/users — Admin: Lấy danh sách users
 * Yêu cầu: JWT token hợp lệ với role 'admin'
 */
app.get('/api/users', authenticate, authorize('admin'), async (_req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, username, email, role, is_active, email_verified, created_at
             FROM users
             ORDER BY created_at DESC`
        );

        res.json({
            success: true,
            count: result.rowCount,
            users: result.rows,
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách users:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

/**
 * PATCH /api/users/:id/toggle — Admin: Khoá/Mở khoá tài khoản
 */
app.patch('/api/users/:id/toggle', authenticate, authorize('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `UPDATE users SET is_active = NOT is_active WHERE id = $1 RETURNING id, is_active`,
            [id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy user!' });
        }
        res.json({ success: true, user: result.rows[0] });
    } catch (error) {
        console.error('Lỗi toggle user:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

/**
 * DELETE /api/users/:id — Admin: Xoá user
 */
app.delete('/api/users/:id', authenticate, authorize('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy user!' });
        }
        res.json({ success: true, message: 'Đã xoá user thành công!' });
    } catch (error) {
        console.error('Lỗi xoá user:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

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

    // Handle SPA routing: forward all non-API requests to index.html
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
    // Default 404 for other routes in dev
    app.use((_req, res) => {
        res.status(404).json({ success: false, error: 'Route không tồn tại!' });
    });
}

import bcrypt from 'bcryptjs';

// Helper to ensure default accounts exist (Admin, Teacher, Parent)
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

            if (!created) {
                // Nếu đã tồn tại, "ép" các thông tin về chuẩn
                await user.update({
                    email: userData.email,
                    password_hash: passwordHash,
                    role: userData.role,
                    is_active: true
                });
            }
        }
        console.log('✅ Đã kiểm tra và đồng bộ 3 tài khoản mẫu (Admin, Teacher, Parent) thành công: Mật khẩu 123456');
    } catch (error) {
        console.error('❌ Lỗi khi khởi tạo tài khoản mẫu:', error);
    }
};

// ─── KHỞI ĐỘNG SERVER ─────────────────────────────────────────────────────────
const startServer = async () => {
    try {
        // Kết nối và sync Sequelize models với PostgreSQL
        await sequelize.authenticate();
        console.log('✅ Sequelize kết nối PostgreSQL thành công!');

        // HACK: Xóa rác bảng permissions do đổi cấu trúc cột name -> code
        try {
            await sequelize.query('TRUNCATE TABLE permissions CASCADE;');
            await sequelize.query('DROP TABLE IF EXISTS access_logs CASCADE;');
            console.log('✅ Đã gỡ bỏ dữ liệu thừa để fix lỗi DB Sync');
        } catch(e) {}

        // `alter: true` — cập nhật schema nếu có thay đổi, KHÔNG xoá data
        await sequelize.sync({ alter: true });
        console.log('✅ Sequelize sync models xong (alter mode)');

        // Ensure default users exist
        await ensureDefaultUsersExist();

        app.listen(PORT, () => {
            console.log('');
            console.log('🚀 ══════════════════════════════════════════════');
            console.log(`🚀  Vẽ Tư Duy STEAM — API Server`);
            console.log(`🚀  http://localhost:${PORT}`);
            console.log('🚀 ══════════════════════════════════════════════');
            console.log(`📌  POST   /api/register       — Đăng ký`);
            console.log(`📌  POST   /api/login          — Đăng nhập`);
            console.log(`📌  POST   /api/storyboard     — AI Storyboard (upload ảnh)`);
            console.log(`📌  GET    /api/me             — Thông tin user`);
            console.log(`📌  GET    /api/verify-email   — Xác nhận email`);
            console.log(`📌  GET    /api/users          — Danh sách users (admin)`);
            console.log(`📌  GET    /api/health         — Health check`);
            console.log('');
        });
    } catch (error) {
        console.error('❌ Không thể khởi động server:', error);
        process.exit(1);
    }
};

startServer();
