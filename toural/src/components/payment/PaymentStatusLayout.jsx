import React from "react";
import Card from "../ui/Card";

export const PaymentStatusLayout = ({ children }) => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <Card padding="p-6" className="max-w-md w-full text-center">
      {children}
    </Card>
  </div>
);
