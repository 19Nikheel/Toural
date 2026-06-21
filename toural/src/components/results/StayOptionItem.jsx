import React from "react";
import RatingStars from "../ui/RatingStars";

const StayOptionItem = ({ stay }) => (
  <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50/90 px-3 py-2 text-[0.78rem] dark:bg-slate-900/70">
    <div className="flex flex-col gap-0.5">
      <p className="text-[0.8rem] font-medium text-slate-800 dark:text-slate-100">
        {stay.name}
      </p>
      <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
        {stay.type}
      </p>
      <div className="flex items-center gap-2">
        <RatingStars rating={stay.rating} size="xs" />
        <span className="text-[0.7rem] text-slate-500 dark:text-slate-400">
          {stay.perks?.slice(0, 2).join(" · ")}
        </span>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
        ₹{stay.pricePerNight.toLocaleString("en-IN")}
      </p>
      <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
        per night
      </p>
    </div>
  </div>
);
export default StayOptionItem;
