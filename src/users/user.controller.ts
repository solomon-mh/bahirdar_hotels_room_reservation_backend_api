import { Request, Response } from 'express';
import { UsersService } from './providers/users.service';
import { IUser } from './interfaces/user.interface';

export class UsersController {
  constructor(private usersService: UsersService) {}

  // get all users
  async getAllUsers(req: Request, res: Response) {
    console.log('get all users...');
    try {
      const users = await this.usersService.getAllUsers();

      res.status(200).json({
        status: 'success',
        data: users,
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
      const user = await this.usersService.createUser(createUserDto);

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
}
