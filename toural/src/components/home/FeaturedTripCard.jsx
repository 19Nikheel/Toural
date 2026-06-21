import React from "react";
import Card from "../ui/Card";
import Pill from "../ui/Pill";
import RatingStars from "../ui/RatingStars";
import { useNavigate } from "react-router-dom";

const capitalize = (str = "") =>
  str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;

export default function FeaturedTripCard({ place }) {
  if (!place) return null;

  const placeId = place.uniq_id;

  const ratingValue =
    typeof place.google_review_rating === "number"
      ? place.google_review_rating
      : 4.5;

  const timeLabel = place.time_needed_to_visit_in_hrs
    ? `${place.time_needed_to_visit_in_hrs} hrs`
    : null;

  const feeLabel =
    place.entrance_fee_in_inr === 0
      ? "Free Entry"
      : `₹${place.entrance_fee_in_inr}`;

  const heroColor = "from-[#F4A261] to-[#C9622A]";
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/trip-details/`, { state: { place } })}
      padding="p-0.5"
      className="relative overflow-hidden border border-[#F4A261]/20 bg-white/70 backdrop-blur-xl hover:shadow-[0_8px_30px_rgba(244,162,97,0.2)] transition-all duration-200 rounded-2xl"
    >
      {/* TOP SECTION */}
      <div
        className={`relative h-32 w-full overflow-hidden rounded-2xl bg-gradient-to-r ${heroColor}`}
      >
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div>
            <p className="text-[0.7rem] uppercase tracking-wider text-white/80">
              Top Place
            </p>
            <h3 className="text-sm font-semibold text-white line-clamp-2">
              {place.name}
            </h3>
            <p className="text-[0.7rem] text-white/90">
              📍 {place.city}, {place.state}
            </p>
          </div>

          <div className="flex items-center justify-between text-white text-xs">
            <RatingStars rating={ratingValue} size="xs" showValue={false} />
            <span>{feeLabel}</span>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="space-y-2 p-4 text-[0.75rem] text-[#555]">
        <p className="text-[0.7rem] text-[#777]">
          {place.significance} • {place.type}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {timeLabel && (
            <Pill
              variant="subtle"
              className="text-[0.65rem] px-2 py-0.5 bg-[#F4A261]/10 text-[#C9622A] border border-[#F4A261]/20"
            >
              ⏱ {timeLabel}
            </Pill>
          )}

          {place.best_time_to_visit && (
            <Pill
              variant="subtle"
              className="text-[0.65rem] px-2 py-0.5 bg-[#F4A261]/10 text-[#C9622A] border border-[#F4A261]/20"
            >
              🌇 Best: {place.best_time_to_visit}
            </Pill>
          )}

          {place.dslr_allowed === "Yes" && (
            <Pill
              variant="subtle"
              className="text-[0.65rem] px-2 py-0.5 bg-[#F4A261]/10 text-[#C9622A] border border-[#F4A261]/20"
            >
              📷 DSLR Allowed
            </Pill>
          )}
        </div>
      </div>
    </Card>
  );
}
