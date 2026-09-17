import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectLinks from "@/components/ProjectLinks";
import RootFlow from "@/components/RootFlow";
import StationCard from "@/components/StationCard";
import { getProject, projects } from "@/data/resume";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.name} | Pranoti Varpe`;
  return {
    title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title, description: project.description, url: `/projects/${project.slug}` },
  };
}

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-3xl font-medium tracking-tight">{children}</h2>;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Navbar />
      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-6 pt-28 pb-24">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All projects
        </Link>

        <header className="mt-8 grid items-center gap-10 md:grid-cols-[1fr_16rem]">
          <div>
            <p className="font-display text-lg text-accent italic">{project.tagline}</p>
            <h1 className="font-display mt-1 text-5xl font-medium tracking-tight text-balance sm:text-6xl">
              {project.name}
            </h1>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-muted">
              {project.description}
            </p>
            <div className="mt-6">
              <ProjectLinks github={project.github} demo={project.demo} />
            </div>
          </div>
          <StationCard
            seed={project.slug}
            name={project.name}
            stack={project.stack}
            className="mx-auto w-full max-w-[16rem]"
          />
        </header>

        <section className="mt-20">
          <Heading>What it does</Heading>
          <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {project.features.map((f) => (
              <li key={f} className="flex gap-3 leading-relaxed">
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20">
          <Heading>How it works</Heading>
          <p className="mt-2 max-w-prose text-muted">
            The path a request takes through the system, from the screen to the data and back.
          </p>
          <div className="mt-10">
            <RootFlow steps={project.flow} />
          </div>
        </section>

        <section className="mt-20">
          <Heading>Built with</Heading>
          <dl className="mt-6 divide-y divide-border border-y border-border">
            {project.layers.map((l) => (
              <div key={l.layer} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="font-display text-accent italic">{l.layer}</dt>
                <dd>{l.tech}</dd>
              </div>
            ))}
          </dl>
        </section>

        {project.notes ? (
          <section className="mt-20">
            <Heading>In my words</Heading>
            <p className="mt-6 max-w-prose text-lg leading-relaxed">{project.notes}</p>
          </section>
        ) : null}

        <nav
          aria-label="More projects"
          className="mt-24 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
        >
          <Link href={`/projects/${prev.slug}`} className="group">
            <span className="inline-flex items-center gap-1.5 text-sm text-muted">
              <ArrowLeft className="h-4 w-4" />
              Previous
            </span>
            <span className="font-display mt-1 block text-2xl group-hover:text-accent">
              {prev.name}
            </span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="group sm:text-right">
            <span className="inline-flex items-center gap-1.5 text-sm text-muted">
              Next
              <ArrowRight className="h-4 w-4" />
            </span>
            <span className="font-display mt-1 block text-2xl group-hover:text-accent">
              {next.name}
            </span>
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}
