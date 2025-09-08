import { IconButton } from "@/components/ui/shadcn-io/icon-button";
import { Heart } from "lucide-react";

interface FavoriteProps {
  isFavorited: boolean;
  toggleFavorite: () => void;
  // favoriteCount: number;
}

export default function Favorite({
  isFavorited = false,
  toggleFavorite,
}: FavoriteProps) {
  return (
    <div className="flex flex-col items-center">
      <IconButton
        icon={Heart}
        active={isFavorited}
        color={[239, 68, 68]} // red-500
        size="md"
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          toggleFavorite();
        }}
      />
      {/* <span className="text-xs text-text-muted">{favoriteCount}</span> */}
    </div>
  );
}
