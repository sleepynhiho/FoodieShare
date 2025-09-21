import React from "react";
import { useState } from "react";
import Link from "next/link";
import { Recipe } from "@/types/recipe";

import { CATEGORY_DISPLAY_NAMES } from "@/lib/constants";
import Favorite from "@/components/ui/favorite";
import { useFavorites } from "@/context/FavoritesContext";

export const StarIcon = ({ className = "w-4 h-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
    className={className}
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
  </svg>
);

interface RecipeCardProps {
  recipe: any; // Using any for now since the API response might differ from Recipe type
  isFavorited?: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  isFavorited = false
}) => {
  const author = recipe.author;
  const averageRating = recipe.avgRating ? recipe.avgRating.toFixed(1) : "-";

  const { toggleFavorite, favoriteCountDict } = useFavorites()
  const getFavoriteCount = () => {
    if (!favoriteCountDict[recipe.id])
      favoriteCountDict[recipe.id] = 0
    return favoriteCountDict[recipe.id]
  }

  return (
    <div className="relative">
      <Link href={`/recipes/${recipe.id}`}>
        <div className="block group cursor-pointer">
          <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
            {/* Fixed aspect ratio and min/max height for image area */}
            <div className="relative w-full aspect-[4/3] min-h-[120px] max-h-[180px] bg-gray-100">
              {recipe.image ? (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
                  style={{ minHeight: "120px", maxHeight: "180px" }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget
                      .nextElementSibling as HTMLElement | null;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
              ) : null}
              {/* Fallback for missing or error image */}
              <div
                className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100"
                style={{
                  display: recipe.image ? "none" : "flex",
                  minHeight: "120px",
                  maxHeight: "180px",
                }}
              >
                No Image
              </div>
            </div>
            <div className="p-4 flex flex-col h-[180px]">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-base font-semibold truncate">
                  {recipe.title}
                </h2>
                {/* Category badge */}
                {recipe.category && (
                  <span className="px-1 py-0.3 rounded-sm text-gray-700 font-normal text-[10px] bg-[#ffe4b5]">
                    {CATEGORY_DISPLAY_NAMES[recipe.category as keyof typeof CATEGORY_DISPLAY_NAMES] || recipe.category}
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-500 mb-2 line-clamp-2 h-[40px]">
                {recipe.description}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>⏱ {(recipe.prepTime || 0) + (recipe.cookingTime || 0)} min</span>
                <span className="flex items-center">
                  {author && (
                    <img
                      src={author.avatar || "/avatar.jpg"}
                      alt={author.username}
                      className="w-5 h-5 rounded-full mr-2 inline-block"
                    />
                  )}
                  {author ? author.username : "Unknown"}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="flex items-center gap-1 text-[#ffa319]">
                  <StarIcon />
                  <span className="text-sm">{averageRating}</span>
                  <span className="flex items-center text-xs text-gray-500 h-full">
                    ({recipe.ratingCount || 0})
                  </span>
                </span>
                <div className="w-[30px]"></div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      {/* Favorite button and count positioned absolutely */}
      <div
        className="absolute bottom-[34px] right-4 z-10 flex items-center gap-1"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          toggleFavorite(1, recipe.id);
        }}
      >
        <Favorite
          isFavorited={isFavorited}
          recipeId={recipe.id}
          toggleFavorite={toggleFavorite}
          isSmall={true}
        />
        <span className="text-xs text-gray-500">({getFavoriteCount()})</span>
      </div>
    </div>
  );
};
