import type { Workout } from "@/types/workout";

const API_ENDPOINTS = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
] as const;

export class FitLogApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FitLogApiError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(record: Record<string, unknown>, key: string) {
  const value = record[key];

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new FitLogApiError(`Workout field "${key}" must be a string.`);
  }

  return value;
}

function readNumber(record: Record<string, unknown>, key: string) {
  const value = record[key];

  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new FitLogApiError(`Workout field "${key}" must be a number.`);
  }

  return value;
}

function readStringArray(record: Record<string, unknown>, key: string) {
  const value = record[key];

  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    !value.every((item) => typeof item === "string" && item.trim().length > 0)
  ) {
    throw new FitLogApiError(`Workout field "${key}" must be a string array.`);
  }

  return value;
}

function normalizeWorkout(value: unknown): Workout {
  if (!isRecord(value)) {
    throw new FitLogApiError("Workout data must be an object.");
  }

  const id = readNumber(value, "id");
  const image = readString(value, "image");

  if (!Number.isInteger(id) || id <= 0) {
    throw new FitLogApiError("Workout field \"id\" must be a positive integer.");
  }

  try {
    const imageUrl = new URL(image);

    if (imageUrl.protocol !== "https:") {
      throw new Error("Workout image must use HTTPS.");
    }
  } catch {
    throw new FitLogApiError("Workout field \"image\" must be a valid HTTPS URL.");
  }

  return {
    id,
    name: readString(value, "name"),
    image,
    muscleGroups: readStringArray(value, "muscleGroups"),
    equipment: readString(value, "equipment"),
    difficulty: readString(value, "difficulty"),
    duration: readNumber(value, "duration"),
    caloriesBurned: readNumber(value, "caloriesBurned"),
    sets: readNumber(value, "sets"),
    reps: readString(value, "reps"),
    rating: readNumber(value, "rating"),
    description: readString(value, "description"),
    instructions: readStringArray(value, "instructions"),
  };
}

async function requestWithFallback<T>(
  path: string,
  parse: (payload: unknown) => T,
): Promise<T> {
  const failures: string[] = [];

  for (const endpoint of API_ENDPOINTS) {
    try {
      const response = await fetch(`${endpoint}${path}`, {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new FitLogApiError(
          `The API returned ${response.status} ${response.statusText}.`,
        );
      }

      const payload: unknown = await response.json();
      return parse(payload);
    } catch (error) {
      failures.push(error instanceof Error ? error.message : "Unknown API error.");
    }
  }

  throw new FitLogApiError(
    `Unable to load workout data from either API. ${failures.join(" ")}`,
  );
}

export function getWorkouts(): Promise<Workout[]> {
  return requestWithFallback("", (payload) => {
    if (!Array.isArray(payload)) {
      throw new FitLogApiError("The workout API response must be an array.");
    }

    return payload.map(normalizeWorkout);
  });
}

export function getWorkoutById(id: Workout["id"] | string): Promise<Workout> {
  const workoutId = typeof id === "number" ? id : Number(id);

  if (!Number.isInteger(workoutId) || workoutId <= 0) {
    return Promise.reject(
      new FitLogApiError("Workout ID must be a positive integer."),
    );
  }

  return requestWithFallback(`/${workoutId}`, normalizeWorkout);
}
