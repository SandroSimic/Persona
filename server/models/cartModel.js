import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
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
  totalAmountOfProducts: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

cartSchema.pre("save", async function (next) {
  this.totalAmountOfProducts = this.products.reduce(
    (total, item) => total + item.selectedSizeQty,
    0
  );

  next();
})

cartSchema.pre("save", async function (next) {
  await this.populate("products.productId");

  this.products.forEach((item) => {
    if (item.productId && item.productId.totalPrice) {
      item.fullPrice = item.selectedSizeQty * item.productId.totalPrice;
    }
  });

  this.totalPrice = this.products.reduce((total, item) => {
    return total + (item.fullPrice || 0);
  }, 0);

  next();
});


const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
