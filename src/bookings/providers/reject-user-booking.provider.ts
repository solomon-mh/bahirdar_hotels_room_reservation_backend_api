import { Request, Response } from 'express';
import BookingModel from '../bookings.model';
import { IBooking } from '../interfaces/booking.interface';
import UserModel from '../../users/users.model';
import { IUser } from '../../users/interfaces/user.interface';
import { Types } from 'mongoose';
import { BookingStatus } from '../enums/booking-status.enum';

export async function rejectUserBookingProvider(req: Request, res: Response) {
  console.log('reject-user-booking.provider...');
  try {
    const { bookingId, userId } = req.params;

    const user = (await UserModel.findById(userId)) as IUser;

    if (!user) {
      res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
      return;
    }

    const booking = (await BookingModel.findOne({
      user: new Types.ObjectId(userId),
      _id: new Types.ObjectId(bookingId),
    })) as IBooking;

    if (!booking) {
      res.status(404).json({
        status: 'fail',
        message: 'Booking not found',
      });
      return;
    }

    if (booking.isPaid) {
      res.status(400).json({
        status: 'fail',
        message: 'Booking is already paid, cannot be rejected',
      });
      return;
    }

    const updatedData: Partial<IBooking> = {
      status: BookingStatus.REJECTED,
    };

    const updatedBooking = await BookingModel.findByIdAndUpdate(
      bookingId,
      updatedData,
      {
        new: true,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'booking rejected successfully',
      data: updatedBooking,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: (err as Error).message,
    });
  }
}
