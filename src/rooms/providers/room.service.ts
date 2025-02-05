import { Types } from 'mongoose';
import { IGetAllRoomsQuery } from '../interface/get-all-rooms-query.interface';
import { IRoom } from '../interface/room.interface';
import RoomModel from '../room.model';
import { roomSearchQueryHelper } from '../helpers/room-search-query.helper';
import { getPaginationDataUtil } from '../../lib/utils/get-pagination-data.util';
import { mapRoomSortParametersHelper } from '../helpers/map-room-sort-parameter.helper';

export class RoomsService {
  // find all rooms
  async findAllRooms(query: IGetAllRoomsQuery) {
    const { roomType, hotel, limit, page, search, sort } =
      query as IGetAllRoomsQuery;

    const filter: Record<string, any> = {};

    if (roomType) filter.roomType = roomType;
    if (hotel) filter.hotel = new Types.ObjectId(hotel);

    if (search) {
      // search by roomNumber, description
      filter.$or = roomSearchQueryHelper(search);
    }

    // pagination
    const { skip, _limit, totalPages, _page } = await getPaginationDataUtil(
      limit,
      page,
      RoomModel
    );

    const _sort: Partial<Record<keyof IRoom, any>> =
      mapRoomSortParametersHelper(sort);

    const rooms = await RoomModel.find().sort(_sort).skip(skip).limit(_limit);

    return {
      pagination: {
        totalPages,
        limit: _limit,
        page: _page,
      },
      rooms,
    };
  }
  // find room
  async findRoom(id: string) {
    const room = await RoomModel.findById(id);
    return room;
  }
  // create room
  async createRoom(data: IRoom) {
    const room = await RoomModel.create(data);
    return room;
  }
  // update room
  async updateRoom(id: string, data: Partial<IRoom>) {
    const room = await RoomModel.findByIdAndUpdate(id, data, { new: true });
    return room;
  }
  // delete room
  async deleteRoom(id: string) {
    const room = await RoomModel.findByIdAndDelete(id);
    return room;
  }

  // find one
  async findOne(filter: Partial<IRoom>) {
    const room = await RoomModel.findOne(filter);
    return room;
  }
}
