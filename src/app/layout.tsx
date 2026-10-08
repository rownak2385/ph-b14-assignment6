import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "sonner";
import "@fontsource-variable/oswald/wght.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { WorkoutProvider } from "@/context/WorkoutContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitLog | Workout Library",
  description: "A focused workout library for planning and tracking every set.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <WorkoutProvider>
          <Suspense fallback={<div className="h-16 border-b border-white/10" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster theme="dark" richColors position="top-right" />
        </WorkoutProvider>
      </body>
    </html>
  );
}
