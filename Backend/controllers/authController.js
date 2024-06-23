import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import { createSendToken } from "../utils/createToken.js";
import AppError from "../utils/appError.js";
import { s3Upload } from "../utils/s3Service.js";

export const registerUser = catchAsync(async (req, res, next) => {
  const { username, email, password, passwordConfirm } = req.body;
  console.log(req.body);

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new AppError("User already exists", 400));
  }

  if (!req.file || !req.file.buffer) {
    return next(new AppError("Please provide a profile image", 400));
  }

  const data = await s3Upload(req.file);

  const newUser = await User.create({
    username,
    email,
    password,
    passwordConfirm,
    userProfile: data.Location,
  });

  const user = await newUser.save();
  createSendToken(user, 201, res);
});

export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createSendToken(user, 200, res);
});
