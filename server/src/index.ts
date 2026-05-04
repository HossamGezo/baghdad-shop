// --- Libraries
import express from "express";
import { config } from "dotenv";
import compression from "compression";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

// --- Load environment variables from .env file
config();

// --- Configurations
import connectToDB from "@config/db.js";

// --- Middleware Files
import logger from "@middlewares/logger.middleware.js";
import { errorHandler, notFound } from "@middlewares/error.middleware.js";

// --- Router Files
import UserRouter from "@modules/user/user.route.js";
import AuthRouter from "@modules/auth/auth.route.js";
import ProductRouter from "@modules/product/product.route.js";
import OrderRouter from "@modules/order/order.route.js";
import StatisticsRouter from "@modules/statistics/statistics.route.js";

// --- Initialize App
const app = express();

// --- Cors
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);

// --- Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: process.env.NODE_ENV === "DEVELOPMENT" ? 1000 : 100,
  message: {
    message: "Too many requests from this IP, please try again after 15 minutes",
  },
});

app.use("/api", limiter);

// --- Helmet : HTTP Headers
app.use(helmet());

// --- Performance Middlewares
app.use(compression());

// --- Request Parsing Middlewares
app.use(express.json());

// --- Security Middlewares : HTTP Parameter Pollution
app.use(hpp());

// --- Logger Middleware
app.use(logger);

// --- API Routers
app.use("/api/users", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/products", ProductRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/statistics", StatisticsRouter);

// --- Error Middlewares
app.use(notFound);
app.use(errorHandler);

// --- Database Connection & Server Startup
const PORT = process.env.PORT || 8000;
connectToDB().then(() =>
  app.listen(PORT, () =>
    console.log(`Server is running in ${process.env.NODE_ENV || "DEVELOPMENT"} mode on port ${PORT}`),
  ),
);
