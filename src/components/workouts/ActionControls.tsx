"use client";

import { Bookmark, BookmarkCheck, Check, Plus } from "lucide-react";
import { MAX_PLAN_SIZE, useWorkoutPlan } from "@/context/WorkoutContext";
import { useHydrated } from "@/hooks/useHydrated";
import type { Workout } from "@/types/workout";

type ActionControlsProps = {
  workout: Workout;
};

export default function ActionControls({ workout }: ActionControlsProps) {
  const {
    plan,
    addToPlan,
    saveForLater,
    isInPlan,
    isSaved,
    isHydrated,
  } = useWorkoutPlan();
  const hasHydrated = useHydrated();
  const actionsReady = isHydrated && hasHydrated;
  const inPlan = actionsReady && isInPlan(workout.id);
  const savedForLater = actionsReady && isSaved(workout.id);
  const planIsFull = actionsReady && plan.length >= MAX_PLAN_SIZE;

  let statusMessage = "Add this workout to your plan or save it for later.";

  if (!actionsReady) {
    statusMessage = "Restoring your workout selections…";
  } else if (inPlan && savedForLater) {
    statusMessage = "This workout is in today's plan and saved for later.";
  } else if (inPlan) {
    statusMessage = "This workout is already in today's plan.";
  } else if (savedForLater) {
    statusMessage = "This workout is already saved for later.";
  } else if (planIsFull) {
    statusMessage = `Today's plan is full (${MAX_PLAN_SIZE} workout maximum).`;
  }

  return (
    <div className="border-t border-white/10 pt-7">
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          disabled={!actionsReady}
          aria-disabled={inPlan || planIsFull}
          aria-pressed={inPlan}
          aria-describedby="workout-actions-status"
          aria-label={
            inPlan
              ? `${workout.name} is already in today's plan`
              : planIsFull
                ? `Today's plan is full; ${workout.name} cannot be added`
                : `Add ${workout.name} to today's plan`
          }
          onClick={() => addToPlan(workout)}
          className={`inline-flex min-h-12 items-center justify-center gap-2.5 rounded-md px-5 py-3 text-sm font-extrabold uppercase tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-60 ${
            inPlan
              ? "cursor-not-allowed border border-accent/40 bg-accent/10 text-accent"
              : planIsFull
                ? "cursor-not-allowed border border-white/10 bg-white/5 text-muted"
                : "bg-accent text-background hover:bg-[#d8ff40]"
          }`}
        >
          {inPlan ? (
            <Check aria-hidden="true" className="size-5" />
          ) : (
            <Plus aria-hidden="true" className="size-5" />
          )}
          {inPlan
            ? "In Today's Plan"
            : planIsFull
              ? "Plan Limit Reached"
              : "Add to Today's Plan"}
        </button>
        <button
          type="button"
          disabled={!actionsReady}
          aria-disabled={savedForLater}
          aria-pressed={savedForLater}
          aria-describedby="workout-actions-status"
          aria-label={
            savedForLater
              ? `${workout.name} is already saved for later`
              : `Save ${workout.name} for later`
          }
          onClick={() => saveForLater(workout)}
          className={`inline-flex min-h-12 items-center justify-center gap-2.5 rounded-md border px-5 py-3 text-sm font-extrabold uppercase tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-60 ${
            savedForLater
              ? "cursor-not-allowed border-accent/40 bg-accent/10 text-accent"
              : "border-white/15 text-foreground hover:border-accent hover:text-accent"
          }`}
        >
          {savedForLater ? (
            <BookmarkCheck aria-hidden="true" className="size-5" />
          ) : (
            <Bookmark aria-hidden="true" className="size-5" />
          )}
          {savedForLater ? "Saved for Later" : "Save for Later"}
        </button>
      </div>
      <p id="workout-actions-status" className="mt-3 text-xs text-muted">
        {statusMessage}
      </p>
    </div>
  );
}
