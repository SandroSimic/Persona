import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";

const protect = catchAsync(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;
  console.log("req.cookies", req.cookies);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded", decoded);
      req.user = await User.findById(decoded.userId).select("-password");
      console.log("req.user", req.user);
      next();
    } catch (error) {
      return next(new AppError("Not authorized, token failed", 401));
    }
  } else {
    return next(new AppError("Not authorized, no token", 401));
  }
});

export { protect };
