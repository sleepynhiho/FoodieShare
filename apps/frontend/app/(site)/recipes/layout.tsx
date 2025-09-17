"use client";

import { FavoritesProvider } from "@/context/FavoritesContext";

export default function RecipesLayout({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      {children}
    </FavoritesProvider>
  );
}
