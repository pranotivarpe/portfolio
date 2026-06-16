import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { experience } from "@/data/resume";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-20">
      <Reveal>
        <SectionHeading eyebrow="Where I've worked" title="Experience" />
      </Reveal>

      <div className="space-y-8 border-l border-border pl-8">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.05} className="relative">
            <span className="absolute -left-[2.3rem] top-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-background" />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-lg font-semibold">{job.role}</h3>
              <span className="text-sm text-muted">{job.period}</span>
            </div>
            <p className="text-sm font-medium text-accent">{job.company}</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
              {job.bullets.map((bullet) => (
                <li key={bullet.slice(0, 32)}>{bullet}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
