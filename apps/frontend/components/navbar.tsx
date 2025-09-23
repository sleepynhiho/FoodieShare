"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  UtensilsCrossed, 
  Menu, 
  X, 
  ChevronDown,
  Utensils,
  Sandwich,
  CakeSlice,
  Soup,
  Salad,
  Coffee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserProfileButton } from "@/components/auth/UserProfileButton";
import { useAuth } from "@/context/AuthContext";
import { SearchButton } from "./SearchButton";
import { RECIPE_CATEGORIES, CATEGORY_DISPLAY_NAMES } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const { isAuthenticated } = useAuth();

  // isAuthenticated is now directly from context
  const isLoggedIn = isAuthenticated;

  const toggleSidebar = () => setOpen(!open);

  // Category icons mapping
  const categoryIcons: Record<string, React.ReactNode> = {
    MainDish: <Utensils className="h-4 w-4 text-orange-500" />,
    SideDish: <Sandwich className="h-4 w-4 text-orange-500" />,
    Dessert: <CakeSlice className="h-4 w-4 text-orange-500" />,
    Soup: <Soup className="h-4 w-4 text-orange-500" />,
    Salad: <Salad className="h-4 w-4 text-orange-500" />,
    Appetizer: <Coffee className="h-4 w-4 text-orange-500" />,
    Beverage: <Coffee className="h-4 w-4 text-orange-500" />,
  };

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
          {/* Category Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium uppercase text-gray-600 hover:text-black transition-all duration-200 group hover:bg-gray-50 rounded-md">
                Categories
                <ChevronDown className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="w-56 p-2 bg-white border border-gray-200 shadow-xl rounded-xl backdrop-blur-sm"
              sideOffset={8}
            >
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 py-1 mb-1">
                Browse by Category
              </div>
              {RECIPE_CATEGORIES.map((category) => (
                <DropdownMenuItem key={category} asChild className="p-0">
                  <Link 
                    href={`/recipes?category=${category}`}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 cursor-pointer group"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-200">
                      {categoryIcons[category]}
                    </span>
                    <span className="font-medium">{CATEGORY_DISPLAY_NAMES[category]}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
              <div className="border-t border-gray-100 mt-2 pt-2">
                <Link 
                  href="/recipes"
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group"
                >
                  <span className="group-hover:scale-110 transition-transform duration-200">
                    <UtensilsCrossed className="h-4 w-4" />
                  </span>
                  <span className="font-medium">View All Recipes</span>
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <NavLink href="/about" active={pathname === "/about"}>
            About
          </NavLink>
          <NavLink href="/collection" active={pathname === "/collection"}>
            Collection
          </NavLink>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Desktop: Sign in button or User Profile */}
          <SearchButton />
          {/* Add Recipe CTA for logged-in users */}
          {isLoggedIn && (
            <Link href="/add-recipe" className="hidden md:block">
              <Button
                size="sm"
                className="bg-orange-500 text-white hover:bg-orange-600 font-medium px-4"
              >
                + Add Recipe
              </Button>
            </Link>
          )}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <UserProfileButton />
            ) : (
              <Link href="/login">
                <Button
                  size="sm"
                  className="bg-black text-white border hover:bg-gray-900"
                >
                  Sign in
                </Button>
              </Link>
            )}
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
                {/* Categories submenu for mobile */}
                <div className="flex flex-col gap-1 pl-2 py-2">
                  <span className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-2 px-2">
                    Categories
                  </span>
                  {RECIPE_CATEGORIES.map((category) => (
                    <Link
                      key={category}
                      href={`/recipes?category=${category}`}
                      onClick={toggleSidebar}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors duration-200"
                    >
                      {categoryIcons[category]}
                      <span className="font-medium">{CATEGORY_DISPLAY_NAMES[category]}</span>
                    </Link>
                  ))}
                  <Link
                    href="/recipes"
                    onClick={toggleSidebar}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors duration-200 mt-1 border-t border-gray-100 pt-3"
                  >
                    <UtensilsCrossed className="h-4 w-4" />
                    <span className="font-medium">View All Recipes</span>
                  </Link>
                </div>
                <NavLink
                  href="/about"
                  active={pathname === "/about"}
                  onClick={toggleSidebar}
                >
                  About
                </NavLink>
                <NavLink
                  href="/collection"
                  active={pathname === "/collection"}
                  onClick={toggleSidebar}
                >
                  Collection
                </NavLink>
              </nav>
              <div className="mt-auto pt-4 space-y-3">
                {/* Add Recipe CTA for mobile */}
                {isLoggedIn && (
                  <Link href="/add-recipe" onClick={toggleSidebar}>
                    <Button
                      size="sm"
                      className="w-full bg-orange-500 text-white hover:bg-orange-600 font-medium"
                    >
                      + Add Recipe
                    </Button>
                  </Link>
                )}
                {isLoggedIn ? (
                  <UserProfileButton />
                ) : (
                  <Link href="/login">
                    <Button
                      size="sm"
                      className="w-full bg-black text-white border hover:bg-gray-900"
                    >
                      Sign in
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
