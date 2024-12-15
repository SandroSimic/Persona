import mongoose from "mongoose";

// Size Schema
const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    default: 0,
  },
});

// Product Schema
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  priceDiscount: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  images: {
    type: [String],
  },
  sizes: [sizeSchema], // Array of size objects
  totalAmount: {
    type: Number,
    default: 0, // Will be calculated dynamically
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
});
productSchema.pre("save", function (next) {
  // Remove sizes with qty of 0 or negative
  this.stock.sizes = this.stock.sizes.filter((size) => size.size.qty > 0);

  // Update totalAmount
  const totalAmount = this.stock.sizes.reduce((acc, size) => {
    return acc + size.size.qty;
  }, 0);

  this.stock.totalAmount = totalAmount;

  next();
});

// Middleware to calculate `totalAmount` from `sizes`
productSchema.pre("save", function (next) {
  this.totalAmount = this.sizes.reduce((acc, size) => acc + size.qty, 0);
  next();
});

// Middleware to calculate price after discount
productSchema.pre("save", function (next) {
  const discount = (this.price * this.priceDiscount) / 100;
  this.discountedPrice = this.price - discount; // Optional: Save the discounted price directly
  next();
});

// Static method to calculate average rating
productSchema.statics.calculateAverageRating = async function (productId) {
  const product = await this.findById(productId).populate("reviews");

  if (!product || product.reviews.length === 0) {
    return 0;
  }

  const totalRating = product.reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  const averageRating = (totalRating / product.reviews.length).toFixed(1);

  await this.findByIdAndUpdate(productId, { averageRating }, { new: true });

  return averageRating;
};

const Product = mongoose.model("Product", productSchema);
export default Product;
