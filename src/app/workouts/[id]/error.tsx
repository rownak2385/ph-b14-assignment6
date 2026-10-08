"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

export default function WorkoutDetailsError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[28rem] w-full max-w-3xl flex-col items-center justify-center rounded-2xl border border-red-400/20 bg-surface px-6 py-12 text-center">
        <AlertTriangle aria-hidden="true" className="size-12 text-red-300" />
        <h1 className="mt-6 font-display text-4xl font-bold uppercase text-foreground">
          Workout unavailable
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-6 text-muted sm:text-base">
          We couldn&apos;t load this workout right now. Check your connection and
          try again.
        </p>
        <div className="mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-extrabold uppercase tracking-[0.1em] text-background transition-colors hover:bg-[#d8ff40] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <RefreshCw aria-hidden="true" className="size-4" />
            Try again
          </button>
          <Link
            href="/#library"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/15 px-5 py-2.5 text-sm font-extrabold uppercase tracking-[0.1em] text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Workouts
          </Link>
        </div>
      </div>
    </section>
  );
}
