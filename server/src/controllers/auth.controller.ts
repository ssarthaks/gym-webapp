import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { Session } from "../models/session.model";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateTokenHelper";
import {
  validateRegistrationData,
  validateLoginData,
  validatePasswordChange,
  validateProfileUpdate,
  validateEmailOnly,
  validatePasswordChangeAuth,
  validateProfileUpdateAuth,
} from "../utils/validationHelper";
import {
  createAndSendVerificationCode,
  verifyCode,
  createAndSendAccountVerification,
  verifyAccountToken,
} from "../utils/verificationHelper";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, phone, password, address, accountType } = req.body;

    // Validate request data
    const validation = validateRegistrationData({
      name,
      email,
      phone,
      password,
      address,
      accountType,
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
      password: sanitizedPassword,
      address: sanitizedAddress,
      accountType: sanitizedAccountType,
    } = validation.sanitizedData!;

    const existing = await User.findOne({ where: { email: sanitizedEmail } });
    if (existing && !existing.isDeleted)
      return res.status(400).json({ message: "User already exists" });
    if (existing && existing.isDeleted)
      return res.status(400).json({
        message:
          "Account previously deleted. Please contact support to restore.",
      });

    const hashedPassword = await bcrypt.hash(sanitizedPassword, 10);
    const user = await User.create({
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      address: sanitizedAddress,
      accountType: sanitizedAccountType,
      password: hashedPassword,
    });

    // Send verification email
    const verificationResult = await createAndSendAccountVerification(
      sanitizedEmail,
      sanitizedName,
    );

    if (!verificationResult.success) {
      console.error(
        "Failed to send verification email:",
        verificationResult.message,
      );
      // Continue with registration even if email fails
    }

    const token = generateToken(user.id);
    res.status(201).json({
      token,
      message:
        "Account created successfully. Please check your email to verify your account.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address || null,
        accountType: user.accountType,
        emailVerified: user.emailVerified,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
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

    const { email: sanitizedEmail, password: sanitizedPassword } =
      validation.sanitizedData!;

    const user = await User.findOne({ where: { email: sanitizedEmail } });
    if (!user || user.isDeleted)
      return res
        .status(401)
        .json({ message: "Invalid credentials or account deleted" });

    const isMatch = await bcrypt.compare(sanitizedPassword, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate token and session
    const token = generateToken(user.id);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry
    await Session.create({ userId: user.id, token, expiresAt });

    // Return token, expiration, and user data (excluding sensitive info)
    res.json({
      token,
      expiresAt,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address || null,
        emailVerified: user.emailVerified,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Validate request data (no email required for token-authenticated request)
    const validation = validatePasswordChangeAuth({
      oldPassword,
      newPassword,
    });

    if (!validation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors,
      });
    }
    const {
      oldPassword: sanitizedOldPassword,
      newPassword: sanitizedNewPassword,
    } = validation.sanitizedData!;

    const user = await User.findByPk(userId);
    if (!user || user.isDeleted) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(sanitizedOldPassword, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Old password is incorrect" });

    const hashedNewPassword = await bcrypt.hash(sanitizedNewPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: "Password changed successfully." });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, phone, newEmail, address } = req.body;
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Validate request data (no email required for token-authenticated request)
    const validation = validateProfileUpdateAuth({
      name,
      phone,
      newEmail,
      address,
    });

    if (!validation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const {
      name: sanitizedName,
      phone: sanitizedPhone,
      address: sanitizedAddress,
      newEmail: sanitizedNewEmail,
    } = validation.sanitizedData!;

    const user = await User.findByPk(userId);
    if (!user || user.isDeleted) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    if (sanitizedName !== undefined) {
      user.name = sanitizedName;
    }
    if (sanitizedPhone !== undefined) {
      user.phone = sanitizedPhone;
    }
    if (sanitizedAddress !== undefined) {
      user.address = sanitizedAddress;
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
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const sendEmailVerification = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findByPk(userId);
    if (!user || user.isDeleted) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.emailVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    // Send verification code
    const result = await createAndSendVerificationCode(
      user.email,
      user.name,
      "email_verification",
    );

    if (!result.success) {
      return res.status(500).json({ message: result.message });
    }

    res.json({ message: result.message });
  } catch (err) {
    next(err);
  }
};

export const verifyEmailCode = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, code } = req.body;

    // Validate that both email and code are provided
    if (!email || !code) {
      return res.status(400).json({
        message: "Missing required fields",
        errors: [
          ...(!email ? [{ field: "email", message: "Email is required" }] : []),
          ...(!code
            ? [{ field: "code", message: "Verification code is required" }]
            : []),
        ],
      });
    }

    // Validate email format
    const validation = validateEmailOnly({ email });
    if (!validation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const { email: sanitizedEmail } = validation.sanitizedData!;

    // Verify the code
    const result = await verifyCode(sanitizedEmail, code, "email_verification");

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    res.json({ message: result.message });
  } catch (err) {
    next(err);
  }
};

// Send password reset code
export const sendPasswordResetCode = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
    if (!user) {
      // Don't reveal if user exists or not for security
      return res.json({
        message:
          "If an account with this email exists, a password reset code has been sent.",
      });
    }

    if (user.isDeleted) {
      return res
        .status(400)
        .json({ message: "Account is deleted. Please contact support." });
    }

    // Send password reset code
    const result = await createAndSendVerificationCode(
      sanitizedEmail,
      user.name,
      "password_reset",
    );

    if (!result.success) {
      return res.status(500).json({ message: result.message });
    }

    res.json({ message: "Password reset code sent to your email." });
  } catch (err) {
    next(err);
  }
};

// Reset password with code
export const resetPasswordWithCode = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, code, newPassword } = req.body;

    // Validate that all fields are provided
    const missingFields = [];
    if (!email) missingFields.push("email");
    if (!code) missingFields.push("code");
    if (!newPassword) missingFields.push("newPassword");

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields",
        errors: missingFields.map((field) => ({
          field,
          message: `${
            field === "newPassword"
              ? "New password"
              : field.charAt(0).toUpperCase() + field.slice(1)
          } is required`,
        })),
      });
    }

    // Validate email and password
    const emailValidation = validateEmailOnly({ email });
    if (!emailValidation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: emailValidation.errors,
      });
    }

    // Validate new password strength
    const passwordValidation = validatePasswordChange({
      email,
      oldPassword: "dummy", // We don't need old password for reset
      newPassword,
    });

    // Filter out old password error since we don't need it for reset
    const passwordErrors = passwordValidation.errors.filter(
      (err) => err.field === "newPassword",
    );
    if (passwordErrors.length > 0) {
      return res.status(400).json({
        message: "Password validation failed",
        errors: passwordErrors,
      });
    }

    const { email: sanitizedEmail } = emailValidation.sanitizedData!;

    // Verify the code first
    const codeResult = await verifyCode(sanitizedEmail, code, "password_reset");
    if (!codeResult.success) {
      return res.status(400).json({ message: codeResult.message });
    }

    // Find user and update password
    const user = await User.findOne({ where: { email: sanitizedEmail } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: "Password reset successfully." });
  } catch (err) {
    next(err);
  }
};

export const deleteAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isDeleted)
      return res.status(400).json({ message: "Account already deleted." });

    user.isDeleted = true;
    await user.save();
    res.json({ message: "Account deleted successfully." });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // This endpoint assumes you have auth middleware that adds user to req
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findByPk(userId);
    if (!user || user.isDeleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        emailVerified: user.emailVerified,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Verify account with token from email link
export const verifyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Verification token is required" });
    }

    const result = await verifyAccountToken(token);

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    res.json({ message: result.message });
  } catch (err) {
    next(err);
  }
};
