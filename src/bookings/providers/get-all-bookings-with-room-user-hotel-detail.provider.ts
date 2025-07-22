import { Request, Response } from "express";
import BookingModel from "../bookings.model";
import { UserRole } from "../../users/enums/user-role.enum";
import { Types } from "mongoose";
import { IGetAllBookingQuery } from "../interfaces/get-all-bookings.interface";
import { getPaginationDataUtil } from "../../lib/utils/get-pagination-data.util";

export async function getAllBookingsWithRoomUserHotelDetailProvider(
  req: Request,
  res: Response
) {
  console.log("get all bookings with room user hotel detail provider...");
  try {
    const account = req.user;
    if (!account) throw new Error("Account not found");

    const { isPaid, room, status, numOfNight, paymentDate, limit, page } =
      req.query as IGetAllBookingQuery;

    let filter: Record<string, any> = {};

    if (account.role !== UserRole.ADMIN) {
      filter.hotel = new Types.ObjectId(account.hotel);
    }

    if (room) filter.room = new Types.ObjectId(room);
    if (isPaid) filter.isPaid = isPaid;
    if (status) filter.status = status;
    if (numOfNight) filter.numOfNight = numOfNight;
    if (paymentDate) filter.paymentDate = { $gte: new Date(paymentDate) };

    // pagination
    const { skip, _limit, totalPages, _page } = await getPaginationDataUtil(
      limit,
      page,
      BookingModel
    );

    const bookingsWithDetail =
      account.role === UserRole.ADMIN
        ? await BookingModel.find(filter)
            .sort({ updatedAt: -1 })
            .skip(skip)
            .limit(_limit)
            .populate("room")
            .populate("user")
            .populate("hotel")
        : await BookingModel.find(filter)
            .sort({ updatedAt: -1 })
            .skip(skip)
            .limit(_limit)
            .populate("room")
            .populate("user");

    res.status(200).json({
      status: "success",
      pagination: {
        totalPages,
        limit: _limit,
        page: _page,
      },
      data: bookingsWithDetail,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: (err as Error).message,
    });
  }
}
