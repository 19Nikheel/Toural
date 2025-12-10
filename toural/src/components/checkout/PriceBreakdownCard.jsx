import React from "react";
import Card from "../ui/Card";

export const PriceBreakdownCard = ({ base, taxes, fees, currency = "₹" }) => {
  const total = base + taxes + fees;

  return (
    <Card padding="p-4">
      <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-50">
        Price breakdown
      </h3>
      <div className="space-y-1.5 text-[0.8rem] text-slate-600 dark:text-slate-300">
        <div className="flex justify-between">
          <span>Base package</span>
          <span>
            {currency}
            {base.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Taxes & charges</span>
          <span>
            {currency}
            {taxes.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Platform & service fee</span>
          <span>
            {currency}
            {fees.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="mt-2 border-t border-slate-200 pt-2 text-[0.85rem] font-semibold text-slate-900 dark:border-slate-700 dark:text-slate-50">
          <div className="flex justify-between">
            <span>Total payable</span>
            <span>
              {currency}
              {total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
