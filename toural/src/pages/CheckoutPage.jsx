import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { CheckoutLayout } from "../components/checkout/CheckoutLayout";
import { TravellerDetailsForm } from "../components/checkout/TravellerDetailsForm";
import { ContactDetailsForm } from "../components/checkout/ContactDetailsForm";
import { PaymentMethodSelector } from "../components/checkout/PaymentMethodSelector";
import { PaymentSummarySidebar } from "../components/checkout/PaymentSummarySidebar";
import { TermsConsentBox } from "../components/checkout/TermsConsentBox";
import Button from "../components/ui/Button";
import { useTour } from "../context/TourContext";
import { useUser } from "../context/UserContext";
import axiosInstance from "../context/axiosInstance";

const CheckoutPage = () => {
  const { tours } = useTour();
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const tripId = searchParams.get("tripId");
  const hotelId = searchParams.get("hotelId");
  const rawItemId = searchParams.get("itemId");
  const type = searchParams.get("type") || "TOUR";

  // Build destination info from location state or tour context
  const destination = useMemo(() => {
    if (type === "PACKAGE" && location.state?.packageData) {
      return {
        name: `Custom Package: ${location.state.packageData.cityName}`,
        estimatedPerPerson: location.state.packagePrice || 0,
        suggestedNights: 1,
      };
    }
    if (type === "HOTEL" && location.state?.hotel) {
      const h = location.state.hotel;
      return {
        name: h.hotelName,
        estimatedPerPerson: h.price || 1500,
        suggestedNights: 1,
      };
    }
    return (
      tours.find((d) => String(d.id) === String(tripId)) || {
        name: "Unknown",
        estimatedPerPerson: 1500,
        suggestedNights: 1,
      }
    );
  }, [tripId, tours, type, location.state]);

  const [travellers, setTravellers] = useState([
    { name: "", age: "", type: "Adult" },
  ]);
  const [contact, setContact] = useState({ email: "", phone: "" });
  const [method, setMethod] = useState("upi");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const travellersCount = travellers.length;

  const handleConfirmPayment = async () => {
    if (!termsAccepted) return;
    setSubmitting(true);

    try {
      // 1. Create booking on server → gets Razorpay order
      const bookingData = {
        userId: String(user?.userId || ""),
        itemType: type,
        itemId: type === "PACKAGE" ? rawItemId : (type === "HOTEL" ? hotelId : tripId),
        duration: (type === "HOTEL" || type === "PACKAGE") ? 1 : travellersCount,
      };

      const response = await axiosInstance.post(
        "/api/booking/create",
        bookingData
      );
      const booking = response.data;

      // 2. Open Razorpay checkout
      const options = {
        key: "rzp_test_SfQqx5y2AUfBbB",
        amount: booking.totalPrice * 100,
        currency: "INR",
        name: "Toural",
        description: `Booking for ${destination.name}`,
        order_id: booking.razorpayOrderId,
        handler: async (res) => {
          try {
            // 3. Verify payment signature
            await axiosInstance.post("/api/payment/verify", {
              razorpay_order_id: res.razorpay_order_id,
              razorpay_payment_id: res.razorpay_payment_id,
              razorpay_signature: res.razorpay_signature,
            });
            // 4. On success → redirect to My Trips
            navigate("/my-trips");
          } catch (err) {
            console.error("Payment verification failed", err);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name:
            travellers[0]?.name || user?.firstname || "",
          email: contact.email || user?.email || "",
          contact: contact.phone || "",
        },
        theme: { color: "#F4A261" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        alert("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (error) {
      console.error("Booking creation failed", error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to create booking."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Secure checkout
        </p>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50 md:text-2xl">
          Review your booking & pay
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          Review the travellers, your contact info and payment method before you
          complete your booking.
        </p>
      </header>

      <CheckoutLayout
        left={
          <>
            <TravellerDetailsForm
              travellers={travellers}
              onChange={setTravellers}
            />
            <ContactDetailsForm contact={contact} onChange={setContact} />
            <PaymentMethodSelector method={method} onChange={setMethod} />
            <TermsConsentBox
              checked={termsAccepted}
              onChange={setTermsAccepted}
            />
          </>
        }
        right={
          <>
            <PaymentSummarySidebar
              destination={destination}
              travellersCount={travellersCount}
            />
            <Button
              size="md"
              className="w-full justify-center"
              disabled={!termsAccepted || submitting}
              onClick={handleConfirmPayment}
            >
              {submitting ? "Processing..." : "Confirm & Pay"}
            </Button>
          </>
        }
      />
    </div>
  );
};

export default CheckoutPage;
