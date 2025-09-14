"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import clsx from "clsx";
import { ErrorMessage } from "@/components/auth/ErrorMessage";

export default function SignInPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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
      // TODO: call your API here, e.g. await signIn(email, password)
      // await signIn(email, password);
    } catch (error) {
      // TODO: handle error
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
                required
                placeholder="you@example.com"
              />
              {emailError && <ErrorMessage errorMessage={emailError} />}
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => markTouched("password")}
                aria-invalid={!!passwordError}
                aria-describedby="password-error"
                className={clsx(
                  passwordError && "border-red-500 focus-visible:ring-red-500"
                )}
                required
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
              className="w-full bg-bg-secondary/85 text-white hover:bg-bg-secondary hover:text-white"
            >
              Sign In
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
