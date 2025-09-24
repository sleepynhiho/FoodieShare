"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
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
import { RecipeCard } from "@/components/RecipeCard";
import { Pagination } from "@/components/Pagination";
import {
  CATEGORY_DISPLAY_NAMES,
  RECIPE_CATEGORIES,
  PAGINATION_DEFAULTS,
} from "@/lib/constants";
import { RecipeFilters } from "@/components/RecipeFilters";
import { getRecipes } from "@/services/recipeService";
import { useFavorites } from "@/context/FavoritesContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const categories = RECIPE_CATEGORIES;

function RecipesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { setFavoriteCountDict } = useFavorites()

  // Get initial values from URL query parameters
  const getInitialCategory = () => searchParams.get('category') as Category | null || "All";
  const getInitialPage = () => parseInt(searchParams.get('page') || '1', 10);
  const getInitialSort = () => searchParams.get('sortBy') || "Star";
  const getInitialSortOrder = () => searchParams.get('sortOrder') as "asc" | "desc" || "desc";
  const getInitialDifficulty = () => {
    const diff = searchParams.get('difficulty');
    return diff ? diff.split(',').filter(Boolean) : [];
  };
  const getInitialRating = () => {
    const minRating = searchParams.get('minRating');
    return minRating ? parseFloat(minRating) : 0;
  };
  const getInitialCookTime = () => ({
    min: parseInt(searchParams.get('minCookTime') || '0', 10),
    max: parseInt(searchParams.get('maxCookTime') || '180', 10)
  });
  const getInitialPrepTime = () => ({
    min: parseInt(searchParams.get('minPrepTime') || '0', 10),
    max: parseInt(searchParams.get('maxPrepTime') || '120', 10)
  });

  // State management with URL-based initial values
  const [ recipes, setRecipes ] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalRecipes, setTotalRecipes] = useState(0);

  // Icons for each category
  const categoryIcons: Record<string, React.ReactNode> = {
    MainDish: <Utensils size={20} strokeWidth={1} color="#ffa319" className="inline-block mr-2" />,
    SideDish: <Sandwich size={20} strokeWidth={1} color="#ffa319" className="inline-block mr-2" />,
    Dessert: <CakeSlice size={20} strokeWidth={1} color="#ffa319" className="inline-block mr-2" />,
    Soup: <Soup size={20} strokeWidth={1} color="#ffa319" className="inline-block mr-2" />,
    Salad: <Salad size={20} strokeWidth={1} color="#ffa319" className="inline-block mr-2" />,
    Appetizer: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="inline-block mr-2">
        <circle cx="10" cy="10" r="6" stroke="#ffa319" strokeWidth="1" fill="none" />
        <circle cx="10" cy="10" r="2" stroke="#ffa319" strokeWidth="2" fill="none" />
      </svg>
    ),
    Beverage: <Coffee size={20} strokeWidth={1} color="#ffa319" className="inline-block mr-2" />,
  };

  // UI State with URL-based initialization
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(getInitialCategory());
  const [currentPage, setCurrentPage] = useState(getInitialPage());
  const [filters, setFilters] = useState({
    minCookTime: getInitialCookTime().min,
    maxCookTime: getInitialCookTime().max,
    minPrepTime: getInitialPrepTime().min,
    maxPrepTime: getInitialPrepTime().max,
    difficulty: getInitialDifficulty(),
    minRating: getInitialRating(),
    sortBy: getInitialSort(),
    sortOrder: getInitialSortOrder(),
  });
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortBy, setSortBy] = useState(getInitialSort());
  const [sortOrder, setSortOrder] = useState(getInitialSortOrder());
  const [showOrderDropdown, setShowOrderDropdown] = useState(false);
  const PAGE_SIZE = PAGINATION_DEFAULTS.PAGE_SIZE;

  // Function to update URL with current filter state
  const updateURL = (updates: {
    category?: Category | "All";
    page?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    difficulty?: string[];
    minRating?: number;
    minCookTime?: number;
    maxCookTime?: number;
    minPrepTime?: number;
    maxPrepTime?: number;
  }) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Update or remove parameters based on values
    if (updates.category && updates.category !== "All") {
      params.set('category', updates.category);
    } else if (updates.category === "All") {
      params.delete('category');
    }
    
    if (updates.page && updates.page > 1) {
      params.set('page', updates.page.toString());
    } else if (updates.page === 1) {
      params.delete('page');
    }
    
    if (updates.sortBy && updates.sortBy !== "Star") {
      params.set('sortBy', updates.sortBy);
    } else if (updates.sortBy === "Star") {
      params.delete('sortBy');
    }
    
    if (updates.sortOrder && updates.sortOrder !== "desc") {
      params.set('sortOrder', updates.sortOrder);
    } else if (updates.sortOrder === "desc") {
      params.delete('sortOrder');
    }
    
    if (updates.difficulty && updates.difficulty.length > 0) {
      params.set('difficulty', updates.difficulty.join(','));
    } else if (updates.difficulty?.length === 0) {
      params.delete('difficulty');
    }
    
    if (updates.minRating !== undefined && updates.minRating > 0) {
      params.set('minRating', updates.minRating.toString());
    } else if (updates.minRating === 0) {
      params.delete('minRating');
    }
    
    if (updates.minCookTime !== undefined && updates.minCookTime > 0) {
      params.set('minCookTime', updates.minCookTime.toString());
    } else if (updates.minCookTime === 0) {
      params.delete('minCookTime');
    }
    
    if (updates.maxCookTime !== undefined && updates.maxCookTime < 180) {
      params.set('maxCookTime', updates.maxCookTime.toString());
    } else if (updates.maxCookTime === 180) {
      params.delete('maxCookTime');
    }
    
    if (updates.minPrepTime !== undefined && updates.minPrepTime > 0) {
      params.set('minPrepTime', updates.minPrepTime.toString());
    } else if (updates.minPrepTime === 0) {
      params.delete('minPrepTime');
    }
    
    if (updates.maxPrepTime !== undefined && updates.maxPrepTime < 120) {
      params.set('maxPrepTime', updates.maxPrepTime.toString());
    } else if (updates.maxPrepTime === 120) {
      params.delete('maxPrepTime');
    }
    
    // Update URL without page reload
    const newURL = `${pathname}${params.toString() ? '?' + params.toString() : ''}`;
    router.replace(newURL);
  };

  // Load recipes from API
  const loadRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params: any = {
        page: currentPage,
        limit: PAGE_SIZE,
      };

      // Map frontend sort values to backend enum values
      if (filters.sortBy === "Star") {
        // Backend doesn't support avgRating sorting, default to createdAt
        params.sortBy = "createdAt";
      } else if (filters.sortBy === "Time") {
        params.sortBy = "cookingTime";
      } else if (filters.sortBy === "Title") {
        params.sortBy = "title";
      } else {
        params.sortBy = "createdAt"; // fallback
      }
      
      params.sortOrder = filters.sortOrder;

      // Add category filter if selected
      if (selectedCategory !== "All") {
        params.category = selectedCategory;
      }

      // Add difficulty filter - backend expects single value, take first selected
      if (filters.difficulty.length > 0) {
        params.difficulty = filters.difficulty[0]; // Only send first difficulty
      }

      // Add time filters
      if (filters.minCookTime > 0) {
        params.minCookingTime = filters.minCookTime;
      }
      if (filters.maxCookTime < 180) {
        params.maxCookingTime = filters.maxCookTime;
      }
      if (filters.minPrepTime > 0) {
        params.minPrepTime = filters.minPrepTime;
      }
      if (filters.maxPrepTime < 120) {
        params.maxPrepTime = filters.maxPrepTime;
      }

      // Add rating filters
      if (filters.minRating > 0) {
        params.minRating = filters.minRating;
      }

      const response = await getRecipes(params);
      console.log('API Response:', response); // Debug log
      
      // Handle the response format from the API
      const recipes = response.recipes || response.data || [];
      const total = response.total || response.count || recipes.length;

      const recipeFavoriteCountDict: { [key: string]: number } = {};
      recipes.forEach((recipe: any) => { recipeFavoriteCountDict[String(recipe.id)] = recipe.favoritesCount || 0 })
      setFavoriteCountDict(recipeFavoriteCountDict)

      setRecipes(recipes);
      setTotalRecipes(total);
    } catch (err) {
      console.error('Error loading recipes:', err);
      setError('Failed to load recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load user favorites
  // const loadUserFavorites = async () => {
  //   try {
  //     const userFavorites = await getUserFavorites();
  //     const favoriteRecipeIds = userFavorites.map((fav: any) => fav.recipeId); // Keep as string
  //     setFavoriteIds(favoriteRecipeIds);
  //   } catch (err) {
  //     console.error('Error loading favorites:', err);
  //     // Fallback to localStorage or empty array
  //     const storedFavorites = localStorage.getItem(`favorites_user_1`);
  //     if (storedFavorites) {
  //       setFavoriteIds(JSON.parse(storedFavorites));
  //     }
  //   }
  // };

  // Effects
  useEffect(() => {
    loadRecipes();
  }, [currentPage, selectedCategory, filters.difficulty, filters.minRating, filters.sortBy, filters.sortOrder, filters.minCookTime, filters.maxCookTime, filters.minPrepTime, filters.maxPrepTime]);

  // useEffect(() => {
  //   loadUserFavorites();
  // }, []);

  // Sync URL parameters with state when URL changes
  useEffect(() => {
    setSelectedCategory(getInitialCategory());
    setCurrentPage(getInitialPage());
    setFilters({
      minCookTime: getInitialCookTime().min,
      maxCookTime: getInitialCookTime().max,
      minPrepTime: getInitialPrepTime().min,
      maxPrepTime: getInitialPrepTime().max,
      difficulty: getInitialDifficulty(),
      minRating: getInitialRating(),
      sortBy: getInitialSort(),
      sortOrder: getInitialSortOrder(),
    });
    setSortBy(getInitialSort());
    setSortOrder(getInitialSortOrder());
  }, [searchParams]);

  // Close sort dropdown when clicking outside
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

  // Calculate pagination
  const totalPages = Math.ceil(totalRecipes / PAGE_SIZE);

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
                onClick={() => {
                  const newCategory = cat as Category | "All";
                  setSelectedCategory(newCategory);
                  updateURL({ category: newCategory, page: 1 });
                  setCurrentPage(1);
                }}
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
            maxCookTime={180}
            maxPrepTime={120}
            onChange={(update) => {
              const newFilters = { ...filters, ...update };
              setFilters(newFilters);
              updateURL({
                difficulty: newFilters.difficulty,
                minRating: newFilters.minRating,
                minCookTime: newFilters.minCookTime,
                maxCookTime: newFilters.maxCookTime,
                minPrepTime: newFilters.minPrepTime,
                maxPrepTime: newFilters.maxPrepTime,
                page: 1
              });
              setCurrentPage(1);
            }}
            onClear={() => {
              const clearedFilters = {
                minCookTime: 0,
                maxCookTime: 180,
                minPrepTime: 0,
                maxPrepTime: 120,
                difficulty: [] as string[],
                minRating: 0,
                sortBy: "Star",
                sortOrder: "desc" as "desc" | "asc",
              };
              setFilters(clearedFilters);
              updateURL({
                difficulty: [],
                minRating: 0,
                minCookTime: 0,
                maxCookTime: 180,
                minPrepTime: 0,
                maxPrepTime: 120,
                sortBy: "Star",
                sortOrder: "desc",
                page: 1
              });
              setCurrentPage(1);
            }}
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
                      {filters.sortBy === "Star" ? "Rating" : filters.sortBy === "Time" ? "Cooking Time" : filters.sortBy === "Title" ? "Name" : filters.sortBy} (
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
                          label: "Rating (by date)", // Note: sorts by date since backend doesn't support avgRating
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
                          onClick={() => {
                            const newSortBy = option.key;
                            setFilters((prev) => ({ ...prev, sortBy: newSortBy }));
                            setSortBy(newSortBy);
                            updateURL({ sortBy: newSortBy, page: 1 });
                            setCurrentPage(1);
                          }}
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
                          onClick={() => {
                            const newSortOrder = option.key as "desc" | "asc";
                            setFilters((prev) => ({ ...prev, sortOrder: newSortOrder }));
                            setSortOrder(newSortOrder);
                            updateURL({ sortOrder: newSortOrder, page: 1 });
                            setCurrentPage(1);
                          }}
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
                        maxCookTime={180}
                        maxPrepTime={120}
                        onChange={(update) => {
                          const newFilters = { ...filters, ...update };
                          setFilters(newFilters);
                          updateURL({
                            difficulty: newFilters.difficulty,
                            minRating: newFilters.minRating,
                            minCookTime: newFilters.minCookTime,
                            maxCookTime: newFilters.maxCookTime,
                            minPrepTime: newFilters.minPrepTime,
                            maxPrepTime: newFilters.maxPrepTime,
                            page: 1
                          });
                          setCurrentPage(1);
                        }}
                        onClear={() => {
                          const clearedFilters = {
                            minCookTime: 0,
                            maxCookTime: 180,
                            minPrepTime: 0,
                            maxPrepTime: 120,
                            difficulty: [] as string[],
                            minRating: 0,
                            sortBy: "Star",
                            sortOrder: "desc" as "desc" | "asc",
                          };
                          setFilters(clearedFilters);
                          updateURL({
                            difficulty: [],
                            minRating: 0,
                            minCookTime: 0,
                            maxCookTime: 180,
                            minPrepTime: 0,
                            maxPrepTime: 120,
                            sortBy: "Star",
                            sortOrder: "desc",
                            page: 1
                          });
                          setCurrentPage(1);
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <section className="grid grid-cols-[repeat(auto-fit,minmax(50px,260px))] gap-5 justify-center md:justify-start">
            {loading ? (
              <div className="col-span-full text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                <p className="mt-2 text-gray-600">Loading recipes...</p>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-8">
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                  onClick={loadRecipes}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : recipes.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No recipes found for the selected criteria.</p>
              </div>
            ) : (
              recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onRecipeDeleted={(recipeId) => {
                    // Remove the deleted recipe from local state and reload
                    setRecipes(prev => prev.filter(r => r.id !== recipeId));
                    // Optionally reload the data to get accurate counts
                    loadRecipes();
                  }}
                />
              ))
            )}
          </section>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              updateURL({ page });
            }}
          />
        </div>
      </div>
    </main>
  );
}

export default function RecipesPage() {
  return (
    <Suspense fallback={<LoadingSpinner loading={true} />}>
      <RecipesContent />
    </Suspense>
  );
}
