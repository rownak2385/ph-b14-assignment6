export default function WorkoutDetailsLoading() {
  return (
    <div
      className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
      role="status"
      aria-label="Loading workout details"
    >
      <div className="mx-auto w-full max-w-7xl animate-pulse">
        <div className="mb-7 h-5 w-36 rounded bg-white/5" />
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="aspect-[4/5] rounded-2xl border border-white/10 bg-surface" />
          <div>
            <div className="h-6 w-28 rounded bg-white/5" />
            <div className="mt-5 h-14 w-4/5 rounded bg-white/5" />
            <div className="mt-4 h-14 w-full rounded bg-white/5" />
            <div className="mt-10 h-8 w-32 rounded bg-white/5" />
            <div className="mt-4 h-80 rounded-xl border border-white/10 bg-surface" />
            <div className="mt-10 h-8 w-36 rounded bg-white/5" />
            <div className="mt-4 space-y-3">
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  key={index}
                  className="h-20 rounded-xl border border-white/10 bg-surface"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">Loading workout details…</span>
    </div>
  );
}
