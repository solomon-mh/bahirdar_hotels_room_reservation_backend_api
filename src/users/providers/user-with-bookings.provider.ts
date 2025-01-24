import { Request, Response } from 'express';
import UserModel from '../users.model';
import { Types } from 'mongoose';

export async function getUserWithBookingProvider(req: Request, res: Response) {
  console.log('get user with booking...');
  try {
    const userId = req.user._id!;

    const data = await UserModel.aggregate([
      // get user by id
      {
        $match: {
          _id: new Types.ObjectId(userId),
        },
      },
      // look up to bookings
      {
        $lookup: {
          from: 'bookings',
          localField: '_id',
          foreignField: 'user',
          as: 'bookings',
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      message: 'User with bookings',
      data: data[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: (err as Error).message,
    });
  }
}
