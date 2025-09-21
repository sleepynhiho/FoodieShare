"use client"

import { useState, useEffect } from "react"
import { Soup, User, Clock, ChefHat, Star, HandPlatter } from "lucide-react"
import Favorite from "@/components/ui/favorite"
import RecipeAvgRating from "@/components/ui/avg-rating"
import { useFavorites } from "@/context/FavoritesContext"
import { RatingForm } from "@/components/RatingForm"
import { getRecipe } from "@/services/recipeService"
import { getRecipeRatingStats } from "@/services/ratingsService"
import { toast } from "sonner"
import { submitRating } from "@/services/ratingsService";
import { useProtectedAction } from "@/hooks/useProtectedAction";

interface RecipePageProps {
  params: {
    id: string
  }
}

export default function RecipeDetailPage({ params }: RecipePageProps) {
  const { favoriteRecipes, toggleFavorite } = useFavorites()

  const { protectAction } = useProtectedAction();

  // State management
  const [recipe, setRecipe] = useState<any>(null)
  const [ratingStats, setRatingStats] = useState({
    averageRating: 0,
    totalRatings: 0,
    userRating: undefined as number | undefined
  })
  const [rating, setRating] = useState<number>(ratingStats.userRating || 0)
  const [canClick, setCanClick] = useState(true) // To prevent multiple rating clicks

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setRating(ratingStats.userRating || 0)
  }, [ratingStats.userRating])

  const handleRatingChange = (value: number) => {
    protectAction(
      async () => {
        if (!canClick) return
        setCanClick(false)
    
        setRating(value)
    
        try {
          await submitRating(params.id, value)
          toast.success("Thanks for rating!", {
            duration: 2000
          })
        } catch (error) {
          toast.error("Please login to rate the recipe!", {
            duration: 2000
          })
        } finally {
          setTimeout(() => setCanClick(true), 2000)
        }
      }
    )
  };

  // Load recipe data
  const loadRecipeData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Load recipe details
      const recipeData = await getRecipe(params.id)
      setRecipe(recipeData)

      // Load rating statistics
      const ratingData = await getRecipeRatingStats(params.id)
      setRatingStats({
        averageRating: ratingData.averageRating,
        totalRatings: ratingData.totalRatings,
        userRating: ratingData.userRating
      })
    } catch (err: any) {
      console.error("Error loading recipe data:", err)
      setError(err.message || "Failed to load recipe details")
    } finally {
      setLoading(false)
    }
  }

  // Load data on component mount
  useEffect(() => {
    loadRecipeData()
  }, [params.id])

  // Helper functions
  const formatCategory = (category: string) => {
    if (category.includes("Dish")) return category.replace("Dish", " Dish")
    return category
  }

  if (loading) {
    return (
      <main className="px-4">
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            <p className="mt-4 text-gray-600">Loading recipe...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error || !recipe) {
    return (
      <main className="px-4">
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || "Recipe not found"}</p>
            <button
              onClick={loadRecipeData}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    )
  }

  const recipeFields = [
    "Category",
    "Servings",
    "Prep Time",
    "Cook Time",
    "Difficulty",
    recipe?.author?.username || "Unknown Chef"
  ]

  const icons = [
    <Soup size={16} color="#ffa319" />,
    <HandPlatter size={16} color="#ffa319" />,
    <Clock size={16} color="#ffa319" />,
    <ChefHat size={16} color="#ffa319" />,
    <Star size={16} color="#ffa319" />,
    <User size={16} color="#ffa319" />
  ]

  const recipeValues = [
    formatCategory(recipe?.category || ""),
    recipe?.servings === 1 ? "1 Person" : recipe?.servings + " People",
    recipe?.prepTime + " Minutes",
    recipe?.cookingTime + " Minutes",
    recipe?.difficulty,
    "0 Recipes" // TODO: Add recipe count to author data from backend
  ]

  return (
    <main className="px-4">
      {/* Recipe Image */}
      <div className="relative w-full rounded-lg overflow-hidden mb-6">
        <div className="relative">
          <img
            src={recipe?.image}
            alt={recipe?.description}
            className="w-full max-h-96 object-cover rounded-xl object-[70%_70%] md:object-center"
          />

          <div
            className="absolute mb-8 sm:mb-12 px-4 xs:px-8 inset-y-0 flex flex-col flex-wrap justify-end gap-1"
            style={{ textShadow: "2px 2px 6px rgba(36, 36, 36, 0.7)" }}
          >
            <p className="text-sm sm:text-lg text-white font-semibold">
              Let's Cook
            </p>
            <h1 className="text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold">
              {recipe?.title}
            </h1>
          </div>
        </div>
        <div
          className={`
            absolute top-2 right-2 mr-2 mt-2 xs:mr-4 xs:mt-4 bg-white hover:bg-white transition p-1 rounded-full shadow-lg cursor-pointer 
            w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 flex items-center justify-center
          `}
        >
          <Favorite
            isFavorited={favoriteRecipes.find((r) => r.id === params.id) ? true : false}
            recipe={recipe}
            toggleFavorite={toggleFavorite}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-4 mb-6">
        <RecipeAvgRating
          avgRating={ratingStats.averageRating || 0}
          ratingCount={ratingStats.totalRatings || 0}
        />
      </div>

      {/* Recipe Fields */}
      <div
        className="
        grid 
        grid-template-columns:repeat(2,fit-content(200px)) 
        justify-center
        xs:[grid-template-columns:repeat(2,fit-content(200px))] xs:justify-evenly
        md:[grid-template-columns:repeat(3,fit-content(200px))] gap-4 mb-8"
      >
        {recipeFields.map((field, index) => (
          <div
            key={index}
            className="grid grid-cols-[max-content_1fr] items-center justify-center gap-3"
          >
            <div className="rounded-full bg-bg-icon p-2 w-8 h-8">
              {icons[index]}
            </div>
            <div className="grid grid-rows-2">
              <p className="text-sm text-gray-400">{field}</p>
              <p className="text-base font-bold">{recipeValues[index]}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Description</h2>
        <p className="mt-2 text-text-muted">{recipe?.description}</p>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row md:justify-between md:gap-4">
          {/* Ingredients */}
          <div className="mb-8 flex-1">
            <h2 className="text-2xl font-bold inline-block mr-1.5">
              Ingredients
            </h2>
            <div className="mt-4 p-6 bg-bg-card rounded-lg shadow-[0_2px_12px_0_rgba(0,0,0,0.06)]">
              <ul className="mt-4 space-y-4">
                {recipe?.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center gap-4"
                  >
                    <h3 className="font-semibold">{ingredient.name}</h3>
                    <p className="text-text-muted">{`${ingredient.quantity}${ingredient.unit}`}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cooking Instructions */}
          <div className="md:w-[50vw] lg:w-[60vw]">
            <h2 className="text-2xl font-bold inline-block mr-1.5">Cooking</h2>
            <h2 className="text-2xl font-bold text-text-primary inline-block">
              Instructions
            </h2>
            <div className="mt-4 p-6 bg-bg-card rounded-lg shadow-[0_2px_12px_0_rgba(0,0,0,0.06)]">
              <ol className="mt-4 space-y-4">
                {recipe?.steps.map((step, index) => (
                  <li key={index} className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-bg-icon p-2 text-text-primary font-bold">
                        {index + 1}
                      </div>
                      <h3 className="font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-text-muted">{step.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Rating Form */}
        <RatingForm
          recipeTitle={recipe?.title || ""}
          userRating={rating}
          canClick={canClick}
          onRatingChange={handleRatingChange}
        />
      </div>
    </main>
  )
}
