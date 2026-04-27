import React from "react";
import Card from "../ui/Card";
import RatingStars from "../ui/RatingStars";

export const RatingSummarySection = ({ rating, totalReviews = 124 }) => (
  <Card padding="p-5" className="w-full">
    <h2 className="mb-2 text-sm font-semibold text-[#C9622A]">
      Traveller ratings
    </h2>

    <div className="flex items-center gap-4">
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold text-[#1a1a1a]">
            {rating}
          </span>
          <RatingStars rating={rating} size="sm" />
        </div>

        <p className="text-[0.75rem] text-[#777]">
          Based on ~{totalReviews} reviews
        </p>
      </div>
    </div>
  </Card>
);
