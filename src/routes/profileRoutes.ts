import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import User from '../models/User.js';
import StaffProfile from '../models/StaffProfile.js';

const router = express.Router();

// Get the current user's profile
router.get('/profile', authenticate, authorize('teacher', 'admin'), async (req: any, res) => {
    try {
        const userId = req.user.user_id;

        const user = await User.findByPk(userId, {
            attributes: ['id', 'username', 'email', 'role']
        });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const profile = await StaffProfile.findOne({
            where: { user_id: userId }
        });

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
router.put('/profile', authenticate, authorize('teacher', 'admin'), async (req: any, res) => {
    try {
        const userId = req.user.user_id;
        const { full_name, phone, bio, teaching_classes, certificates, avatar_url } = req.body;

        const profile = await StaffProfile.findOne({
            where: { user_id: userId }
        });

        if (!profile) {
            return res.status(404).json({ success: false, error: 'Profile not found' });
        }

        // Only update provided fields
        if (full_name !== undefined) profile.full_name = full_name;
        if (phone !== undefined) profile.phone = phone;
        if (bio !== undefined) profile.bio = bio;
        if (teaching_classes !== undefined) profile.teaching_classes = teaching_classes;
        if (certificates !== undefined) profile.certificates = certificates;
        if (avatar_url !== undefined) profile.avatar_url = avatar_url;

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
