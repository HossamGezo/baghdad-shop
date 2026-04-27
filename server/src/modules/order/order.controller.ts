// --- Libraries
import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// --- Models
import Order from "@models/Order.js";
import Product from "@models/Product.js";

// --- Modules
import {
  validateAddOrder,
  validateUpdateOrder,
  type addOrderType,
  type UpdateOrderType,
} from "@modules/order/order.validation.js";

/**
 * @desc Get All Orders
 * @route /api/orders
 * @method GET
 * @access private (only admin)
 */
export const getAllOrders = asyncHandler(async (_req: Request, res: Response) => {
  const orders = await Order.find().sort({ createdAt: -1 }).populate("userId", "fullName email avatar");

  res.status(200).json(orders);
  return;
});

/**
 * @desc Get User Orders
 * @route /api/orders/my-orders
 * @method GET
 * @access private (user himself)
 */
export const getUserOrders = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const userOrders = await Order.find({ userId }).sort({ createdAt: -1 });

  if (userOrders.length === 0) {
    res.status(200).json({ message: "That User Doesn't have any orders" });
    return;
  }

  res.status(200).json(userOrders);
  return;
});

/**
 * @desc add Order
 * @route /api/orders/add-order
 * @method POST
 * @access private (logged in user)
 */
export const addOrder = asyncHandler(async (req: Request, res: Response) => {
  const isValidate = validateAddOrder(req.body);

  if (!isValidate.success) {
    res.status(400).json({ message: isValidate.error.issues[0]?.message });
    return;
  }

  const data = isValidate.data as addOrderType;
  const userId = req.user!.id;

  const productIds = data.orderItems.map((item) => item.productId);

  const dbProducts = await Product.find({ _id: { $in: productIds } });

  let totalPrice = 0;

  for (const item of data.orderItems) {
    const realProduct = dbProducts.find((p) => p.id === item.productId);

    if (!realProduct) {
      res.status(404).json({ message: `Product ${item.title} not found in store` });
      return;
    }

    if (item.price !== realProduct.priceAfterDiscount) {
      res.status(400).json({ message: `Price mismatch for product: ${item.title}` });
      return;
    }

    totalPrice += realProduct.priceAfterDiscount * item.count;
  }

  totalPrice += 15;

  const newOrder = { ...data, userId, totalPrice };

  const result = await Order.create(newOrder);

  res.status(201).json(result);
  return;
});

/**
 * @desc Update Order By Id
 * @route /api/orders/:id
 * @method PATCH
 * @access private (only admin)
 */
export const updateOrderById = asyncHandler(async (req: Request, res: Response) => {
  const isValidate = validateUpdateOrder(req.body);

  if (!isValidate.success) {
    res.status(400).json({ message: isValidate.error.issues[0]?.message });
    return;
  }

  const data = isValidate.data as UpdateOrderType;

  const result = await Order.findByIdAndUpdate(
    req.params.id,
    {
      $set: data,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    res.status(404).json({ message: "Order Not Found" });
    return;
  }

  res.status(200).json(result);
  return;
});
