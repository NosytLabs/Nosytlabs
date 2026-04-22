import Reveal from "./Reveal";

export default function Philosophy() {
  return (
    <section className="relative bg-black py-28 md:py-36 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal y={40}>
          <div className="text-white/65 text-xs tracking-[0.3em] uppercase mb-6">
            How we work
          </div>
          <h2 className="text-serif text-4xl md:text-6xl lg:text-7xl text-white tracking-tight mb-16 md:mb-20 max-w-4xl leading-[1.05]">
            Curious by default.{" "}
            <span className="text-italic-serif text-white/70">
              Useful by design.
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
          <Reveal x={-30} y={0}>
            <div className="rounded-[28px] overflow-hidden aspect-[4/3] liquid-glass relative">
              <img
                src="/img/cosmos-hero.png"
                alt="A small figure faces an expanse of stars."
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-6 right-6 text-white/70 text-[11px] tracking-[0.28em] uppercase">
                The view from one desk
              </div>
            </div>
          </Reveal>

          <Reveal x={30} y={0}>
            <div className="flex flex-col justify-center h-full gap-10">
              <Principle
                num="01"
                title="Build openly"
                body="Every line of code lives on GitHub. Every decision is fair game for issues, PRs, and forks. Small enough that openness is the only honest mode."
              />
              <div className="w-full h-px bg-white/15" />
              <Principle
                num="02"
                title="Ship for builders"
                body="We make tools for the people sitting in the same chair we are — developers gluing agents to the real world, prompt engineers tuning at 1am, indie hackers shipping on weekends."
              />
              <div className="w-full h-px bg-white/15" />
              <Principle
                num="03"
                title="Stay independent"
                body="No investors, no roadmap theater. Just a steady cadence of commits, releases, and the occasional song."
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Principle({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div>
      <div className="text-white/65 text-[11px] tracking-[0.28em] uppercase mb-3">
        {num} · {title}
      </div>
      <p className="text-white/85 text-base md:text-lg leading-relaxed">{body}</p>
    </div>
  );
}
