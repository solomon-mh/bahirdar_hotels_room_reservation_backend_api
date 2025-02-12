import { Request, Response } from 'express';
import UserModel from '../../users/users.model';
import sendEmail from '../../lib/utils/mail.util';
import { envConfig } from '../../lib/config/environment.config';
import { IUser } from '../../users/interfaces/user.interface';
import { getEmailHtmlTemplate } from '../../lib/utils/get-email-template.util';

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
      const message = `
          Dear ${(user as any as IUser).firstName} ${
        (user as any as IUser).lastName
      },

          We received a request to reset your password for your account at Bahir Dar Hotels Management (Hotelify).

          To reset your password, please use the link below. This link will expire in 10 minutes for your security:

          ${envConfig.RESET_PASSWORD_FRONTEND_URL}/${resetToken}

          If you did not request a password reset, please disregard this email. Your account is safe, and no action is needed.

          For any questions or assistance, feel free to reach out to our support team. We're here to help!

          Hotelify Team`;

      // const html = `<h1>Forgot your password?</h1><p>Submit a PATCH request with your new password and passwordConfirm to: <a href="${envConfig.RESET_PASSWORD_FRONTEND_URL}/${resetToken}" target='_blank'>${resetURL}</a></p>`;
      const html = getEmailHtmlTemplate(
        user as any as IUser,
        resetToken as string
      );

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
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: (err as Error).message,
    });
  }
};
