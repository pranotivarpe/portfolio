"use client";

import { useEffect, useRef, useState } from "react";
import LineDiagram from "./LineDiagram";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { rings } from "@/lib/skillGraph";

export default function Experience() {
  const newestFirst = [...rings].reverse();
  const [scrolled, setScrolled] = useState<string | null>(newestFirst[0]?.id ?? null);
  const [hovered, setHovered] = useState<string | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const active = hovered ?? scrolled;

  // The entry in the middle of the screen lights up its stop
  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>("[data-ring]");
    if (!items?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setScrolled(e.target.getAttribute("data-ring"));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <SectionHeading
          location="Main line · service history"
          eyebrow="Every stop is a stretch of the route"
          title="Experience"
        />
      </Reveal>

      <div className="grid gap-12 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-16">
        <div className="mx-auto w-full max-w-[16rem] md:sticky md:top-24 md:max-w-none md:self-start">
          <LineDiagram rings={newestFirst} active={active} onHover={setHovered} />
          <p className="mt-4 text-center text-sm text-muted">
            The most recent stop sits at the top — internships run the full route, hackathons are
            quick stops.
          </p>
        </div>

        <ol ref={listRef} className="space-y-2">
          {newestFirst.map((ring) => {
            const on = active === ring.id;
            return (
              <li
                key={ring.id}
                data-ring={ring.id}
                tabIndex={0}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") setHovered(ring.id);
                }}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => setHovered(ring.id)}
                onBlur={() => setHovered(null)}
                className={`rounded-r-xl border-l-2 py-5 pr-2 pl-6 transition-colors duration-300 ${
                  on ? "border-accent bg-accent-soft/60" : "border-border"
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="font-display text-accent italic">{ring.kind}</p>
                  <p className="text-sm text-muted">{ring.period}</p>
                </div>
                <h3 className="mt-1 text-lg font-semibold">{ring.title}</h3>
                {ring.kind === "Internship" ? (
                  <p className="text-sm font-medium text-muted">{ring.org}</p>
                ) : null}
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                  {ring.bullets.map((b) => (
                    <li key={b.slice(0, 32)}>{b}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
