import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { projects } from "@/data/resume";

export default function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-surface p-6">
      <h3 className="text-lg font-semibold">{project.name}</h3>
      <p className="text-sm font-medium text-accent">{project.tagline}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
        {project.bullets.map((bullet) => (
          <li key={bullet.slice(0, 32)}>{bullet}</li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-4 text-sm">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-accent"
          >
            <FaGithub className="h-4 w-4" />
            Code
          </a>
        ) : null}
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-accent"
          >
            <ExternalLink className="h-4 w-4" />
            Live demo
          </a>
        ) : null}
        {!project.github && !project.demo ? (
          <span className="text-xs text-muted">Links coming soon</span>
        ) : null}
      </div>
    </div>
  );
}
