"use client";
import { useState, useEffect } from "react";
import { Category } from "@/types";
import { recipes } from "@/mocks/recipes";
import { RecipeCard } from "@/components/RecipeCard";
import { Pagination } from "@/components/Pagination";
import {
  CATEGORY_DISPLAY_NAMES,
  RECIPE_CATEGORIES,
  PAGINATION_DEFAULTS,
} from "@/lib/constants";
import { favorites } from "@/mocks/favorites";
import { RecipeFilters } from "@/components/RecipeFilters";
import { ratings } from "@/mocks/ratings";

const categories = RECIPE_CATEGORIES;
const maxCookTime = Math.max(...recipes.map((r) => r.cookTime));
const maxPrepTime = Math.max(...recipes.map((r) => r.prepTime));
const defaultFilters = {
  minCookTime: 0,
  maxCookTime: maxCookTime,
  minPrepTime: 0,
  maxPrepTime: maxPrepTime,
  difficulty: [] as string[],
  rating: [] as number[],
  sortBy: "Star",
  sortOrder: "desc" as "desc" | "asc",
};

export default function RecipesPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(
    "All"
  );
  const [currentPage, setCurrentPage] = useState(
    PAGINATION_DEFAULTS.DEFAULT_PAGE
  );
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    // Giả lập userId = 1
    return favorites.filter((f) => f.userId === 1).map((f) => f.recipeId);
  });
  const [filters, setFilters] = useState({ ...defaultFilters });
  const PAGE_SIZE = PAGINATION_DEFAULTS.PAGE_SIZE;

  // Tính rating trung bình cho mỗi recipe
  const getAvgRating = (recipeId: number) => {
    const recipeRatings = ratings.filter((r) => r.recipeId === recipeId);
    if (recipeRatings.length === 0) return 0;
    return (
      recipeRatings.reduce((sum, r) => sum + r.score, 0) / recipeRatings.length
    );
  };

  // Lọc theo category và các filter
  const filteredRecipes = recipes
    .filter(
      (recipe) =>
        selectedCategory === "All" || recipe.category === selectedCategory
    )
    .filter(
      (recipe) =>
        recipe.cookTime >= filters.minCookTime &&
        recipe.cookTime <= filters.maxCookTime &&
        recipe.prepTime >= filters.minPrepTime &&
        recipe.prepTime <= filters.maxPrepTime
    )
    .filter(
      (recipe) =>
        filters.difficulty.length === 0 ||
        filters.difficulty.includes(recipe.difficulty)
    )
    .filter((recipe) => {
      const avgRating = getAvgRating(recipe.id);
      return (
        filters.rating.length === 0 ||
        filters.rating.some((r) => (r === 0 ? avgRating < 1 : avgRating >= r))
      );
    });

  // Sắp xếp công thức theo tiêu chí đã chọn
  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    if (filters.sortBy === "Star")
      return getAvgRating(b.id) - getAvgRating(a.id);
    if (filters.sortBy === "Time")
      return a.cookTime + a.prepTime - (b.cookTime + b.prepTime);
    if (filters.sortBy === "Title") return a.title.localeCompare(b.title);
    return 0;
  });

  // Tính toán phân trang
  const totalPages = Math.ceil(sortedRecipes.length / PAGE_SIZE);
  const paginatedRecipes = sortedRecipes.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  {
    /* Modal filter cho mobile: hiển thị dưới banner */
  }
  {
    showFilter && (
      <div className="block md:hidden w-full px-4 mt-4">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <RecipeFilters
            filters={filters}
            maxCookTime={maxCookTime}
            maxPrepTime={maxPrepTime}
            onChange={(update) =>
              setFilters((prev) => ({ ...prev, ...update }))
            }
            onClear={() => setFilters({ ...defaultFilters })}
          />
          <button
            onClick={() => setShowFilter(false)}
            className="mt-4 w-full bg-orange-400 text-white py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Xử lý toggle favorite
  const toggleFavorite = (recipeId: number) => {
    setFavoriteIds((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  return (
    <main className="w-full min-h-screen bg-white">
      <div className="relative inline-block group">
        <h1 className="text-3xl font-bold mb-8 px-8 pt-8">Recipes List</h1>
      </div>
      {showFilter && (
        <div className="block md:hidden w-full px-4 mb-4">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <RecipeFilters
              filters={filters}
              maxCookTime={maxCookTime}
              maxPrepTime={maxPrepTime}
              onChange={(update) =>
                setFilters((prev) => ({ ...prev, ...update }))
              }
              onClear={() => setFilters({ ...defaultFilters })}
            />
            <button
              onClick={() => setShowFilter(false)}
              className="mt-4 w-full bg-orange-400 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <img
        src="/recipe_list_banner.jpg"
        alt="Recipe list banner"
        className="w-full h-64 object-cover mb-6 rounded-xl"
      />
      {/* Icon filter chỉ hiện trên mobile */}
      <button
        className="block md:hidden fixed bottom-6 right-6 z-50 bg-orange-400 text-white p-3 rounded-full shadow-lg"
        onClick={() => setShowFilter(true)}
        aria-label="Open filters"
      >
        {/* Simple SVG filter icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 017 17V13.414a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z"
          />
        </svg>
      </button>

      {/* Modal filter cho mobile */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-end">
          <div className="w-full bg-white rounded-t-xl p-4">
            <RecipeFilters
              filters={filters}
              maxCookTime={maxCookTime}
              maxPrepTime={maxPrepTime}
              onChange={(update) =>
                setFilters((prev) => ({ ...prev, ...update }))
              }
              onClear={() => setFilters({ ...defaultFilters })}
            />
            <button
              onClick={() => setShowFilter(false)}
              className="mt-4 w-full bg-orange-400 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row w-full">
        {/* RecipeFilters sidebar chỉ hiện trên desktop */}
        <aside className="hidden md:block w-full md:w-1/5 md:max-w-xs mb-6 md:mb-0 md:mr-8 px-4">
          <RecipeFilters
            filters={filters}
            maxCookTime={maxCookTime}
            maxPrepTime={maxPrepTime}
            onChange={(update) =>
              setFilters((prev) => ({ ...prev, ...update }))
            }
            onClear={() => setFilters({ ...defaultFilters })}
          />
        </aside>
        {/* Content: chiếm 100% trên mobile, 80% trên laptop */}
        <div className="w-full md:flex-1 md:px-4">
          {/* Category filter */}
          <div className="mt-6">
            <h2 className="font-bold mb-2 text-lg">Category</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {["All", ...categories].map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    className={`px-4 py-2 rounded-full border text-base font-medium transition-colors tracking-wide ${
                      isSelected
                        ? "bg-orange-400 text-white"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={() => setSelectedCategory(cat as Category | "All")}
                  >
                    {cat === "All"
                      ? "All"
                      : CATEGORY_DISPLAY_NAMES[cat as Category]}
                  </button>
                );
              })}
            </div>
          </div>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {paginatedRecipes.length === 0 ? (
              <div className="col-span-4 text-gray-500">No recipes found.</div>
            ) : (
              paginatedRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isFavorited={favoriteIds.includes(recipe.id)}
                  onToggleFavorite={() => toggleFavorite(recipe.id)}
                />
              ))
            )}
          </section>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </main>
  );
}
