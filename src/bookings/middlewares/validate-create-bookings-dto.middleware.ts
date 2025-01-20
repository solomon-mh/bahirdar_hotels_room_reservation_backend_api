import * as z from 'zod';
import { BookingStatus } from '../enums/booking-status.enum';

export const CreateBookingSchema = z.object({
  user: z.string().uuid({ message: 'Invalid user id' }),
  room: z.string().uuid({ message: 'Invalid room id' }),
  checkIn: z.string().datetime({ message: 'Invalid date format' }),
  checkOut: z.string().datetime({ message: 'Invalid date format' }),
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
