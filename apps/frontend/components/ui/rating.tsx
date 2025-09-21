"use client";

import { useState } from "react";
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';
import { Rating as RatingType } from "@/types";
import { useProtectedAction } from "@/hooks/useProtectedAction";

interface RecipeRatingProps {
  recipeRating?: RatingType
}

export default function RecipeRating({ recipeRating }: RecipeRatingProps) {
  const [rating, setRating] = useState<number>(recipeRating?.score || 0);
  const { protectAction } = useProtectedAction();

  const ratingMapping = [
    { "emoji": "😞", "name": "Very Bad" },
    { "emoji": "😐", "name": "Bad" },
    { "emoji": "😊", "name": "Good" },
    { "emoji": "😄", "name": "Very Good" },
    { "emoji": "🥰", "name": "Exellent" }
  ]

  const handleRatingChange = (value: number) => {
    protectAction(
      () => setRating(value)
    );
    // Add or update rating in the database later
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {
        rating !== 0 && 
        (
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-3xl">{ratingMapping[rating - 1]["emoji"]}</span>
            <h2 className="text-white font-semibold">{ratingMapping[rating - 1]["name"]}</h2>
          </div>
        )
      }
      <Rating value={rating} onValueChange={handleRatingChange} className="flex gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingButton 
            className="text-yellow-400 w-8 h-8 flex items-center justify-center bg-white rounded-md"
            key={index} 
            onClick={() => handleRatingChange(index + 1)} 
          />
        ))}
      </Rating>
    </div>
  )
}
