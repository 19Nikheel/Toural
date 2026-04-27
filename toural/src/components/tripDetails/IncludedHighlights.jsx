import React from "react";
import Card from "../ui/Card";

export const IncludedHighlights = ({ highlights }) => {
  if (!highlights) return null;

  const highlightsArray = highlights
    .map((h) => h.trim())
    .filter((h) => h.length > 0);

  if (!highlightsArray.length) return null;

  return (
    <Card padding="p-5" className="w-full">
      <h2 className="mb-2 text-sm font-semibold text-[#C9622A]">
        Key Highlights
      </h2>

      <ul className="space-y-2 text-[0.8rem] text-[#555]">
        {highlightsArray.map((h, index) => (
          <li key={`${h}-${index}`} className="flex items-start gap-2">
            <span className="text-[#F4A261]">➤</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};
