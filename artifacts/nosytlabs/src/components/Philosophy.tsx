import Reveal from "./Reveal";

const PRINCIPLES = [
  {
    n: "I",
    title: "Build openly",
    body: "Every line of code lives on GitHub. Every decision is fair game for issues, PRs, and forks. Small enough that openness is the only honest mode.",
  },
  {
    n: "II",
    title: "Ship for builders",
    body: "We make tools for the people sitting in the same chair we are — devs gluing agents to the real world, prompt engineers tuning at 1am, indie hackers shipping on weekends.",
  },
  {
    n: "III",
    title: "Stay independent",
    body: "No investors, no roadmap theater. Just a steady cadence of commits, releases, and the occasional song.",
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
            Curious by default.{" "}
            <span className="text-italic-serif text-[#d8b87a]">
              Useful by design.
            </span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-center">
          <Reveal x={-20}>
            <div className="rounded-[28px] overflow-hidden aspect-[4/5] liquid-glass relative">
              <img
                src="/img/cosmos-hero.png"
                alt="A small figure faces an expanse of stars, reading the cosmos like a screen."
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
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
