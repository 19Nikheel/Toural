import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PaymentStatusLayout } from "../components/payment/PaymentStatusLayout";
import { PaymentSuccessView } from "../components/payment/PaymentSuccessView";
import { PaymentFailureView } from "../components/payment/PaymentFailureView";

const PaymentStatusPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get("status") || "success";

  const handleGoToTrips = () => navigate("/my-trips");
  const handleGoHome = () => navigate("/");
  const handleRetry = () => navigate(-1);

  return (
    <PaymentStatusLayout>
      {status === "success" ? (
        <PaymentSuccessView
          onGoToTrips={handleGoToTrips}
          onGoHome={handleGoHome}
        />
      ) : (
        <PaymentFailureView onRetry={handleRetry} onGoHome={handleGoHome} />
      )}
    </PaymentStatusLayout>
  );
};

export default PaymentStatusPage;
