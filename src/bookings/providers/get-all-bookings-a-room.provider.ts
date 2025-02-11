import { Request, Response } from 'express';
import BookingModel from '../bookings.model';
import { Types } from 'mongoose';
import { IGetAllQuery } from '../../lib/shared/get-all-query.interface';
import { getPaginationDataUtil } from '../../lib/utils/get-pagination-data.util';
import RoomModel from '../../rooms/room.model';
import HotelModel from '../../hotels/hotels.model';
import { IRoom } from '../../rooms/interface/room.interface';

export async function getAllBookingsOfARoomProvider(
  req: Request,
  res: Response
) {
  console.log('get all bookings of a room...');
  try {
    const { roomId } = req.params;
    const { limit, page } = req.query as IGetAllQuery;

    const room = (await RoomModel.findById(roomId)) as any as IRoom;

    if (!room) {
      res.status(400).json({
        status: 'fail',
        message: 'Room not found',
      });
      return;
    }

    const hotel = await HotelModel.findById(room.hotel);

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
      { room: new Types.ObjectId(roomId) }
    );

    const bookings = await BookingModel.aggregate([
      {
        $match: {
          room: new Types.ObjectId(roomId),
        },
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
      room,
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
