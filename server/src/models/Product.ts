// --- Libraries
import mongoose, { type InferSchemaType } from "mongoose";
import { ALL_CATEGORIES } from "@/shared/types/categories.js";

// --- Product Schema
const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 99,
    },
    priceAfterDiscount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: ALL_CATEGORIES,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export type ProductType = InferSchemaType<typeof ProductSchema>;

const Product = mongoose.model("Product", ProductSchema);
export default Product;
