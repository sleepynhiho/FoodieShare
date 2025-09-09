import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

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
    <div className="space-y-8 p-4 bg-white rounded-xl shadow-md min-w-[150px]">
      {/* Cooking Time (rc-slider double handle) */}
      <div>
        <label className="block font-medium mb-2 text-base">Cooking Time</label>
        <div className="flex flex-col gap-2 items-center">
          <Slider
            range
            min={0}
            max={maxCook}
            value={[filters.minCookTime, filters.maxCookTime]}
            onChange={(val) => {
              if (Array.isArray(val)) {
                const [min, max] = val;
                onChange({ minCookTime: min, maxCookTime: max });
              }
            }}
            trackStyle={[{ backgroundColor: "#ffa319" }]}
            handleStyle={[
              { borderColor: "#ffa319", backgroundColor: "#ffa319" },
              { borderColor: "#ffa319", backgroundColor: "#ffa319" },
            ]}
            railStyle={{ backgroundColor: "#dde1e4" }}
          />
          <div className="flex justify-between w-full text-xs mt-1">
            <span>{filters.minCookTime} mins</span>
            <span>{filters.maxCookTime} mins</span>
          </div>
        </div>
      </div>
      {/* Preparation Time (rc-slider double handle) */}
      <div>
        <label className="block font-medium mb-2 text-base">
          Preparation Time
        </label>
        <div className="flex flex-col gap-2 items-center">
          <Slider
            range
            min={0}
            max={maxPrep}
            value={[filters.minPrepTime, filters.maxPrepTime]}
            onChange={(val) => {
              if (Array.isArray(val)) {
                const [min, max] = val;
                onChange({ minPrepTime: min, maxPrepTime: max });
              }
            }}
            trackStyle={[{ backgroundColor: "#ffa319" }]}
            handleStyle={[
              { borderColor: "#ffa319", backgroundColor: "#ffa319" },
              { borderColor: "#ffa319", backgroundColor: "#ffa319" },
            ]}
            railStyle={{ backgroundColor: "#dde1e4" }}
          />
          <div className="flex justify-between w-full text-xs mt-1">
            <span>{filters.minPrepTime} mins</span>
            <span>{filters.maxPrepTime} mins</span>
          </div>
        </div>
      </div>
      {/* Difficulty */}
      <div>
        <label className="block font-medium mb-2 text-base">Difficulty</label>
        <div className="flex flex-col w-full">
          {DIFFICULTY.map((dif) => {
            const checked = filters.difficulty.includes(dif);
            return (
              <label
                key={dif}
                className="flex items-center gap-2 cursor-pointer select-none mb-2"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    onChange({
                      difficulty: !checked
                        ? [...filters.difficulty, dif]
                        : filters.difficulty.filter((d) => d !== dif),
                    });
                  }}
                  className="hidden"
                />
                <span
                  className={`w-6 h-6 flex items-center justify-center rounded border transition-colors ${
                    checked
                      ? "bg-[#ffa319] border-[#ffa319]"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {checked && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="white"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L8.5 12.086l-3.793-3.793a1 1 0 00-1.414 1.414l4.5 4.5a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
                <span className="text-xs font-normal">{dif}</span>
              </label>
            );
          })}
        </div>
      </div>
      {/* Rating */}
      <div>
        <label className="block font-medium mb-2 text-base">Rating</label>
        {/* Mobile: 1 cột, md trở lên: 2 cột */}
        <div className="flex flex-col w-full md:grid md:grid-cols-2 md:gap-2">
          {RATINGS.map((r) => {
            const checked = filters.rating.includes(r);
            return (
              <label
                key={r}
                className="flex items-center gap-2 cursor-pointer select-none mb-2"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    onChange({
                      rating: !checked
                        ? [...filters.rating, r]
                        : filters.rating.filter((val) => val !== r),
                    });
                  }}
                  className="hidden"
                />
                <span
                  className={`w-6 h-6 flex items-center justify-center rounded border transition-colors ${
                    checked
                      ? "bg-[#ffa319] border-[#ffa319]"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {checked && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="white"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L8.5 12.086l-3.793-3.793a1 1 0 00-1.414 1.414l4.5 4.5a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
                <span className="text-xs font-normal">
                  {r === 0 ? "< 1 star" : r === 5 ? "5 stars" : `${r} stars  `}
                </span>
              </label>
            );
          })}
        </div>
      </div>
      {/* Clear Filters */}
      <button
        type="button"
        className="mt-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 font-normal text-sm"
        onClick={onClear}
      >
        Clear Filters
      </button>
    </div>
  );
};
