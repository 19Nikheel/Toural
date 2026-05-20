import React from "react";
import Button from "../ui/Button";

export const PaymentFailureView = ({ onRetry, onGoHome }) => (
  <>
    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-2xl">
      ⚠️
    </div>
    <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
      Payment failed (mock)
    </h1>
    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
      This is just a sample screen. In a real integration, you&apos;d see more
      details and can retry your payment.
    </p>
    <div className="mt-4 flex flex-col gap-2">
      <Button size="md" className="w-full justify-center" onClick={onRetry}>
        Retry payment
      </Button>
      <button
        type="button"
        onClick={onGoHome}
        className="text-[0.8rem] text-slate-500 underline-offset-2 hover:underline dark:text-slate-400"
      >
        Back to home
      </button>
    </div>
  </>
);
