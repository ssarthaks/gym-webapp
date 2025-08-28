import { Request, Response, NextFunction } from "express";
import { Session } from "../models/session.model";
import { User } from "../models/user.model";

// verify the user session middleware
export const sessionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });
    const token = authHeader.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "Invalid token format" });

    const session = await Session.findOne({ where: { token } });
    if (!session) return res.status(401).json({ message: "Session not found" });
    if (session.expiresAt < new Date())
      return res.status(401).json({ message: "Session expired" });

    // Refresh expiry (sliding window)
    session.expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
    await session.save();

    // Attach user to request
    (req as any).user = await User.findByPk(session.userId);
    next();
  } catch (err) {
    return res.status(500).json({ message: "Session error", error: err });
  }
};
