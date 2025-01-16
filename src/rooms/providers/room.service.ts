import { IRoom } from '../interface/room.interface';
import RoomModel from '../room.model';

export class RoomsService {
  // find all rooms
  async findAllRooms() {
    const rooms = await RoomModel.find();
    return rooms;
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
