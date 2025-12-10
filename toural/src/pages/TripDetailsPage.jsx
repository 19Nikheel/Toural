import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TripHeroHeader } from "../components/tripDetails/TripHeroHeader";
import { TripSummaryCard } from "../components/tripDetails/TripSummaryCard";
import { StayOptionsList } from "../components/tripDetails/StayOptionsList";
import { IncludedHighlights } from "../components/tripDetails/IncludedHighlights";
import { DaywisePlan } from "../components/tripDetails/DaywisePlan";
import { RatingSummarySection } from "../components/tripDetails/RatingSummarySection";
import { ReviewsList } from "../components/tripDetails/ReviewsList";
import { ActionBar } from "../components/tripDetails/ActionBar";
import { useTour } from "../context/TourContext";

const MOCK_REVIEWS = [
  {
    id: 1,
    name: "Aarav S.",
    rating: 4.8,
    text: "Amazing balance of sightseeing and downtime. The suggested stays were spot on for our budget.",
  },
  {
    id: 2,
    name: "Neha K.",
    rating: 4.6,
    text: "Loved the highlights and local recommendations. Made it very easy to customise for our family.",
  },
];

const TripDetailsPage = () => {
  const { featured, tours, loading } = useTour();
  const { id } = useParams();
  const navigate = useNavigate();

  const destination = useMemo(() => {
    if (!Array.isArray(tours)) return null;

    return (
      tours.find((d) => {
        if (d.id && typeof d.id === "object" && "timestamp" in d.id) {
          return String(d.id.timestamp) === String(id);
        }
        return String(d.id) === String(id);
      }) || null
    );
  }, [tours, id]);

  const handleCheckout = () => {
    if (!destination) return;
    const tripId =
      destination.id && typeof destination.id === "object"
        ? destination.id.timestamp
        : destination.id;

    navigate(`/checkout?tripId=${tripId}`);
    alert("Proceed to booking (mock). Wire to CheckoutPage later.");
  };

  // Loading state if context is still fetching
  if (loading && !destination) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-slate-500">
        Loading trip details...
      </div>
    );
  }

  // Not found state
  if (!destination) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
          Trip not found
        </p>
        <p className="text-[0.85rem] text-slate-500 dark:text-slate-400">
          This itinerary doesn&apos;t exist in your data. Try selecting another
          destination from the results page.
        </p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-2 text-[0.8rem] text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-300"
        >
          Back to results
        </button>
      </div>
    );
  }

  // Safe fallbacks for nested data
  const highlights = destination.highlights || [];
  const stayOptions = destination.hotels || [];
  const suggestedNights = destination.suggestedNights || 3; // fallback if not provided

  return (
    <div className="flex flex-col gap-6 pb-8">
      <TripHeroHeader destination={destination} />

      <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {/* Left column */}
        <div className="flex flex-col gap-4">
          <IncludedHighlights highlights={highlights} />
          <DaywisePlan highlights={highlights} nights={suggestedNights} />
          <RatingSummarySection rating={4.5} />
          <ReviewsList reviews={MOCK_REVIEWS} />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          <TripSummaryCard destination={destination} />
          <StayOptionsList stays={stayOptions} />
        </div>
      </div>

      <ActionBar onCheckout={handleCheckout} />
    </div>
  );
};

export default TripDetailsPage;
