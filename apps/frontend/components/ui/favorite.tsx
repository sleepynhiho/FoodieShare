import { IconButton } from "@/components/ui/shadcn-io/icon-button";
import { Heart } from "lucide-react";
import { useProtectedAction } from "@/hooks/useProtectedAction";

interface FavoriteProps {
  isFavorited: boolean;
  recipeId: string | number; // Accept both types
  toggleFavorite: (recipeId: string | number, userId?: number) => void;
  isSmall?: boolean;
}

export default function Favorite({
  isFavorited = false,
  recipeId = "1",
  toggleFavorite,
  isSmall = false
}: FavoriteProps) {
  const { protectAction } = useProtectedAction();

  return (
    <div className="flex flex-col items-center">
      <IconButton
        className={`${isSmall ? "size-6 [&_svg]:size-4" : "size-6 [&_svg]:size-4 xs:size-8 xs:[&_svg]:size-5 sm:size-10 sm:[&_svg]:size-6"}`}
        icon={Heart}
        active={isFavorited}
        color={[239, 68, 68]} // red-500
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          protectAction(
            () => toggleFavorite(recipeId, 1)
          );
        }}
      />
    </div>
  );
}
