import { Request, Response } from 'express';
import crypto from 'crypto';
import UserModel from '../../users/users.model';

export async function resetPasswordProvider(req: Request, res: Response) {
  console.log('reset password...');
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    const user = await UserModel.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      // return next(new AppError('Token is invalid or has expired', 400));
      res.status(400).json({
        status: 'fail',
        message: 'Token is invalid or has expired',
      });
      return;
    }

    const { password, passwordConfirm } = req.body;

    if (!password || !passwordConfirm) {
      res.status(400).json({
        status: 'fail',
        message: 'password and passwordConfirm fields are required',
      });
      return;
    }

    (user as any).password = req.body.password;
    (user as any).passwordResetToken = undefined;
    (user as any).passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Password reset successful',
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: (err as Error).message,
      description: 'Unable to Reset password',
    });
  }
}
