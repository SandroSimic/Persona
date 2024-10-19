import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addToCart, getUserCart } from "../controllers/cartController.js";

const router = express.Router();

router.route("/:productId").post(protect, addToCart);

router.route("/").get(protect, getUserCart);
export default router;
