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
    // Nếu đang ở môi trường DEV, dùng Ethereal (fake SMTP để test)
    if (process.env.NODE_ENV !== 'production') {
        return nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.EMAIL_USER || 'ethereal-test@ethereal.email',
                pass: process.env.EMAIL_PASS || 'test-pass',
            },
        });
    }

    // Production: Gmail
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, // Dùng App Password của Google
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
    verifyToken: string
): Promise<void> => {
    const appUrl = process.env.APP_URL || 'http://localhost:3000';
    const verifyUrl = `${appUrl}/verify-email?token=${verifyToken}`;

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
                        Cảm ơn bạn đã đăng ký tài khoản tại <strong>Vẽ Tư Duy STEAM</strong>!
                        Vui lòng nhấn vào nút bên dưới để <strong>xác nhận email</strong> và kích hoạt tài khoản của bạn.
                    </p>

                    <!-- CTA Button -->
                    <div style="text-align: center; margin: 32px 0;">
                        <a href="${verifyUrl}"
                           style="display: inline-block; background: linear-gradient(135deg, #4cae4f, #2e7d32); color: #fff;
                                  text-decoration: none; padding: 16px 40px; border-radius: 50px;
                                  font-size: 16px; font-weight: bold; letter-spacing: 0.5px;
                                  box-shadow: 0 4px 15px rgba(76,174,79,0.35);">
                            ✅ Xác nhận tài khoản
                        </a>
                    </div>

                    <p style="color: #718096; font-size: 13px; line-height: 1.6;">
                        Liên kết có hiệu lực trong <strong>24 giờ</strong>.
                        Nếu bạn không tạo tài khoản này, vui lòng bỏ qua email này.
                    </p>
                    <p style="color: #718096; font-size: 12px; word-break: break-all;">
                        Hoặc copy link: <a href="${verifyUrl}" style="color: #4cae4f;">${verifyUrl}</a>
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
