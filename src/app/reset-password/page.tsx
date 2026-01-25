"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<
    "verifying" | "ready" | "success" | "error"
  >("verifying");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid password reset link. No token provided.");
        return;
      }

      try {
        // Verify the token is valid and get email
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4200"}/api/auth/verify-password-reset-token`,
          { token },
        );

        if (response.data.email) {
          setEmail(response.data.email);
        }
        setStatus("ready");
      } catch (error: any) {
        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            "Invalid or expired reset link. Please try again.",
        );
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    // Client-side validation
    const newErrors: { [key: string]: string } = {};

    if (!newPassword) {
      newErrors.newPassword = "Password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!token) {
      setMessage("Invalid reset link");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4200"}/api/auth/reset-password`,
        { token, newPassword },
      );

      setStatus("success");
      setMessage(response.data.message || "Password reset successfully!");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/auth");
      }, 2000);
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const apiErrors: { [key: string]: string } = {};
        error.response.data.errors.forEach((err: any) => {
          apiErrors[err.field] = err.message;
        });
        setErrors(apiErrors);
      }
      setMessage(
        error.response?.data?.message ||
          "Failed to reset password. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {status === "verifying" && "Verifying Reset Link"}
            {status === "ready" && "Reset Your Password"}
            {status === "success" && "Password Reset Successfully!"}
            {status === "error" && "Reset Link Invalid"}
          </CardTitle>
          <CardDescription>
            {status === "verifying" &&
              "Please wait while we verify your reset link..."}
            {status === "ready" && "Enter your new password below"}
            {status === "success" && "Redirecting you to login..."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === "verifying" && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          )}

          {status === "ready" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {email && (
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className={errors.newPassword ? "border-red-500" : ""}
                />
                {errors.newPassword && (
                  <p className="text-sm text-red-600">{errors.newPassword}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {message && (
                <div
                  className={`p-3 rounded ${
                    message.includes("success") ||
                    message.includes("successfully")
                      ? "bg-green-50 text-green-800"
                      : "bg-red-50 text-red-800"
                  }`}
                >
                  {message}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          )}

          {status === "success" && (
            <>
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <svg
                    className="h-12 w-12 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-center text-gray-700">{message}</p>
              <p className="text-center text-sm text-gray-500">
                Redirecting to login page...
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <div className="flex justify-center">
                <div className="rounded-full bg-red-100 p-3">
                  <svg
                    className="h-12 w-12 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-center text-red-600">{message}</p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push("/auth")}
              >
                Back to Login
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
