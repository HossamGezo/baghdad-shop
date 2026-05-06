// --- Libraries
import express from "express";

// ---- Modules
import { loginUser, registerUser, verifyUserAccount } from "@modules/auth/auth.controller.js";

// --- Auth Routers

const AuthRouter = express.Router();

/**
 * @route /api/auth/register
 */
AuthRouter.post("/register", registerUser);

/**
 * @route /api/auth/login
 */
AuthRouter.post("/login", loginUser);

/**
 * @route /api/auth/:userId/verify/:token
 */
AuthRouter.get("/:userId/verify/:token", verifyUserAccount);

export default AuthRouter;
