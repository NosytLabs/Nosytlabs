import Reveal from "./Reveal";

const URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4";

export default function Philosophy() {
  return (
    <section className="relative bg-black py-28 md:py-36 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal y={40}>
          <div className="text-white/55 text-xs tracking-[0.3em] uppercase mb-6">
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
              <video
                className="w-full h-full object-cover"
                src={URL}
                muted
                autoPlay
                loop
                playsInline
                preload="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            </div>
          </Reveal>

          <Reveal x={30} y={0}>
            <div className="flex flex-col justify-center h-full gap-10">
              <div>
                <div className="text-white/60 text-[11px] tracking-[0.28em] uppercase mb-4">
                  01 · Build openly
                </div>
                <p className="text-white/85 text-base md:text-lg leading-relaxed">
                  Every line of code lives on GitHub. Every decision is fair
                  game for issues, PRs, and forks. The lab is small enough
                  that openness is the only honest mode of operation.
                </p>
              </div>
              <div className="w-full h-px bg-white/15" />
              <div>
                <div className="text-white/60 text-[11px] tracking-[0.28em] uppercase mb-4">
                  02 · Ship for builders
                </div>
                <p className="text-white/85 text-base md:text-lg leading-relaxed">
                  We build for the people sitting in the same chair we are —
                  developers gluing agents to the real world, prompt
                  engineers tuning systems at 1am, indie hackers shipping on
                  weekends.
                </p>
              </div>
              <div className="w-full h-px bg-white/15" />
              <div>
                <div className="text-white/60 text-[11px] tracking-[0.28em] uppercase mb-4">
                  03 · Stay independent
                </div>
                <p className="text-white/85 text-base md:text-lg leading-relaxed">
                  No investors, no roadmap theater. Just a steady cadence of
                  commits, releases, and the occasional song.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
