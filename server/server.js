import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./utils/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./controllers/errorController.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import ShoppingCart from "./models/shoppingCartModel.js";

dotenv.config();
connectDB();

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/reviews", reviewRoutes);
// app.use("/api/shopping-cart", ShoppingCartRoutes);

app.use(globalErrorHandler);
const port = process.env.PORT || 8000;

app.listen(port, (req, res) => {
  console.log(`server running on port ${port}`);
});
