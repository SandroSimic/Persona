import catchAsync from "../utils/catchAsync.js";
import Order from "../models/orderModel.js";
import mongoose from "mongoose";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

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
  },
]);

const createOrder = createOne(Order);
const updateOrder = updateOne(Order);
const getOrderById = getOne(Order, [
  {
    path: "cart",
    populate: [
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
const deleteOrder = deleteOne(Order);

const updateOrderStatus = catchAsync(async (req, res) => {
  const { orderId, status } = req.body;

  const order = await Order.findById(orderId).populate("cart");

  if (!order) {
    return res.status(404).json({ status: "fail", message: "Order not found" });
  }

  if (status === "approved") {
    for (const item of order.cart.product) {
      const { productId, selectedSizeQty, selectedSize } = item;

      const product = await Product.findById(productId);

      if (!product) {
        return res
          .status(404)
          .json({ status: "fail", message: "Product not found" });
      }

      const size = product.stock.sizes.find(
        (s) => s.size.name === selectedSize
      );

      if (size) {
        size.size.qty -= selectedSizeQty;
        await product.save();
      }
    }
    order.cart.product = [];
    order.cart.products = [];
    await order.cart.save();

    order.status = "approved";
    await order.save();
  } else if (status === "rejected") {
    await Order.findByIdAndDelete(orderId);
    return res
      .status(200)
      .json({ status: "success", message: "Order rejected and deleted" });
  } else {
    return res.status(400).json({ status: "fail", message: "Invalid status" });
  }

  res.status(200).json({ status: "success", data: { order } });
});

export {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
};
