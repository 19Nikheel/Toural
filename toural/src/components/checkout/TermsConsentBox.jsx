import React from "react";

export const TermsConsentBox = ({ checked, onChange }) => (
  <div className="flex items-start gap-2 rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-[0.75rem] text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
    <input
      id="terms-consent"
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="mt-[2px] h-3.5 w-3.5 cursor-pointer rounded border-slate-300 text-emerald-500 focus:ring-emerald-400 dark:border-slate-600 dark:bg-slate-900"
    />
    <label htmlFor="terms-consent" className="cursor-pointer">
      I confirm that the traveller details are correct and agree to the{" "}
      <span className="text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-300">
        terms & conditions
      </span>
      .
    </label>
  </div>
);
