// import catchAsync from "../utils/catchAsync.js";
import Review from "../models/reviewModel.js";
// import mongoose from "mongoose";

import Product from "../models/productModel.js";
import catchAsync from "../utils/catchAsync.js";

const addReviewToProduct = catchAsync(async (req, res) => {
  const { productId, rating, message } = req.body;

  if (!productId || !rating || !message) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide product id, rating, and message",
    });
  }

  const product = await Product.findById(productId).populate("reviews");

  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  const alreadyReviewed = product.reviews.some(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    return res.status(400).json({
      status: "fail",
      message: "You have already reviewed this product",
    });
  }

  const review = await Review.create({
    product: productId,
    user: req.user._id,
    rating,
    message,
  });

  product.reviews.push(review._id);

  const totalReviews = product.reviews.length;
  const totalRating =
    (product.averageRating * (totalReviews - 1) + rating) / totalReviews;

  product.averageRating = totalRating;

  await product.save();

  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
});

const getReviewsForProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const reviews = await Review.find({ product: productId }).populate([
    { path: "user", select: "username userImage" },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
});
// const deleteReview = deleteOne(Review);

export { addReviewToProduct, getReviewsForProduct };
