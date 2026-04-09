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

import User from '../models/User.js';
import Permission from '../models/Permission.js';
import UserGroup from '../models/UserGroup.js';

/**
 * Middleware kiểm tra quyền mở rộng dựa trên RBAC (Role-Based Access Control)
 * Hỗ trợ kiểm tra quyền Kế thừa từ Nhóm (Group) Cộng dồn với Quyền riêng (User Perms)
 *
 * @param permissionCode - Mã code quyền cần kiểm tra (Ví dụ: 'lesson:approve_department')
 */
export const requirePermission = (permissionCode: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ success: false, error: 'Chưa xác thực!' });
        }

        try {
            // Find the user, their direct permissions, and their group's permissions
            const user = await User.findByPk(req.user.user_id, {
                include: [
                    { model: Permission, as: 'permissions', through: { attributes: [] } },
                    { 
                        model: UserGroup, 
                        as: 'groups',
                        include: [{ model: Permission, as: 'Permissions', through: { attributes: [] } }]
                    }
                ]
            });

            if (!user) {
                return res.status(404).json({ success: false, error: 'User không tồn tại!' });
            }

            // Fallback aliases handling
            const directPerms = (user as any).permissions || (user as any).Permissions || [];
            const groups = (user as any).groups || [];

            // 1. Check direct permissions
            const hasDirect = directPerms.some((p: any) => p.code === permissionCode);
            if (hasDirect) return next();

            // 2. Check inherited permissions from groups
            let hasInherited = false;
            for (const group of groups) {
                const groupPerms = group.Permissions || group.permissions || [];
                if (groupPerms.some((p: any) => p.code === permissionCode)) {
                    hasInherited = true;
                    break;
                }
            }

            if (hasInherited) return next();

            // 3. Admin legacy bypass (Optional but recommended for strict safety switchover)
            if (req.user.role === 'admin') return next();

            // Access denied
            return res.status(403).json({
                success: false,
                error: 'Tài khoản của bạn không được cấp quyền thực thi tính năng này!',
                code: 'RBAC_FORBIDDEN',
                missingCode: permissionCode
            });

        } catch (error) {
            console.error('Lỗi check RBAC:', error);
            return res.status(500).json({ success: false, error: 'Lỗi xác thực hệ thống nội bộ!' });
        }
    };
};
