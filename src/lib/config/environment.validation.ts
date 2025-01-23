import * as z from 'zod';

export const environmentSchema = z.object({
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z.string().default('development'),
  SWAGGER_SERVER_URL: z.string().default('http://localhost:5000'),
  MONGO_URI: z
    .string()
    .default('mongodb://localhost:27017/HotelBookingFinalYearProjectDb'),
  BACKEND_URL: z.string().default('http://localhost:5000'),
  JWT_SECRET: z.string({ message: 'JWT_SECRET is required' }),
  JWT_EXPIRES_IN: z.string({ message: 'JWT_EXPIRES_IN is required' }),
  JWT_COOKIE_EXPIRES_IN: z.string({
    message: 'JWT_COOKIE_EXPIRES_IN is required',
  }),
  EMAIL_HOST: z.string({ message: 'EMAIL_HOST is required' }),
  EMAIL_PORT: z.string({ message: 'EMAIL_PORT is required' }),
  EMAIL_USERNAME: z.string({ message: 'EMAIL_USERNAME is required' }),
  EMAIL_PASSWORD: z.string({ message: 'EMAIL_PASSWORD is required' }),
  EMAIL_FROM: z.string({ message: 'EMAIL_FROM is required' }),
  SENDGRID_USERNAME: z.string({ message: 'SENDGRID_USERNAME is required' }),
  SENDGRID_PASSWORD: z.string({ message: 'SENDGRID_PASSWORD is required' }),
  RESET_PASSWORD_FRONTEND_URL: z.string({
    message: 'RESET_PASSWORD_FRONTEND_URL is required',
  }),
});
