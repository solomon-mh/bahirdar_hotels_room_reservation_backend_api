import { Request, Response } from 'express';
import UserModel from '../users.model';

export async function verifyUserAccountProvider(req: Request, res: Response) {
  console.log('verify user provider...');
  try {
    const admin = req.user;
    const { id } = req.params;

    const user = await UserModel.findByIdAndUpdate(id, {
      isVerified: true,
      verifiedBy: admin._id!,
    });

    if (!user) {
      res.status(400).json({
        status: 'fail',
        message: 'No user found when verifying',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'User verified successfully',
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
