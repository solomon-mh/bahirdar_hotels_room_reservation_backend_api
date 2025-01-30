import express from 'express';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './providers/notifications.service';

const router = express.Router();

const notificationsService = new NotificationsService();
const notificationsController = new NotificationsController(
  notificationsService
);

export const notificationsRoutes = router;
