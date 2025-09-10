"use client";
import * as React from "react";
import { v4 as uuid } from "uuid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import {
  Ingredient,
  IngredientsRef,
  IngredientUnit,
  UIIngredient,
} from "@/types/recipe";

type Props = {
  initial?: UIIngredient[];
};

const unitOptions = Object.values(IngredientUnit);

const Ingredients = React.forwardRef<IngredientsRef, Props>(
  ({ initial }, ref) => {
    const [items, setItems] = React.useState<UIIngredient[]>(
      initial?.map((i) => ({
        ...i,
        id: i.id ?? crypto.randomUUID?.() ?? uuid(),
      })) ?? [
        {
          id: uuid(),
          name: "",
          quantity: 1,
          unit: IngredientUnit.g,
          note: "",
        },
      ]
    );

    const add = () =>
      setItems((p) => [
        ...p,
        {
          id: uuid(),
          name: "",
          quantity: 1,
          unit: IngredientUnit.g,
          note: "",
        },
      ]);

    const remove = (id: string) =>
      setItems((p) => p.filter((i) => i.id !== id));

    const patch = (id: string, partial: Partial<UIIngredient>) =>
      setItems((p) => p.map((i) => (i.id === id ? { ...i, ...partial } : i)));

    // expose getData for parent
    React.useImperativeHandle(ref, () => ({
      getData: () =>
        items.map<Ingredient>((i) => ({
          name: i.name?.trim() ?? "",
          quantity:
            i.quantity === undefined ||
            i.quantity === null ||
            i.quantity === ("" as any)
              ? undefined
              : Number(i.quantity),
          unit: i.unit,
          note: i.note?.trim() || undefined,
        })),
    }));

    return (
      <Card className="md:shadow-md md:shadow-gray-100">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-base text-text-muted uppercase">
            Recipe Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label htmlFor="servings">Ingredients</Label>

          {items.map((ing, idx) => (
            <div
              key={ing.id}
              className="grid grid-cols-12 items-center gap-3 rounded-xl border p-3"
            >
              {/* index */}
              <div className="col-span-1 text-center text-sm text-muted-foreground">
                {String(idx + 1).padStart(2, "0")}
              </div>

              {/* quantity */}
              <div className="col-span-2">
                <Label className="sr-only">Quantity</Label>
                <Input
                  type="number"
                  required
                  min={1}
                  value={ing.quantity ?? ""}
                  onChange={(e) =>
                    patch(ing.id, {
                      quantity:
                        e.target.value === ""
                          ? ("" as any)
                          : Math.max(1, Number(e.target.value)),
                    })
                  }
                  placeholder="1"
                  className="font-medium"
                />
              </div>

              {/* unit */}
              <div className="col-span-2">
                <Label className="sr-only">Unit</Label>
                <Select
                  value={(ing.unit as string) ?? ""}
                  onValueChange={(v) =>
                    patch(ing.id, { unit: v as IngredientUnit })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="unit" />
                  </SelectTrigger>
                  <SelectContent
                    side="bottom"
                    className="max-h-48 overflow-y-scroll bg-white"
                  >
                    {unitOptions.map((u) => (
                      <SelectItem key={u} value={u}>
                        {u}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* name */}
              <div className="col-span-6">
                <Input
                  required
                  placeholder="Beef sirloin cubes"
                  value={ing.name}
                  onChange={(e) => patch(ing.id, { name: e.target.value })}
                />
              </div>

              {/* remove */}
              <div className="col-span-1 flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(ing.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* note */}
              <div className="col-span-11">
                <Input
                  placeholder="Note: Detailed specific size, shape, etc."
                  value={ing.note ?? ""}
                  onChange={(e) => patch(ing.id, { note: e.target.value })}
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full btnBorder-border-primary text-text-primary hover:bg-bg-secondary hover:text-white"
            onClick={add}
          >
            <Plus className="mr-2 h-4 w-4" /> Add ingredient
          </Button>
        </CardContent>
      </Card>
    );
  }
);

Ingredients.displayName = "Ingredients";
export { Ingredients };
