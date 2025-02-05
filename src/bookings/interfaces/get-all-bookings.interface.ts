import { IGetAllQuery } from '../../lib/shared/get-all-query.interface';
import { BookingStatus } from '../enums/booking-status.enum';

export interface IGetAllBookingQuery extends IGetAllQuery {
  hotel?: string;
  room?: string;
  status?: BookingStatus;
  isPaid?: boolean;

  numOfNight?: number;
  paymentDate?: string;
}
