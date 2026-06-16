import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { education } from "@/data/resume";

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-5xl px-6 py-20">
      <Reveal>
        <SectionHeading eyebrow="Academic background" title="Education" />
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {education.map((item, i) => (
          <Reveal
            key={item.course}
            delay={i * 0.05}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <h3 className="text-base font-semibold">{item.course}</h3>
            <p className="mt-1 text-sm font-medium text-accent">{item.institute}</p>
            <div className="mt-3 flex items-center justify-between text-sm text-muted">
              <span>{item.period}</span>
              <span>{item.detail}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
