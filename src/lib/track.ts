/** Geometry helpers that turn a path into a pair of rails with regular ties, like real track. */

export type Pt = { x: number; y: number };

function dist(a: Pt, b: Pt) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

/** Points along a cubic bezier, evenly spaced in `t` (not arc length — resample() fixes that) */
export function cubicBezierPoints(p0: Pt, p1: Pt, p2: Pt, p3: Pt, steps: number): Pt[] {
  const pts: Pt[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const mt = 1 - t;
    pts.push({
      x: mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x,
      y: mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y,
    });
  }
  return pts;
}

/** Resamples a polyline to roughly even spacing along its length */
export function resample(points: Pt[], spacing: number): Pt[] {
  if (points.length < 2) return points;
  const cum: number[] = [0];
  for (let i = 1; i < points.length; i++) cum.push(cum[i - 1] + dist(points[i - 1], points[i]));
  const total = cum[cum.length - 1];
  if (total <= 0) return points;

  const out: Pt[] = [];
  let seg = 0;
  for (let d = 0; d <= total; d += spacing) {
    while (seg < cum.length - 2 && cum[seg + 1] < d) seg++;
    const segLen = cum[seg + 1] - cum[seg] || 1;
    const t = (d - cum[seg]) / segLen;
    const a = points[seg];
    const b = points[seg + 1];
    out.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
  }
  return out;
}

function pathFromPoints(points: Pt[]) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
}

export type Track = { rail1: string; rail2: string; ties: string };

/**
 * Turns an evenly-resampled polyline into two parallel rail paths plus regular
 * perpendicular tie marks — real train track, not just a line.
 */
export function trackFromPoints(
  points: Pt[],
  { gap = 5, tieEvery = 2, tieOverhang = 2.5 }: { gap?: number; tieEvery?: number; tieOverhang?: number } = {}
): Track {
  if (points.length < 2) return { rail1: "", rail2: "", ties: "" };

  const rail1: Pt[] = [];
  const rail2: Pt[] = [];
  const ties: string[] = [];

  for (let i = 0; i < points.length; i++) {
    const prev = points[Math.max(0, i - 1)];
    const next = points[Math.min(points.length - 1, i + 1)];
    const tx = next.x - prev.x;
    const ty = next.y - prev.y;
    const len = Math.hypot(tx, ty) || 1;
    const nx = -ty / len;
    const ny = tx / len;
    const p = points[i];

    rail1.push({ x: p.x + nx * gap, y: p.y + ny * gap });
    rail2.push({ x: p.x - nx * gap, y: p.y - ny * gap });

    if (i % tieEvery === 0) {
      const half = gap + tieOverhang;
      const a = { x: p.x + nx * half, y: p.y + ny * half };
      const b = { x: p.x - nx * half, y: p.y - ny * half };
      ties.push(`M${a.x.toFixed(1)} ${a.y.toFixed(1)} L${b.x.toFixed(1)} ${b.y.toFixed(1)}`);
    }
  }

  return { rail1: pathFromPoints(rail1), rail2: pathFromPoints(rail2), ties: ties.join(" ") };
}

/** Convenience: build track parts straight from a cubic bezier's control points */
export function trackFromBezier(
  p0: Pt,
  p1: Pt,
  p2: Pt,
  p3: Pt,
  opts?: { gap?: number; tieEvery?: number; tieOverhang?: number; spacing?: number }
): Track {
  const raw = cubicBezierPoints(p0, p1, p2, p3, 80);
  const pts = resample(raw, opts?.spacing ?? 18);
  return trackFromPoints(pts, opts);
}
