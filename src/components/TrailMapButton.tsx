"use client";

import { Route } from "lucide-react";
import { useSyncExternalStore } from "react";
import { OPEN_TRAIL_MAP } from "@/lib/theme";

const subscribe = () => () => {};
const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform);

export default function TrailMapButton() {
  const mac = useSyncExternalStore(subscribe, isMac, () => false);
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_TRAIL_MAP))}
      aria-label="Open the line map to jump to a section or project"
      title="Line map"
      className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border border-border bg-surface/70 px-3 text-sm text-muted transition-colors hover:bg-accent-soft hover:text-foreground"
    >
      <Route className="h-4 w-4" />
      <kbd className="hidden font-sans text-xs lg:inline">{mac ? "⌘K" : "Ctrl K"}</kbd>
    </button>
  );
}
