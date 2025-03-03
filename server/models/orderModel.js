import mongoose from "mongoose";
import { validate } from "uuid";

import validator from "validator";

const orderSchema = new mongoose.Schema(
  {
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: [true, "Cart is required"],
    },
    orderItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        selectedSize: { type: String, required: true },
        selectedSizeQty: { type: Number, required: true },
        fullPrice: { type: Number, required: true },
      },
    ],
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
    },
    zipCode: {
      type: String,
      required: [true, "Zip code is required"],
    },
    email: {
      type: String,
      required: [true, "E-mail is required"],
      validate: {
        validator: validator.isEmail,
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(?:\+?\d{1,3})?[-. ]?\(?\d{1,4}?\)?[-. ]?\d{1,4}[-. ]?\d{1,9}$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid mobile number!`,
      },
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    totalPrice: {
      type: Number,
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    address: {
      type: String,
      required: [true, "Adress code is required"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

orderSchema.pre("save", function (next) {
  this.totalPrice = this.orderItems.reduce(
    (acc, item) => acc + item.fullPrice,
    0
  );
  next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
