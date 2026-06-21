import React from "react";
import Button from "../ui/Button";

export const ActionBar = ({ onCheckout }) => (
  <div className="sticky bottom-4 z-10 mt-4 flex justify-end">
    <div className="flex w-full max-w-md items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/90 px-4 py-2 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
      <p className="text-[0.78rem] text-slate-600 dark:text-slate-300">
        Ready to lock this trip with your own dates & traveller details?
      </p>
      <Button size="sm" onClick={onCheckout}>
        Proceed to booking
      </Button>
    </div>
  </div>
);
