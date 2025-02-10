import { Request, Response } from "express";
import UserModel from "../users.model";

export async function declineVerificationRequestProvider(req: Request, res: Response) {
  console.log("declineVerificationRequestProvider...")
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id)

    if (!user) {
      res.status(404).json({
        status: 'fail',
        message: 'user not found'
      })
      return;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, {
      isOnboarding: true,
      isVerificationRequested: false,
      isVerified: false
    }, { new: true })


    res.status(200).json({
      status: 'success',
      data: updatedUser,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: (err as Error).message,
    })
  }
}
