import Reveal from "./Reveal";

const PRINCIPLES = [
  {
    n: "I",
    title: "Build openly",
    body: "Every line of code lives on GitHub. Issues, PRs, and forks are fair game — that's the whole point of putting it there.",
  },
  {
    n: "II",
    title: "Ship for builders",
    body: "Tools for the people doing the work — developers wiring agents into real systems, prompt engineers tuning late at night, indie hackers shipping on weekends.",
  },
  {
    n: "III",
    title: "Stay independent",
    body: "No investors, no growth team, no roadmap deck. A steady cadence of commits and releases instead.",
  },
];

export default function Philosophy() {
  return (
    <section className="relative bg-[#0a0a0b] py-24 md:py-32 px-6 overflow-hidden border-t border-[#f5f1e8]/5">
      <div className="max-w-6xl mx-auto">
        <Reveal y={30}>
          <div className="text-mono text-[#f5f1e8]/65 text-[11px] tracking-[0.3em] uppercase mb-6">
            03 — How we work
          </div>
          <h2 className="text-serif text-4xl md:text-6xl lg:text-7xl text-[#f5f1e8] tracking-tight mb-16 max-w-4xl leading-[1.05]">
            Three things we{" "}
            <span className="text-italic-serif text-[#d8b87a]">
              believe in.
            </span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-center">
          <Reveal x={-20}>
            <div className="rounded-[28px] overflow-hidden aspect-[4/5] liquid-glass relative">
              <img
                src="/img/cosmos-hero.webp"
                alt="A small figure stands before an expanse of stars, reading the cosmos like a screen."
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                width="1280"
                height="1600"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/85 via-[#0a0a0b]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-mono text-[#f5f1e8]/75 text-[11px] tracking-[0.28em] uppercase">
                One desk · One operator · The whole catalog
              </div>
            </div>
          </Reveal>

          <Reveal x={20}>
            <div className="flex flex-col gap-10">
              {PRINCIPLES.map((p, i) => (
                <div key={p.title} className="grid grid-cols-[auto_1fr] gap-5 md:gap-7 items-start">
                  <div className="text-italic-serif text-[#d8b87a] text-4xl md:text-5xl leading-none w-10">
                    {p.n}
                  </div>
                  <div className={i < PRINCIPLES.length - 1 ? "pb-10 border-b border-[#f5f1e8]/10" : ""}>
                    <h3 className="text-serif text-2xl md:text-3xl text-[#f5f1e8] tracking-tight mb-3">
                      {p.title}
                    </h3>
                    <p className="text-[#f5f1e8]/75 text-[15px] leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
