import React from "react";
import Card from "../ui/Card";
import Pill from "../ui/Pill";

const capitalize = (str = "") =>
  str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;

export const TripSummaryCard = ({ destination }) => {
  if (!destination) return null;

  const basePrice =
    typeof destination.price === "number"
      ? Math.round(destination.price)
      : null;

  // tags can be a comma separated string or array
  const tagsArray =
    typeof destination.tags === "string"
      ? destination.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : Array.isArray(destination.tags)
      ? destination.tags.filter(Boolean)
      : [];

  return (
    <Card padding="p-5" className="w-full">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Trip summary
          </h2>
          <Pill variant="subtle" className="text-[0.7rem]">
            Sample pricing
          </Pill>
        </div>

        <div className="flex flex-col gap-1 text-sm">
          <div>
            <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
              Starting from
            </p>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              {basePrice
                ? `₹${basePrice.toLocaleString("en-IN")}`
                : "Contact for pricing"}
            </p>
          </div>

          {destination.cityName && (
            <p className="text-[0.75rem] text-slate-600 dark:text-slate-300">
              📍 {destination.cityName}
            </p>
          )}

          {destination.bestSeason && (
            <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
              Best season:{" "}
              <span className="text-slate-800 dark:text-slate-100">
                {destination.bestSeason}
              </span>
            </p>
          )}
        </div>

        {tagsArray.length > 0 && (
          <div className="flex flex-wrap gap-1.5 text-[0.7rem] mt-1">
            {tagsArray.map((tag, index) => (
              <Pill
                key={`${tag}-${index}`}
                variant="subtle"
                className="px-2 py-0.5 text-[0.7rem]"
              >
                {capitalize(tag)}
              </Pill>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
