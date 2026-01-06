import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { rateLimit } from "express-rate-limit";

dotenv.config();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

//express rate limit library
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100, 
  standardHeaders: "draft-8", 
  legacyHeaders: false, 
  ipv6Subnet: 56, 
});

app.use(express.json());
app.use(limiter);
app.use("/api/auth", authRoutes);
app.use(errorHandler);

export default app;
