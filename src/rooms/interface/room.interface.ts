import { Types } from 'mongoose';
import { RoomType } from '../enums/room-type.enum';

export interface IRoom {
  _id?: Types.ObjectId;

  hotel: Types.ObjectId;
  roomNumber: string;
  roomType: RoomType;
  roomFacilities: string[];
  capacity: number;
  description: string;
  pricePerNight: number;
  images: string[];

  createdAt?: Date;
  updatedAt?: Date;
}
