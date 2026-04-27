// --- Libraries
import express from "express";

// --- Modules
import { getDashboardStats } from "@modules/statistics/statistics.controller.js";

// --- Middlewares
import { verifyTokenAndAdmin } from "@middlewares/verifyToken.middleware.js";

// --- Statistics Router Logic

const StatisticsRouter = express.Router();

/**
 * @desc /api/statistics
 */
StatisticsRouter.route("/").get(verifyTokenAndAdmin, getDashboardStats);

export default StatisticsRouter;
