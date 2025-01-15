import { Request, Response } from 'express';
import UserModel from '../../user/users.model';
import sendEmail from '../../lib/utils/mail.util';

export const forgotPasswordProvider = async (req: Request, res: Response) => {
  try {
    console.log('forgot password...');
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        status: 'fail',
        message: 'Please provide your email address',
      });
      return;
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(404).json({
        status: 'fail',
        message: 'There is no user found with that email address',
      });
      return;
    }

    const resetToken = (user as any).createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    try {
      const resetURL = `${process.env.BACKEND_URL}/api/users/resetPassword/${resetToken}`;

      const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

      const html = `<h1>Forgot your password?</h1><p>Submit a PATCH request with your new password and passwordConfirm to: <a href="${process.env.RESET_PASSWORD_FRONTEND_URL}/${resetToken}" target='_blank'>${resetURL}</a></p>`;

      await sendEmail({
        email: (user as any).email as string,
        subject: 'Your password reset token (valid for 10 min)',
        message,
        html,
      });
    } catch (err) {
      (user as any).passwordResetToken = undefined;
      (user as any).passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      throw new Error('There was an error sending an email. Try again later');
    }

    res.status(200).json({
      status: 'success',
      message: 'token is sent to an email',
    });
  } catch (err) {}
};
