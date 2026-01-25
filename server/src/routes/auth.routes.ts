import express from "express";
import {
  register,
  login,
  changePassword,
  updateProfile,
  deleteAccount,
  getProfile,
  verifyAccount,
  sendPasswordReset,
  resetPassword,
  verifyPasswordResetTokenController,
} from "../controllers/auth.controller";
import {
  validateRequiredFields,
  validateProfileUpdate as validateProfileMiddleware,
} from "../middlewares/validation.middleware";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

// Register endpoint
router.post(
  "/register",
  validateRequiredFields([
    "name",
    "email",
    "phone",
    "password",
    "address",
    "accountType",
  ]),
  register,
);

// login endpoint
router.post("/login", validateRequiredFields(["email", "password"]), login);

// change password endpoint
router.post(
  "/change-password",
  protect,
  validateRequiredFields(["oldPassword", "newPassword"]),
  changePassword,
);

// update profile endpoint
router.put(
  "/update-profile",
  protect,
  validateProfileMiddleware,
  updateProfile,
);

// Account verification endpoint for email link verification
router.post(
  "/verify-account",
  validateRequiredFields(["token"]),
  verifyAccount,
);

// Password reset endpoints
router.post(
  "/send-password-reset",
  validateRequiredFields(["email"]),
  sendPasswordReset,
);
router.post(
  "/verify-password-reset-token",
  validateRequiredFields(["token"]),
  verifyPasswordResetTokenController,
);
router.post(
  "/reset-password",
  validateRequiredFields(["token", "newPassword"]),
  resetPassword,
);

// delete account endpoint
router.delete("/delete-account", protect, deleteAccount);

// Protected route - requires authentication middleware
// fetches user details endpoint
router.get("/profile", protect, getProfile);

export default router;
