import express from "express";

import {
  createOrder,
  deleteOrder,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect, isUserAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder);
router
  .route("/:id")
  // .put(protect, updateOrder)
  .get(protect, getOrderById)
  .delete(protect, isUserAdmin, deleteOrder);

router.patch("/update-status", protect, isUserAdmin, updateOrderStatus);

export default router;
