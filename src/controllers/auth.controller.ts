import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { Session } from "../models/session.model";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import {
  validateRegistrationData,
  validateLoginData,
  validatePasswordChange,
  validateProfileUpdate,
  validateEmailOnly,
} from "../utils/validation";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, phone, password } = req.body;

    // Validate request data
    const validation = validateRegistrationData({
      name,
      email,
      phone,
      password,
    });
    if (!validation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const {
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
    } = validation.sanitizedData!;

    const existing = await User.findOne({ where: { email: sanitizedEmail } });
    if (existing && !existing.isDeleted)
      return res.status(400).json({ message: "User already exists" });
    if (existing && existing.isDeleted)
      return res.status(400).json({
        message:
          "Account previously deleted. Please contact support to restore.",
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      password: hashedPassword,
      previousPasswords: [hashedPassword],
    });

    const token = generateToken(user.id);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Validate request data
    const validation = validateLoginData({ email, password });
    if (!validation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const { email: sanitizedEmail } = validation.sanitizedData!;

    const user = await User.findOne({ where: { email: sanitizedEmail } });
    if (!user || user.isDeleted)
      return res
        .status(401)
        .json({ message: "Invalid credentials or account deleted" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate token and session
    const token = generateToken(user.id);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry
    await Session.create({ userId: user.id, token, expiresAt });

    res.json({ token, expiresAt });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    // Validate request data
    const validation = validatePasswordChange({
      email,
      oldPassword,
      newPassword,
    });
    if (!validation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const { email: sanitizedEmail } = validation.sanitizedData!;

    const user = await User.findOne({ where: { email: sanitizedEmail } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Old password is incorrect" });

    // Check if new password matches any previous password
    for (const prevHash of user.previousPasswords || []) {
      if (await bcrypt.compare(newPassword, prevHash)) {
        return res.status(400).json({
          message: "New password must not match any previously used password.",
        });
      }
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    // Update previousPasswords array
    const updatedPrev = [...(user.previousPasswords || []), hashedNewPassword];
    user.password = hashedNewPassword;
    user.previousPasswords = updatedPrev;
    await user.save();

    res.json({ message: "Password changed successfully." });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, phone, newEmail } = req.body;

    // Validate request data
    const validation = validateProfileUpdate({ email, name, phone, newEmail });
    if (!validation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const {
      email: sanitizedEmail,
      name: sanitizedName,
      phone: sanitizedPhone,
      newEmail: sanitizedNewEmail,
    } = validation.sanitizedData!;

    const user = await User.findOne({ where: { email: sanitizedEmail } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields if provided
    if (sanitizedName !== undefined) {
      user.name = sanitizedName;
    }
    if (sanitizedPhone !== undefined) {
      user.phone = sanitizedPhone;
    }
    if (sanitizedNewEmail !== undefined) {
      // Check if new email already exists
      const existingUser = await User.findOne({
        where: { email: sanitizedNewEmail },
      });
      if (existingUser && existingUser.id !== user.id) {
        return res.status(400).json({ message: "Email already in use" });
      }
      user.email = sanitizedNewEmail;
    }

    await user.save();
    res.json({
      message: "Profile updated successfully.",
      user: { name: user.name, email: user.email, phone: user.phone },
    });
  } catch (err) {
    next(err);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    // Validate request data
    const validation = validateEmailOnly({ email });
    if (!validation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const { email: sanitizedEmail } = validation.sanitizedData!;

    const user = await User.findOne({ where: { email: sanitizedEmail } });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.emailVerified = true;
    await user.save();
    res.json({ message: "Email verified successfully." });
  } catch (err) {
    next(err);
  }
};

export const deleteAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    // Validate request data
    const validation = validateEmailOnly({ email });
    if (!validation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const { email: sanitizedEmail } = validation.sanitizedData!;

    const user = await User.findOne({ where: { email: sanitizedEmail } });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isDeleted)
      return res.status(400).json({ message: "Account already deleted." });

    user.isDeleted = true;
    await user.save();
    res.json({ message: "Account deleted successfully." });
  } catch (err) {
    next(err);
  }
};
