/**
 * Service: Email (Nodemailer)
 * Gửi email xác nhận đăng ký tài khoản
 *
 * Hỗ trợ:
 *  - Gmail (dùng App Password, không phải mật khẩu tài khoản thường)
 *  - SMTP tuỳ chỉnh (Mailgun, SendGrid, etc.)
 *
 * Để bật gửi email thật, cấu hình biến môi trường:
 *   EMAIL_USER=your-email@gmail.com
 *   EMAIL_PASS=your-app-password  (Gmail → Security → App Passwords)
 */
import nodemailer from 'nodemailer';

// ─── Tạo transporter ──────────────────────────────────────────────────────────
const createTransporter = () => {
    // Nếu đã cấu hình sẵn Email và App Password, dùng luôn Gmail (cho cả DEV lẫn PROD)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // Dùng App Password của Google
            },
        });
    }

    // Nếu chưa cấu hình, dùng Ethereal (fake SMTP để test local)
    return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'ethereal-test@ethereal.email',
            pass: 'test-pass',
        },
    });
};

const transporter = createTransporter();

/**
 * Gửi email xác nhận đăng ký
 * @param toEmail  Email người nhận
 * @param username Tên tài khoản
 * @param verifyToken  Token xác thực (UUID)
 */
export const sendVerificationEmail = async (
    toEmail: string,
    username: string,
    verifyToken: string // Now this holds OTP
): Promise<void> => {

    const mailOptions = {
        from: `"Vẽ Tư Duy STEAM" <${process.env.EMAIL_USER || 've-tu-duy@gmail.com'}>`,
        to: toEmail,
        subject: '🎨 Xác nhận tài khoản Vẽ Tư Duy STEAM của bạn!',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fffe; border-radius: 16px; overflow: hidden; border: 1px solid #e8f5e9;">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #4cae4f, #2e7d32); padding: 40px 30px; text-align: center;">
                    <h1 style="color: #fff; font-size: 28px; margin: 0; font-weight: 900;">🎨 Vẽ Tư Duy STEAM</h1>
                    <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">Học viện Sáng tạo Nhí</p>
                </div>

                <!-- Body -->
                <div style="padding: 40px 30px;">
                    <h2 style="color: #1b5e20; font-size: 22px; margin-bottom: 16px;">Chào mừng, ${username}! 🎉</h2>
                    <p style="color: #4a5568; line-height: 1.7; font-size: 15px;">
                    <p style="color: #4a5568; line-height: 1.7; font-size: 15px;">
                        Cảm ơn bạn đã đăng ký tài khoản tại <strong>Vẽ Tư Duy STEAM</strong>!
                        Dưới đây là <strong>mã xác thực (OTP)</strong> của bạn.
                    </p>

                    <!-- OTP Block -->
                    <div style="text-align: center; margin: 32px 0;">
                        <div style="display: inline-block; background: #e8f5e9; border: 2px dashed #4cae4f; padding: 16px 40px; border-radius: 12px; font-size: 32px; font-weight: 900; letter-spacing: 12px; color: #2e7d32;">
                            ${verifyToken}
                        </div>
                    </div>

                    <p style="color: #718096; font-size: 13px; line-height: 1.6;">
                        Mã xác thực này có hiệu lực trong <strong>10 phút</strong>.
                        Vui lòng nhập nó trở lại ứng dụng để kích hoạt tài khoản.
                        Nếu bạn không tạo tài khoản, hãy bỏ qua email này.
                    </p>
                </div>

                <!-- Footer -->
                <div style="background: #f0fdf4; border-top: 1px solid #e8f5e9; padding: 20px 30px; text-align: center;">
                    <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                        © 2024 Vẽ Tư Duy STEAM · Bảo mật thông tin trẻ em theo chuẩn VN
                    </p>
                </div>
            </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        // Trong DEV mode, in preview URL từ Ethereal
        if (process.env.NODE_ENV !== 'production') {
            console.log(`📧 [DEV] Preview email tại: ${nodemailer.getTestMessageUrl(info)}`);
        }
    } catch (error) {
        // Không throw để không block quá trình đăng ký
        // Người dùng vẫn đăng ký được, chỉ là email chưa gửi được
        console.error('❌ Lỗi gửi email xác nhận:', error);
    }
};

/**
 * Gửi email reset mật khẩu
 * @param toEmail  Email người nhận
 * @param username Tên tài khoản
 * @param resetToken  Token reset (plain, chưa hash)
 */
export const sendPasswordResetEmail = async (
    toEmail: string,
    username: string,
    resetToken: string // Now this holds OTP
): Promise<void> => {

    const mailOptions = {
        from: `"Vẽ Tư Duy STEAM" <${process.env.EMAIL_USER || 've-tu-duy@gmail.com'}>`,
        to: toEmail,
        subject: '🔐 Đặt lại mật khẩu — Vẽ Tư Duy STEAM',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fffe; border-radius: 16px; overflow: hidden; border: 1px solid #e8f5e9;">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #4cae4f, #2e7d32); padding: 40px 30px; text-align: center;">
                    <h1 style="color: #fff; font-size: 28px; margin: 0; font-weight: 900;">🔐 Đặt lại mật khẩu</h1>
                    <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">Vẽ Tư Duy STEAM</p>
                </div>

                <!-- Body -->
                <div style="padding: 40px 30px;">
                    <h2 style="color: #1b5e20; font-size: 22px; margin-bottom: 16px;">Xin chào, ${username}!</h2>
                    <p style="color: #4a5568; line-height: 1.7; font-size: 15px;">
                    <p style="color: #4a5568; line-height: 1.7; font-size: 15px;">
                        Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.
                        Dưới đây là <strong>mã OTP</strong> dùng để đặt lại mật khẩu của bạn.
                    </p>

                    <!-- OTP Block -->
                    <div style="text-align: center; margin: 32px 0;">
                         <div style="display: inline-block; background: #ffebee; border: 2px dashed #f44336; padding: 16px 40px; border-radius: 12px; font-size: 32px; font-weight: 900; letter-spacing: 12px; color: #b71c1c;">
                            ${resetToken}
                        </div>
                    </div>

                    <div style="background: #fff3e0; border: 1px solid #ffe0b2; border-radius: 12px; padding: 16px; margin: 24px 0;">
                        <p style="color: #e65100; font-size: 13px; margin: 0; font-weight: bold;">
                            ⚠️ Lưu ý bảo mật:
                        </p>
                        <ul style="color: #bf360c; font-size: 13px; margin: 8px 0 0; padding-left: 20px; line-height: 1.8;">
                            <li>Mã xác thực có hiệu lực trong <strong>10 phút</strong></li>
                            <li>KHÔNG CHIA SẺ MÃ NÀY và hãy quay lại web để nhập.</li>
                            <li>Nếu bạn không yêu cầu đặt lại mật mã, hãy bỏ qua email này.</li>
                        </ul>
                    </div>
                </div>

                <!-- Footer -->
                <div style="background: #f0fdf4; border-top: 1px solid #e8f5e9; padding: 20px 30px; text-align: center;">
                    <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                        © 2026 Vẽ Tư Duy STEAM · Bảo mật thông tin trẻ em theo chuẩn VN
                    </p>
                </div>
            </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        if (process.env.NODE_ENV !== 'production') {
            console.log(`📧 [DEV] Preview email đặt lại mật khẩu: ${nodemailer.getTestMessageUrl(info)}`);
        }
    } catch (error) {
        console.error('❌ Lỗi gửi email đặt lại mật khẩu:', error);
    }
};

/**
 * Gửi email yêu cầu tư vấn từ landing page
 * @param data  Thông tin người gửi từ form liên hệ
 */
export const sendContactEmail = async (data: {
    name: string;
    phone: string;
    email?: string;
    message: string;
}): Promise<void> => {
    const adminEmail = process.env.EMAIL_USER || 'trangnguyenkids4.0@gmail.com';

    const mailOptions = {
        from: `"Trạng Nguyên Kids 4.0" <${adminEmail}>`,
        to: adminEmail,
        replyTo: data.email || adminEmail,
        subject: `📩 Yêu cầu tư vấn mới — ${data.name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fffe; border-radius: 16px; overflow: hidden; border: 1px solid #e8f5e9;">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #186A3B, #145a32); padding: 32px 30px; text-align: center;">
                    <h1 style="color: #fff; font-size: 24px; margin: 0; font-weight: 900;">📩 Yêu cầu tư vấn mới</h1>
                    <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 13px;">Trạng Nguyên Kids 4.0 — Landing Page</p>
                </div>

                <!-- Body -->
                <div style="padding: 32px 30px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e8f5e9; color: #6b7280; font-size: 13px; width: 140px; font-weight: bold;">👤 Họ và tên</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e8f5e9; color: #111827; font-size: 14px; font-weight: bold;">${data.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e8f5e9; color: #6b7280; font-size: 13px; font-weight: bold;">📞 Điện thoại</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e8f5e9; color: #111827; font-size: 14px;">${data.phone}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e8f5e9; color: #6b7280; font-size: 13px; font-weight: bold;">📧 Email</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e8f5e9; color: #111827; font-size: 14px;">${data.email || '<i style="color:#9ca3af">Không cung cấp</i>'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; color: #6b7280; font-size: 13px; font-weight: bold; vertical-align: top;">💬 Nhu cầu</td>
                            <td style="padding: 10px 0; color: #374151; font-size: 14px; line-height: 1.7;">${data.message.replace(/\n/g, '<br/>')}</td>
                        </tr>
                    </table>
                </div>

                <!-- Footer -->
                <div style="background: #f0fdf4; border-top: 1px solid #e8f5e9; padding: 16px 30px; text-align: center;">
                    <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                        Yêu cầu gửi lúc: ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })} (GMT+7)
                    </p>
                </div>
            </div>
        `,
    };

    const info = await transporter.sendMail(mailOptions);
    if (process.env.NODE_ENV !== 'production') {
        console.log(`📧 [DEV] Preview email liên hệ: ${nodemailer.getTestMessageUrl(info)}`);
    }
};

