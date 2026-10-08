import { Bookmark, Plus } from "lucide-react";

export default function ActionControls() {
  return (
    <div className="border-t border-white/10 pt-7">
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          disabled
          aria-describedby="workout-actions-status"
          className="inline-flex min-h-12 cursor-not-allowed items-center justify-center gap-2.5 rounded-md bg-accent/55 px-5 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-background/75"
        >
          <Plus aria-hidden="true" className="size-5" />
          Add to today&apos;s plan
        </button>
        <button
          type="button"
          disabled
          aria-describedby="workout-actions-status"
          className="inline-flex min-h-12 cursor-not-allowed items-center justify-center gap-2.5 rounded-md border border-white/15 px-5 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-muted"
        >
          <Bookmark aria-hidden="true" className="size-5" />
          Save for later
        </button>
      </div>
      <p id="workout-actions-status" className="mt-3 text-xs text-muted">
        Plan and save actions will be available soon.
      </p>
    </div>
  );
}
