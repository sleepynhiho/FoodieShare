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
import { CATEGORY_DISPLAY_NAMES } from "@/lib/constants";

type Props = {
  initial?: Partial<GeneralInfo>;
};

const difficulties: Difficulty[] = ["Easy", "Medium", "Hard"];
const categories: Category[] = [
  "MainDish",
  "SideDish",
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
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const [initialImageUrl, setInitialImageUrl] = React.useState(
      initial?.image ?? ""
    );
    const [difficulty, setDifficulty] = React.useState<Difficulty>(
      initial?.difficulty ?? difficulties[0]
    );
    const [category, setCategory] = React.useState<Category>(
      initial?.category ?? categories[0]
    );

    // Handle file selection and preview
    const handleFileChange = (file: File | null) => {
      setCover(file);
      
      // Clean up previous preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      
      // Create new preview URL
      if (file) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    };

    // Clean up preview URL on unmount
    React.useEffect(() => {
      return () => {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
      };
    }, [previewUrl]);

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
        image: cover ? cover.name : initialImageUrl, // Use existing image if no new file
      }),
      getImageFile: (): File | null => cover, // New method to get the actual file
      getExistingImageUrl: (): string => initialImageUrl, // New method to get existing image URL
    }));

    return (
      <Card className="md:shadow-md md:shadow-gray-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base text-text-muted uppercase">
            Recipe General Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Upload */}
          <div>
            <Label className="mb-2 block">Upload Photo</Label>
            
            {/* Show preview of selected image */}
            {previewUrl && (
              <div className="mb-4">
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleFileChange(null)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-600">Preview of selected image</p>
              </div>
            )}

            {/* Show existing image if available and no new file selected */}
            {initialImageUrl && !cover && !previewUrl && (
              <div className="mb-4">
                <div className="relative">
                  <img
                    src={initialImageUrl}
                    alt="Current recipe"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setInitialImageUrl("")}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-600">Current image</p>
              </div>
            )}
            
            <div className="rounded-2xl border-2 border-dashed p-6 text-center">
              <input
                type="file"
                accept="image/*"
                id="cover"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
              />
              <label
                htmlFor="cover"
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm text-text-primary hover:bg-muted"
              >
                <Upload className="h-5 w-5" />
                {cover || previewUrl
                  ? "Change photo"
                  : initialImageUrl
                  ? "Upload new photo"
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
                      {CATEGORY_DISPLAY_NAMES[c]}
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
