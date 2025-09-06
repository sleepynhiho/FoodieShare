"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GeneralInfo,
  Category,
  Difficulty,
  GeneralInfoRef,
} from "@/types/recipe";

type Props = {
  initial?: Partial<GeneralInfo>;
};

const difficulties: Difficulty[] = ["Easy", "Medium", "Hard"];
const categories: Category[] = [
  "Main Dish",
  "Side Dish",
  "Dessert",
  "Soup",
  "Salad",
  "Appetizer",
  "Beverage",
];

const GeneralInformation = React.forwardRef<GeneralInfoRef, Props>(
  ({ initial }, ref) => {
    const [title, setTitle] = React.useState(initial?.title ?? "");
    const [description, setDescription] = React.useState(
      initial?.description ?? ""
    );
    const [servings, setServings] = React.useState(
      initial?.servings?.toString() ?? ""
    );
    const [cookTime, setCookTime] = React.useState(
      initial?.cookTime?.toString() ?? ""
    );
    const [prepTime, setPrepTime] = React.useState(
      initial?.prepTime?.toString() ?? ""
    );
    const [cover, setCover] = React.useState<File | null>(null);
    const [difficulty, setDifficulty] = React.useState<Difficulty>(
      initial?.difficulty ?? difficulties[0]
    );
    const [category, setCategory] = React.useState<Category>(
      initial?.category ?? categories[0]
    );

    // ---- expose dữ liệu hiện tại cho parent khi gọi giRef.current.getData() ----
    React.useImperativeHandle(ref, () => ({
      getData: (): GeneralInfo => ({
        title,
        description,
        servings: Number(servings) || 0,
        cookTime: Number(cookTime) || 0,
        prepTime: Number(prepTime) || 0,
        difficulty,
        category,
        image: cover ? cover.name : undefined, // hoặc upload xử lý khác
      }),
    }));

    return (
      <Card className="md:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base text-text-muted uppercase">
            Recipe General Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Upload */}
          <div>
            <Label className="mb-2 block">Upload Photo</Label>
            <div className="rounded-2xl border-2 border-dashed p-6 text-center">
              <input
                type="file"
                accept="image/*"
                id="cover"
                className="hidden"
                onChange={(e) => setCover(e.target.files?.[0] ?? null)}
              />
              <label
                htmlFor="cover"
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm text-text-primary hover:bg-muted"
              >
                <Upload className="h-5 w-5" />
                {cover
                  ? "Change photo"
                  : "Show your finished dish (PNG/JPEG ≤10MB)"}
              </label>
              {cover && <p className="mt-2 text-xs">{cover.name}</p>}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Recipe name</Label>
            <Input
              id="title"
              required
              placeholder="Shaking Beef"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              required
              placeholder="A classic Vietnamese stir-fry beef dish with tender cubes of beef, colorful bell peppers, and savory sauce."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-20"
            />
          </div>

          {/* Category + Difficulty */}
          <div className="grid md:grid-cols-5 md:gap-4 gap-5 md:space-y-0">
            <div className="md:col-span-3 space-y-2">
              <Label>Category</Label>
              <Select
                required
                value={category}
                onValueChange={(val: Category) => setCategory(val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent
                  side="bottom"
                  className="max-h-60 overflow-y-auto bg-white"
                >
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label>Difficulty</Label>
              <Select
                required
                value={difficulty}
                onValueChange={(val: Difficulty) => setDifficulty(val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent side="bottom" className="bg-white">
                  {difficulties.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Servings */}
          <div className="space-y-2">
            <Label htmlFor="servings">Number of serving</Label>
            <div className="flex items-center gap-2">
              <Input
                id="servings"
                required
                placeholder="2"
                type="number"
                min={1}
                value={servings}
                onChange={(e) => setServings(e.target.value)}
              />
              <span className="text-sm text-muted-foreground">person</span>
            </div>
          </div>

          {/* Prep Time */}
          <div className="space-y-2">
            <Label htmlFor="prep-time">Preparation time</Label>
            <div className="flex items-center gap-2">
              <Input
                id="prep-time"
                required
                placeholder="10"
                type="number"
                min={1}
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
              />
              <span className="text-sm text-muted-foreground">minute</span>
            </div>
          </div>

          {/* Cook Time */}
          <div className="space-y-2">
            <Label htmlFor="cooking-time">Cooking time</Label>
            <div className="flex items-center gap-2">
              <Input
                id="cooking-time"
                required
                placeholder="30"
                type="number"
                min={1}
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
              />
              <span className="text-sm text-muted-foreground">minute</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

GeneralInformation.displayName = "GeneralInformation";
export { GeneralInformation };
