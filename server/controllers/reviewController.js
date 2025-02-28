// import catchAsync from "../utils/catchAsync.js";
import Review from "../models/reviewModel.js";
// import mongoose from "mongoose";
import {
  getAll,
  getOne,
  // createOne,
  // updateOne,
  deleteOne,
} from "./../utils/handleFactory.js";
import Product from "../models/productModel.js";
import catchAsync from "../utils/catchAsync.js";

const addReviewToProduct = catchAsync(async (req, res) => {
  const { productId } = req.body;

  const product = await Product.findById(productId).populate("reviews");
  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  const review = await Review.create(req.body);
  product.reviews.push(review._id);

  await product.save();
  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
});

const getAllReviews = getAll(Review, [
  {
    path: "user",
    select: "username userImage",
  },
  {
    path: "product",
    select: "title price",
  },
]);
// const updateReview = updateOne(Review);
const getReviewById = getOne(Review, [
  {
    path: "user",
    select: "username userImage",
  },
  {
    path: "product",
    select: "title price",
  },
]);
const deleteReview = deleteOne(Review);

export { getAllReviews, addReviewToProduct, getReviewById, deleteReview };
