// --- Libraries
import jwt, { type SignOptions } from "jsonwebtoken";
import mongoose, { type InferSchemaType, type Model } from "mongoose";

// --- Types
type UserMethodsType = {
  generateAuthToken(): string;
};

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
      default: "active",
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    address: {
      city: {
        type: String,
        trim: true,
        default: "",
      },
      area: {
        type: String,
        trim: true,
        default: "",
      },
      street: {
        type: String,
        trim: true,
        default: "",
      },
      phone: {
        type: String,
        match: /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/,
        trim: true,
        default: "",
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// --- Populate Orders That Belongs To Logged In User
UserSchema.virtual("orders", {
  ref: "Order",
  foreignField: "userId",
  localField: "_id",
});

// --- Token Auto Generate When Login or Register
UserSchema.methods.generateAuthToken = function () {
  const secret = process.env.JWT_SECRET_KEY!;
  const expires = process.env.JWT_EXPIRES_IN!;

  return jwt.sign({ id: this._id, role: this.role }, secret, {
    expiresIn: expires as Exclude<SignOptions["expiresIn"], undefined>,
  });
};

export type UserType = InferSchemaType<typeof UserSchema>;

const User = mongoose.model<UserType, Model<UserType, object, UserMethodsType>>("User", UserSchema);
export default User;
