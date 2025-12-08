
import React from "react";

export default function PageShell({ children }) {
  return (
    <main className="min-h-screen w-full flex flex-col gap-8 px-4 pb-16 pt-4 md:px-6 md:pt-8">
      {children}
    </main>
  );
}
