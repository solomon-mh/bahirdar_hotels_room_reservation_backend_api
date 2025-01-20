import * as z from 'zod';
import { IUser } from '../interfaces/user.interface';
import { Gender } from '../enums/gender.enum';
import { UserRole } from '../enums/user-role.enum';

export const AddressZodSchema = z.object({
  city: z
    .string({ message: 'city is required' })
    .min(4, { message: 'city should be at least 4 characters' })
    .max(255, { message: 'city should be at most 255 characters' }),
  subcity: z
    .string({ message: 'subcity is required' })
    .min(4, { message: 'subcity should be at least 4 characters' })
    .max(255, { message: 'subcity should be at most 255 characters' }),
  woreda: z
    .string({ message: 'woreda is required' })
    .min(1, { message: 'woreda should be at least 1 characters' })
    .max(255, { message: 'woreda should be at most 255 characters' }),
  street: z
    .string({ message: 'street is required' })
    .min(4, { message: 'street should be at least 4 characters' })
    .max(255, { message: 'street should be at most 255 characters' }),
});

export const createUserSchema = z.object({
  firstName: z
    .string({ message: 'firstName is required' })
    .min(4, { message: 'firstName should be at least 4 characters' })
    .max(255, { message: 'firstName should be at most 255 characters' }),
  lastName: z
    .string({ message: 'lastName is required' })
    .min(4, { message: 'lastName should be at least 4 characters' })
    .max(255, { message: 'lastName should be at most 255 characters' }),
  username: z
    .string({ message: 'username is required' })
    .min(4, { message: 'username should be at least 4 characters' })
    .max(255, { message: 'username should be at most 255 characters' }),
  dateOfBirth: z
    .string({ message: 'date of birth is required' })
    .datetime({ message: 'Invalid date format' }),
  gender: z.enum(Object.values(Gender) as [Gender, ...Gender[]], {
    message: 'Invalid gender, it should be either male or female',
  }),
  email: z
    .string({ message: 'email is required' })
    .email({ message: 'Invalid email format' }),
  phoneNumber: z
    .string({ message: 'phone number is required' })
    .min(10, { message: 'Invalid phone number' }),
  role: z.optional(
    z.enum(Object.values(UserRole) as [UserRole, ...UserRole[]], {
      message: 'Invalid role',
    })
  ),
  address: AddressZodSchema,
});

export function validateCreateUserDto(createUserDto: IUser) {
  const data = createUserSchema.safeParse(createUserDto);
  return data;
}
