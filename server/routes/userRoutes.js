import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// router.get("/", getAllProducts);
// router.post("/create-product", createProduct);
//router.delete("/:productId");

export default router;
