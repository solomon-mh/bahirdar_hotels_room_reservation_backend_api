import { IRoom } from '../interface/room.interface';
import { CreateRoomSchema } from './validate-create-room-dto.middleware';

const UpdateRoomSchema = CreateRoomSchema.partial();

export function validateUpdateRoomDto(updateRoomDto: Partial<IRoom>) {
  const data = UpdateRoomSchema.safeParse(updateRoomDto);
  return data;
}
