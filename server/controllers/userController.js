import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import catchAsync from "../utils/catchAsync.js";
import Cart from "../models/cartModel.js";
import { s3Upload } from "../utils/s3Service.js";

const getProfileStats = catchAsync(async (req, res, next) => {
  const userId = req.user?._id;

  if (!userId) {
    return next(new AppError("User not found", 404));
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const usersOrderCount = await Order.find({ user: userId }).countDocuments();

  const favoriteCount = user.favorites.length;

  const cart = await Cart.findOne({ user: userId });
  const cartCount = cart ? cart.totalAmountOfProducts : 0;

  res.status(200).json({
    status: "success",
    data: {
      ordersCount: usersOrderCount,
      favoriteCount,
      cartCount,
    },
  });
});

const updateEmailUsername = catchAsync(async (req, res, next) => {
  const { email, username } = req.body;
  const userId = req.user?._id;

  if (!email || !username) {
    return res.status(400).json({
      status: "fail",
      message: "Email and username are required",
    });
  }

  console.log(req.file);

  if (!req.file) {
    return res.status(400).json({
      status: "fail",
      message: "Please upload an image",
    });
  }

  const data = await s3Upload(req.file);

  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { email, username, userImage: data.Location },
    { runValidators: true, new: true }
  );

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export { getProfileStats, updateEmailUsername };
