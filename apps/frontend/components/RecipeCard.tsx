import React, { useState } from "react";
import Link from "next/link";

import { CATEGORY_DISPLAY_NAMES } from "@/lib/constants";
import Favorite from "@/components/ui/favorite";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import { deleteRecipe } from "@/services/recipeService";

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
  onRecipeDeleted?: (recipeId: string) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onRecipeDeleted
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const author = recipe.author || recipe.user;
  const averageRating = recipe.avgRating ? recipe.avgRating.toFixed(1) : "-";

  const { favoriteRecipes, favoriteCountDict, toggleFavorite } = useFavorites();
  const { user, isAuthenticated } = useAuth();
  const isFavorited = favoriteRecipes.find((r) => r.id === String(recipe.id)) ? true : false;
  
  // Check if current user is the author of this recipe
  const isAuthor = isAuthenticated && user && author && (user.id === author.id || user.id === recipe.userId);

  const handleDeleteRecipe = async () => {
    if (!isAuthor) return;
    
    setIsDeleting(true);
    try {
      await deleteRecipe(recipe.id);
      onRecipeDeleted?.(recipe.id);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Failed to delete recipe:', error);
      alert('Failed to delete recipe. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

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
                    const target = e.currentTarget as HTMLImageElement;
                    target.src = '/default-recipe-clean.svg';
                  }}
                />
              ) : (
                <img
                  src="/default-recipe-clean.svg"
                  alt="Default recipe"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ minHeight: "120px", maxHeight: "180px" }}
                />
              )}
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
                    ({recipe.totalRating || 0})
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
          toggleFavorite(recipe.id);
        }}
      >
        <Favorite
          isFavorited={isFavorited}
          recipe={recipe}
          toggleFavorite={toggleFavorite}
          isSmall={true}
        />
        <span className="text-xs text-gray-500">{favoriteCountDict[recipe.id]}</span>
      </div>

      {/* Edit and Delete buttons for authors only */}
      {isAuthor && (
        <div className="absolute top-2 right-2 z-10 flex gap-1">
          <Link
            href={`/recipes/${recipe.id}/edit`}
            className="bg-white/90 hover:bg-white text-gray-700 rounded-full p-1.5 shadow-sm transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="m18.5 2.5 a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowDeleteConfirm(true);
            }}
            className="bg-white/90 hover:bg-white text-red-600 rounded-full p-1.5 shadow-sm transition-colors"
            disabled={isDeleting}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3,6 5,6 21,6"></polyline>
              <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
            </svg>
          </button>
        </div>
      )}

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Delete Recipe</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete "{recipe.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteRecipe}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
