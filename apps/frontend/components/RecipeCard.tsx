import React from "react";
import Link from "next/link";
import { Recipe } from "@/types/recipe";
import { users } from "@/mocks/users";
import { ratings } from "@/mocks/ratings";

interface RecipeCardProps {
  recipe: Recipe;
  isFavorited?: boolean;
  onToggleFavorite?: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  isFavorited,
  onToggleFavorite,
}) => {
  // Lấy thông tin author từ mock users
  const author = users.find((u) => u.id === recipe.authorId);
  // Tính average rating từ mock ratings
  const recipeRatings = ratings.filter((r) => r.recipeId === recipe.id);
  const averageRating =
    recipeRatings.length > 0
      ? (
          recipeRatings.reduce((sum, r) => sum + r.score, 0) /
          recipeRatings.length
        ).toFixed(1)
      : "-";

  return (
    <Link href={`/recipes/${recipe.id}`} className="block group">
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
        <div className="aspect-w-4 aspect-h-3 bg-gray-100">
          {recipe.image ? (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image
            </div>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-1 truncate">
            {recipe.title}
          </h2>
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">
            {recipe.description}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>⏱ {recipe.prepTime + recipe.cookTime} min</span>
            <span>👤 {author ? author.username : "Unknown"}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span>⭐ {averageRating}</span>
            <button
              className={
                isFavorited
                  ? "text-red-500"
                  : "text-gray-400 hover:text-red-500"
              }
              onClick={(e) => {
                e.preventDefault();
                onToggleFavorite && onToggleFavorite();
              }}
              aria-label={isFavorited ? "Unfavorite" : "Favorite"}
            >
              {isFavorited ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
