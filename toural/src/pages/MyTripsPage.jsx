import { MyTripsEmptyState } from "../components/user/MyTripsEmptyState";
import { MyTripsList } from "../components/user/MyTripsList";

const MOCK_TRIPS = [
  {
    id: 1,
    title: "Goa Getaway with friends",
    country: "India",
    region: "Beach",
    nights: 3,
    travellers: 4,
    startDate: "12 Jan 2026",
    endDate: "15 Jan 2026",
    status: "upcoming",
    rating: 4.5,
    staySummary: "Sea Breeze Boutique · Breakfast included",
    totalAmount: 42000,
    perPerson: 10500,
    highlights: ["Baga Beach", "Fort Aguada", "Nightlife"],
  },
  {
    id: 2,
    title: "Manali Winter Escape",
    country: "India",
    region: "Mountains",
    nights: 4,
    travellers: 2,
    startDate: "02 Dec 2025",
    endDate: "06 Dec 2025",
    status: "completed",
    rating: 4.7,
    staySummary: "Pine View Resort · Mountain view",
    totalAmount: 38000,
    perPerson: 19000,
    highlights: ["Solang Valley", "Hadimba Temple", "Old Manali"],
  },
];

export const MyTripsPage = () => {
  const trips = MOCK_TRIPS;

  const hasTrips = trips && trips.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          My trips
        </p>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50 md:text-2xl">
          Your saved & booked itineraries
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
          Access details of your upcoming trips, revisit completed journeys, and
          quickly rebook your favourite experiences.
        </p>
      </header>

      {hasTrips ? <MyTripsList trips={trips} /> : <MyTripsEmptyState />}
    </div>
  );
};

export default MyTripsPage;
