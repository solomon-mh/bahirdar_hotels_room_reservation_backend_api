import { Request, Response } from 'express';
import { IUser } from '../interfaces/user.interface';
import {
  OnboardingDto,
  validateOnboardingDto,
} from '../middleware/validate-complete-onboarding-dto.middleware';
import { UsersService } from './users.service';

const usersService = new UsersService();

export async function completeOnboardingProvider(req: Request, res: Response) {
  console.log('complete on boarding...');
  try {
    const user = req.user;

    const data = {} as Partial<IUser>;
    const completeOnboardingDto = req.body as OnboardingDto;

    const validationResult = validateOnboardingDto(completeOnboardingDto);
    if (validationResult.success === false) {
      const validationErrors = validationResult.error.errors.map(
        (error) => error.message
      );
      res.status(400).json({
        status: 'fail',
        message: 'Validation failed',
        errors: validationErrors,
      });
      return;
    }

    const { address, dateOfBirth, firstName, gender, lastName, phoneNumber } =
      completeOnboardingDto;

    data.isOnboarding = false;
    data.firstName = firstName;
    data.lastName = lastName;
    data.dateOfBirth = new Date(dateOfBirth);
    data.gender = gender;
    data.address = address;
    data.phoneNumber = phoneNumber;

    const onboardedUser = usersService.updateUser(user._id!, data);

    res.status(200).json({
      status: 'success',
      message: 'User profile is now complete, you can use our app',
      data: onboardedUser,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: (err as Error).message,
    });
  }
}
