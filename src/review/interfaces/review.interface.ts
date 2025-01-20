import { Types } from 'mongoose';

export interface IReview {
  _id?: Types.ObjectId;

  user: Types.ObjectId;
  hotel: Types.ObjectId;
  rating: number;
  comment: string;

  createdAt?: Date;
  updatedAt?: Date;
}
