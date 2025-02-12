import { Request, Response } from 'express';
import { hotelStatsProvider } from './providers/hotel-stats.provider';
import { adminStatsProvider } from './providers/admin-stats.provider';
import { userStatsProvider } from './providers/user-stats.provider';

export class StatsController {
  getAdminStats(req: Request, res: Response) {
    adminStatsProvider(req, res);
  }

  getHotelStats(req: Request, res: Response) {
    hotelStatsProvider(req, res);
  }

  getUserStats(req: Request, res: Response) {
    userStatsProvider(req, res);
  }
}
