import React from "react";

export default function PageShell({ children }) {
  return (
    <main className="min-h-screen w-full flex flex-col gap-10 px-4 pb-16 pt-6 md:px-6 md:pt-10 bg-transparent text-[#1a1a1a]">
      {children}
    </main>
  );
}
