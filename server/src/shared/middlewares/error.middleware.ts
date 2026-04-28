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

  let message = "Something went wrong!";
  let stack = null;

  if (error instanceof Error) {
    message = error.message;
    stack = error.stack;
  } else if (typeof error === "string") {
    message = error;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : stack,
  });
};
