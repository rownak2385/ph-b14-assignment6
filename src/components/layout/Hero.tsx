import Image from "next/image";
import { Dumbbell } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-surface/35">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(204,255,0,0.09),transparent_65%)]"
      />
      <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-accent sm:text-sm">
            <span aria-hidden="true" className="h-px w-9 bg-accent" />
            Workout Library
          </p>
          <h1 className="font-display text-[clamp(3.4rem,8vw,6.8rem)] font-bold uppercase leading-[0.88] tracking-[-0.035em] text-foreground">
            Train with intent.
            <span className="block text-accent">Log every set.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-9 inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-accent px-6 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-background transition-colors hover:bg-[#d8ff40] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <Dumbbell aria-hidden="true" className="size-5" />
            Browse Workouts
          </a>
        </div>

        <div className="relative mx-auto flex w-full max-w-md items-center justify-center md:justify-end">
          <div
            aria-hidden="true"
            className="absolute inset-x-8 bottom-4 h-16 rounded-[50%] bg-black/60 blur-xl"
          />
          <Image
            src="/images/banner.png"
            alt="An anatomical illustration of an athlete performing a preacher curl"
            width={334}
            height={334}
            className="relative h-auto w-full max-w-[290px] drop-shadow-[0_22px_35px_rgba(0,0,0,0.55)] sm:max-w-[334px] lg:max-w-[390px]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
