import React from "react";

export const HighlightsList = ({ items }) => {
  if (!items || !items.length) return null;

  return (
    <ul className="mt-2 space-y-1 text-[0.8rem] text-slate-600 dark:text-slate-300">
      {items.slice(0, 4).map((item) => (
        <li key={item} className="flex items-start gap-1.5">
          <span className="mt-[2px] text-[0.7rem]">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};
