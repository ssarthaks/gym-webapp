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

// Generate a random 6-digit verification code
export const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate a random verification token
export const generateVerificationToken = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15) +
    Date.now().toString(36)
  );
};

// Send verification code via email
export const sendVerificationCode = async (
  email: string,
  name: string,
  code: string,
): Promise<boolean> => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification Code - Gym WebApp",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Email Verification</h2>
          <p>Hello ${name},</p>
          <p>Thank you for registering with Gym WebApp. Please use the following verification code to verify your email address:</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0; border-radius: 5px;">
            <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 3px;">${code}</h1>
          </div>
          
          <p>This code will expire in 10 minutes for security purposes.</p>
          <p>If you didn't request this verification, please ignore this email.</p>
          
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            Best regards,<br>
            Gym WebApp Team
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    return false;
  }
};

// Send password reset code via email
export const sendPasswordResetCode = async (
  email: string,
  name: string,
  code: string,
): Promise<boolean> => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Code - Gym WebApp",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset</h2>
          <p>Hello ${name},</p>
          <p>You requested to reset your password. Please use the following code to proceed:</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0; border-radius: 5px;">
            <h1 style="color: #dc3545; font-size: 32px; margin: 0; letter-spacing: 3px;">${code}</h1>
          </div>
          
          <p>This code will expire in 10 minutes for security purposes.</p>
          <p>If you didn't request this password reset, please ignore this email and contact support if you have concerns.</p>
          
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            Best regards,<br>
            Gym WebApp Team
          </p>
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
