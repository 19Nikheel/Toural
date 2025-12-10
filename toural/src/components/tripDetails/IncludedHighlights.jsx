import React from "react";
import Card from "../ui/Card";

export const IncludedHighlights = ({ highlights }) => {
  if (!highlights) return null;

  // Convert comma-separated string → array (trim to remove spaces)
  const highlightsArray = highlights
    .map((h) => h.trim())
    .filter((h) => h.length > 0);

  if (!highlightsArray.length) return null;

  return (
    <Card padding="p-5" className="w-full">
      <h2 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-50">
        Key Highlights
      </h2>
      <ul className="space-y-1.5 text-[0.8rem] text-slate-600 dark:text-slate-300">
        {highlightsArray.map((h, index) => (
          <li key={`${h}-${index}`} className="flex items-start gap-2">
            {">"} <span>{h}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};
