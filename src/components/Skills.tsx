import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { skills } from "@/data/resume";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-20">
      <Reveal>
        <SectionHeading eyebrow="What I work with" title="Skills" />
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal
            key={group.category}
            delay={i * 0.05}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">
              {group.category}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
