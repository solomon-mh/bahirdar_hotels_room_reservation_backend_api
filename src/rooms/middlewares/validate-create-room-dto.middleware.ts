import * as z from 'zod';
import { RoomType } from '../enums/room-type.enum';

export const CreateRoomSchema = z.object({
  hotel: z
    .string({ message: 'hotel id is required' })
    .uuid({ message: 'Invalid hotel id' }),
  roomNumber: z.string({ message: 'room number is required' }),
  roomType: z.enum(Object.values(RoomType) as [RoomType, ...RoomType[]], {
    message: 'Invalid room type',
  }),
  roomFacilities: z
    .array(z.string(), { message: 'room facilities are required' })
    .min(3, { message: 'room must have at least 3 facilities' }),
  capacity: z
    .number({ message: 'room capacity is required' })
    .min(1, { message: 'room capacity should at least be 1 person' }),
  description: z
    .string({ message: 'room description is required' })
    .min(30, { message: 'description should be at least 30 characters' })
    .max(255, { message: 'description should be at most 255 characters' }),
  pricePerNight: z
    .number({ message: 'price per night is required' })
    .min(1, { message: 'price should be at least 1' }),
});

export function validateCreateRoomDto(createRoomDto: any) {
  const data = CreateRoomSchema.safeParse(createRoomDto);
  return data;
}
