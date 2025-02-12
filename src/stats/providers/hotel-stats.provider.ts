import { Request, Response } from 'express';
import { Types } from 'mongoose';
import ReviewModel from '../../review/review.model';
import RoomModel from '../../rooms/room.model';
import UserModel from '../../users/users.model';
import BookingModel from '../../bookings/bookings.model';

// manager stats
// cashier stats
/* 
    hotel related
    number of all bookings, rooms, cashiers, reviews

    // number of booking per day
  */
export async function hotelStatsProvider(req: Request, res: Response) {
  console.log('hotel-stats.provider...');
  try {
    const { id } = req.params;
    const allRooms = await RoomModel.countDocuments({
      hotel: new Types.ObjectId(id),
    });
    const allUsers = await UserModel.countDocuments({
      hotel: new Types.ObjectId(id),
    });
    const allReviews = await ReviewModel.countDocuments({
      hotel: new Types.ObjectId(id),
    });

    // group by month
    const allBookings = await BookingModel.aggregate([
      {
        $match: { hotel: new Types.ObjectId(id) },
      },
      {
        $group: {
          _id: '$status',
          numOfBookings: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // Optional: Sort by status alphabetically
      },
      {
        $project: {
          _id: 0,
          status: '$_id',
          numOfBookings: 1,
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      message: 'get all hotel stats',
      data: {
        allRooms,
        allUsers,
        allReviews,
        allBookings,
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
