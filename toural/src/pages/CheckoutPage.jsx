import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckoutLayout } from "../components/checkout/CheckoutLayout";
import { TravellerDetailsForm } from "../components/checkout/TravellerDetailsForm";
import { ContactDetailsForm } from "../components/checkout/ContactDetailsForm";
import { PaymentMethodSelector } from "../components/checkout/PaymentMethodSelector";
import { PaymentSummarySidebar } from "../components/checkout/PaymentSummarySidebar";
import { TermsConsentBox } from "../components/checkout/TermsConsentBox";
import Button from "../components/ui/Button";
import { useTour } from "../context/TourContext";
import useRazorpay from "react-razorpay";
import axiosInstance from "../context/axiosInstance";

const CheckoutPage = () => {
  const { tours } = useTour();
  const [Razorpay] = useRazorpay();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tripId = searchParams.get("tripId");

  const destination = useMemo(
    () => tours.map((d) => String(d.id) === String(tripId)) || featured[0],
    [tripId]
  );

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
      // 1. Create booking and get Razorpay order ID
      const bookingData = {
        userId: "user-123", // TODO: Get from AuthContext
        itemType: "HOTEL", // Hardcoded for demo
        itemId: tripId || "hotel-123",
        duration: travellersCount || 1, // Using travellersCount as duration for demo
      };

      const response = await axiosInstance.post("/api/booking/create", bookingData);
      const booking = response.data;

      // 2. Open Razorpay Popup
      const options = {
        key: "rzp_test_SfQqx5y2AUfBbB",
        amount: booking.totalPrice * 100, // Amount is in paise
        currency: "INR",
        name: "Toural Booking",
        description: "Complete your booking payment",
        order_id: booking.razorpayOrderId,
        handler: async (res) => {
          try {
            // 3. Verify Payment
            await axiosInstance.post("/api/payment/verify", {
              razorpay_order_id: res.razorpay_order_id,
              razorpay_payment_id: res.razorpay_payment_id,
              razorpay_signature: res.razorpay_signature,
            });
            navigate("/payment-status?status=success");
          } catch (err) {
            console.error("Payment verification failed", err);
            navigate("/payment-status?status=failure");
          }
        },
        prefill: {
          name: travellers[0]?.name || "John Doe",
          email: contact.email || "john@example.com",
          contact: contact.phone || "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        navigate("/payment-status?status=failure");
      });
      rzp1.open();
    } catch (error) {
      console.error("Booking creation failed", error);
      alert(error.response?.data?.message || error.message || "Failed to create booking.");
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
          Confirm your trip details & payment
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          Review the travellers, your contact info and payment method before you
          complete this sample booking.
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
              {submitting ? "Processing..." : "Confirm & pay"}
            </Button>
          </>
        }
      />
    </div>
  );
};

export default CheckoutPage;
