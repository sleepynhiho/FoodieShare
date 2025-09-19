"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RecipeCard } from "@/components/RecipeCard";
import { RECIPE_CATEGORIES, CATEGORY_DISPLAY_NAMES } from "@/lib/constants";
import { getRecipes } from "@/services/recipeService";
import { getAppStats, getCategoryStats } from "@/services/statsService";
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
} from "lucide-react";

export default function HomePage() {
  const [featuredRecipes, setFeaturedRecipes] = useState<any[]>([]);
  const [categoryStats, setCategoryStats] = useState<any[]>([]);
  const [appStats, setAppStats] = useState({
    totalRecipes: 0,
    totalUsers: 0,
    totalRatings: 0,
    avgRating: "0.0",
    totalFavorites: 0
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
        
        // Get featured recipes (top-rated, sorted by avgRating)
        const recipesData = await getRecipes({ 
          limit: 6,
          // In the future, add sort by rating when backend supports it
        });
        
        // For now, sort on frontend - ideally this would be done on backend
        const sortedRecipes = (recipesData.data || []).sort((a: any, b: any) => 
          (b.avgRating || 0) - (a.avgRating || 0)
        );
        setFeaturedRecipes(sortedRecipes.slice(0, 6));

        // Get app statistics
        const stats = await getAppStats();
        setAppStats({
          totalRecipes: stats.totalRecipes,
          totalUsers: stats.totalUsers,
          totalRatings: stats.totalRatings,
          avgRating: stats.avgRating.toFixed(1),
          totalFavorites: stats.totalFavorites
        });

        // Get category statistics
        const catStats = await getCategoryStats();
        const enrichedCategoryStats = catStats
          .filter(cat => cat.count > 0)
          .map(cat => ({
            name: cat.name,
            displayName: CATEGORY_DISPLAY_NAMES[cat.name as keyof typeof CATEGORY_DISPLAY_NAMES] || cat.name,
            count: cat.count,
            icon: categoryIcons[cat.name as keyof typeof categoryIcons],
          }));
        setCategoryStats(enrichedCategoryStats);

      } catch (error) {
        console.error('Error loading data:', error);
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
        className="relative py-6 md:py-10 bg-cover bg-center bg-no-repeat flex justify-start rounded-[20px] overflow-hidden bg-white"
        style={{
          backgroundImage: `url('/banner.jpg')`,
          transform: "scaleX(-1)",
        }}
      >
        <div
          className="container mx-auto px-10 text-start mb-15"
          style={{ transform: "scaleX(-1)" }}
        >
          <h1 className="text-6xl md:text-8xl font-[500] text-black mb-6 leading-tight">
            Adventure <br />
            <span>of </span>
            <span className="text-text-primary">Delicacies</span>
          </h1>

          <p className="text-xl text-gray-400 mb-16 max-w-2xl leading-relaxed">
            Join our community of food lovers. Explore delicious recipes, save
            your favorites, and share your culinary creations with the world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
            {/* Explore Recipes Button - Black with Chef Hat icon */}
            <Link href="/recipes">
              <Button
                size="lg"
                className="
                  w-full sm:w-auto
                  bg-black hover:bg-neutral-800 text-white
                  flex items-center justify-between
                  rounded-[50px] px-3 py-2 text-lg
                  transition-all duration-200 shadow-md hover:shadow-lg
                "
              >
                <span className="pl-2">Explore Recipes</span>
                <div
                  className="
                    ml-[14px] w-8 h-8 flex items-center justify-center
                    rounded-full bg-white shadow-inner
                  "
                >
                  <ChefHat size={18} className="text-black" />
                </div>
              </Button>
            </Link>

            {/* Add Your Recipe Button - White with Plus icon */}
            <Link href="/add-recipe">
              <Button
                size="lg"
                className="
                  w-full sm:w-auto
                  bg-white hover:bg-neutral-100 text-black
                  flex items-center justify-between
                  rounded-[50px] px-3 py-2 text-lg
                  transition-all duration-200 shadow-md hover:shadow-lg
                "
              >
                <span className="pl-2">Add Your Recipe</span>
                <div
                  className="
                    ml-[14px] w-8 h-8 flex items-center justify-center
                    rounded-full bg-neutral-100 shadow-inner
                  "
                >
                  <Plus size={18} className="text-black" />
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="bg-orange-100 p-3 rounded-full">
                  <BookOpen size={24} className="text-orange-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {loading ? "..." : appStats.totalRecipes}
              </div>
              <div className="text-gray-600">Recipes</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Users size={24} className="text-orange-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {loading ? "..." : appStats.totalUsers}
              </div>
              <div className="text-gray-600">Chefs</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Star size={24} className="text-orange-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {loading ? "..." : appStats.avgRating}
              </div>
              <div className="text-gray-600">Avg Rating</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Heart size={24} className="text-orange-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {loading ? "..." : appStats.totalFavorites}
              </div>
              <div className="text-gray-600">Favorites</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Recipes
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover the most loved recipes by our community of food
              enthusiasts
            </p>
          </div>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
              <p className="mt-2 text-gray-600">Loading featured recipes...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {featuredRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
              {featuredRecipes.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-600">No recipes found.</p>
                </div>
              )}
            </>
          )}
          <div className="text-center">
            <Link href="/recipes">
              <Button
                variant="outline"
                size="lg"
                className="border-orange-600 text-orange-600 hover:bg-orange-50 flex items-center"
              >
                View All Recipes
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
              <Utensils size={32} className="text-orange-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Browse by <span className="text-orange-600">Category</span>
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Find exactly what you're craving from our diverse collection of delicious recipes
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                <p className="mt-2 text-gray-600">Loading categories...</p>
              </div>
            ) : categoryStats.length > 0 ? (
              categoryStats.map((category, index) => (
                <Link
                  key={category.name}
                  href={`/recipes?category=${category.name}`}
                  className="group"
                >
                  <div className="relative bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100 hover:border-orange-200 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Icon Container */}
                    <div className="relative mb-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <div className="text-orange-600 group-hover:text-orange-700 transition-colors duration-300">
                          {category.icon}
                        </div>
                      </div>
                      
                      {/* Floating Badge */}
                      <div className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                        {category.count}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                        {category.displayName}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium">
                        {category.count} recipe{category.count !== 1 ? "s" : ""} available
                      </p>
                      
                      {/* Hover Arrow */}
                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="inline-flex items-center text-orange-600 font-medium text-sm">
                          Explore recipes
                          <ArrowRight size={16} className="ml-1" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom Accent Line */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-600">No categories available.</p>
              </div>
            )}
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-2 text-gray-600 mb-4">
              <div className="w-12 h-px bg-gray-300"></div>
              <span className="text-sm font-medium">Can't find what you're looking for?</span>
              <div className="w-12 h-px bg-gray-300"></div>
            </div>
            <Link href="/recipes">
              <Button 
                size="lg" 
                className="
                  bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-orange-300
                  rounded-full px-8 py-3 font-semibold shadow-lg hover:shadow-xl
                  transition-all duration-300 group
                "
              >
                <span>View All Recipes</span>
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Get started with FoodieShare in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-orange-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Discover
              </h3>
              <p className="text-gray-600">
                Browse through thousands of recipes by category, difficulty, or
                rating to find your next favorite dish.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-orange-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Collect
              </h3>
              <p className="text-gray-600">
                Save your favorite recipes to your personal collection for easy
                access whenever you need them.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-orange-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Share
              </h3>
              <p className="text-gray-600">
                Add your own recipes to the community and help others discover
                amazing new dishes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Cooking?
          </h2>
          <p className="text-xl mb-8 text-orange-100 max-w-2xl mx-auto">
            Join thousands of food lovers sharing their passion for cooking.
            Your next favorite recipe is just a click away!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/recipes">
              <Button
                size="lg"
                className="
                  w-full sm:w-auto
                  bg-white hover:bg-orange-50 text-orange-600 
                  flex items-center justify-between
                  rounded-[50px] px-3 py-2 text-lg
                  transition-all duration-200 shadow-md hover:shadow-lg
                "
              >
                <span className="pl-2">Start Exploring</span>
                <div
                  className="
                    ml-[14px] w-8 h-8 flex items-center justify-center
                    rounded-full bg-orange-100 shadow-inner
                  "
                >
                  <ChefHat size={18} className="text-orange-600" />
                </div>
              </Button>
            </Link>
            
            <Link href="/add-recipe">
              <Button
                size="lg"
                className="
                  w-full sm:w-auto
                  bg-orange-700 hover:bg-orange-800 text-white
                  flex items-center justify-between
                  rounded-[50px] px-3 py-2 text-lg
                  transition-all duration-200 shadow-md hover:shadow-lg
                "
              >
                <span className="pl-2">Share a Recipe</span>
                <div
                  className="
                    ml-[14px] w-8 h-8 flex items-center justify-center
                    rounded-full bg-orange-600 shadow-inner
                  "
                >
                  <Plus size={18} className="text-white" />
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}