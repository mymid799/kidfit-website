import express from 'express';
import cors from 'cors';
import pool from './config/db.js';

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Khởi tạo bảng Users nếu chưa có
const initDB = async () => {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        parent_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log('✅ Bảng "users" đã sẵn sàng.');
    } catch (err) {
        console.error('❌ Lỗi khởi tạo bảng:', err);
    }
};

initDB();

// API Đăng ký
app.post('/api/register', async (req, res) => {
    try {
        const { parentName, email, phone, password } = req.body;

        // Kiểm tra đầu vào (validation đơn giản)
        if (!parentName || !email || !phone || !password) {
            return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin!' });
        }

        // Hash password thực tế nên dùng bcrypt, ở đây lưu tạm trong project demo
        // Tuyệt đối không dùng plain text trong production thực tế
        const passwordHash = password;

        // Kiểm tra email đã tồn tại hay chưa
        const userCheck = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ error: 'Email này đã được đăng ký!' });
        }

        // Thêm vào database
        const result = await pool.query(
            'INSERT INTO users (parent_name, email, phone, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, parent_name, email',
            [parentName, email, phone, passwordHash]
        );

        res.status(201).json({
            message: 'Đăng ký thành công!',
            user: result.rows[0]
        });
    } catch (error) {
        console.error('Lỗi khi đăng ký:', error);
        res.status(500).json({ error: 'Lỗi server, vui lòng thử lại sau!' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 API Server đang chạy tại http://localhost:${PORT}`);
});
