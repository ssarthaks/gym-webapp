import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats,
} from "../controllers/user.controller";
import { protect } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/admin.middleware";

const router = express.Router();

// Get all users (admin only)
router.get("/", protect, isAdmin, getAllUsers);

// Get user stats (admin only)
router.get("/stats", protect, isAdmin, getUserStats);

// Get user by ID (authenticated users)
router.get("/:id", protect, getUserById);

// Update user (admin or self)
router.put("/:id", protect, updateUser);

// Delete user (admin or self - soft delete)
router.delete("/:id", protect, deleteUser);

export default router;
