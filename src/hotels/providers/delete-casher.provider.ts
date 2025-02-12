import { Request, Response } from 'express';
import HotelModel from '../hotels.model';
import UserModel from '../../users/users.model';
import { IUser } from '../../users/interfaces/user.interface';
import { UserRole } from '../../users/enums/user-role.enum';

export async function deleteCasherProvider(req: Request, res: Response) {
  console.log('delete-casher.provider...');
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

    if (user.role !== UserRole.CASHIER) {
      res.status(400).json({
        status: 'fail',
        message: 'User is not a cashier',
      });
      return;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, {
      $set: { role: UserRole.USER }, // Sets role to UserRole.USER
      $unset: { hotel: 1 }, // Removes the hotel field
    });

    res.status(200).json({
      status: 'success',
      message: 'User is no longer a cashier',
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
