import React from "react";
import { Recipe } from "@/types/recipe";
import { users } from "@/mocks/users";
import { ratings } from "@/mocks/ratings";
import Favorite from "@/components/ui/favorite";

export const StarIcon = ({ className = "w-5 h-5" }) => (
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
  recipe: Recipe;
  isFavorited?: boolean;
  onToggleFavorite?: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  isFavorited = false,
  onToggleFavorite = () => {},
}) => {
  const author = users.find((u) => u.id === recipe.authorId);
  const recipeRatings = ratings.filter((r) => r.recipeId === recipe.id);
  const averageRating =
    recipeRatings.length > 0
      ? (
          recipeRatings.reduce((sum, r) => sum + r.score, 0) /
          recipeRatings.length
        ).toFixed(1)
      : "-";

  // Xử lý click card chuyển hướng
  const handleCardClick = () => {
    window.location.href = `/recipes/${recipe.id}`;
  };

  return (
    <div className="block group cursor-pointer" onClick={handleCardClick}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden [min-height:100px][max-height:370px]">
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
        <div className="p-4 flex flex-col h-[180px]">
          <h2 className="text-lg font-semibold mb-1 truncate">
            {recipe.title}
          </h2>
          <p className="text-sm text-gray-500 mb-2 line-clamp-2 h-[40px]">
            {recipe.description}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>⏱ {recipe.prepTime + recipe.cookTime} min</span>
            <span className="flex items-center">
              {author && author.avatar && (
                <img
                  src={author.avatar}
                  alt={author.username}
                  className="w-6 h-6 rounded-full mr-2 inline-block"
                />
              )}
              {author ? author.username : "Unknown"}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="flex items-center gap-1 text-yellow-500">
              <StarIcon /> {averageRating}
            </span>
            <div
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
            >
              <Favorite
                isFavorited={isFavorited}
                toggleFavorite={onToggleFavorite}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
