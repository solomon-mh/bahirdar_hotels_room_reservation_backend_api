import * as z from 'zod';
import { BookingStatus } from '../enums/booking-status.enum';

export const CreateBookingSchema = z.object({
  user: z.string({ message: 'user id is required' }),
  room: z.string({ message: 'room id is required' }),
  checkIn: z
    .string({ message: 'check in date is required' })
    .datetime({ message: 'Invalid date format' }),
  checkOut: z
    .string({ message: 'check out date is required' })
    .datetime({ message: 'Invalid date format' }),
  status: z.enum(
    Object.values(BookingStatus) as [BookingStatus, ...BookingStatus[]],
    {
      message: 'Invalid status',
    }
  ),
});

export function validateCreateBookingDto(createBookingDto: any) {
  const result = CreateBookingSchema.safeParse(createBookingDto);

  return result;
}
