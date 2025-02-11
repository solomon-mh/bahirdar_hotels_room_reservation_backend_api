import { IGetAllQuery } from '../../lib/shared/get-all-query.interface';
import { BookingStatus } from '../enums/booking-status.enum';

export interface IGetAllBookingsOfAHotel extends IGetAllQuery {
  room?: string;
  status?: BookingStatus;
  isPaid?: boolean;

  numOfNight?: number;
}
