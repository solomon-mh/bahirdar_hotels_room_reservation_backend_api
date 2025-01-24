import { environmentSchema } from './environment.validation';

const envValidationResult = environmentSchema.safeParse(process.env);

if (!envValidationResult.success) {
  throw new Error(
    `Environment variables validation error, ${envValidationResult.error.errors
      .map((err) => err.message)
      .join(', ')}`
  );
}

export const envConfig = envValidationResult.data;
