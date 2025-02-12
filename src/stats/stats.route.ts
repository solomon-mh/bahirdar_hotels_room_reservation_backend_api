import express from 'express';

import { AuthController } from '../auth/auth.controller';
import { UserRole } from '../users/enums/user-role.enum';
import { StatsController } from './stats.controller';

const statsController = new StatsController();
const authController = new AuthController();

const router = express.Router();

router.use((req, res, next) => authController.protect(req, res, next));

router.get('/admin', authController.restrictTo(UserRole.ADMIN), (req, res) =>
  statsController.getAdminStats(req, res)
);

router.get(
  '/hotels/:id',
  authController.restrictTo(UserRole.ADMIN, UserRole.CASHIER, UserRole.MANAGER),
  (req, res) => statsController.getHotelStats(req, res)
);

router.get(
  '/users/:id',
  authController.restrictTo(UserRole.ADMIN, UserRole.USER),
  (req, res) => statsController.getUserStats(req, res)
);

export const statRoutes = router;
