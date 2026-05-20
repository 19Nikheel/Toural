import React from "react";
import RatingStars from "../ui/RatingStars";
import Pill from "../ui/Pill";

export const TripHeroHeader = ({ destination }) => (
  <section
    className="
      rounded-2xl border border-[#F4A261]/20 bg-white/80 backdrop-blur-[24px]
      text-[#1a1a1a] shadow-[0_12px_40px_rgba(244,162,97,0.12)]
      px-5 py-6
    "
  >
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* LEFT */}
      <div className="space-y-2">
        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[#C9622A]">
          {destination.cityName} · India
        </p>

        <h1 className="text-2xl font-serif font-semibold md:text-3xl">
          {destination.name}
        </h1>

        <p className="max-w-xl text-[0.85rem] text-[#777]">
          Curated stay options, landmark experiences and a balanced day-wise
          plan around this destination.
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-[0.75rem]">
          <RatingStars rating="4.5" size="sm" />
          <span className="text-[#777]">· Highly rated by travellers</span>
          <span className="h-1 w-1 rounded-full bg-[#F4A261]/50" />
          <span className="text-[#777]">
            Best season: {destination.bestSeason}
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end gap-2 text-right text-[0.8rem]">
        <p className="text-[#777]">
          Perfect for{" "}
          <span className="font-medium text-[#1a1a1a]">
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

        <div className="flex flex-wrap gap-1.5 justify-end">
          {destination.tags &&
            destination.tags
              .split(",")
              .slice(0, 3)
              .map((tag, i) => (
                <Pill key={i} className="text-[0.7rem]">
                  {tag.trim()}
                </Pill>
              ))}
        </div>
      </div>
    </div>
  </section>
);
