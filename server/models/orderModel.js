import mongoose from "mongoose";

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
      type: Number,
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
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
