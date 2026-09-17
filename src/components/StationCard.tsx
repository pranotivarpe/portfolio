import { codeFromName, colorForSeed } from "@/lib/lineColor";

/** A project shown as a transit station plaque — code, name, and the lines serving it */
export default function StationCard({
  seed,
  name,
  stack,
  className = "",
}: {
  seed: string;
  name: string;
  stack: readonly string[];
  className?: string;
}) {
  const color = colorForSeed(seed);
  const code = codeFromName(name);
  const stops = stack.slice(0, 5);

  return (
    <figure
      className={`card-lift relative overflow-hidden rounded-[1.75rem] border border-border bg-surface ${className}`}
    >
      <div aria-hidden="true" className="h-2" style={{ background: color }} />
      <div className="px-6 py-7">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ background: color }}
          >
            {code}
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-muted uppercase">Station</p>
            <p className="font-display text-lg leading-tight">{name}</p>
          </div>
        </div>

        <div aria-hidden="true" className="relative my-6 h-2.5">
          <div
            className="absolute top-1/2 right-1 left-1 h-0.5 -translate-y-1/2 rounded-full"
            style={{ background: color, opacity: 0.4 }}
          />
          <div className="relative flex justify-between">
            {stops.map((s) => (
              <span
                key={s}
                className="h-2.5 w-2.5 rounded-full border-2 bg-surface"
                style={{ borderColor: color }}
              />
            ))}
          </div>
        </div>

        <p className="text-[10px] font-semibold tracking-[0.2em] text-muted uppercase">
          Lines serving this station
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {stops.map((s) => (
            <li
              key={s}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
