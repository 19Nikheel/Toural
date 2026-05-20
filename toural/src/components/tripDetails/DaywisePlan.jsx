import React from "react";
import Card from "../ui/Card";

const generateSamplePlan = (highlights = [], nights = 3) => {
  const days = Math.max(2, nights);
  const itemsPerDay = Math.max(1, Math.ceil(highlights.length / days));

  const plan = [];
  for (let day = 1; day <= days; day += 1) {
    const start = (day - 1) * itemsPerDay;
    const end = start + itemsPerDay;
    const dayItems = highlights.slice(start, end);
    plan.push({
      day,
      items:
        dayItems.length > 0
          ? dayItems
          : ["Free day to explore at your own pace."],
    });
  }
  return plan;
};

export const DaywisePlan = ({ highlights, nights }) => {
  const plan = generateSamplePlan(highlights, nights);

  return (
    <Card padding="p-5" className="w-full">
      <h2 className="mb-3 text-sm font-semibold text-[#C9622A]">
        Sample day-wise plan
      </h2>

      <div className="space-y-3 text-[0.8rem] text-[#555]">
        {plan.map((day) => (
          <div
            key={day.day}
            className="rounded-xl border border-[#F4A261]/20 bg-[#F4A261]/5 px-3 py-2"
          >
            <p className="text-[0.75rem] font-semibold text-[#1a1a1a]">
              Day {day.day}
            </p>

            <ul className="mt-1 space-y-1 pl-1">
              {day.items.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-[#F4A261]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
};
