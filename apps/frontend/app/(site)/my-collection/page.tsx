"use client";

import { recipes } from "@/mocks/recipes";
import { RecipeCard } from "@/components/RecipeCard";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function MyCollectionPage() {
  const { user, isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading)
    return (
      <div>
        <img
          src="/recipe_list_banner.webp"
          alt="Recipe list banner"
          className="w-full h-64 object-cover mb-5 rounded-xl object-[70%_70%] md:object-center"
        />
        <div className="text-center text-lg py-10">Loading...</div>
      </div>
    );
  if (!isAuthenticated || !user)
    return (
      <div>
        <img
          src="/recipe_list_banner.webp"
          alt="Recipe list banner"
          className="w-full h-64 object-cover mb-5 rounded-xl object-[70%_70%] md:object-center"
        />
        <div className="text-center text-lg py-10">
          <p>
            You need to{" "}
            <Link
              href="/login"
              className="text-blue-600 underline hover:text-blue-800 transition-colors font-semibold"
            >
              log in
            </Link>{" "}
            to view your collection.
          </p>
        </div>
      </div>
    );

  const userId = user?.id || user?.email || user?.name;

  const { favoriteIds } = useFavorites();

  const myRecipes = recipes.filter(
    (r) => String(r.authorId) === String(userId)
  );
  const favoriteRecipes = recipes.filter((r) =>
    favoriteIds.includes(String(r.id))
  );

  const isEmpty = myRecipes.length === 0 && favoriteRecipes.length === 0;

  return (
    <main className="w-full min-h-screen bg-white">
      <img
        src="/recipe_list_banner.webp"
        alt="Recipe list banner"
        className="w-full h-64 object-cover mb-5 rounded-xl object-[70%_70%] md:object-center"
      />
      <div className="w-full flex justify-center items-center"></div>
      <div className="p-4">
        {isEmpty ? (
          <div className="text-center text-lg py-10 flex flex-col items-center gap-4">
            <p className="mb-2">
              You don't have any recipes or favorite dishes yet.
              <br className="mt-20" />
              Start exploring and adding your favorite recipes!
            </p>
            <Link
              href="/recipes"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
            >
              Explore Recipes
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-10">My Recipes</h2>
            <section className="grid grid-cols-[repeat(auto-fit,minmax(50px,260px))] gap-5">
              {myRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isFavorited={favoriteIds.includes(String(recipe.id))}
                />
              ))}
            </section>
            <h2 className="text-2xl font-bold mb-10 mt-20">Favorite Recipes</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(50px,260px))] gap-5">
              {favoriteRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isFavorited={true}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
