import { Request, Response } from 'express';
import UserModel from '../users.model';
import { IUser } from '../interfaces/user.interface';

export async function verifyUserAccountProvider(req: Request, res: Response) {
  console.log('verify user provider...');
  try {
    const admin = req.user;
    const { id } = req.params;

    const user = (await UserModel.findById(id)) as any as IUser;

    if (!user.isVerificationRequested) {
      res.status(400).json({
        status: 'fail',
        message: 'User has not requested for verification',
      });
      return;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        isVerified: true,
        verifiedBy: admin._id!,
      },
      {
        new: true,
      }
    );

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
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: (err as Error).message,
    });
  }
}
