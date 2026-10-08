"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock3, Dumbbell, Flame, ImageOff, Star } from "lucide-react";
import { useState } from "react";
import type { Workout } from "@/types/workout";

type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <Link
      href={`/workouts/${workout.id}`}
      aria-label={`View ${workout.name} workout details`}
      className="group block h-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-surface transition duration-200 group-hover:-translate-y-1 group-hover:border-accent/50 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
        <div className="relative aspect-[16/11] overflow-hidden bg-[#0d1117]">
          {imageFailed ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-muted">
              <ImageOff aria-hidden="true" className="size-8" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em]">
                Image unavailable
              </span>
            </div>
          ) : (
            <Image
              src={workout.image}
              alt={`${workout.name} workout illustration`}
              fill
              sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
              onError={() => setImageFailed(true)}
            />
          )}

          <div className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded bg-accent px-2.5 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-background"
              >
                {group}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-2xl font-bold uppercase leading-tight tracking-tight text-foreground transition-colors group-hover:text-accent">
            {workout.name}
          </h3>
          <p className="mt-3 flex items-center gap-2 text-sm text-muted">
            <Dumbbell aria-hidden="true" className="size-4 shrink-0 text-accent" />
            <span>{workout.equipment}</span>
          </p>

          <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-xs text-muted">
            <div className="flex items-center gap-1.5">
              <Clock3 aria-hidden="true" className="size-4 shrink-0 text-accent" />
              <dt className="sr-only">Duration</dt>
              <dd>{workout.duration} min</dd>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Flame aria-hidden="true" className="size-4 shrink-0 text-accent" />
              <dt className="sr-only">Calories</dt>
              <dd>{workout.caloriesBurned} kcal</dd>
            </div>
            <div className="flex items-center justify-end gap-1.5">
              <Star
                aria-hidden="true"
                className="size-4 shrink-0 fill-accent text-accent"
              />
              <dt className="sr-only">Rating</dt>
              <dd>{workout.rating.toFixed(1)}</dd>
            </div>
          </dl>
        </div>
      </article>
    </Link>
  );
}
