// NOTE: Khi có login page, cần lưu ý các điểm sau:
// 1. Chỉ hiển thị bộ sưu tập của user đã đăng nhập:
//    - Dữ liệu sẽ lấy theo user hiện tại
//    - Nếu chưa đăng nhập, chuyển hướng sang trang login hoặc báo "đăng nhập để xem bộ sưu tập".
// 2. API hoặc mock data sẽ dùng userId động:
//    - Thay vì fix userId = 1, sẽ lấy userId từ thông tin đăng nhập.
"use client";

import { recipes } from "@/mocks/recipes";
import { favorites } from "@/mocks/favorites";
import { RecipeCard } from "@/components/RecipeCard";
import { useState } from "react";

export default function MyCollectionPage() {
  const userId = 1;
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    return favorites.filter((f) => f.userId === userId).map((f) => f.recipeId);
  });

  const myRecipes = recipes.filter((r) => r.authorId === userId);
  const favoriteRecipes = recipes.filter((r) => favoriteIds.includes(r.id));

  const toggleFavorite = (recipeId: number) => {
    setFavoriteIds((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  return (
    <main className="w-full min-h-screen bg-white">
      <img
        src="/recipe_list_banner.webp"
        alt="Recipe list banner"
        className="w-full h-64 object-cover mb-5 rounded-xl object-[70%_70%] md:object-center"
      />
      <div className="w-full flex justify-center items-center"></div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-10">My Recipes</h2>
        <section className="grid grid-cols-[repeat(auto-fit,minmax(50px,260px))] gap-5">
          {myRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorited={favoriteIds.includes(recipe.id)}
              onToggleFavorite={() => toggleFavorite(recipe.id)}
            />
          ))}
        </section>
        <h2 className="text-2xl font-bold mb-10 mt-20">Favorite Recipes</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(50px,260px))] gap-5">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </main>
  );
}
