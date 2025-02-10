import { Request, Response } from 'express';
import { IUser } from '../interfaces/user.interface';
import {
  OnboardingDto,
  validateOnboardingDto,
} from '../middleware/validate-complete-onboarding-dto.middleware';
import { UsersService } from './users.service';
import { uploadFileLocal } from '../../lib/utils/file-upload.util';
import { UserPhoto } from '../enums/user-photo.enum';

export type UserMulterFiles = {
  [key in UserPhoto]?: Express.Multer.File[];
};

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

    const files = req.files as UserMulterFiles;

    if (!files?.[UserPhoto.ID_PHOTO_BACK]) {
      res.status(400).json({
        status: 'fail',
        message: 'id photo back is required',
      });
      return;
    }

    if (!files?.[UserPhoto.ID_PHOTO_FRONT]) {
      res.status(400).json({
        status: 'fail',
        message: 'id photo front is required',
      });
      return;
    }

    if (!files?.[UserPhoto.PROFILE_PICTURE]) {
      res.status(400).json({
        status: 'fail',
        message: 'profile picture is required',
      });
      return;
    }

    const idPhoto_back = files[UserPhoto.ID_PHOTO_BACK]![0];
    const idPhoto_front = files[UserPhoto.ID_PHOTO_FRONT]![0];
    const profilePicture = files[UserPhoto.PROFILE_PICTURE]![0];

    data.idPhoto_back = uploadFileLocal(idPhoto_back);
    data.idPhoto_front = uploadFileLocal(idPhoto_front);
    data.profilePicture = uploadFileLocal(profilePicture);

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
