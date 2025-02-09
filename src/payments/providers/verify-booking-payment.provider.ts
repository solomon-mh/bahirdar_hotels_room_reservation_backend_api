import { Request, Response } from 'express';
import { envConfig } from '../../lib/config/environment.config';

export async function verifyBookingPaymentProvider(
  req: Request,
  res: Response
) {
  console.log('verify booking payment...');
  try {
    const { trx_ref } = req.params;

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${envConfig.CHAPA_API_KEY}`);
    const requestOptions: any = {
      method: 'GET',
      headers: myHeaders,
    };

    const response = await fetch(
      `https://api.chapa.co/v1/transaction/verify/${trx_ref}`,
      requestOptions
    );

    if (!response.ok) {
      console.log('network error');
    }

    const data = await response.json();

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: (err as Error).message,
    });
  }
}
