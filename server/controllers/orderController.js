// import catchAsync from "../utils/catchAsync.js";
import Order from "../models/orderModel.js";
// import mongoose from "mongoose";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "./../utils/handleFactory.js";


const getAllOrders = getAll(Order, [
  {
    path: "cart",
    popualte: [
      {
        path: "user",
        select: "username email userImage",
      },
      {
        path: "product.productId",
        select: "title price",
      },
    ],
  },
]);

// const createOrder = createOne(Order);

export { getAllOrders,  };
