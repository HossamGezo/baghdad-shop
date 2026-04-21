export interface UserPayload {
  id: string;
  role: "customer" | "admin";
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
