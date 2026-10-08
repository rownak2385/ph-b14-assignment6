"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, ClipboardList, Menu, X } from "lucide-react";
import { useState } from "react";
import { useWorkoutPlan } from "@/context/WorkoutContext";
import { useHydrated } from "@/hooks/useHydrated";

const navLinks = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") {
    return (
      pathname === "/" ||
      pathname.startsWith("/workout/") ||
      pathname.startsWith("/workouts/")
    );
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { plan, saved, isHydrated } = useWorkoutPlan();
  const hasHydrated = useHydrated();
  const canShowStoredState = isHydrated && hasHydrated;
  const planCount = canShowStoredState ? plan.length : 0;
  const savedCount = canShowStoredState ? saved.length : 0;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          aria-label="FitLog home"
        >
          <Image src="/images/logo.png" alt="" width={28} height={28} priority />
          <span className="font-display text-xl font-bold tracking-[0.12em] text-foreground">
            FITLOG
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
        >
          {navLinks.map((link) => {
            const isActive = isActiveRoute(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  isActive
                    ? "bg-white/5 text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/my-plan"
            aria-label={`View today's plan, ${planCount} workouts`}
            className="inline-flex h-9 items-center gap-2 rounded-md bg-accent px-3 text-xs font-bold uppercase tracking-[0.1em] text-background transition-colors hover:bg-[#d8ff40] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <ClipboardList aria-hidden="true" className="size-4" />
            Plan{" "}
            <span aria-live="polite" className="tabular-nums">
              {planCount}
            </span>
          </Link>
          <Link
            href="/my-plan"
            aria-label={`View saved workouts, ${savedCount} workouts`}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-white/20 px-3 text-xs font-bold uppercase tracking-[0.1em] text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Bookmark aria-hidden="true" className="size-4" />
            Saved{" "}
            <span aria-live="polite" className="tabular-nums">
              {savedCount}
            </span>
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md border border-white/15 text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          {isMenuOpen ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-white/10 px-4 py-4 md:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-2">
            {navLinks.map((link) => {
              const isActive = isActiveRoute(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-[0.12em] focus-visible:outline-2 focus-visible:outline-accent ${
                    isActive
                      ? "bg-white/5 text-accent"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
              <Link
                href="/my-plan"
                onClick={closeMenu}
                aria-label={`View today's plan, ${planCount} workouts`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-accent px-3 text-xs font-bold uppercase tracking-[0.1em] text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <ClipboardList aria-hidden="true" className="size-4" />
                Plan <span className="tabular-nums">{planCount}</span>
              </Link>
              <Link
                href="/my-plan"
                onClick={closeMenu}
                aria-label={`View saved workouts, ${savedCount} workouts`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/20 px-3 text-xs font-bold uppercase tracking-[0.1em] text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Bookmark aria-hidden="true" className="size-4" />
                Saved <span className="tabular-nums">{savedCount}</span>
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
