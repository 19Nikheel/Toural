import React from "react";
import Card from "../ui/Card";
import { PriceBreakdownCard } from "./PriceBreakdownCard";

export const PaymentSummarySidebar = ({ destination, travellersCount }) => {
  const basePerPerson = destination.estimatedPerPerson || 15000;
  const base = basePerPerson * travellersCount;
  const taxes = Math.round(base * 0.12);
  const fees = 999;

  return (
    <div className="flex flex-col gap-3">
      <Card padding="p-4">
        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Booking summary
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
          {destination.name}
        </p>
        <p className="mt-1 text-[0.8rem] text-slate-600 dark:text-slate-300">
          {destination.suggestedNights} nights · {travellersCount} travellers
        </p>
      </Card>

      <PriceBreakdownCard base={base} taxes={taxes} fees={fees} />

      <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
        This is a mock checkout screen. No real payment is processed.
      </p>
    </div>
  );
};
