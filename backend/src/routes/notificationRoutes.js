import express from 'express';
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', getNotifications);
router.patch('/:id/read', markNotificationAsRead);
router.patch('/mark-all/read', markAllNotificationsAsRead);

export default router;
