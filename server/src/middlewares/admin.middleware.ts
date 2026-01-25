import { Request, Response, NextFunction } from "express";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    if (user.accountType !== "business") {
      return res.status(403).json({
        message: "Forbidden: Only business accounts can access this resource",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
