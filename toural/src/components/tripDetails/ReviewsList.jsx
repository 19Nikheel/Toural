import React from "react";
import Card from "../ui/Card";
import { ReviewItem } from "./ReviewItem";

export const ReviewsList = ({ reviews }) => {
  if (!reviews || !reviews.length) return null;

  return (
    <Card padding="p-5" className="w-full">
      <h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-50">
        Recent reviews
      </h2>
      <div className="space-y-3">
        {reviews.map((r) => (
          <ReviewItem key={r.id} review={r} />
        ))}
      </div>
    </Card>
  );
};
