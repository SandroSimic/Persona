import express from "express";
import {
  getAllReviews,
  createReview,
  updateReview,
  getReviewById,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.route("/").get(getAllReviews).post(createReview);

router
  .route("/:reviewId")
  .put(updateReview)
  .get(getReviewById)
  .delete(deleteReview);

export default router;
