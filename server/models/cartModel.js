import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      selectedSize: {
        type: String,
        required: true,
      },
      selectedSizeQty: {
        type: Number,
        required: true,
        min: 1,
      },
      fullPrice: {
        type: Number,
        default: 0,
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
});

cartSchema.pre("save", function (next) {
  this.totalPrice = this.product.reduce((total, item) => {
    return total + (item.fullPrice || 0);
  }, 0);

  next();
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
