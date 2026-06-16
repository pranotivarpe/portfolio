import { Mail, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { profile } from "@/data/resume";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-20">
      <Reveal>
        <SectionHeading eyebrow="Let's talk" title="Get in touch" />
        <p className="max-w-xl text-base leading-relaxed text-muted">
          I&apos;m actively looking for Software Developer and Data Engineer roles.
          If you&apos;d like to work together or just want to say hi, my inbox is open.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            <Mail className="h-4 w-4" />
            {profile.email}
          </a>
          {profile.phone ? (
            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent-soft"
            >
              <Phone className="h-4 w-4" />
              {profile.phone}
            </a>
          ) : null}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent-soft"
          >
            <FaLinkedin className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent-soft"
          >
            <FaGithub className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </Reveal>

      <footer className="mt-20 border-t border-border pt-8 text-sm text-muted">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js & Tailwind CSS.
      </footer>
    </section>
  );
}
