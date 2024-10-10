import catchAsync from "../utils/catchAsync.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

const getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find().populate({
    path: "reviews",
    select: "message rating",
  });

  if (products.length === 0 || !products) {
    return res.status(404).json({ message: "No products found" });
  }

  res.status(200).json(products);
});

const createProduct = catchAsync(async (req, res) => {
  const { title, price, description, category, type } = req.body;

  // Validate required fields
  if (!title || !price || !description || !category || !type) {
    return res.status(400).json({
      status: "fail",
      message: "All fields required.",
    });
  }

  // Create the new product without explicitly setting averageRating and reviews
  const newProduct = await Product.create({
    title,
    price,
    description,
    category,
    type,
  });

  res.status(201).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const { title, price, description, category, type, images } = req.body;

  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({ message: "Invalid product ID" });
  }

  const existingProduct = await Product.findById(productId);

  if (!existingProduct) {
    return res.status(404).json({ message: "Product doesn't exist" });
  }

  let updatedProductData = {
    title,
    price,
    description,
    category,
    type,
    images,
  };

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updatedProductData,
    {
      new: true,
      runValidators: true,
    }
  );
});

const getProductById = catchAsync(async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    return res.status(404).json({ message: "No product with that ID" });
  }

  if (!mongoose.isValidObjectId(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "No product found" });
  }

  res.status(200).json(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({ message: "Invalid product ID" });
  }

  const existingProduct = await Product.findById(productId);

  const product = await Product.findByIdAndDelete(productId);

  if (product) {
    res.status(200).json({ message: "Deleted Product" });
  } else {
    return res.status(404).json({ message: "No product found with that ID" });
  }
});

const getTopProducts = catchAsync(async (req, res, next) => {
  const topProducts = await Product.find()
    .sort({ averageRating: -1 })
    .limit(6)
    .populate("reviews");

  res.status(200).json({ topProducts });
});

export {
  getAllProducts,
  createProduct,
  updateProduct,
  getProductById,
  deleteProduct,
  getTopProducts,
};
