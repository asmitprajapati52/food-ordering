import express from 'express';
import { getCoupons, validateCoupon, createCoupon } from '../controllers/couponController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getCoupons).post(protect, adminOnly, createCoupon);
router.route('/validate').post(validateCoupon);

export default router;

