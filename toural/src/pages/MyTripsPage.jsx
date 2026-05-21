import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import axiosInstance from "../context/axiosInstance";
import { MyTripsEmptyState } from "../components/user/MyTripsEmptyState";
import SectionHeader from "../components/ui/SectionHeader";
import Card from "../components/ui/Card";
import Pill from "../components/ui/Pill";

export const MyTripsPage = () => {
  const { user } = useUser();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.userId) {
        setLoading(false);
        return;
      }
      try {
        const res = await axiosInstance.get(
          `/api/booking/user/${user.userId}`
        );
        setBookings(res.data || []);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user?.userId]);

  const statusConfig = {
    SUCCESS: { label: "Confirmed", color: "bg-green-100 text-green-700", emoji: "✅" },
    PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-700", emoji: "⏳" },
    FAILED: { label: "Failed", color: "bg-red-100 text-red-700", emoji: "❌" },
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[#777]">My trips</p>
          <h1 className="text-xl font-semibold md:text-2xl">Your bookings</h1>
        </header>
        <div className="flex justify-center items-center py-16 text-[#777]">
          Loading your bookings...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[#777]">
          My trips
        </p>
        <h1 className="text-xl font-semibold md:text-2xl">
          Your booked itineraries
        </h1>
        <p className="text-sm text-[#777] max-w-2xl">
          Access details of your bookings and track their status.
        </p>
      </header>

      {bookings.length === 0 ? (
        <MyTripsEmptyState />
      ) : (
        <div className="flex flex-col gap-4">
          {/* Confirmed bookings */}
          {bookings.filter((b) => b.status === "SUCCESS").length > 0 && (
            <section className="flex flex-col gap-4">
              <SectionHeader
                eyebrow="Confirmed"
                title="Your confirmed bookings"
                subtitle="These bookings are confirmed and paid."
              />
              <div className="flex flex-col gap-3">
                {bookings
                  .filter((b) => b.status === "SUCCESS")
                  .map((booking) => {
                    const info = statusConfig[booking.status] || statusConfig.PENDING;
                    return (
                      <Card key={booking.bookingId} className="w-full">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          {/* Left info */}
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-semibold">
                                {booking.itemType} Booking #{booking.bookingId}
                              </h3>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${info.color}`}>
                                {info.emoji} {info.label}
                              </span>
                            </div>
                            <p className="text-xs text-[#777]">
                              Item ID: {booking.itemType === "PACKAGE" ? "Custom Travel Package" : booking.itemId} · Duration: {booking.bookingDuration} {booking.itemType === "HOTEL" ? "night" : "day"}{booking.bookingDuration > 1 ? "s" : ""}
                            </p>
                            <p className="text-xs text-[#777]">
                              Booked on: {new Date(booking.bookingDate).toLocaleDateString("en-IN", {
                                day: "numeric", month: "short", year: "numeric",
                              })}
                            </p>
                            {booking.razorpayPaymentId && (
                              <p className="text-xs text-[#999]">
                                Payment ID: {booking.razorpayPaymentId}
                              </p>
                            )}
                          </div>
                          {/* Right amount */}
                          <div className="flex flex-col items-end gap-1 rounded-2xl bg-[#F4A261]/10 border border-[#F4A261]/20 p-4 md:min-w-[160px]">
                            <p className="text-[0.7rem] text-[#777]">Total paid</p>
                            <p className="text-lg font-semibold">
                              ₹{booking.totalPrice?.toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
              </div>
            </section>
          )}

          {/* Pending bookings */}
          {bookings.filter((b) => b.status === "PENDING").length > 0 && (
            <section className="flex flex-col gap-4">
              <SectionHeader
                eyebrow="Pending"
                title="Pending payments"
                subtitle="These bookings are awaiting payment confirmation."
              />
              <div className="flex flex-col gap-3">
                {bookings
                  .filter((b) => b.status === "PENDING")
                  .map((booking) => {
                    const info = statusConfig[booking.status] || statusConfig.PENDING;
                    return (
                      <Card key={booking.bookingId} className="w-full">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-semibold">
                                {booking.itemType} Booking #{booking.bookingId}
                              </h3>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${info.color}`}>
                                {info.emoji} {info.label}
                              </span>
                            </div>
                            <p className="text-xs text-[#777]">
                              Item ID: {booking.itemId} · Duration: {booking.bookingDuration} night{booking.bookingDuration > 1 ? "s" : ""}
                            </p>
                            <p className="text-xs text-[#777]">
                              Created: {new Date(booking.bookingDate).toLocaleDateString("en-IN", {
                                day: "numeric", month: "short", year: "numeric",
                              })}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1 rounded-2xl bg-yellow-50 border border-yellow-200 p-4 md:min-w-[160px]">
                            <p className="text-[0.7rem] text-[#777]">Amount</p>
                            <p className="text-lg font-semibold text-yellow-700">
                              ₹{booking.totalPrice?.toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default MyTripsPage;
