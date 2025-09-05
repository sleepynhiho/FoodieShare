"use client";

import { useState } from "react";
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';

interface RecipeRatingProps {
  initialRating: number;
  userId: number;
  recipeId: number;
}

export default function RecipeRating({ initialRating = 0, userId = 1, recipeId = 1 }: RecipeRatingProps) {
  const [rating, setRating] = useState(initialRating);

  const handleRatingChange = (value: number) => {
    setRating(value);
    // Add or update rating in the database
  };

  return (
    <Rating value={rating} onValueChange={setRating}>
      {Array.from({ length: 5 }).map((_, index) => (
        <RatingButton 
          className="text-yellow-500"
          key={index} 
          onClick={() => handleRatingChange(index + 1)} 
        />
      ))}
    </Rating>
  )
}
