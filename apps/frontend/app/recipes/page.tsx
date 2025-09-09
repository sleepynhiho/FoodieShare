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
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showOrderDropdown, setShowOrderDropdown] = useState(false);
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
      <img
        src="/recipe_list_banner.webp"
        alt="Recipe list banner"
        className="w-full h-64 object-cover mb-5 rounded-xl object-[70%_70%] md:object-center"
      />

      <div className="w-full flex justify-center items-center">
        <h1 className="text-4xl font-bold mb-8 px-8 pt-8 text-center">
          What to <span style={{ color: "#ffa319" }}>Cook</span>?
        </h1>
      </div>
      <div className="mt-3 mb-10 flex flex-col items-center w-full">
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {["All", ...categories].map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                className={`px-5 py-1.5 rounded-lg border text-base font-normal transition-colors tracking-wide ${
                  isSelected
                    ? "bg-[#000000] text-white"
                    : "bg-[#dde1e4] text-black"
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

      <div className="flex flex-col md:flex-row">
        <aside className="w-1/5 md:max-w-xs md:mb-0 md:mr-8 mb-6 px-4">
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
        <div className=" md:flex-1 md:px-4">
          {/* Sort UI */}
          <div className="flex gap-4 items-end flex-wrap md:flex-nowrap mb-4">
            <div>
              <div className="relative inline-block w-full">
                <button
                  type="button"
                  className="w-full flex justify-between items-center px-5 py-2 rounded-full border bg-white text-base font-medium shadow-sm hover:bg-gray-50"
                  onClick={() => setShowSortDropdown((prev) => !prev)}
                >
                  <span>Sort by: {filters.sortBy || "Star"}</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {showSortDropdown && (
                  <div className="absolute left-0 mt-1 w-full bg-white shadow-lg z-10 border">
                    {["Star", "Time", "Title"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`w-full text-left px-5 py-2 hover:bg-[#f1f1f1]  transition-colors ${
                          filters.sortBy === option
                            ? " text-black"
                            : "text-black"
                        }`}
                        onClick={() => {
                          setFilters((prev) => ({ ...prev, sortBy: option }));
                          setShowSortDropdown(false);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="relative inline-block w-full">
                <button
                  type="button"
                  className="w-full flex justify-between items-center px-5 py-2 rounded-full border bg-white text-base font-medium shadow-sm hover:bg-gray-50"
                  onClick={() => setShowOrderDropdown((prev) => !prev)}
                >
                  <span>
                    {filters.sortOrder === "asc" ? "Ascending" : "Descending"}
                  </span>
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {showOrderDropdown && (
                  <div className="absolute left-0 mt-1 w-full bg-white shadow-lg z-10 border">
                    {["asc", "desc"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`w-full text-left px-5 py-2 hover:bg-[#f1f1f1]  transition-colors ${
                          filters.sortOrder === option
                            ? " text-black"
                            : "text-black"
                        }`}
                        onClick={() => {
                          setFilters((prev) => ({
                            ...prev,
                            sortOrder: option as "asc" | "desc",
                          }));
                          setShowOrderDropdown(false);
                        }}
                      >
                        {option === "asc" ? "Ascending" : "Descending"}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <section className="grid grid-cols-[repeat(auto-fit,minmax(50px,260px))] gap-5">
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
