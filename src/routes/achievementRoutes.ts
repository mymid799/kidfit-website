import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/achievements/parent — Phụ huynh xem thành tích của bé
 * Trả về mock data — chờ khi có model Student/School sẽ kết nối thật
 */
router.get('/achievements/parent', authenticate, authorize('parent'), async (_req, res) => {
    try {
        // Mock achievements
        const achievements = [
            {
                id: 1,
                title: 'Ngôi Sao Sáng Tạo',
                description: 'Bé đã hoàn thành xuất sắc bài tập vẽ tranh sáng tạo và được bình chọn là tác phẩm đẹp nhất tuần.',
                type: 'sáng tạo',
                badge_icon: 'palette',
                earned_date: new Date(Date.now() - 86400000 * 3).toISOString(),
                student: { full_name: 'Bé Mầm', avatar_url: null }
            },
            {
                id: 2,
                title: 'Vận Động Viên Nhí',
                description: 'Bé tham gia tích cực các hoạt động thể chất và đạt thành tích tốt trong trò chơi vận động.',
                type: 'thể chất',
                badge_icon: 'fitness_center',
                earned_date: new Date(Date.now() - 86400000 * 7).toISOString(),
                student: { full_name: 'Bé Mầm', avatar_url: null }
            },
            {
                id: 3,
                title: 'Học Giỏi Xuất Sắc',
                description: 'Bé hoàn thành tất cả bài tập tuần này đúng hạn và đạt kết quả tốt.',
                type: 'học tập',
                badge_icon: 'school',
                earned_date: new Date(Date.now() - 86400000 * 14).toISOString(),
                student: { full_name: 'Bé Mầm', avatar_url: null }
            },
            {
                id: 4,
                title: 'Bạn Tốt Của Lớp',
                description: 'Bé luôn chia sẻ và giúp đỡ bạn bè, là tấm gương sáng về tinh thần đoàn kết.',
                type: 'rèn luyện',
                badge_icon: 'verified',
                earned_date: new Date(Date.now() - 86400000 * 21).toISOString(),
                student: { full_name: 'Bé Mầm', avatar_url: null }
            }
        ];

        res.json({ success: true, achievements });
    } catch (error) {
        console.error('Lỗi lấy thành tích:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

export default router;
