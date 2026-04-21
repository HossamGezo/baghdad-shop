// --- Libraries
import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

// --- Models
import User from "@models/User.js";

// --- Modules
import {
  validateUpdateUser,
  validateUpdateUserRole,
  type UpdateUserProfileType,
  type UpdateUserRoleType,
} from "@modules/user/user.validation.js";

/**
 * @desc Get All Users
 * @route /api/users
 * @method GET
 * @access private (only admin)
 */
export const getAllUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await User.find().select("-password -__v").sort({ createdAt: -1 });

  res.status(200).json(users);
  return;
});

/**
 * @desc Get Users Count
 * @route /api/users/count
 * @method GET
 * @access private (only admin)
 */
export const getUsersCount = asyncHandler(async (_req: Request, res: Response) => {
  const users = await User.countDocuments();

  res.status(200).json(users);
  return;
});

/**
 * @desc Get User By Id
 * @route /api/users/:id
 * @method GET
 * @access private (only user himself)
 */
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    res.status(404).json({ message: "User Not Found" });
    return;
  }

  res.status(200).json(user);
  return;
});

/**
 * @desc Update User Profile
 * @route /api/users/:id
 * @method PUT
 * @access private (only user himself)
 */
export const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const isValidateUser = validateUpdateUser(req.body);

  if (!isValidateUser.success) {
    res.status(400).json({ message: isValidateUser.error.issues[0]?.message });
    return;
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404).json({ message: "User Not Found" });
    return;
  }

  const data = isValidateUser.data as UpdateUserProfileType;

  if (data.fullName) user.fullName = data.fullName;

  if (data.password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);
    user.password = hash;
  }

  if (data.address) {
    user.address = {
      ...user.address,
      ...data.address,
    };
  }

  const result = await user.save();

  const resultObject = result.toObject();
  const { password: _password, ...otherData } = resultObject;

  res.status(200).json(otherData);
  return;
});

/**
 * @desc Update User Role
 * @route /api/users/:id
 * @method PATCH
 * @access private (only admin)
 */
export const updateUserRole = asyncHandler(async (req: Request, res: Response) => {
  const isValidateUser = validateUpdateUserRole(req.body);

  if (!isValidateUser.success) {
    res.status(400).json({ message: isValidateUser.error.issues[0]?.message });
    return;
  }

  const data = isValidateUser.data as UpdateUserRoleType;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: data,
    },
    {
      new: true,
      runValidators: true,
    },
  ).select("-password");

  if (!user) {
    res.status(404).json({ message: "User Not Found" });
    return;
  }

  res.status(200).json(user);
  return;
});

/**
 * @desc Delete User By Id
 * @route /api/users/:id
 * @method DELETE
 * @access private (only admin & user himself)
 */
export const deleteUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id).select("_id");

  if (!user) {
    res.status(404).json({ message: "User Not Found" });
    return;
  }

  res.status(200).json({ message: "User has been deleted successfully!" });
  return;
});
