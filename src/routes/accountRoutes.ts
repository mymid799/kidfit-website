import express, { Request, Response } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import UserGroup from '../models/UserGroup.js';
import Permission from '../models/Permission.js';
import GroupPermission from '../models/GroupPermission.js';
import UserPermission from '../models/UserPermission.js';
import AccessLog from '../models/AccessLog.js';
import User from '../models/User.js';

const router = express.Router();

// ─── USER GROUPS ────────────────────────────────────────────────────────────

router.get('/groups', authenticate, authorize('admin'), async (_req: Request, res: Response) => {
    try {
        const groups = await UserGroup.findAll();
        res.json({ success: true, data: groups });
    } catch (error) {
        console.error('Lỗi lấy nhóm:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

router.post('/groups', authenticate, authorize('admin'), async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const group = await UserGroup.create({ name, description });
        res.json({ success: true, data: group });
    } catch (error: any) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ success: false, error: 'Tên nhóm đã tồn tại!' });
        }
        console.error('Lỗi tạo nhóm:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

router.put('/groups/:id', authenticate, authorize('admin'), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const group = await UserGroup.findByPk(id);
        if (!group) return res.status(404).json({ success: false, error: 'Nhóm không tồn tại!' });

        await group.update({ name, description });
        res.json({ success: true, data: group });
    } catch (error: any) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ success: false, error: 'Tên nhóm đã tồn tại!' });
        }
        console.error('Lỗi cập nhật nhóm:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

router.delete('/groups/:id', authenticate, authorize('admin'), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const group = await UserGroup.findByPk(id);
        if (!group) return res.status(404).json({ success: false, error: 'Nhóm không tồn tại!' });

        await group.destroy();
        res.json({ success: true, message: 'Đã xóa nhóm thành công!' });
    } catch (error) {
        console.error('Lỗi xóa nhóm:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

// ─── PERMISSIONS ────────────────────────────────────────────────────────────

router.get('/permissions', authenticate, authorize('admin'), async (_req: Request, res: Response) => {
    try {
        const permissions = await Permission.findAll();
        res.json({ success: true, data: permissions });
    } catch (error) {
        console.error('Lỗi lấy quyền:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

router.post('/permissions', authenticate, authorize('admin'), async (req: Request, res: Response) => {
    try {
        const { code, description } = req.body;
        const permission = await Permission.create({ code, description });
        res.json({ success: true, data: permission });
    } catch (error: any) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ success: false, error: 'Mã quyền đã tồn tại!' });
        }
        console.error('Lỗi tạo quyền:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

// ─── GROUP PERMISSIONS ──────────────────────────────────────────────────────

router.get('/groups/:id/permissions', authenticate, authorize('admin'), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const group = await UserGroup.findByPk(id, {
            include: [{ model: Permission, through: { attributes: [] } }]
        });
        if (!group) return res.status(404).json({ success: false, error: 'Nhóm không tồn tại!' });

        res.json({ success: true, data: (group as any).Permissions });
    } catch (error) {
        console.error('Lỗi lấy quyền theo nhóm:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

router.post('/groups/:id/permissions', authenticate, authorize('admin'), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { permission_ids } = req.body; // Array of permission IDs

        const group = await UserGroup.findByPk(id);
        if (!group) return res.status(404).json({ success: false, error: 'Nhóm không tồn tại!' });

        await GroupPermission.destroy({ where: { group_id: id } });
        
        if (permission_ids && permission_ids.length > 0) {
            const records = permission_ids.map((pid: number) => ({
                group_id: Number(id),
                permission_id: pid
            }));
            await GroupPermission.bulkCreate(records);
        }

        res.json({ success: true, message: 'Đã cập nhật quyền cho nhóm!' });
    } catch (error) {
        console.error('Lỗi gán quyền nhóm:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

// ─── USER PERMISSIONS ──────────────────────────────────────────────────────

router.get('/users/:id/permissions', authenticate, authorize('admin'), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            include: [
                { model: Permission, through: { attributes: [] }, as: 'permissions' },
                { 
                    model: UserGroup, 
                    as: 'groups',
                    include: [{ model: Permission, through: { attributes: [] }, as: 'Permissions' }]
                }
            ]
        });
        if (!user) return res.status(404).json({ success: false, error: 'User không tồn tại!' });

        const directPerms = (user as any).permissions || (user as any).Permissions || []; // Alias fallback
        let inheritedPerms: any[] = [];
        
        if ((user as any).groups) {
            (user as any).groups.forEach((group: any) => {
                if (group.Permissions) {
                    inheritedPerms = [...inheritedPerms, ...group.Permissions];
                }
            });
        }
        
        // Remove duplicates in inherited
        const uniqueInherited = Array.from(new Map(inheritedPerms.map(p => [p.id, p])).values());

        res.json({ 
            success: true, 
            data: {
                direct: directPerms,
                inherited: uniqueInherited
            }
        });
    } catch (error) {
        console.error('Lỗi lấy quyền theo user:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

router.post('/users/:id/permissions', authenticate, authorize('admin'), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { permission_ids } = req.body; // Array of permission IDs

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ success: false, error: 'User không tồn tại!' });

        await UserPermission.destroy({ where: { user_id: id } });
        
        if (permission_ids && permission_ids.length > 0) {
            const records = permission_ids.map((pid: number) => ({
                user_id: Number(id),
                permission_id: pid
            }));
            await UserPermission.bulkCreate(records);
        }

        res.json({ success: true, message: 'Đã cập nhật quyền riêng cho user!' });
    } catch (error) {
        console.error('Lỗi gán quyền user:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

// ─── ACCESS LOGS ────────────────────────────────────────────────────────────

router.get('/logs', authenticate, authorize('admin'), async (req: Request, res: Response) => {
    try {
        const limit = Number(req.query.limit) || 100;
        const page = Number(req.query.page) || 1;
        const offset = (page - 1) * limit;

        const { count, rows } = await AccessLog.findAndCountAll({
            include: [{ model: User, as: 'user', attributes: ['id', 'username', 'email'] }],
            order: [['timestamp', 'DESC']],
            limit,
            offset
        });

        res.json({ success: true, count, data: rows, totalPages: Math.ceil(count / limit), currentPage: page });
    } catch (error) {
        console.error('Lỗi lấy lịch sử truy cập:', error);
        res.status(500).json({ success: false, error: 'Lỗi server!' });
    }
});

export default router;
