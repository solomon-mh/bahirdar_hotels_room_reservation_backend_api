import { Request, Response } from 'express';
import { BookingsService } from './providers/bookings.service';

export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // get all bookings
  async getAllBookings(req: Request, res: Response) {
    console.log('get all bookings...');
    try {
      const bookings = await this.bookingsService.findAllBookings();
      res.status(200).json({
        status: 'success',
        data: bookings,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
  // get booking
  async getBooking(req: Request, res: Response) {
    console.log('get booking...');
    try {
      const booking = await this.bookingsService.findBooking(req.params.id);

      if (!booking) {
        res.status(404).json({
          status: 'error',
          message: 'Booking not found',
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        data: booking,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
  // create booking
  async createBooking(req: Request, res: Response) {
    console.log('create booking...');
    try {
      const booking = await this.bookingsService.createBooking(req.body);

      res.status(201).json({
        status: 'success',
        data: booking,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
  // update booking
  async updateBooking(req: Request, res: Response) {
    console.log('update booking...');
    try {
      const booking = await this.bookingsService.updateBooking(
        req.params.id,
        req.body
      );

      if (!booking) {
        res.status(404).json({
          status: 'error',
          message: 'Booking not found',
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        data: booking,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
  // delete booking
  async deleteBooking(req: Request, res: Response) {
    console.log('delete booking...');
    try {
      const booking = await this.bookingsService.deleteBooking(req.params.id);

      if (!booking) {
        res.status(404).json({
          status: 'error',
          message: 'Booking not found',
        });
        return;
      }

      res.status(204).json({
        status: 'success',
        data: null,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
}
