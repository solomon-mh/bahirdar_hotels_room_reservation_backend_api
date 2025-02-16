import { Request, Response } from 'express';
import ReviewModel from '../review.model';

export async function getAllReviewsOfAUserProvider(
  req: Request,
  res: Response
) {
  console.log('get-all-reviews-of-a-user.provider...');
  try {
    const user = req.user;

    const reviews = await ReviewModel.find({ user: user._id }).populate(
      'hotel'
    );

    res.status(200).json({
      status: 'success',
      data: reviews,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: (err as Error).message,
    });
  }
}
