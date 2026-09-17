"use client";

import { motion, useReducedMotion } from "motion/react";

export default function SectionHeading({
  eyebrow,
  title,
  location,
}: {
  eyebrow: string;
  title: string;
  /** A small field-journal waypoint label, e.g. "CANOPY · MORNING LIGHT" */
  location?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="mb-10">
      {location ? (
        <p className="mb-2 font-mono text-xs tracking-[0.2em] text-muted/70 uppercase">
          {location}
        </p>
      ) : null}
      <div className="inline-flex items-center gap-2">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        <p className="font-display text-base text-accent italic">{eyebrow}</p>
      </div>
      <h2 className="font-display mt-1 bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-medium tracking-tight text-transparent sm:text-5xl">
        {title}
      </h2>
      <motion.span
        aria-hidden="true"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
        className="mt-4 block h-[3px] w-16 rounded-full bg-linear-to-r from-accent to-transparent"
      />
    </div>
  );
}
