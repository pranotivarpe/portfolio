import { TrainFront } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        id="main"
        className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center px-6 pt-36 pb-24 text-center"
      >
        <span className="glass-panel flex h-20 w-20 items-center justify-center rounded-full text-accent">
          <TrainFront className="h-9 w-9" />
        </span>
        <h1 className="font-display mt-6 text-5xl font-medium tracking-tight">End of the line</h1>
        <p className="mt-4 text-lg text-muted">
          This station doesn&apos;t exist, or the route has changed.
        </p>
        <Link
          href="/"
          className="btn-shine shadow-glow mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
        >
          Back to the terminus
        </Link>
      </main>
    </>
  );
}
