import express from 'express';
import {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
} from '../controllers/foodController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getFoods).post(protect, adminOnly, createFood);
router
  .route('/:id')
  .get(getFoodById)
  .put(protect, adminOnly, updateFood)
  .delete(protect, adminOnly, deleteFood);

export default router;

