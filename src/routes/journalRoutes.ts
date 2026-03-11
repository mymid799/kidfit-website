import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/parent/journals — Phụ huynh xem nhật ký học tập của bé
 * Trả về mock data — chờ khi có model Student/School sẽ kết nối thật
 */
router.get(['/journals/parent', '/parent/journals'], authenticate, authorize('parent'), async (_req, res) => {
    try {
        // Mock journals — sẽ thay bằng DB query khi Student model sẵn sàng
        const journals = [
            {
                id: 1,
                date: new Date().toISOString(),
                content: 'Hôm nay bé rất vui khi tham gia hoạt động vẽ tranh, bé đã tự tô màu được bức tranh "Gia đình yêu thương" một cách sáng tạo và cẩn thận.',
                images: ['https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800'],
                mood: 'vui',
                teacher: { username: 'Cô Minh Anh' },
                student: { full_name: 'Bé Mầm', avatar_url: null },
                created_at: new Date().toISOString()
            },
            {
                id: 2,
                date: new Date(Date.now() - 86400000).toISOString(),
                content: 'Bé hoàn thành xuất sắc bài tập nhận biết hình khối 3D. Trong giờ học STEAM, bé đã ghép được mô hình ngôi nhà từ các khối hình học một cách độc lập.',
                images: [],
                mood: 'hào hứng',
                teacher: { username: 'Cô Lan' },
                student: { full_name: 'Bé Mầm', avatar_url: null },
                created_at: new Date(Date.now() - 86400000).toISOString()
            },
            {
                id: 3,
                date: new Date(Date.now() - 172800000).toISOString(),
                content: 'Bé tham gia tốt các hoạt động thể chất buổi sáng, chạy nhảy cùng các bạn và chia sẻ đồ chơi rất ngoan. Thầy cô rất tự hào về sự tiến bộ của bé.',
                images: ['https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=80&w=800'],
                mood: 'bình thường',
                teacher: { username: 'Cô Minh Anh' },
                student: { full_name: 'Bé Mầm', avatar_url: null },
                created_at: new Date(Date.now() - 172800000).toISOString()
            }
        ];

        res.json({ success: true, journals });
    } catch (error) {
        console.error('Lỗi lấy nhật ký:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

export default router;
