import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import { compressImage, upload } from "../utils/uploadImage.js";

const router = express.Router();

router.post(
  "/register",
  upload.single("userProfile"),
  compressImage,
  registerUser
);
router.post("/login", loginUser);

export default router;
