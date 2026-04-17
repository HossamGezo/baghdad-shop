// --- Types
import type { Request, Response, NextFunction } from "express";

// --- Logger Middleware Logic
const logger = (req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`);

  next();
};

export default logger;
