import { Request, Response } from 'express';
import { acceptBookingPaymentProvider } from './accept-booking-payment.provider';
import { verifyBookingPaymentProvider } from './verify-booking-payment.provider';

export class ChapaService {
  acceptBookingPayment(req: Request, res: Response) {
    acceptBookingPaymentProvider(req, res);
  }

  verifyBookingPayment(req: Request, res: Response) {
    verifyBookingPaymentProvider(req, res);
  }

  verifyBookingPaymentCallback() {}
}
