"use client";
import { useState, useEffect } from "react";
import { Category } from "@/types";
import {
  Utensils,
  Sandwich,
  Salad,
  Soup,
  Coffee,
  CakeSlice,
  Star,
  Timer,
  AArrowDown,
  AArrowUp,
  CaseSensitive,
} from "lucide-react";
import { recipes } from "@/mocks/recipes";
import { favorites } from "@/mocks/favorites";
import { RecipeCard } from "@/components/RecipeCard";
import { Pagination } from "@/components/Pagination";
import {
  CATEGORY_DISPLAY_NAMES,
  RECIPE_CATEGORIES,
  PAGINATION_DEFAULTS,
} from "@/lib/constants";
import { RecipeFilters } from "@/components/RecipeFilters";
import { ratings } from "@/mocks/ratings";
import { useFavorites } from "@/context/FavoritesContext";

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
  // Icons for each category
  const categoryIcons: Record<string, React.ReactNode> = {
    MainDish: (
      <Utensils
        size={20}
        strokeWidth={1}
        color="#ffa319"
        className="inline-block mr-2"
      />
    ),
    SideDish: (
      <Sandwich
        size={20}
        strokeWidth={1}
        color="#ffa319"
        className="inline-block mr-2"
      />
    ),
    Dessert: (
      <CakeSlice
        size={20}
        strokeWidth={1}
        color="#ffa319"
        className="inline-block mr-2"
      />
    ),
    Soup: (
      <Soup
        size={20}
        strokeWidth={1}
        color="#ffa319"
        className="inline-block mr-2"
      />
    ),
    Salad: (
      <Salad
        size={20}
        strokeWidth={1}
        color="#ffa319"
        className="inline-block mr-2"
      />
    ),
    Appetizer: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="inline-block mr-2"
      >
        <circle
          cx="10"
          cy="10"
          r="6"
          stroke="#ffa319"
          strokeWidth="1"
          fill="none"
        />
        <circle
          cx="10"
          cy="10"
          r="2"
          stroke="#ffa319"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
    Beverage: (
      <Coffee
        size={20}
        strokeWidth={1}
        color="#ffa319"
        className="inline-block mr-2"
      />
    ),
  };
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(
    "All"
  );
  const [currentPage, setCurrentPage] = useState(
    PAGINATION_DEFAULTS.DEFAULT_PAGE
  );
  const [filters, setFilters] = useState({ ...defaultFilters });
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortBy, setSortBy] = useState("Star"); // hoặc lấy từ filters nếu bạn dùng object
  const [sortOrder, setSortOrder] = useState("desc"); // "desc" = High to Low, "asc" = Low to High
  const [showOrderDropdown, setShowOrderDropdown] = useState(false);
  const { favoriteIds, setFavoriteIds } = useFavorites()
  const PAGE_SIZE = PAGINATION_DEFAULTS.PAGE_SIZE;

  console.log(favoriteIds)

  // Check if localStorage has favorites
  useEffect(() => {
    const storedFavorites = localStorage.getItem(`favorites_user_${1}`);
    if (storedFavorites)
      setFavoriteIds(JSON.parse(storedFavorites))
    else 
      setFavoriteIds(
        favorites
          .filter((f) => f.userId === 1)
          .map((f) => f.recipeId)
      )
  }, [])

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
    let compare = 0;
    if (filters.sortBy === "Star") {
      compare = getAvgRating(b.id) - getAvgRating(a.id);
    } else if (filters.sortBy === "Time") {
      compare = a.cookTime + a.prepTime - (b.cookTime + b.prepTime);
    } else if (filters.sortBy === "Title") {
      compare = a.title.localeCompare(b.title);
    }
    // Nếu order là asc thì đảo ngược kết quả
    return filters.sortOrder === "asc" ? -compare : compare;
  });

  // Tính toán phân trang
  const totalPages = Math.ceil(sortedRecipes.length / PAGE_SIZE);
  const paginatedRecipes = sortedRecipes.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Đóng dropdown sort khi click ra ngoài
  useEffect(() => {
    if (!showSortDropdown) return;
    const handleClick = (e: MouseEvent) => {
      const dropdown = document.getElementById("sort-dropdown");
      if (dropdown && !dropdown.contains(e.target as Node)) {
        setShowSortDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showSortDropdown]);

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
                className={`px-5 py-1.5 rounded-lg  text-sm font-normal transition-colors tracking-wide flex items-center ${
                  isSelected
                    ? "bg-[#000000] text-white"
                    : "bg-[#eaeaea] text-black"
                }`}
                onClick={() => setSelectedCategory(cat as Category | "All")}
              >
                {cat !== "All" && categoryIcons[cat]}
                {cat === "All"
                  ? "All"
                  : CATEGORY_DISPLAY_NAMES[cat as Category]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <aside className="w-1/5 hidden md:block md:max-w-xs md:mb-0 md:mr-8 mb-6 px-4 ">
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
        <div className=" flex-1 md:px-4">
          {/* Sort UI */}
          <div className="flex gap-4 items-end flex-wrap md:flex-nowrap mb-4 justify-center md:justify-start">
            <div className="relative flex items-center">
              {/* Sort by */}
              <div className="inline-block w-full">
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center px-4 py-2 rounded-full border bg-white text-base font-normal shadow-sm hover:bg-gray-50"
                    onClick={() => setShowSortDropdown((prev) => !prev)}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-gray-500">Sort by :</span>
                      {filters.sortBy === "Star" ? "Rating" : filters.sortBy} (
                      {filters.sortOrder === "desc"
                        ? "High to Low"
                        : "Low to High"}
                      )
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
                  {showSortDropdown && (
                    <div
                      id="sort-dropdown"
                      className="absolute left-0 top-full mt-2 w-[270px] bg-white shadow-lg z-50 border rounded-xl p-2"
                    >
                      <div className="mt-2 mb-2 px-2 text-xs font-semibold text-gray-500">
                        SORT BY
                      </div>
                      {[
                        {
                          key: "Star",
                          label: "Rating",
                          icon: (
                            <Star size={18} className="text-[#ffa319] mr-2" />
                          ),
                        },
                        {
                          key: "Time",
                          label: "Cooking Time",
                          icon: (
                            <Timer size={18} className="text-[#ffa319] mr-2" />
                          ),
                        },
                        {
                          key: "Title",
                          label: "Name",
                          icon: (
                            <CaseSensitive
                              size={19}
                              className="text-[#ffa319] mr-2"
                            />
                          ),
                        },
                      ].map((option) => (
                        <button
                          key={option.key}
                          type="button"
                          className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#f1f1f1] transition-colors ${
                            filters.sortBy === option.key ? "bg-[#fff7e6]" : ""
                          }`}
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              sortBy: option.key,
                            }))
                          }
                        >
                          {option.icon}
                          <span>{option.label}</span>
                          {filters.sortBy === option.key && (
                            <span className="ml-auto">
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5 10.5L9 14.5L15 7.5"
                                  stroke="#ffa319"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          )}
                        </button>
                      ))}
                      <div className="mt-4 mb-2 px-2 text-xs font-semibold text-gray-500">
                        ORDER
                      </div>

                      {[
                        {
                          key: "desc",
                          label: "High to Low",
                          icon: (
                            <AArrowDown
                              size={19}
                              className="text-[#ffa319] mr-2 "
                            />
                          ),
                        },
                        {
                          key: "asc",
                          label: "Low to High",
                          icon: (
                            <AArrowUp
                              size={19}
                              className="text-[#ffa319] mr-2"
                            />
                          ),
                        },
                      ].map((option) => (
                        <button
                          key={option.key}
                          type="button"
                          className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#f1f1f1] transition-colors ${
                            filters.sortOrder === option.key
                              ? "bg-[#fff7e6]"
                              : ""
                          }`}
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              sortOrder: option.key as "desc" | "asc",
                            }))
                          }
                        >
                          {option.icon}
                          <span>{option.label}</span>
                          {filters.sortOrder === option.key && (
                            <span className="ml-auto">
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5 10.5L9 14.5L15 7.5"
                                  stroke="#ffa319"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Icon filter chỉ hiện trên mobile */}
              <div className="ml-2 md:hidden">
                <button
                  className="flex items-center px-3 py-2 rounded-full border bg-white shadow-sm"
                  onClick={() => setShowFilter((prev) => !prev)}
                  aria-label="Open filters"
                >
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 017 17V13.414a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z"
                    />
                  </svg>
                </button>
                {/* Modal filter dropdown cố định vị trí so với icon */}
                {showFilter && (
                  <>
                    {/* Overlay đen mờ phủ toàn màn hình, chỉ hiện trên mobile */}
                    <div className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"></div>
                    {/* Modal filter dropdown cố định vị trí so với icon */}
                    <div className="absolute right-0 top-full mt-2 z-50 w-[50vw] max-w-xs bg-white rounded-xl shadow-lg p-4 border flex flex-col overflow-auto">
                      <button
                        className="absolute top-3 right-3 text-gray-500 hover:text-black"
                        onClick={() => setShowFilter(false)}
                        aria-label="Đóng bộ lọc"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <h2 className="text-lg font-semibold mb-4">Filter</h2>
                      <RecipeFilters
                        filters={filters}
                        maxCookTime={maxCookTime}
                        maxPrepTime={maxPrepTime}
                        onChange={(update) =>
                          setFilters((prev) => ({ ...prev, ...update }))
                        }
                        onClear={() => setFilters({ ...defaultFilters })}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <section className="grid grid-cols-[repeat(auto-fit,minmax(50px,260px))] gap-5 justify-center md:justify-start">
            {paginatedRecipes.length === 0 ? (
              <div className="col-span-4 text-gray-500">No recipes found.</div>
            ) : (
              paginatedRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isFavorited={favoriteIds.includes(recipe.id)}
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
