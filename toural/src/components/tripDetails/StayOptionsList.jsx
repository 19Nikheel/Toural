import React from "react";
import Card from "../ui/Card";
import RatingStars from "../ui/RatingStars";

export const StayOptionsList = ({ stays }) => {
  if (!stays || !stays.length) return null;

  return (
    <Card padding="p-5" className="w-full">
      <h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-50">
        Stay options
      </h2>
      <div className="flex flex-col gap-3">
        {stays.map((stay) => (
          <div
            key={stay.name}
            className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 px-3 py-2 text-[0.8rem] dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="flex flex-col gap-0.5">
              <p className="text-[0.85rem] font-medium text-slate-900 dark:text-slate-50">
                {stay.name}
              </p>
              <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
                {stay.type}
              </p>
              <div className="flex items-center gap-2">
                <RatingStars rating={stay.rating} size="xs" />
                <span className="text-[0.7rem] text-slate-500 dark:text-slate-400">
                  {stay.perks?.slice(0, 2).join(" · ")}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                ₹{stay.pricePerNight.toLocaleString("en-IN")}
              </p>
              <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
                per night
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
