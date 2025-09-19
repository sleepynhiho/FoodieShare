import { createContext, useContext, useState, useEffect } from "react";

type FavoritesContextType = {
  favoriteIds: string[]; // Changed to string to match API
  setFavoriteIds: React.Dispatch<React.SetStateAction<string[]>>;
  toggleFavorite: (recipeId: string | number, userId?: number) => void; // Support both types
  favoriteCountDict: { [key: string]: number };
  setFavoriteCountDict: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]); // Changed to string array
  const [favoriteCountDict, setFavoriteCountDict] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const storedFavoriteCountDict = localStorage.getItem("favoriteCountDict")
    if (storedFavoriteCountDict) {
      setFavoriteCountDict(JSON.parse(storedFavoriteCountDict))
    } else {
      setFavoriteCountDict({}) // Start with empty dict
    }
  }, [])

  const toggleFavorite = (recipeId: string | number, userId: number = 1) => {
    const recipeIdStr = String(recipeId); // Convert to string for consistency
    const updatedFavoriteIds = favoriteIds.includes(recipeIdStr)
      ? favoriteIds.filter((id) => id !== recipeIdStr)
      : [...favoriteIds, recipeIdStr]
    
    const updatedFavoriteCountDict = favoriteIds.includes(recipeIdStr)
      ? {...favoriteCountDict, [recipeIdStr]: Math.max(0, (favoriteCountDict[recipeIdStr] || 1) - 1)}
      : {...favoriteCountDict, [recipeIdStr]: (favoriteCountDict[recipeIdStr] || 0) + 1}

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
