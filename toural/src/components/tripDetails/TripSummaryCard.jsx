import React from "react";
import Card from "../ui/Card";
import Pill from "../ui/Pill";

export const TripSummaryCard = ({ destination }) => {
  const avgPrice =
    destination.stayOptions && destination.stayOptions.length
      ? Math.round(
          destination.stayOptions.reduce((sum, s) => sum + s.pricePerNight, 0) /
            destination.stayOptions.length
        )
      : null;

  const approxTrip = avgPrice ? avgPrice * destination.suggestedNights : 0;

  return (
    <Card padding="p-5" className="w-full">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Trip summary
          </h2>
          <Pill variant="subtle" className="text-[0.7rem]">
            Sample pricing
          </Pill>
        </div>

        <div className="flex items-baseline justify-between text-sm">
          <div>
            <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
              Approx trip cost
            </p>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              {approxTrip ? `₹${approxTrip.toLocaleString("en-IN")}` : "TBD"}
            </p>
            {avgPrice && (
              <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
                ~₹{avgPrice.toLocaleString("en-IN")} / night ·{" "}
                {destination.suggestedNights} nights
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 text-[0.7rem]">
          {destination.tags?.slice(0, 5).map((tag) => (
            <Pill
              key={tag}
              variant="subtle"
              className="px-2 py-0.5 text-[0.7rem]"
            >
              {tag}
            </Pill>
          ))}
        </div>
      </div>
    </Card>
  );
};
