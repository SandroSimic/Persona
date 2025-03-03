import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  getProductById,
  deleteProduct,
  addToFavorite,
  getFavorites,
  getPopularProducts,
} from "../controllers/productController.js";

import { compressImage, uploadMultiple } from "../utils/uploadImage.js";
import { protect, isUserAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/add-to-favorite", protect, addToFavorite);
router.get("/get-favorites", protect, getFavorites);

router
  .route("/")
  .get(getAllProducts)
  .post(uploadMultiple, compressImage, createProduct);

router.get("/get-popular-products", getPopularProducts);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, isUserAdmin, deleteProduct)
  .patch(protect, isUserAdmin, uploadMultiple, compressImage, updateProduct);

export default router;
