import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#07090c]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-5 px-4 py-7 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          aria-label="FitLog home"
        >
          <Image src="/images/logo.png" alt="" width={28} height={28} />
          <span className="font-display text-xl font-bold tracking-[0.12em] text-foreground">
            FITLOG
          </span>
        </Link>
        <p className="text-sm leading-6 text-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
