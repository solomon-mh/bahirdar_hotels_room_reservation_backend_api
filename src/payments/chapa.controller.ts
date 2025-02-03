import { Request, Response } from 'express';
import { ChapaService } from './providers/chapa.service';

export class ChapaController {
  constructor(private readonly chapaService: ChapaService) {}

  // accept booking payment
  acceptBookingPayment(req: Request, res: Response) {
    this.chapaService.acceptBookingPayment(req, res);
  }

  // verify booking payment
  verifyBookingPayment(req: Request, res: Response) {
    this.chapaService.verifyBookingPayment(req, res);
  }
}
