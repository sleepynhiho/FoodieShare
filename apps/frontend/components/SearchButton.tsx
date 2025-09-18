import Link from "next/link";
import { recipes } from "@/mocks/recipes"
import { Recipe } from "@/types"
import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTrigger,
  DialogTitle
} from "@/components/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog";

interface RecipeResultProps {
  recipe: Recipe
}

const SearchIcon = () => {
  return (
    <Search size={16} className="text-text-muted" />
  )
}

const RecipeResult: React.FC<RecipeResultProps> = ({ recipe }) => {
  const formatCategory = (category: string) => {
    if (category.includes("Dish")) 
      return category.replace("Dish", " Dish");
    return category;
  }

  return (
    <DialogClose asChild>
      <Link href={`/recipes/${recipe.id}`}>
        <div className="grid grid-cols-[auto,1fr] gap-4 cursor-pointer hover:bg-gray-100 px-2 py-2 rounded-md">
          <img
            src={recipe.image}
            alt={recipe.description}
            className="w-12 h-12 object-cover rounded-xl object-[70%_70%] md:object-center"
          />
          <div className="grid grid-rows-2">
            <h1 className="text-text-muted font-bold">{recipe.title}</h1>
            <p className="text-gray-400 text-sm font-medium">{`${formatCategory(
              recipe.category
            )} . ${recipe.cookTime} ${
              recipe.cookTime > 1 ? "minutes" : "minute"
            }`}</p>
          </div>
        </div>
      </Link>
    </DialogClose>
  )
}

export const SearchButton = () => {
  const [searchInput, setSearchInput] = useState<string>("")

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchInput = event.target.value.toLowerCase()
    setSearchInput(newSearchInput)
  }

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen) setSearchInput("")
      }}
    >
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="size-8 bg-gray-100 hover:bg-gray-200 rounded-full"
        >
          <SearchIcon />
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="fixed top-12 flex flex-col justify-center items-center border-0 p-0 shadow-none mb-12"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Search Recipes</DialogTitle>
        <DialogDescription className="sr-only">Search recipes by title</DialogDescription>

        <div className="fixed top-12 w-full max-w-sm space-y-3">
          <div className="flex items-center rounded-md bg-white px-3">
            <SearchIcon />
            <Input
              type="search"
              placeholder="Search recipes"
              className="text-text-muted border-0 h-11 font-semibold appearance-none [&::-webkit-search-cancel-button]:appearance-none"
              onChange={handleSearchInputChange}
            />
          </div>
          {searchInput !== "" && (
            <div className="bg-white rounded-md px-1 py-1">
              <div className="flex flex-col px-2 py-2 max-h-[400px] overflow-y-auto">
                {(() => {
                  const results = recipes.filter((recipe) => {
                    return searchInput === ""
                      ? false
                      : recipe.title.toLowerCase().includes(searchInput)
                  })

                  if (results.length === 0) {
                    return (
                      <h1 className="text-center text-text-muted font-bold py-2">
                        {"No results"}
                      </h1>
                    )
                  }

                  return results.map((recipe) => <RecipeResult key={recipe.id} recipe={recipe} />)
                })()}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
