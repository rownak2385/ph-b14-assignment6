"use client";

import { AlertTriangle, Dumbbell, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { getWorkouts } from "@/lib/fitlog";
import type { Workout } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";

type LibraryState = "loading" | "success" | "error";

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "An unexpected error occurred while loading workouts.";
}

function WorkoutSkeletons() {
  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      aria-hidden="true"
    >
      {Array.from({ length: 12 }, (_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border border-white/10 bg-surface"
        >
          <div className="aspect-[16/11] animate-pulse bg-white/5" />
          <div className="space-y-4 p-5">
            <div className="h-7 w-3/4 animate-pulse rounded bg-white/5" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-white/5" />
            <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
              <div className="h-4 animate-pulse rounded bg-white/5" />
              <div className="h-4 animate-pulse rounded bg-white/5" />
              <div className="h-4 animate-pulse rounded bg-white/5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [status, setStatus] = useState<LibraryState>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const retryLoad = async () => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const data = await getWorkouts();
      setWorkouts(data);
      setStatus("success");
    } catch (error) {
      setWorkouts([]);
      setErrorMessage(getErrorMessage(error));
      setStatus("error");
    }
  };

  useEffect(() => {
    let isActive = true;

    getWorkouts()
      .then((data) => {
        if (isActive) {
          setWorkouts(data);
          setStatus("success");
        }
      })
      .catch((error: unknown) => {
        if (isActive) {
          setWorkouts([]);
          setErrorMessage(getErrorMessage(error));
          setStatus("error");
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section
      id="library"
      className="scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="library-heading"
      aria-busy={status === "loading"}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 sm:mb-12">
          <h2
            id="library-heading"
            className="font-display text-4xl font-bold uppercase leading-none tracking-tight text-foreground sm:text-5xl"
          >
            The Library
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {status === "loading" && (
          <>
            <p className="sr-only" role="status">
              Loading workouts…
            </p>
            <WorkoutSkeletons />
          </>
        )}

        {status === "error" && (
          <div
            role="alert"
            className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-red-400/20 bg-surface px-6 py-12 text-center"
          >
            <AlertTriangle aria-hidden="true" className="size-10 text-red-300" />
            <h3 className="mt-5 font-display text-3xl font-bold uppercase text-foreground">
              Couldn&apos;t load workouts
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
              {errorMessage}
            </p>
            <button
              type="button"
              onClick={() => void retryLoad()}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-extrabold uppercase tracking-[0.1em] text-background transition-colors hover:bg-[#d8ff40] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <RefreshCw aria-hidden="true" className="size-4" />
              Retry
            </button>
          </div>
        )}

        {status === "success" && workouts.length === 0 && (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-white/10 bg-surface px-6 py-12 text-center">
            <Dumbbell aria-hidden="true" className="size-10 text-accent" />
            <h3 className="mt-5 font-display text-3xl font-bold uppercase text-foreground">
              No workouts available
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              The library is empty right now. Please check back soon.
            </p>
          </div>
        )}

        {status === "success" && workouts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
