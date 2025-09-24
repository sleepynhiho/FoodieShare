"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";

import {
  GeneralInfo,
  GeneralInfoRef,
  Ingredient,
  IngredientsRef,
  RecipeStep,
  StepsRef,
} from "@/types/recipe";
import { GeneralInformation, Ingredients, Steps } from "../../../add-recipe/blocks";
import { uploadImageClientSide } from "@/services/imageUploadService";
import { updateRecipe, getRecipe, CreateRecipeRequest } from "@/services/recipeService";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";

export default function EditRecipePage() {
  const { id } = useParams();
  const giRef = React.useRef<GeneralInfoRef>(null);
  const ingRef = React.useRef<IngredientsRef>(null);
  const stepsRef = React.useRef<StepsRef>(null);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [recipe, setRecipe] = React.useState<any>(null);

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/recipes');
      return;
    }

    const fetchRecipe = async () => {
      try {
        const recipeData = await getRecipe(id as string);
        setRecipe(recipeData);
        
        // Check if user is the author
        const author = recipeData.author || recipeData.user;
        const isAuthor = user && author && (user.id === author.id || user.id === recipeData.userId);
        
        if (!isAuthor) {
          toast.error('You can only edit your own recipes');
          router.push('/recipes');
          return;
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
        toast.error('Failed to load recipe');
        router.push('/recipes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id, isAuthenticated, user, router]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setIsSubmitting(true);

    try {
      // Get data from child components
      const general: GeneralInfo | undefined = giRef.current?.getData();
      const ingredients: Ingredient[] | undefined = ingRef.current?.getData();
      const steps: RecipeStep[] | undefined = stepsRef.current?.getData();

      if (!general || !ingredients || !steps) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Validate required fields
      if (!general.title?.trim()) {
        toast.error('Recipe title is required');
        return;
      }

      if (ingredients.length === 0) {
        toast.error('Please add at least one ingredient');
        return;
      }

      if (steps.length === 0) {
        toast.error('Please add at least one cooking step');
        return;
      }

      let imageUrl: string | undefined;

      // Upload new image if provided
      const imageFile = giRef.current?.getImageFile();
      if (imageFile) {
        toast.loading('Uploading image...', { id: 'upload' });
        try {
          imageUrl = await uploadImageClientSide(imageFile, 'recipe');
          toast.success('Image uploaded successfully', { id: 'upload' });
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          toast.error('Failed to upload image. Please try again.', { id: 'upload' });
          return;
        }
      } else {
        // Use existing image if no new image uploaded
        imageUrl = giRef.current?.getExistingImageUrl() || undefined;
      }

      // Prepare recipe data
      const recipeData: CreateRecipeRequest = {
        general,
        ingredients: ingredients.filter(ing => ing.name?.trim()), // Filter out empty ingredients
        steps: steps.filter(step => step.title?.trim() && step.description?.trim()), // Filter out empty steps
        imageUrl
      };

      // Submit to API
      toast.loading('Updating recipe...', { id: 'update' });
      
      const result = await updateRecipe(id as string, recipeData);
      
      toast.success('Recipe updated successfully!', { id: 'update' });
      
      // Redirect to the recipe page
      setTimeout(() => {
        router.push(`/recipes/${id}`);
      }, 1500);

    } catch (error: any) {
      console.error('Error updating recipe:', error);
      const errorMessage = error.message || 'Failed to update recipe. Please try again.';
      toast.error(errorMessage, { id: 'update' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner loading={true} />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Recipe Not Found</h2>
          <p className="text-gray-600">The recipe you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            style: {
              background: '#059669',
            },
          },
          error: {
            style: {
              background: '#DC2626',
            },
          },
        }}
      />
      <form onSubmit={handleUpdate} className="mx-auto max-w-6xl px-4 py-6">
        <LoadingSpinner loading={isSubmitting} />
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-sm font-medium text-text-primary uppercase">
              Edit recipe
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => router.push(`/recipes/${id}`)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-amber-500 hover:bg-amber-500/90 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update recipe'
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[360px_1fr]">
          <div className="self-start">
            <GeneralInformation 
              ref={giRef} 
              initial={{
                title: recipe.title,
                description: recipe.description,
                category: recipe.category,
                difficulty: recipe.difficulty,
                servings: recipe.servings,
                cookTime: recipe.cookingTime,
                prepTime: recipe.prepTime,
                image: recipe.image
              }} 
            />
          </div>
          <div className="space-y-6">
            <Ingredients 
              ref={ingRef} 
              initial={recipe.ingredients?.map((ing: any) => ({
                id: ing.id,
                name: ing.name,
                quantity: ing.quantity,
                unit: ing.unit,
                note: ing.note
              }))} 
            />
            <Steps 
              ref={stepsRef} 
              initial={recipe.steps?.map((step: any) => ({
                id: step.id,
                title: step.title,
                description: step.description
              }))} 
            />
          </div>
        </div>
      </form>
    </>
  );
}