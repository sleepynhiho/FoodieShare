// app/(site)/layout.tsx
"use client";

import { Navbar } from "@/components/navbar";
import { FavoritesProvider } from "@/context/FavoritesContext";
import RandomRecipeBox from "@/components/RandomRecipeBox";
import { SessionProvider } from "next-auth/react";
import * as React from "react";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div data-scope="site" className="min-h-screen bg-white antialiased">
        <Navbar />
        <FavoritesProvider>
          <div className="mx-auto max-w-7xl px-4 py-6">{children}</div>
        </FavoritesProvider>
        <RandomRecipeBox />
      </div>
    </SessionProvider>
  );
}
