export const LINE_COLORS = [
  "var(--line-1)",
  "var(--line-2)",
  "var(--line-3)",
  "var(--line-4)",
  "var(--line-5)",
  "var(--line-6)",
  "var(--line-7)",
];

function hashCode(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function colorForSeed(seed: string) {
  return LINE_COLORS[hashCode(seed) % LINE_COLORS.length];
}

export function codeFromName(name: string) {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}
