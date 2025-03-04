import express from "express";
import {
  forgotPassword,
  getLoggedInUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  verifyResetCode,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { compressImage, upload } from "../utils/uploadImage.js";
import passport from "passport";
import generateToken from "../utils/generateToken.js";
import {
  getProfileStats,
  updateEmailUsername,
} from "../controllers/userController.js";

const router = express.Router();
router.post("/logout", protect, logoutUser);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect:
      "https://hwo4co8scck4sskckcgc848o.persona-clothing.com/login",
  }),
  async (req, res) => {
    generateToken(res, req.user._id);
    res.redirect("https://hwo4co8scck4sskckcgc848o.persona-clothing.com/");
  }
);

router.put(
  "/update-email-username",
  upload.single("userImage"),
  compressImage,
  protect,
  updateEmailUsername
);

router
  .route("/register")
  .post(upload.single("userImage"), compressImage, registerUser);
router.route("/login").post(loginUser);
router.get("/profile", protect, getLoggedInUser);

router.get("/profile-stats", protect, getProfileStats);

router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-password", resetPassword);
router.put("/update-password", protect, updatePassword);

// router.get("/", getAllProducts);
// router.post("/create-product", createProduct);
//router.delete("/:productId");

export default router;
