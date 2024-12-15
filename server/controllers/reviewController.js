// import catchAsync from "../utils/catchAsync.js";
import Review from "../models/reviewModel.js";
// import mongoose from "mongoose";
import {
  getAll,
  getOne,
  // createOne,
  updateOne,
  deleteOne,
} from "./../utils/handleFactory.js";
import Product from "../models/productModel.js";

const addReviewToProduct = async (req, newReview) => {
  const { product } = req.body;

  await Product.findByIdAndUpdate(
    product,
    { $push: { reviews: newReview._id } },
    { new: true }
  );

  await Product.calculateAverageRating(product);
};

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
// const createReview = createOne(Review, addReviewToProduct);
const updateReview = updateOne(Review);
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

export {
  getAllReviews,
  // createReview,
  updateReview,
  getReviewById,
  deleteReview,
};
