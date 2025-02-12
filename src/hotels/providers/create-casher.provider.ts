import { Request, Response } from 'express';
import UserModel from '../../users/users.model';
import { IUser } from '../../users/interfaces/user.interface';
import { UserRole } from '../../users/enums/user-role.enum';
import { Types } from 'mongoose';
import HotelModel from '../hotels.model';

export async function createCasherProvider(req: Request, res: Response) {
  console.log('create-casher.provider...');
  try {
    const { hotelId, userId } = req.params;

    const hotel = await HotelModel.findById(hotelId);

    if (!hotel) {
      res.status(404).json({
        status: 'fail',
        message: 'Hotel not found',
      });
      return;
    }

    const user = (await UserModel.findById(userId)) as IUser;

    if (!user) {
      res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
      return;
    }

    if (user.role !== UserRole.USER) {
      res.status(400).json({
        status: 'fail',
        message: 'user could not be a cashier',
      });
      return;
    }

    const updatedData: Partial<IUser> = {
      role: UserRole.CASHIER,
      hotel: new Types.ObjectId(hotelId),
    };

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    res.status(200).json({
      status: 'success',
      message: 'User is now a cashier',
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: (err as Error).message,
    });
  }
}
