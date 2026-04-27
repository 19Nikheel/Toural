import React from "react";
import RatingStars from "../ui/RatingStars";

export const ReviewItem = ({ review }) => (
  <div className="rounded-xl border border-[#F4A261]/20 bg-white/70 backdrop-blur-md p-3 text-[0.8rem] shadow-sm">
    <div className="mb-1 flex items-center justify-between">
      <p className="text-[0.8rem] font-semibold text-[#1a1a1a]">
        {review.name}
      </p>
      <RatingStars rating={review.rating} size="xs" />
    </div>

    <p className="text-[0.78rem] text-[#777]">{review.text}</p>
  </div>
);
