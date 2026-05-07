// --- Libraries
import express from "express";

// --- Modules
import { sendResetPasswordLink, getResetPasswordLink, resetPassword } from "@modules/password/password.controller.js";

// --- Password Routers

const PasswordRouter = express.Router();

/**
 * @route /api/password/reset-password-link
 */
PasswordRouter.post("/reset-password-link", sendResetPasswordLink);

/**
 * @route /api/password/reset-password/:userId/:token
 */
PasswordRouter.route("/reset-password/:userId/:token").get(getResetPasswordLink).post(resetPassword);

export default PasswordRouter;
