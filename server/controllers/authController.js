import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import generateToken from "../utils/generateToken.js";
import { s3Upload, s3UploadFromUrl } from "../utils/s3Service.js";
import passport from "passport";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        const randomPassword = crypto
          .randomBytes(20)
          .toString("hex")
          .toUpperCase();

          const s3ImageUrl = await s3UploadFromUrl(profile.photos[0].value);

        if (!user) {
          user = await User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            userImage: s3ImageUrl,
            password: randomPassword,
          });
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Serialize and deserialize user for session support
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log(id);

    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

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

const logoutUser = async (req, res, next) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Ensure it's secure in production
    sameSite: "strict",
  });

  // Respond with a JSON success message instead of a redirect
  res.status(200).json({
    message: "User logged out successfully",
  });
};

export { registerUser, loginUser, getLoggedInUser, logoutUser };
