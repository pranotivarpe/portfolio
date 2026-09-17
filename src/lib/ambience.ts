/** Deterministic scatter of signal lights down the length of the page */

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Sprite = {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
};

export function generateSprites(count: number, seed = 1337): Sprite[] {
  const rng = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: 2 + rng() * 96,
    left: 3 + rng() * 94,
    size: 0.4 + rng() * 0.9,
    delay: rng() * 9,
    duration: 7 + rng() * 9,
    drift: 8 + rng() * 20,
  }));
}
