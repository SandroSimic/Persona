import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
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
  stock: {
    sizes: [
      {
        size: {
          name: {
            type: String,
          },
          qty: {
            type: Number,
          },
        },
      },
    ],
    totalAmount: {
      type: Number,
      default: 0,
    },
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

productSchema.pre("save", function (next) {
  const totalAmount = this.stock.sizes.reduce((acc, size) => {
    return acc + size.size.qty;
  }, 0);

  this.stock.totalAmount = totalAmount;

  next();
});

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
