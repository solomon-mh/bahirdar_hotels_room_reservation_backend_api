import { Request, Response } from 'express';
import { createJWT } from '../../lib/utils/token.util';
import UserModel from '../../users/users.model';
import { IUser } from '../../users/interfaces/user.interface';
import { isCorrectPassword } from '../../lib/utils/password.util';
import { envConfig } from '../../lib/config/environment.config';

export async function loginProvider(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password',
      });
      return;
    }

    const user = (await UserModel.findOne({ email })) as IUser;

    if (!user || !(await isCorrectPassword(password, user.password))) {
      res.status(401).json({
        status: 'fail',
        message: 'Invalid email or password',
      });
      return;
    }

    // 3) If everything is ok, send token to client
    const token = createJWT({ id: user._id!, role: user.role! });

    res.cookie('token', token, {
      expires: new Date(
        Date.now() + envConfig.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: envConfig.NODE_ENV === 'production',
    });

    res.status(200).json({
      status: 'success',
      message: 'Logged in successfully',
      token,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: (err as Error).message,
      description: 'Unable to login',
    });
  }
}
