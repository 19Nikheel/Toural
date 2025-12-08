import Button from "../ui/Button";

export const MyTripsEmptyState = () => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-slate-300 bg-slate-50/80 px-6 py-10 text-center text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
    <div className="text-4xl">🧳</div>
    <p className="text-base font-semibold text-slate-800 dark:text-slate-50">
      No trips booked yet
    </p>
    <p className="max-w-md text-[0.85rem] text-slate-500 dark:text-slate-400">
      When you confirm a trip, it will appear here with your dates, stay
      details, and quick access to your full itinerary.
    </p>
    <Button
      size="md"
      className="mt-2"
      onClick={() => (window.location.href = "/")}
    >
      Start planning your first trip
    </Button>
  </div>
);
