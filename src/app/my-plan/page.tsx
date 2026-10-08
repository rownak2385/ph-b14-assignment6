import type { Metadata } from "next";
import MyPlanDashboard from "@/components/workouts/MyPlanDashboard";

export const metadata: Metadata = {
  title: "My Plan | FitLog",
  description: "Review today's workout plan and saved FitLog exercises.",
};

export default function MyPlanPage() {
  return <MyPlanDashboard />;
}
