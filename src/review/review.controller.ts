import { Request, Response } from "express";
import { IReview } from "./interfaces/review.interface";
import { ReviewService } from "./providers/review.service";
import {
  CreateReviewDto,
  validateCreateReviewDto,
} from "./middlewares/validate-create-review-dto.middleware";
import { validateUpdateReviewDto } from "./middlewares/validate-update-review-dto.middleware";
import { IUser } from "../users/interfaces/user.interface";
import { Types } from "mongoose";
import { IReviewModel } from "./review.model";
import { getAllReviewsOfAHotelProvider } from "./providers/get-all-reviews-a-hotel.provider";
import BookingModel from "../bookings/bookings.model";
import { getAllReviewsOfAUserProvider } from "./providers/get-all-reviews-of-a-user.provider";

export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // get all reviews
  async getAllReviews(req: Request, res: Response) {
    console.log("Get all reviews...");
    try {
      const reviews = await this.reviewService.findAllReviews();
      res.status(200).json({
        status: "success",
        data: reviews,
      });
    } catch (error) {
      console.log("Error getting all reviews", error);
      res.status(500).json({
        status: "error",
        message: (error as Error).message,
      });
    }
  }

  // get review
  async getReview(req: Request, res: Response) {
    console.log("Get review...");
    const { id } = req.params;
    try {
      const review = await this.reviewService.findReview(id);

      if (!review) {
        res.status(404).json({
          status: "error",
          message: "Review not found",
        });
        return;
      }

      res.status(200).json({
        status: "success",
        data: review,
      });
    } catch (error) {
      console.log("Error getting review", error);
      res.status(500).json({
        status: "error",
        message: (error as Error).message,
      });
    }
  }

  // create review
  async createReview(req: Request, res: Response) {
    console.log("Create review...");
    try {
      const user: IUser = req.user as IUser;
      const createReviewDto: CreateReviewDto = req.body;

      createReviewDto.user = user._id!.toString();

      if (user.isOnboarding) {
        res.status(400).json({
          status: "fail",
          message:
            "You need to complete your onboarding before you can review a hotel",
        });
        return;
      }

      const validationResult = validateCreateReviewDto(createReviewDto);

      if (validationResult.success === false) {
        const validationErrors = validationResult.error.errors.map(
          (error) => error.message
        );
        res.status(400).json({
          status: "error",
          message: "Validation failed",
          errors: validationErrors,
        });
        return;
      }

      const booking = await BookingModel.findOne({
        hotel: createReviewDto.hotel,
        user: createReviewDto.user,
        isPaid: true,
      });

      if (!booking) {
        res.status(200).json({
          status: "fail",
          message: "user should book a room before giving a review to a hotel",
        });
        return;
      }

      let review = await this.reviewService.findOne({
        hotel: new Types.ObjectId(createReviewDto.hotel),
        user: new Types.ObjectId(createReviewDto.user),
      });

      if (review) {
        res.status(400).json({
          status: "error",
          message: "You have already reviewed this hotel",
        });
        return;
      }

      review = await this.reviewService.createReview(createReviewDto);

      res.status(201).json({
        status: "success",
        data: review,
      });
    } catch (error) {
      console.log("Error creating review", error);
      res.status(500).json({
        status: "error",
        message: (error as Error).message,
      });
    }
  }

  // update review
  async updateReview(req: Request, res: Response) {
    console.log("Update review...");
    const { id } = req.params;
    try {
      const updateReviewDto: Partial<IReview> = req.body;

      const validationResult = validateUpdateReviewDto(updateReviewDto);

      if (validationResult.success === false) {
        const validationErrors = validationResult.error.errors.map(
          (error) => error.message
        );
        res.status(400).json({
          status: "error",
          message: "Validation failed",
          errors: validationErrors,
        });
        return;
      }

      const review = await this.reviewService.updateReview(id, updateReviewDto);

      if (!review) {
        res.status(404).json({
          status: "error",
          message: "Review not found",
        });
        return;
      }

      // UPDATE THE HOTEL BASED ON THE RATING GIVEN ON THE REVIEW
      const Review = review.constructor as IReviewModel;
      Review.calcAvgRating(review.hotel);

      res.status(200).json({
        status: "success",
        data: review,
      });
    } catch (error) {
      console.log("Error updating review", error);
      res.status(500).json({
        status: "error",
        message: (error as Error).message,
      });
    }
  }

  // delete review
  async deleteReview(req: Request, res: Response) {
    console.log("Delete review...");
    const { id } = req.params;
    try {
      const review = await this.reviewService.deleteReview(id);

      if (!review) {
        res.status(404).json({
          status: "error",
          message: "Review not found",
        });
        return;
      }

      // UPDATE THE HOTEL BASED ON THE RATING GIVEN ON THE REVIEW
      const Review = review.constructor as IReviewModel;
      Review.calcAvgRating(review.hotel);

      res.status(200).json({
        status: "success",
        message: "Review deleted successfully",
      });
    } catch (error) {
      console.log("Error deleting review", error);
      res.status(500).json({
        status: "error",
        message: (error as Error).message,
      });
    }
  }

  // GET ALL REVIEWS OF A HOTEL
  getAllReviewsOfAHotel(req: Request, res: Response) {
    getAllReviewsOfAHotelProvider(req, res);
  }

  // GET ALL REVIEWS OF A USER
  getAllReviewsOfAUser(req: Request, res: Response) {
    getAllReviewsOfAUserProvider(req, res);
  }
}
