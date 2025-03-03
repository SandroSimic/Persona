import express from "express";
import {
  addReviewToProduct,
  getReviewsForProduct,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addReviewToProduct);
router.route("/:productId").get(getReviewsForProduct);

export default router;
