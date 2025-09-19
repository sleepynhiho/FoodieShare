"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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
import { GeneralInformation, Ingredients, Steps } from "./blocks";
import { uploadImageClientSide } from "@/services/imageUploadService";
import { createRecipe, CreateRecipeRequest } from "@/services/recipeService";

export default function NewRecipePage() {
  const giRef = React.useRef<GeneralInfoRef>(null);
  const ingRef = React.useRef<IngredientsRef>(null);
  const stepsRef = React.useRef<StepsRef>(null);
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handlePublish = async (e: React.FormEvent<HTMLFormElement>) => {
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

      // Upload image if provided
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
      }

      // Prepare recipe data
      const recipeData: CreateRecipeRequest = {
        general,
        ingredients: ingredients.filter(ing => ing.name?.trim()), // Filter out empty ingredients
        steps: steps.filter(step => step.title?.trim() && step.description?.trim()), // Filter out empty steps
        imageUrl
      };

      // Submit to API
      toast.loading('Publishing recipe...', { id: 'publish' });
      
      const result = await createRecipe(recipeData);
      
      toast.success('Recipe published successfully!', { id: 'publish' });
      
      // Redirect to the new recipe page or recipes list
      setTimeout(() => {
        router.push('/recipes');
      }, 1500);

    } catch (error: any) {
      console.error('Error publishing recipe:', error);
      const errorMessage = error.message || 'Failed to publish recipe. Please try again.';
      toast.error(errorMessage, { id: 'publish' });
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <form onSubmit={handlePublish} className="mx-auto max-w-6xl px-4 py-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-sm font-medium text-text-primary uppercase">
              Create new recipe
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* <Button type="button" variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Save for me
            </Button> */}
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-amber-500 hover:bg-amber-500/90 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                'Publish recipe'
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[360px_1fr]">
          <div className="self-start">
            <GeneralInformation ref={giRef} />
          </div>
          <div className="space-y-6">
            <Ingredients ref={ingRef} />
            <Steps ref={stepsRef} />
          </div>
        </div>
      </form>
    </>
  );
}
