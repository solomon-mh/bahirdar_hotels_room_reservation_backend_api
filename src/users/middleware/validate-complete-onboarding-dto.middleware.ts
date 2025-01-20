import * as z from 'zod';
import { Gender } from '../enums/gender.enum';
import { AddressZodSchema } from './validate-create-user-dto.middleware';

export const completeOnboardingSchema = z.object({
  firstName: z
    .string({ message: 'firstName is required' })
    .min(4, { message: 'firstName should be at least 4 characters' })
    .max(255, { message: 'firstName should be at most 255 characters' }),
  lastName: z
    .string({ message: 'lastName is required' })
    .min(4, { message: 'lastName should be at least 4 characters' })
    .max(255, { message: 'lastName should be at most 255 characters' }),
  dateOfBirth: z
    .string({ message: 'date of birth is required' })
    .datetime({ message: 'Invalid date format' }),
  gender: z.enum(Object.values(Gender) as [Gender, ...Gender[]], {
    message: 'Invalid gender, it should be either male or female',
  }),
  phoneNumber: z
    .string({ message: 'phone number is required' })
    .min(10, { message: 'Invalid phone number' }),
  address: AddressZodSchema,
});

export type OnboardingDto = z.infer<typeof completeOnboardingSchema>;

export function validateOnboardingDto(onboardingDto: OnboardingDto) {
  const data = completeOnboardingSchema.safeParse(onboardingDto);
  return data;
}
