import express from 'express';
import { HotelsService } from './providers/hotels.service';
import { HotelsController } from './hotels.controller';
import { UsersService } from '../users/providers/users.service';
import { AuthController } from '../auth/auth.controller';
import { UserRole } from '../users/enums/user-role.enum';

const router = express.Router();

const hotelsService = new HotelsService();
const usersService = new UsersService();
const hotelsController = new HotelsController(hotelsService, usersService);
const authController = new AuthController();

router.get('/', (req, res) => hotelsController.getAllHotels(req, res));
router.get('/:id', (req, res) => hotelsController.getHotel(req, res));

// protected routes
router.use((req, res, next) => authController.protect(req, res, next));

router.post('/', authController.restrictTo(UserRole.ADMIN), (req, res) =>
  hotelsController.createHotel(req, res)
);

router.patch(
  '/:id',
  authController.restrictTo(UserRole.ADMIN, UserRole.MANAGER),
  (req, res) => hotelsController.updateHotel(req, res)
);
router.delete('/:id', authController.restrictTo(UserRole.ADMIN), (req, res) =>
  hotelsController.deleteHotel(req, res)
);

export const hotelRoutes = router;
