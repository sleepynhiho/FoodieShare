import React from "react";

interface RecipeFiltersProps {
  filters: {
    minCookTime: number;
    maxCookTime: number;
    minPrepTime: number;
    maxPrepTime: number;
    difficulty: string[];
    rating: number[];
    sortBy: string;
    sortOrder?: "asc" | "desc";
  };
  onChange: (filters: Partial<RecipeFiltersProps["filters"]>) => void;
  onClear: () => void;
  maxCookTime?: number;
  maxPrepTime?: number;
}

const DIFFICULTY = ["Easy", "Medium", "Hard"];
const RATINGS = [0, 1, 2, 3, 4, 5];
const SORT_OPTIONS = ["Star", "Time", "Title"];
const SORT_ORDER_OPTIONS = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
];

export const RecipeFilters: React.FC<RecipeFiltersProps> = ({
  filters,
  onChange,
  onClear,
  maxCookTime,
  maxPrepTime,
}) => {
  // Ưu tiên dùng giá trị truyền qua props, fallback về 180 nếu không có
  const maxCook = maxCookTime ?? 180;
  const maxPrep = maxPrepTime ?? 180;

  return (
    <div className="space-y-8 p-4 bg-white rounded-xl shadow-md">
      {/* Cooking Time */}
      <div>
        <label className="block font-bold mb-2 text-lg">Cooking Time</label>
        <div className="flex flex-col gap-2 items-center">
          <div className="w-full flex gap-2 items-center">
            <input
              type="range"
              min={0}
              max={maxCook}
              value={filters.minCookTime}
              onChange={(e) =>
                onChange({ minCookTime: Number(e.target.value) })
              }
              className="w-full accent-orange-400"
            />
            <input
              type="range"
              min={0}
              max={maxCook}
              value={filters.maxCookTime}
              onChange={(e) =>
                onChange({ maxCookTime: Number(e.target.value) })
              }
              className="w-full accent-orange-400"
            />
          </div>
          <div className="flex justify-between w-full text-xs mt-1">
            <span>{filters.minCookTime} mins</span>
            <span>{filters.maxCookTime} mins</span>
          </div>
        </div>
      </div>
      {/* Preparation Time */}
      <div>
        <label className="block font-bold mb-2 text-lg">Preparation Time</label>
        <div className="flex flex-col gap-2 items-center">
          <div className="w-full flex gap-2 items-center">
            <input
              type="range"
              min={0}
              max={maxPrep}
              value={filters.minPrepTime}
              onChange={(e) =>
                onChange({ minPrepTime: Number(e.target.value) })
              }
              className="w-full accent-orange-400"
            />
            <input
              type="range"
              min={0}
              max={maxPrep}
              value={filters.maxPrepTime}
              onChange={(e) =>
                onChange({ maxPrepTime: Number(e.target.value) })
              }
              className="w-full accent-orange-400"
            />
          </div>
          <div className="flex justify-between w-full text-xs mt-1">
            <span>{filters.minPrepTime} mins</span>
            <span>{filters.maxPrepTime} mins</span>
          </div>
        </div>
      </div>
      {/* Difficulty */}
      <div>
        <label className="block font-bold mb-2 text-lg">Difficulty</label>
        <div className="flex gap-2 flex-wrap">
          {DIFFICULTY.map((dif) => (
            <button
              key={dif}
              type="button"
              className={`px-4 py-2 rounded-full border font-semibold text-sm transition-colors
                ${
                  filters.difficulty.includes(dif)
                    ? "bg-orange-400 text-white border-orange-400"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              onClick={() => {
                const checked = !filters.difficulty.includes(dif);
                onChange({
                  difficulty: checked
                    ? [...filters.difficulty, dif]
                    : filters.difficulty.filter((d) => d !== dif),
                });
              }}
            >
              {dif}
            </button>
          ))}
        </div>
      </div>
      {/* Rating */}
      <div>
        <label className="block font-bold mb-2 text-lg">Rating</label>
        <div className="flex gap-2 flex-wrap">
          {RATINGS.map((r) => (
            <button
              key={r}
              type="button"
              className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold text-sm transition-colors
                ${
                  filters.rating.includes(r)
                    ? "bg-yellow-400 text-white border-yellow-400"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              onClick={() => {
                const checked = !filters.rating.includes(r);
                onChange({
                  rating: checked
                    ? [...filters.rating, r]
                    : filters.rating.filter((val) => val !== r),
                });
              }}
            >
              {r === 0 ? "<1" : r === 5 ? "5" : `${r}+`}
            </button>
          ))}
        </div>
      </div>
      {/* Sort */}
      <div className="flex gap-4 items-end flex-wrap md:flex-nowrap">
        <div>
          <label className="block font-bold mb-2 text-lg">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => onChange({ sortBy: e.target.value })}
            className="border rounded px-2 py-1"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-bold mb-2 text-lg">Order</label>
          <select
            value={filters.sortOrder || "desc"}
            onChange={(e) =>
              onChange({ sortOrder: e.target.value as "asc" | "desc" })
            }
            className="border rounded px-2 py-1"
          >
            {SORT_ORDER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Clear Filters */}
      <button
        type="button"
        className="mt-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 font-semibold"
        onClick={onClear}
      >
        Clear Filters
      </button>
    </div>
  );
};
