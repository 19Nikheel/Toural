import React from "react";
import Card from "../ui/Card";

const METHODS = [
  { id: "upi", label: "UPI", description: "PhonePe, GPay, Paytm" },
  {
    id: "card",
    label: "Credit / Debit card",
    description: "Visa, Mastercard, RuPay",
  },
  {
    id: "netbanking",
    label: "Netbanking",
    description: "Major Indian banks supported",
  },
];

export const PaymentMethodSelector = ({ method, onChange }) => (
  <Card padding="p-5">
    <h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-50">
      Payment method
    </h2>
    <div className="space-y-2 text-[0.8rem]">
      {METHODS.map((m) => {
        const active = m.id === method;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onChange(m.id)}
            className={`flex w-full items-center justify-between rounded-2xl border px-3 py-2 text-left transition ${
              active
                ? "border-emerald-400 bg-emerald-400/10 text-slate-900 dark:text-slate-50"
                : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400/60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            }`}
          >
            <div>
              <p className="text-[0.8rem] font-medium">{m.label}</p>
              <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
                {m.description}
              </p>
            </div>
            <span className="text-[0.8rem]">{active ? "●" : "○"}</span>
          </button>
        );
      })}
    </div>
  </Card>
);
