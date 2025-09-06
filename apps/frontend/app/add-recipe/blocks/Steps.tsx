"use client";
import * as React from "react";
import { v4 as uuid } from "uuid";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UIStep, RecipeStep, StepsRef } from "@/types/recipe";

type Props = {
  initial?: UIStep[];
};

const Steps = React.forwardRef<StepsRef, Props>(({ initial }, ref) => {
  const [steps, setSteps] = React.useState<UIStep[]>(
    initial && initial.length
      ? initial
      : [{ id: uuid(), title: "", description: "" }]
  );

  const add = () =>
    setSteps((p) => [...p, { id: uuid(), title: "", description: "" }]);
  const remove = (id: string) => setSteps((p) => p.filter((d) => d.id !== id));
  const patch = (id: string, partial: Partial<UIStep>) =>
    setSteps((p) => p.map((d) => (d.id === id ? { ...d, ...partial } : d)));

  // expose getData: strip id tạm
  React.useImperativeHandle(ref, () => ({
    getData: () =>
      steps.map<RecipeStep>((s) => ({
        title: s.title?.trim() ?? "",
        description: s.description?.trim() ?? "",
      })),
  }));

  return (
    <Card className="md:shadow-md md:shadow-gray-100">
      <CardContent className="space-y-3">
        <Label>Steps</Label>

        {steps.map((step, idx) => (
          <div
            key={step.id}
            className="items-start gap-3 rounded-xl border p-3"
          >
            <div className="grid grid-cols-12 gap-3 gap-y-2">
              {/* index */}
              <div className="col-span-1 text-center text-sm text-muted-foreground">
                {String(idx + 1).padStart(2, "0")}
              </div>

              {/* title */}
              <div className="col-span-10">
                <Input
                  required
                  placeholder="Marinate beef"
                  value={step.title}
                  onChange={(e) => patch(step.id, { title: e.target.value })}
                />
              </div>

              {/* remove */}
              <div className="col-span-1 flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(step.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* description */}
              <Textarea
                required
                placeholder="Mix beef with oyster sauce, soy sauce, and sugar. Let sit for 15 minutes."
                value={step.description}
                onChange={(e) =>
                  patch(step.id, { description: e.target.value })
                }
                className="min-h-[72px] col-span-10 col-start-2"
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
          <Plus className="mr-2 h-4 w-4" /> Add step
        </Button>
      </CardContent>
    </Card>
  );
});

Steps.displayName = "Steps";
export { Steps };
