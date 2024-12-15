import catchAsync from "../utils/catchAsync.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

// import {
//   getAll,
//   getOne,
//   createOne,
//   updateOne,
//   deleteOne,
// } from "./../utils/handleFactory.js";

const addToCart = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const { selectedSize } = req.body;
  const { selectedSizeQty } = req.body;
  const userId = req.user._id;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({
      user: userId,
      product: [{ productId, selectedSize, selectedSizeQty }],
      totalPrice: product.price,
    });
  } else {
    cart.product.push({ productId, selectedSize, selectedSizeQty });
    cart.totalPrice = product.price * selectedSizeQty;
  }

  await cart.save();

  res.status(200).json({
    message: "Product has been successfully added to the cart.",
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
      path: "product.productId", // Reference to productId
      select: "title price",
    });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const formattedCart = cart.product.map((item) => {
    //
    const formattedFullPrice = item.selectedSizeQty * item.productId.price;

    return {
      title: item.productId.title,
      price: item.productId.price,
      selectedSize: item.selectedSize,
      selectedSizeQty: item.selectedSizeQty,
      fullPrice: formattedFullPrice,
    };
  });

  const totalPrice = formattedCart.reduce(
    (acc, item) => acc + item.fullPrice,
    0
  );
  res.status(200).json({
    status: "success",
    data: {
      cart: {
        _id: cart._id,
        user: cart.user,
        products: formattedCart,
        totalPrice: totalPrice,
        fullPrice: cart.fullPrice,
      },
    },
  });
});

export { addToCart, getUserCart };
