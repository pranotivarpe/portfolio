"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";
import TrainIcon from "./TrainIcon";
import { cubicBezierPoints, trackFromBezier, type Pt } from "@/lib/track";

type Line = {
  color: string;
  p0: Pt;
  p1: Pt;
  p2: Pt;
  p3: Pt;
  stations: [number, number][];
  delay: number;
};

const LINES: Line[] = [
  {
    color: "var(--line-2)",
    p0: { x: 100, y: 850 },
    p1: { x: 300, y: 700 },
    p2: { x: 500, y: 300 },
    p3: { x: 800, y: 70 },
    stations: [
      [452, 618],
      [652, 282],
    ],
    delay: 0,
  },
  {
    color: "var(--line-3)",
    p0: { x: 1500, y: 850 },
    p1: { x: 1300, y: 700 },
    p2: { x: 1100, y: 300 },
    p3: { x: 800, y: 70 },
    stations: [
      [1148, 618],
      [948, 282],
    ],
    delay: 0.15,
  },
  {
    color: "var(--line-1)",
    p0: { x: 0, y: 400 },
    p1: { x: 250, y: 250 },
    p2: { x: 550, y: 120 },
    p3: { x: 800, y: 70 },
    stations: [
      [186, 296],
      [502, 148],
    ],
    delay: 0.3,
  },
  {
    color: "var(--line-4)",
    p0: { x: 1600, y: 400 },
    p1: { x: 1350, y: 250 },
    p2: { x: 1050, y: 120 },
    p3: { x: 800, y: 70 },
    stations: [
      [1414, 296],
      [1098, 148],
    ],
    delay: 0.45,
  },
];

const MAIN_LINE = LINES[0];

/** A transit map converging on one terminus, drawn as real track with a train waiting at the platform */
export default function TransitDiagram({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  // Rest the train a little short of the terminus, angled to match the track there
  const trainSpot = useMemo(() => {
    const pts = cubicBezierPoints(MAIN_LINE.p0, MAIN_LINE.p1, MAIN_LINE.p2, MAIN_LINE.p3, 20);
    const i = 16;
    const a = pts[i - 1];
    const b = pts[i + 1];
    const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    return { x: pts[i].x, y: pts[i].y, angle };
  }, []);

  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { duration: 1.3, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  const pop = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={`h-full w-full ${className}`}
    >
      {LINES.map((line, i) => {
        const track = trackFromBezier(line.p0, line.p1, line.p2, line.p3, {
          gap: 4.5,
          tieEvery: 2,
          tieOverhang: 3,
        });
        return (
          <g key={i}>
            <motion.path
              d={track.ties}
              stroke="var(--border)"
              strokeWidth={3}
              opacity={0.8}
              {...draw(0.3 + line.delay)}
            />
            <motion.path
              d={track.rail1}
              fill="none"
              stroke={line.color}
              strokeWidth={2.5}
              strokeLinecap="round"
              opacity={0.9}
              {...draw(0.3 + line.delay)}
            />
            <motion.path
              d={track.rail2}
              fill="none"
              stroke={line.color}
              strokeWidth={2.5}
              strokeLinecap="round"
              opacity={0.9}
              {...draw(0.3 + line.delay)}
            />
            {line.stations.map(([x, y], si) => (
              <motion.circle
                key={si}
                cx={x}
                cy={y}
                r={7}
                fill="var(--background)"
                stroke={line.color}
                strokeWidth={4}
                {...pop(0.9 + line.delay + si * 0.15)}
              />
            ))}
          </g>
        );
      })}

      <motion.circle
        cx={800}
        cy={70}
        r={12}
        fill="var(--accent)"
        {...pop(1.5)}
        style={{ transformOrigin: "800px 70px" }}
      />
      <motion.circle
        cx={800}
        cy={70}
        r={12}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={2}
        initial={reduce ? {} : { scale: 1, opacity: 0.6 }}
        animate={reduce ? {} : { scale: 2.4, opacity: 0 }}
        transition={reduce ? {} : { duration: 2, delay: 1.6, repeat: Infinity, ease: "easeOut" }}
        style={{ transformOrigin: "800px 70px" }}
      />

      <g transform={`translate(${trainSpot.x.toFixed(1)} ${trainSpot.y.toFixed(1)}) rotate(${trainSpot.angle.toFixed(1)})`}>
        <motion.g
          initial={reduce ? false : { opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "0px 0px" }}
        >
          <g transform="translate(-32, -18)">
            <TrainIcon bodyColor="var(--line-2)" />
          </g>
        </motion.g>
      </g>
    </svg>
  );
}
