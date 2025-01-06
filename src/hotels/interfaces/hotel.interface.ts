import { Types } from 'mongoose';
import { AddressInterface } from './address.interface';

export interface Hotel {
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
