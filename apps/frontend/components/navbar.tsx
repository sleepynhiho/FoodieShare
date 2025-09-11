"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UtensilsCrossed, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NavLink = ({
  href,
  children,
  active,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
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
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen(!open);

  return (
    <header className="sticky top-0 z-40 w-full bg-bg-default">
      <div className="mx-auto flex h-14 max-w-8xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-semibold text-lg"
        >
          <img
            src="/logo.png"
            alt="FoodieShare-logo"
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="/" active={pathname === "/"}>
            Home
          </NavLink>
          <NavLink href="/recipes" active={pathname?.startsWith("/recipes")}>
            Recipes
          </NavLink>
          <NavLink href="/add-recipe" active={pathname === "/add-recipe"}>
            Add Recipe
          </NavLink>
          <NavLink href="/my-collection" active={pathname === "/my-collection"}>
            My Collection
          </NavLink>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Desktop: Sign in button */}
          <div className="hidden sm:block">
            <Button
              size="sm"
              className="bg-black text-white border hover:bg-gray-900"
            >
              Sign in
            </Button>
          </div>
          {/* Mobile: Side menu button */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-md hover:bg-bg-button"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Sidebar (mobile) */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40"
              onClick={toggleSidebar}
            />
            {/* Panel */}
            <motion.div
              key="sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-64 bg-white shadow-lg p-4 flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 font-semibold text-lg"
                  onClick={toggleSidebar}
                >
                  <UtensilsCrossed className="h-5 w-5" />
                  <span>
                    FOODIE<span className="text-text-primary">SHARE</span>
                  </span>
                </Link>
                <button onClick={toggleSidebar} className="p-2">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-2">
                <NavLink
                  href="/"
                  active={pathname === "/"}
                  onClick={toggleSidebar}
                >
                  Home
                </NavLink>
                <NavLink
                  href="/recipes"
                  active={pathname?.startsWith("/recipes")}
                  onClick={toggleSidebar}
                >
                  Recipes
                </NavLink>
                <NavLink
                  href="/add-recipe"
                  active={pathname === "/add-recipe"}
                  onClick={toggleSidebar}
                >
                  Add Recipe
                </NavLink>
                <NavLink
                  href="/my-collection"
                  active={pathname === "/my-collection"}
                  onClick={toggleSidebar}
                >
                  My Collection
                </NavLink>
              </nav>
              <div className="mt-auto pt-4">
                <Button
                  size="sm"
                  className="w-full bg-black text-white border hover:bg-gray-900"
                >
                  Sign in
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
