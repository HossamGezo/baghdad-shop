// --- Libraries
import mongoose, { type InferSchemaType } from "mongoose";

// --- Schema
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      index: true,
      type: String,
      required: true,
      trim: true,
      maxlength: [21, "Name must not exceed 21 characters"],
    },
    email: {
      index: true,
      type: String,
      required: true,
      trim: true,
      match: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
      minlength: [8, "Password must be at least 8 characters"],
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    avatar: {
      type: String,
      default: "avatar/default.png",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    address: {
      city: {
        type: String,
        trim: true,
      },
      area: {
        type: String,
        trim: true,
      },
      street: {
        type: String,
        trim: true,
      },
      phone: {
        type: String,
        match: /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

export type UserType = InferSchemaType<typeof UserSchema>;

const User = mongoose.model("User", UserSchema);
export default User;
