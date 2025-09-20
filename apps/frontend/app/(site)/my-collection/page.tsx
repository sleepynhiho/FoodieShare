"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { recipes } from "@/mocks/recipes";
import { RecipeCard } from "@/components/RecipeCard";
import { useFavorites } from "@/context/FavoritesContext";

export default function MyCollectionPage() {
  const { data: session, status } = useSession();

  console.log("session", session);

  if (status === "loading") {
    return (
      <div>
        <img
          src="/recipe_list_banner.webp"
          alt="Recipe list banner"
          className="w-full h-64 object-cover mb-5 rounded-xl object-[70%_70%] md:object-center"
        />
        <div className="text-center text-xl mt-10">Loading...</div>
      </div>
    );
  }

  const user = session?.user as { id?: string; email?: string; name?: string };
  const userId = user?.id || user?.email || user?.name;

  const { favoriteIds } = useFavorites();

  if (!userId) {
    return (
      <div className="text-center">
        <img
          src="/recipe_list_banner.webp"
          alt="Recipe list banner"
          className="w-full h-64 object-cover mb-5 rounded-xl object-[70%_70%] md:object-center"
        />
        <p className="text-xl mt-10">
          You need to{" "}
          <a href="/login" className="text-blue-600 underline">
            sign in
          </a>{" "}
          to view your collection.
        </p>
      </div>
    );
  }

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
          <div className="text-center py-10">
            <p>
              You don't have any recipes or favorite dishes yet.
              <br />
              <span className="text-gray-500">
                Please{" "}
                <a href="/login" className="text-blue-600 underline">
                  sign in
                </a>{" "}
                or{" "}
                <a href="/sign-up" className="text-blue-600 underline">
                  sign up
                </a>{" "}
                to use this feature!
              </span>
            </p>
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
