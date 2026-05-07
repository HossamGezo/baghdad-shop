// --- Libraries
import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

// --- Helpers
import sendEmail from "@helpers/sendEmail.js";
import { getPasswordResetTemplate } from "@helpers/emailTemplates.js";

// --- Models
import User from "@models/User.js";
import VerificationToken from "@models/VerificationToken.js";

// --- Modules
import {
  validateEmail,
  validateResetPassword,
  type EmailSchemaType,
  type ResetPasswordSchemaType,
} from "@modules/password/password.validation.js";

/**
 * @desc Send Reset Password Link
 * @route /api/password/reset-password-link
 * @method POST
 * @access public
 */
export const sendResetPasswordLink = asyncHandler(async (req: Request, res: Response) => {
  // - Validation

  const isValidate = validateEmail(req.body);

  if (!isValidate.success) {
    res.status(400).json({ message: "Invalid Email" });
    return;
  }

  const data: EmailSchemaType = isValidate.data;

  // - Get User From DB

  const user = await User.findOne({ email: data.email });

  if (!user) {
    res.status(400).json({ message: "User with given email does not exist!" });
    return;
  }

  // - Creating Varification Token

  let verificationToken = await VerificationToken.findOne({
    userId: user._id,
  });

  if (!verificationToken) {
    verificationToken = await new VerificationToken({
      userId: user._id,
      token: user.generateAuthToken(),
    }).save();
  }

  // - Creating Link

  const link = `${process.env.CLIENT_URL}/password/reset-password/${verificationToken.userId}/${verificationToken.token}`;

  // - Creating HTML Template

  const htmlTemplate = getPasswordResetTemplate(link);

  // - Sending Email

  await sendEmail(user.email, "Reset Password Link", htmlTemplate);

  // - Response

  res.status(200).json({ message: "Password reset link has been sent to your email. Please check your inbox." });
  return;
});

/**
 * @desc Get Reset Password Link
 * @route /api/password/reset-password/:userId/:token
 * @method GET
 * @access public
 */
export const getResetPasswordLink = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(400).json({ message: "Invalid Link" });
    return;
  }

  const verificationToken = await VerificationToken.findOne({ userId: req.params.userId!, token: req.params.token! });

  if (!verificationToken) {
    res.status(400).json({ message: "Invalid Link" });
    return;
  }

  res.status(200).json({ message: "Valid URL" });
  return;
});

/**
 * @desc Reset Password
 * @route /api/password/reset-password/:userId/:token
 * @method POST
 * @access public
 */
export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  // - Validation

  const isValidate = validateResetPassword(req.body);

  if (!isValidate.success) {
    res.status(400).json({ message: "Invalid Password" });
    return;
  }

  const data: ResetPasswordSchemaType = isValidate.data;

  // - Get User From DB

  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(400).json({ message: "Invalid Link" });
    return;
  }

  // - Check Verification Token

  const verificationToken = await VerificationToken.findOne({ userId: req.params.userId!, token: req.params.token! });

  if (!verificationToken) {
    res.status(400).json({ message: "Invalid Link" });
    return;
  }

  // - Verified User

  if (!user.isVerified) {
    user.isVerified = true;
  }

  // - Hash Password

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(data.password, salt);

  // - Changin User Password

  user.password = hash;
  await user.save();

  // - Clear User Verification Token

  await verificationToken.deleteOne();

  // - Response

  res
    .status(200)
    .json({ message: "Your password has been changed successfully. You can now log in with your new password." });
  return;
});
