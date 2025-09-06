"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

import {
  GeneralInfo,
  GeneralInfoRef,
  Ingredient,
  IngredientsRef,
  RecipeStep,
  StepsRef,
} from "@/types/recipe";
import { GeneralInformation, Ingredients, Steps } from "./blocks";

export default function NewRecipePage() {
  const giRef = React.useRef<GeneralInfoRef>(null);
  const ingRef = React.useRef<IngredientsRef>(null);
  const stepsRef = React.useRef<StepsRef>(null);

  const handlePublish = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Get data from child components
    const general: GeneralInfo | undefined = giRef.current?.getData();
    const ingredients: Ingredient[] | undefined = ingRef.current?.getData();
    const steps: RecipeStep[] | undefined = stepsRef.current?.getData();

    if (!general || !ingredients || !steps) return;

    const payload = { general, ingredients, steps };
    // console.log("PUBLISH PAYLOAD:", payload);
  };

  return (
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
          <Button type="submit" className="bg-amber-500 hover:bg-amber-500/90">
            Publish recipe
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
  );
}
