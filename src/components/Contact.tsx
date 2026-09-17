"use client";

import { Mail } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { profile } from "@/data/resume";

type Status = "idle" | "sending" | "sent" | "error";

function ArrivalStamp() {
  const reduce = useReducedMotion();
  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { duration: 0.5, delay, ease: "easeOut" as const },
        };
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true" className="h-20 w-20">
      <motion.circle
        cx="40"
        cy="40"
        r="30"
        className="fill-none stroke-accent"
        strokeWidth="3"
        initial={reduce ? false : { scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "40px 40px" }}
      />
      <motion.path
        d="M26 41 L36 51 L55 29"
        className="fill-none stroke-accent"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...draw(0.35)}
      />
      <motion.circle
        cx="40"
        cy="40"
        r="30"
        className="fill-none stroke-signal"
        strokeWidth="2"
        initial={reduce ? {} : { scale: 1, opacity: 0.6 }}
        animate={reduce ? {} : { scale: 1.35, opacity: 0 }}
        transition={reduce ? {} : { duration: 1.2, delay: 0.6, ease: "easeOut" }}
        style={{ transformOrigin: "40px 40px" }}
      />
    </svg>
  );
}

const field =
  "mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted/70 transition-shadow focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "The message couldn't be delivered right now.");
      setSentTo(data.email);
      setStatus("sent");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "The message couldn't be delivered right now.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <SectionHeading
          location="Final destination · end of the line"
          eyebrow="All aboard"
          title="Get in touch"
        />
      </Reveal>

      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <Reveal>
          <p className="max-w-sm text-lg leading-relaxed text-muted">
            I&apos;m looking for full-time Software Developer and Full-Stack Developer roles, in
            Pune or remote. Send a note and I&apos;ll reply by email.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2.5 font-medium hover:text-accent">
                <Mail className="h-4 w-4" />
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 font-medium hover:text-accent">
                <FaLinkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 font-medium hover:text-accent">
                <FaGithub className="h-4 w-4" />
                GitHub
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.05}>
          <AnimatePresence mode="wait" initial={false}>
            {status === "sent" ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center rounded-[1.75rem] border border-border bg-surface px-6 py-12 text-center"
                role="status"
              >
                <ArrivalStamp />
                <p className="font-display mt-4 text-2xl">Message sent</p>
                <p className="mt-2 max-w-xs text-muted">
                  Thanks for reaching out. I&apos;ll reply to {sentTo} soon.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 cursor-pointer text-sm font-medium text-accent hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -12 }}
                onSubmit={onSubmit}
                className="space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-medium">
                    Name
                    <input name="name" required maxLength={100} autoComplete="name" className={field} />
                  </label>
                  <label className="block text-sm font-medium">
                    Email
                    <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
                  </label>
                </div>
                <label className="block text-sm font-medium">
                  Message
                  <textarea
                    name="message"
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={6}
                    placeholder="A role you're hiring for, a project, or just hello"
                    className={`${field} resize-y`}
                  />
                </label>
                {/* Left empty by people; bots tend to fill it in */}
                <div aria-hidden="true" className="absolute -left-[9999px]">
                  <label>
                    Company
                    <input name="company" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                {status === "error" ? (
                  <p role="alert" className="rounded-xl border border-border bg-accent-soft/50 px-4 py-3 text-sm">
                    {error} You can also email me directly at{" "}
                    <a href={`mailto:${profile.email}`} className="font-medium text-accent underline">
                      {profile.email}
                    </a>
                    .
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-shine shadow-glow inline-flex cursor-pointer items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
