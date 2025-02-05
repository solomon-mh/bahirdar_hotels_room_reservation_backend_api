import express from 'express';
import { AuthController } from '../auth/auth.controller';
import { ChapaController } from './chapa.controller';

const authController = new AuthController();
const chapaController = new ChapaController();

const router = express.Router();

router.use((req, res, next) => authController.protect(req, res, next));

router.post('/chapa/accept-booking-payment/:bookingId', (req, res) =>
  chapaController.acceptBookingPayment(req, res)
);
router.get('/chapa/verify-booking-payment/:trx_ref', (req, res) =>
  chapaController.verifyBookingPayment(req, res)
);
router.get('/chapa/verify-save-booking-payment', (req, res) =>
  chapaController.verifySaveBookingPayment(req, res)
);

export const paymentRoutes = router;
