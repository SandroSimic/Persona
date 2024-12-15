import catchAsync from "../utils/catchAsync.js";
import Product from "../models/productModel.js";
import {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
} from "./../utils/handleFactory.js";
import { s3Upload } from "../utils/s3Service.js";

const getAllProducts = getAll(Product, [
  {
    path: "reviews",
    select: "message rating",
    populate: {
      path: "user",
      select: "username userImage",
    },
  },
]);

const createProduct = catchAsync(async (req, res) => {
  const { title, price, priceDiscount, description, category, type, sizes } =
    req.body;

  // Validate uploaded files
  if (!req.files || req.files.length > 6) {
    return res.status(400).json({
      status: "error",
      message: "You can only upload a maximum of 6 images.",
    });
  }

  // Upload images to S3
  let uploadedImages;
  try {
    const imageUploadPromises = req.files.map((file) => s3Upload(file));
    uploadedImages = await Promise.all(imageUploadPromises);
    console.log("Images uploaded successfully:", uploadedImages);
  } catch (error) {
    console.error("Image upload failed:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to upload images.",
      error: error.message,
    });
  }

  let parsedSizes;
  try {
    parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes; // Parse JSON if `sizes` is sent as a string
  } catch (error) {
    console.error("Invalid sizes JSON:", error.message);
    return res.status(400).json({
      status: "error",
      message: "Invalid sizes format. Ensure it is a valid JSON array.",
    });
  }

  if (
    !Array.isArray(parsedSizes) ||
    parsedSizes.some((size) => !size.name || size.qty === undefined)
  ) {
    return res.status(400).json({
      status: "error",
      message: "Invalid sizes format. Each size must have a 'name' and 'qty'.",
    });
  }

  // Calculate totalAmount from sizes
  const totalAmount = parsedSizes.reduce((acc, size) => acc + size.qty, 0);

  const productData = {
    title,
    price: parseFloat(price),
    priceDiscount: parseFloat(priceDiscount),
    description,
    category,
    type,
    images: uploadedImages.map((img) => img.Location),
    sizes: parsedSizes,
    totalAmount,
  };

  const createdProduct = await createOne(Product, productData);

  res.status(201).json({
    status: "success",
    data: {
      product: createdProduct,
    },
  });
});


const updateProduct = updateOne(Product);
const deleteProduct = deleteOne(Product);
const getProductById = getOne(Product, [
  {
    path: "reviews",
    select: "message rating",
    populate: {
      path: "user",
      select: "username userImage",
    },
  },
]);

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
