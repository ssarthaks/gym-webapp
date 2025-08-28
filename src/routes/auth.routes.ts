import express from "express";
import {
  register,
  login,
  changePassword,
  updateProfile,
  sendEmailVerification,
  verifyEmailCode,
  sendPasswordResetCode,
  resetPasswordWithCode,
  deleteAccount,
  getProfile,
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
  validateRequiredFields(["name", "email", "phone", "password", "address"]),
  register
);

// login endpoint
router.post("/login", validateRequiredFields(["email", "password"]), login);

// change password endpoint
router.post(
  "/change-password",
  protect,
  validateRequiredFields(["oldPassword", "newPassword"]),
  changePassword
);

// update profile endpoint
router.put(
  "/update-profile",
  protect,
  validateProfileMiddleware,
  updateProfile
);

// Email verification endpoints - one sends email code other verifies and makes changes in db
router.post("/send-email-verification", protect, sendEmailVerification);
router.post(
  "/verify-email",
  validateRequiredFields(["email", "code"]),
  verifyEmailCode
);

// Password reset endpoints- one sends email code other verifies and makes changes in db
router.post(
  "/send-password-reset",
  validateRequiredFields(["email"]),
  sendPasswordResetCode
);
router.post(
  "/reset-password",
  validateRequiredFields(["email", "code", "newPassword"]),
  resetPasswordWithCode
);

// delete account endpoint
router.delete("/delete-account", protect, deleteAccount);

// Protected route - requires authentication middleware
// fetches user details endpoint
router.get("/profile", protect, getProfile);

export default router;
