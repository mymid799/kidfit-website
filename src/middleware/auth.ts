/**
 * Middleware: Authentication (JWT Verify)
 * Bảo vệ các route yêu cầu đăng nhập
 *
 * Cách dùng:
 *   router.get('/protected', authenticate, (req, res) => { ... })
 *   router.get('/admin-only', authenticate, authorize('admin'), (req, res) => { ... })
 */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// ─── Kiểu dữ liệu cho payload trong JWT ──────────────────────────────────────
export interface JwtPayload {
    user_id: number;
    username: string;
    role: string;
    iat?: number;
    exp?: number;
}

// Mở rộng Request của Express để gắn thêm thông tin user vào req.user
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

const JWT_SECRET = process.env.JWT_SECRET || 've_tu_duy_steam_secret_key_change_in_prod';

/**
 * Middleware kiểm tra JWT token hợp lệ
 * Token được lấy từ header: Authorization: Bearer <token>
 */
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    // Lấy token từ Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            error: 'Bạn cần đăng nhập để thực hiện thao tác này!',
            code: 'NO_TOKEN',
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Xác minh và giải mã token
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = decoded; // Gắn thông tin user vào request
        next();
    } catch (error: any) {
        // Phân biệt các loại lỗi JWT để trả thông báo phù hợp
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                error: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!',
                code: 'TOKEN_EXPIRED',
            });
        }

        return res.status(401).json({
            success: false,
            error: 'Token không hợp lệ!',
            code: 'INVALID_TOKEN',
        });
    }
};

/**
 * Middleware kiểm tra quyền (role-based authorization)
 * Sử dụng sau `authenticate`
 *
 * @param roles - Danh sách role được phép truy cập
 * @example authorize('admin', 'teacher')
 */
export const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'Chưa xác thực!',
                code: 'UNAUTHENTICATED',
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: 'Bạn không có quyền thực hiện thao tác này!',
                code: 'FORBIDDEN',
                required: roles,
                current: req.user.role,
            });
        }

        next();
    };
};
