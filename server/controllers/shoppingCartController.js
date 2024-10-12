import catchAsync from "../utils/catchAsync.js";
import Review from "../models/reviewModel.js";
import mongoose from "mongoose";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "./../utils/handleFactory.js";

// add to cart
//route za to
// cart/productId
