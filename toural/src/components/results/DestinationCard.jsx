import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import Pill from "../ui/Pill";
import RatingStars from "../ui/RatingStars";
import { HighlightsList } from "./HighlightsList";
import StayOptionItem from "./StayOptionItem";

const DestinationCard = ({ destination }) => {
  const navigate = useNavigate();

  const primaryStay = destination.stayOptions?.[0];

  const avgPrice = destination.price || null;

  const tagsArray = Array.isArray(destination.tags)
    ? destination.tags
    : typeof destination.tags === "string"
    ? destination.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  // Fallback for nights if not provided
  const nights =
    destination.suggestedNights ||
    destination.nights || // in case backend adds this later
    2; // default

  const totalApprox = avgPrice && nights ? avgPrice * nights : null;

  const handleViewDetails = () => {
    navigate(`/trip/${destination.id.timestamp}`);
  };

  return (
    <Card className="w-full">
      <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
        {/* Left gradient thumbnail area */}
        <div
          className={`relative flex flex-1 flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500/80 via-emerald-500/80 to-slate-800/80 p-4 text-white md:max-w-[260px]`}
        >
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-100/80">
              {destination.cityName} · India
            </p>
            <h3 className="mt-1 text-base font-semibold md:text-lg">
              {destination.name}
            </h3>
          </div>

          <div className="mt-3 flex items-center justify-between text-[0.8rem] text-slate-100">
            <RatingStars rating="4.5" size="xs" showValue={false} />

            {avgPrice && (
              <span>
                From ₹{avgPrice.toLocaleString("en-IN")}{" "}
                <span className="text-[0.7rem]">
                  {/* change the label as per your meaning */}/ person
                </span>
              </span>
            )}
          </div>

          <div className="pointer-events-none absolute -right-8 -top-8 h-16 w-16 rounded-full border border-white/35 bg-white/25 blur-xl" />
        </div>

        {/* Right details */}
        <div className="flex flex-[2] flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5 text-[0.7rem]">
              {tagsArray.slice(0, 4).map((tag) => (
                <Pill
                  key={tag}
                  variant="subtle"
                  className="px-2 py-0.5 text-[0.7rem]"
                >
                  {tag}
                </Pill>
              ))}
            </div>

            {totalApprox && (
              <Pill variant="highlight" className="text-[0.7rem]">
                {nights} nights · from approx ₹
                {totalApprox.toLocaleString("en-IN")}
              </Pill>
            )}
          </div>

          {/* Highlights already matches your API shape */}
          <HighlightsList items={destination.highlights} />

          {/* This will simply not render for now since stayOptions is absent */}
          {primaryStay && <StayOptionItem stay={primaryStay} />}

          <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-[0.75rem] text-slate-600 dark:text-slate-300">
            <span>
              Best season:{" "}
              <span className="font-medium">{destination.bestSeason}</span>
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-full border border-slate-300 px-3 py-1 text-[0.75rem] hover:border-emerald-400 hover:text-emerald-500 dark:border-slate-700 dark:hover:border-emerald-400"
              >
                Save trip
              </button>
              <button
                type="button"
                onClick={handleViewDetails}
                className="rounded-full bg-slate-900 px-3 py-1 text-[0.75rem] font-medium text-slate-50 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                View details
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DestinationCard;
