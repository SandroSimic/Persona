import Product from "../models/productModel.js";
import catchAsync from "../utils/catchAsync.js";

export const createProduct = catchAsync(async (req, res) => {
  const { name, description, price, category, stock, tags } = req.body;

  const newProduct = new Product({
    name,
    description,
    price,
    category,
    stock,
    tags,
  });

  await newProduct.save();

  res.status(201).json({
    data: {
      product: newProduct,
    },
  });
});

export const getProducts = catchAsync(async (req, res) => {
  const products = await Product.find();

  if (!products) {
    res.status(404);
    throw new Error("No products found");
  }

  res.status(200).json({
    data: {
      products,
    },
  });
});
