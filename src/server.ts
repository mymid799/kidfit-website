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

// Config
dotenv.config();

// Sequelize + Models
import sequelize from './config/sequelize.js';
import './models/User.js';           // Phải import để Sequelize biết model
import './models/ParentProfile.js';  // Phải import SAU User (do association)
import './models/StaffProfile.js';   // Quản lý nhân sự
import './models/Video.js';          // Model quản lý video học liệu
import './models/Class.js';          // Model quản lý lớp học

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

// Legacy pool (cho các route cũ)
import pool from './config/db.js';
import { authenticate, authorize } from './middleware/auth.js';

const app = express();
const PORT = process.env.API_PORT || 3001;

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
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

// 404 handler
app.use((_req, res) => {
    res.status(404).json({ success: false, error: 'Route không tồn tại!' });
});

// ─── KHỞI ĐỘNG SERVER ─────────────────────────────────────────────────────────
const startServer = async () => {
    try {
        // Kết nối và sync Sequelize models với PostgreSQL
        await sequelize.authenticate();
        console.log('✅ Sequelize kết nối PostgreSQL thành công!');

        // `alter: true` — cập nhật schema nếu có thay đổi, KHÔNG xoá data
        // `force: true` — NGUY HIỂM: xoá và tạo lại bảng (chỉ dùng khi dev)
        await sequelize.sync({ alter: true });
        console.log('✅ Sequelize sync models xong (alter mode)');

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
