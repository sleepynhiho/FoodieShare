"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Circle, Info } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { ErrorMessage } from "@/components/auth/ErrorMessage";

export default function SignUpPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showRequirements, setShowRequirements] = React.useState(false);

  const [touched, setTouched] = React.useState({
    name: false,
    email: false,
    password: false,
  });

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
  const isNameValid = (v: string) => v.trim().length > 0;
  const isEmailValid = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const isPasswordValid = (v: string) => requirements.every((r) => r.test(v));

  const nameError =
    touched.name && !isNameValid(name) ? "Please enter your name." : "";
  const emailError =
    touched.email &&
    (!email
      ? "Please enter your email."
      : !isEmailValid(email)
      ? "Email format is invalid."
      : "");
  const passwordError =
    touched.password &&
    (!password
      ? "Please enter your password."
      : !isPasswordValid(password)
      ? "Password does not meet the requirements."
      : "");

  // helper: set touched when blur field
  const markTouched = (field: keyof typeof touched) =>
    setTouched((t) => ({ ...t, [field]: true }));

  return (
    <Card className="border-0 space-y-10 shadow-none">
      <CardHeader>
        <p className="text-3xl font-medium">Get started</p>
        <CardTitle className="text-sm font-medium text-gray-500">
          Create a new account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            setTouched({ name: true, email: true, password: true });
            if (
              isNameValid(name) &&
              isEmailValid(email) &&
              isPasswordValid(password)
            ) {
              console.log({ name, email, password });
            }
          }}
        >
          {/* NAME */}
          <div className="space-y-2">
            <Label htmlFor="name">Your name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => markTouched("name")}
              aria-invalid={!!nameError}
              aria-describedby="name-error"
              className={clsx(
                nameError && "border-red-500 focus-visible:ring-red-500"
              )}
              required
            />
            {nameError && <ErrorMessage errorMessage={nameError} />}
          </div>

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
            />
            {emailError && <ErrorMessage errorMessage={emailError} />}
          </div>

          {/* PASSWORD */}
          <div className="relative space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setShowRequirements(true)}
              onBlur={() => {
                markTouched("password");
                if (!password) setShowRequirements(false);
              }}
              aria-invalid={!!passwordError}
              aria-describedby="password-error"
              className={clsx(
                passwordError && "border-red-500 focus-visible:ring-red-500"
              )}
              required
            />

            {passwordError && <ErrorMessage errorMessage={passwordError} />}

            {/* Checklist */}
            <div className="mt-2 min-h-[80px]">
              {showRequirements && (
                <div className="space-y-1">
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

          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full bg-bg-secondary/85 text-white hover:bg-bg-secondary hover:text-white"
            >
              Create Account
            </Button>

            <p className="text-center text-sm text-gray-600">
              Have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-text-primary underline hover:text-orange-300"
              >
                Sign In Now
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
