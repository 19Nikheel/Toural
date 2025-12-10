import React from "react";
import RatingStars from "../ui/RatingStars";
import Pill from "../ui/Pill";

export const TripHeroHeader = ({ destination }) => (
  <section
    className="
      rounded-3xl border border-slate-300/60 bg-gradient-to-br
      from-slate-100 via-slate-50 to-white 
      text-slate-900 shadow-[0_24px_90px_rgba(0,0,0,0.08)]
      
      dark:border-slate-700 
      dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 
      dark:text-slate-50 dark:shadow-[0_24px_90px_rgba(15,23,42,0.85)]
      
      px-5 py-6
    "
  >
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          {destination.cityName} · India
        </p>

        <h1 className="text-2xl font-semibold md:text-3xl">
          {destination.name}
        </h1>

        <p className="max-w-xl text-[0.85rem] text-slate-600 dark:text-slate-300">
          Curated stay options, landmark experiences and a balanced day-wise
          plan around this destination.
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-[0.75rem]">
          <RatingStars rating="4.5" size="sm" />
          <span className="text-slate-600 dark:text-slate-300">
            · Highly rated by travellers
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-500" />
          <span className="text-slate-600 dark:text-slate-300">
            Best season: {destination.bestSeason}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 text-right text-[0.8rem]">
        <p className="text-[0.8rem] text-slate-600 dark:text-slate-300">
          Perfect for{" "}
          <span className="font-medium text-slate-900 dark:text-slate-50">
            {destination.tags
              ? destination.tags
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .slice(0, 3)
                  .join(" · ")
              : null}
          </span>
        </p>
      </div>
    </div>
  </section>
);
