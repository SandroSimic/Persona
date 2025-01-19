import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addToCart,
  getUserCart,
  removeProductFromCart,
  clearCart
} from "../controllers/cartController.js";

const router = express.Router();

router.route("/").get(protect, getUserCart);
router
  .route("/:productId")
  .post(protect, addToCart)
  .delete(protect, removeProductFromCart);

router.route("/clear").delete(protect, clearCart);

export default router;
