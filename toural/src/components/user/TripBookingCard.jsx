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
        {/* Left */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#777]">
                {trip.region} · {trip.country}
              </p>
              <h3 className="text-base font-semibold text-[#1a1a1a]">
                {trip.title}
              </h3>
            </div>

            <Pill variant={statusInfo.pillVariant} className="text-[0.7rem]">
              <span>{statusInfo.emoji}</span>
              <span>{statusInfo.label}</span>
            </Pill>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[0.75rem] text-[#777]">
            <span>
              {trip.nights} nights · {trip.travellers} travellers
            </span>
            <span className="h-1 w-1 rounded-full bg-[#F4A261]/40" />
            <span>
              {trip.startDate} → {trip.endDate}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[0.75rem]">
            <RatingStars rating={trip.rating} size="sm" />
            <span className="text-[#777]">{trip.staySummary}</span>
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

        {/* Right */}
        <div className="flex w-full flex-col justify-between gap-2 rounded-2xl bg-[#F4A261]/10 border border-[#F4A261]/20 p-4 text-[0.8rem] md:w-56">
          <div>
            <p className="text-[0.7rem] text-[#777]">Total amount</p>
            <p className="text-lg font-semibold text-[#1a1a1a]">
              ₹{trip.totalAmount.toLocaleString("en-IN")}
            </p>
            <p className="text-[0.7rem] text-[#777]">
              ~₹{trip.perPerson.toLocaleString("en-IN")} / person
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => navigate(`/trip/${trip.id}`)}
              className="w-full rounded-xl bg-[#F4A261] px-3 py-1.5 text-[0.75rem] font-medium text-white shadow-[0_4px_14px_rgba(244,162,97,0.4)] transition-all duration-200 hover:bg-[#e8903e] hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(244,162,97,0.5)]"
            >
              View details
            </button>

            {trip.status === "upcoming" && (
              <button
                type="button"
                className="w-full rounded-xl border border-[#F4A261]/30 px-3 py-1.5 text-[0.75rem] text-[#555] transition-all duration-150 hover:border-red-400 hover:text-red-500"
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
