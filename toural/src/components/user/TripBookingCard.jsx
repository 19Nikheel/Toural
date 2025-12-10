import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import Pill from "../ui/Pill";
import RatingStars from "../ui/RatingStars";

const statusConfig = {
  upcoming: {
    label: "Upcoming",
    pillVariant: "highlight",
    emoji: "🗓️",
  },
  completed: {
    label: "Completed",
    pillVariant: "subtle",
    emoji: "✅",
  },
  cancelled: {
    label: "Cancelled",
    pillVariant: "outline",
    emoji: "🚫",
  },
};

export const TripBookingCard = ({ trip }) => {
  const statusInfo = statusConfig[trip.status] ?? statusConfig.upcoming;
  const navigate = useNavigate();
  return (
    <Card className="w-full max-w-2xl mx-auto md:max-w-none">
      <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
        {/* Left info */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                {trip.region} · {trip.country}
              </p>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                {trip.title}
              </h3>
            </div>
            <Pill variant={statusInfo.pillVariant} className="text-[0.7rem]">
              <span>{statusInfo.emoji}</span>
              <span>{statusInfo.label}</span>
            </Pill>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[0.75rem] text-slate-600 dark:text-slate-300">
            <span>
              {trip.nights} nights · {trip.travellers} travellers
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-400/60" />
            <span>
              {trip.startDate} → {trip.endDate}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[0.75rem]">
            <RatingStars rating={trip.rating} size="sm" />
            <span className="text-slate-500 dark:text-slate-400">
              {trip.staySummary}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 text-[0.7rem]">
            {trip.highlights.slice(0, 3).map((h) => (
              <Pill
                key={h}
                variant="subtle"
                className="px-2 py-0.5 text-[0.7rem]"
              >
                {h}
              </Pill>
            ))}
          </div>
        </div>

        {/* Right summary */}
        <div className="flex w-full flex-col justify-between gap-2 rounded-2xl bg-slate-50/90 p-4 text-[0.8rem] dark:bg-slate-900/80 md:w-56">
          <div>
            <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
              Total amount
            </p>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              ₹{trip.totalAmount.toLocaleString("en-IN")}
            </p>
            <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
              ~₹{trip.perPerson.toLocaleString("en-IN")} / person
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => navigate(`/trip/${trip.id}`)}
              className="w-full rounded-full bg-slate-900 px-3 py-1.5 text-[0.75rem] font-medium text-slate-50 transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              View details
            </button>
            {trip.status === "upcoming" && (
              <button
                type="button"
                className="w-full rounded-full border border-slate-300 px-3 py-1.5 text-[0.75rem] text-slate-600 hover:border-rose-400 hover:text-rose-500 dark:border-slate-700 dark:text-slate-300 dark:hover:border-rose-400 dark:hover:text-rose-400"
              >
                Cancel trip
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
