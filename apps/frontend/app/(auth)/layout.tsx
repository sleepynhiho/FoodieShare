export const metadata = {
  title: "FoodieShare",
  description: "Discover, share, and collect recipes",
};

import * as React from "react";
import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
import { AuthRightPanel } from "@/components/auth/AuthRightPanel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 min-h-screen">
      {/* Left column: render auth form */}
      <div className="xl:col-span-2 flex flex-col gap-2 xl:shadow-right-lg xl:shadow-gray-100 px-4 sm:px-6 xl:px-0 bg-slate-50 xl:bg-white">
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-semibold text-lg mt-2 xl:mt-6 xl:ml-8"
        >
          <img src="/logo.png" alt="FoodieShare-logo" className="h-12 w-auto" />
        </Link>

        {/* Form SignUp or Login */}
        <div className="w-full sm:w-[500px] xl:w-3/4 h-full flex flex-1 flex-col self-center border-0 mt-2 xl:mt-4 bg-white shadow-md rounded-xl xl:shadow-none">
          {children}
        </div>
      </div>

      {/* Right column is for banner */}
      <AuthRightPanel />
    </div>
  );
}
