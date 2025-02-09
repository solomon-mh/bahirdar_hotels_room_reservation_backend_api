import { Request, Response } from 'express';
import BookingModel from '../../bookings/bookings.model';
import { IBookingDetail } from '../../lib/shared/booking-detail.interface';
import { envConfig } from '../../lib/config/environment.config';
// import axios from 'axios';

export async function acceptBookingPaymentProvider(
  req: Request,
  res: Response
) {
  console.log('Accepting booking payment...');
  try {
    const { bookingId } = req.params;

    const booking = (await BookingModel.findById(bookingId)
      .populate('room')
      .populate('user')
      .populate('hotel')) as any as IBookingDetail;

    if (!booking) {
      res.status(404).json({ status: 'fail', message: 'Booking not found' });
      return;
    }

    if (booking.isPaid) {
      res
        .status(400)
        .json({ status: 'fail', message: 'Booking already paid for' });
      return;
    }

    const tx_ref = `${booking._id.toString()}id${Date.now()
      .toString()
      .slice(-5)}`;
    const amount = booking.totalPrice!.toString();

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${envConfig.CHAPA_API_KEY}`);
    myHeaders.append('Content-Type', 'application/json');

    console.log(myHeaders);
    console.log('Generated tx_ref:', tx_ref);
    console.log(booking.user);

    const raw = JSON.stringify({
      amount,
      tx_ref,
      currency: 'ETB',
      email: booking.user.email,
      first_name: booking.user.firstName,
      last_name: booking.user.lastName,
      callback_url: `${envConfig.CHAPA_CALLBACK_URL}`,
      return_url: `${envConfig.FRONTEND_URL}/payment/${tx_ref}`,
      customization: {
        title: 'Hotelify',
      },
    });

    const response = await fetch(
      'https://api.chapa.co/v1/transaction/initialize',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${envConfig.CHAPA_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: raw,
        redirect: 'follow',
      }
    );

    if (!response.ok) {
      const resBody = await response.json();
      console.log(resBody);
      throw new Error('Network error on payment initialization');
    }

    const data = await response.json();
    if (data.status === 'failed') {
      throw new Error('Failed to initialize payment');
    }

    res.status(200).json({
      status: 'success',
      data: {
        chapa: data,
        booking,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: (err as Error).message,
    });
  }
}
