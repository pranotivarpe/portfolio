import { ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { profile } from "@/data/resume";

const socials = [
  { href: profile.github, label: "GitHub", Icon: FaGithub },
  { href: profile.linkedin, label: "LinkedIn", Icon: FaLinkedin },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-accent/60 to-transparent"
      />
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built in Pune, running on Next.js.
          </p>
          <div className="flex items-center gap-4">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <p>
            Press <kbd className="rounded border border-border px-1.5 py-0.5 text-xs">Ctrl K</kbd>{" "}
            (<kbd className="rounded border border-border px-1.5 py-0.5 text-xs">⌘K</kbd> on Mac)
            to jump anywhere.
          </p>
          <a
            href="#top"
            aria-label="Back to top"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
