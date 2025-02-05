import catchAsync from "../utils/catchAsync.js";
import { deleteOne, getAll, getOne } from "../utils/handleFactory.js";
import Order from "./../models/orderModel.js";
import Cart from "./../models/cartModel.js";
const getAllOrders = getAll(Order, [
  {
    path: "cart",
  },
]);

const getOrderById = getOne(Order, [
  {
    path: "cart",
    populate: [
      {
        path: "user",
        select: "username email userImage",
      },
      {
        path: "product.productId",
        select: "title price",
      },
    ],
  },
]);

const deleteOrder = deleteOne(Order);

// const createOrder = createOne(Order);

const updateOrderStatus = catchAsync(async (req, res) => {
  const { orderId, status } = req.body;

  const order = await Order.findById(orderId).populate("cart");

  if (!order) {
    return res.status(404).json({ status: "fail", message: "Order not found" });
  }

  if (status === "approved") {
    for (const item of order.cart.product) {
      const { productId, selectedSizeQty, selectedSize } = item;

      const product = await Product.findById(productId);

      if (!product) {
        return res
          .status(404)
          .json({ status: "fail", message: "Product not found" });
      }

      const size = product.stock.sizes.find(
        (s) => s.size.name === selectedSize
      );

      if (size) {
        size.size.qty -= selectedSizeQty;
        await product.save();
      }
    }
    order.cart.product = [];
    order.cart.products = [];
    await order.cart.save();

    order.status = "approved";
    await order.save();
  } else if (status === "rejected") {
    await Order.findByIdAndDelete(orderId);
    return res
      .status(200)
      .json({ status: "success", message: "Order rejected and deleted" });
  } else {
    return res.status(400).json({ status: "fail", message: "Invalid status" });
  }

  res.status(200).json({ status: "success", data: { order } });
});

const createOrder = catchAsync(async (req, res) => {
  const { cart, name, surname, zipCode, email, phone, country, city, address } =
    req.body;

  const cartDoc = await Cart.findById(cart);
  if (!cartDoc) {
    return res.status(404).json({ status: "fail", message: "Cart not found" });
  }

  const order = await Order.create({
    cart,
    orderItems: cartDoc.products,
    name,
    surname,
    zipCode,
    email,
    phone,
    country,
    city,
    address,
  });

  if (order) {
    const cart = await Cart.findById(order.cart);
    cart.products = [];
    cart.totalPrice = 0;
    cart.totalAmountOfProducts = 0;
    await cart.save();
  }

  res.status(201).json({ status: "success", data: { order } });
});

export {
  getAllOrders,
  createOrder,
  getOrderById,
  // updateOrder,
  deleteOrder,
  updateOrderStatus,
};
