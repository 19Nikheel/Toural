import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TripHeroHeader } from "../components/tripDetails/TripHeroHeader";
import { IncludedHighlights } from "../components/tripDetails/IncludedHighlights";
import { DaywisePlan } from "../components/tripDetails/DaywisePlan";
import { RatingSummarySection } from "../components/tripDetails/RatingSummarySection";
import { ReviewsList } from "../components/tripDetails/ReviewsList";
import Card from "../components/ui/Card";
import Pill from "../components/ui/Pill";
import NearbyHotels from "../components/hotels/NearByHotels";

const MOCK_REVIEWS = [
  {
    id: 1,
    name: "Aarav S.",
    rating: 4.8,
    text: "Amazing place with great historical significance.",
  },
  {
    id: 2,
    name: "Neha K.",
    rating: 4.6,
    text: "Best visited in evening, very beautiful lighting.",
  },
];

const TripDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const destination = location.state?.place;

  if (!destination) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <p className="text-sm font-semibold text-[#1a1a1a]">Place not found</p>
        <button onClick={() => navigate(-1)} className="text-sm text-[#C9622A]">
          Go Back
        </button>
      </div>
    );
  }

  const highlights = destination.features
    ? destination.features.split(" ")
    : [];

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* HERO */}
      <TripHeroHeader
        destination={{
          name: destination.name,
          cityName: destination.city,
          bestSeason: destination.best_time_to_visit,
          tags: destination.features,
        }}
      />

      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        {/* LEFT */}
        <div className="flex flex-col gap-4">
          {/* DETAILS CARD */}
          <Card padding="p-5">
            <h2 className="text-sm font-semibold text-[#C9622A] mb-3">
              Place Details
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-[0.8rem] text-[#555]">
              <div>
                🏛 Type: <b>{destination.type}</b>
              </div>
              <div>
                📍 Zone: <b>{destination.zone}</b>
              </div>
              <div>
                📅 Established: <b>{destination.establishment_year}</b>
              </div>
              <div>
                ⏱ Time: <b>{destination.time_needed_to_visit_in_hrs} hrs</b>
              </div>
              <div>
                🌇 Best Time: <b>{destination.best_time_to_visit}</b>
              </div>
              <div>
                📅 Weekly Off: <b>{destination.weekly_off}</b>
              </div>
              <div>
                📷 DSLR: <b>{destination.dslr_allowed}</b>
              </div>
              <div>
                ✈ Airport: <b>{destination.airport_with_50km_radius}</b>
              </div>
              <div>
                ⭐ Reviews:{" "}
                <b>{destination.number_of_google_review_in_lakhs}L</b>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {highlights.map((h, i) => (
                <Pill key={i}>{h}</Pill>
              ))}
            </div>
          </Card>

          <IncludedHighlights highlights={highlights} />
          <DaywisePlan highlights={highlights} nights={2} />
          <RatingSummarySection rating={destination.google_review_rating} />
          <ReviewsList reviews={MOCK_REVIEWS} />
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-4">
          <Card padding="p-5">
            <h2 className="text-sm font-semibold text-[#C9622A] mb-2">
              Entry Info
            </h2>
            <p className="text-[0.8rem] text-[#555]">
              {destination.entrance_fee_in_inr === 0
                ? "Free Entry"
                : `₹${destination.entrance_fee_in_inr}`}
            </p>
          </Card>

          {/* Nearby Hotels */}
          <NearbyHotels city={destination.city} />
        </div>
      </div>
    </div>
  );
};

export default TripDetailsPage;
