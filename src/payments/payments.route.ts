import express from 'express';
import { AuthController } from '../auth/auth.controller';
import { ChapaController } from './chapa.controller';
import { UserRole } from '../users/enums/user-role.enum';
import { PaymentService } from './providers/payment.service';
import { PaymentController } from './payment.controller';

const authController = new AuthController();
const chapaController = new ChapaController();

const paymentService = new PaymentService();
const paymentController = new PaymentController(paymentService);

const router = express.Router();

router.use((req, res, next) => authController.protect(req, res, next));

router.get('/chapa/accept-booking-payment/:bookingId', (req, res) =>
  chapaController.acceptBookingPayment(req, res)
);
router.get('/chapa/verify-booking-payment/:trx_ref', (req, res) =>
  chapaController.verifyBookingPayment(req, res)
);
router.get('/chapa/verify-save-booking-payment', (req, res) =>
  chapaController.verifySaveBookingPayment(req, res)
);

router.use(authController.restrictTo(UserRole.ADMIN));

router
  .route('/')
  .get((req, res) => paymentController.getAllPayments(req, res))
  .post((req, res) => paymentController.createPayment(req, res));

router
  .route('/:id')
  .get((req, res) => paymentController.getPayment(req, res))
  .patch((req, res) => paymentController.updatePayment(req, res))
  .delete((req, res) => paymentController.deletePayment(req, res));

export const paymentRoutes = router;
