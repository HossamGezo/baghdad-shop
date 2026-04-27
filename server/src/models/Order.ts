// ---- Libraries
import mongoose, { type InferSchemaType } from "mongoose";

// --- Order Schema
const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      lowercase: true,
    },
    orderItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: {
          type: String,
          required: true,
          trim: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        count: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
      },
    ],
    shippingAddress: {
      city: {
        type: String,
        required: true,
        trim: true,
      },
      area: {
        type: String,
        required: true,
        trim: true,
      },
      street: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        match: /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/,
        trim: true,
      },
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["card", "cash"],
      default: "card",
    },
  },
  {
    timestamps: true,
  },
);

export type OrderType = InferSchemaType<typeof OrderSchema>;

const Order = mongoose.model("Order", OrderSchema);
export default Order;
