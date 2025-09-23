"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RecipeCard } from "@/components/RecipeCard";
import { RECIPE_CATEGORIES, CATEGORY_DISPLAY_NAMES } from "@/lib/constants";
import {
  getRecipes,
  getFeaturedRecipes,
  getLatestRecipes,
  getTrendingRecipes,
} from "@/services/recipeService";
import {
  getAppStats,
  getCategoryStats,
  getTopAuthors,
} from "@/services/statsService";
import {
  Utensils,
  Sandwich,
  Salad,
  Soup,
  Coffee,
  CakeSlice,
  Star,
  Users,
  BookOpen,
  Heart,
  ChefHat,
  Sparkles,
  ArrowRight,
  PenLine,
  PlusCircle,
  Plus,
  User,
  TrendingUp,
  Clock,
  Award,
  Flame,
} from "lucide-react";

export default function HomePage() {
  const [featuredRecipes, setFeaturedRecipes] = useState<any[]>([]);
  const [latestRecipes, setLatestRecipes] = useState<any[]>([]);
  const [trendingRecipes, setTrendingRecipes] = useState<any[]>([]);
  const [categoryStats, setCategoryStats] = useState<any[]>([]);
  const [topAuthors, setTopAuthors] = useState<any[]>([]);
  const [appStats, setAppStats] = useState({
    totalRecipes: 0,
    totalUsers: 0,
    totalRatings: 0,
    avgRating: "0.0",
    totalFavorites: 0,
  });
  const [loading, setLoading] = useState(true);

  // Category icons mapping
  const categoryIcons = {
    MainDish: <Utensils size={24} className="text-orange-500" />,
    SideDish: <Sandwich size={24} className="text-orange-500" />,
    Dessert: <CakeSlice size={24} className="text-orange-500" />,
    Soup: <Soup size={24} className="text-orange-500" />,
    Salad: <Salad size={24} className="text-orange-500" />,
    Appetizer: <Coffee size={24} className="text-orange-500" />,
    Beverage: <Coffee size={24} className="text-orange-500" />,
  };

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Load all data in parallel
        const [
          featuredData,
          latestData,
          trendingData,
          stats,
          catStats,
          topAuthorsData,
        ] = await Promise.all([
          // Featured recipes (top-rated)
          getFeaturedRecipes(6),
          // Latest recipes (most recent)
          getLatestRecipes(6),
          // Trending recipes (most favorited)
          getTrendingRecipes(6),
          // App statistics
          getAppStats(),
          // Category statistics
          getCategoryStats(),
          // Top authors
          getTopAuthors(4),
        ]);

        // Set recipes (no need to sort since they come sorted from backend)
        setFeaturedRecipes(featuredData.recipes || featuredData.data || []);
        setLatestRecipes(latestData.recipes || latestData.data || []);
        setTrendingRecipes(trendingData.recipes || trendingData.data || []);

        // Set app statistics
        setAppStats({
          totalRecipes: stats.totalRecipes,
          totalUsers: stats.totalUsers,
          totalRatings: stats.totalRatings,
          avgRating: stats.avgRating.toFixed(1),
          totalFavorites: stats.totalFavorites,
        });

        // Process category statistics
        const enrichedCategoryStats = catStats
          .filter((cat) => cat.count > 0)
          .map((cat) => ({
            name: cat.name,
            displayName:
              CATEGORY_DISPLAY_NAMES[
                cat.name as keyof typeof CATEGORY_DISPLAY_NAMES
              ] || cat.name,
            count: cat.count,
            icon: categoryIcons[cat.name as keyof typeof categoryIcons],
          }));
        setCategoryStats(enrichedCategoryStats);

        // Set top authors (already processed by backend)
        setTopAuthors(topAuthorsData);
      } catch (error) {
        console.error("Error loading data:", error);
        // Keep default values on error
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-8 sm:py-12 md:py-16 bg-cover bg-center bg-no-repeat flex justify-start rounded-[20px] overflow-hidden bg-white"
        style={{
          backgroundImage: `url('/banner.jpg')`,
          transform: "scaleX(-1)",
        }}
      >
        <div
          className="container mx-auto px-4 sm:px-6 md:px-10 text-start"
          style={{ transform: "scaleX(-1)" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-[650] text-black mb-4 leading-tight sm:leading-relaxed">
            Adventure <br className="hidden sm:block" />
            <span>of </span>
            <span className="text-text-primary">Delicacies</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 md:mb-16 md:max-w-md leading-relaxed">
            Explore delicious recipes, keep your favorites, and inspire others with your own creations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-start items-stretch sm:items-center w-full sm:w-auto">
            {/* Explore Recipes Button - Black with Chef Hat icon */}
            <Link href="/recipes" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="
                  w-full
                  bg-black hover:bg-neutral-800 text-white
                  flex items-center justify-between
                  rounded-[50px] px-4 py-3 sm:px-5 sm:py-3
                  text-base sm:text-lg
                  transition-all duration-200 shadow-md hover:shadow-lg
                "
              >
                <span className="pl-1 sm:pl-2">Explore Recipes</span>
                <div
                  className="
                    ml-3 sm:ml-4 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center
                    rounded-full bg-white shadow-inner
                  "
                >
                  <ChefHat size={16} className="text-black" />
                </div>
              </Button>
            </Link>

            {/* Add Your Recipe Button - White with Plus icon */}
            <Link href="/add-recipe" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="
                  w-full
                  bg-white hover:bg-neutral-100 text-black
                  flex items-center justify-between
                  rounded-[50px] px-4 py-3 sm:px-5 sm:py-3
                  text-base sm:text-lg
                  transition-all duration-200 shadow-md hover:shadow-lg
                "
              >
                <span className="pl-1 sm:pl-2">Add Your Recipe</span>
                <div
                  className="
                    ml-3 sm:ml-4 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center
                    rounded-full bg-neutral-100 shadow-inner
                  "
                >
                  <Plus size={16} className="text-black" />
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 sm:py-10 bg-gray-50 px-4 sm:px-6 md:px-10 rounded-[20px] mt-6 sm:mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <div className="bg-white p-3 rounded-full inline-flex">
                <User size={24} />
              </div>
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              User-Centered
            </h2>
            <p className="text-gray-600 max-w-[280px]">
              Your feedback shapes our platform, ensuring a seamless and
              satisfying culinary journey
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <div className="bg-white p-3 rounded-full inline-flex">
                <Sparkles size={24} />
              </div>
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Diverse Recipes
            </h2>
            <p className="text-gray-600 max-w-[280px]">
              We celebrate diverse culinary traditions from around the world,
              inspiring you today.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <div className="bg-white p-3 rounded-full inline-flex">
                <Heart size={24} />
              </div>
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Fun Community
            </h2>
            <p className="text-gray-600 max-w-[280px]">
              We foster a vibrant foodie community where joy comes with sharing
              recipes with us.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[650] text-black mb-3 sm:mb-4 leading-tight sm:leading-snug">
            Join our thriving{" "}
            <span className="text-text-primary">community</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Discover amazing statistics about our growing community of food
            enthusiasts
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          <div className="text-center p-4 sm:p-6">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="bg-orange-100 p-3 sm:p-4 rounded-full">
                <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-black mb-1 sm:mb-2">
              {appStats.totalRecipes}
            </div>
            <div className="text-sm sm:text-base text-gray-600">Recipes</div>
          </div>

          <div className="text-center p-4 sm:p-6">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="bg-blue-100 p-3 sm:p-4 rounded-full">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-black mb-1 sm:mb-2">
              {appStats.totalUsers}
            </div>
            <div className="text-sm sm:text-base text-gray-600">Chefs</div>
          </div>

          <div className="text-center p-4 sm:p-6">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="bg-yellow-100 p-3 sm:p-4 rounded-full">
                <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-black mb-1 sm:mb-2">
              {appStats.totalRatings}
            </div>
            <div className="text-sm sm:text-base text-gray-600">Reviews</div>
          </div>

          <div className="text-center p-4 sm:p-6">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="bg-red-100 p-3 sm:p-4 rounded-full">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-black mb-1 sm:mb-2">
              {appStats.totalFavorites}
            </div>
            <div className="text-sm sm:text-base text-gray-600">Favorites</div>
          </div>

          <div className="text-center p-4 sm:p-6 col-span-2 sm:col-span-1">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="bg-green-100 p-3 sm:p-4 rounded-full">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-black mb-1 sm:mb-2">
              {appStats.avgRating}
            </div>
            <div className="text-sm sm:text-base text-gray-600">Avg Rating</div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-10 bg-gray-50 rounded-[20px] my-6 sm:my-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[650] text-black mb-3 sm:mb-4 leading-tight sm:leading-snug">
            Explore <span className="text-text-primary">Categories</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Discover recipes organized by category, from appetizers to desserts
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
          {categoryStats.map((category) => (
            <Link
              key={category.name}
              href={`/recipes?category=${category.name}`}
              className="group"
            >
              <div className="bg-white rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="bg-orange-50 p-2 sm:p-3 rounded-full group-hover:bg-orange-100 transition-colors">
                    {category.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                  {category.displayName}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm">
                  {category.count} recipes
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <Link href="/recipes">
            <Button
              variant="outline"
              className="rounded-full px-6 sm:px-8 py-2 bg-white border-gray-200 hover:bg-gray-50 text-sm sm:text-base"
            >
              View All Recipes
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-16 px-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-[650] text-black mb-2 leading-snug">
              Featured <span className="text-text-primary">Recipes</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Top-rated recipes from our community
            </p>
          </div>
          <Link href="/recipes">
            <Button
              variant="outline"
              className="rounded-full px-6 py-2 bg-white border-gray-200 hover:bg-gray-50"
            >
              View All
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 animate-pulse rounded-xl h-64"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>

      {/* Latest Recipes Section */}
      <section className="py-16 px-10 bg-gray-50 rounded-[20px] my-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-[650] text-black mb-2 leading-snug">
              Latest <span className="text-text-primary">Recipes</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Fresh recipes just added to our collection
            </p>
          </div>
          <Link href="/recipes">
            <Button
              variant="outline"
              className="rounded-full px-6 py-2 bg-white border-gray-200 hover:bg-gray-50"
            >
              <Clock size={16} className="mr-2" />
              View All
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 animate-pulse rounded-xl h-64"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>

      {/* Trending Recipes Section */}
      <section className="py-16 px-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-[650] text-black mb-2 leading-snug">
              Trending <span className="text-text-primary">Recipes</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Most favorited recipes this month
            </p>
          </div>
          <Link href="/recipes">
            <Button
              variant="outline"
              className="rounded-full px-6 py-2 bg-white border-gray-200 hover:bg-gray-50"
            >
              <TrendingUp size={16} className="mr-2" />
              View All
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 animate-pulse rounded-xl h-64"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>

      {/* Top Authors Section */}
      <section className="py-16 px-10 bg-gray-50 rounded-[20px] my-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-[650] text-black mb-4 leading-snug">
            Top <span className="text-text-primary">Authors</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Meet our most active recipe creators and food enthusiasts
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 animate-pulse rounded-xl h-48"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {topAuthors.map((author) => (
              <div
                key={author.id}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-200"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {author.avatar ? (
                      <img
                        src={author.avatar}
                        alt={author.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={24} className="text-gray-400" />
                    )}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {author.username}
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center justify-center">
                    <BookOpen size={14} className="mr-1" />
                    {author.recipeCount} recipes
                  </div>
                  <div className="flex items-center justify-center">
                    <Star
                      size={14}
                      className="mr-1 fill-yellow-400 text-yellow-400"
                    />
                    {author.avgRating.toFixed(1)} avg rating
                  </div>
                  <div className="flex items-center justify-center">
                    <Heart size={14} className="mr-1 text-red-400" />
                    {author.totalFavorites} favorites
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-[650] text-black mb-4 leading-snug">
            Become a true <span className="text-text-primary">chef</span> <br />{" "}
            with our recipes.
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Start your culinary journey today. Share your favorite recipes and
            discover new flavors from around the world.
          </p>
          <Link href="/add-recipe">
            <Button
              size="lg"
              className="
                bg-black hover:bg-neutral-800 text-white
                rounded-full px-8 py-3 text-lg
                transition-all duration-200 shadow-lg hover:shadow-xl
              "
            >
              <PlusCircle size={20} className="mr-2" />
              Share Your Recipe
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
