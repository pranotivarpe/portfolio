"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";
import TrainIcon from "./TrainIcon";
import type { Ring } from "@/lib/skillGraph";
import { resample, trackFromPoints } from "@/lib/track";

const Y_STEP = 96;
const PAD = 32;

/** A vertical line of stops, most recent at the top, with a train parked at the active one */
export default function LineDiagram({
  rings,
  active,
  onHover,
}: {
  rings: Ring[];
  active: string | null;
  onHover: (id: string | null) => void;
}) {
  const reduce = useReducedMotion();
  const height = PAD * 2 + (rings.length - 1) * Y_STEP;
  const activeIndex = Math.max(
    0,
    rings.findIndex((r) => r.id === active)
  );
  const activeY = PAD + activeIndex * Y_STEP;

  const track = useMemo(
    () =>
      trackFromPoints(
        resample(
          [
            { x: 28, y: PAD },
            { x: 28, y: height - PAD },
          ],
          18
        ),
        { gap: 4, tieEvery: 1, tieOverhang: 2 }
      ),
    [height]
  );

  return (
    <svg
      viewBox={`0 0 220 ${height}`}
      role="img"
      aria-label="A vertical line showing each role and hackathon as a stop, most recent at the top."
      className="h-auto w-full"
    >
      <path d={track.ties} className="stroke-border" strokeWidth={2} />
      <path d={track.rail1} fill="none" className="stroke-border" strokeWidth={1.5} />
      <path d={track.rail2} fill="none" className="stroke-border" strokeWidth={1.5} />
      <motion.line
        x1="28"
        y1={PAD}
        x2="28"
        stroke="var(--accent)"
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={false}
        animate={{ y2: activeY }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 90, damping: 18 }}
      />

      {rings.map((ring, i) => {
        const y = PAD + i * Y_STEP;
        const on = active === ring.id;
        return (
          <g
            key={ring.id}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") onHover(ring.id);
            }}
            onPointerLeave={() => onHover(null)}
            className="cursor-pointer"
          >
            <circle
              cx={28}
              cy={y}
              r={on ? 10 : 7}
              className={`stroke-accent transition-[r] duration-300 ${on ? "fill-accent" : "fill-background"}`}
              strokeWidth={3}
            />
            <text
              x={54}
              y={y}
              dy="0.32em"
              className={`text-[13px] font-semibold transition-[fill] duration-300 ${on ? "fill-accent" : "fill-muted"}`}
            >
              {ring.short}
            </text>
            <text x={54} y={y + 17} className="fill-muted text-[10px] tracking-wide uppercase opacity-70">
              {ring.kind}
            </text>
          </g>
        );
      })}

      <motion.g
        initial={false}
        animate={{ y: activeY }}
        style={{ x: 28, filter: "drop-shadow(0 0 5px var(--signal))" }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 90, damping: 18 }}
      >
        <g transform="rotate(90) translate(-16, -9) scale(0.5)">
          <TrainIcon bodyColor="var(--signal)" />
        </g>
      </motion.g>
    </svg>
  );
}
