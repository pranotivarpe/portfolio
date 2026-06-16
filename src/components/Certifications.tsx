import { ExternalLink } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { certifications } from "@/data/resume";

export default function Certifications() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <Reveal>
        <SectionHeading eyebrow="Always learning" title="Certifications" />
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-3">
        {certifications.map((cert, i) => {
          const content = (
            <>
              <h3 className="text-sm font-semibold">{cert.name}</h3>
              <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
            </>
          );

          return (
            <Reveal key={cert.name} delay={i * 0.05}>
              {cert.link ? (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent"
                >
                  {content}
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                    View certificate
                    <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                </a>
              ) : (
                <div className="flex flex-col rounded-2xl border border-border bg-surface p-6">
                  {content}
                </div>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
