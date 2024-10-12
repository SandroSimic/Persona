import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import generateToken from "../utils/generateToken.js";
import { s3Upload } from "../utils/s3Service.js";

const registerUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(new AppError("Please provide all field", 400));
  }

  const data = await s3Upload(req.file);

  const user = await User.create({
    username,
    email,
    password,
    userImage: data.Location,
  });

  const newUser = await user.save();
  generateToken(res, newUser._id);
  res.status(201).json({
    message: "User registered successfully",
    user: newUser,
  });
});

const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide all fields", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("Invalid credentials", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new AppError("Invalid credentials", 401));
  }

  generateToken(res, user._id);
  res.status(200).json({
    message: "User logged in successfully",
    user,
  });
});

const getLoggedInUser = catchAsync(async (req, res, next) => {
  const userId = req.user?._id;

  if (!userId) {
    return next(new AppError("User not found", 404));
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    user,
  });
});

export { registerUser, loginUser, getLoggedInUser };
