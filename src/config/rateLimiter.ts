/**
 * Config: Rate Limiter
 * Chống brute-force tấn công tài khoản
 *
 * Chiến lược:
 *  - loginLimiter:    5 lần / 5 phút / IP cho endpoint đăng nhập
 *  - registerLimiter: 3 lần / 1 giờ / IP để chặn tạo số lượng lớn tài khoản
 *  - apiLimiter:      100 lần / 15 phút / IP cho toàn bộ API (general)
 */
import rateLimit from 'express-rate-limit';

/**
 * Rate limiter cho /api/login
 * Chặn brute-force password
 */
export const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 phút
    max: 5,                    // Max 5 request / IP / 5 phút
    standardHeaders: true,     // Gửi header `RateLimit-*` (chuẩn RFC 6585)
    legacyHeaders: false,
    skipSuccessfulRequests: true, // Không tính request thành công
    message: {
        success: false,
        error: 'Quá nhiều lần thử đăng nhập. Vui lòng thử lại sau 5 phút!',
        code: 'RATE_LIMITED',
    },
    handler: (req, res, _next, options) => {
        console.warn(`[RATE LIMIT] Đăng nhập từ IP ${req.ip} bị chặn`);
        res.status(429).json(options.message);
    },
});

/**
 * Rate limiter cho /api/register
 * Chặn tạo hàng loạt tài khoản (spam registration)
 */
export const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 giờ
    max: 3,                    // Max 3 lần đăng ký / IP / giờ
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        error: 'Quá nhiều yêu cầu đăng ký. Vui lòng thử lại sau 1 giờ!',
        code: 'RATE_LIMITED',
    },
    handler: (req, res, _next, options) => {
        console.warn(`[RATE LIMIT] Đăng ký từ IP ${req.ip} bị chặn`);
        res.status(429).json(options.message);
    },
});

/**
 * Rate limiter chung cho toàn bộ API
 */
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        error: 'Quá nhiều yêu cầu từ IP của bạn. Vui lòng thử lại sau!',
        code: 'RATE_LIMITED',
    },
});
