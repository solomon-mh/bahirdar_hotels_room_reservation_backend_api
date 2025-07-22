import { Request, Response } from "express";
import UserModel from "../users.model";

export async function requestIdentityVerificationProvider(
  req: Request,
  res: Response
) {
  console.log("request identity verification provider...");
  try {
    const user = req.user;
    if (!user) throw new Error("User not found");

    if (user.isOnboarding) {
      res.status(400).json({
        status: "fail",
        message: "you have not completed the onboarding process",
      });
      return;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        isVerificationRequested: true,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "success",
      message: "identity verification requested successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: (err as Error).message,
    });
  }
}
