import express, { Request, Response } from 'express';
import { Op } from 'sequelize';
import CurriculumLesson from './lesson/lesson.model.js';
import TeachingTool from './tool/tool.model.js';
import { authenticate, authorize } from '../../core/middleware/auth.js';
import StaffProfile from '../user/staffProfile.model.js';

const router = express.Router();

/**
 * ==========================================
 * GIÁO TRÌNH (LESSONS)
 * ==========================================
 */

router.get('/teacher/materials/lessons', authenticate, authorize('it_admin', 'principal', 'specialist', 'class_teacher', 'admin', 'teacher'), async (req: Request, res: Response) => {
    try {
        const { search, type, grade_block, status } = req.query;
        const user = req.user!;
        let whereClause: any = {};

        // Phân quyền tải danh sách giáo án dựa trên StaffProfile
        const staff = await StaffProfile.findOne({ where: { user_id: user.user_id } });

        if (user.role === 'class_teacher' && staff) {
            // Giáo viên chỉ xem giáo án của mình HOẶC giáo án của KHỐI mình đã được DUYỆT
            whereClause = {
                [Op.or]: [
                    { creator_id: user.user_id },
                    { 
                        status: 'APPROVED',
                        grade_block: staff.grade_block === 'ALL' ? { [Op.ne]: null } : staff.grade_block 
                    }
                ]
            };
        } else if (user.role === 'specialist' && staff) {
            // Tổ trưởng xem tất cả giáo án của KHỐI mình (để duyệt)
            if (staff.grade_block !== 'ALL') {
                whereClause.grade_block = staff.grade_block;
            }
        } else if (user.role === 'principal' || user.role === 'it_admin' || user.role === 'admin') {
            // Hiệu trưởng xem toàn trường, cho phép lọc qua query
            if (grade_block && grade_block !== 'ALL') whereClause.grade_block = grade_block;
        }

        if (search) {
            whereClause = {
                ...whereClause,
                [Op.or]: [
                    { title: { [Op.iLike]: `%${search}%` } },
                    { description: { [Op.iLike]: `%${search}%` } }
                ]
            };
        }

        if (type && type !== 'ALL') whereClause.content_type = type;
        if (grade_block && grade_block !== 'ALL') whereClause.grade_block = grade_block;
        if (status) whereClause.status = status;

        const lessons = await CurriculumLesson.findAll({
            where: whereClause,
            order: [['created_at', 'DESC']],
        });

        res.json({ success: true, data: lessons });
    } catch (error) {
        console.error('Lỗi lấy danh sách giáo trình:', error);
        res.status(500).json({ success: false, error: 'Lỗi server' });
    }
});

/** Thêm giáo trình mới */
router.post('/teacher/materials/lessons', authenticate, authorize('it_admin', 'principal', 'specialist', 'class_teacher', 'admin', 'teacher'), async (req: Request, res: Response) => {
    try {
        const { title, description, content_type, file_url, tags, grade_block } = req.body;
        const user = req.user!;
        
        let initialStatus = 'PENDING';
        if (user.role === 'it_admin' || user.role === 'principal' || user.role === 'admin') {
            initialStatus = 'APPROVED';
        }

        const newLesson = await CurriculumLesson.create({
            title,
            description,
            content_type,
            file_url,
            tags: tags || [],
            grade_block: grade_block || 'ALL',
            creator_id: user.user_id,
            status: initialStatus as any,
            is_active: true
        });
        res.status(201).json({ success: true, data: newLesson });
    } catch (error) {
        console.error('Lỗi tạo giáo trình:', error);
        res.status(500).json({ success: false, error: 'Lỗi server' });
    }
});

/** Xóa giáo trình */
router.delete('/teacher/materials/lessons/:id', authenticate, authorize('it_admin', 'principal', 'specialist', 'class_teacher', 'admin', 'teacher'), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await CurriculumLesson.destroy({ where: { id } });
        res.json({ success: true, message: 'Đã xóa giáo trình' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Lỗi server' });
    }
});


/**
 * ==========================================
 * QUY TRÌNH PHÊ DUYỆT & KÝ SỐ (APPROVAL WORKFLOW)
 * ==========================================
 */

/** 1. Giáo viên gửi giáo án (DRAFT -> SUBMITTED) */
router.post('/teacher/materials/lessons/:id/submit', authenticate, authorize('teacher', 'class_teacher', 'admin'), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = req.user!;
        const lesson = await CurriculumLesson.findByPk(id);

        if (!lesson) return res.status(404).json({ success: false, error: 'Không tìm thấy giáo án' });
        if (lesson.creator_id !== user.user_id && user.role !== 'admin') {
            return res.status(403).json({ success: false, error: 'Bạn không có quyền gửi giáo án của người khác' });
        }

        await lesson.update({ status: 'SUBMITTED' });
        res.json({ success: true, message: 'Đã gửi giáo án lên Tổ trưởng chuyên môn', data: lesson });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Lỗi server' });
    }
});

/** 2. Tổ trưởng chuyên môn xác nhận nội dung (SUBMITTED -> VERIFIED) */
router.post('/teacher/materials/lessons/:id/verify', authenticate, authorize('specialist', 'admin'), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { note } = req.body;
        const user = req.user!;
        const lesson = await CurriculumLesson.findByPk(id);

        if (!lesson) return res.status(404).json({ success: false, error: 'Không tìm thấy giáo án' });
        if (lesson.status !== 'SUBMITTED') {
            return res.status(400).json({ success: false, error: 'Giáo án chưa được trình duyệt hoặc đang ở trạng thái khác' });
        }

        await lesson.update({ 
            status: 'VERIFIED',
            reviewer_id: user.user_id,
            review_note: note || 'Đã xác nhận nội dung chuyên môn'
        });
        res.json({ success: true, message: 'Đã xác nhận chuyên môn, chờ Ban Giám Hiệu ký duyệt', data: lesson });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Lỗi server' });
    }
});

/** 3. Ban Giám Hiệu Ký số phê duyệt (VERIFIED -> APPROVED) */
router.post('/teacher/materials/lessons/:id/sign', authenticate, authorize('principal', 'it_admin', 'admin'), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { pinCode } = req.body; // Giả lập mã PIN ký số
        const user = req.user!;

        if (pinCode !== '1234') { // Mã PIN mặc định demo
            return res.status(401).json({ success: false, error: 'Mã PIN ký số không chính xác!' });
        }

        const lesson = await CurriculumLesson.findByPk(id);
        if (!lesson) return res.status(404).json({ success: false, error: 'Không tìm thấy giáo án' });

        // Giả lập tạo Signature Hash
        const signatureBase = `${lesson.id}-${lesson.title}-${user.user_id}-${Date.now()}`;
        const digital_signature = `SIG_KIDFIT_${Buffer.from(signatureBase).toString('base64').substring(0, 32)}`;

        await lesson.update({ 
            status: 'APPROVED',
            digital_signature,
            signed_at: new Date(),
            reviewer_id: user.user_id
        });

        res.json({ 
            success: true, 
            message: 'Đã thực hiện ký số và phê duyệt giáo án thành công!', 
            data: {
                id: lesson.id,
                status: lesson.status,
                signature: digital_signature,
                signedAt: lesson.signed_at
            }
        });
    } catch (error) {
        console.error('Lỗi ký số:', error);
        res.status(500).json({ success: false, error: 'Lỗi server' });
    }
});

/** Từ chối giáo án (REJECTED) */
router.post('/teacher/materials/lessons/:id/reject', authenticate, authorize('principal', 'specialist', 'admin'), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { note } = req.body;
        const user = req.user!;

        const lesson = await CurriculumLesson.findByPk(id);
        if (!lesson) return res.status(404).json({ success: false, error: 'Không tìm thấy giáo án' });

        await lesson.update({ 
            status: 'REJECTED',
            review_note: note || 'Không đạt yêu cầu',
            reviewer_id: user.user_id
        });

        res.json({ success: true, message: 'Đã từ chối phê duyệt giáo án', data: lesson });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Lỗi server' });
    }
});
/** Lấy danh sách học cụ */
router.get('/teacher/materials/tools', authenticate, authorize('it_admin', 'principal', 'specialist', 'class_teacher', 'admin', 'teacher'), async (req: Request, res: Response) => {
    try {
        const { class_id } = req.query;
        const user = req.user!;
        let whereClause: any = {};

        // Giáo viên chỉ thấy học cụ được cấp phát cho lớp mình
        if (user.role === 'class_teacher' && class_id) {
            whereClause.class_id = class_id;
        }

        const tools = await TeachingTool.findAll({
            where: whereClause,
            order: [['name', 'ASC']]
        });
        res.json({ success: true, data: tools });
    } catch (error) {
        console.error('Lỗi lấy danh sách học cụ:', error);
        res.status(500).json({ success: false, error: 'Lỗi server' });
    }
});

/** Điều khiển từ xa IoT: Bật/Tắt thiết bị */
router.post('/teacher/materials/tools/:id/toggle', authenticate, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { action } = req.body; // 'CONNECT' | 'DISCONNECT' | 'POWER_ON' | 'POWER_OFF'
        const user = req.user!;

        const tool = await TeachingTool.findByPk(id);
        if (!tool) return res.status(404).json({ success: false, error: 'Không tìm thấy thiết bị IoT' });

        // Kiểm tra quyền: Chỉ admin IT hoặc giáo viên của lớp được quản lý thiết bị này
        if (user.role === 'class_teacher' && tool.class_id) {
            // Logic kiểm tra lớp ở đây
        }

        // Giả lập gửi lệnh IoT qua MQTT/Websocket
        res.json({ success: true, message: `Lệnh ${action} đã được gửi tới thiết bị ${tool.name}` });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Lỗi điều khiển thiết bị' });
    }
});

/** Cập nhật phần mềm từ xa (OTA) - Chỉ dành cho IT Admin */
router.post('/teacher/materials/tools/:id/ota', authenticate, authorize('it_admin', 'admin'), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { version } = req.body;

        const tool = await TeachingTool.findByPk(id);
        if (!tool) return res.status(404).json({ success: false, error: 'Không tìm thấy thiết bị' });

        await tool.update({ ota_version: version });
        res.json({ success: true, message: `Bắt đầu cập nhật OTA lên phiên bản ${version}` });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Lỗi cập nhật OTA' });
    }
});

/** Quét QR Code để lấy thông tin / mượn / trả */
router.post('/teacher/materials/tools/scan', authenticate, authorize('it_admin', 'principal', 'specialist', 'class_teacher', 'admin', 'teacher'), async (req: Request, res: Response) => {
    try {
        const { qrCodeUid, action } = req.body; // action: 'BORROW' | 'RETURN' | 'INFO'
        
        const tool = await TeachingTool.findOne({ where: { qr_code_uid: qrCodeUid } });
        
        if (!tool) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy học cụ (Mã QR không hợp lệ)' });
        }

        if (action === 'INFO') {
            return res.json({ success: true, data: tool });
        }

        // Xử lý mượn trả
        if (action === 'BORROW') {
            if (tool.available_quantity <= 0) {
                return res.status(400).json({ success: false, error: 'Học cụ này đã hết trong kho!' });
            }
            tool.available_quantity -= 1;
        } else if (action === 'RETURN') {
            if (tool.available_quantity >= tool.total_quantity) {
                return res.status(400).json({ success: false, error: 'Kho học cụ này đã đầy!' });
            }
            tool.available_quantity += 1;
        }

        await tool.save();
        res.json({ success: true, message: action === 'BORROW' ? 'Đã mượn thành công' : 'Đã trả thành công', data: tool });

    } catch (error) {
        console.error('Lỗi quét QR:', error);
        res.status(500).json({ success: false, error: 'Lỗi server khi quét QR' });
    }
});

/** Thêm đồ dùng mới */
router.post('/teacher/materials/tools', authenticate, authorize('it_admin', 'principal', 'specialist', 'class_teacher', 'admin', 'teacher'), async (req: Request, res: Response) => {
    try {
        const { name, qr_code_uid, total_quantity, condition, notes } = req.body;
        const newTool = await TeachingTool.create({
            name,
            qr_code_uid,
            total_quantity,
            available_quantity: total_quantity,
            condition: condition || 'NEW',
            notes
        });
        res.status(201).json({ success: true, data: newTool });
    } catch (error: any) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ success: false, error: 'Mã QR này đã được gán cho một vật dụng khác!' });
        }
        res.status(500).json({ success: false, error: 'Lỗi server' });
    }
});

export default router;
