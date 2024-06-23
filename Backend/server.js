import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./lib/db.js";
import productRouter from "./routes/productRoutes.js";
import authRouter from "./routes/authRouter.js";

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 8000;

app.use("/api/product", productRouter);
app.use("/api/auth", authRouter);
// app.use('/api/order');
// app.use('/api/review');
// app.use('/api/user');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
