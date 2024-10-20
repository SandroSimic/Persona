import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";

const protect = catchAsync(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      return next(new AppError("Not authorized, token failed", 401));
    }
  } else {
    return next(new AppError("Not authorized, no token", 401));
  }
});

const isUserAdmin = catchAsync(async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return res
      .status(401)
      .json({ message: "user is not authorized to use this route" });
  }
});

export { protect, isUserAdmin };
