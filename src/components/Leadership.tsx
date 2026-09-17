import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { leadership } from "@/data/resume";

export default function Leadership() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <Reveal>
        <SectionHeading eyebrow="Beyond the day job" title="Hackathons & Leadership" />
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {leadership.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i * 0.05}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <span className="text-sm text-muted">{item.period}</span>
            </div>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
              {item.bullets.map((bullet) => (
                <li key={bullet.slice(0, 32)}>{bullet}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
