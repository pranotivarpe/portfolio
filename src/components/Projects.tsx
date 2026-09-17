import Link from "next/link";
import ProjectLinks from "./ProjectLinks";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import StationCard from "./StationCard";
import { projects } from "@/data/resume";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <SectionHeading
          location="Express stops · notable builds"
          eyebrow="Notes from along the route"
          title="Projects"
        />
      </Reveal>

      <div className="space-y-20 sm:space-y-24">
        {projects.map((project, i) => (
          <Reveal key={project.slug}>
            <article
              className={`grid items-center gap-8 md:gap-14 ${
                i % 2 ? "md:grid-cols-[1fr_17rem]" : "md:grid-cols-[17rem_1fr]"
              }`}
            >
              <StationCard
                seed={project.slug}
                name={project.name}
                stack={project.stack}
                className={`mx-auto w-full max-w-[17rem] ${i % 2 ? "md:order-last" : ""}`}
              />

              <div>
                <p className="font-display text-accent italic">{project.tagline}</p>
                <h3 className="font-display mt-1 text-3xl font-medium tracking-tight sm:text-4xl">
                  <Link href={`/projects/${project.slug}`} className="hover:text-accent">
                    {project.name}
                  </Link>
                </h3>
                <p className="mt-4 max-w-prose leading-relaxed text-muted">{project.description}</p>

                <ul className="mt-4 max-w-prose list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                  {project.bullets.map((b) => (
                    <li key={b.slice(0, 32)}>{b}</li>
                  ))}
                </ul>

                <p className="mt-4 text-sm text-muted">
                  <span className="font-medium text-foreground">Built with </span>
                  {project.stack.join(", ")}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="btn-shine shadow-glow inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
                  >
                    Read how it works
                  </Link>
                  <ProjectLinks github={project.github} demo={project.demo} />
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
