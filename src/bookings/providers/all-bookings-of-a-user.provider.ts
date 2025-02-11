import { Request, Response } from 'express';
import UserModel from '../../users/users.model';
import BookingModel from '../bookings.model';
import { Types } from 'mongoose';
import { getPaginationDataUtil } from '../../lib/utils/get-pagination-data.util';
import { IGetAllBookingOfAUserQuery } from '../interfaces/get-all-bookings-of-a-user.interface';

export async function getAllBookingsOfAUserProvider(
  req: Request,
  res: Response
) {
  console.log('all-bookings-of-a-user.provider...');
  try {
    const { userId } = req.params;
    const { limit, page, status } = req.query as IGetAllBookingOfAUserQuery;

    const user = await UserModel.findById(userId);

    if (!user) {
      res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
      return;
    }

    const filter: Record<string, any> = { user: new Types.ObjectId(userId) };

    if (status) filter.status = status;

    // pagination
    const { skip, _limit, totalPages, _page } = await getPaginationDataUtil(
      limit,
      page,
      BookingModel,
      { user: new Types.ObjectId(userId) }
    );

    const userBookingsDetail = await BookingModel.find(filter)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(_limit)
      .populate('room')
      .populate('hotel');

    res.status(200).json({
      status: 'success',
      pagination: {
        totalPages,
        limit: _limit,
        page: _page,
      },
      data: userBookingsDetail,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: (err as Error).message,
    });
  }
}
