// --- Libraries
import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

// --- Helpers
import sendEmail from "@helpers/sendEmail.js";
import { getVerificationTemplate } from "@helpers/emailTemplates.js";

// --- Models
import User from "@models/User.js";

// --- Modules
import {
  validateLogin,
  validateRegister,
  type LoginSchemaType,
  type RegisterSchemaType,
} from "@modules/auth/auth.validation.js";
import VerificationToken from "@models/VerificationToken.js";

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

  // - Creating New VerificationToken & save it to DB

  const verificationToken = new VerificationToken({
    userId: user._id,
    token: user.generateAuthToken(),
  });

  await verificationToken.save();

  // - Creating New Link

  const link = `${process.env.CLIENT_URL}/auth/${verificationToken.userId}/verify/${verificationToken.token}`;

  // - Putting The Link Into Html Template

  const htmlTemplate = getVerificationTemplate(link);

  // - Send Email To User

  await sendEmail(user.email, "Verify Your Email", htmlTemplate);

  // - Response

  res.status(201).json({ message: "We sent to you an email, please verify your email address" });
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

  if (!user.isVerified) {
    // - Verification Token

    let verificationToken = await VerificationToken.findOne({
      userId: user._id,
    });

    if (!verificationToken) {
      await VerificationToken.deleteMany({ userId: user._id });

      verificationToken = await new VerificationToken({
        userId: user._id,
        token: user.generateAuthToken(),
      }).save();
    }

    // - Creating New Link

    const link = `${process.env.CLIENT_URL}/auth/${verificationToken.userId}/verify/${verificationToken.token}`;

    // - Putting The Link Into Html Template

    const htmlTemplate = getVerificationTemplate(link);

    // - Send Email To User

    await sendEmail(user.email, "Verify Your Email", htmlTemplate);

    // - Response

    res.status(400).json({ message: "We sent to you an email, please verify your email address" });
    return;
  }

  const isPasswordMatch = await bcrypt.compare(data.password, user.password);

  if (!isPasswordMatch) {
    res.status(400).json({ message: "invalid email or password" });
    return;
  }

  if (!process.env.JWT_SECRET_KEY || !process.env.JWT_EXPIRES_IN) {
    throw new Error("Missing JWT Config");
  }

  const token = user.generateAuthToken();

  const { password: _password, ...otherData } = user.toObject();
  res.status(200).json({ ...otherData, token });
  return;
});

/**
 * @desc Verify User Account
 * @route /api/auth/:userId/verify/:token
 * @method GET
 * @access public
 */
export const verifyUserAccount = asyncHandler(async (req: Request, res: Response) => {
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

  user.isVerified = true;

  await user.save();

  await verificationToken.deleteOne();

  res.status(200).json({ message: "Your Account is Verified, Please Login" });
  return;
});
