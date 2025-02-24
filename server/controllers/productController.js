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

  if (!sizes) {
    return res.status(400).json({
      status: "error",
      message: "'sizes' field is missing in the request body.",
    });
  }

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
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to upload images.",
      error: error.message,
    });
  }

  let parsedSizes;
  try {
    parsedSizes =
      typeof req.body.sizes === "string"
        ? JSON.parse(req.body.sizes)
        : req.body.sizes;
  } catch (error) {
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
      message: "Each size must have a 'name' and 'qty'.",
    });
  }

  parsedSizes = parsedSizes.map((size) => ({
    name: size.name,
    qty: parseInt(size.qty, 10),
  }));

  const totalAmount = parsedSizes.reduce((acc, size) => acc + size.qty, 0);

  const productData = {
    title,
    price: parseFloat(price),
    description,
    category,
    type,
    images: uploadedImages.map((img) => img.Location),
    sizes: parsedSizes,
    totalAmount,
  };

  if (isNaN(priceDiscount)) {
    productData.priceDiscount = null;
  } else {
    productData.priceDiscount = parseFloat(priceDiscount);
  }

  const createdProduct = await createOne(Product, productData);

  res.status(201).json({
    status: "success",
    data: { product: createdProduct },
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { title, price, priceDiscount, description, category, type, sizes } =
    req.body;

  // Validate and parse `sizes`
  if (!sizes) {
    return res
      .status(400)
      .json({ status: "error", message: "'sizes' field is required." });
  }

  let parsedSizes;
  try {
    parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
    if (
      !Array.isArray(parsedSizes) ||
      parsedSizes.some((size) => !size.name || size.qty === undefined)
    ) {
      throw new Error("Each size must have a 'name' and 'qty'.");
    }
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }

  parsedSizes = parsedSizes.map((size) => ({
    name: size.name,
    qty: parseInt(size.qty, 10),
  }));

  // Handle images
  let existingImages = [];
  if (req.body.images) {
    try {
      if (typeof req.body.images === "string") {
        existingImages = req.body.images.includes("[")
          ? JSON.parse(req.body.images) // Parse if it's a JSON string
          : [req.body.images]; // Wrap single string into an array
      } else if (Array.isArray(req.body.images)) {
        existingImages = req.body.images;
      }
    } catch (error) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid images format." });
    }
  }

  // Upload new images to S3 if files are provided
  let uploadedImages = [];
  if (req.files && req.files.length > 0) {
    const imageUploadPromises = req.files.map((file) => s3Upload(file));
    uploadedImages = await Promise.all(imageUploadPromises);
  }

  const allImages = [
    ...existingImages,
    ...uploadedImages.map((img) => img.Location),
  ];

  console.log("All images:", allImages);

  // Prepare product data
  const productData = {
    title,
    price: parseFloat(price),
    priceDiscount: parseFloat(priceDiscount) || 0,
    description,
    category,
    type,
    sizes: parsedSizes,
    images: allImages,
    totalAmount: parsedSizes.reduce((acc, size) => acc + size.qty, 0),
    totalPrice: price - (price * (priceDiscount || 0)) / 100,
  };

  // Update the product
  const updatedProduct = await updateOne(Product, productData, req.params.id);

  res.status(200).json({
    status: "success",
    data: { product: updatedProduct },
  });
});

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

const addToFavorite = catchAsync(async (req, res) => {
  const { productId } = req.body;
  const { user } = req;

  const favoriteIndex = user.favorites.indexOf(productId);

  if (favoriteIndex !== -1) {
    user.favorites.splice(favoriteIndex, 1);
    await user.save();
    return res.status(200).json({
      status: "success",
      message: "Product removed from favorites",
    });
  }

  // If product is not in favorites, add it
  user.favorites.push(productId);
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Product added to favorites",
  });
});

export {
  getAllProducts,
  createProduct,
  updateProduct,
  getProductById,
  deleteProduct,
  getTopProducts,
  addToFavorite,
};
