import { Types } from 'mongoose';
import { Gender } from '../../lib/shared/gender.enum';

export interface IPayment {
  _id?: Types.ObjectId;

  hotelId: Types.ObjectId;
  roomId: Types.ObjectId;

  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  phoneNumber: string;
  gender: Gender;

  hotelName: string;
  summary: string;
  roomNumber: string;
  roomType: string;
  roomFacilities: string[];
  capacity: number;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
  pricePerNight: number;
  numOfNights: number;

  createdAt?: Date;
  updatedAt?: Date;
}
