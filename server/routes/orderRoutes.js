import express from "express";

// import { createOrder, getAllOrders } from "../controllers/orderController.js";

const router = express.Router();

// router.route("/").get(getAllOrders).post(createOrder);

import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect, isUserAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, isUserAdmin, getAllOrders)
  .post(protect, createOrder);

router
  .route("/:id")
  .put(protect, updateOrder)
  .get(protect, getOrderById)
  .delete(protect, isUserAdmin, deleteOrder);

router.patch("/update-status", protect, isUserAdmin, updateOrderStatus);


export default router;
