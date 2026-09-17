"use client";

import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "@/lib/theme";

export default function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Switch between day and night"
      title="Switch between day and night"
      className="group inline-flex h-9 items-center gap-2 rounded-full border border-border bg-surface/70 px-3 text-sm text-foreground transition-colors hover:bg-accent-soft cursor-pointer"
    >
      <Sun className="hidden h-4 w-4 text-signal transition-transform group-hover:rotate-45 dark:inline" />
      <Moon className="inline h-4 w-4 transition-transform group-hover:-rotate-12 dark:hidden" />
      <span className="hidden sm:inline">
        <span className="dark:hidden">Night</span>
        <span className="hidden dark:inline">Day</span>
      </span>
    </button>
  );
}
