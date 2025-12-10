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

const CheckoutPage = () => {
  const { tours } = useTour();
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

  const handleConfirmPayment = () => {
    if (!termsAccepted) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate("/payment-status?status=success");
    }, 700);
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
