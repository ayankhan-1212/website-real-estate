import express from 'express';
import {
  getProperties,
  getFeaturedProperties,
  getPropertyById,
  compareProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/propertyController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProperties);
router.get('/featured', getFeaturedProperties);
router.get('/compare', compareProperties);
router.get('/:id', getPropertyById);

// Admin / Agent protected routes
router.post('/', protect, adminOnly, createProperty);
router.put('/:id', protect, adminOnly, updateProperty);
router.delete('/:id', protect, adminOnly, deleteProperty);

export default router;
