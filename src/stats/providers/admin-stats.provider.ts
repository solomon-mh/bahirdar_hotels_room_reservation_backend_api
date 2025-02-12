import { Request, Response } from 'express';
import HotelModel from '../../hotels/hotels.model';
import ReviewModel from '../../review/review.model';
import RoomModel from '../../rooms/room.model';
import UserModel from '../../users/users.model';
import BookingModel from '../../bookings/bookings.model';

// admin stats
/* 
    number of all hotels, reviews, rooms, users, bookings


  */
export async function adminStatsProvider(req: Request, res: Response) {
  console.log('admin-stats.provider...');
  try {
    const allHotels = await HotelModel.countDocuments();
    const allReviews = await ReviewModel.countDocuments();
    const allRooms = await RoomModel.countDocuments();
    const allUsers = await UserModel.countDocuments();
    // group by month
    const allBookings = await BookingModel.countDocuments();

    res.status(200).json({
      status: 'success',
      message: 'get all admin stats',
      data: {
        allHotels,
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
