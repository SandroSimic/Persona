import express from "express";
import {
  getLoggedInUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { compressImage, upload } from "../utils/uploadImage.js";
import passport from "passport";
import generateToken from "../utils/generateToken.js";

const router = express.Router();
router.post("/logout", protect, logoutUser);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  async (req, res) => {
    generateToken(res, req.user._id);
    res.redirect("http://localhost:5173/");
  }
);

router
  .route("/register")
  .post(upload.single("userImage"), compressImage, registerUser);
router.route("/login").post(loginUser);
router.get("/profile", protect, getLoggedInUser);

// router.get("/", getAllProducts);
// router.post("/create-product", createProduct);
//router.delete("/:productId");

export default router;
