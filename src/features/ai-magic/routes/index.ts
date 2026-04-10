import express from 'express';
import magicRoutes from './magicRoutes.js';
import studentRoutes from './studentRoutes.js';

const router = express.Router();

router.use(magicRoutes);
router.use(studentRoutes);

export default router;
