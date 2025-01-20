import { Types } from 'mongoose';
import { BookingStatus } from '../enums/booking-status.enum';

export interface IBooking {
  _id?: Types.ObjectId;

  user: Types.ObjectId;
  room: Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  status: BookingStatus;

  createdAt?: Date;
  updatedAt?: Date;
}
