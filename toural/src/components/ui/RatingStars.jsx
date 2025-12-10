// src/components/ui/RatingStars.jsx
import React from "react";

export default function RatingStars({
  rating,
  outOf = 5,
  size = "sm",
  showValue = true,
  className = "",
}) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.25 && rating % 1 <= 0.75;
  const emptyStars = outOf - fullStars - (hasHalf ? 1 : 0);

  const sizeClasses =
    size === "lg" ? "text-base" : size === "md" ? "text-sm" : "text-xs";

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={`full-${i}`} className={`${sizeClasses} text-amber-400`}>
        ★
      </span>
    );
  }
  if (hasHalf) {
    stars.push(
      <span key="half" className={`${sizeClasses} text-amber-400`}>
        ☆
      </span>
    );
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <span key={`empty-${i}`} className={`${sizeClasses} text-slate-500`}>
        ★
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div className="flex items-center gap-0.5">{stars}</div>
      {showValue && (
        <span className={`${sizeClasses} text-slate-500 dark:text-slate-300`}>
          {/* {rating.toFixed(1)} */}
          4.5
        </span>
      )}
    </div>
  );
}
