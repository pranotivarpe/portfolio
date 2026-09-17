"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { skills } from "@/data/resume";
import { edges, projectNodes, projectsForSkill, skillsForProject } from "@/lib/skillGraph";

type Focus = { kind: "skill" | "project"; id: string } | null;
type RootPath = { key: string; d: string; project: string; skill: string };

function listToText(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** An interchange marker: two routes crossing at a station */
function StationGlyph({ lit }: { lit: boolean }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8 shrink-0">
      <path
        d="M4 22 L28 10 M4 10 L28 22"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className={lit ? "text-accent" : "text-border"}
      />
      <circle
        cx="16"
        cy="16"
        r="6"
        strokeWidth="3"
        className={`transition-colors duration-300 ${lit ? "fill-accent stroke-background" : "fill-surface stroke-accent"}`}
      />
    </svg>
  );
}

const LINE_COLORS: Record<string, string> = {
  Languages: "var(--line-1)",
  Frontend: "var(--line-2)",
  Backend: "var(--line-3)",
  "AI & API Integration": "var(--line-4)",
  Database: "var(--line-5)",
  "Tools & Platforms": "var(--line-6)",
  "Core Computer Science": "var(--line-7)",
};

const skillCategory: Record<string, string> = Object.fromEntries(
  skills.flatMap((g) => g.items.map((item) => [item, g.category]))
);

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef(new Map<string, HTMLElement>());
  const skillRefs = useRef(new Map<string, HTMLElement>());
  const [paths, setPaths] = useState<RootPath[]>([]);
  const [hovered, setHovered] = useState<Focus>(null);
  const [pinned, setPinned] = useState<Focus>(null);
  const reduce = useReducedMotion();
  const inView = useInView(containerRef, { once: true, margin: "-120px" });
  const grown = inView || !!reduce;

  const focus = hovered ?? pinned;

  const measure = useCallback(() => {
    const box = containerRef.current?.getBoundingClientRect();
    if (!box) return;
    const counts = new Map<string, number>();
    edges.forEach((e) => counts.set(e.project, (counts.get(e.project) ?? 0) + 1));
    const seen = new Map<string, number>();
    const next: RootPath[] = [];

    for (const e of edges) {
      const p = projectRefs.current.get(e.project)?.getBoundingClientRect();
      const s = skillRefs.current.get(e.skill)?.getBoundingClientRect();
      if (!p || !s) continue;

      // Fan the roots out along the base of each project
      const total = counts.get(e.project) ?? 1;
      const i = seen.get(e.project) ?? 0;
      seen.set(e.project, i + 1);
      const spread = Math.min(p.width * 0.6, total * 7);
      const x1 = p.left + p.width / 2 - box.left + (i / Math.max(1, total - 1) - 0.5) * spread;
      const y1 = p.bottom - box.top;
      const x2 = s.left + s.width / 2 - box.left;
      const y2 = s.top - box.top + 2;
      const k = Math.max(40, (y2 - y1) * 0.55);
      const f = (n: number) => n.toFixed(1);

      next.push({
        key: `${e.project}|${e.skill}`,
        d: `M${f(x1)} ${f(y1)} C${f(x1)} ${f(y1 + k)} ${f(x2)} ${f(y2 - k)} ${f(x2)} ${f(y2)}`,
        project: e.project,
        skill: e.skill,
      });
    }
    setPaths(next);
  }, []);

  useLayoutEffect(() => {
    measure();
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPinned(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const lit = useMemo(() => {
    const skillSet = new Set<string>();
    const projectSet = new Set<string>();
    if (focus?.kind === "skill") {
      skillSet.add(focus.id);
      projectsForSkill(focus.id).forEach((p) => projectSet.add(p));
    } else if (focus?.kind === "project") {
      projectSet.add(focus.id);
      skillsForProject(focus.id).forEach((s) => skillSet.add(s));
    }
    return { skillSet, projectSet };
  }, [focus]);

  const isEdgeLit = (p: RootPath) =>
    focus?.kind === "skill"
      ? p.skill === focus.id
      : focus?.kind === "project"
        ? p.project === focus.id
        : false;

  let status = "Select a project or a skill to see how they connect.";
  if (focus?.kind === "project") {
    status = `${focus.id} draws on ${skillsForProject(focus.id).length} of these skills.`;
  } else if (focus?.kind === "skill") {
    const used = projectsForSkill(focus.id);
    status = used.length
      ? `${focus.id} is used in ${listToText(used)}.`
      : `${focus.id} is part of my foundations rather than a single project.`;
  }

  // Hover previews only for a real mouse, and focus previews only for keyboard
  // users; taps rely on the pinned state so nothing stays stuck on touch screens.
  const bind = (f: NonNullable<Focus>) => ({
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") setHovered(f);
    },
    onPointerLeave: () => setHovered(null),
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      if (e.currentTarget.matches(":focus-visible")) setHovered(f);
    },
    onBlur: () => setHovered(null),
    onClick: () => setPinned((cur) => (cur?.kind === f.kind && cur.id === f.id ? null : f)),
    "aria-pressed": pinned?.kind === f.kind && pinned.id === f.id,
  });

  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <SectionHeading
          location="Line map · service routes"
          eyebrow="The routes behind my projects"
          title="Skills"
        />
      </Reveal>

      <div ref={containerRef} className="relative">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        >
          {paths.map((p, i) => {
            const on = isEdgeLit(p);
            const dim = !!focus && !on;
            const color = LINE_COLORS[skillCategory[p.skill]] ?? "var(--accent)";
            return (
              <g key={p.key}>
                <path
                  d={p.d}
                  pathLength={1}
                  fill="none"
                  strokeLinecap="round"
                  strokeWidth={on ? 2.5 : 1.5}
                  strokeDasharray="1"
                  stroke={on ? color : "var(--muted)"}
                  style={{
                    opacity: on ? 0.95 : dim ? 0.1 : undefined,
                    strokeDashoffset: grown ? 0 : 1,
                    transition: reduce
                      ? undefined
                      : `stroke-dashoffset 1.6s cubic-bezier(.22,1,.36,1) ${i * 0.02}s, opacity .3s`,
                  }}
                  className={!on ? (dim ? "" : "opacity-0 sm:opacity-25") : undefined}
                />
                {on && !reduce ? (
                  <path
                    d={p.d}
                    pathLength={1}
                    fill="none"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    stroke="var(--signal)"
                    className="transit-flow"
                  />
                ) : null}
              </g>
            );
          })}
        </svg>

        <ul className="relative grid grid-cols-2 gap-3 lg:grid-cols-4">
          {projectNodes.map((p) => {
            const on = lit.projectSet.has(p.id);
            return (
              <li key={p.id}>
                <button
                  type="button"
                  ref={(el) => {
                    if (el) projectRefs.current.set(p.id, el);
                  }}
                  {...bind({ kind: "project", id: p.id })}
                  className={`flex h-full w-full cursor-pointer items-center gap-3 rounded-2xl border bg-surface px-3 py-3 text-left transition-[border-color,opacity,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                    on ? "border-accent" : "border-border"
                  } ${focus && !on ? "opacity-50" : ""}`}
                >
                  <StationGlyph lit={on} />
                  <span className="min-w-0">
                    <span className="block text-sm leading-tight font-semibold">{p.id}</span>
                    <span className="mt-0.5 block text-xs leading-snug text-muted">
                      {p.tagline}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p aria-live="polite" className="relative mt-5 min-h-[1.5rem] text-sm text-muted">
          <span className="bg-background">{status}</span>
        </p>

        <div className="relative mt-14 grid gap-x-10 gap-y-10 sm:mt-28 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => {
            const lineColor = LINE_COLORS[group.category] ?? "var(--accent)";
            return (
              <div key={group.category}>
                <h3 className="font-display mb-3 flex items-center gap-2 text-lg italic">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: lineColor }} />
                  <span className="bg-background pr-2">{group.category}</span>
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const on = lit.skillSet.has(item);
                    return (
                      <li key={item}>
                        <button
                          type="button"
                          ref={(el) => {
                            if (el) skillRefs.current.set(item, el);
                          }}
                          {...bind({ kind: "skill", id: item })}
                          style={
                            on
                              ? { borderColor: lineColor, backgroundColor: lineColor, color: "#fff" }
                              : { borderColor: "var(--border)" }
                          }
                          className={`cursor-pointer rounded-full border bg-surface px-3 py-1 text-sm transition-[background-color,color,border-color,opacity] duration-300 ${
                            on ? "" : "text-muted hover:text-foreground"
                          } ${focus && !on ? "opacity-45" : ""}`}
                        >
                          {item}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
