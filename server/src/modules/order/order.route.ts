// --- Libraries
import express from "express";

// --- Modules
import { addOrder, getAllOrders, getUserOrders, updateOrderById } from "@modules/order/order.controller.js";

// --- Middlewares
import { verifyToken, verifyTokenAndAdmin } from "@middlewares/verifyToken.middleware.js";
import { validateObjectId } from "@middlewares/validateObjectId.middleware.js";

// --- Order Routers

const OrderRouter = express.Router();

/**
 * @route /api/orders
 */
OrderRouter.get("/", verifyTokenAndAdmin, getAllOrders);

/**
 * @route /api/orders/add-order
 */
OrderRouter.post("/add-order", verifyToken, addOrder);

/**
 * @route /api/orders/my-orders
 */
OrderRouter.get("/my-orders", verifyToken, getUserOrders);

/**
 * @route /api/orders/:id
 */
OrderRouter.route("/:id").patch(validateObjectId, verifyTokenAndAdmin, updateOrderById);

export default OrderRouter;
