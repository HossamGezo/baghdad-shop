// --- Libraries
import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

// --- Validate Object Id Middleware
export const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id as string)) {
    res.status(400).json({ message: "Invalid Id Format" });
    return;
  }

  next();
};
