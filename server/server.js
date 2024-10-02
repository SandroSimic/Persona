import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import connectDB from "./utils/db.js";
dotenv.config();

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoutes);

const port = process.env.PORT || 8000;

app.listen(port, (req, res) => {
  console.log(`server running on port ${port}`);
});
