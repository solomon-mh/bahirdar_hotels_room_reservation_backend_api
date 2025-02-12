import { Request, Response } from 'express';
import UserModel from '../../users/users.model';
import { UserRole } from '../../users/enums/user-role.enum';
import HotelModel from '../hotels.model';

export async function allHotelCashiersProvider(req: Request, res: Response) {
  console.log('all-hotel-cashiers.provider...');
  try {
    const { hotelId } = req.params;

    const hotel = await HotelModel.findById(hotelId);
    if (!hotel) {
      res.status(404).json({
        status: 'fail',
        message: 'Hotel not found',
      });
      return;
    }

    const cashier = await UserModel.find({
      hotel: hotelId,
      role: UserRole.CASHIER,
    });

    res.status(200).json({
      status: 'success',
      message: 'Cashiers fetched successfully',
      data: cashier,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: (err as Error).message,
    });
  }
}
