import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found | FitLog",
  description: "The requested FitLog page could not be found.",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100svh-8rem)] items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-surface px-6 py-14 text-center shadow-2xl shadow-black/20 sm:px-10 sm:py-16">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
          <Dumbbell aria-hidden="true" className="size-7" />
        </div>
        <p className="mt-7 text-sm font-extrabold uppercase tracking-[0.24em] text-accent">
          Error 404
        </p>
        <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-none tracking-tight text-foreground sm:text-6xl">
          Workout Not Found
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-muted">
          This route is off the training plan. Head back to the library and pick
          your next lift.
        </p>
        <Link
          href="/#library"
          className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-extrabold uppercase tracking-[0.1em] text-background transition-colors hover:bg-[#d8ff40] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to workouts
        </Link>
      </div>
    </section>
  );
}
