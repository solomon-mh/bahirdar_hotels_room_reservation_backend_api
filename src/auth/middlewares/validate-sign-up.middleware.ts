import * as z from 'zod';

const SignupSchema = z
  .object({
    username: z
      .string({ message: 'Username is required' })
      .min(3, { message: 'Username must be at least 3 characters long' })
      .max(255, { message: 'Username must be at most 255 characters long' }),
    email: z
      .string({ message: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    phoneNumber: z.string({ message: 'Phone number is required' }),
    password: z
      .string({ message: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters long' }),
    passwordConfirm: z.string({ message: 'Password confirmation is required' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'password and password confirm do not match',
  });

export type SignupDto = z.infer<typeof SignupSchema>;

export function validateSignupDto(signupDto: SignupDto) {
  const result = SignupSchema.safeParse(signupDto);

  return result;
}
