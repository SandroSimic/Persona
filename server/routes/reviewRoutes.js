import express from "express";
import {
  // getAllReviews,
  // createReview,
  updateReview,
  getReviewById,
  deleteReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// router.route("/").get(getAllReviews).post(createReview);

router.route("/").get(getAllReviews).post(protect, createReview);


router
  .route("/:id")
  .put(protect, updateReview)
  .get(getReviewById)
  .delete(protect, deleteReview);

export default router;
