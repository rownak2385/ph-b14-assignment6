"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ImageOff } from "lucide-react";
import { useState } from "react";
import type { Workout } from "@/types/workout";
import ActionControls from "./ActionControls";

type WorkoutDetailsProps = {
  workout: Workout;
};

export default function WorkoutDetails({ workout }: WorkoutDetailsProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", String(workout.sets)],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", String(workout.rating)],
  ] as const;

  return (
    <section
      className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
      aria-labelledby="workout-title"
    >
      <div className="mx-auto w-full max-w-7xl">
        <Link
          href="/#library"
          className="mb-7 inline-flex items-center gap-2 rounded-sm text-sm font-bold uppercase tracking-[0.1em] text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to workouts
        </Link>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-surface lg:sticky lg:top-24">
            {imageFailed ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center text-muted">
                <ImageOff aria-hidden="true" className="size-12" />
                <p className="text-sm font-semibold uppercase tracking-[0.14em]">
                  Workout image unavailable
                </p>
              </div>
            ) : (
              <Image
                src={workout.image}
                alt={`${workout.name} workout illustration`}
                fill
                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw"
                className="object-cover"
                onError={() => setImageFailed(true)}
                priority
              />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded bg-accent px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.13em] text-background"
                >
                  {group}
                </span>
              ))}
            </div>

            <h1
              id="workout-title"
              className="mt-5 font-display text-5xl font-bold uppercase leading-[0.94] tracking-[-0.02em] text-foreground sm:text-6xl"
            >
              {workout.name}
            </h1>
            <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
              {workout.description}
            </p>

            <section className="mt-9" aria-labelledby="key-specs-heading">
              <h2
                id="key-specs-heading"
                className="font-display text-2xl font-bold uppercase tracking-[0.04em] text-foreground"
              >
                Key Specs
              </h2>
              <dl className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-surface">
                {specs.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-4 border-b border-white/10 px-4 py-3.5 last:border-b-0 sm:px-5"
                  >
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                      {label}
                    </dt>
                    <dd className="text-right text-sm font-semibold text-foreground">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="mt-9" aria-labelledby="instructions-heading">
              <h2
                id="instructions-heading"
                className="font-display text-2xl font-bold uppercase tracking-[0.04em] text-foreground"
              >
                Instructions
              </h2>
              <ol className="mt-4 space-y-3">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={instruction}
                    className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 rounded-xl border border-white/10 bg-surface px-4 py-4 sm:px-5"
                  >
                    <span
                      aria-hidden="true"
                      className="font-display text-xl font-bold leading-6 text-accent"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-6 text-muted sm:text-base">
                      {instruction}
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            <div className="mt-9">
              <ActionControls workout={workout} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
