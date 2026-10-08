"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Clock3,
  Dumbbell,
  ExternalLink,
  Flame,
  ImageOff,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";
import { useWorkoutPlan } from "@/context/WorkoutContext";
import type { Workout } from "@/types/workout";

type PlanWorkoutCardProps = {
  workout: Workout;
  collection: "plan" | "saved";
};

export default function PlanWorkoutCard({
  workout,
  collection,
}: PlanWorkoutCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const isPlannedWorkout = collection === "plan";
  const { isDone, markAsDone, removeFromPlan, removeFromSaved } =
    useWorkoutPlan();
  const completed = isPlannedWorkout && isDone(workout.id);

  const removeWorkout = () => {
    if (isPlannedWorkout) {
      removeFromPlan(workout.id);
    } else {
      removeFromSaved(workout.id);
    }
  };

  return (
    <article
      className={`overflow-hidden rounded-xl border bg-surface transition-colors ${
        completed
          ? "border-accent/35 shadow-[inset_3px_0_0_#ccff00]"
          : "border-white/10"
      }`}
    >
      <div className="grid sm:grid-cols-[10rem_minmax(0,1fr)] lg:grid-cols-[11rem_minmax(0,1fr)_auto]">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0d1117] sm:aspect-auto sm:min-h-44">
          {imageFailed ? (
            <div className="flex h-full min-h-40 flex-col items-center justify-center gap-2 text-muted">
              <ImageOff aria-hidden="true" className="size-7" />
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em]">
                Image unavailable
              </span>
            </div>
          ) : (
            <Image
              src={workout.image}
              alt={`${workout.name} workout illustration`}
              fill
              sizes="(min-width: 1024px) 176px, (min-width: 640px) 160px, 100vw"
              className="object-cover"
              onError={() => setImageFailed(true)}
            />
          )}
        </div>

        <div className="min-w-0 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-2xl font-bold uppercase leading-tight tracking-tight text-foreground sm:text-3xl">
              {workout.name}
            </h3>
            {completed && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-accent">
                <Check aria-hidden="true" className="size-3.5" />
                Completed
              </span>
            )}
          </div>
          <p className="mt-2 flex items-center gap-2 text-sm text-muted">
            <Dumbbell aria-hidden="true" className="size-4 shrink-0 text-accent" />
            <span className="truncate">{workout.equipment}</span>
          </p>

          <dl className="mt-5 grid max-w-xl grid-cols-3 gap-2 border-t border-white/10 pt-4 text-xs text-muted sm:text-sm">
            <div className="flex min-w-0 items-center gap-1.5">
              <Clock3 aria-hidden="true" className="size-4 shrink-0 text-accent" />
              <dt className="sr-only">Duration</dt>
              <dd className="whitespace-nowrap">{workout.duration} min</dd>
            </div>
            <div className="flex min-w-0 items-center justify-center gap-1.5">
              <Flame aria-hidden="true" className="size-4 shrink-0 text-accent" />
              <dt className="sr-only">Calories</dt>
              <dd className="whitespace-nowrap">{workout.caloriesBurned} kcal</dd>
            </div>
            <div className="flex min-w-0 items-center justify-end gap-1.5">
              <Star
                aria-hidden="true"
                className="size-4 shrink-0 fill-accent text-accent"
              />
              <dt className="sr-only">Rating</dt>
              <dd>{workout.rating.toFixed(1)}</dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-white/10 p-4 sm:col-span-2 sm:px-6 lg:col-span-1 lg:flex-col lg:items-stretch lg:justify-center lg:border-l lg:border-t-0 lg:px-5">
          <Link
            href={`/workouts/${workout.id}`}
            className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-md border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:flex-none"
          >
            <ExternalLink aria-hidden="true" className="size-4" />
            View Details
          </Link>

          {isPlannedWorkout && (
            <button
              type="button"
              disabled={completed}
              aria-label={
                completed
                  ? `${workout.name} is completed`
                  : `Mark ${workout.name} as done`
              }
              onClick={() => markAsDone(workout.id)}
              className={`inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-xs font-extrabold uppercase tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:flex-none ${
                completed
                  ? "cursor-not-allowed border border-accent/30 bg-accent/10 text-accent"
                  : "bg-accent text-background hover:bg-[#d8ff40]"
              }`}
            >
              <Check aria-hidden="true" className="size-4" />
              {completed ? "Done" : "Mark as Done"}
            </button>
          )}

          <button
            type="button"
            aria-label={`Remove ${workout.name} from ${isPlannedWorkout ? "today's plan" : "saved workouts"}`}
            onClick={removeWorkout}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-white/15 text-muted transition-colors hover:border-red-400/50 hover:bg-red-400/10 hover:text-red-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300 lg:self-end"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
