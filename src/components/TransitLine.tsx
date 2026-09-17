"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useMemo, useRef, useState } from "react";
import TrainIcon from "./TrainIcon";
import { OPEN_TRAIL_MAP } from "@/lib/theme";
import { resample, trackFromPoints, type Pt } from "@/lib/track";

const STATIONS = [0.08, 0.2, 0.33, 0.46, 0.58, 0.7, 0.82, 0.94];
const VERTICES: Pt[] = [
  { x: 16, y: 0 },
  { x: 16, y: 60 },
  { x: 8, y: 80 },
  { x: 8, y: 180 },
  { x: 24, y: 200 },
  { x: 24, y: 310 },
  { x: 8, y: 330 },
  { x: 8, y: 440 },
  { x: 24, y: 460 },
  { x: 24, y: 560 },
  { x: 8, y: 580 },
  { x: 8, y: 680 },
  { x: 24, y: 700 },
  { x: 24, y: 800 },
  { x: 8, y: 820 },
  { x: 8, y: 920 },
  { x: 24, y: 940 },
  { x: 24, y: 1000 },
];
const LINE_PATH = VERTICES.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ");
const RING_R = 18;
const RING_C = 2 * Math.PI * RING_R;

/** A transit line down the left edge that extends as you read, with a train riding its lead */
export default function TransitLine() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const progress = reduce ? scrollYProgress : smooth;
  const [reached, setReached] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);
  const ringOffset = useTransform(progress, (v) => RING_C * (1 - Math.max(0, Math.min(1, v))));

  const track = useMemo(() => trackFromPoints(resample(VERTICES, 12), { gap: 2.6, tieEvery: 1, tieOverhang: 1.8 }), []);

  useMotionValueEvent(progress, "change", (v) => {
    const count = STATIONS.filter((at) => v >= at).length;
    setReached((r) => (r === count ? r : count));

    const path = pathRef.current;
    const train = trainRef.current;
    if (!path || !train) return;
    const len = path.getTotalLength();
    const pt = path.getPointAtLength(len * Math.max(0, Math.min(1, v)));
    train.style.left = `${(pt.x / 32) * 100}%`;
    train.style.top = `${(pt.y / 1000) * 100}%`;
  });

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-24 bottom-8 left-4 z-40 hidden w-8 2xl:left-8 xl:block"
      >
        <svg viewBox="0 0 32 1000" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d={track.ties} className="stroke-border" strokeWidth={2} vectorEffect="non-scaling-stroke" />
          <path
            d={track.rail1}
            fill="none"
            className="stroke-border"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={track.rail2}
            fill="none"
            className="stroke-border"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
          <motion.path
            ref={pathRef}
            d={LINE_PATH}
            fill="none"
            className="stroke-accent"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: progress }}
          />
        </svg>
        {STATIONS.map((at, i) => (
          <span
            key={at}
            className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-background transition-[background-color] duration-500"
            style={{
              top: `${at * 100}%`,
              left: i % 2 === 0 ? "8px" : "24px",
              backgroundColor: i < reached ? "var(--accent)" : "var(--background)",
            }}
          />
        ))}
        <div
          ref={trainRef}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: "50%", top: "0%", width: "26px", filter: "drop-shadow(0 0 6px var(--signal))" }}
        >
          <TrainIcon bodyColor="var(--signal)" />
        </div>
      </div>

      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event(OPEN_TRAIL_MAP))}
        aria-label="Open the line map to jump to a section or project"
        title="Line map"
        className="glass-panel fixed right-4 bottom-4 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full xl:hidden"
      >
        <svg viewBox="0 0 44 44" className="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="22" cy="22" r={RING_R} fill="none" className="stroke-border" strokeWidth="2" />
          <motion.circle
            cx="22"
            cy="22"
            r={RING_R}
            fill="none"
            className="stroke-accent"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={RING_C}
            style={{ strokeDashoffset: ringOffset }}
          />
        </svg>
        <TrainIcon className="relative h-4 w-7" bodyColor="var(--signal)" />
      </button>
    </>
  );
}
