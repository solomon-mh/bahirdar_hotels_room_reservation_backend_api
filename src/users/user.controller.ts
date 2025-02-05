import { Request, Response } from 'express';
import { UsersService } from './providers/users.service';
import { IUser } from './interfaces/user.interface';
import { validateCreateUserDto } from './middleware/validate-create-user-dto.middleware';
import { validateUpdateUserDto } from './middleware/validate-update-user-dto.middleware';
import { completeOnboardingProvider } from './providers/complete-onboarding.provider';
import { getCurrentUserProvider } from './providers/current-user.provider';
import { uploadFileLocal } from '../lib/utils/file-upload.util';
import { getManagerWithDetailProvider } from './providers/get-manager-with-detail.provider';
import { getUserWithBookingProvider } from './providers/user-with-bookings.provider';
import { getUserWithFavoritesProvider } from './providers/user-with-favorites.provider';
import { verifyUserAccountProvider } from './providers/verify-user-account.provider';
import { IGetAllUsersQuery } from './interfaces/get-all-users-query.interface';

export class UsersController {
  constructor(private usersService: UsersService) {}

  // get all users
  async getAllUsers(req: Request, res: Response) {
    console.log('get all users...');
    try {
      const data = await this.usersService.getAllUsers(
        req.query as IGetAllUsersQuery
      );

      res.status(200).json({
        status: 'success',
        pagination: data.pagination,
        data: data.users,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
  // get user
  async getUser(req: Request, res: Response) {
    console.log('get user...');
    try {
      const user = await this.usersService.getUser(req.params.id);

      if (!user) {
        res.status(404).json({
          status: 'fail',
          message: 'User not found',
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        data: user,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
  // create user
  async createUser(req: Request, res: Response) {
    console.log('create user...');
    try {
      const createUserDto = req.body as IUser;
      const validationResult = validateCreateUserDto(createUserDto);

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

      let user = await this.usersService.findOne({
        email: createUserDto.email,
      });

      if (user) {
        res.status(400).json({
          status: 'fail',
          message: 'Email already exists',
        });
        return;
      }

      user = await this.usersService.findOne({
        username: createUserDto.username,
      });

      if (user) {
        res.status(400).json({
          status: 'fail',
          message: 'Username already used by another user',
        });
        return;
      }

      user = await this.usersService.createUser(createUserDto);

      res.status(201).json({
        status: 'success',
        data: user,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
  // update user
  async updateUser(req: Request, res: Response) {
    console.log('update user...');
    try {
      const updateUserDto = req.body as Partial<IUser>;

      const validationResult = validateUpdateUserDto(updateUserDto);

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

      const file = req.file as Express.Multer.File;
      if (file) {
        updateUserDto.profilePicture = uploadFileLocal(file);
        console.log(file);
      }

      const user = await this.usersService.updateUser(
        req.params.id,
        updateUserDto
      );

      if (!user) {
        res.status(404).json({
          status: 'fail',
          message: 'User not found',
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        data: user,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
  // delete user
  async deleteUser(req: Request, res: Response) {
    console.log('delete user...');
    try {
      const user = await this.usersService.deleteUser(req.params.id);

      if (!user) {
        res.status(404).json({
          status: 'fail',
          message: 'User not found',
        });
        return;
      }

      res.status(204).json({
        status: 'success',
        data: null,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }

  // get current user
  async getCurrentUser(req: Request, res: Response) {
    getCurrentUserProvider(req, res);
  }

  // complete on boarding
  async completeOnboarding(req: Request, res: Response) {
    completeOnboardingProvider(req, res);
  }

  // get manager with detail
  async getManagerWithDetails(req: Request, res: Response) {
    getManagerWithDetailProvider(req, res);
  }

  // get user with booking
  async getUserWithBookings(req: Request, res: Response) {
    getUserWithBookingProvider(req, res);
  }

  // get user with favorites
  async getUserWithFavorites(req: Request, res: Response) {
    getUserWithFavoritesProvider(req, res);
  }

  // verify user account
  verifyUserAccount(req: Request, res: Response) {
    verifyUserAccountProvider(req, res);
  }
}
