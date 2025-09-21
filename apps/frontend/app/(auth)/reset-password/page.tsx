"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/services/authService";
import clsx from "clsx";
import { ErrorMessage } from "@/components/auth/ErrorMessage";
import { CheckCircle, Circle } from "lucide-react";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [showRequirements, setShowRequirements] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const markTouched = () => setTouched(true);

  const requirements = [
    { label: "Uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
    { label: "Lowercase letter", test: (pw: string) => /[a-z]/.test(pw) },
    { label: "Number", test: (pw: string) => /\d/.test(pw) },
    {
      label: "Special character (e.g. !?<>@#$%)",
      test: (pw: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pw),
    },
    { label: "8 characters or more", test: (pw: string) => pw.length >= 8 },
  ];

  // --- VALIDATORS ---
  const isPasswordValid = (v: string) => requirements.every((r) => r.test(v));

  const passwordError =
    touched &&
    (!password
      ? "Please enter your password."
      : !isPasswordValid(password)
      ? "Password does not meet the requirements."
      : "");

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isPasswordValid(password)) return;

    const userId = localStorage.getItem("resetPasswordUserId");
    if (!userId) {
      toast.error("Your password reset session has expired. Please try again by entering your email.");
      router.push('/forgot-password');
      return;
    }

    try {
      setLoading(true);
      await resetPassword(userId, password);
      toast.success("Password has been reset successfully");
      localStorage.removeItem("resetPasswordUserId"); // Clear the stored userId
      router.push("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-h-3/4 flex flex-col space-y-6 border-0 shadow-none justify-center my-auto">
      <CardHeader>
        <p className="text-3xl font-medium">Change your password</p>
        <CardTitle className="text-sm font-medium text-gray-500">
          Welcome back! Choose a new strong password and save it to proceed
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <form
          className="h-full flex flex-col space-y-8"
          onSubmit={onSubmitForm}
        >
          <div className="flex-1 flex">
            <div className="m-auto w-full max-w-md">
              {/* PASSWORD */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setShowRequirements(true)}
                  onBlur={() => {
                    markTouched();
                    if (!password) setShowRequirements(false);
                  }}
                  error={!!passwordError}
                  aria-invalid={!!passwordError}
                  aria-describedby="password-error"
                  required
                  placeholder="Your new password"
                />

                {passwordError && <ErrorMessage errorMessage={passwordError} />}

                {/* Checklist */}
                {showRequirements && (
                  <div className="mt-2 min-h-[80px] space-y-1">
                    {requirements.map((req, idx) => {
                      const ok = req.test(password);
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          {ok ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-400" />
                          )}
                          <span
                            className={ok ? "text-green-600" : "text-gray-600"}
                          >
                            {req.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer action */}
          <div className="space-y-4 mt-auto">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-bg-secondary/85 text-white/80 hover:bg-bg-secondary hover:text-white disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save new password"}
            </Button>{" "}
            <p className="text-center text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                href="/login"
                className="font-medium text-text-primary underline hover:text-orange-300"
              >
                Back to Sign In
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
