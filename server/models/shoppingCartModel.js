import mongoose from "mongoose";

const shoppingCartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
});

const ShoppingCart = mongoose.model("ShoppingCart", shoppingCartSchema);
export default ShoppingCart;
