import { Request, Response } from 'express';
import UserModel from '../../users/users.model';
import {
  SignupDto,
  validateSignupDto,
} from '../middlewares/validate-sign-up.middleware';
import { IUser } from '../../users/interfaces/user.interface';

export async function signupProvider(req: Request, res: Response) {
  console.log('sign up...');
  try {
    const signupDto: SignupDto = req.body;
    const validationResult = validateSignupDto(signupDto);

    if (validationResult.success === false) {
      const validationErrors = validationResult.error.errors.map(
        (error) => error.message
      );
      res.status(400).json({
        status: 'fail',
        message: 'validation failed',
        errors: validationErrors,
      });

      return;
    }

    const user = (await UserModel.create(signupDto)) as any as IUser;

    res.status(201).json({
      status: 'success',
      isOnboarding: user.isOnboarding,
      message:
        'login and continue with the onboarding process and start using the app',
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: (error as Error).message,
    });
  }
}
