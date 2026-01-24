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
import { verifyAccount } from "@/api/auth";

export default function VerifyAccountPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyAccountHandler = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link. No token provided.");
        return;
      }

      try {
        const data = await verifyAccount(token);
        setStatus("success");
        setMessage(
          data.message || "Your account has been verified successfully!",
        );
      } catch (error: any) {
        setStatus("error");
        setMessage(error.message || "Verification failed. Please try again.");
        console.error("Verification error:", error);
      }
    };

    verifyAccountHandler();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {status === "loading" && "Verifying Your Account"}
            {status === "success" && "Account Verified!"}
            {status === "error" && "Verification Failed"}
          </CardTitle>
          <CardDescription>
            {status === "loading" &&
              "Please wait while we verify your account..."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === "loading" && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
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
              <Button className="w-full" onClick={() => router.push("/auth")}>
                Go to Login
              </Button>
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
              <p className="text-center text-gray-700">{message}</p>
              <div className="space-y-2">
                <Button className="w-full" onClick={() => router.push("/auth")}>
                  Go to Login
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
