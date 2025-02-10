import { Request, Response } from 'express';
import UserModel from '../users.model';

export async function getAllVerificationRequestsProvider(
  req: Request,
  res: Response
) {
  console.log('get all verification requested users provider...');
  try {
    const users = await UserModel.find({
      isVerificationRequested: true,
      isOnboarding: false,
      isVerified: false,
    });

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
