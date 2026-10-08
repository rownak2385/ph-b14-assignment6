import Link from "next/link";
import { ArrowRight, Bookmark, Dumbbell } from "lucide-react";

type PlanEmptyStateProps = {
  collection: "plan" | "saved";
};

export default function PlanEmptyState({ collection }: PlanEmptyStateProps) {
  const isSaved = collection === "saved";
  const Icon = isSaved ? Bookmark : Dumbbell;

  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-surface/60 px-5 py-14 text-center sm:min-h-96 sm:px-8">
      <span className="inline-flex size-14 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent">
        <Icon aria-hidden="true" className="size-6" />
      </span>
      <h3 className="mt-6 font-display text-3xl font-bold uppercase tracking-[0.04em] text-foreground">
        Nothing Here Yet
      </h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-muted sm:text-base">
        {isSaved
          ? "Save workouts from the library to find them here later."
          : "Browse the library and add a lift to get today moving."}
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-extrabold uppercase tracking-[0.1em] text-background transition-colors hover:bg-[#d8ff40] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        Go to workouts
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </div>
  );
}
