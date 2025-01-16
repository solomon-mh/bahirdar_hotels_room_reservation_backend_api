import HotelModel from '../hotels.model';
import { IHotel } from '../interfaces/hotel.interface';

export class HotelsService {
  // find all hotels
  async findAllHotels() {
    const hotels = await HotelModel.find();
    return hotels;
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
