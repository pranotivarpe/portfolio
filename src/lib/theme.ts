/** Switches between day and night, easing colors unless motion is reduced */
export function toggleTheme() {
  const root = document.documentElement;
  const next = !root.classList.contains("dark");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduce) {
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 650);
  }
  root.classList.toggle("dark", next);
  localStorage.setItem("theme", next ? "dark" : "light");
}

export const OPEN_TRAIL_MAP = "open-trail-map";
