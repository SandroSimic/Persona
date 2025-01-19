import catchAsync from "../utils/catchAsync.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

const addToCart = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const { selectedSize, selectedSizeQty } = req.body;
  const userId = req.user._id;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let cart = await Cart.findOne({ user: userId });

  const fullPrice = product.price * selectedSizeQty;

  if (!cart) {
    cart = new Cart({
      user: userId,
      product: [{ productId, selectedSize, selectedSizeQty }],
    });
  } else {
    cart.product.push({ productId, selectedSize, selectedSizeQty, fullPrice });
  }

  await cart.save();

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

  cart.product = [];

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

  const productIndex = cart.product.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  cart.product.splice(productIndex, 1);

  await cart.save();

  res.status(200).json({
    message: "Product has been removed from the cart.",
    cart,
  });
});

const getUserCart = catchAsync(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
    .populate({
      path: "user",
      select: "username userImage",
    })
    .populate({
      path: "product.productId",
    });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.product = cart.product.filter((item) => item.productId);

  if (cart.product.length === 0) {
    return res.status(200).json({
      status: "success",
      message: "Your cart is empty.",
      cart: {
        _id: cart._id,
        user: cart.user,
        products: [],
        totalPrice: 0,
        fullPrice: cart.fullPrice,
      },
    });
  }

  const totalPrice = cart.product.reduce(
    (acc, item) => acc + item.fullPrice,
    0
  );

  res.status(200).json({
    status: "success",
    data: {
      cart: {
        _id: cart._id,
        user: cart.user,
        products: cart.product,
        totalPrice: totalPrice,
        fullPrice: cart.fullPrice,
      },
    },
  });
});

export { addToCart, getUserCart, removeProductFromCart, clearCart };
