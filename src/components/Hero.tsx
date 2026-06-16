import { Download, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import Reveal from "./Reveal";
import { profile } from "@/data/resume";

export default function Hero() {
  return (
    <section
      id="about"
      className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-12 px-6 pt-20 pb-24 sm:pt-28 md:flex-row md:items-start"
    >
      <Reveal className="flex-1">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Open to Software Developer & Data Engineer roles
        </p>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          Hi, I&apos;m {profile.name}
        </h1>
        <p className="mt-3 text-xl font-medium text-accent">{profile.title}</p>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="h-4 w-4" />
          {profile.location}
        </p>

        <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
          {profile.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={profile.resumeFile}
            download
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent-soft"
          >
            Get in touch
          </a>

          <div className="flex items-center gap-3 pl-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted transition-colors hover:text-foreground"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted transition-colors hover:text-foreground"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="text-muted transition-colors hover:text-foreground"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="shrink-0">
        {profile.photo ? (
          <div className="relative h-40 w-40 overflow-hidden rounded-full ring-4 ring-surface sm:h-48 sm:w-48">
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              priority
              sizes="(min-width: 640px) 12rem, 10rem"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-40 w-40 items-center justify-center rounded-full bg-linear-to-br from-accent to-violet-400 text-4xl font-semibold text-white sm:h-48 sm:w-48">
            {profile.initials}
          </div>
        )}
      </Reveal>
    </section>
  );
}
