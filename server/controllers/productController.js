import catchAsync from "../utils/catchAsync.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

const getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find();

  if (products.length === 0 || !products) {
    return res.status(404).json({ message: "No products found" });
  }

  res.status(200).json(products);
});

const createProduct = catchAsync(async (req, res) => {
  const { title, price, description, category, type } = req.body;

  if (!title || !price || !description || !category || !type) {
    return res.status(400).json({
      status: "fail",
      message: "Svi podaci su obavezni.",
    });
  }

  const newProduct = await Product.create({
    title,
    price,
    description,
    category,
    type,
  });

  res.status(200).json({
    newProduct,
  });
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

const updateProduct = catchAsync(async (req, res, next) => {
  const { title, price, description, category, type, images } = req.body;

  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return next(new AppError("Invalid Product Id", 404));
  }

  const existingProduct = await Product.findById(productId);

  if (!existingProduct) {
    return next(new AppError("The product does not exist", 404));
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

  if (!updatedProduct) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({ updatedProduct });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return next(new AppError("Invalid Product ID", 404));
  }

  const existingProduct = await Product.findById(productId);
  console.log(existingProduct);

  const product = await Product.findByIdAndDelete(productId);

  if (product) {
    res.status(200).json({ message: "Deleted Product" });
  } else {
    return next(new AppError("No product found with that id", 404));
  }
});

export {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};

// radnom id 66fdad0b282639767cd40b64
