import { Request, Response } from 'express';
import { PaymentService } from './providers/payment.service';
import { IPayment } from './interfaces/payment.interface';

export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // find all
  async getAllPayments(req: Request, res: Response) {
    console.log('get all payments...');
    try {
      const payments = await this.paymentService.findAll();

      res.status(200).json({
        status: 'success',
        data: payments,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
  // find one by id
  async getPayment(req: Request, res: Response) {
    console.log('get payment...');
    try {
      const { id } = req.params;
      const payment = await this.paymentService.findOneById(id);

      if (!payment) {
        res.status(404).json({
          status: 'fail',
          message: 'payment not found',
        });
        return;
      }

      res.status(200).json({
        status: 'fail',
        data: payment,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
  // create
  async createPayment(req: Request, res: Response) {
    console.log('create payment...');
    try {
      // todo: validation
      const createPaymentDto: IPayment = req.body;

      const payment = await this.paymentService.createPayment(createPaymentDto);

      res.status(200).json({
        status: 'success',
        data: payment,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }

  // todo: update
  async updatePayment(req: Request, res: Response) {
    console.log('update payment...');
    try {
      const { id } = req.params;

      const updatePaymentDto: Partial<IPayment> = req.body;

      const payment = await this.paymentService.updatePayment(
        id,
        updatePaymentDto
      );

      if (!payment) {
        res.status(404).json({
          status: 'fail',
          message: 'payment not found',
        });
        return;
      }

      res.status(200).json({
        status: 'sucess',
        data: payment,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }

  // delete
  async deletePayment(req: Request, res: Response) {
    console.log('delete payment...');
    try {
      const { id } = req.params;
      const payment = await this.paymentService.deleteOne(id);

      if (!payment) {
        res.status(404).json({
          status: 'fail',
          message: 'payment not found',
        });
        return;
      }

      res.status(204).send();
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
}
