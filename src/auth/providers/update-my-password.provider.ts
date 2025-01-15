import { Request, Response } from 'express';
import UserModel from '../../user/users.model';
import { isCorrectPassword } from '../../lib/utils/password.util';

export async function updateMyPasswordProvider(req: Request, res: Response) {
  console.log('update my password...');
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      res.status(400).json({
        status: 'fail',
        message:
          'Please provide current password, new password and confirm password',
      });
      return;
    }

    const user = (await UserModel.findById(req.user._id)) as any;

    if (!user || !(await isCorrectPassword(currentPassword, user.password))) {
      res.status(404).json({
        status: 'fail',
        message: 'Invalid credentials',
      });
      return;
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Password updated successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: (err as Error).message,
    });
  }
}
