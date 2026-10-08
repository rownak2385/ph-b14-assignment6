"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import type { Workout } from "@/types/workout";

const STORAGE_KEY = "fitlog:v1";
export const MAX_PLAN_SIZE = 5;

type PlanActionResult = "added" | "duplicate" | "limit" | "not-ready";
type SavedActionResult = "saved" | "duplicate" | "not-ready";
type CompletionActionResult =
  | "completed"
  | "duplicate"
  | "not-found"
  | "not-ready";
type RemoveActionResult = "removed" | "not-found" | "not-ready";

type WorkoutPlanContextValue = {
  plan: Workout[];
  saved: Workout[];
  completedIds: number[];
  addToPlan: (workout: Workout) => PlanActionResult;
  saveForLater: (workout: Workout) => SavedActionResult;
  markAsDone: (id: number) => CompletionActionResult;
  removeFromPlan: (id: number) => RemoveActionResult;
  removeFromSaved: (id: number) => RemoveActionResult;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
  isHydrated: boolean;
};

type PersistedWorkoutState = {
  plan: Workout[];
  saved: Workout[];
  completedIds: number[];
};

const emptyState: PersistedWorkoutState = {
  plan: [],
  saved: [],
  completedIds: [],
};
const WorkoutPlanContext = createContext<WorkoutPlanContextValue | null>(null);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item) => typeof item === "string" && item.trim().length > 0)
  );
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isStoredWorkout(value: unknown): value is Workout {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isFiniteNumber(value.id) &&
    Number.isInteger(value.id) &&
    value.id > 0 &&
    typeof value.name === "string" &&
    value.name.trim().length > 0 &&
    typeof value.image === "string" &&
    value.image.trim().length > 0 &&
    isStringArray(value.muscleGroups) &&
    typeof value.equipment === "string" &&
    value.equipment.trim().length > 0 &&
    typeof value.difficulty === "string" &&
    value.difficulty.trim().length > 0 &&
    isFiniteNumber(value.duration) &&
    isFiniteNumber(value.caloriesBurned) &&
    isFiniteNumber(value.sets) &&
    typeof value.reps === "string" &&
    value.reps.trim().length > 0 &&
    isFiniteNumber(value.rating) &&
    typeof value.description === "string" &&
    value.description.trim().length > 0 &&
    isStringArray(value.instructions)
  );
}

function restoreCollection(value: unknown, limit?: number) {
  if (!Array.isArray(value)) {
    return [];
  }

  const seenIds = new Set<number>();
  const restored: Workout[] = [];

  for (const item of value) {
    if (!isStoredWorkout(item) || seenIds.has(item.id)) {
      continue;
    }

    seenIds.add(item.id);
    restored.push(item);

    if (limit && restored.length === limit) {
      break;
    }
  }

  return restored;
}

function restoreCompletedIds(value: unknown, plan: Workout[]) {
  if (!Array.isArray(value)) {
    return [];
  }

  const planIds = new Set(plan.map((workout) => workout.id));
  const completedIds = new Set<number>();

  for (const id of value) {
    if (
      isFiniteNumber(id) &&
      Number.isInteger(id) &&
      id > 0 &&
      planIds.has(id)
    ) {
      completedIds.add(id);
    }
  }

  return Array.from(completedIds);
}

function readPersistedState(): PersistedWorkoutState {
  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return emptyState;
    }

    const parsed: unknown = JSON.parse(storedValue);

    if (!isRecord(parsed)) {
      return emptyState;
    }

    const plan = restoreCollection(parsed.plan, MAX_PLAN_SIZE);

    return {
      plan,
      saved: restoreCollection(parsed.saved),
      completedIds: restoreCompletedIds(parsed.completedIds, plan),
    };
  } catch {
    return emptyState;
  }
}

function writePersistedState(state: PersistedWorkoutState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // State remains available for the current session if storage is unavailable.
  }
}

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const planRef = useRef<Workout[]>([]);
  const savedRef = useRef<Workout[]>([]);
  const completedIdsRef = useRef<number[]>([]);

  useEffect(() => {
    let isActive = true;

    queueMicrotask(() => {
      if (!isActive) {
        return;
      }

      const restored = readPersistedState();
      planRef.current = restored.plan;
      savedRef.current = restored.saved;
      completedIdsRef.current = restored.completedIds;
      setPlan(restored.plan);
      setSaved(restored.saved);
      setCompletedIds(restored.completedIds);
      setIsHydrated(true);
    });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (isHydrated) {
      writePersistedState({ plan, saved, completedIds });
    }
  }, [isHydrated, plan, saved, completedIds]);

  const addToPlan = useCallback(
    (workout: Workout): PlanActionResult => {
      if (!isHydrated) {
        toast.info("Your saved workout selections are still loading.");
        return "not-ready";
      }

      const currentPlan = planRef.current;

      if (currentPlan.some((item) => item.id === workout.id)) {
        toast.info(`${workout.name} is already in today's plan.`);
        return "duplicate";
      }

      if (currentPlan.length >= MAX_PLAN_SIZE) {
        toast.error(`Today's plan is limited to ${MAX_PLAN_SIZE} workouts.`);
        return "limit";
      }

      const nextPlan = [...currentPlan, workout];
      planRef.current = nextPlan;
      setPlan(nextPlan);
      toast.success(`${workout.name} added to today's plan.`);
      return "added";
    },
    [isHydrated],
  );

  const saveForLater = useCallback(
    (workout: Workout): SavedActionResult => {
      if (!isHydrated) {
        toast.info("Your saved workout selections are still loading.");
        return "not-ready";
      }

      const currentSaved = savedRef.current;

      if (currentSaved.some((item) => item.id === workout.id)) {
        toast.info(`${workout.name} is already saved for later.`);
        return "duplicate";
      }

      const nextSaved = [...currentSaved, workout];
      savedRef.current = nextSaved;
      setSaved(nextSaved);
      toast.success(`${workout.name} saved for later.`);
      return "saved";
    },
    [isHydrated],
  );

  const markAsDone = useCallback(
    (id: number): CompletionActionResult => {
      if (!isHydrated) {
        toast.info("Your saved workout selections are still loading.");
        return "not-ready";
      }

      const workout = planRef.current.find((item) => item.id === id);

      if (!workout) {
        toast.error("That workout is no longer in today's plan.");
        return "not-found";
      }

      if (completedIdsRef.current.includes(id)) {
        toast.info(`${workout.name} is already marked done.`);
        return "duplicate";
      }

      const nextCompletedIds = [...completedIdsRef.current, id];
      completedIdsRef.current = nextCompletedIds;
      setCompletedIds(nextCompletedIds);
      toast.success(`${workout.name} marked as done.`);
      return "completed";
    },
    [isHydrated],
  );

  const removeFromPlan = useCallback(
    (id: number): RemoveActionResult => {
      if (!isHydrated) {
        toast.info("Your saved workout selections are still loading.");
        return "not-ready";
      }

      const workout = planRef.current.find((item) => item.id === id);

      if (!workout) {
        return "not-found";
      }

      const nextPlan = planRef.current.filter((item) => item.id !== id);
      const nextCompletedIds = completedIdsRef.current.filter(
        (completedId) => completedId !== id,
      );

      planRef.current = nextPlan;
      completedIdsRef.current = nextCompletedIds;
      setPlan(nextPlan);
      setCompletedIds(nextCompletedIds);
      toast.success(`${workout.name} removed from today's plan.`);
      return "removed";
    },
    [isHydrated],
  );

  const removeFromSaved = useCallback(
    (id: number): RemoveActionResult => {
      if (!isHydrated) {
        toast.info("Your saved workout selections are still loading.");
        return "not-ready";
      }

      const workout = savedRef.current.find((item) => item.id === id);

      if (!workout) {
        return "not-found";
      }

      const nextSaved = savedRef.current.filter((item) => item.id !== id);
      savedRef.current = nextSaved;
      setSaved(nextSaved);
      toast.success(`${workout.name} removed from saved workouts.`);
      return "removed";
    },
    [isHydrated],
  );

  const isInPlan = useCallback(
    (id: number) => planRef.current.some((workout) => workout.id === id),
    [],
  );

  const isSaved = useCallback(
    (id: number) => savedRef.current.some((workout) => workout.id === id),
    [],
  );

  const isDone = useCallback(
    (id: number) => completedIdsRef.current.includes(id),
    [],
  );

  const value = useMemo<WorkoutPlanContextValue>(
    () => ({
      plan,
      saved,
      completedIds,
      addToPlan,
      saveForLater,
      markAsDone,
      removeFromPlan,
      removeFromSaved,
      isInPlan,
      isSaved,
      isDone,
      isHydrated,
    }),
    [
      plan,
      saved,
      completedIds,
      addToPlan,
      saveForLater,
      markAsDone,
      removeFromPlan,
      removeFromSaved,
      isInPlan,
      isSaved,
      isDone,
      isHydrated,
    ],
  );

  return (
    <WorkoutPlanContext.Provider value={value}>
      {children}
    </WorkoutPlanContext.Provider>
  );
}

export function useWorkoutPlan() {
  const context = useContext(WorkoutPlanContext);

  if (!context) {
    throw new Error("useWorkoutPlan must be used within a WorkoutProvider.");
  }

  return context;
}
