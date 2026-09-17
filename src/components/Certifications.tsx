import { ExternalLink } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { TicketCard } from "./TicketCard";
import { certifications } from "@/data/resume";

export default function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <SectionHeading
          location="Transfer passes · collected along the way"
          eyebrow="Punched along the route"
          title="Certifications"
        />
      </Reveal>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => (
          <Reveal key={cert.name} delay={i * 0.05} className="h-full">
            <TicketCard
              compact
              seed={cert.name}
              name={cert.name}
              rows={[{ label: "Issued by", value: cert.issuer }]}
              footer={
                cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
                  >
                    View certificate
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : null
              }
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
