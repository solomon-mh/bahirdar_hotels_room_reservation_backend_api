import { Request, Response } from 'express';
import BookingModel from '../bookings.model';

export async function getBookingWithRoomUserHotelDetailProvider(
  req: Request,
  res: Response
) {
  console.log('get bookings with room user hotel detail provider...');
  try {
    const { id } = req.params;

    const bookingWithDetail = await BookingModel.findById(id)
      .populate('room')
      .populate('user')
      .populate('hotel');

    if (!bookingWithDetail) {
      res.status(404).json({
        status: 'error',
        message: 'booking not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: bookingWithDetail,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: (err as Error).message,
    });
  }
}
