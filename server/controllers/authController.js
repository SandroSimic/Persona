import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import generateToken from "../utils/generateToken.js";
import { s3Upload, s3UploadFromUrl } from "../utils/s3Service.js";
import passport from "passport";
import dotenv from "dotenv";
import crypto from "crypto";
import nodemailer from "nodemailer";

dotenv.config();
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://hwo4co8scck4sskckcgc848o.persona-clothing.com/api/auth/google/callback",
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
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

const registerUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(new AppError("Please provide all fields", 400));
  }

  if (!req.file) {
    return next(new AppError("Please provide an image", 400));
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

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;

  console.log("email", email);

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const resetCode = crypto.randomInt(100000, 999999).toString();

  user.passwordResetToken = resetCode;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Password Reset Code",
    text: `Your password reset code is ${resetCode}. It will expire in 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    await user.save();

    res.status(200).json({
      message: "Password reset code sent to your email",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error sending email",
    });
  }
});

const verifyResetCode = catchAsync(async (req, res) => {
  const { email, code } = req.body;

  const user = await User.findOne({
    email,
    passwordResetToken: code,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(404).json({
      message: "Invalid code",
    });
  }

  res.status(200).json({
    message: "Code verified",
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const { email, code, password } = req.body;

  const user = await User.findOne({
    email,
    passwordResetToken: code,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(404).json({
      message: "Invalid code",
    });
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  res.status(200).json({
    message: "Password reset successfully",
  });
});

const updatePassword = catchAsync(async (req, res, next) => {
  const { newPassword } = req.body;

  if (!newPassword) {
    return next(new AppError("Please provide a new password", 400));
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    message: "Password updated successfully",
  });
});

export {
  registerUser,
  loginUser,
  getLoggedInUser,
  logoutUser,
  forgotPassword,
  verifyResetCode,
  resetPassword,
  updatePassword,
};
