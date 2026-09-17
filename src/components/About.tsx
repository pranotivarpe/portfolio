import { Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { profile } from "@/data/resume";

const socials = [
  { href: profile.github, label: "GitHub", Icon: FaGithub, external: true },
  { href: profile.linkedin, label: "LinkedIn", Icon: FaLinkedin, external: true },
  { href: `mailto:${profile.email}`, label: "Email", Icon: Mail, external: false },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <div className="grid items-start gap-12 md:grid-cols-[1fr_14rem]">
        <Reveal>
          <SectionHeading
            location="Canopy edge · morning light"
            eyebrow="A little about me"
            title="About"
          />
          <div className="max-w-prose space-y-4 text-base leading-relaxed text-muted">
            {profile.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5 text-sm">
            <span className="inline-flex items-center gap-1.5 text-muted">
              <MapPin className="h-4 w-4" />
              {profile.location}
            </span>
            {socials.map(({ href, label, Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-accent"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-first mx-auto md:order-none">
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rounded-full bg-accent/20 blur-2xl"
            />
            {profile.photo ? (
              <div className="relative h-48 w-40 overflow-hidden rounded-[45%_55%_48%_52%/55%_45%_55%_45%] ring-1 ring-border transition-shadow duration-500 hover:ring-2 hover:ring-accent md:h-64 md:w-56">
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  fill
                  sizes="(min-width: 768px) 14rem, 10rem"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="font-display flex h-48 w-40 items-center justify-center rounded-[45%_55%_48%_52%/55%_45%_55%_45%] bg-accent-soft text-5xl text-accent ring-1 ring-border transition-shadow duration-500 hover:ring-2 hover:ring-accent md:h-64 md:w-56">
                {profile.initials}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
