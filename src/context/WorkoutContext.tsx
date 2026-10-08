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

type WorkoutPlanContextValue = {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => PlanActionResult;
  saveForLater: (workout: Workout) => SavedActionResult;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isHydrated: boolean;
};

type PersistedWorkoutState = {
  plan: Workout[];
  saved: Workout[];
};

const emptyState: PersistedWorkoutState = { plan: [], saved: [] };
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

    return {
      plan: restoreCollection(parsed.plan, MAX_PLAN_SIZE),
      saved: restoreCollection(parsed.saved),
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
  const [isHydrated, setIsHydrated] = useState(false);
  const planRef = useRef<Workout[]>([]);
  const savedRef = useRef<Workout[]>([]);

  useEffect(() => {
    let isActive = true;

    queueMicrotask(() => {
      if (!isActive) {
        return;
      }

      const restored = readPersistedState();
      planRef.current = restored.plan;
      savedRef.current = restored.saved;
      setPlan(restored.plan);
      setSaved(restored.saved);
      setIsHydrated(true);
    });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (isHydrated) {
      writePersistedState({ plan, saved });
    }
  }, [isHydrated, plan, saved]);

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

  const isInPlan = useCallback(
    (id: number) => planRef.current.some((workout) => workout.id === id),
    [],
  );

  const isSaved = useCallback(
    (id: number) => savedRef.current.some((workout) => workout.id === id),
    [],
  );

  const value = useMemo<WorkoutPlanContextValue>(
    () => ({
      plan,
      saved,
      addToPlan,
      saveForLater,
      isInPlan,
      isSaved,
      isHydrated,
    }),
    [plan, saved, addToPlan, saveForLater, isInPlan, isSaved, isHydrated],
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
