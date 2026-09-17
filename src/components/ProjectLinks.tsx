import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

export default function ProjectLinks({
  github,
  demo,
}: {
  github: string | null;
  demo: string | null;
}) {
  if (!github && !demo) {
    return (
      <p className="text-sm text-muted">
        Private repo. Happy to walk through the code on a call.
      </p>
    );
  }
  return (
    <div className="flex flex-wrap items-center gap-5 text-sm">
      {github ? (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium hover:text-accent"
        >
          <FaGithub className="h-4 w-4" />
          View code
        </a>
      ) : null}
      {demo ? (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium hover:text-accent"
        >
          <ExternalLink className="h-4 w-4" />
          Open live demo
        </a>
      ) : null}
    </div>
  );
}
