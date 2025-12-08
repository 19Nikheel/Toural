import SectionHeader from "../ui/SectionHeader";
import { TripBookingCard } from "./TripBookingCard";

export const MyTripsList = ({ trips }) => {
  const upcoming = trips.filter((t) => t.status === "upcoming");
  const completed = trips.filter((t) => t.status === "completed");

  return (
    <div className="flex flex-col gap-8">
      {upcoming.length > 0 && (
        <section className="flex flex-col gap-4">
          <SectionHeader
            eyebrow="Upcoming"
            title="Your upcoming trips"
            subtitle="Everything is ready. You can review details or make changes."
          />
          <div className="flex flex-col gap-4">
            {upcoming.map((trip) => (
              <TripBookingCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>
      )}

      {completed.length > 0 && (
        <section className="flex flex-col gap-4">
          <SectionHeader
            eyebrow="History"
            title="Completed trips"
            subtitle="Revisit your favourite itineraries or rebook in a few taps."
          />
          <div className="flex flex-col gap-4">
            {completed.map((trip) => (
              <TripBookingCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
