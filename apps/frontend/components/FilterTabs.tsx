import React from "react";
import { RECIPE_CATEGORIES, CATEGORY_DISPLAY_NAMES } from "@/lib/constants";
import { Category } from "@/types";

interface FilterTabsProps {
  selected: Category | "All";
  onSelect: (category: Category | "All") => void;
  vertical?: boolean;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({ selected, onSelect, vertical }) => {
  return (
    <div className={`gap-2 mb-4 ${vertical ? "flex flex-col" : "flex flex-row flex-nowrap overflow-x-auto"}`}>
      <button
        key="All"
        className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
          selected === "All"
            ? "bg-orange-400 text-white border-orange-400"
            : "bg-white text-gray-700 border-gray-300 hover:bg-orange-100"
        }`}
        onClick={() => onSelect("All")}
      >
        All
      </button>
      {RECIPE_CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
            selected === cat
              ? "bg-orange-400 text-white border-orange-400"
              : "bg-white text-gray-700 border-gray-300 hover:bg-orange-100"
          }`}
          onClick={() => onSelect(cat)}
        >
          {CATEGORY_DISPLAY_NAMES[cat]}
        </button>
      ))}
    </div>
  );
};
