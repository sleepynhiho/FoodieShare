"use client";

import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';

interface RecipeRatingProps {
  userRating?: number | undefined,
  canClick?: boolean,
  onRatingChange: (value: number) => void
}

export default function RecipeRating({ userRating = 0, canClick, onRatingChange }: RecipeRatingProps) {
  const ratingMapping = [
    { "emoji": "😞", "name": "Very Bad" },
    { "emoji": "😐", "name": "Bad" },
    { "emoji": "😊", "name": "Good" },
    { "emoji": "😄", "name": "Very Good" },
    { "emoji": "🥰", "name": "Exellent" }
  ]

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        {
          userRating !== 0 && 
          (
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-3xl">{ratingMapping[userRating - 1]["emoji"]}</span>
              <h2 className="text-white font-semibold">{ratingMapping[userRating - 1]["name"]}</h2>
            </div>
          )
        }
        <Rating value={userRating} onValueChange={onRatingChange} className="flex gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton 
              className={`
                text-yellow-400 w-8 h-8 flex items-center justify-center bg-white rounded-md
                ${canClick ? "bg-white cursor-pointer" : "bg-gray-200 cursor-default pointer-events-none"}
              `}
              index={index + 1}
              key={index}
            />
          ))}
        </Rating>
      </div>
    </>
  )
}
