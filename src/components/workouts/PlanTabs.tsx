"use client";

import { useId, useState, type KeyboardEvent } from "react";
import type { Workout } from "@/types/workout";
import PlanEmptyState from "./PlanEmptyState";
import PlanWorkoutCard from "./PlanWorkoutCard";

type PlanTabsProps = {
  plan: Workout[];
  saved: Workout[];
  isHydrated: boolean;
};

type ActiveTab = "plan" | "saved";

function PlanLoadingState() {
  return (
    <div
      className="space-y-4"
      role="status"
      aria-label="Loading workouts"
    >
      <p className="text-sm font-semibold text-muted">Loading workouts…</p>
      {Array.from({ length: 2 }, (_, index) => (
        <div
          key={index}
          aria-hidden="true"
          className="grid animate-pulse overflow-hidden rounded-xl border border-white/10 bg-surface sm:grid-cols-[10rem_minmax(0,1fr)]"
        >
          <div className="aspect-[16/10] bg-white/5 sm:aspect-auto sm:min-h-44" />
          <div className="space-y-4 p-5 sm:p-6">
            <div className="h-7 w-2/3 rounded bg-white/5" />
            <div className="h-4 w-1/3 rounded bg-white/5" />
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
              <div className="h-4 rounded bg-white/5" />
              <div className="h-4 rounded bg-white/5" />
              <div className="h-4 rounded bg-white/5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PlanTabs({ plan, saved, isHydrated }: PlanTabsProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("plan");
  const tabsId = useId();
  const activeCollection = activeTab === "plan" ? plan : saved;
  const panelId = `${tabsId}-panel`;

  const selectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    document.getElementById(`${tabsId}-${tab}-tab`)?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectTab(activeTab === "plan" ? "saved" : "plan");
    } else if (event.key === "Home") {
      event.preventDefault();
      selectTab("plan");
    } else if (event.key === "End") {
      event.preventDefault();
      selectTab("saved");
    }
  };

  return (
    <section aria-label="Workout collections">
      <div
        role="tablist"
        aria-label="My Plan workout collections"
        className="flex overflow-x-auto border-b border-white/10"
      >
        <button
          type="button"
          role="tab"
          id={`${tabsId}-plan-tab`}
          aria-selected={activeTab === "plan"}
          aria-controls={panelId}
          tabIndex={activeTab === "plan" ? 0 : -1}
          onClick={() => setActiveTab("plan")}
          onKeyDown={handleTabKeyDown}
          className={`relative min-h-12 shrink-0 px-4 text-sm font-bold uppercase tracking-[0.1em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent sm:px-6 ${
            activeTab === "plan"
              ? "text-accent after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-accent"
              : "text-muted hover:text-foreground"
          }`}
        >
          Today&apos;s Plan
          <span className="ml-2 rounded-full bg-white/[0.07] px-2 py-0.5 text-[0.68rem] tabular-nums">
            {plan.length}
          </span>
        </button>
        <button
          type="button"
          role="tab"
          id={`${tabsId}-saved-tab`}
          aria-selected={activeTab === "saved"}
          aria-controls={panelId}
          tabIndex={activeTab === "saved" ? 0 : -1}
          onClick={() => setActiveTab("saved")}
          onKeyDown={handleTabKeyDown}
          className={`relative min-h-12 shrink-0 px-4 text-sm font-bold uppercase tracking-[0.1em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent sm:px-6 ${
            activeTab === "saved"
              ? "text-accent after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-accent"
              : "text-muted hover:text-foreground"
          }`}
        >
          Saved
          <span className="ml-2 rounded-full bg-white/[0.07] px-2 py-0.5 text-[0.68rem] tabular-nums">
            {saved.length}
          </span>
        </button>
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${tabsId}-${activeTab}-tab`}
        tabIndex={0}
        className="pt-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:pt-8"
      >
        {!isHydrated ? (
          <PlanLoadingState />
        ) : activeCollection.length === 0 ? (
          <PlanEmptyState collection={activeTab} />
        ) : (
          <div className="space-y-4">
            {activeCollection.map((workout) => (
              <PlanWorkoutCard
                key={workout.id}
                workout={workout}
                collection={activeTab}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
