import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(errorHandler);

export default app;
