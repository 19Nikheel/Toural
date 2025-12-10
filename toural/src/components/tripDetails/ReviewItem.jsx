import React from "react";
import RatingStars from "../ui/RatingStars";

export const ReviewItem = ({ review }) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3 text-[0.8rem] dark:border-slate-800 dark:bg-slate-900/70">
    <div className="mb-1 flex items-center justify-between">
      <p className="text-[0.8rem] font-semibold text-slate-900 dark:text-slate-50">
        {review.name}
      </p>
      <RatingStars rating={review.rating} size="xs" />
    </div>
    <p className="text-[0.78rem] text-slate-600 dark:text-slate-300">
      {review.text}
    </p>
  </div>
);
