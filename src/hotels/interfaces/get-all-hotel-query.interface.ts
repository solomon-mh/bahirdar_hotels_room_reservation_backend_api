import { IGetAllQuery } from '../../lib/shared/get-all-query.interface';

export interface IGetAllHotelQuery extends IGetAllQuery {
  hotelStar?: string;
  avgRating?: string;
  sort?: string;
}
