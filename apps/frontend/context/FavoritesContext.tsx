import { createContext, useContext, useState, useEffect } from "react";
import { getUserFavoriteRecipes } from "@/services/userService";
import { toggleFavoriteRecipe } from "@/services/recipeService";

type Recipe = { id: string; [key: string]: any };

type FavoritesContextType = {
  toggleFavorite: (recipeId: { id: string | number }) => void; 
  favoriteCountDict: { [key: string]: number };
  setFavoriteCountDict: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  favoriteRecipes: Recipe[];
  setFavoriteRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([])
  const [favoriteCountDict, setFavoriteCountDict] = useState<{ [key: string]: number }>({})

  const getFavoriteRecipes = async () => {
    try {
      const data = await getUserFavoriteRecipes()
      console.log("Fetched favorite recipes:", data);
      setFavoriteRecipes(data)
    } catch (error) {
      console.error("Failed to fetch favorite recipes:", error)
    }
  }

  useEffect(() => {
    getFavoriteRecipes()
  }, [])

  const toggleFavorite = async (recipe: { id: string | number }) => {
    const recipeIdStr = String(recipe.id); 

    const updatedFavoriteRecipes = favoriteRecipes.find((r) => r.id === recipeIdStr)
      ? favoriteRecipes.filter((r) => r.id === recipeIdStr ? false : true)
      : [...favoriteRecipes, { ...recipe, id: recipeIdStr }]
    setFavoriteRecipes(updatedFavoriteRecipes)

    const updatedFavoriteCountDict = favoriteRecipes.find((r) => r.id === recipeIdStr)
      ? {...favoriteCountDict, [recipeIdStr]: Math.max(0, (favoriteCountDict[recipeIdStr] || 1) - 1)}
      : {...favoriteCountDict, [recipeIdStr]: (favoriteCountDict[recipeIdStr] || 0) + 1}
    setFavoriteCountDict(updatedFavoriteCountDict)

    try {
      await toggleFavoriteRecipe(recipeIdStr)
    } catch (error) {
      setFavoriteRecipes(favoriteRecipes);
      setFavoriteCountDict(favoriteCountDict)
      console.error("Error toggling favorite:", error);
    }
  }

  return (
    <FavoritesContext.Provider value={{ 
      favoriteRecipes, setFavoriteRecipes, toggleFavorite,
      favoriteCountDict, setFavoriteCountDict
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) 
    throw new Error("useFavorites must be used inside FavoritesProvider");
  return context;
};
