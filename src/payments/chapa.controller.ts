import { Request, Response } from 'express';
import { acceptBookingPaymentProvider } from './providers/accept-booking-payment.provider';
import { verifyBookingPaymentProvider } from './providers/verify-booking-payment.provider';
import { verifySaveBookingPaymentProvider } from './providers/verify-save-booking-payent.provider';

export class ChapaController {
  // accept booking payment
  acceptBookingPayment(req: Request, res: Response) {
    acceptBookingPaymentProvider(req, res);
  }

  // verify booking payment
  verifyBookingPayment(req: Request, res: Response) {
    verifyBookingPaymentProvider(req, res);
  }

  // verify save booking payment
  verifySaveBookingPayment(req: Request, res: Response) {
    verifySaveBookingPaymentProvider(req, res);
  }
}
