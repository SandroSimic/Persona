import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);
router
  .route("/:productId")
  .get(getProductById)
  .delete(deleteProduct)
  .put(updateProduct);

// router.get("/", getAllProducts);
// router.post("/create-product", createProduct);
//router.delete("/:productId");

export default router;
