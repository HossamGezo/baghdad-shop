// --- Types
import type { Request, Response, NextFunction } from "express";

// --- NotFound Logic
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Not Found ${req.originalUrl}`);

  res.status(404);

  next(err);
};

// --- ErrorHandler Logic
export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  const message = error instanceof Error ? error.message : "Something went Wrong!";

  res.status(statusCode).json({ message });
};
