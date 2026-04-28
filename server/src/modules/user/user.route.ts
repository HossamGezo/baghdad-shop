// --- Libraries
import express from "express";

// --- Modules
import {
  deleteUserById,
  getAllUsers,
  getUserProfile,
  getUsersCount,
  updateUserProfile,
  updateUserRole,
} from "@modules/user/user.controller.js";

// --- Middlewares
import { verifyTokenAndAdmin, verifyTokenAndUser } from "@middlewares/verifyToken.middleware.js";
import { validateObjectId } from "@middlewares/validateObjectId.middleware.js";

// --- User Routers

const UserRouter = express.Router();

/**
 * @route /api/users
 */
UserRouter.route("/").get(verifyTokenAndAdmin, getAllUsers);

/**
 * @route /api/user/count
 */
UserRouter.route("/count").get(verifyTokenAndAdmin, getUsersCount);

/**
 * @route /api/users/:id
 */
UserRouter.route("/:id")
  .get(validateObjectId, verifyTokenAndUser, getUserProfile)
  .put(validateObjectId, verifyTokenAndUser, updateUserProfile)
  .patch(validateObjectId, verifyTokenAndAdmin, updateUserRole)
  .delete(validateObjectId, verifyTokenAndAdmin, deleteUserById);

export default UserRouter;
