"use client";

import { ArrowDown, Download } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import TransitDiagram from "./TransitDiagram";
import { profile } from "@/data/resume";

export default function Hero() {
  const reduce = useReducedMotion();

  // The line diagram draws first; the text arrives once the routes have converged.
  // With reduced motion the text still has to end up visible (it starts hidden
  // in the server render), so it snaps in instead of skipping the animation.
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 18, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: reduce
      ? { duration: 0 }
      : { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pt-20 pb-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <TransitDiagram />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-background via-transparent to-transparent"
      />

      <div className="glass-panel glass-edge relative mx-4 max-w-2xl rounded-[2rem] px-6 py-10 text-center sm:px-14 sm:py-14">
        <motion.p
          {...rise(0.7)}
          className="glass-panel shadow-glow mx-auto inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm text-muted"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          Open to full-time Software Developer roles
        </motion.p>

        <motion.h1
          {...rise(1.0)}
          className="font-display mt-6 bg-linear-to-br from-foreground via-foreground to-accent bg-clip-text text-6xl leading-[0.95] font-medium tracking-tight text-balance text-transparent sm:text-8xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          {...rise(1.3)}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
        >
          Full-stack developer in {profile.location.split(",")[0]}. I build web apps with React
          and Node.js, and backends in Java and PostgreSQL.
        </motion.p>

        <motion.div
          {...rise(1.6)}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="btn-shine shadow-glow inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            See my projects
          </a>
          <a
            href={profile.resumeFile}
            download
            className="glass-panel inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >
            <Download className="h-4 w-4" />
            Download resume
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        {...rise(2.1)}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full p-2 text-muted hover:text-foreground"
      >
        <ArrowDown className="h-5 w-5 motion-safe:animate-bounce" />
      </motion.a>
    </section>
  );
}
