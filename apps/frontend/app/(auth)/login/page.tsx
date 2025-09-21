"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PasswordInput } from "@/components/auth/PasswordInput";
import Link from "next/link";
import clsx from "clsx";
import { ErrorMessage } from "@/components/auth/ErrorMessage";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthActions } from "@/hooks/useAuthActions";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { login } = useAuthActions();

  const [touched, setTouched] = React.useState({
    email: false,
    password: false,
  });

  const isEmailValid = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const isPasswordValid = (v: string) => v.trim().length > 0;

  const emailError =
    touched.email &&
    (!email
      ? "Please enter your email."
      : !isEmailValid(email)
      ? "Email format is invalid."
      : "");
  const passwordError =
    touched.password && !isPasswordValid(password)
      ? "Please enter your password."
      : "";

  const markTouched = (field: keyof typeof touched) =>
    setTouched((t) => ({ ...t, [field]: true }));

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!isEmailValid(email) || !isPasswordValid(password)) return;

    try {
      setLoading(true);
      // Call login API
      await login(email, password);
      
      // Clear form on success
      setEmail("");
      setPassword("");
      setTouched({ email: false, password: false });
      
      router.push("/"); // Redirect to homepage
      toast.success("Logged in successfully!");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-full border-0 space-y-10 shadow-none">
      <CardHeader>
        <p className="text-3xl font-medium">Welcome back</p>
        <CardTitle className="text-sm font-medium text-gray-500">
          Sign in to your account
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <form
          className="h-5/6 flex flex-col justify-around"
          onSubmit={onSubmitForm}
        >
          <div className="space-y-8">
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
                placeholder="you@example.com"
              />
              {emailError && <ErrorMessage errorMessage={emailError} />}
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => markTouched("password")}
                aria-invalid={!!passwordError}
                aria-describedby="password-error"
                error={!!passwordError}
                placeholder="Your password"
              />
              {passwordError && <ErrorMessage errorMessage={passwordError} />}

              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-text-primary underline hover:text-orange-300"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-bg-secondary/85 text-white hover:bg-bg-secondary hover:text-white"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-text-primary underline hover:text-orange-300"
              >
                Create one
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
