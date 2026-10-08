"use client";

import { useWorkoutPlan } from "@/context/WorkoutContext";
import { useHydrated } from "@/hooks/useHydrated";
import PlanMetrics from "./PlanMetrics";
import PlanTabs from "./PlanTabs";

export default function MyPlanDashboard() {
  const { plan, saved, isHydrated } = useWorkoutPlan();
  const hasHydrated = useHydrated();
  const dashboardReady = isHydrated && hasHydrated;

  return (
    <section
      className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      aria-labelledby="my-plan-heading"
    >
      <div className="mx-auto w-full max-w-7xl">
        <header>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-accent">
            Workout dashboard
          </p>
          <h1
            id="my-plan-heading"
            className="mt-3 font-display text-5xl font-bold uppercase leading-none tracking-tight text-foreground sm:text-6xl"
          >
            My Plan
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </header>

        <div className="mt-10 sm:mt-12">
          <PlanMetrics workouts={dashboardReady ? plan : []} />
        </div>

        <div className="mt-10 sm:mt-12">
          <PlanTabs
            plan={dashboardReady ? plan : []}
            saved={dashboardReady ? saved : []}
            isHydrated={dashboardReady}
          />
        </div>
      </div>
    </section>
  );
}
