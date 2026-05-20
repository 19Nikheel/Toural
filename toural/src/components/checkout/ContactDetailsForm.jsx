import React from "react";
import Card from "../ui/Card";
import FieldLabel from "../ui/FieldLabel";

export const ContactDetailsForm = ({ contact, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...contact, [field]: value });
  };

  return (
    <Card padding="p-5">
      <h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-50">
        Contact details
      </h2>
      <div className="space-y-3 text-[0.8rem]">
        <div>
          <FieldLabel htmlFor="contact-email">Email</FieldLabel>
          <input
            id="contact-email"
            type="email"
            value={contact.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="you@example.com"
            className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-[0.8rem] text-slate-900 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
          />
        </div>
        <div>
          <FieldLabel htmlFor="contact-phone">Phone</FieldLabel>
          <input
            id="contact-phone"
            type="tel"
            value={contact.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+91-XXXXXXXXXX"
            className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-[0.8rem] text-slate-900 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
          />
        </div>
      </div>
    </Card>
  );
};
