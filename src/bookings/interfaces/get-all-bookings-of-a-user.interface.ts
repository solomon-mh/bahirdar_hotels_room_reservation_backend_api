import { IGetAllQuery } from '../../lib/shared/get-all-query.interface';
import { BookingStatus } from '../enums/booking-status.enum';

export interface IGetAllBookingOfAUserQuery extends IGetAllQuery {
  status?: BookingStatus;
}
