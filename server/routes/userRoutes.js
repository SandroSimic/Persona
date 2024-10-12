import express from "express";
import {
  getLoggedInUser,
  loginUser,
  registerUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { compressImage, upload } from "../utils/uploadImage.js";

const router = express.Router();

router
  .route("/register")
  .post(upload.single("userImage"), compressImage, registerUser);
router.route("/login").post(loginUser);
router.get("/profile", protect, getLoggedInUser);

// router.get("/", getAllProducts);
// router.post("/create-product", createProduct);
//router.delete("/:productId");

export default router;
