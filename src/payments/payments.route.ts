import express from 'express';
import { AuthController } from '../auth/auth.controller';
import { ChapaService } from './providers/chapa.service';
import { ChapaController } from './chapa.controller';

const authController = new AuthController();

const chapaService = new ChapaService();
const chapaController = new ChapaController(chapaService);

const router = express.Router();

router.use((req, res, next) => authController.protect(req, res, next));

router.post('/chapa/accept-booking-payment/:bookingId', (req, res) =>
  chapaController.acceptBookingPayment(req, res)
);
router.get('/chapa/verify-booking-payment/:trx_ref', (req, res) =>
  chapaController.verifyBookingPayment(req, res)
);

export const paymentRoutes = router;
