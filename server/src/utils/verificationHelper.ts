import { VerificationCode } from "../models/verificationCode.model";
import { User } from "../models/user.model";
import {
  generateVerificationCode,
  sendVerificationCode,
  sendPasswordResetCode,
} from "./emailSendHelper";

// Helper function to create and send verification code
export const createAndSendVerificationCode = async (
  email: string,
  name: string,
  type: "email_verification" | "password_reset"
): Promise<{ success: boolean; message: string }> => {
  try {
    // Generate 6-digit code
    const code = generateVerificationCode();

    // Set expiration to 10 minutes from now
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Delete any existing unused codes for this email and type
    await VerificationCode.destroy({
      where: {
        email,
        type,
        isUsed: false,
      },
    });

    // Create new verification code
    await VerificationCode.create({
      email,
      code,
      type,
      expiresAt,
      isUsed: false,
    });

    // Send email based on type
    let emailSent: boolean;
    if (type === "email_verification") {
      emailSent = await sendVerificationCode(email, name, code);
    } else {
      emailSent = await sendPasswordResetCode(email, name, code);
    }

    if (!emailSent) {
      return {
        success: false,
        message: "Failed to send verification email. Please try again.",
      };
    }

    return {
      success: true,
      message: `Verification code sent to ${email}. Please check your inbox.`,
    };
  } catch (error) {
    console.error("Error creating verification code:", error);
    return {
      success: false,
      message: "Failed to send verification code. Please try again.",
    };
  }
};

// Helper function to verify code
export const verifyCode = async (
  email: string,
  code: string,
  type: "email_verification" | "password_reset"
): Promise<{ success: boolean; message: string; isValid: boolean }> => {
  try {
    // Find the verification code
    const verificationRecord = await VerificationCode.findOne({
      where: {
        email,
        code,
        type,
        isUsed: false,
      },
      order: [["createdAt", "DESC"]], // Get the most recent one
    });

    if (!verificationRecord) {
      return {
        success: false,
        message: "Invalid or expired verification code.",
        isValid: false,
      };
    }

    // Check if code has expired
    if (new Date() > verificationRecord.expiresAt) {
      // Mark expired codes as used to prevent reuse
      await verificationRecord.update({ isUsed: true });
      return {
        success: false,
        message: "Verification code has expired. Please request a new one.",
        isValid: false,
      };
    }

    // Mark code as used
    await verificationRecord.update({ isUsed: true });

    // If it's email verification, update user's emailVerified status
    if (type === "email_verification") {
      await User.update({ emailVerified: true }, { where: { email } });
    }

    return {
      success: true,
      message:
        type === "email_verification"
          ? "Email verified successfully!"
          : "Code verified successfully!",
      isValid: true,
    };
  } catch (error) {
    console.error("Error verifying code:", error);
    return {
      success: false,
      message: "Failed to verify code. Please try again.",
      isValid: false,
    };
  }
};

// Clean up expired verification codes (can be run as a scheduled job)
export const cleanupExpiredCodes = async (): Promise<void> => {
  try {
    await VerificationCode.destroy({
      where: {
        expiresAt: {
          [require("sequelize").Op.lt]: new Date(),
        },
      },
    });
    console.log("Expired verification codes cleaned up");
  } catch (error) {
    console.error("Error cleaning up expired codes:", error);
  }
};
