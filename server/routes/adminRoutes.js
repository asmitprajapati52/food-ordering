import express from 'express';
import { getAdminStats, getAdminUsers, updateAdminUser } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', protect, adminOnly, getAdminStats);
router.get('/users', protect, adminOnly, getAdminUsers);
router.put('/users/:id', protect, adminOnly, updateAdminUser);

export default router;

