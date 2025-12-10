import React from "react";
import Card from "../ui/Card";
import Pill from "../ui/Pill";
import RatingStars from "../ui/RatingStars";
import { useNavigate } from "react-router-dom";

const capitalize = (str = "") =>
  str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;

export default function FeaturedTripCard({ trip }) {
  const navigate = useNavigate();

  if (!trip) return null;

  // Use tour price as starting price (per person / per tour)
  const startingPrice =
    typeof trip.price === "number" ? Math.round(trip.price) : null;

  // id: object with timestamp (Mongo) or primitive fallback
  const tripId = trip.id.timestamp;

  const cityLabel =
    trip.cityName ||
    (trip.cityCode ? `City ${trip.cityCode}` : "Featured destination");

  // Optional suggested nights
  const nightsLabel =
    typeof trip.suggestedNights === "number" && trip.suggestedNights > 0
      ? `${trip.suggestedNights} night${trip.suggestedNights > 1 ? "s" : ""}`
      : null;

  // Optional rating fallback
  const ratingValue = typeof trip.rating === "number" ? trip.rating : 4.5;

  // Optional hero color fallback
  const heroColor = trip.heroColor || "from-emerald-500 to-sky-500";

  return (
    <Card
      onClick={() => navigate(`/trip/${tripId}`)}
      padding="p-0.5"
      className="relative overflow-hidden cursor-pointer border-slate-200/60 bg-slate-50/80 dark:border-white/8 dark:bg-white/5 hover:shadow-lg transition-shadow"
    >
      <div
        className={`relative h-30 w-full overflow-hidden rounded-3xl bg-gradient-to-r ${heroColor}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),transparent_60%)]" />
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="max-w-[70%]">
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-100/80">
                Featured itinerary
              </p>
              <h3 className="text-sm font-semibold text-white line-clamp-2">
                {trip.name}
              </h3>
              <p className="mt-1 text-[0.7rem] text-slate-100/90">
                {cityLabel}
              </p>
            </div>
            {nightsLabel && (
              <Pill variant="soft" className="bg-black/25 text-slate-100">
                {nightsLabel}
              </Pill>
            )}
          </div>

          <div className="flex items-center justify-between text-[0.75rem] text-slate-100">
            <RatingStars rating={ratingValue} size="xs" showValue={false} />
            {startingPrice && (
              <span>From ₹{startingPrice.toLocaleString("en-IN")}</span>
            )}
          </div>
        </div>
        <div className="pointer-events-none absolute -right-6 -top-10 h-20 w-20 rounded-full border border-white/40 bg-white/20 blur-xl" />
      </div>

      <div className="space-y-2 p-4 text-[0.75rem] text-slate-700 dark:text-slate-200">
        <p className="text-[0.7rem] text-slate-600 dark:text-slate-300">
          Includes curated experiences, local highlights, and a balanced
          day-wise flow.
        </p>
        <div className="flex flex-wrap gap-1.5">
          <Pill variant="subtle" className="text-[0.65rem] px-2 py-0.5">
            📍 {cityLabel}
          </Pill>
          {trip.bestSeason && (
            <Pill variant="subtle" className="text-[0.65rem] px-2 py-0.5">
              📅 Best: {trip.bestSeason}
            </Pill>
          )}
        </div>
      </div>
    </Card>
  );
}
