import { Request, Response } from "express";
import { UsersService } from "./users.service";
import { UserRole } from "../enums/user-role.enum";
import UserModel from "../users.model";

const usersService = new UsersService();

export async function getCurrentUserProvider(req: Request, res: Response) {
  console.log("get current user...");
  try {
    const currentUser = req.user;
    if (!currentUser) throw new Error("Current User not found");

    let user;

    if (
      currentUser.role === UserRole.ADMIN ||
      currentUser.role === UserRole.USER
    ) {
      user = await usersService.getUser(currentUser._id!);
    } else if (
      currentUser.role === UserRole.CASHIER ||
      currentUser.role === UserRole.MANAGER
    ) {
      user = await UserModel.findById(currentUser._id!).populate("hotel");
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: (err as Error).message,
      description: "Error getting current user",
    });
  }
}
