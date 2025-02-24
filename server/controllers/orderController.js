import catchAsync from "../utils/catchAsync.js";
import { deleteOne, getAll, getOne } from "../utils/handleFactory.js";
import Order from "./../models/orderModel.js";
import Cart from "./../models/cartModel.js";
import Product from "./../models/productModel.js";
import APIFeatures from "../utils/apiFeatures.js";
const getAllOrders = getAll(Order, [
  {
    path: "cart",
  },
]);

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

// const createOrder = createOne(Order);

const updateOrderStatus = catchAsync(async (req, res) => {
  const { orderId, status } = req.body;

  const order = await Order.findById(orderId).populate("cart");

  if (!order) {
    return res.status(404).json({ status: "fail", message: "Order not found" });
  }

  if (status === "approved") {
    for (const item of order.orderItems) {
      const { productId, selectedSizeQty, selectedSize } = item;
      const product = await Product.findById(productId);

      if (!product) {
        return res
          .status(404)
          .json({ status: "fail", message: "Product not found" });
      }

      const size = product.sizes.find((s) => s.name === selectedSize);

      if (size) {
        size.qty -= selectedSizeQty;
        await product.save();
      }
    }
    order.status = "approved";
    await order.save();
  } else if (status === "rejected") {
    order.status = "rejected";
    await order.save();
    return res
      .status(200)
      .json({ status: "success", message: "Order rejected" });
  } else {
    return res.status(400).json({ status: "fail", message: "Invalid status" });
  }

  res.status(200).json({ status: "success", data: { order } });
});

const createOrder = catchAsync(async (req, res) => {
  const { cart, name, surname, zipCode, email, phone, country, city, address } =
    req.body;

  const userId = req.user?._id;

  const cartDoc = await Cart.findById(cart);
  if (!cartDoc) {
    return res.status(404).json({ status: "fail", message: "Cart not found" });
  }

  const order = await Order.create({
    cart,
    orderItems: cartDoc.products,
    name,
    surname,
    zipCode,
    email,
    phone,
    country,
    city,
    address,
    user: userId,
  });

  if (order) {
    const cart = await Cart.findById(order.cart);
    cart.products = [];
    cart.totalPrice = 0;
    cart.totalAmountOfProducts = 0;
    await cart.save();
  }

  res.status(201).json({ status: "success", data: { order } });
});
const getMyOrders = catchAsync(async (req, res, next) => {
  console.log("Request Query:", req.query);
  if (!req.user?._id) {
    return next(new AppError("User not found", 404));
  }

  req.query.user = req.user._id;

  return getAll(Order)(req, res);
});

export {
  getAllOrders,
  createOrder,
  getOrderById,
  // updateOrder,
  deleteOrder,
  updateOrderStatus,
  getMyOrders,
};
