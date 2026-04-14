/**
 * Module: Contact Routes
 * POST /api/contact — Nhận yêu cầu tư vấn từ landing page và gửi email về admin
 */
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { sendContactEmail } from '../../shared/services/emailService.js';

const router = express.Router();

router.post(
    '/contact',
    [
        body('name').trim().notEmpty().withMessage('Họ và tên không được để trống.'),
        body('phone').trim().notEmpty().withMessage('Số điện thoại không được để trống.'),
        body('message').trim().notEmpty().withMessage('Nhu cầu tư vấn không được để trống.'),
        body('email').optional({ checkFalsy: true }).isEmail().withMessage('Email không hợp lệ.'),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ success: false, errors: errors.array() });
            return;
        }

        const { name, phone, email, message } = req.body;

        try {
            await sendContactEmail({ name, phone, email, message });
            res.json({ success: true, message: 'Yêu cầu tư vấn đã được gửi thành công!' });
        } catch (error) {
            console.error('❌ Lỗi gửi email liên hệ:', error);
            res.status(500).json({ success: false, message: 'Gửi email thất bại. Vui lòng thử lại sau.' });
        }
    }
);

export default router;
