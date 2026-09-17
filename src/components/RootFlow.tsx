import type { CSSProperties } from "react";
import type { FlowStep } from "@/data/resume";

/** A project's request path drawn as a transit line, with a signal moving between stops */
export default function RootFlow({ steps }: { steps: readonly FlowStep[] }) {
  // On wide screens the line runs from the center of the first column to the last
  const vars = {
    "--cols": steps.length,
    "--edge": `${50 / steps.length}%`,
  } as CSSProperties;

  return (
    <div className="relative" style={vars}>
      <div
        aria-hidden="true"
        className="transit-line-fill absolute top-3 bottom-3 left-[11px] w-0.5 rounded-full lg:top-[11px] lg:right-(--edge) lg:bottom-auto lg:left-(--edge) lg:h-0.5 lg:w-auto"
      />
      <ol className="relative grid gap-8 lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))] lg:gap-6">
        {steps.map((step) => (
          <li
            key={step.label}
            className="flex gap-4 lg:flex-col lg:items-center lg:gap-3 lg:text-center"
          >
            <span className="relative mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-background">
              <span className="h-2 w-2 rounded-full bg-signal" />
            </span>
            <div>
              <p className="font-semibold">{step.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
