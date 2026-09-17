import type { ReactNode } from "react";
import { codeFromName, colorForSeed } from "@/lib/lineColor";

/** A fare-ticket styled card, used for education and certifications */
export function TicketCard({
  seed,
  name,
  rows,
  footer,
  compact = false,
}: {
  seed: string;
  name: string;
  rows: { label: string; value: string }[];
  footer?: ReactNode;
  compact?: boolean;
}) {
  const color = colorForSeed(seed);
  const code = codeFromName(name);

  return (
    <article className="card-lift relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-border bg-surface">
      <div className="flex items-center gap-3 px-5 pt-5">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ background: color }}
        >
          {code}
        </span>
        <p className="text-[10px] font-semibold tracking-[0.2em] text-muted uppercase">
          {compact ? "Transfer pass" : "Single journey ticket"}
        </p>
      </div>

      <h3
        className={`font-display mt-3 px-5 leading-snug italic ${compact ? "text-base" : "text-xl"}`}
      >
        {name}
      </h3>

      <div
        aria-hidden="true"
        className="relative my-4 border-t border-dashed border-border"
      >
        <span className="absolute top-1/2 -left-2.5 h-5 w-5 -translate-y-1/2 rounded-full bg-background" />
        <span className="absolute top-1/2 -right-2.5 h-5 w-5 -translate-y-1/2 rounded-full bg-background" />
      </div>

      <div className="flex-1 px-5 pb-5">
        <dl className="space-y-1.5 text-sm">
          {rows.map((r) => (
            <div key={r.label} className="grid grid-cols-[6.5rem_1fr] gap-2">
              <dt className="text-muted">{r.label}</dt>
              <dd>{r.value}</dd>
            </div>
          ))}
        </dl>
        {footer ? <div className="mt-3 text-sm">{footer}</div> : null}
      </div>

      <div
        aria-hidden="true"
        className="h-3 w-full"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, ${color} 0 2px, transparent 2px 5px, ${color} 5px 6px, transparent 6px 11px, ${color} 11px 14px, transparent 14px 18px)`,
          opacity: 0.6,
        }}
      />
    </article>
  );
}
