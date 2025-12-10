import React from "react";
import Card from "../ui/Card";
import RatingStars from "../ui/RatingStars";

export const RatingSummarySection = ({ rating, totalReviews = 124 }) => (
  <Card padding="p-5" className="w-full">
    <h2 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-50">
      Traveller ratings
    </h2>
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            4.5
          </span>
          <RatingStars rating={rating} size="sm" />
        </div>
        <p className="text-[0.75rem] text-slate-500 dark:text-slate-400">
          Based on ~1K sample reviews
        </p>
      </div>
    </div>
  </Card>
);
