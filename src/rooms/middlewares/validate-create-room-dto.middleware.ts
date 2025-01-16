import * as z from 'zod';
import { RoomType } from '../enums/room-type.enum';

export const CreateRoomSchema = z.object({
  hotel: z.string(),
  roomNumber: z.string(),
  roomType: z.enum(Object.values(RoomType) as [RoomType, ...RoomType[]], {
    message: 'Invalid room type',
  }),
  roomFacilities: z.array(z.string()),
  capacity: z
    .number()
    .min(1, { message: 'room capacity should at least be 1 person' }),
  description: z
    .string()
    .min(30, { message: 'description should be at least 30 characters' })
    .max(255, { message: 'description should be at most 255 characters' }),
  pricePerNight: z.number().min(1, { message: 'price should be at least 1' }),
});

export function validateCreateRoomDto(createRoomDto: any) {
  const data = CreateRoomSchema.safeParse(createRoomDto);
  return data;
}
