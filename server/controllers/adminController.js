// controllers/adminController.js
import Order from "../models/orderModel.js";
import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

export const getDashboardStats = catchAsync(async (req, res) => {
  const overallStats = await Order.aggregate([
    { $match: { status: "approved" } },
    {
      $addFields: {
        orderTotal: { $sum: "$orderItems.fullPrice" },
        orderProducts: { $sum: "$orderItems.selectedSizeQty" },
      },
    },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalIncome: { $sum: "$orderTotal" },
        customers: { $addToSet: "$email" },
      },
    },
    {
      $project: {
        totalOrders: 1,
        totalIncome: 1,
        totalCustomers: { $size: "$customers" },
      },
    },
  ]);

  const monthlyBreakdown = await Order.aggregate([
    { $match: { status: "approved" } },
    {
      $addFields: {
        orderTotal: { $sum: "$orderItems.fullPrice" },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        orders: { $sum: 1 },
        monthlyIncome: { $sum: "$orderTotal" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
    {
      $project: {
        month: {
          $concat: [
            { $toString: "$_id.month" },
            "/",
            { $toString: "$_id.year" },
          ],
        },
        orders: 1,
        monthlyIncome: 1,
        _id: 0,
      },
    },
  ]);

  const overall = overallStats[0] || {
    totalOrders: 0,
    totalIncome: 0,
    totalProducts: 0,
    totalCustomers: 0,
  };

  const estimatedMonthlyIncome =
    overall.totalIncome / (monthlyBreakdown.length || 1);

  const estimatedYearlyIncome = estimatedMonthlyIncome * 12;

  const totalRegisteredUsers = await User.countDocuments({});
  const totalProductCount = await Product.countDocuments({});
  const stats = {
    totalOrders: overall.totalOrders,
    totalIncome: overall.totalIncome,
    totalProducts: totalProductCount,
    totalCustomers: overall.totalCustomers,
    totalRegisteredUsers,
    estimatedMonthlyIncome,
    estimatedYearlyIncome,
    monthlyBreakdown,
  };

  res.status(200).json(stats);
});
