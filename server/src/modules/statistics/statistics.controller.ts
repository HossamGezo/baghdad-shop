// --- Libraries
import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// --- Models
import User from "@models/User.js";
import Product from "@models/Product.js";
import Order from "@models/Order.js";

/**
 * @desc Get Dashboard Statistics
 * @route /api/statistics
 * @method GET
 * @access private (Only Admin)
 */
export const getDashboardStats = asyncHandler(async (_req: Request, res: Response) => {
  const [usersCount, productsCount, ordersCount] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Order.countDocuments(),
  ]);

  const revenueData = await Order.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$totalPrice" },
      },
    },
  ]);

  const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

  res.status(200).json({
    usersCount,
    productsCount,
    ordersCount,
    totalRevenue,
  });
  return;
});
