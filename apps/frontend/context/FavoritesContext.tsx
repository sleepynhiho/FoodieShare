import { favorites } from "@/mocks/favorites";
import { createContext, useContext, useState } from "react";

type FavoritesContextType = {
  favoriteIds: number[];
  setFavoriteIds: React.Dispatch<React.SetStateAction<number[]>>;
  toggleFavorite: (recipeId: number, userId: number) => void;
  favoriteCountDict: { [key: string]: number };
  setFavoriteCountDict: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [favoriteCountDict, setFavoriteCountDict] = useState<{ [key: string]: number }>(() => {
    const storedFavoriteCountDict = localStorage.getItem("favoriteCountDict")
    if (storedFavoriteCountDict)
      return JSON.parse(storedFavoriteCountDict)
    else
      return favorites.reduce((acc: { [key: string]: number }, { recipeId }) => {
        acc[recipeId] = (acc[recipeId] || 0) + 1
        return acc
      }, {})
  })

  const toggleFavorite = (recipeId: number, userId: number) => {
    const updatedFavoriteIds = favoriteIds.includes(recipeId)
      ? favoriteIds.filter((id) => id !== recipeId)
      : [...favoriteIds, recipeId]
    
    const updatedFavoriteCountDict = favoriteIds.includes(recipeId)
      ? {...favoriteCountDict, [recipeId]: favoriteCountDict[recipeId] - 1}
      : {...favoriteCountDict, [recipeId]: favoriteCountDict[recipeId] + 1}

    setFavoriteIds(updatedFavoriteIds)
    setFavoriteCountDict(updatedFavoriteCountDict)
    localStorage.setItem(`favorites_user_${userId}`, JSON.stringify(updatedFavoriteIds))
    localStorage.setItem(`favoriteCountDict`, JSON.stringify(updatedFavoriteCountDict))
  };

  return (
    <FavoritesContext.Provider value={{ 
      favoriteIds, setFavoriteIds, toggleFavorite,
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
