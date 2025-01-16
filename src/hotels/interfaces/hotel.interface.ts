import { Types } from 'mongoose';
import { AddressInterface } from '../../lib/shared/address.interface';

export interface IHotel {
  _id?: string;
  name: string;
  hotelStar?: number;
  imageCover: string;
  hotelImages: string[];
  address: AddressInterface;
  summary: string;
  description: string;
  facilities: string[];
  manager: Types.ObjectId;
  minPricePerNight: number;
  numOfRooms: number;
  numOfRatings: number;
  avgRating: number;
}
