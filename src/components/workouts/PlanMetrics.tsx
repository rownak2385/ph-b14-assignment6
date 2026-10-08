import { Clock3, Dumbbell, Flame, type LucideIcon } from "lucide-react";
import type { Workout } from "@/types/workout";

type PlanMetricsProps = {
  workouts: Workout[];
};

type MetricCardProps = {
  label: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
};

function safeNumber(value: number) {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

function MetricCard({ label, value, suffix, icon: Icon }: MetricCardProps) {
  return (
    <article className="relative overflow-hidden rounded-xl border border-white/10 bg-surface px-5 py-5 sm:px-6 sm:py-6">
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-10 size-28 rounded-full bg-accent/[0.06] blur-2xl"
      />
      <div className="relative flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            {label}
          </p>
          <p className="mt-2 flex items-baseline gap-2 font-display text-4xl font-bold leading-none text-foreground sm:text-5xl">
            <span>{value}</span>
            {suffix && (
              <span className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-muted">
                {suffix}
              </span>
            )}
          </p>
        </div>
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent sm:size-12">
          <Icon aria-hidden="true" className="size-5 sm:size-6" />
        </span>
      </div>
    </article>
  );
}

export default function PlanMetrics({ workouts }: PlanMetricsProps) {
  const totals = workouts.reduce(
    (current, workout) => ({
      minutes: current.minutes + safeNumber(workout.duration),
      calories: current.calories + safeNumber(workout.caloriesBurned),
    }),
    { minutes: 0, calories: 0 },
  );

  return (
    <section aria-label="Today's plan summary">
      <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
        <MetricCard
          label="Exercises"
          value={workouts.length}
          icon={Dumbbell}
        />
        <MetricCard
          label="Minutes"
          value={totals.minutes}
          suffix="min"
          icon={Clock3}
        />
        <MetricCard
          label="Calories"
          value={totals.calories}
          suffix="kcal"
          icon={Flame}
        />
      </div>
    </section>
  );
}
