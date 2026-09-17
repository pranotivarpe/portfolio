import { experience, leadership, projects, skills } from "@/data/resume";

/** Stack labels on projects that are spelled differently in the skills list */
const ALIASES: Record<string, string> = {
  React: "React.js",
  Prisma: "Prisma ORM",
  "Java 17": "Java",
  JWT: "JWT Authentication",
  CSS: "CSS3",
};

/** Skills a project uses that aren't spelled out in its stack list */
const EXTRA: Record<string, string[]> = {
  "Cafe POS": ["REST API Development", "CRUD Operations"],
  "AI Voice Note Summarizer": [
    "REST API Development",
    "External API Integration",
    "JSON Handling",
    "Responsive UI Design",
    "Git",
    "GitHub",
  ],
  EShop: ["REST API Development", "Git", "GitHub"],
  ShopNest: ["REST API Development", "CRUD Operations", "External API Integration", "Git", "GitHub"],
};

export type SkillNode = { id: string; category: string };
export type ProjectNode = { id: string; tagline: string };
export type Edge = { project: string; skill: string };

const known = new Set(skills.flatMap((g) => g.items as readonly string[]));

export const skillNodes: SkillNode[] = skills.flatMap((g) =>
  g.items.map((id) => ({ id, category: g.category }))
);

export const projectNodes: ProjectNode[] = projects.map((p) => ({
  id: p.name,
  tagline: p.tagline,
}));

export const edges: Edge[] = projects.flatMap((p) => {
  const names = new Set<string>([
    ...p.stack.map((s) => ALIASES[s] ?? s),
    ...(EXTRA[p.name] ?? []),
  ]);
  return [...names].filter((n) => known.has(n)).map((skill) => ({ project: p.name, skill }));
});

export function projectsForSkill(skill: string) {
  return edges.filter((e) => e.skill === skill).map((e) => e.project);
}

export function skillsForProject(project: string) {
  return edges.filter((e) => e.project === project).map((e) => e.skill);
}

// ---------- growth rings ----------

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function startOf(period: string) {
  const m = period.match(/([A-Z][a-z]{2})\s+(\d{4})/);
  if (!m) return { key: 0, label: period };
  const month = MONTHS.indexOf(m[1]);
  return { key: Number(m[2]) * 12 + month, label: `${m[1]} '${m[2].slice(2)}` };
}

export type Ring = {
  id: string;
  kind: "Internship" | "Hackathon";
  title: string;
  org: string;
  period: string;
  short: string;
  sortKey: number;
  bullets: readonly string[];
};

/** Oldest first: the innermost ring is the earliest */
export const rings: Ring[] = [
  ...experience.map((e) => ({
    id: e.company,
    kind: "Internship" as const,
    title: e.role,
    org: e.company,
    period: e.period,
    short: startOf(e.period).label,
    sortKey: startOf(e.period).key,
    bullets: e.bullets,
  })),
  ...leadership.map((l) => ({
    id: l.title,
    kind: "Hackathon" as const,
    title: l.title,
    org: "Hackathon",
    period: l.period,
    short: startOf(l.period).label,
    sortKey: startOf(l.period).key,
    bullets: l.bullets,
  })),
].sort((a, b) => a.sortKey - b.sortKey);
