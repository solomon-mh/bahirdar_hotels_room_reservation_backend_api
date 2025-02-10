import { Request, Response } from 'express';
import BookingModel from '../bookings.model';
import { Types } from 'mongoose';
import HotelModel from '../../hotels/hotels.model';
import { IGetAllQuery } from '../../lib/shared/get-all-query.interface';
import { getPaginationDataUtil } from '../../lib/utils/get-pagination-data.util';

export async function getAllBookingsOfAHotelProvider(
  req: Request,
  res: Response
) {
  console.log('get all bookings of a hotel...');
  try {
    const { hotelId } = req.params;
    const { limit, page } = req.query as IGetAllQuery;

    const hotel = await HotelModel.findById(hotelId);

    if (!hotel) {
      res.status(400).json({
        status: 'fail',
        message: 'Hotel not found',
      });
      return;
    }

    // pagination
    const { skip, _limit, totalPages, _page } = await getPaginationDataUtil(
      limit,
      page,
      BookingModel,
      { hotel: new Types.ObjectId(hotelId) }
    );

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

      // pagination
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: _limit,
      },
    ]);

    res.status(200).json({
      status: 'success',
      pagination: {
        totalPages,
        page: _page,
        limit: _limit,
      },
      hotel,
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
