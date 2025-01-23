import { Request, Response } from 'express';
import HotelModel from '../hotels.model';
import { Types } from 'mongoose';

export async function getHotelWithRoomsProvider(req: Request, res: Response) {
  console.log('get hotel with rooms...');
  try {
    const data = await HotelModel.aggregate([
      // get hotel by id
      { $match: { _id: new Types.ObjectId(req.params.id) } },
      // lookup rooms
      {
        $lookup: {
          from: 'rooms',
          localField: '_id',
          foreignField: 'hotel',
          as: 'rooms',
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      message: 'hotel with rooms',
      data: data[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: (err as Error).message,
    });
  }
}
