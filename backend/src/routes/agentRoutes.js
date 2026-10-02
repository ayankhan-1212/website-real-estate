import express from 'express';
import { getAgents, getAgentById, createAgent } from '../controllers/agentController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAgents);
router.get('/:id', getAgentById);
router.post('/', protect, adminOnly, createAgent);

export default router;
