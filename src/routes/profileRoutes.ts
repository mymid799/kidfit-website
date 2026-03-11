import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import User from '../models/User.js';
import StaffProfile from '../models/StaffProfile.js';
import ParentProfile from '../models/ParentProfile.js';

const router = express.Router();

// Get the current user's profile
router.get('/profile', authenticate, authorize('teacher', 'admin', 'parent'), async (req: any, res) => {
    try {
        const userId = req.user.user_id;

        const user = await User.findByPk(userId, {
            attributes: ['id', 'username', 'email', 'role']
        });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        let profile;
        if (user.role === 'parent') {
            profile = await ParentProfile.findOne({
                where: { user_id: userId }
            });
        } else {
            profile = await StaffProfile.findOne({
                where: { user_id: userId }
            });
        }

        res.json({
            success: true,
            user,
            profile: profile || {}
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Update the current user's profile
router.put('/profile', authenticate, authorize('teacher', 'admin', 'parent'), async (req: any, res) => {
    try {
        const userId = req.user.user_id;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        if (user.role === 'parent') {
            const { parent_name, child_name_anonymous, child_age, phone } = req.body;

            let profile = await ParentProfile.findOne({
                where: { user_id: userId }
            });

            if (!profile) {
                profile = await ParentProfile.create({
                    user_id: userId,
                    parent_name: parent_name || user.username,
                    child_name_anonymous: child_name_anonymous || 'Bé',
                    child_age: child_age || 3,
                    phone: phone || null
                });
            } else {
                if (parent_name !== undefined) profile.parent_name = parent_name;
                if (child_name_anonymous !== undefined) profile.child_name_anonymous = child_name_anonymous;
                if (child_age !== undefined) profile.child_age = child_age;
                if (phone !== undefined) profile.phone = phone;
                await profile.save();
            }

            return res.json({
                success: true,
                profile
            });
        }

        // Staff/Admin profile logic
        const { full_name, phone, bio, teaching_classes, certificates, avatar_url, position } = req.body;

        let profile = await StaffProfile.findOne({
            where: { user_id: userId }
        });

        if (!profile) {
            // Auto-create profile if it doesn't exist
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }

            profile = await StaffProfile.create({
                user_id: userId,
                employee_id: `ST-${Math.floor(1000 + Math.random() * 9000)}`, // Generate random ID
                full_name: full_name || user.username,
                position: position || (user.role === 'admin' ? 'Quản trị viên' : 'Giáo viên STEAM'),
                status: 'active'
            });
        }

        // Only update provided fields
        if (full_name !== undefined) profile.full_name = full_name;
        if (phone !== undefined) profile.phone = phone;
        if (bio !== undefined) profile.bio = bio;
        if (teaching_classes !== undefined) profile.teaching_classes = teaching_classes;
        if (certificates !== undefined) profile.certificates = certificates;
        if (avatar_url !== undefined) profile.avatar_url = avatar_url;
        if (position !== undefined) profile.position = position;

        await profile.save();

        res.json({
            success: true,
            profile
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

export default router;
