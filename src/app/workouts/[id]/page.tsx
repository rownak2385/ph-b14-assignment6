import { notFound } from "next/navigation";
import WorkoutDetails from "@/components/workouts/WorkoutDetails";
import { getWorkoutById, isWorkoutNotFoundError } from "@/lib/fitlog";

const FIRST_WORKOUT_ID = 1;
const LAST_WORKOUT_ID = 12;

async function loadWorkout(workoutId: number) {
  try {
    return await getWorkoutById(workoutId);
  } catch (error) {
    if (isWorkoutNotFoundError(error)) {
      notFound();
    }

    throw error;
  }
}

export default async function WorkoutDetailsPage(
  props: PageProps<"/workouts/[id]">,
) {
  const { id } = await props.params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const workoutId = Number(id);

  if (workoutId < FIRST_WORKOUT_ID || workoutId > LAST_WORKOUT_ID) {
    notFound();
  }

  const workout = await loadWorkout(workoutId);
  return <WorkoutDetails workout={workout} />;
}
