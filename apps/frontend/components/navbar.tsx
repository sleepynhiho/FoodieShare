"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UtensilsCrossed, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavLink = ({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) => (
  <Link
    href={href}
    className={cn(
      "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium uppercase",
      active ? "text-black font-bold" : "text-gray-600 hover:text-black"
    )}
  >
    {children}
  </Link>
);

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full bg-bg-default">
      <div className="mx-auto flex h-14 max-w-8xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-semibold text-lg"
        >
          <UtensilsCrossed className="h-5 w-5" />
          <span>
            FOODIE<span className="text-text-primary">SHARE</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="/" active={pathname === "/"}>
            Home
          </NavLink>
          <NavLink
            href="/recipes"
            active={pathname?.startsWith("/recipes")}
          >
            Recipes
          </NavLink>
          <NavLink
            href="/add-recipe"
            active={pathname === "/add-recipe"}
          >
            Add Recipe
          </NavLink>
          <NavLink
            href="/my-collection"
            active={pathname === "/my-collection"}
          >
            My Collection
          </NavLink>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Desktop: Sign in button */}
          <div className="hidden sm:block">
            <Button size="sm" className="bg-black text-white border hover:bg-gray-900">
              Sign in
            </Button>
          </div>
          {/* Mobile: Hamburger menu */}
          <button className="md:hidden p-2 rounded-md hover:bg-bg-button">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
