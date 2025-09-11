"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import clsx from "clsx";
import { ErrorMessage } from "@/components/auth/ErrorMessage";
import { CheckCircle, Info } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [touched, setTouched] = React.useState({ email: false });
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const isEmailValid = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const emailError =
    touched.email &&
    (!email
      ? "Please enter your email."
      : !isEmailValid(email)
      ? "Email format is invalid."
      : "");

  const markTouched = (field: keyof typeof touched) =>
    setTouched((t) => ({ ...t, [field]: true }));

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true });
    if (!isEmailValid(email)) return;

    try {
      setLoading(true);
      // TODO: call your API here, e.g. await resetPassword(email)
      // await resetPassword(email);
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className=" h-[52%] flex flex-col border-0 shadow-none justify-center my-auto">
      <CardHeader>
        <p className="text-3xl font-medium">Forgot password</p>
        <CardTitle className="text-sm font-medium text-gray-500">
          We&apos;ll send a reset link to your email
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <form className="h-full flex flex-col" onSubmit={onSubmitForm}>
          <div className="flex-1 flex">
            <div className="m-auto w-full max-w-md">
              {/* EMAIL */}
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => markTouched("email")}
                  aria-invalid={!!emailError}
                  aria-describedby="email-error"
                  className={clsx(
                    emailError && "border-red-500 focus-visible:ring-red-500"
                  )}
                  required
                  placeholder="you@example.com"
                />
                {emailError && <ErrorMessage errorMessage={emailError} />}

                {sent && (
                  <div className="flex items-start gap-2 rounded-md bg-amber-50 dark:bg-amber-900/20 p-3 text-sm">
                    <Info className="mt-0.5 h-4 w-4 flex-none" />
                    <p>
                      If an account exists for <b>{email}</b>, we&apos;ve sent a
                      password reset link. Please check your inbox (and spam).
                    </p>
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
              className="w-full bg-bg-secondary/85 text-white hover:bg-bg-secondary hover:text-white disabled:opacity-60"
            >
              {loading
                ? "Sending..."
                : sent
                ? "Resend reset link"
                : "Send reset link"}
            </Button>

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
