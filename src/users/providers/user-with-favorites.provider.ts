import { Request, Response } from "express";
import UserModel from "../users.model";
import { Types } from "mongoose";

export async function getUserWithFavoritesProvider(
  req: Request,
  res: Response
) {
  console.log("get user with favorites...");
  try {
    const userId = req.user?._id!;

    const data = await UserModel.aggregate([
      // find user by id
      { $match: { _id: new Types.ObjectId(userId) } },
      // lookup favorites
      {
        $lookup: {
          from: "favorites",
          localField: "_id",
          foreignField: "user",
          as: "favorites",
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      message: "User with favorites",
      data: data[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: (err as Error).message,
    });
  }
}
