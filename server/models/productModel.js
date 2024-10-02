import mongoose from "mongoose";

const productShema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },
  stock: {
    // napraviti stock model i importovati
  },
  review: {
    // napraviti review model i importovati
  },
});

const Product = mongoose.model("Product", productShema);
export default Product;
