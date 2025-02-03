import { Request, Response } from 'express';
import BookingModel from '../../bookings/bookings.model';
import { IBookingDetail } from '../../lib/shared/booking-detail.interface';

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

    const tx_ref =
      booking._id.toString() + 'id' + Date.now().toString().slice(-7);
    const amount = booking.totalPrice!.toString();

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${process.env.CHAPA_API_KEY}`);
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      amount,
      tx_ref,
      callback_url: `${process.env.CHAPA_CALLBACK_URL}`,
      return_url: `${process.env.FRONTEND_URL}/success/${tx_ref}`,
      'customization[title]': 'Payment for Booking',
    });

    const requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const response = await fetch(
      'https://api.chapa.co/v1/transaction/initialize',
      requestOptions
    );

    if (!response.ok) {
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
