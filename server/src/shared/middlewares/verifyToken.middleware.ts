// --- Libraries
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// --- Types
import type { UserPayload } from "@custom-types/express.js";

// --- Verify Token Middleware
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided, access denied" });
    return;
  }

  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET_KEY!) as UserPayload;

    req.user = decodedPayload;

    next();
  } catch (error) {
    res.status(401).json({ message: `Invalid token, access denied, ${error}` });
    return;
  }
};

// --- Verify Token & Admin
export const verifyTokenAndAdmin = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.user?.role !== "admin") {
      res.status(403).json({ message: "You are not allowed, only admin" });
      return;
    }

    next();
  });
};

// --- Verify Token & Only User Himself
export const verifyTokenAndUser = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.user?.id !== req.params.id) {
      res.status(403).json({ message: "You are not allowed, only user himself" });
      return;
    }

    next();
  });
};
