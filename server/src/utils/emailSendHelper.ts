import nodemailer from "nodemailer";

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Generate a random verification token
export const generateVerificationToken = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15) +
    Date.now().toString(36)
  );
};

// Send account registration verification email with button
export const sendAccountVerificationEmail = async (
  email: string,
  name: string,
  verificationToken: string,
): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    const verificationUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/verify-account?token=${verificationToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Gym WebApp - Please Verify Your Account",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: white; border-radius: 10px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Welcome to Gym WebApp!</h2>
            <p style="color: #555; font-size: 16px; line-height: 1.6;">Hello ${name},</p>
            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              Thank you for registering with Gym WebApp! An account has been created with this email address.
            </p>
            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              To activate your account and start using our services, please verify your email address by clicking the button below:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="display: inline-block; padding: 15px 40px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
                Verify My Account
              </a>
            </div>
            
            <p style="color: #555; font-size: 14px; line-height: 1.6;">
              Or copy and paste this link into your browser:
            </p>
            <p style="color: #007bff; font-size: 14px; word-break: break-all;">
              ${verificationUrl}
            </p>
            
            <p style="color: #555; font-size: 14px; line-height: 1.6; margin-top: 30px;">
              This verification link will expire in 24 hours for security purposes.
            </p>
            <p style="color: #555; font-size: 14px; line-height: 1.6;">
              If you didn't create this account, please ignore this email.
            </p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;">
            <p style="color: #666; font-size: 12px;">
              Best regards,<br>
              Gym WebApp Team
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending account verification email:", error);
    return false;
  }
};

// Send password reset email with link
export const sendPasswordResetEmail = async (
  email: string,
  name: string,
  resetToken: string,
): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password - Gym WebApp",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: white; border-radius: 10px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #dc3545; margin-bottom: 20px;">Password Reset Request</h2>
            <p style="color: #555; font-size: 16px; line-height: 1.6;">Hello ${name},</p>
            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              We received a request to reset your password for your Gym WebApp account.
            </p>
            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              To reset your password, please click the button below:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="display: inline-block; padding: 15px 40px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
                Reset My Password
              </a>
            </div>
            
            <p style="color: #555; font-size: 14px; line-height: 1.6;">
              Or copy and paste this link into your browser:
            </p>
            <p style="color: #dc3545; font-size: 14px; word-break: break-all;">
              ${resetUrl}
            </p>
            
            <p style="color: #555; font-size: 14px; line-height: 1.6; margin-top: 30px;">
              This password reset link will expire in 1 hour for security purposes.
            </p>
            <p style="color: #555; font-size: 14px; line-height: 1.6;">
              If you didn't request this password reset, please ignore this email and contact support if you have concerns.
            </p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;">
            <p style="color: #666; font-size: 12px;">
              Best regards,<br>
              Gym WebApp Team
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return false;
  }
};
