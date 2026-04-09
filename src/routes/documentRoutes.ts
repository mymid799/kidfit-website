/**
 * Routes: Document Submissions (Sổ Trình Ký Giáo Án)
 * =====================================================
 * Full CRUD + Upload + Trình Ký + Phê Duyệt / Từ Chối
 */
import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authenticate } from '../middleware/auth.js';
import DocumentSubmission from '../models/DocumentSubmission.js';
import User from '../models/User.js';
import { Op } from 'sequelize';
import mammoth from 'mammoth';

const router = express.Router();

// ─── MULTER CONFIG (upload file giáo án) ────────────────────────────────────
const uploadDir = 'uploads/documents';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'doc-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
    fileFilter: (_req, file, cb) => {
        const allowed = /pdf|doc|docx|xls|xlsx|ppt|pptx|jpeg|jpg|png/;
        const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
        if (allowed.test(ext)) return cb(null, true);
        cb(new Error('File không hợp lệ! Chỉ chấp nhận PDF, Word, Excel, PowerPoint, hoặc ảnh.'));
    }
});

// ─── GET /api/documents/stats ── Thống kê tổng quan cho Dashboard ───────────
router.get('/documents/stats', authenticate, async (req: Request, res: Response) => {
    try {
        const userId = req.user!.user_id;
        
        const [notSubmitted, pending, approved, rejected] = await Promise.all([
            DocumentSubmission.count({ where: { submitter_id: userId, status: 'draft' } }),
            DocumentSubmission.count({ where: { submitter_id: userId, status: 'submitted' } }),
            DocumentSubmission.count({ where: { submitter_id: userId, status: 'approved' } }),
            DocumentSubmission.count({ where: { submitter_id: userId, status: 'rejected' } }),
        ]);

        // Tổng dung lượng file
        const totalFiles = await DocumentSubmission.count({ where: { submitter_id: userId } });
        const totalSizeResult = await DocumentSubmission.sum('file_size', { where: { submitter_id: userId } });

        res.json({
            success: true,
            data: {
                not_submitted: notSubmitted,
                pending,
                approved,
                rejected,
                total_files: totalFiles,
                total_size: totalSizeResult || 0
            }
        });
    } catch (error) {
        console.error('❌ Lỗi thống kê documents:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

// ─── GET /api/documents ── Danh sách bản nộp (Sổ Trình Ký) ─────────────────
router.get('/documents', authenticate, async (req: Request, res: Response) => {
    try {
        const userId = req.user!.user_id;
        const { status, tab } = req.query;

        let whereClause: any = {};
        
        if (tab === 'need_approve') {
            // Tab "Cần ký duyệt": Xem những bản nộp mà user này là reviewer
            whereClause = { reviewer_id: userId, status: 'submitted' };
        } else {
            // Tab "Sổ trình ký": Bản nộp của chính mình
            whereClause = { submitter_id: userId };
            if (status) whereClause.status = status;
        }

        const documents = await DocumentSubmission.findAll({
            where: whereClause,
            include: [
                { model: User, as: 'submitter', attributes: ['id', 'username', 'email'] },
                { model: User, as: 'reviewer', attributes: ['id', 'username', 'email'] }
            ],
            order: [['created_at', 'DESC']]
        });

        res.json({ success: true, data: documents });
    } catch (error) {
        console.error('❌ Lỗi lấy danh sách documents:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

// ─── GET /api/documents/review-inbox ── Hòm thư duyệt (Tổ Trưởng) ─────────
router.get('/documents/review-inbox', authenticate, async (req: Request, res: Response) => {
    try {
        const userId = req.user!.user_id;

        const documents = await DocumentSubmission.findAll({
            where: { reviewer_id: userId, status: 'submitted' },
            include: [
                { model: User, as: 'submitter', attributes: ['id', 'username', 'email'] },
            ],
            order: [['submitted_at', 'DESC']]
        });

        res.json({ success: true, data: documents });
    } catch (error) {
        console.error('❌ Lỗi lấy review inbox:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

// ─── GET /api/documents/reviewers ── Danh sách người duyệt có thể chọn ─────
router.get('/documents/reviewers', authenticate, async (req: Request, res: Response) => {
    try {
        // Lấy danh sách admin + teacher (người có quyền duyệt)
        const reviewers = await User.findAll({
            where: {
                role: { [Op.in]: ['admin', 'teacher'] },
                id: { [Op.ne]: req.user!.user_id },
                is_active: true
            },
            attributes: ['id', 'username', 'email', 'role']
        });

        res.json({ success: true, data: reviewers });
    } catch (error) {
        console.error('❌ Lỗi lấy reviewers:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

// ─── GET /api/documents/:id ── Lấy chi tiết một bản nộp ───────────────────
router.get('/documents/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log('🔍 Fetching document details for ID:', id);
        
        if (isNaN(Number(id))) {
            return res.status(400).json({ success: false, error: 'ID không hợp lệ' });
        }

        const doc = await DocumentSubmission.findByPk(id, {
            include: [
                { model: User, as: 'submitter', attributes: ['id', 'username', 'full_name'] },
                { model: User, as: 'reviewer', attributes: ['id', 'username', 'full_name'] }
            ]
        });
        
        if (!doc) {
            console.warn('❌ Document not found:', id);
            return res.status(404).json({ success: false, error: 'Không tìm thấy hồ sơ!' });
        }

        // If it's a docx but has no web_content yet, try converting it for preview
        const docObj = doc.toJSON() as any;
        if (!docObj.web_content && docObj.file_url && docObj.file_url.toLowerCase().endsWith('.docx')) {
            try {
                const filePath = path.join(process.cwd(), docObj.file_url);
                if (fs.existsSync(filePath)) {
                    console.log('🔄 Converting Docx to HTML for ID:', id);
                    const result = await mammoth.convertToHtml({ path: filePath });
                    docObj.web_content = result.value;
                }
            } catch (err) {
                console.error('❌ Mammoth conversion error on server:', err);
            }
        }
        
        res.json({ success: true, data: docObj });
    } catch (error) {
        console.error('❌ Lỗi lấy chi tiết document:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

// ─── POST /api/documents ── Upload + Tạo bản nộp mới ───────────────────────
router.post('/documents', authenticate, upload.single('file'), async (req: Request, res: Response) => {
    try {
        const { title, description, category, frequency, reviewer_id, web_content, type } = req.body;

        const doc = await DocumentSubmission.create({
            title: title || (req.file ? req.file.originalname : 'Văn bản mới'),
            description: description || null,
            category: category || 'khac',
            frequency: frequency || '1 lần/tháng',
            file_url: req.file ? `/uploads/documents/${req.file.filename}` : null,
            file_name: req.file ? req.file.originalname : null,
            file_size: req.file ? req.file.size : 0,
            web_content: web_content || null,
            submitter_id: req.user!.user_id,
            reviewer_id: reviewer_id ? Number(reviewer_id) : null,
        });

        res.json({ success: true, data: doc, message: 'Đã lưu thành công!' });
    } catch (error) {
        console.error('❌ Lỗi tạo document:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

// ─── PUT /api/documents/:id ── Cập nhật nội dung bản nộp ────────────────────
router.put('/documents/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, web_content, reviewer_id } = req.body;

        const doc = await DocumentSubmission.findByPk(id);
        if (!doc) return res.status(404).json({ success: false, error: 'Không tìm thấy hồ sơ!' });
        
        if (doc.submitter_id !== req.user!.user_id) {
            return res.status(403).json({ success: false, error: 'Bạn không có quyền sửa hồ sơ này!' });
        }

        await doc.update({
            title: title || doc.title,
            web_content: web_content !== undefined ? web_content : doc.web_content,
            reviewer_id: reviewer_id ? Number(reviewer_id) : doc.reviewer_id
        });

        res.json({ success: true, data: doc, message: 'Đã cập nhật thành công!' });
    } catch (error) {
        console.error('❌ Lỗi cập nhật document:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

// ─── PUT /api/documents/:id/submit ── Trình ký (chuyển trạng thái) ──────────
router.put('/documents/:id/submit', authenticate, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { reviewer_id } = req.body;

        const doc = await DocumentSubmission.findByPk(id);
        if (!doc) return res.status(404).json({ success: false, error: 'Không tìm thấy hồ sơ!' });
        if (doc.submitter_id !== req.user!.user_id) {
            return res.status(403).json({ success: false, error: 'Bạn không có quyền trình ký hồ sơ này!' });
        }

        await doc.update({
            status: 'submitted',
            submitted_at: new Date(),
            reviewer_id: reviewer_id ? Number(reviewer_id) : doc.reviewer_id,
        });

        res.json({ success: true, data: doc, message: 'Đã trình ký thành công!' });
    } catch (error) {
        console.error('❌ Lỗi trình ký:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

// ─── PUT /api/documents/:id/review ── Phê duyệt / Từ chối ──────────────────
router.put('/documents/:id/review', authenticate, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { action, comment } = req.body; // action: 'approved' | 'rejected'

        if (!['approved', 'rejected'].includes(action)) {
            return res.status(400).json({ success: false, error: 'Action không hợp lệ!' });
        }

        const doc = await DocumentSubmission.findByPk(id);
        if (!doc) return res.status(404).json({ success: false, error: 'Không tìm thấy hồ sơ!' });

        await doc.update({
            status: action,
            reviewer_id: req.user!.user_id,
            reviewer_comment: comment || null,
            reviewed_at: new Date(),
        });

        res.json({
            success: true,
            data: doc,
            message: action === 'approved' ? 'Đã phê duyệt hồ sơ!' : 'Đã từ chối hồ sơ!'
        });
    } catch (error) {
        console.error('❌ Lỗi phê duyệt:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

// ─── DELETE /api/documents/:id ── Xóa bản nộp ──────────────────────────────
router.delete('/documents/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const doc = await DocumentSubmission.findByPk(id);
        if (!doc) return res.status(404).json({ success: false, error: 'Không tìm thấy hồ sơ!' });
        
        if (doc.submitter_id !== req.user!.user_id && req.user!.role !== 'admin') {
            return res.status(403).json({ success: false, error: 'Bạn không có quyền xóa hồ sơ này!' });
        }

        // Xóa file vật lý
        const filePath = path.join(process.cwd(), doc.file_url);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await doc.destroy();
        res.json({ success: true, message: 'Đã xóa hồ sơ thành công!' });
    } catch (error) {
        console.error('❌ Lỗi xóa document:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

// ... (moved above) ...

export default router;
