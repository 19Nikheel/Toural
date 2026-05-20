import React from "react";
import Card from "../ui/Card";
import FieldLabel from "../ui/FieldLabel";

export const TravellerDetailsForm = ({ travellers, onChange }) => {
  const handleFieldChange = (index, field, value) => {
    const next = travellers.map((t, i) =>
      i === index ? { ...t, [field]: value } : t
    );
    onChange(next);
  };

  return (
    <Card padding="p-5">
      <h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-50">
        Traveller details
      </h2>
      <div className="space-y-4">
        {travellers.map((t, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-slate-50/80 p-3 text-[0.8rem] dark:bg-slate-900/70"
          >
            <p className="mb-2 text-[0.75rem] font-semibold text-slate-700 dark:text-slate-100">
              Traveller {idx + 1}
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="md:col-span-2">
                <FieldLabel htmlFor={`traveller-name-${idx}`}>
                  Full name
                </FieldLabel>
                <input
                  id={`traveller-name-${idx}`}
                  value={t.name}
                  onChange={(e) =>
                    handleFieldChange(idx, "name", e.target.value)
                  }
                  placeholder="Enter full name"
                  className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-[0.8rem] text-slate-900 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>
              <div>
                <FieldLabel htmlFor={`traveller-age-${idx}`}>Age</FieldLabel>
                <input
                  id={`traveller-age-${idx}`}
                  type="number"
                  min={1}
                  value={t.age}
                  onChange={(e) =>
                    handleFieldChange(idx, "age", e.target.value)
                  }
                  className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-[0.8rem] text-slate-900 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                />
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["Adult", "Child", "Senior"].map((type) => {
                const active = t.type === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleFieldChange(idx, "type", type)}
                    className={`rounded-full border px-2 py-0.5 text-[0.7rem] transition ${
                      active
                        ? "border-emerald-400 bg-emerald-400/10 text-emerald-600 dark:text-emerald-200"
                        : "border-slate-200 text-slate-600 hover:border-emerald-400/60 dark:border-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
