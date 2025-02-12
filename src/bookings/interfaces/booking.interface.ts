import { Types } from 'mongoose';
import { BookingStatus } from '../enums/booking-status.enum';

export interface IBooking {
  _id?: Types.ObjectId;

  user: Types.ObjectId;
  room: Types.ObjectId;
  payment: Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  status: BookingStatus;

  isPaid: boolean;
  paymentDate: Date;

  numOfNights?: number;
  hotel?: Types.ObjectId;
  totalPrice?: number;
  pricePerNight?: number;

  createdAt?: Date;
  updatedAt?: Date;
}
