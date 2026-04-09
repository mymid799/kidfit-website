import { Request, Response, NextFunction } from 'express';
import Class from '../../modules/class/class.model.js';
import StaffProfile from '../../modules/user/staffProfile.model.js';

/**
 * Middleware kiểm tra quyền sở hữu hoặc quản lý theo Block / Lớp
 * Dùng sau authenticate
 */
export const checkAccessRights = (resourceType: 'LESSON' | 'CLASS' | 'TOOL') => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!user) return res.status(401).json({ success: false, error: 'Chưa xác thực!' });

        const { role } = user;

        // Admin IT & Hiệu trưởng: Toàn quyền
        if (role === 'it_admin' || role === 'principal' || role === 'admin') {
            return next();
        }

        const staffProfile = await StaffProfile.findOne({ where: { user_id: user.user_id } });
        if (!staffProfile) return res.status(403).json({ success: false, error: 'Không tìm thấy hồ sơ nhân sự!' });

        // Gán profile vào request để các route sau sử dụng nếu cần
        (req as any).staffProfile = staffProfile;

        // Logic phân quyền theo ma trận
        if (role === 'specialist') {
            // Tổ trưởng: Chỉ quản lý khối của mình
            // Ví dụ: req.query.grade_block phải khớp với staffProfile.class_group
            // (Cần logic mapping class_group -> grade_block ở đây)
            return next();
        }

        if (role === 'class_teacher') {
            // Giáo viên: Chỉ xem/thao tác lớp mình dạy
            // Có thể kiểm tra qua bảng classes
            const myClasses = await Class.findAll({ where: { teacher_id: staffProfile.id } });
            (req as any).myClassIds = myClasses.map(c => c.id);
            return next();
        }

        next();
    };
};
