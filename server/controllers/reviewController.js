import catchAsync from "../utils/catchAsync.js";
import Review from "../models/reviewModel.js";
import mongoose from "mongoose";
import Product from "../models/productModel.js";

const getAllReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find();

  if (reviews.length === 0 || !reviews) {
    return res.status(404).json({ message: "No reviews found" });
  }

  res.status(200).json(reviews);
});

const createReview = catchAsync(async (req, res) => {
  const { product, user, message, rating } = req.body;
  if (!product || !user || !message || rating === undefined) {
    return res.status(400).json({
      status: "fail",
      message: "All fields required.",
    });
  }

  const newReview = await Review.create({
    product,
    user,
    message,
    rating,
  });

  await Product.findByIdAndUpdate(
    product,
    { $push: { reviews: newReview._id } },
    { new: true }
  );

  await Product.calculateAverageRating(product);

  res.status(200).json({
    data: {
      review: newReview,
    },
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { product, user, message, rating } = req.body;

  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(404).json({ message: "Invalid review ID" });
  }

  const existingReview = await Review.findById(reviewId);

  if (!existingReview) {
    return res.status(404).json({ message: "Review doesn't exist" });
  }

  let updatedReviewData = {
    product,
    user,
    message,
    rating,
  };

  const updatedReview = await Review.findByIdAndUpdate(
    reviewId,
    updatedReviewData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedReview) {
    return res.status(404).json({ message: "Review not found." });
  }

  res.status(200).json({ updatedReview });
});

const getReviewById = catchAsync(async (req, res) => {
  const { reviewId } = req.params;

  if (!reviewId) {
    return res.status(404).json({ message: "No review with that ID" });
  }

  if (!mongoose.isValidObjectId(reviewId)) {
    return res.status(400).json({ message: "Invalid review ID" });
  }

  const review = await Review.findById(reviewId);

  if (!review) {
    return res.status(404).json({ message: "No review found" });
  }
  res.status(200).json(review);
});

const deleteReview = catchAsync(async (req, res) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(404).json({ message: "Invalid review ID" });
  }

  const existingReview = await Review.findById(reviewId);
  console.log(existingReview);

  const review = await Review.findByIdAndDelete(reviewId);

  if (review) {
    res.status(200).json({ message: "Deleted review" });
  } else {
    return res.status(404).json({ message: "No review found with that ID" });
  }
});

export {
  getAllReviews,
  createReview,
  updateReview,
  getReviewById,
  deleteReview,
};
