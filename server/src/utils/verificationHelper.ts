import { VerificationCode } from "../models/verificationCode.model";
import { User } from "../models/user.model";
import {
  generateVerificationToken,
  sendAccountVerificationEmail,
  sendPasswordResetEmail,
} from "./emailSendHelper";

// Helper function to create and send account verification email with token
export const createAndSendAccountVerification = async (
  email: string,
  name: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    // Generate verification token
    const token = generateVerificationToken();

    // Set expiration to 24 hours from now
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Delete any existing unused verification tokens for this email
    await VerificationCode.destroy({
      where: {
        email,
        type: "email_verification",
        isUsed: false,
      },
    });

    // Create new verification token record
    await VerificationCode.create({
      email,
      code: token,
      type: "email_verification",
      expiresAt,
      isUsed: false,
    });

    // Send email with verification link
    const emailSent = await sendAccountVerificationEmail(email, name, token);

    if (!emailSent) {
      return {
        success: false,
        message: "Failed to send verification email. Please try again.",
      };
    }

    return {
      success: true,
      message: `Verification email sent to ${email}. Please check your inbox.`,
    };
  } catch (error) {
    console.error("Error creating account verification:", error);
    return {
      success: false,
      message: "Failed to send verification email. Please try again.",
    };
  }
};

// Helper function to verify account with token
export const verifyAccountToken = async (
  token: string,
): Promise<{ success: boolean; message: string; email?: string }> => {
  try {
    // Find the verification token
    const verificationRecord = await VerificationCode.findOne({
      where: {
        code: token,
        type: "email_verification",
        isUsed: false,
      },
      order: [["createdAt", "DESC"]], // Get the most recent one
    });

    if (!verificationRecord) {
      return {
        success: false,
        message: "Invalid or expired verification link.",
      };
    }

    // Check if token has expired
    if (new Date() > verificationRecord.expiresAt) {
      // Mark expired tokens as used to prevent reuse
      await verificationRecord.update({ isUsed: true });
      return {
        success: false,
        message: "Verification link has expired. Please request a new one.",
      };
    }

    // Mark token as used
    await verificationRecord.update({ isUsed: true });

    // Update user's emailVerified status
    await User.update(
      { emailVerified: true },
      { where: { email: verificationRecord.email } },
    );

    return {
      success: true,
      message: "Email verified successfully! Your account is now active.",
      email: verificationRecord.email,
    };
  } catch (error) {
    console.error("Error verifying account token:", error);
    return {
      success: false,
      message: "Failed to verify account. Please try again.",
    };
  }
};
// Helper function to create and send password reset email with token
export const createAndSendPasswordReset = async (
  email: string,
  name: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    // Generate reset token
    const token = generateVerificationToken();

    // Set expiration to 1 hour from now
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    // Delete any existing unused password reset tokens for this email
    await VerificationCode.destroy({
      where: {
        email,
        type: "password_reset",
        isUsed: false,
      },
    });

    // Create new password reset token record
    await VerificationCode.create({
      email,
      code: token,
      type: "password_reset",
      expiresAt,
      isUsed: false,
    });

    // Send email with password reset link
    const emailSent = await sendPasswordResetEmail(email, name, token);

    if (!emailSent) {
      return {
        success: false,
        message: "Failed to send password reset email. Please try again.",
      };
    }

    return {
      success: true,
      message: `Password reset email sent to ${email}. Please check your inbox.`,
    };
  } catch (error) {
    console.error("Error creating password reset:", error);
    return {
      success: false,
      message: "Failed to send password reset email. Please try again.",
    };
  }
};

// Helper function to verify password reset token
export const verifyPasswordResetToken = async (
  token: string,
): Promise<{ success: boolean; message: string; email?: string }> => {
  try {
    // Find the password reset token
    const verificationRecord = await VerificationCode.findOne({
      where: {
        code: token,
        type: "password_reset",
        isUsed: false,
      },
      order: [["createdAt", "DESC"]], // Get the most recent one
    });

    if (!verificationRecord) {
      return {
        success: false,
        message: "Invalid or expired password reset link.",
      };
    }

    // Check if token has expired
    if (new Date() > verificationRecord.expiresAt) {
      // Mark expired tokens as used to prevent reuse
      await verificationRecord.update({ isUsed: true });
      return {
        success: false,
        message: "Password reset link has expired. Please request a new one.",
      };
    }

    return {
      success: true,
      message: "Token is valid.",
      email: verificationRecord.email,
    };
  } catch (error) {
    console.error("Error verifying password reset token:", error);
    return {
      success: false,
      message: "Failed to verify token. Please try again.",
    };
  }
};

// Helper function to mark password reset token as used
export const markPasswordResetTokenUsed = async (
  token: string,
): Promise<void> => {
  try {
    await VerificationCode.update(
      { isUsed: true },
      {
        where: {
          code: token,
          type: "password_reset",
          isUsed: false,
        },
      },
    );
  } catch (error) {
    console.error("Error marking password reset token as used:", error);
  }
};

//
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
