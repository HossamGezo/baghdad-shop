// --- Libraries
import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

// --- Models
import User from "@models/User.js";

// --- Modules
import {
  validateLogin,
  validateRegister,
  type LoginSchemaType,
  type RegisterSchemaType,
} from "@modules/auth/auth.validation.js";

/**
 * @desc Register New User
 * @route /api/auth/register
 * @method POST
 * @access public
 */
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const isValidate = validateRegister(req.body);

  if (!isValidate.success) {
    res.status(400).json({ message: isValidate.error.issues[0]?.message });
    return;
  }

  const data: RegisterSchemaType = isValidate.data;

  const isExist = await User.findOne({ email: data.email });

  if (isExist) {
    res.status(400).json({ message: "This user already registered" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(data.password, salt);

  data.password = hash;

  const user = await new User(data).save();

  if (!process.env.JWT_SECRET_KEY || !process.env.JWT_EXPIRES_IN) {
    throw new Error("Missing JWT config");
  }

  const token = user.generateAuthToken();

  const { password: _password, ...otherData } = user.toObject();

  res.status(201).json({ ...otherData, token });
  return;
});

/**
 * @desc Login User
 * @route /api/auth/login
 * @method POST
 * @access public
 */
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const isValidate = validateLogin(req.body);

  if (!isValidate.success) {
    res.status(400).json({ message: isValidate.error.issues[0]?.message });
    return;
  }

  const data: LoginSchemaType = isValidate.data;

  const user = await User.findOne({ email: data.email }).select("+password");

  if (!user) {
    res.status(400).json({ message: "invalid email or password" });
    return;
  }

  const isPasswordMatch = await bcrypt.compare(data.password, user.password);

  if (!isPasswordMatch) {
    res.status(400).json({ message: "invalid email or password" });
    return;
  }

  if (!process.env.JWT_SECRET_KEY || !process.env.JWT_EXPIRES_IN) {
    throw new Error("Missing JWT config");
  }

  const token = user.generateAuthToken();

  const { password: _password, ...otherData } = user.toObject();
  res.status(200).json({ ...otherData, token });
  return;
});
