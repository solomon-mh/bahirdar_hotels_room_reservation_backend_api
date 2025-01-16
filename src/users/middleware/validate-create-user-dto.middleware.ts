import * as z from 'zod';
import { IUser } from '../interfaces/user.interface';
import { Gender } from '../enums/gender.enum';
import { UserRole } from '../enums/user-role.enum';

export const createUserSchema = z.object({
  firstName: z
    .string()
    .min(4, { message: 'firstName should be at least 4 characters' })
    .max(255, { message: 'firstName should be at most 255 characters' }),
  lastName: z
    .string()
    .min(4, { message: 'lastName should be at least 4 characters' })
    .max(255, { message: 'lastName should be at most 255 characters' }),
  username: z
    .string()
    .min(4, { message: 'username should be at least 4 characters' })
    .max(255, { message: 'username should be at most 255 characters' }),
  dateOfBirth: z.string().datetime({ message: 'Invalid date format' }),
  gender: z.enum(Object.values(Gender) as [Gender, ...Gender[]], {
    message: 'Invalid gender, it should be either male or female',
  }),
  email: z.string().email({ message: 'Invalid email format' }),
  phoneNumber: z.string().min(10, { message: 'Invalid phone number' }),
  role: z.optional(
    z.enum(Object.values(UserRole) as [UserRole, ...UserRole[]], {
      message: 'Invalid role',
    })
  ),
  address: z.object({
    city: z
      .string()
      .min(4, { message: 'city should be at least 4 characters' })
      .max(255, { message: 'city should be at most 255 characters' }),
    subcity: z
      .string()
      .min(4, { message: 'subcity should be at least 4 characters' })
      .max(255, { message: 'subcity should be at most 255 characters' }),
    woreda: z
      .string()
      .min(1, { message: 'woreda should be at least 1 characters' })
      .max(255, { message: 'woreda should be at most 255 characters' }),
    street: z
      .string()
      .min(4, { message: 'street should be at least 4 characters' })
      .max(255, { message: 'street should be at most 255 characters' }),
  }),
});

export function validateCreateUserDto(createUserDto: IUser) {
  const data = createUserSchema.safeParse(createUserDto);
  return data;
}
