import express from "express";
import { getDashboardStats } from "../controllers/adminController.js";
import { isUserAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard-stats", protect, isUserAdmin, getDashboardStats);

export default router;
