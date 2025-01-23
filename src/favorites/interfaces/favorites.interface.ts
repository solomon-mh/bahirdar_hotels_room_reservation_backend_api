import { Types } from 'mongoose';

export interface IFavorite {
  _id?: Types.ObjectId;

  user: Types.ObjectId;
  hotel: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}
