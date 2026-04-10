import express from 'express';
import { authenticate } from '../../../middleware/auth.js';
import Student from '../../../models/Student.js';

const router = express.Router();

// Get students for the current user
router.get('/students', authenticate, async (req: any, res) => {
    try {
        const userId = req.user.user_id;
        const role = req.user.role;

        let students;
        if (role === 'parent') {
            students = await Student.findAll({ where: { userId } });
        } else {
            // For teachers/admins, return all students (simplification)
            students = await Student.findAll();
        }

        res.json({
            success: true,
            data: students
        });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

export default router;
