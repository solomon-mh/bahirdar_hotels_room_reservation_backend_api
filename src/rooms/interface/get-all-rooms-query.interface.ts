import { IGetAllQuery } from '../../lib/shared/get-all-query.interface';
import { RoomType } from '../enums/room-type.enum';

export interface IGetAllRoomsQuery extends IGetAllQuery {
  roomType?: RoomType;
  hotel?: string;
}
