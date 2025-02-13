import { Request, Response } from 'express';
import { IUser } from '../../users/interfaces/user.interface';
import FavoriteModel from '../favorites.model';
import { Types } from 'mongoose';

export async function getFavoriteByUserProvider(req: Request, res: Response) {
  console.log('get favorite by user...');
  try {
    const user = req.user as IUser;

    const favorites = await FavoriteModel.find({
      user: new Types.ObjectId(user._id),
    }).populate('hotel');

    res.status(200).json({
      status: 'success',
      message: 'Favorites fetched successfully',
      data: favorites,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: (err as Error).message,
    });
  }
}
