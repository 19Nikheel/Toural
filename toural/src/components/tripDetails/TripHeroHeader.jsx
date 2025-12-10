import React from "react";
import RatingStars from "../ui/RatingStars";
import Pill from "../ui/Pill";

export const TripHeroHeader = ({ destination }) => (
  <section className="rounded-3xl border border-slate-200/70 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-5 py-6 text-slate-50 shadow-[0_24px_90px_rgba(15,23,42,0.85)] dark:border-slate-700">
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-400">
          {destination.cityName} · India
        </p>
        <h1 className="text-2xl font-semibold md:text-3xl">
          {destination.name}
        </h1>
        <p className="max-w-xl text-[0.85rem] text-slate-300">
          Curated stay options, landmark experiences and a balanced day-wise
          plan around this destination.
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-[0.75rem]">
          <RatingStars rating="4.5" size="sm" />
          <span className="text-slate-300">· Highly rated by travellers</span>
          <span className="h-1 w-1 rounded-full bg-slate-500" />
          <span className="text-slate-300">
            Best season: {destination.bestSeason}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 text-right text-[0.8rem]">
        {/* <Pill
          variant="highlight"
          className="bg-emerald-400/15 text-emerald-200"
        >
          {destination.suggestedNights} nights suggested
        </Pill> */}
        {/* <p className="text-[0.8rem] text-slate-300">
          Perfect for{" "}
          <span className="font-medium text-slate-50">
            {destination.tags
              ? destination.tags
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .slice(0, 3)
                  .join(" · ")
              : null}
          </span>
        </p> */}
      </div>
    </div>
  </section>
);
