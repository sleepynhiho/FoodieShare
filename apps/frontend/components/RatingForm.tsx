import { Rating } from "@/types"
import RecipeRating from "./ui/rating"

interface RatingFormProps {
  recipeTitle: string
  recipeRating?: Rating 
}

export const RatingForm = ({ recipeTitle, recipeRating }: RatingFormProps) => {
  return (
    <div className="w-full md:max-w-[500px] self-center flex flex-col items-center justify-center gap-4 mt-8 p-6 bg-bg-secondary rounded-lg shadow-[0_2px_12px_0_rgba(0,0,0,0.06)]">
      <h2 className="text-white text-center text-lg font-semibold inline-block mr-1.5">
        {`How would you score ${recipeTitle}?`}
      </h2>
      <RecipeRating recipeRating={recipeRating} />
    </div>
  )
}
