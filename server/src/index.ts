// --- Libraries
import express from "express";
import { config } from "dotenv";
import compression from "compression";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";

// --- Load environment variables from .env file
config();

// --- Configurations
import connectToDB from "@config/db.js";

// --- Middleware Files
import logger from "@middlewares/logger.middleware.js";
import { errorHandler, notFound } from "@/shared/middlewares/error.middleware.js";

// --- Initialize App
const app = express();

// --- Performance Middlewares
app.use(compression());

// --- Request Parsing Middlewares
app.use(express.json());

// --- Security Middlewares
app.use(hpp());

// --- Helmet
app.use(helmet());

// --- Cors
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);

// --- Logger Middleware
app.use(logger);

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
