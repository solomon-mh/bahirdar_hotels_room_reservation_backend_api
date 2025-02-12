import { Request, Response } from 'express';
import { Types } from 'mongoose';
import BookingModel from '../../bookings/bookings.model';
import ReviewModel from '../../review/review.model';

// user stats
/* 
    number of all bookings, reviews
  */
export async function userStatsProvider(req: Request, res: Response) {
  console.log('user-stats.provider...');
  try {
    const { id } = req.params;

    const allBookings = await BookingModel.countDocuments({
      user: new Types.ObjectId(id),
    });
    const allReviews = await ReviewModel.countDocuments({
      user: new Types.ObjectId(id),
    });

    res.status(200).json({
      status: 'success',
      message: 'get all user stats',
      data: {
        allBookings,
        allReviews,
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
