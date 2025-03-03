import mongoose from "mongoose";

// Size Schema
const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  qty: {
    type: Number,
    // required: true,
    default: 0,
  },
});

// Product Schema
const productSchema = new mongoose.Schema(
  {
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
    totalPrice: {
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
    sizes: [sizeSchema],
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
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", function (next) {
  this.sizes = this.sizes.filter((size) => size.qty > 0);

  this.totalAmount = this.sizes.reduce((acc, size) => acc + size.qty, 0);

  next();
});

//Calculate total price
productSchema.pre("save", function (next) {
  if (this.priceDiscount > 0) {
    this.totalPrice = this.price - (this.priceDiscount / 100) * this.price;
  } else {
    this.totalPrice = this.price;
  }

  next();
});

// Middleware to calculate `averageRating` from `reviews`
// productSchema.pre("save", function (next) {
//   if (this.reviews.length === 0) {
//     this.averageRating = 0;
//   } else {
//     this.averageRating = this.reviews.reduce(
//       (acc, review) => acc + review.rating,
//       0
//     );
//     this.averageRating = this.averageRating / this.reviews.length;
//   }
//   next();
// });

// Middleware to calculate `totalAmount` from `sizes`
productSchema.pre("save", function (next) {
  this.totalAmount = this.sizes.reduce((acc, size) => acc + size.qty, 0);
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
