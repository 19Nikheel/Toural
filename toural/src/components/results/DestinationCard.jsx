import React from "react";
import Card from "../ui/Card";
import Pill from "../ui/Pill";
import RatingStars from "../ui/RatingStars";
import { useNavigate } from "react-router-dom";

const DestinationCard = ({ place }) => {
  if (!place) return null;

  const rating = place.google_review_rating || 4.5;

  const feeLabel =
    place.entrance_fee_in_inr === 0
      ? "Free Entry"
      : `₹${place.entrance_fee_in_inr}`;

  const timeLabel = place.time_needed_to_visit_in_hrs
    ? `${place.time_needed_to_visit_in_hrs} hrs`
    : "N/A";

  const featuresArray =
    typeof place.features === "string" ? place.features.split(" ") : [];

  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/trip-details/`, { state: { place } })}
      className="w-full"
    >
      <div className="flex flex-col gap-3 md:flex-row">
        {/* LEFT */}
        <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#F4A261] to-[#C9622A] p-4 text-white md:max-w-[260px]">
          <div>
            <p className="text-[0.7rem] uppercase tracking-wider text-white/80">
              {place.city}, {place.state}
            </p>
            <h3 className="mt-1 text-base font-semibold md:text-lg">
              {place.name}
            </h3>
            <p className="text-[0.7rem] text-white/80">
              {place.type} • {place.significance}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm">
            <RatingStars rating={rating} size="xs" showValue={false} />
            <span>{feeLabel}</span>
          </div>

          <div className="pointer-events-none absolute -right-8 -top-8 h-16 w-16 rounded-full border border-white/30 bg-white/20 blur-xl" />
        </div>

        {/* RIGHT */}
        <div className="flex flex-[2] flex-col gap-3">
          {/* TAGS */}
          <div className="flex flex-wrap gap-1.5 text-[0.7rem]">
            <Pill variant="subtle">Zone: {place.zone}</Pill>
            <Pill variant="subtle">
              Established: {place.establishment_year}
            </Pill>
          </div>

          {/* FEATURES */}
          <div className="flex flex-wrap gap-1.5">
            {featuresArray.map((f, i) => (
              <Pill
                key={i}
                variant="subtle"
                className="text-[0.7rem] px-2 py-0.5"
              >
                {f}
              </Pill>
            ))}
          </div>

          {/* DETAILS */}
          <div className="grid grid-cols-2 gap-2 text-[0.75rem] text-[#777]">
            <span>
              ⏱ Time Needed: <b>{timeLabel}</b>
            </span>
            <span>
              🌇 Best Time: <b>{place.best_time_to_visit}</b>
            </span>
            <span>
              📅 Weekly Off: <b>{place.weekly_off}</b>
            </span>
            <span>
              📷 DSLR: <b>{place.dslr_allowed}</b>
            </span>
            <span>
              ✈ Airport Nearby: <b>{place.airport_with_50km_radius}</b>
            </span>
            <span>
              ⭐ Reviews: <b>{place.number_of_google_review_in_lakhs}L</b>
            </span>
          </div>

          {/* FOOTER */}
          <div className="flex justify-between items-center text-[0.75rem]">
            <span className="text-[#777]">
              Rating: {place.google_review_rating}
            </span>

            <button
              onClick={() => navigate(`/trip-details/`, { state: { place } })}
              className="rounded-xl bg-[#F4A261] px-3 py-1 text-xs text-white shadow-[0_4px_14px_rgba(244,162,97,0.4)] transition-all duration-200 hover:bg-[#e8903e] hover:-translate-y-[1px]"
            >
              View details
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DestinationCard;
