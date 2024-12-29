import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  getProductById,
  deleteProduct,
  getTopProducts,
} from "../controllers/productController.js";

import { compressImage, uploadMultiple } from "../utils/uploadImage.js";
import { protect, isUserAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(uploadMultiple, compressImage, createProduct);

router.get("/get-top-products", getTopProducts);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, isUserAdmin, deleteProduct)
  .patch(protect, isUserAdmin, updateProduct);

export default router;
