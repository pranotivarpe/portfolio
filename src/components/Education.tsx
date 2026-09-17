import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { TicketCard } from "./TicketCard";
import { education } from "@/data/resume";

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <SectionHeading
          location="Origin stations · where the line began"
          eyebrow="Tickets from the start of the route"
          title="Education"
        />
      </Reveal>

      <div className="grid gap-8 sm:grid-cols-2">
        {education.map((item, i) => (
          <Reveal key={item.course} delay={i * 0.05} className="h-full">
            <TicketCard
              seed={item.course}
              name={item.course}
              rows={[
                { label: "Institution", value: item.institute },
                { label: "Years", value: item.period },
                { label: "Result", value: item.detail },
              ]}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
