import express from 'express';
import { BookingsService } from './providers/bookings.service';
import { BookingsController } from './bookings.controller';
import { AuthController } from '../auth/auth.controller';
import { RoomsService } from '../rooms/providers/room.service';
import { UserRole } from '../users/enums/user-role.enum';

const router = express.Router();

const bookingsService = new BookingsService();
const roomsService = new RoomsService();
const bookingsController = new BookingsController(
  bookingsService,
  roomsService
);

const authController = new AuthController();

router.get('/', (req, res) => bookingsController.getAllBookings(req, res));
router.get('/:id', (req, res) => bookingsController.getBooking(req, res));

// protected routes
router.use((req, res, next) => authController.protect(req, res, next));

router.post('/', authController.restrictTo(UserRole.USER), (req, res) =>
  bookingsController.createBooking(req, res)
);
router.patch('/:id', (req, res) => bookingsController.updateBooking(req, res));
router.delete('/:id', (req, res) => bookingsController.deleteBooking(req, res));

export const bookingRoutes = router;
