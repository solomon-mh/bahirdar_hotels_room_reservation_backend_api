import { Request, Response } from 'express';
import { UsersService } from './users.service';

const usersService = new UsersService();

export async function getCurrentUserProvider(req: Request, res: Response) {
  console.log('get current user...');
  try {
    const id = req.user._id;

    if (!id) {
      res.status(400).json({
        status: 'error',
        message: 'You are not logged in',
      });
      return;
    }

    const user = await usersService.getUser(id);

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: (err as Error).message,
      description: 'Error getting current user',
    });
  }
}
