// app/(site)/layout.tsx
import { Navbar } from "@/components/NavBar";
import RandomRecipeBox from "@/components/RandomRecipeBox";
import * as React from "react";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-scope="site" className="min-h-screen bg-white antialiased">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-6">{children}</div>
      <RandomRecipeBox />
    </div>
  );
}
