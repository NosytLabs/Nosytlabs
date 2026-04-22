import Reveal from "./Reveal";

const URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4";

export default function Philosophy() {
  return (
    <section className="relative bg-black py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal y={40}>
          <h2 className="text-serif text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24">
            Innovation{" "}
            <span className="text-italic-serif text-white/35">×</span>{" "}
            <span className="text-italic-serif text-white/85">Vision</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-stretch">
          <Reveal x={-40} y={0}>
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </Reveal>

          <Reveal x={40} y={0}>
            <div className="flex flex-col justify-center h-full">
              <div className="pb-10">
                <div className="text-white/40 text-[11px] tracking-[0.28em] uppercase mb-4">
                  Choose your space
                </div>
                <p className="text-white/75 text-base md:text-lg leading-relaxed">
                  Every meaningful breakthrough begins at the intersection of
                  disciplined strategy and remarkable creative vision. We
                  operate at that crossroads — turning bold thinking into
                  outcomes that move people and reshape industries.
                </p>
              </div>
              <div className="w-full h-px bg-white/10" />
              <div className="pt-10">
                <div className="text-white/40 text-[11px] tracking-[0.28em] uppercase mb-4">
                  Shape the future
                </div>
                <p className="text-white/75 text-base md:text-lg leading-relaxed">
                  The best work emerges when curiosity meets conviction. Our
                  process surfaces hidden opportunities and translates them
                  into experiences that resonate long after the first
                  impression.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
