import { Request, Response } from 'express';
import BookingModel from '../bookings.model';
import { UserRole } from '../../users/enums/user-role.enum';
import { Types } from 'mongoose';

export async function getAllBookingsWithRoomUserHotelDetailProvider(
  req: Request,
  res: Response
) {
  console.log('get all bookings with room user hotel detail provider...');
  try {
    const account = req.user;

    let filterObj: Record<string, any> = {};

    if (account.role !== UserRole.ADMIN) {
      filterObj.hotel = new Types.ObjectId(account.hotel);
    }

    const bookingsWithDetail = await BookingModel.find(filterObj)
      .populate('room')
      .populate('user')
      .populate('hotel');

    res.status(200).json({
      status: 'success',
      data: bookingsWithDetail,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: (err as Error).message,
    });
  }
}
