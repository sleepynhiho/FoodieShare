import { IconButton } from "@/components/ui/shadcn-io/icon-button";
import { Heart } from "lucide-react";

interface FavoriteProps {
  isFavorited: boolean;
  toggleFavorite: () => void;
  isSmall?: boolean;
}

export default function Favorite({
  isFavorited = false,
  toggleFavorite,
  isSmall = false
}: FavoriteProps) {
  return (
    <div className="flex flex-col items-center">
      <IconButton
        className={`${isSmall ? "size-6 [&_svg]:size-4" : "size-6 [&_svg]:size-4 xs:size-8 xs:[&_svg]:size-5 sm:size-10 sm:[&_svg]:size-6"}`}
        icon={Heart}
        active={isFavorited}
        color={[239, 68, 68]} // red-500
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          toggleFavorite();
        }}
      />
    </div>
  );
}
