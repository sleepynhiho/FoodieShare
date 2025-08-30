interface RecipePageProps {
  params: { id: string };
}

export default function RecipeDetailPage({ params }: RecipePageProps) {
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold">Recipe {params.id}</h1>
      <p className="text-gray-600 mt-2">Recipe detail goes here.</p>
    </main>
  );
}


