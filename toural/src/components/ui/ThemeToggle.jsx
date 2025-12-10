import React from "react";
import { useTheme } from "../../theme/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/70 bg-slate-100/80 text-slate-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-emerald-400"
      aria-label="Toggle theme"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
