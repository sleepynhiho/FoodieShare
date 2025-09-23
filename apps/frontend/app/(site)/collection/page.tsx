"use client";

import { useEffect, useState } from "react";
import { RecipeCard } from "@/components/RecipeCard";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import { getUserRecipes } from "@/services/userService";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AuthModal } from "@/components/auth/AuthModal";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MyCollectionPage() {
  const { user, isAuthenticated, isAuthLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Show auth modal if user is not authenticated and not loading
    if (!isAuthLoading && !isAuthenticated) {
      setShowAuthModal(true);
    }
  }, [isAuthLoading, isAuthenticated]);

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

  const userId = user?.id || user?.email || user?.name;

  const { favoriteRecipes } = useFavorites();

  const [myRecipes, setMyRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyRecipes = async () => {
    try {
      const data = await getUserRecipes();
      setMyRecipes(data);
    } catch (error) {
      console.error("Failed to fetch user recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyRecipes();
  }, []);

  const isCompletelyEmpty = myRecipes.length === 0 && favoriteRecipes.length === 0;
  const hasMyRecipes = myRecipes.length > 0;
  const hasFavorites = favoriteRecipes.length > 0;

  // Empty section component for reuse
  const EmptySection = ({ title, message, icon }: { title: string; message: string; icon?: React.ReactNode }) => (
    <div className="text-center py-6 flex flex-col items-center gap-4 max-w-md mx-auto mb-10 bg-orange-50 rounded-xl p-6">
      <div className="rounded-full bg-orange-100 p-4 mb-1">
        {icon || (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffa319" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        )}
      </div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <p className="text-gray-600">{message}</p>
    </div>
  );

  return (
    <main className="w-full min-h-screen bg-white">
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => {
          setShowAuthModal(false);
          router.push('/recipes');
        }} 
      />
      <LoadingSpinner loading={isLoading} />
      <img
        src="/recipe_list_banner.webp"
        alt="Recipe list banner"
        className="w-full h-64 object-cover mb-5 rounded-xl object-[70%_70%] md:object-center"
      />
      <div className="w-full flex justify-center items-center"></div>
      <div className="p-4">
        {isCompletelyEmpty ? (
          <div className="text-center py-10 flex flex-col items-center gap-6 max-w-md mx-auto">
            <div className="rounded-full bg-orange-100 p-6 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ffa319" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 14a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm1-4a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Collection is Empty</h3>
            <p className="text-gray-600 mb-4">
              You don't have any recipes or favorite dishes yet.
              Start exploring and adding your favorite recipes to build your collection!
            </p>
            <Link
              href="/recipes"
              className="inline-block px-8 py-3 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              Explore Recipes
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-10">My Recipes</h2>
            {hasMyRecipes ? (
              <section className="grid grid-cols-[repeat(auto-fit,minmax(50px,260px))] gap-5">
                {myRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isFavorited={
                      favoriteRecipes.find((r) => r.id === String(recipe.id))
                        ? true
                        : false
                    }
                  />
                ))}
              </section>
            ) : (
              <EmptySection 
                title="No Created Recipes Yet"
                message="Create your first recipe to see it here!"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffa319" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                }
              />
            )}
            
            <h2 className="text-2xl font-bold mb-10 mt-20">Favorite Recipes</h2>
            {hasFavorites ? (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(50px,260px))] gap-5">
                {favoriteRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isFavorited={true}
                  />
                ))}
              </div>
            ) : (
              <EmptySection 
                title="No Favorite Recipes"
                message="Browse recipes and tap the heart icon to add favorites!"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffa319" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                }
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}
