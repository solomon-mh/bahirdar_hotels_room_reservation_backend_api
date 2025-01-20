import express from 'express';
import { BookingsService } from './providers/bookings.service';
import { BookingsController } from './bookings.controller';

const router = express.Router();

const bookingsService = new BookingsService();
const bookingsController = new BookingsController(bookingsService);

router.get('/', (req, res) => bookingsController.getAllBookings(req, res));
router.get('/:id', (req, res) => bookingsController.getBooking(req, res));
router.post('/', (req, res) => bookingsController.createBooking(req, res));
router.patch('/:id', (req, res) => bookingsController.updateBooking(req, res));
router.delete('/:id', (req, res) => bookingsController.deleteBooking(req, res));

export const bookingRoutes = router;
