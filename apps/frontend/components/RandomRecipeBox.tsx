"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getRandomRecipe } from "@/services/recipeService";
import { Recipe } from "@/types";
import { Card } from "@/components/ui/card";
import {
  Soup,
  User,
  Clock,
  ChefHat,
  Star,
  HandPlatter,
  Heart,
  X,
  Shuffle,
  Sparkles,
} from "lucide-react";
import {
  GiTreasureMap,
  GiOpenTreasureChest,
} from "react-icons/gi";

import "@/styles/randomRecipe.css";

// Extended Recipe type for API response
interface ApiRecipe extends Omit<Recipe, 'cookTime'> {
  cookingTime: number; // API uses cookingTime instead of cookTime
  author?: {
    id: string;
    email: string;
    username: string;
    avatar?: string;
  };
  avgRating?: number;
}

// Star Icon component matching your other card
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

const RandomRecipeBox = () => {
  const [isOpening, setIsOpening] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<ApiRecipe | null>(null);
  const [showRecipe, setShowRecipe] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showChestRays, setShowChestRays] = useState(false);
  const [chestStage, setChestStage] = useState(0); // 0: closed, 1: opening, 2: open

  // Show tooltip after some time if user hasn't interacted
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!selectedRecipe) {
        setTooltipVisible(true);
        setTimeout(() => setTooltipVisible(false), 3000);
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, [selectedRecipe]);

  const handleBoxClick = async () => {
    if (isOpening) return;

    setIsOpening(true);
    setShowRecipe(false);
    setIsBookmarked(false);

    // Start chest opening animation
    setChestStage(1); // Start opening

    // Show the magical rays
    setTimeout(() => {
      setShowChestRays(true);
    }, 100);

    // Hide current recipe during animation
    if (selectedRecipe) {
      setTimeout(() => setSelectedRecipe(null), 100);
    }

    // After initial animation, show fully open chest
    setTimeout(() => {
      setChestStage(2); // Fully open
    }, 800);

    // Fetch random recipe from API and finish animation
    setTimeout(async () => {
      try {
        const randomRecipe = await getRandomRecipe();
        setSelectedRecipe(randomRecipe);
        
        // Show recipe with animation
        setTimeout(() => {
          setShowRecipe(true);

          // Reset chest after recipe shows
          setTimeout(() => {
            setChestStage(0);
            setShowChestRays(false);
          }, 300);
        }, 200);
      } catch (error) {
        console.error('Error fetching random recipe:', error);
        // Handle error - maybe show a fallback or error message
      } finally {
        setIsOpening(false);
      }
    }, 1200);
  };

  // Get recipe author and rating data from API response
  const getRecipeData = (recipe: ApiRecipe) => {
    // The API response should already include author and avgRating
    const author = recipe.author;
    const averageRating = recipe.avgRating ? recipe.avgRating.toFixed(1) : "-";
    
    // For now, we don't have total ratings count in the API response
    // You may want to add this to the backend later
    const totalRatings = 0;

    return { author, averageRating, totalRatings };
  };

  // Format category similar to recipe detail page
  const formatCategory = (category: string) => {
    if (category.includes("Dish")) return category.replace("Dish", " Dish");
    return category;
  };

  // Auto-close card when navigating to recipe
  const handleViewRecipe = () => {
    setShowRecipe(false);
    setTimeout(() => setSelectedRecipe(null), 200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {tooltipVisible && (
        <div
          className="absolute bottom-20 right-0 bg-gray-900/90 backdrop-blur-sm text-white p-3 rounded-lg w-52 shadow-xl
                     animate-fade-in border border-gray-700"
        >
          <p className="text-xs">🎲 Discover a surprise recipe!</p>
          <div
            className="absolute -bottom-2 right-6 w-0 h-0 
                         border-l-[6px] border-l-transparent 
                         border-t-[6px] border-t-gray-900/90 
                         border-r-[6px] border-r-transparent"
          />
        </div>
      )}

      {/* Enhanced Random Recipe Button */}
      <div
        onClick={handleBoxClick}
        className="relative cursor-pointer group mb-4"
      >
        {/* Magical rays when opening */}
        {showChestRays && (
          <div className="absolute inset-[-15px] z-[-1]">
            <div className="w-full h-full animate-rays">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-t from-amber-400 to-amber-300/0"
                  style={{
                    height: "80px",
                    width: "6px",
                    transformOrigin: "bottom center",
                    transform: `rotate(${i * 45}deg)`,
                    opacity: 0.8,
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}

        <div
          className={`
            relative w-16 h-16 flex items-center justify-center
            bg-gradient-to-br from-amber-500 to-orange-600
            rounded-full shadow-lg border-2 border-amber-300
            transition-all duration-200 transform
            ${
              isOpening
                ? "scale-110 animate-pulse"
                : "hover:scale-105 hover:shadow-xl"
            }
            overflow-hidden
          `}
        >
          {/* Background glow */}
          <div
            className={`
            absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300/60 to-amber-500/60
            blur-sm transition-opacity duration-300 
            ${isOpening ? "opacity-100" : "opacity-0 group-hover:opacity-70"}
          `}
          ></div>

          {/* Button content */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {chestStage === 0 && !isOpening && (
              <div className="flex items-center justify-center">
                <Shuffle className="text-white size-6 group-hover:animate-spin transition-transform duration-200" />
              </div>
            )}
            {(chestStage === 1 || isOpening) && (
              <div className="animate-spin">
                <Sparkles className="text-white size-6" />
              </div>
            )}
            {chestStage === 2 && (
              <div className="animate-bounce">
                <GiOpenTreasureChest className="text-white size-6" />
              </div>
            )}
          </div>

          {/* Sparkle effects */}
          {!isOpening && (
            <div className="absolute inset-0">
              <div className="absolute top-1 left-3 size-0.5 bg-yellow-200 rounded-full animate-sparkle"></div>
              <div
                className="absolute top-3 right-2 size-0.5 bg-yellow-200 rounded-full animate-sparkle"
                style={{ animationDelay: "0.3s" }}
              ></div>
              <div
                className="absolute bottom-2 left-2 size-0.5 bg-yellow-200 rounded-full animate-sparkle"
                style={{ animationDelay: "0.6s" }}
              ></div>
              <div
                className="absolute bottom-3 right-3 size-0.5 bg-yellow-200 rounded-full animate-sparkle"
                style={{ animationDelay: "0.9s" }}
              ></div>
            </div>
          )}
        </div>

        {/* Button label */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-xs font-medium text-gray-700 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm border border-gray-200">
            Random Recipe
          </span>
        </div>
      </div>

      {/* Enhanced Recipe Card with Better Background */}
      {selectedRecipe && (
        <div
          className={`
            absolute bottom-24 right-0 transition-all duration-400 ease-out
            ${
              showRecipe
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-95"
            }
          `}
        >
          <Card className="w-80 bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-sm shadow-xl border border-gray-200/50 overflow-hidden rounded-xl group">
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowRecipe(false);
                setTimeout(() => setSelectedRecipe(null), 200);
              }}
              className="absolute top-3 right-3 z-20 w-7 h-7 bg-gray-900/20 backdrop-blur-sm
                       hover:bg-gray-900/40 rounded-full flex items-center justify-center text-white
                       transition-all duration-200 hover:scale-110 border border-white/20"
            >
              <X size={14} />
            </button>

            {/* Recipe Image */}
            <div className="relative h-36 overflow-hidden bg-gray-100">
              {selectedRecipe.image ? (
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 bg-gray-100">
                  <Soup size={24} />
                  <span className="ml-2">No Image</span>
                </div>
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Discovery badge */}
              <div className="absolute top-3 left-3 z-30 animate-fade-in-with-bounce">
                <div className="bg-amber-600/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg border border-amber-400/30">
                  <GiTreasureMap className="text-amber-100 size-3.5" />
                </div>
              </div>

              {/* Difficulty badge */}
              <div className="absolute top-3 right-12 z-30 animate-slide-in-right">
                <span
                  className={`
                  px-2 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm border border-white/20
                  ${
                    selectedRecipe.difficulty === "Easy"
                      ? "bg-emerald-500/80"
                      : selectedRecipe.difficulty === "Medium"
                      ? "bg-amber-500/80"
                      : "bg-rose-500/80"
                  }
                `}
                >
                  {selectedRecipe.difficulty}
                </span>
              </div>

              {/* Bookmark button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsBookmarked(!isBookmarked);
                }}
                className="absolute bottom-3 right-3 z-30 w-7 h-7 bg-white/20 backdrop-blur-sm
                         hover:bg-white/30 rounded-full flex items-center justify-center
                         transition-all duration-200 border border-white/20"
              >
                <Heart
                  size={14}
                  className={`transition-all duration-200 ${
                    isBookmarked ? "text-red-500 fill-red-500" : "text-white"
                  }`}
                />
              </button>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3 z-30">
                <h3 className="text-lg font-bold text-white leading-tight animate-title-reveal line-clamp-1">
                  {selectedRecipe.title}
                </h3>
              </div>
            </div>

            {/* Enhanced Recipe Content */}
            <div className="p-5 bg-gradient-to-b from-white via-white to-gray-50/50 backdrop-blur-sm">
              {/* Description with enhanced styling */}
              <div className="mb-4">
                <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed animate-text-reveal font-medium">
                  {selectedRecipe.description}
                </p>
              </div>

              {/* Author and Rating Section with improved layout */}
              {(() => {
                const { author, averageRating, totalRatings } =
                  getRecipeData(selectedRecipe);
                return (
                  <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 animate-fade-in-delay">
                    {/* Enhanced Author info */}
                    <div className="flex items-center space-x-2">
                      {author && author.avatar ? (
                        <div className="relative">
                          <img
                            src={author.avatar}
                            alt={author.username}
                            className="w-7 h-7 rounded-full ring-2 ring-amber-200 object-cover"
                          />
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center ring-2 ring-gray-200">
                          <User size={12} className="text-gray-500" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-gray-700">
                          {author ? author.username : "Unknown Chef"}
                        </span>
                        <span className="text-xs text-gray-500">
                          Recipe Creator
                        </span>
                      </div>
                    </div>

                    {/* Enhanced Rating display */}
                    <div className="flex items-center space-x-1 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                      <StarIcon className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-bold text-gray-800">
                        {averageRating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({totalRatings})
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Enhanced Recipe Stats with card-like design */}
              <div className="grid grid-cols-2 gap-2 mb-4 animate-fade-in-delay">
                {/* Time & Servings */}
                <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <Clock size={12} className="text-blue-500" />
                    <span className="text-xs font-medium text-gray-700">
                      {selectedRecipe.prepTime + selectedRecipe.cookingTime}m
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <HandPlatter size={12} className="text-green-500" />
                    <span className="text-xs font-medium text-gray-700">
                      {selectedRecipe.servings}
                    </span>
                  </div>
                </div>

                {/* Category spans both columns */}
                <div className="col-span-2 flex items-center justify-center bg-purple-50 px-3 py-2 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <Soup size={12} className="text-purple-500" />
                    <span className="text-xs font-medium text-gray-700">
                      {formatCategory(selectedRecipe.category)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced Ingredients Preview */}
              {selectedRecipe.ingredients &&
                selectedRecipe.ingredients.length > 0 && (
                  <div className="mb-3 animate-fade-in-delay">
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded font-medium">
                        {selectedRecipe.ingredients.length} ingredients:
                      </span>
                      {selectedRecipe.ingredients
                        .slice(0, 3)
                        .map((ingredient, index) => (
                          <span
                            key={index}
                            className="text-xs bg-amber-50 text-gray-600 px-2 py-1 rounded"
                          >
                            {ingredient.name}
                          </span>
                        ))}
                      {selectedRecipe.ingredients.length > 3 && (
                        <span className="text-xs text-gray-400">
                          +{selectedRecipe.ingredients.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

              {/* Enhanced Action Button */}
              <div className="animate-button-reveal">
                <Link
                  href={`/recipes/${selectedRecipe.id}`}
                  className="block"
                  onClick={handleViewRecipe}
                >
                  <button className="group relative w-full bg-gradient-to-r from-amber-500 via-amber-500 to-orange-500 hover:from-amber-600 hover:via-amber-600 hover:to-orange-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/25 active:scale-[0.98] transform overflow-hidden">
                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                    {/* Button content */}
                    <div className="relative flex items-center justify-center space-x-2">
                      <span>View Full Recipe</span>
                      <svg
                        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RandomRecipeBox;
