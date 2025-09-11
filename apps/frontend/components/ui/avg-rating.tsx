import { Star } from "lucide-react";

interface RecipeAvgRatingProps {
  avgRating: number;
  ratingCount: number;
}

export default function RecipeAvgRating({ avgRating = 0, ratingCount = 0 }: RecipeAvgRatingProps) {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => {
        const starValue = i + 1
        if (avgRating >= starValue) {
          // full star
          return (
            <Star
              key={i}
              className="w-5 h-5 fill-yellow-400 stroke-yellow-400"
            />
          )
        } else if (avgRating >= starValue - 0.5) {
          // half star → overlay trick
          return (
            <div key={i} className="relative w-5 h-5">
              <Star className="absolute top-0 left-0 w-5 h-5 fill-gray-200 stroke-gray-200" />
              <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
                <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
              </div>
            </div>
          )
        } else {
          // empty star
          return (
            <Star key={i} className="w-5 h-5 fill-gray-200 stroke-none" />
          )
        }
      })}
      <span className="ml-2 text-sm font-bold">{avgRating.toFixed(1)}</span>
      <span className="ml-2 text-sm text-text-muted">{`(${ratingCount} ${ratingCount > 1 ? "reviews" : "review"})`}</span>
    </div>
  )
}
