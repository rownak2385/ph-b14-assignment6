export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-3xl rounded-2xl border border-white/10 bg-surface p-8 sm:p-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent">
          FitLog
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Workout Library
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted">
          Your focused space for discovering workouts and building a consistent
          training plan.
        </p>
      </section>
    </main>
  );
}
