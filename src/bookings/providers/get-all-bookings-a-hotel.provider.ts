import { Request, Response } from 'express';
import BookingModel from '../bookings.model';
import { Types } from 'mongoose';
import HotelModel from '../../hotels/hotels.model';

export async function getAllBookingsOfAHotelProvider(
  req: Request,
  res: Response
) {
  console.log('get all bookings of a hotel...');
  try {
    const { hotelId } = req.params;

    const hotel = await HotelModel.findById(hotelId);

    if (!hotel) {
      res.status(400).json({
        status: 'fail',
        message: 'Hotel not found',
      });
      return;
    }

    const bookings = await BookingModel.aggregate([
      {
        $match: {
          hotel: new Types.ObjectId(hotelId),
        },
      },
      {
        $lookup: {
          from: 'rooms',
          localField: 'room',
          foreignField: '_id',
          as: 'room',
        },
      },
      {
        $unwind: '$room',
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        hotel,
        bookings,
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
