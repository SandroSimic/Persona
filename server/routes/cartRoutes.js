import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addToCart,
  getUserCart,
  removeProductFromCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} from "../controllers/cartController.js";

const router = express.Router();

router.route("/").get(protect, getUserCart);
router
  .route("/:productId")
  .post(protect, addToCart)
  .delete(protect, removeProductFromCart);

router.route("/clear").patch(protect, clearCart);

router.route("/:productId/increase").patch(protect, increaseQuantity);

router.route("/:productId/decrease").patch(protect, decreaseQuantity);

export default router;
