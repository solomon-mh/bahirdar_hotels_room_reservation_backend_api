import { getPaginationDataUtil } from '../../lib/utils/get-pagination-data.util';
import { hotelSearchQueryHelper } from '../helpers/hotel-search-query.helper';
import { mapHotelSortParametersHelper } from '../helpers/map-hotel-sort-parameters.helper';
import HotelModel from '../hotels.model';
import { IGetAllHotelQuery } from '../interfaces/get-all-hotel-query.interface';
import { IHotel } from '../interfaces/hotel.interface';

export class HotelsService {
  // find all hotels
  async findAllHotels(query: IGetAllHotelQuery) {
    const { avgRating, hotelStar, limit, page, search, sort } =
      query as IGetAllHotelQuery;

    const filter: Record<string, any> = {};

    if (avgRating) filter.avgRating = { $gte: Number(avgRating) };
    if (hotelStar) filter.hotelStar = hotelStar;

    if (search) {
      // search by name, address( city, subcity, woreda, street ) and summary,
      filter.$or = hotelSearchQueryHelper(search);
    }

    // pagination
    const { skip, _limit, totalPages, _page } = await getPaginationDataUtil(
      limit,
      page,
      HotelModel
    );

    // sort
    const _sort: Partial<Record<keyof IHotel, any>> =
      mapHotelSortParametersHelper(sort);

    const hotels = await HotelModel.find(filter)
      .sort(_sort)
      .skip(skip)
      .limit(_limit);

    return {
      pagination: {
        totalPages,
        limit: _limit,
        page: _page,
      },
      hotels,
    };
  }
  // find hotel
  async findHotel(id: string) {
    const hotel = await HotelModel.findById(id);
    return hotel;
  }
  // create hotel
  async createHotel(data: IHotel) {
    const hotel = await HotelModel.create(data);
    return hotel;
  }
  // update hotel
  async updateHotel(id: string, data: Partial<IHotel>) {
    const hotel = await HotelModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return hotel;
  }
  // delete hotel
  async deleteHotel(id: string) {
    const hotel = await HotelModel.findByIdAndDelete(id);
    return hotel;
  }

  async findOne(filter: Partial<IHotel>) {
    const hotel = await HotelModel.findOne(filter);
    return hotel;
  }
}
