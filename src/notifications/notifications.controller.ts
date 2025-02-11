import { NotificationsService } from './providers/notifications.service';
import { Request, Response } from 'express';

export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  getAllNotifications = async (req: Request, res: Response) => {
    const notifications = await this.notificationsService.getAllNotifications();
    res.send(notifications);
  };
}
