import { Request, Response } from 'express';
import { IUser } from '../interfaces/user.interface';
import UserModel from '../users.model';
import { Types } from 'mongoose';
import { UserRole } from '../enums/user-role.enum';

export async function getManagerWithDetailProvider(
  req: Request,
  res: Response
) {
  console.log('get manager with detail...');
  try {
    let user = req.user as IUser;

    // if (user.role !== UserRole.MANAGER || user.role !== UserRole.CASHIER) {
    if (![UserRole.MANAGER, UserRole.CASHIER].includes(user.role)) {
      res.status(403).json({
        status: 'fail',
        message: 'manager or cashier role is required',
      });
      return;
    }

    const data = (await UserModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(user._id),
        },
      },
      {
        $lookup: {
          from: 'hotels',
          localField: 'hotel',
          foreignField: '_id',
          as: 'hotel',
        },
      },
      {
        $unwind: '$hotel',
      },
    ])) as IUser[];

    res.status(200).json({
      status: 'success',
      data: data[0],
    });
  } catch (err) {
    console.log(err);
  }
}
