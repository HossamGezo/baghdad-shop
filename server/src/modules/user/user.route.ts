// --- Libraries
import express from "express";

// --- Modules
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserProfile,
  updateUserRole,
} from "@modules/user/user.controller.js";

// --- User Router Logic

const UserRouter = express.Router();

/**
 * @desc /api/users
 */
UserRouter.route("/").get(getAllUsers);

/**
 * @desc /api/users/:id
 */
UserRouter.route("/:id").get(getUserById).put(updateUserProfile).patch(updateUserRole).delete(deleteUserById);

export default UserRouter;
