import { Request, Response } from 'express';
import BookingModel from '../../bookings/bookings.model';
import { IBookingDetail } from '../../lib/shared/booking-detail.interface';
import { IVerifyPayment } from '../interfaces/verify-payment.interface';
import { BookingStatus } from '../../bookings/enums/booking-status.enum';
import { IPayment } from '../interfaces/payment.interface';
import { Types } from 'mongoose';
import PaymentModel from '../payment.model';
import { envConfig } from '../../lib/config/environment.config';

export async function verifySaveBookingPaymentProvider(
  req: Request,
  res: Response
) {
  console.log('verify save booking payment...');
  try {
    const { trx_ref } = req.body as IVerifyPayment;
    console.log('trx_ref', trx_ref);

    if (!trx_ref) {
      throw new Error('Transaction reference is required');
    }

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${envConfig.CHAPA_API_KEY}`);
    const requestOptions: any = {
      method: 'GET',
      headers: myHeaders,
    };

    const response = await fetch(
      `https://api.chapa.co/v1/transaction/verify/${trx_ref}`,
      requestOptions
    );

    if (!response.ok) {
      console.log('network error');
    }

    const data = await response.json();

    const bookingId = trx_ref.split('id')[0];

    if (data.status === 'failed') {
      throw new Error(`payment verification failed: ${data.message}`);
    } else if (data.status === 'success') {
      const booking = (await BookingModel.findById(bookingId)
        .populate('room')
        .populate('user')
        .populate('hotel')) as any as IBookingDetail;

      // todo: /
      // update booking
      await BookingModel.findByIdAndUpdate(
        bookingId,
        {
          isPaid: true,
          paymentDate: new Date(),
          status: BookingStatus.PAID,
        },
        {
          new: true,
        }
      );

      // record payment on payments table
      const body: IPayment = {
        hotelId: new Types.ObjectId(booking.hotel._id),
        roomId: new Types.ObjectId(booking.room._id),

        firstName: booking.user.firstName,
        lastName: booking.user.lastName,
        email: booking.user.email,
        phoneNumber: booking.user.phoneNumber,
        gender: booking.user.gender,
        dateOfBirth: booking.user.dateOfBirth,

        hotelName: booking.hotel.name,
        hotelSummary: booking.hotel.summary,
        roomNumber: booking.room.roomNumber,
        roomType: booking.room.roomType,
        roomFacilities: booking.room.roomFacilities,
        capacity: booking.room.capacity,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,

        totalPrice: booking.totalPrice!,
        pricePerNight: booking.pricePerNight!,
        numOfNights: booking.numOfNights!,
      };

      await PaymentModel.create(body);

      res.status(200).send();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: (err as Error).message,
    });
  }
}
