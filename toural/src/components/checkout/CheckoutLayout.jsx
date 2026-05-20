import React from "react";

export const CheckoutLayout = ({ left, right }) => (
  <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
    <div className="flex flex-col gap-4">{left}</div>
    <div className="flex flex-col gap-4">{right}</div>
  </div>
);
