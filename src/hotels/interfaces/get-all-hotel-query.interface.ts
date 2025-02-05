import { GetAllQuery } from '../../lib/shared/get-all-query.interface';

export interface GetAllHotelQuery extends GetAllQuery {
  hotelStar?: string;
  avgRating?: string;
  sort?: string;
}
