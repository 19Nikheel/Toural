import React from "react";
import Card from "../ui/Card";
import Pill from "../ui/Pill";
import RatingStars from "../ui/RatingStars";

export default function FeaturedTripCard({ trip }) {
  const avgStayPrice =
    trip.stayOptions && trip.stayOptions.length
      ? Math.round(
          trip.stayOptions.reduce((sum, s) => sum + s.pricePerNight, 0) /
            trip.stayOptions.length
        )
      : null;

  return (
    <Card
      padding="p-0.5"
      className="relative overflow-hidden border-slate-200/60 bg-slate-50/80 dark:border-white/8 dark:bg-white/5"
    >
      <div
        className={`relative h-28 w-full overflow-hidden rounded-3xl bg-gradient-to-r ${trip.heroColor}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),transparent_60%)]" />
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="max-w-[70%]">
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-100/80">
                Featured itinerary
              </p>
              <h3 className="text-sm font-semibold text-white">
                {trip.name}
              </h3>
              <p className="mt-1 text-[0.7rem] text-slate-100/90">
                {trip.region} · {trip.country}
              </p>
            </div>
            <Pill variant="soft" className="bg-black/25 text-slate-100">
              {trip.suggestedNights} nights
            </Pill>
          </div>

          <div className="flex items-center justify-between text-[0.75rem] text-slate-100">
            <RatingStars rating={trip.rating} size="xs" showValue={false} />
            {avgStayPrice && (
              <span>From ₹{avgStayPrice.toLocaleString("en-IN")} / night</span>
            )}
          </div>
        </div>
        <div className="pointer-events-none absolute -right-6 -top-10 h-20 w-20 rounded-full border border-white/40 bg-white/20 blur-xl" />
      </div>

      <div className="space-y-2 p-4 text-[0.75rem] text-slate-700 dark:text-slate-200">
        <p className="text-[0.7rem] text-slate-600 dark:text-slate-300">
          Includes curated stays, local experiences, and a balanced day-wise
          plan.
        </p>
        <div className="flex flex-wrap gap-1.5">
          <Pill variant="subtle" className="text-[0.65rem] px-2 py-0.5">
            🏨 Handpicked stays
          </Pill>
          <Pill variant="subtle" className="text-[0.65rem] px-2 py-0.5">
            📍 Tourist hotspots
          </Pill>
          <Pill variant="subtle" className="text-[0.65rem] px-2 py-0.5">
            📅 Best: {trip.bestSeason}
          </Pill>
        </div>
      </div>
    </Card>
  );
}
