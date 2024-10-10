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
  // stock: {
  //   // napraviti stock model i importovati
  // },
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

productSchema.statics.calculateAverageRating = async function (productId) {
  const product = await this.findById(productId).populate("reviews");

  if (!product || product.reviews.length === 0) {
    return 0; // No reviews, return 0
  }

  const totalRating = product.reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  const averageRating = (totalRating / product.reviews.length).toFixed(1);

  // Update the product's average rating
  await this.findByIdAndUpdate(productId, { averageRating }, { new: true });

  return averageRating; // Return the calculated average rating
};

const Product = mongoose.model("Product", productSchema);
export default Product;
