import Hero from "@/components/layout/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <section
        id="library"
        className="scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      >
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="font-display text-4xl font-bold uppercase leading-none tracking-tight text-foreground sm:text-5xl">
            The Library
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
      </section>
    </>
  );
}
