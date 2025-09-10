"use client";

import { useState } from "react";
import { Soup, User, Clock, ChefHat, Star, HandPlatter } from "lucide-react";
import Favorite from "@/components/ui/favorite";
import RecipeAvgRating from "@/components/ui/avg-rating";
import { recipes } from "@/mocks/recipes";
import { users } from "@/mocks/users";

interface RecipePageProps {
  params: { 
    id: string;
    avgRating?: number;
    ratingCount?: number;
    isFavorited?: boolean;
    favoriteCount?: number;
  };
}

export default function RecipeDetailPage({ params }: RecipePageProps) {
  const [isFavorited, setIsFavorited] = useState(params.isFavorited || false);
  // const [favoriteCount, setFavoriteCount] = useState(params.favoriteCount || 0);

  const recipe = recipes.find(r => r.id === parseInt(params.id, 10));

  const getAuthorNameById = (authorId: number) => {
    const author = users.find(u => u.id === authorId);
    const authorName = author ? author.username : "Unknown";
    return authorName.charAt(0).toUpperCase() + authorName.slice(1);
  }

  const getNumberOfRecipesByAuthor = (authorId: number) => {
    if (!authorId) return 0;
    return recipes.filter(r => r.authorId === authorId).length;
  }

  const formatCategory = (category: string) => {
    if (category.includes("Dish")) 
      return category.replace("Dish", " Dish");
    return category;
  }

  const formatRecipeCount = (count: number) => {
    return count === 1 ? "1 Recipe" : `${count} Recipes`;
  }

  const toggleFavorite = () => {
    setIsFavorited((prev) => !prev)
  };

  const recipeFields = ["Category", "Servings", "Prep Time", "Cook Time", "Difficulty", getAuthorNameById(recipe?.authorId || 0)]; 

  const icons = [
    <Soup size={16} color="#ffa319" />, 
    <HandPlatter size={16} color="#ffa319" />,
    <Clock size={16} color="#ffa319" />, 
    <ChefHat size={16} color="#ffa319" />, 
    <Star size={16} color="#ffa319" />,
    <User size={16} color="#ffa319" />
  ];

  const recipeValues = [
    formatCategory(recipe?.category || ""), 
    recipe?.servings === 1 ? "1 Person" : recipe?.servings + " People", 
    recipe?.prepTime + " Minutes", 
    recipe?.cookTime + " Minutes", 
    recipe?.difficulty,
    formatRecipeCount(getNumberOfRecipesByAuthor(recipe?.authorId || 0))
  ];

  return (
    <main className="px-4">
      {/* Recipe Image */}
      <img
        src={recipe?.image}
        alt={recipe?.description}
        className="w-full h-auto rounded-lg mb-6"
      />

      <div className="flex flex-col justify-center items-center gap-4 mb-6">
        <h1 className="text-3xl text-center font-bold">{recipe?.title}</h1>
        <RecipeAvgRating 
          avgRating={params?.avgRating || 0} 
          ratingCount={params?.ratingCount || 0}
        />
        <Favorite
          isFavorited={isFavorited}
          toggleFavorite={toggleFavorite}
          // favoriteCount={favoriteCount}
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
          <div key={index} className="grid grid-cols-[max-content_1fr] items-center justify-center gap-3">
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
        <h2 className="text-2xl font-bold">
          Description
        </h2>
        <p className="mt-2 text-text-muted">{recipe?.description}</p>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:gap-4">
        {/* Ingredients */}
        <div className="mb-8 flex-1">
          <h2 className="text-2xl font-bold inline-block mr-1.5">
            Ingredients
          </h2>
          <div className="mt-4 p-6 bg-bg-card rounded-lg shadow-[0_2px_12px_0_rgba(0,0,0,0.06)]">
            <ul className="mt-4 space-y-4">
              {recipe?.ingredients.map((ingredient, index) => (
                <li key={index} className="flex justify-between items-center gap-4">
                  <h3 className="font-semibold">{ingredient.name}</h3>
                  <p className="text-text-muted">{`${ingredient.quantity}${ingredient.unit}`}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cooking Instructions */}
        <div className="md:max-w-[60vw]">
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
    </main>
  )
}
