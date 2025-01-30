import catchAsync from "../utils/catchAsync.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

const addToCart = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const { selectedSize, selectedSizeQty } = req.body;
  const userId = req.user._id;

  // Find the product to ensure it exists
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Find the user's cart
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    // If no cart exists, create a new one with the product
    cart = new Cart({
      user: userId,
      products: [
        {
          productId,
          selectedSize,
          selectedSizeQty,
        },
      ],
    });
  } else {
    // Check if a product with the same productId and selectedSize already exists
    const existingProductIndex = cart.products.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.selectedSize === selectedSize
    );

    if (existingProductIndex !== -1) {
      // If it exists, update the quantity and fullPrice
      cart.products[existingProductIndex].selectedSizeQty =
        Number(cart.products[existingProductIndex].selectedSizeQty) +
        Number(selectedSizeQty);
    } else {
      // If it doesn't exist, add it as a new product
      cart.products.push({
        productId,
        selectedSize,
        selectedSizeQty,
      });
    }
  }

  // Save the updated cart
  await cart.save({ validateBeforeSave: true, validateModifiedOnly: true });

  res.status(200).json({
    message: "Product has been successfully added to the cart.",
    cart,
  });
});

const clearCart = catchAsync(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.products = [];

  await cart.save();

  res.status(200).json({
    message: "Cart has been cleared.",
    cart,
  });
});

const removeProductFromCart = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const productIndex = cart.products.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  cart.products.splice(productIndex, 1);

  await cart.save();

  res.status(200).json({
    message: "Product has been removed from the cart.",
    cart,
  });
});
const getUserCart = catchAsync(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id })
    .populate({
      path: "user",
      select: "username userImage",
    })
    .populate({
      path: "products.productId",
    });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      products: [],
    });
  }

  // Filter out invalid products
  cart.products = cart.products.filter((item) => item.productId);

  if (cart.products.length === 0) {
    return res.status(200).json({
      status: "success",
      message: "Your cart is empty.",
      cart: {
        _id: cart._id,
        user: cart.user,
        products: [],
        totalPrice: 0,
        totalAmountOfProducts: cart.totalAmountOfProducts,
      },
    });
  }

  let totalPrice = 0;

  // Update fullPrice dynamically based on the latest product prices
  cart.products = await Promise.all(
    cart.products.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (product) {
        item.fullPrice = product.totalPrice * item.selectedSizeQty; // Update full price
        totalPrice += item.fullPrice;
      }
      return item;
    })
  );

  await cart.save(); // Save updated cart with the recalculated prices

  res.status(200).json({
    status: "success",
    data: {
      cart: {
        _id: cart._id,
        user: cart.user,
        products: cart.products,
        totalPrice,
        totalAmountOfProducts: cart.totalAmountOfProducts,
      },
    },
  });
});

const increaseQuantity = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const { selectedSize } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const productIndex = cart.products.findIndex(
    (item) =>
      item.productId.toString() === productId &&
      item.selectedSize === selectedSize
  );

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  cart.products[productIndex].selectedSizeQty += 1;

  await cart.save();

  res.status(200).json({
    message: "Product quantity has been increased.",
    cart,
  });
});

const decreaseQuantity = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const { selectedSize } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const productIndex = cart.products.findIndex(
    (item) =>
      item.productId.toString() === productId &&
      item.selectedSize === selectedSize
  );

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  if (cart.products[productIndex].selectedSizeQty > 1) {
    cart.products[productIndex].selectedSizeQty -= 1;
  } else {
    cart.products.splice(productIndex, 1);
  }

  await cart.save();

  res.status(200).json({
    message: "Product quantity has been decreased.",
    cart,
  });
});

export {
  addToCart,
  getUserCart,
  removeProductFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
};
